/**
 * POST /api/demo/chat
 *
 * Streaming chat endpoint for the demo avatar session.
 * Receives the conversation history and streams back an LLM response
 * using Server-Sent Events (SSE).
 *
 * The frontend (useAnamSession) calls this after the user speaks,
 * then pipes the streamed text to the Anam avatar via client.talk().
 *
 * Requires env var: ANTHROPIC_API_KEY
 */

import Anthropic from '@anthropic-ai/sdk'
import { buildDefaultSystemPrompt } from '@/lib/kb/brightwave'

interface ChatRequestBody {
  sessionId: string
  messages: { role: 'user' | 'assistant'; content: string }[]
  prospect?: {
    name?: string
    email?: string
    company?: string
    role?: string
    aum?: string
    firmType?: string
  }
  persona?: {
    personaId?: string
    anamPersonaId: string
    llmModel: string
    knowledgeBase?: string
    greeting?: string
    calendarLink: string
  }
}

export async function POST(request: Request): Promise<Response> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return Response.json(
      { error: 'ANTHROPIC_API_KEY is not configured' },
      { status: 500 },
    )
  }

  let body: ChatRequestBody
  try {
    body = (await request.json()) as ChatRequestBody
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { messages, prospect, persona } = body

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return Response.json(
      { error: 'Missing or empty messages array' },
      { status: 400 },
    )
  }

  // Build system prompt with prospect context
  const systemPrompt = persona?.knowledgeBase
    ? persona.knowledgeBase
    : buildDefaultSystemPrompt(prospect ?? {})

  const client = new Anthropic({ apiKey })

  // Map messages to Anthropic format, ensuring alternating roles
  const anthropicMessages = messages.map((m) => ({
    role: m.role === 'assistant' ? ('assistant' as const) : ('user' as const),
    content: m.content,
  }))

  try {
    const stream = await client.messages.stream({
      model: persona?.llmModel || 'claude-sonnet-4-5-20250929',
      max_tokens: 1024,
      system: systemPrompt,
      messages: anthropicMessages,
    })

    // Return as SSE stream
    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === 'content_block_delta' &&
              event.delta.type === 'text_delta'
            ) {
              const data = JSON.stringify({ text: event.delta.text })
              controller.enqueue(encoder.encode(`data: ${data}\n\n`))
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()
        } catch (err) {
          console.error('[chat] Stream error:', err)
          controller.error(err)
        }
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (err) {
    console.error('[chat] Anthropic API error:', err)
    return Response.json(
      { error: 'Failed to generate response' },
      { status: 502 },
    )
  }
}
