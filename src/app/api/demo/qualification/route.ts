/**
 * GET /api/demo/qualification?sessionId=...
 *
 * Returns the qualification result for a completed demo session.
 *
 * If the session exists and has ended, returns the full qualification
 * data including score, qualified status, reason, and the calendar
 * link for booking a follow-up. If the session hasn't ended yet (or
 * doesn't exist), returns `{ ready: false }`.
 *
 * The frontend polls this endpoint after triggering session_end to
 * determine whether to show the qualified (calendar booking) or
 * unqualified (nurture) post-call experience.
 */

import { sessionStore } from '@/app/api/demo/events/route'

/** Calendly link for qualified prospects to book a follow-up call. */
const CALENDLY_LINK = 'https://calendly.com/brightwave/demo-followup'

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url)
  const sessionId = url.searchParams.get('sessionId')

  if (!sessionId) {
    return Response.json(
      { error: 'Missing required query parameter: sessionId' },
      { status: 400 },
    )
  }

  const session = sessionStore.get(sessionId)

  // Session not found or not yet ended
  if (!session || !session.ended) {
    return Response.json({ ready: false })
  }

  // Session ended but qualification data not yet available
  // (summary build may still be in progress)
  if (!session.qualification) {
    return Response.json({ ready: false })
  }

  const { score, qualified, reason, fitSignals, intentSignals } =
    session.qualification

  return Response.json({
    ready: true,
    qualified,
    score,
    reason,
    fitSignals,
    intentSignals,
    calendarLink: qualified ? CALENDLY_LINK : undefined,
    recommendedNextStep: session.summary?.recommendedNextStep ?? 'nurture',
  })
}
