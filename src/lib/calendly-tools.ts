/**
 * Calendly Scheduling Tools for the Pi Agent
 *
 * Provides two Pi AgentTool factories that enable the demo avatar to check
 * Brady's calendar availability and book Brightwave Trial appointments
 * directly within the conversation.
 *
 * These tools follow the same pattern as `createFireEventTool()` in
 * `demo-agent.ts` — each factory returns a fully-typed {@link AgentTool}
 * with TypeBox parameter schemas and a client-side `execute` function
 * that calls the server-side `/api/calendly` route handler.
 *
 * @module lib/calendly-tools
 */

import { Type } from '@mariozechner/pi-ai';
import type { AgentTool, AgentToolResult } from '@mariozechner/pi-agent-core';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Parameter shape for the check_availability tool. */
interface CheckAvailabilityParams {
  start_date?: string;
  days_ahead?: number;
}

/** Parameter shape for the book_appointment tool. */
interface BookAppointmentParams {
  start_time: string;
  invitee_name: string;
  invitee_email: string;
}

/** Shape of a single slot returned by the /api/calendly endpoint. */
interface AvailableSlot {
  start_time: string;
  end_time: string;
  formatted: string;
}

/** Successful response from the check_availability action. */
interface CheckAvailabilityResponse {
  slots: AvailableSlot[];
}

/** Successful response from the book_appointment action. */
interface BookAppointmentResponse {
  success: boolean;
  confirmation_url: string;
  message: string;
}

/** Error response from the /api/calendly endpoint. */
interface CalendlyErrorResponse {
  error: string;
}

// ---------------------------------------------------------------------------
// Fallback URL
// ---------------------------------------------------------------------------

/**
 * Shown to the user when the Calendly API fails, so they can still book
 * manually via the web.
 */
const FALLBACK_URL = 'https://calendly.com/d/cv37-bhv-664/brightwave-trial';

// ---------------------------------------------------------------------------
// Tool: check_availability
// ---------------------------------------------------------------------------

/**
 * Creates the `check_availability` Pi AgentTool.
 *
 * This tool fetches upcoming available time slots from Brady's Calendly
 * calendar via the `/api/calendly` server route. It returns a
 * conversational text summary of up to 3 available slots that the
 * agent can read naturally to the prospect.
 *
 * @returns A fully-typed {@link AgentTool} for checking scheduling availability.
 *
 * @example
 * ```ts
 * const tools = [createCheckAvailabilityTool()];
 * const agent = createDemoAgent({ systemPrompt, tools });
 * ```
 */
export function createCheckAvailabilityTool(): AgentTool {
  return {
    name: 'check_availability',
    label: 'Check Calendar Availability',
    description:
      "Check Brady's calendar availability for a Brightwave Trial call. " +
      'Returns up to 3 available time slots over the next few days. ' +
      'Use this when a prospect expresses interest in scheduling a meeting.',
    parameters: Type.Object({
      start_date: Type.Optional(
        Type.String({
          description:
            'ISO 8601 date string for the start of the availability window. ' +
            'Defaults to today if not provided.',
        }),
      ),
      days_ahead: Type.Optional(
        Type.Number({
          description:
            'Number of days ahead to search for availability. Defaults to 5.',
        }),
      ),
    }),
    execute: async (
      _toolCallId: string,
      params: unknown,
    ): Promise<AgentToolResult<{ slots: AvailableSlot[] }>> => {
      const { start_date, days_ahead } = params as CheckAvailabilityParams;

      try {
        const res = await fetch('/api/calendly', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'check_availability',
            start_date,
            days_ahead,
          }),
        });

        if (!res.ok) {
          const errorData = (await res.json()) as CalendlyErrorResponse;
          return {
            content: [
              {
                type: 'text' as const,
                text:
                  'I was unable to check the calendar right now. ' +
                  `Please visit ${FALLBACK_URL} to see available times and book directly. ` +
                  `(Error: ${errorData.error})`,
              },
            ],
            details: { slots: [] },
          };
        }

        const data = (await res.json()) as CheckAvailabilityResponse;

        if (data.slots.length === 0) {
          return {
            content: [
              {
                type: 'text' as const,
                text:
                  'There are no available slots in the next few days. ' +
                  `Please visit ${FALLBACK_URL} to check for later availability.`,
              },
            ],
            details: { slots: [] },
          };
        }

        const slotDescriptions = data.slots
          .map((slot, i) => `${i + 1}. ${slot.formatted}`)
          .join('\n');

        return {
          content: [
            {
              type: 'text' as const,
              text:
                `I found ${data.slots.length} available slot${data.slots.length > 1 ? 's' : ''} ` +
                `for a Brightwave Trial call:\n${slotDescriptions}\n\n` +
                'The start_time values for these slots are: ' +
                data.slots.map((s) => s.start_time).join(', ') +
                '. Ask the prospect which time works best.',
            },
          ],
          details: { slots: data.slots },
        };
      } catch (err) {
        return {
          content: [
            {
              type: 'text' as const,
              text:
                'I encountered an error checking the calendar. ' +
                `Please direct the prospect to ${FALLBACK_URL} to book directly. ` +
                `(Error: ${err instanceof Error ? err.message : 'Unknown error'})`,
            },
          ],
          details: { slots: [] },
        };
      }
    },
  };
}

// ---------------------------------------------------------------------------
// Tool: book_appointment
// ---------------------------------------------------------------------------

/**
 * Creates the `book_appointment` Pi AgentTool.
 *
 * This tool creates a single-use Calendly scheduling link for the selected
 * time slot via the `/api/calendly` server route. The Calendly V2 API does
 * not support fully server-side booking, so the generated link allows the
 * prospect to complete the booking with one click.
 *
 * @returns A fully-typed {@link AgentTool} for booking appointments.
 *
 * @example
 * ```ts
 * const tools = [createBookAppointmentTool()];
 * const agent = createDemoAgent({ systemPrompt, tools });
 * ```
 */
export function createBookAppointmentTool(): AgentTool {
  return {
    name: 'book_appointment',
    label: 'Book Appointment',
    description:
      'Book a Brightwave Trial appointment for a prospect. ' +
      'Creates a single-use Calendly scheduling link for the selected time slot. ' +
      'Requires the start_time (ISO 8601), invitee name, and invitee email. ' +
      'Always confirm the email address with the prospect before calling this tool.',
    parameters: Type.Object({
      start_time: Type.String({
        description:
          'ISO 8601 start time of the selected slot (from check_availability results).',
      }),
      invitee_name: Type.String({
        description: "The prospect's full name.",
      }),
      invitee_email: Type.String({
        description:
          "The prospect's email address. Must be confirmed by the prospect before booking.",
      }),
    }),
    execute: async (
      _toolCallId: string,
      params: unknown,
    ): Promise<AgentToolResult<{ confirmation_url?: string }>> => {
      const { start_time, invitee_name, invitee_email } =
        params as BookAppointmentParams;

      try {
        const res = await fetch('/api/calendly', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'book_appointment',
            start_time,
            invitee_name,
            invitee_email,
          }),
        });

        if (!res.ok) {
          const errorData = (await res.json()) as CalendlyErrorResponse;
          return {
            content: [
              {
                type: 'text' as const,
                text:
                  'I was unable to complete the booking. ' +
                  `Please ask the prospect to visit ${FALLBACK_URL} to book directly. ` +
                  `(Error: ${errorData.error})`,
              },
            ],
            details: { confirmation_url: undefined },
          };
        }

        const data = (await res.json()) as BookAppointmentResponse;

        return {
          content: [
            {
              type: 'text' as const,
              text:
                `Booking link created successfully for ${invitee_name} (${invitee_email}). ` +
                `The confirmation URL is: ${data.confirmation_url} . ` +
                'Let the prospect know they will receive a calendar invite shortly ' +
                'and can use the confirmation link to finalize the booking details.',
            },
          ],
          details: { confirmation_url: data.confirmation_url },
        };
      } catch (err) {
        return {
          content: [
            {
              type: 'text' as const,
              text:
                'I encountered an error while booking the appointment. ' +
                `Please direct the prospect to ${FALLBACK_URL} to book directly. ` +
                `(Error: ${err instanceof Error ? err.message : 'Unknown error'})`,
            },
          ],
          details: { confirmation_url: undefined },
        };
      }
    },
  };
}
