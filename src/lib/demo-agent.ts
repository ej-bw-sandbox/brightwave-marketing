/**
 * Pi Agent factory for the Brightwave demo avatar session.
 *
 * This module creates a configured Pi {@link Agent} instance that proxies
 * LLM calls through the app's own `/api/stream` endpoint (matching Pi's
 * `streamProxy` convention). It is intentionally decoupled from React so
 * it can be tested and used independently of the UI layer.
 *
 * @module lib/demo-agent
 */

import { Agent, streamProxy } from '@mariozechner/pi-agent-core';
import type {
  AgentEvent,
  AgentMessage,
  AgentTool,
  AgentToolResult,
} from '@mariozechner/pi-agent-core';
import { getModel } from '@mariozechner/pi-ai';
import type { Message, Model } from '@mariozechner/pi-ai';
import { Type } from '@mariozechner/pi-ai';
import {
  createCheckAvailabilityTool,
  createBookAppointmentTool,
} from './calendly-tools';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * Configuration required to create a demo agent instance.
 *
 * @property systemPrompt  - The full system prompt (product KB + persona context).
 * @property modelId       - Anthropic model identifier (e.g. `"claude-sonnet-4-5-20250929"`).
 * @property proxyUrl      - Base URL for the streaming proxy. Defaults to `""` (same-origin).
 *                           Pi's `streamProxy` appends `/api/stream` automatically,
 *                           so the Next.js route must live at `/api/stream`.
 * @property sessionId     - Optional session identifier forwarded to the proxy for logging.
 * @property tools         - Additional {@link AgentTool} definitions to register.
 */
export interface DemoAgentConfig {
  systemPrompt: string;
  modelId?: string;
  proxyUrl?: string;
  sessionId?: string;
  tools?: AgentTool[];
}

/**
 * Payload shape for the `fire_analytics_event` tool.
 */
interface FireEventParams {
  eventType: string;
  payload: Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// Tool: fire_analytics_event
// ---------------------------------------------------------------------------

/**
 * Creates the `fire_analytics_event` tool definition.
 *
 * The tool lets the LLM fire analytics events (e.g. qualification results)
 * through the existing `/api/demo/events` endpoint. In practice the frontend
 * fires most events directly, but this gives the agent the ability to trigger
 * events natively if needed.
 *
 * @param sessionId  - Current demo session ID (passed to the events API).
 * @param prospect   - Prospect metadata forwarded with each event.
 * @returns A fully-typed {@link AgentTool}.
 */
export function createFireEventTool(
  sessionId: string,
  prospect: Record<string, unknown>,
): AgentTool {
  return {
    name: 'fire_analytics_event',
    label: 'Fire Analytics Event',
    description:
      'Fire an analytics event to the demo events pipeline. ' +
      'Use this to record session milestones or qualification results.',
    parameters: Type.Object({
      eventType: Type.String({
        description: 'Event type identifier (e.g. "qualification", "milestone").',
      }),
      payload: Type.Record(Type.String(), Type.Unknown(), {
        description: 'Arbitrary JSON payload for the event.',
      }),
    }),
    execute: async (
      _toolCallId: string,
      params: unknown,
    ): Promise<AgentToolResult<{ status: number }>> => {
      const { eventType, payload } = params as FireEventParams;
      const res = await fetch('/api/demo/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          eventType,
          payload,
          prospect,
          timestamp: new Date().toISOString(),
        }),
      });

      return {
        content: [
          {
            type: 'text' as const,
            text: res.ok
              ? `Event "${eventType}" recorded.`
              : `Event "${eventType}" failed (${res.status}).`,
          },
        ],
        details: { status: res.status },
      };
    },
  };
}

// ---------------------------------------------------------------------------
// Agent factory
// ---------------------------------------------------------------------------

/** Default Anthropic model used when the persona config does not specify one. */
const DEFAULT_MODEL_ID = 'claude-sonnet-4-5-20250929';

/**
 * Creates a Pi {@link Agent} configured for the Brightwave demo.
 *
 * The agent uses {@link streamProxy} to route all LLM calls through
 * `POST /api/stream` on the same origin. The backend handles
 * authentication, system prompt injection, and Anthropic API access.
 *
 * @param config - {@link DemoAgentConfig} with system prompt, model, and proxy URL.
 * @returns A ready-to-use Pi Agent instance.
 *
 * @example
 * ```ts
 * const agent = createDemoAgent({
 *   systemPrompt: buildDefaultSystemPrompt(prospect),
 *   modelId: persona.llmModel,
 * });
 *
 * agent.subscribe((event) => {
 *   if (event.type === 'message_update') {
 *     // stream text to UI
 *   }
 * });
 *
 * await agent.prompt("Tell me about Brightwave.");
 * ```
 */
export function createDemoAgent(config: DemoAgentConfig): Agent {
  const {
    systemPrompt,
    modelId = DEFAULT_MODEL_ID,
    proxyUrl = '',
    sessionId,
    tools = [],
  } = config;

  // Resolve the model descriptor from pi-ai's registry.
  // We use the Anthropic provider since the demo's LLM calls go through Claude.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const model = getModel('anthropic', modelId as any);

  // Merge caller-provided tools with the built-in Calendly scheduling tools.
  const allTools: AgentTool[] = [
    ...tools,
    createCheckAvailabilityTool(),
    createBookAppointmentTool(),
  ];

  const agent = new Agent({
    initialState: {
      systemPrompt,
      model: model as Model<'anthropic-messages'>,
      tools: allTools,
      messages: [],
    },
    /**
     * Route LLM calls through the demo streaming proxy.
     *
     * Pi's `streamProxy` appends `/api/stream` to `proxyUrl`, so with the
     * default `proxyUrl = ""` (same-origin), it fetches `POST /api/stream`.
     * The corresponding Next.js route lives at `src/app/api/stream/route.ts`.
     */
    streamFn: (m, context, options) =>
      streamProxy(m, context, {
        ...options,
        proxyUrl: proxyUrl || '',
        authToken: 'demo', // Same-origin; real auth handled server-side
      }),
    /**
     * Convert AgentMessages to LLM Messages.
     *
     * The demo only uses standard user/assistant messages, so we filter
     * to the three LLM-compatible roles and pass them through.
     */
    convertToLlm: (messages: AgentMessage[]): Message[] =>
      messages.filter(
        (m): m is Message =>
          'role' in m &&
          (m.role === 'user' || m.role === 'assistant' || m.role === 'toolResult'),
      ),
    sessionId,
  });

  return agent;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Extracts the accumulated plain text from an {@link AgentMessage}.
 *
 * Assistant messages have structured `content` arrays; this function
 * concatenates all `text` blocks into a single string. For user messages
 * the `content` field is already a string.
 *
 * @param message - The agent message to extract text from.
 * @returns The plain text content, or an empty string if none.
 */
export function getMessageText(message: AgentMessage): string {
  if (!message || !('role' in message)) return '';

  // User messages have string content
  if (message.role === 'user') {
    const content = message.content;
    if (typeof content === 'string') return content;
    if (Array.isArray(content)) {
      return content
        .filter((c): c is { type: 'text'; text: string } => c.type === 'text')
        .map((c) => c.text)
        .join('');
    }
    return '';
  }

  // Assistant messages have content array with TextContent blocks
  if (message.role === 'assistant' && Array.isArray(message.content)) {
    return message.content
      .filter((c): c is { type: 'text'; text: string } => c.type === 'text')
      .map((c) => c.text)
      .join('');
  }

  return '';
}

// Re-export types for convenience
export { Agent };
export type { AgentEvent, AgentMessage, AgentTool };
