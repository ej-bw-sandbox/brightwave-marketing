import type { APIRoute } from 'astro'
export const prerender = false
const CALENDLY_BASE_URL = 'https://api.calendly.com'
const EVENT_TYPE_URI = 'https://api.calendly.com/event_types/a8a286cf-78b7-4192-81db-b69a677e9428'
const MEETING_DURATION_MINUTES = 30
const json = (data: any, status = 200) => new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } })
async function calendlyFetch(path: string, apiKey: string, options: RequestInit = {}) { return fetch(path.startsWith('http') ? path : `${CALENDLY_BASE_URL}${path}`, { ...options, headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json', ...((options.headers as Record<string, string>) ?? {}) } }) }
function formatSlotTime(isoString: string) { return new Date(isoString).toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZone: 'America/New_York', timeZoneName: 'short' }) }
function addMinutes(isoString: string, minutes: number) { const date = new Date(isoString); date.setMinutes(date.getMinutes() + minutes); return date.toISOString() }
export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.CALENDLY_API_KEY || process.env.CALENDLY_API_KEY
  if (!apiKey) return json({ error: 'CALENDLY_API_KEY is not configured' }, 500)
  let body: any
  try { body = await request.json() } catch { return json({ error: 'Invalid JSON body' }, 400) }
  try {
    if (body.action === 'check_availability') {
      const start = body.start_date ? new Date(body.start_date) : new Date(); if (start.getTime() < Date.now()) start.setTime(Date.now()); start.setMinutes(0,0,0); start.setHours(start.getHours()+1)
      const end = new Date(start); end.setDate(end.getDate() + (body.days_ahead ?? 7))
      const params = new URLSearchParams({ event_type: EVENT_TYPE_URI, start_time: start.toISOString(), end_time: end.toISOString() })
      const res = await calendlyFetch(`/event_type_available_times?${params}`, apiKey)
      if (!res.ok) return json({ error: `Calendly API returned ${res.status}: ${await res.text()}` }, 502)
      const data = await res.json(); const selected: any[] = []; const seen = new Set<string>()
      for (const slot of (data.collection ?? []).filter((s:any)=>s.status === 'available')) { const day = slot.start_time.slice(0,10); if (!seen.has(day) || selected.length < 3) { seen.add(day); selected.push({ start_time: slot.start_time, end_time: addMinutes(slot.start_time, MEETING_DURATION_MINUTES), formatted: formatSlotTime(slot.start_time) }) } if (selected.length >= 3) break }
      return json({ slots: selected })
    }
    if (body.action === 'book_appointment') {
      if (!body.start_time || !body.invitee_name || !body.invitee_email) return json({ error: 'Missing required fields: start_time, invitee_name, and invitee_email are all required.' }, 400)
      const res = await calendlyFetch('/scheduling_links', apiKey, { method: 'POST', body: JSON.stringify({ max_event_count: 1, owner: EVENT_TYPE_URI, owner_type: 'EventType' }) })
      if (!res.ok) return json({ error: `Failed to create scheduling link: ${await res.text()}` }, 502)
      const data = await res.json(); const url = data.resource.booking_url
      return json({ success: true, confirmation_url: url, message: `Booking link created for ${body.invitee_name} (${body.invitee_email}). Selected time: ${formatSlotTime(body.start_time)}. Confirmation URL: ${url}` })
    }
    return json({ error: `Unknown action: ${body.action}` }, 400)
  } catch (err) { console.error('[calendly] Unexpected error:', err); return json({ error: err instanceof Error ? err.message : 'Unexpected error' }, 500) }
}
