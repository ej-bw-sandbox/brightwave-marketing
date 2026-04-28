/**
 * POST /api/stream
 *
 * Pi-compatible streaming proxy endpoint for the demo avatar session.
 *
 * This route accepts the request format defined by Pi's `streamProxy` client:
 *
 * ```json
 * {
 *   "model":   { "id": "...", "provider": "anthropic", ... },
 *   "context": { "systemPrompt": "...", "messages": [...], "tools": [...] },
 *   "options": { "temperature": 0.7, "maxTokens": 1024, ... }
 * }
 * ```
 *
 * It then:
 *   1. Injects / overrides the system prompt with the demo persona prompt
 *      (if a `x-demo-prospect` header is present with prospect JSON).
 *   2. Calls the Anthropic Messages API via `@mariozechner/pi-ai`'s
 *      `streamSimple`, which handles provider-specific formatting.
 *   3. Translates the resulting `AssistantMessageEvent` stream into Pi's
 *      `ProxyAssistantMessageEvent` SSE format and streams it back.
 *
 * This replaces the old `/api/demo/chat` route while preserving all existing
 * business logic: system prompt construction, prospect personalization,
 * qualification scoring instructions, and model selection.
 *
 * Requires env var: ANTHROPIC_API_KEY
 */

import { streamSimple, getModel } from '@mariozechner/pi-ai';
import type {
  AssistantMessage,
  AssistantMessageEvent,
  Context,
  Message,
  Model,
  SimpleStreamOptions,
} from '@mariozechner/pi-ai';
import { buildDefaultSystemPrompt } from '@/lib/kb/brightwave';

// ---------------------------------------------------------------------------
// Request types (matches Pi's streamProxy client payload)
// ---------------------------------------------------------------------------

/** Serializable subset of SimpleStreamOptions sent by the proxy client. */
interface ProxySerializableStreamOptions {
  temperature?: number;
  maxTokens?: number;
  reasoning?: 'minimal' | 'low' | 'medium' | 'high' | 'xhigh';
  cacheRetention?: 'none' | 'short' | 'long';
  sessionId?: string;
  headers?: Record<string, string>;
  metadata?: Record<string, unknown>;
  transport?: 'sse' | 'websocket' | 'auto';
  thinkingBudgets?: Record<string, number>;
  maxRetryDelayMs?: number;
}

/** Shape of the incoming JSON body from `streamProxy`. */
interface ProxyRequestBody {
  model: {
    id: string;
    provider: string;
    api: string;
    baseUrl: string;
    [key: string]: unknown;
  };
  context: Context;
  options?: ProxySerializableStreamOptions;
}

/** Prospect metadata optionally sent via a custom header. */
interface ProspectHeader {
  name?: string;
  email?: string;
  company?: string;
  role?: string;
  aum?: string;
  firmType?: string;
}

// ---------------------------------------------------------------------------
// Proxy event types (what we send back to the client)
// ---------------------------------------------------------------------------

type ProxyEvent =
  | { type: 'start' }
  | { type: 'text_start'; contentIndex: number }
  | { type: 'text_delta'; contentIndex: number; delta: string }
  | { type: 'text_end'; contentIndex: number; contentSignature?: string }
  | { type: 'thinking_start'; contentIndex: number }
  | { type: 'thinking_delta'; contentIndex: number; delta: string }
  | { type: 'thinking_end'; contentIndex: number; contentSignature?: string }
  | { type: 'toolcall_start'; contentIndex: number; id: string; toolName: string }
  | { type: 'toolcall_delta'; contentIndex: number; delta: string }
  | { type: 'toolcall_end'; contentIndex: number }
  | { type: 'done'; reason: string; usage: AssistantMessage['usage'] }
  | { type: 'error'; reason: string; errorMessage?: string; usage: AssistantMessage['usage'] };

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function POST(request: Request): Promise<Response> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: 'ANTHROPIC_API_KEY is not configured' },
      { status: 500 },
    );
  }

  let body: ProxyRequestBody;
  try {
    body = (await request.json()) as ProxyRequestBody;
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { model: clientModel, context, options } = body;

  if (!context || !context.messages) {
    return Response.json(
      { error: 'Missing context or messages' },
      { status: 400 },
    );
  }

  // -----------------------------------------------------------------------
  // System prompt: use the client-supplied prompt, but if the request
  // carries prospect metadata we rebuild the full demo system prompt
  // to ensure personalization stays in sync.
  // -----------------------------------------------------------------------
  let systemPrompt = context.systemPrompt ?? '';

  const prospectHeader = request.headers.get('x-demo-prospect');
  if (prospectHeader) {
    try {
      const prospect: ProspectHeader = JSON.parse(prospectHeader);
      systemPrompt = buildDefaultSystemPrompt(prospect);
    } catch {
      // Malformed header -- keep the prompt from the client context
    }
  }

  // -----------------------------------------------------------------------
  // Resolve model via pi-ai.
  // The client sends the full model descriptor, but we resolve a fresh one
  // server-side to inject the API key correctly.
  // -----------------------------------------------------------------------
  const modelId = clientModel?.id || 'claude-sonnet-4-5-20250929';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const model = getModel('anthropic', modelId as any);

  // Build the context for streamSimple
  const streamContext: Context = {
    systemPrompt,
    messages: context.messages,
    tools: context.tools,
  };

  // Build stream options, injecting the API key
  const streamOptions: SimpleStreamOptions = {
    apiKey,
    temperature: options?.temperature,
    maxTokens: options?.maxTokens ?? 1024,
    reasoning: options?.reasoning,
    cacheRetention: options?.cacheRetention,
    sessionId: options?.sessionId,
    headers: options?.headers,
    metadata: options?.metadata,
    transport: options?.transport,
    thinkingBudgets: options?.thinkingBudgets,
    maxRetryDelayMs: options?.maxRetryDelayMs,
  };

  // -----------------------------------------------------------------------
  // Stream the response
  // -----------------------------------------------------------------------
  try {
    const eventStream = streamSimple(model as Model<'anthropic-messages'>, streamContext, streamOptions);
    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        /**
         * Translates a full `AssistantMessageEvent` (from pi-ai) into a
         * slimmed-down `ProxyEvent` (what the client's `streamProxy` expects).
         *
         * The key difference is that proxy events omit the `partial` field
         * to reduce bandwidth -- the client reconstructs partial state locally.
         */
        function toProxyEvent(event: AssistantMessageEvent): ProxyEvent | null {
          switch (event.type) {
            case 'start':
              return { type: 'start' };

            case 'text_start':
              return { type: 'text_start', contentIndex: event.contentIndex };

            case 'text_delta':
              return {
                type: 'text_delta',
                contentIndex: event.contentIndex,
                delta: event.delta,
              };

            case 'text_end':
              return {
                type: 'text_end',
                contentIndex: event.contentIndex,
                contentSignature: (event.partial.content[event.contentIndex] as { textSignature?: string })?.textSignature,
              };

            case 'thinking_start':
              return { type: 'thinking_start', contentIndex: event.contentIndex };

            case 'thinking_delta':
              return {
                type: 'thinking_delta',
                contentIndex: event.contentIndex,
                delta: event.delta,
              };

            case 'thinking_end':
              return {
                type: 'thinking_end',
                contentIndex: event.contentIndex,
                contentSignature: (event.partial.content[event.contentIndex] as { thinkingSignature?: string })?.thinkingSignature,
              };

            case 'toolcall_start': {
              const content = event.partial.content[event.contentIndex];
              if (content && 'type' in content && content.type === 'toolCall') {
                return {
                  type: 'toolcall_start',
                  contentIndex: event.contentIndex,
                  id: content.id,
                  toolName: content.name,
                };
              }
              return null;
            }

            case 'toolcall_delta':
              return {
                type: 'toolcall_delta',
                contentIndex: event.contentIndex,
                delta: event.delta,
              };

            case 'toolcall_end':
              return {
                type: 'toolcall_end',
                contentIndex: event.contentIndex,
              };

            case 'done':
              return {
                type: 'done',
                reason: event.reason,
                usage: event.message.usage,
              };

            case 'error':
              return {
                type: 'error',
                reason: event.reason,
                errorMessage: event.error.errorMessage,
                usage: event.error.usage,
              };

            default:
              return null;
          }
        }

        try {
          for await (const event of eventStream) {
            const proxyEvent = toProxyEvent(event);
            if (proxyEvent) {
              const data = JSON.stringify(proxyEvent);
              controller.enqueue(encoder.encode(`data: ${data}\n`));
            }
          }
          controller.close();
        } catch (err) {
          console.error('[stream] SSE streaming error:', err);
          const errorEvent: ProxyEvent = {
            type: 'error',
            reason: 'error',
            errorMessage: err instanceof Error ? err.message : 'Unknown streaming error',
            usage: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, totalTokens: 0, cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, total: 0 } },
          };
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(errorEvent)}\n`));
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (err) {
    console.error('[stream] Anthropic API error:', err);
    return Response.json(
      { error: 'Failed to generate response' },
      { status: 502 },
    );
  }
}
