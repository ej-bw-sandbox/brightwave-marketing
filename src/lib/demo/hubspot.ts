/**
 * HubSpot integration for demo session data.
 *
 * After a demo session ends, this module:
 * 1. Upserts a contact in HubSpot with the prospect's information and
 *    custom Brightwave demo properties.
 * 2. Creates a Note engagement associated with the contact containing
 *    a formatted summary of the entire conversation.
 *
 * All HubSpot API calls are wrapped in error handling so that failures
 * never propagate to the user-facing session end flow. Errors are logged
 * to the console for operational visibility.
 *
 * Requires env var: HUBSPOT_ACCESS_TOKEN (HubSpot private app token)
 */

import type { ConversationSummary } from './types'

const HUBSPOT_API_BASE = 'https://api.hubapi.com'

/** Convenience wrapper for authenticated HubSpot API requests. */
async function hubspotFetch(
  path: string,
  options: RequestInit = {},
): Promise<Response> {
  const token = process.env.HUBSPOT_ACCESS_TOKEN
  if (!token) {
    throw new Error('HUBSPOT_ACCESS_TOKEN environment variable is not set')
  }

  return fetch(`${HUBSPOT_API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  })
}

/**
 * Searches for an existing HubSpot contact by email address.
 * Returns the contact ID if found, or null otherwise.
 */
async function findContactByEmail(email: string): Promise<string | null> {
  const response = await hubspotFetch('/crm/v3/objects/contacts/search', {
    method: 'POST',
    body: JSON.stringify({
      filterGroups: [
        {
          filters: [
            {
              propertyName: 'email',
              operator: 'EQ',
              value: email,
            },
          ],
        },
      ],
      properties: ['email'],
      limit: 1,
    }),
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`HubSpot contact search failed (${response.status}): ${body}`)
  }

  const data = (await response.json()) as {
    total: number
    results: Array<{ id: string }>
  }
  return data.total > 0 ? data.results[0].id : null
}

/**
 * Creates a new HubSpot contact and returns the contact ID.
 */
async function createContact(
  properties: Record<string, string>,
): Promise<string> {
  const response = await hubspotFetch('/crm/v3/objects/contacts', {
    method: 'POST',
    body: JSON.stringify({ properties }),
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`HubSpot contact creation failed (${response.status}): ${body}`)
  }

  const data = (await response.json()) as { id: string }
  return data.id
}

/**
 * Updates an existing HubSpot contact by ID.
 */
async function updateContact(
  contactId: string,
  properties: Record<string, string>,
): Promise<void> {
  const response = await hubspotFetch(`/crm/v3/objects/contacts/${contactId}`, {
    method: 'PATCH',
    body: JSON.stringify({ properties }),
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`HubSpot contact update failed (${response.status}): ${body}`)
  }
}

/**
 * Splits a full name into first and last name components.
 * Handles single-word names, multi-word last names, and empty strings.
 */
function splitName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/)
  if (parts.length === 0 || (parts.length === 1 && parts[0] === '')) {
    return { firstName: '', lastName: '' }
  }
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: '' }
  }
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(' '),
  }
}

/**
 * Upserts a HubSpot contact: finds by email and updates, or creates new.
 *
 * Sets standard contact properties (name, email, company, job title) and
 * custom Brightwave demo properties (demo taken, qualification score, etc.).
 *
 * Returns the contact ID for associating engagements.
 */
export async function upsertContact(
  summary: ConversationSummary,
): Promise<string> {
  const { firstName, lastName } = splitName(summary.prospect.name)

  const properties: Record<string, string> = {
    firstname: firstName,
    lastname: lastName,
    email: summary.prospect.email,
    company: summary.prospect.company,
    jobtitle: summary.prospect.role,
    brightwave_demo_taken: 'true',
    brightwave_qualification_score: String(summary.qualification.score),
    brightwave_qualified: String(summary.qualification.qualified),
    brightwave_recommended_next_step: summary.recommendedNextStep,
    brightwave_demo_date: new Date().toISOString().split('T')[0],
  }

  const existingId = await findContactByEmail(summary.prospect.email)

  if (existingId) {
    await updateContact(existingId, properties)
    return existingId
  }

  return createContact(properties)
}

/**
 * Formats the conversation summary into the structured text body
 * used for the HubSpot note engagement.
 */
function formatNoteBody(summary: ConversationSummary): string {
  const dateStr = new Date(summary.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const durationMinutes = Math.round(summary.duration / 60)
  const qualifiedStatus = summary.qualification.qualified
    ? 'QUALIFIED'
    : 'UNQUALIFIED'

  const formatList = (items: string[]): string =>
    items.length > 0
      ? items.map((item) => `  * ${item}`).join('\n')
      : '  (none)'

  const nextStepDisplay: Record<string, string> = {
    workshop_booking: 'Workshop Booking',
    trial_registration: 'Trial Registration',
    nurture: 'Nurture Sequence',
  }

  return `BRIGHTWAVE DEMO SUMMARY - ${dateStr}
Prospect: ${summary.prospect.name} | ${summary.prospect.company} | ${summary.prospect.role}
Duration: ${durationMinutes} minutes
Qualification Score: ${summary.qualification.score}/100 | Status: ${qualifiedStatus}
Recommended Next Step: ${nextStepDisplay[summary.recommendedNextStep] ?? summary.recommendedNextStep}

TOPICS DISCUSSED:
${formatList(summary.topicsDiscussed)}

PAIN POINTS EXPRESSED:
${formatList(summary.painPointsExpressed)}

QUESTIONS ASKED:
${formatList(summary.questionsAsked)}

KEY QUALIFICATION SIGNALS:
Fit: ${summary.qualification.fitSignals.length > 0 ? summary.qualification.fitSignals.join(', ') : '(none)'}
Intent: ${summary.qualification.intentSignals.length > 0 ? summary.qualification.intentSignals.join(', ') : '(none)'}

AGENT NOTES:
${summary.notes}`
}

/**
 * Creates a HubSpot Note associated with the given contact.
 *
 * Uses the Notes API (v3 objects) to create a note and associate it
 * with the contact in a single request.
 */
export async function createDemoNote(
  contactId: string,
  summary: ConversationSummary,
): Promise<void> {
  const noteBody = formatNoteBody(summary)

  const response = await hubspotFetch('/crm/v3/objects/notes', {
    method: 'POST',
    body: JSON.stringify({
      properties: {
        hs_timestamp: new Date().toISOString(),
        hs_note_body: noteBody,
      },
      associations: [
        {
          to: { id: contactId },
          types: [
            {
              associationCategory: 'HUBSPOT_DEFINED',
              associationTypeId: 202,
            },
          ],
        },
      ],
    }),
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`HubSpot note creation failed (${response.status}): ${body}`)
  }
}

/**
 * Orchestrates the full HubSpot save flow after a demo session ends.
 *
 * 1. Upserts the contact with demo properties.
 * 2. Creates an associated note with the full conversation summary.
 *
 * All errors are caught and logged — this function never throws, ensuring
 * HubSpot failures do not break the user-facing session end experience.
 */
export async function saveDemoToHubSpot(
  summary: ConversationSummary,
): Promise<{ success: boolean; contactId?: string; error?: string }> {
  try {
    if (!process.env.HUBSPOT_ACCESS_TOKEN) {
      console.warn(
        '[hubspot] HUBSPOT_ACCESS_TOKEN is not set — skipping HubSpot save.',
      )
      return { success: false, error: 'HUBSPOT_ACCESS_TOKEN not configured' }
    }

    const contactId = await upsertContact(summary)
    await createDemoNote(contactId, summary)

    console.log(
      `[hubspot] Successfully saved demo for ${summary.prospect.email} (contact: ${contactId})`,
    )
    return { success: true, contactId }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unknown HubSpot error'
    console.error('[hubspot] Failed to save demo to HubSpot:', message)
    return { success: false, error: message }
  }
}
