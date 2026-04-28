/**
 * POST /api/calendly
 *
 * Server-side Next.js Route Handler for Calendly scheduling operations.
 *
 * This endpoint acts as a secure proxy between the client-side Pi AgentTools
 * and the Calendly V2 REST API. It keeps the Calendly PAT token server-side
 * (via `CALENDLY_API_KEY` env var) so it is never exposed to the browser.
 *
 * Supported actions:
 *   - `check_availability` — Fetches available time slots for the configured
 *     event type within a date range.
 *   - `book_appointment` — Creates a single-use Calendly scheduling link that
 *     the prospect can use to confirm their booking.
 *
 * @module api/calendly
 */

import { NextResponse } from 'next/server';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Calendly V2 API base URL. */
const CALENDLY_BASE_URL = 'https://api.calendly.com';

/**
 * The Calendly event type URI for the Brightwave Trial meeting.
 *
 * This is the 30-minute meeting event owned by the demo Calendly account.
 * Discovered via `GET /event_types?user={user_uri}` during development.
 */
const EVENT_TYPE_URI =
  'https://api.calendly.com/event_types/a8a286cf-78b7-4192-81db-b69a677e9428';

/** Duration of the meeting in minutes (used to calculate end_time for slots). */
const MEETING_DURATION_MINUTES = 30;

// ---------------------------------------------------------------------------
// Request / Response types
// ---------------------------------------------------------------------------

/** Discriminated union of actions the endpoint accepts. */
interface CheckAvailabilityRequest {
  action: 'check_availability';
  /** ISO 8601 start date for the availability window. Defaults to now. */
  start_date?: string;
  /** Number of days ahead to search. Defaults to 5. */
  days_ahead?: number;
}

interface BookAppointmentRequest {
  action: 'book_appointment';
  /** ISO 8601 start time of the selected slot. */
  start_time: string;
  /** Full name of the person booking. */
  invitee_name: string;
  /** Email address of the person booking. */
  invitee_email: string;
}

type CalendlyActionRequest = CheckAvailabilityRequest | BookAppointmentRequest;

/** Shape of a single available time slot returned to the client. */
interface AvailableSlot {
  start_time: string;
  end_time: string;
  formatted: string;
}

/** Shape of a single entry in Calendly's available times collection. */
interface CalendlyAvailableTime {
  start_time: string;
  status: string;
  scheduling_url: string;
  invitees_remaining: number;
}

/** Shape of the Calendly scheduling link resource. */
interface CalendlySchedulingLinkResource {
  booking_url: string;
  owner: string;
  owner_type: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Makes an authenticated request to the Calendly V2 API.
 *
 * @param path    - API path (appended to CALENDLY_BASE_URL).
 * @param apiKey  - Calendly Personal Access Token.
 * @param options - Standard fetch RequestInit overrides.
 * @returns The fetch Response object.
 */
async function calendlyFetch(
  path: string,
  apiKey: string,
  options: RequestInit = {},
): Promise<Response> {
  const url = path.startsWith('http') ? path : `${CALENDLY_BASE_URL}${path}`;
  return fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      ...((options.headers as Record<string, string>) ?? {}),
    },
  });
}

/**
 * Formats an ISO 8601 date string into a human-readable slot description.
 *
 * @example
 * formatSlotTime('2026-06-25T14:00:00Z')
 * // => "Wednesday, June 25 at 10:00 AM ET"
 *
 * @param isoString - ISO 8601 datetime string.
 * @returns A human-friendly date/time string in US Eastern time.
 */
function formatSlotTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'America/New_York',
    timeZoneName: 'short',
  });
}

/**
 * Adds a duration in minutes to an ISO 8601 datetime string.
 *
 * @param isoString - The start time.
 * @param minutes   - Minutes to add.
 * @returns ISO 8601 string for the end time.
 */
function addMinutes(isoString: string, minutes: number): string {
  const date = new Date(isoString);
  date.setMinutes(date.getMinutes() + minutes);
  return date.toISOString();
}

// ---------------------------------------------------------------------------
// Action handlers
// ---------------------------------------------------------------------------

/**
 * Fetches available time slots from the Calendly API.
 *
 * Queries `GET /event_type_available_times` and returns up to 3 slots
 * spread across different days for a better user experience.
 *
 * @param apiKey    - Calendly PAT.
 * @param startDate - ISO 8601 start of the search window.
 * @param daysAhead - Number of days to search forward.
 * @returns An object with a `slots` array.
 */
async function handleCheckAvailability(
  apiKey: string,
  startDate?: string,
  daysAhead?: number,
): Promise<{ slots: AvailableSlot[] } | { error: string }> {
  const days = daysAhead ?? 5;
  const start = startDate ? new Date(startDate) : new Date();
  // Ensure start is not in the past
  if (start.getTime() < Date.now()) {
    start.setTime(Date.now());
  }
  // Round up to the next hour for cleaner results
  start.setMinutes(0, 0, 0);
  start.setHours(start.getHours() + 1);

  const end = new Date(start);
  end.setDate(end.getDate() + days);

  const params = new URLSearchParams({
    event_type: EVENT_TYPE_URI,
    start_time: start.toISOString(),
    end_time: end.toISOString(),
  });

  const res = await calendlyFetch(
    `/event_type_available_times?${params.toString()}`,
    apiKey,
  );

  if (!res.ok) {
    const body = await res.text();
    console.error('[calendly] check_availability failed:', res.status, body);
    return { error: `Calendly API returned ${res.status}: ${body}` };
  }

  const data = (await res.json()) as { collection: CalendlyAvailableTime[] };
  const availableSlots = data.collection.filter((s) => s.status === 'available');

  // Pick up to 3 slots spread across different days for variety
  const selectedSlots: AvailableSlot[] = [];
  const seenDays = new Set<string>();

  for (const slot of availableSlots) {
    const dayKey = slot.start_time.slice(0, 10); // YYYY-MM-DD
    if (!seenDays.has(dayKey)) {
      seenDays.add(dayKey);
      selectedSlots.push({
        start_time: slot.start_time,
        end_time: addMinutes(slot.start_time, MEETING_DURATION_MINUTES),
        formatted: formatSlotTime(slot.start_time),
      });
    }
    if (selectedSlots.length >= 3) break;
  }

  // If we didn't get 3 unique days, fill with more slots from available days
  if (selectedSlots.length < 3) {
    for (const slot of availableSlots) {
      if (selectedSlots.some((s) => s.start_time === slot.start_time)) continue;
      selectedSlots.push({
        start_time: slot.start_time,
        end_time: addMinutes(slot.start_time, MEETING_DURATION_MINUTES),
        formatted: formatSlotTime(slot.start_time),
      });
      if (selectedSlots.length >= 3) break;
    }
  }

  return { slots: selectedSlots };
}

/**
 * Creates a single-use Calendly scheduling link for the prospect.
 *
 * The Calendly V2 API does not support direct server-side booking (i.e.,
 * creating an invitee without a UI redirect). Instead, we generate a
 * single-use scheduling link via `POST /scheduling_links`. The prospect
 * receives this link as their booking confirmation URL.
 *
 * @param apiKey       - Calendly PAT.
 * @param _startTime   - ISO 8601 start time the user selected (logged for reference).
 * @param inviteeName  - Full name of the person booking.
 * @param inviteeEmail - Email address of the person booking.
 * @returns Booking confirmation with the scheduling URL.
 */
async function handleBookAppointment(
  apiKey: string,
  _startTime: string,
  inviteeName: string,
  inviteeEmail: string,
): Promise<
  | { success: boolean; confirmation_url: string; message: string }
  | { error: string }
> {
  // Create a single-use scheduling link for this event type
  const res = await calendlyFetch('/scheduling_links', apiKey, {
    method: 'POST',
    body: JSON.stringify({
      max_event_count: 1,
      owner: EVENT_TYPE_URI,
      owner_type: 'EventType',
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error('[calendly] book_appointment failed:', res.status, body);
    return { error: `Failed to create scheduling link: ${body}` };
  }

  const data = (await res.json()) as { resource: CalendlySchedulingLinkResource };
  const bookingUrl = data.resource.booking_url;

  // Format the selected time for the confirmation message
  const formattedTime = formatSlotTime(_startTime);

  return {
    success: true,
    confirmation_url: bookingUrl,
    message:
      `Booking link created for ${inviteeName} (${inviteeEmail}). ` +
      `Selected time: ${formattedTime}. ` +
      `Confirmation URL: ${bookingUrl}`,
  };
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

/**
 * POST handler for `/api/calendly`.
 *
 * Dispatches to the appropriate action handler based on the `action` field
 * in the JSON request body.
 *
 * @param request - Incoming Next.js request.
 * @returns JSON response with slots, booking confirmation, or error.
 */
export async function POST(request: Request): Promise<Response> {
  const apiKey = process.env.CALENDLY_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'CALENDLY_API_KEY is not configured' },
      { status: 500 },
    );
  }

  let body: CalendlyActionRequest;
  try {
    body = (await request.json()) as CalendlyActionRequest;
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body' },
      { status: 400 },
    );
  }

  if (!body.action) {
    return NextResponse.json(
      { error: 'Missing required field: action' },
      { status: 400 },
    );
  }

  try {
    switch (body.action) {
      case 'check_availability': {
        const result = await handleCheckAvailability(
          apiKey,
          body.start_date,
          body.days_ahead,
        );
        if ('error' in result) {
          return NextResponse.json(result, { status: 502 });
        }
        return NextResponse.json(result);
      }

      case 'book_appointment': {
        if (!body.start_time || !body.invitee_name || !body.invitee_email) {
          return NextResponse.json(
            {
              error:
                'Missing required fields: start_time, invitee_name, and invitee_email are all required.',
            },
            { status: 400 },
          );
        }
        const result = await handleBookAppointment(
          apiKey,
          body.start_time,
          body.invitee_name,
          body.invitee_email,
        );
        if ('error' in result) {
          return NextResponse.json(result, { status: 502 });
        }
        return NextResponse.json(result);
      }

      default:
        return NextResponse.json(
          {
            error: `Unknown action: "${(body as Record<string, unknown>).action}". Supported actions: check_availability, book_appointment.`,
          },
          { status: 400 },
        );
    }
  } catch (err) {
    console.error('[calendly] Unexpected error:', err);
    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : 'An unexpected error occurred while processing the Calendly request.',
      },
      { status: 500 },
    );
  }
}
