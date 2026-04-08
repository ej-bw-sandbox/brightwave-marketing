/**
 * POST /api/demo/events
 *
 * Receives real-time events from the demo page frontend during an
 * Anam avatar session. Events are appended to an in-memory session
 * store keyed by sessionId.
 *
 * On `session_end` events, this route triggers the async HubSpot save
 * pipeline (contact upsert + note creation) and stores the final
 * qualification result for retrieval via GET /api/demo/qualification.
 *
 * IMPORTANT: The session store is a module-level Map. In a single-instance
 * deployment (e.g. a long-running Node server or Vercel with a single
 * serverless function instance), sessions accumulate in memory and are
 * accessible across requests. In a multi-instance or edge deployment,
 * sessions may be split across isolates. For production use at scale,
 * replace this with Redis or another external store. The Map is declared
 * with `globalThis` to survive hot-module reloads in development.
 */

import { buildConversationSummary } from '@/lib/demo/summarize'
import { saveDemoToHubSpot } from '@/lib/demo/hubspot'
import type {
  ConversationSummary,
  DemoEventType,
  DemoSessionEvent,
  QualificationResult,
} from '@/lib/demo/types'

/** Session store shape. */
interface SessionData {
  events: DemoSessionEvent[]
  qualification: QualificationResult | null
  summary: ConversationSummary | null
  ended: boolean
}

/**
 * Module-level session store. Uses globalThis to persist across hot reloads
 * in Next.js development mode. In production, each serverless cold start
 * begins with an empty store.
 */
const globalStore = globalThis as unknown as {
  __demoSessionStore?: Map<string, SessionData>
}

if (!globalStore.__demoSessionStore) {
  globalStore.__demoSessionStore = new Map<string, SessionData>()
}

export const sessionStore: Map<string, SessionData> = globalStore.__demoSessionStore

/** Valid event types accepted by this endpoint. */
const VALID_EVENT_TYPES: Set<DemoEventType> = new Set([
  'session_start',
  'message',
  'raise_hand',
  'reaction',
  'chat_message',
  'session_end',
])

export async function POST(request: Request): Promise<Response> {
  let body: DemoSessionEvent

  try {
    body = (await request.json()) as DemoSessionEvent
  } catch {
    return Response.json(
      { error: 'Invalid JSON body' },
      { status: 400 },
    )
  }

  // Validate required fields
  const { sessionId, eventType, payload, prospect, timestamp } = body

  if (!sessionId || typeof sessionId !== 'string') {
    return Response.json(
      { error: 'Missing or invalid sessionId' },
      { status: 400 },
    )
  }

  if (!eventType || !VALID_EVENT_TYPES.has(eventType)) {
    return Response.json(
      { error: `Invalid eventType: ${String(eventType)}. Must be one of: ${[...VALID_EVENT_TYPES].join(', ')}` },
      { status: 400 },
    )
  }

  if (payload === undefined || payload === null) {
    return Response.json(
      { error: 'Missing payload' },
      { status: 400 },
    )
  }

  if (!timestamp) {
    return Response.json(
      { error: 'Missing timestamp' },
      { status: 400 },
    )
  }

  // Prospect validation: require email only on session_end (for HubSpot save).
  // Other event types are accepted even without an email so that session
  // data (messages, reactions, etc.) is never lost due to missing form fields.
  if (eventType === 'session_end' && (!prospect || !prospect.email)) {
    console.warn(
      `[events] session_end for ${sessionId} has no prospect email — HubSpot save will be skipped.`,
    )
  }

  // Initialize session if needed
  if (!sessionStore.has(sessionId)) {
    sessionStore.set(sessionId, {
      events: [],
      qualification: null,
      summary: null,
      ended: false,
    })
  }

  const session = sessionStore.get(sessionId)!

  // Reject events for already-ended sessions
  if (session.ended && eventType !== 'session_end') {
    return Response.json(
      { error: 'Session has already ended' },
      { status: 409 },
    )
  }

  // Append the event
  session.events.push(body)

  // Handle session_end: trigger summary build and HubSpot save
  if (eventType === 'session_end') {
    session.ended = true

    // Extract qualification from the session_end payload
    const endPayload = payload as {
      qualification?: QualificationResult
      conversationHistory?: { role: string; content: string }[]
    }
    if (endPayload.qualification) {
      session.qualification = endPayload.qualification
    }

    // If the session_end includes a conversation history fallback (sent by the
    // client in case earlier message events were lost), inject them into the
    // session events so the summary builder has the full transcript.
    if (endPayload.conversationHistory && Array.isArray(endPayload.conversationHistory)) {
      const existingMessageCount = session.events.filter(
        (e) => e.eventType === 'message',
      ).length
      // Only backfill if we have fewer stored messages than the client sent
      // (subtract 1 for session_end which was just pushed)
      if (existingMessageCount <= 1 && endPayload.conversationHistory.length > 0) {
        console.log(
          `[events] Backfilling ${endPayload.conversationHistory.length} conversation entries from session_end payload for session ${sessionId}`,
        )
        for (const entry of endPayload.conversationHistory) {
          const speaker = entry.role === 'user' ? 'user' : 'agent'
          session.events.push({
            sessionId,
            eventType: 'message',
            payload: { speaker, text: entry.content },
            prospect: prospect || { name: '', email: '', company: '', role: '' },
            timestamp,
          } as DemoSessionEvent)
        }
      }
    }

    // Return 200 immediately — process summary + HubSpot save in the background
    // so the frontend is not blocked waiting for external API calls.
    const responsePromise = buildConversationSummary(sessionId, session.events)
      .then(async (summary) => {
        session.summary = summary

        // Persist qualification from summary if not already set from payload
        if (!session.qualification) {
          session.qualification = summary.qualification
        }

        // Only attempt HubSpot save if we have a prospect email
        if (!prospect || !prospect.email) {
          console.warn(
            `[events] Skipping HubSpot save for session ${sessionId}: no prospect email`,
          )
          return
        }

        // Save to HubSpot
        const result = await saveDemoToHubSpot(summary)
        if (!result.success) {
          console.error(
            `[events] HubSpot save failed for session ${sessionId}: ${result.error}`,
          )
        } else {
          console.log(
            `[events] HubSpot save succeeded for session ${sessionId} (contact: ${result.contactId})`,
          )
        }
      })
      .catch((error) => {
        console.error(
          `[events] Summary build failed for session ${sessionId}:`,
          error,
        )
      })

    // Use waitUntil if available (Vercel), otherwise the promise runs detached
    if (typeof globalThis !== 'undefined' && 'waitUntil' in (request as unknown as Record<string, unknown>)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (request as any).waitUntil(responsePromise)
    }

    return Response.json({
      success: true,
      sessionId,
      eventType,
      message: 'Session ended. Summary and HubSpot save initiated.',
    })
  }

  return Response.json({
    success: true,
    sessionId,
    eventType,
    eventCount: session.events.length,
  })
}
