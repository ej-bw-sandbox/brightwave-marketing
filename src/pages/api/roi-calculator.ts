import type { APIRoute } from 'astro'
export const prerender = false
const HUBSPOT_ACCESS_TOKEN = import.meta.env.HUBSPOT_ACCESS_TOKEN || process.env.HUBSPOT_ACCESS_TOKEN
const POSTHOG_API_KEY = import.meta.env.POSTHOG_PROJECT_API_KEY || import.meta.env.PUBLIC_POSTHOG_KEY || import.meta.env.NEXT_PUBLIC_POSTHOG_KEY || process.env.POSTHOG_PROJECT_API_KEY || process.env.NEXT_PUBLIC_POSTHOG_KEY
const POSTHOG_HOST = import.meta.env.POSTHOG_HOST || import.meta.env.PUBLIC_POSTHOG_HOST || import.meta.env.NEXT_PUBLIC_POSTHOG_HOST || process.env.POSTHOG_HOST || process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.posthog.com'
const BRADY_OWNER_ID = '1933030119'
const DEAL_PIPELINE = '756272213'
const DEAL_STAGE = '1191664935'
const json = (data: any, status = 200) => new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } })
const hsHeaders = () => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${HUBSPOT_ACCESS_TOKEN}` })
async function hsPost(url: string, body: object) { const res = await fetch(url, { method: 'POST', headers: hsHeaders(), body: JSON.stringify(body) }); return { res, data: res.ok || res.status === 409 ? await res.json() : await res.text() } }
async function hsPatch(url: string, body: object) { const res = await fetch(url, { method: 'PATCH', headers: hsHeaders(), body: JSON.stringify(body) }); return { res, data: res.ok ? await res.json() : await res.text() } }
export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json()
    const { name, email, role, firmType, teamSize, dealsEvaluated, dealsCompleted, avgDealSize, avgHourlyRate, urgency, timeframe, annualCostSavings, totalHoursSaved, fteEquivalent, brightwaveAnnualCost, roi, dealValue, leadScore } = body
    if (!email || !name) return json({ error: 'Name and email required' }, 400)
    const [firstName, ...rest] = String(name).trim().split(' '); const lastName = rest.join(' '); const domain = email.split('@')[1] || ''; const companyName = firmType || domain.split('.')[0] || ''
    const timeframeLabel: Record<string, string> = { immediately: 'Immediately', 'this-quarter': 'This Quarter', '3-6-months': '3-6 Months', '6-plus-months': '6+ Months' }
    const roiSummary = [`ROI Calculator Submission`, ``, `Firm Type: ${firmType}`, `Role: ${role || 'N/A'}`, `Team Size: ${teamSize}`, `Deals Evaluated/yr: ${dealsEvaluated}`, `Deals Completed/yr: ${dealsCompleted}`, `Avg Deal Size: $${avgDealSize}M`, `Avg Hourly Rate: $${avgHourlyRate}`, ``, `Estimated Annual Savings: $${annualCostSavings?.toLocaleString?.() ?? annualCostSavings}`, `Hours Saved/yr: ${totalHoursSaved?.toLocaleString?.() ?? totalHoursSaved}`, `FTE Equivalent: ${fteEquivalent?.toFixed?.(1) ?? fteEquivalent}`, `Brightwave Annual Cost: $${brightwaveAnnualCost?.toLocaleString?.() ?? brightwaveAnnualCost}`, `ROI: ${roi?.toFixed?.(0) ?? roi}%`, ``, `Urgency: ${urgency}/10`, `Timeframe: ${timeframeLabel[timeframe] || timeframe}`, `Lead Score: ${leadScore}/10`].join('\n')
    if (!HUBSPOT_ACCESS_TOKEN) return json({ success: true })
    const contactProps: Record<string,string> = { firstname: firstName, lastname: lastName, email, company: companyName, jobtitle: role || '', hubspot_owner_id: BRADY_OWNER_ID, lifecyclestage: 'lead', hs_lead_status: 'NEW', lead_source: 'Inbound - Website Lead Form', industry: 'FINANCE', company_size: teamSize ? String(teamSize) : '', message: roiSummary, website: domain ? `https://${domain}` : '', lead_score: leadScore ? String(leadScore) : '', urgency_score: urgency ? String(urgency) : '', implementation_timeframe: timeframeLabel[timeframe] || timeframe || '', firm_type: firmType || '' }
    let contactId: string | null = null
    const { res: createRes, data: createData } = await hsPost('https://api.hubapi.com/crm/v3/objects/contacts', { properties: contactProps })
    if (createRes.ok) contactId = createData.id
    else if (createRes.status === 409) { contactId = createData?.message?.match(/Existing ID: (\d+)/)?.[1] ?? null; if (contactId) { const { lifecyclestage, ...updateProps } = contactProps; await hsPatch(`https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`, { properties: updateProps }) } }
    if (!contactId) return json({ success: true })
    let companyId: string | null = null
    if (domain) { const { res, data } = await hsPost('https://api.hubapi.com/crm/v3/objects/companies/search', { filterGroups: [{ filters: [{ propertyName: 'domain', operator: 'EQ', value: domain }] }], limit: 1 }); if (res.ok && data.total > 0) companyId = data.results[0].id }
    if (!companyId) { const { res, data } = await hsPost('https://api.hubapi.com/crm/v3/objects/companies', { properties: { name: companyName, domain: domain || '', industry: 'FINANCE', numberofemployees: teamSize ? String(teamSize) : '', hubspot_owner_id: BRADY_OWNER_ID, firm_type: firmType || '' } }); if (res.ok) companyId = data.id }
    if (companyId) await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${contactId}/associations/companies/${companyId}/contact_to_company`, { method: 'PUT', headers: hsHeaders() })
    const dealAmount = dealValue || Math.max(teamSize || 5, 5) * 6600
    const { res: dealRes, data: dealData } = await hsPost('https://api.hubapi.com/crm/v3/objects/deals', { properties: { dealname: companyName, pipeline: DEAL_PIPELINE, dealstage: DEAL_STAGE, amount: String(dealAmount), hubspot_owner_id: BRADY_OWNER_ID, dealtype: 'New Production', description: roiSummary, lead_score_custom: leadScore ? String(leadScore) : '', hs_priority: leadScore >= 7 ? 'high' : leadScore >= 4 ? 'medium' : 'low' } })
    if (dealRes.ok) { await fetch(`https://api.hubapi.com/crm/v3/objects/deals/${dealData.id}/associations/contacts/${contactId}/deal_to_contact`, { method: 'PUT', headers: hsHeaders() }); if (companyId) await fetch(`https://api.hubapi.com/crm/v3/objects/deals/${dealData.id}/associations/companies/${companyId}/deal_to_company`, { method: 'PUT', headers: hsHeaders() }) }
    await hsPost('https://api.hubapi.com/crm/v3/objects/notes', { properties: { hs_timestamp: new Date().toISOString(), hs_note_body: roiSummary, hubspot_owner_id: BRADY_OWNER_ID }, associations: [{ to: { id: contactId }, types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 202 }] }, ...(companyId ? [{ to: { id: companyId }, types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 190 }] }] : [])] })
    if (POSTHOG_API_KEY) await fetch(`${POSTHOG_HOST}/capture/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ api_key: POSTHOG_API_KEY, event: 'roi_calculator_completed', distinct_id: email, properties: { firmType, role, teamSize, dealsEvaluated, dealsCompleted, avgDealSize, avgHourlyRate, urgency, timeframe: timeframeLabel[timeframe] || timeframe, annualCostSavings, totalHoursSaved, fteEquivalent, brightwaveAnnualCost, roi, dealValue: dealAmount, leadScore, source: 'enterprise_page', $set: { email, name: String(name).trim(), company: companyName, jobtitle: role, lead_score: leadScore } } }) }).catch(() => {})
    return json({ success: true })
  } catch (err) { console.error('ROI calculator error:', err); return json({ error: 'Server error' }, 500) }
}
