import type { APIRoute } from 'astro'

export const prerender = false

const HUBSPOT_ACCESS_TOKEN = import.meta.env.HUBSPOT_ACCESS_TOKEN || process.env.HUBSPOT_ACCESS_TOKEN
const POSTHOG_API_KEY = import.meta.env.POSTHOG_PROJECT_API_KEY || import.meta.env.PUBLIC_POSTHOG_KEY || import.meta.env.NEXT_PUBLIC_POSTHOG_KEY || process.env.POSTHOG_PROJECT_API_KEY || process.env.NEXT_PUBLIC_POSTHOG_KEY
const POSTHOG_HOST = import.meta.env.POSTHOG_HOST || import.meta.env.PUBLIC_POSTHOG_HOST || import.meta.env.NEXT_PUBLIC_POSTHOG_HOST || process.env.POSTHOG_HOST || process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.posthog.com'
const BRADY_OWNER_ID = '1933030119'

const json = (data: any, status = 200) => new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } })
const hsHeaders = () => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${HUBSPOT_ACCESS_TOKEN}` })

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json()
    const { firstName, lastName, email, company, message, referralCode, partnerType } = body
    if (!firstName || !email) return json({ error: 'First name and email are required.' }, 400)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: 'Please provide a valid email address.' }, 400)
    if (!HUBSPOT_ACCESS_TOKEN) {
      console.error('HUBSPOT_ACCESS_TOKEN is not configured')
      return json({ success: true, message: 'Thank you for reaching out! We will be in touch shortly.' })
    }
    const domain = email.split('@')[1] || ''
    const companyName = company || domain.split('.')[0] || ''
    const contactProps: Record<string,string> = {
      firstname: firstName, lastname: lastName || '', email, company: companyName, hubspot_owner_id: BRADY_OWNER_ID,
      lifecyclestage: 'lead', hs_lead_status: 'NEW', lead_source: 'Inbound - Website Lead Form', message: message || '', website: domain ? `https://${domain}` : '',
    }
    let contactId: string | null = null
    const createRes = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', { method: 'POST', headers: hsHeaders(), body: JSON.stringify({ properties: contactProps }) })
    if (createRes.ok) contactId = (await createRes.json()).id
    else if (createRes.status === 409) {
      const conflict = await createRes.json()
      contactId = conflict?.message?.match(/Existing ID: (\d+)/)?.[1] ?? null
      if (contactId) {
        const { lifecyclestage, ...updateProps } = contactProps
        await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`, { method: 'PATCH', headers: hsHeaders(), body: JSON.stringify({ properties: updateProps }) })
      }
    } else {
      console.error('HubSpot contact creation failed:', await createRes.text())
      return json({ error: 'Failed to submit. Please try again.' }, 500)
    }
    if (contactId && companyName) {
      let companyId: string | null = null
      if (domain) {
        const searchRes = await fetch('https://api.hubapi.com/crm/v3/objects/companies/search', { method: 'POST', headers: hsHeaders(), body: JSON.stringify({ filterGroups: [{ filters: [{ propertyName: 'domain', operator: 'EQ', value: domain }] }], limit: 1 }) })
        if (searchRes.ok) { const sd = await searchRes.json(); if (sd.total > 0) companyId = sd.results[0].id }
      }
      if (!companyId) {
        const compRes = await fetch('https://api.hubapi.com/crm/v3/objects/companies', { method: 'POST', headers: hsHeaders(), body: JSON.stringify({ properties: { name: companyName, domain: domain || '', hubspot_owner_id: BRADY_OWNER_ID } }) })
        if (compRes.ok) companyId = (await compRes.json()).id
      }
      if (companyId) await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${contactId}/associations/companies/${companyId}/contact_to_company`, { method: 'PUT', headers: hsHeaders() })
      const noteBody = ['Contact Form Submission', '', `Name: ${firstName} ${lastName || ''}`.trim(), `Email: ${email}`, `Company: ${companyName}`, partnerType ? `Partner Type: ${partnerType}` : '', referralCode ? `Referral Code: ${referralCode}` : '', message ? `Message: ${message}` : ''].filter(Boolean).join('\n')
      await fetch('https://api.hubapi.com/crm/v3/objects/notes', { method: 'POST', headers: hsHeaders(), body: JSON.stringify({ properties: { hs_timestamp: new Date().toISOString(), hs_note_body: noteBody, hubspot_owner_id: BRADY_OWNER_ID }, associations: [{ to: { id: contactId }, types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 202 }] }, ...(companyId ? [{ to: { id: companyId }, types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 190 }] }] : [])] }) })
    }
    if (POSTHOG_API_KEY) await fetch(`${POSTHOG_HOST}/capture/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ api_key: POSTHOG_API_KEY, event: 'contact_form_submitted', distinct_id: email, properties: { firstName, lastName: lastName || '', company: companyName, source: 'contact_page', $set: { email, name: `${firstName} ${lastName || ''}`.trim(), company: companyName } } }) }).catch(() => {})
    return json({ success: true, message: 'Thank you for reaching out! We will be in touch shortly.' })
  } catch (err) {
    console.error('Contact form error:', err)
    return json({ error: 'Something went wrong. Please try again.' }, 500)
  }
}
