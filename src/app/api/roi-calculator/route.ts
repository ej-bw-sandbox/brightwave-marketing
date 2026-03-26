import { NextRequest, NextResponse } from 'next/server'

const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN
const POSTHOG_API_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.posthog.com'

const BRADY_OWNER_ID = '1933030119'
const DEAL_PIPELINE = '756272213'        // Deal Dashboard
const DEAL_STAGE = '1191664935'          // Meeting Booked

const hsHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
})

async function hsPost(url: string, body: object) {
  const res = await fetch(url, { method: 'POST', headers: hsHeaders(), body: JSON.stringify(body) })
  return { res, data: res.ok || res.status === 409 ? await res.json() : await res.text() }
}

async function hsPatch(url: string, body: object) {
  const res = await fetch(url, { method: 'PATCH', headers: hsHeaders(), body: JSON.stringify(body) })
  return { res, data: res.ok ? await res.json() : await res.text() }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      name, email, role, firmType, firmTypeValue, teamSize,
      dealsEvaluated, dealsCompleted, avgDealSize, avgHourlyRate,
      urgency, timeframe,
      annualCostSavings, totalHoursSaved, fteEquivalent,
      brightwaveAnnualCost, roi, dealValue, leadScore,
    } = body

    if (!email || !name) {
      return NextResponse.json({ error: 'Name and email required' }, { status: 400 })
    }

    const [firstName, ...rest] = (name as string).trim().split(' ')
    const lastName = rest.join(' ')
    const domain = email.split('@')[1] || ''
    const companyFromDomain = domain.split('.')[0] || ''
    const companyName = firmType || companyFromDomain

    const timeframeLabel: Record<string, string> = {
      'immediately': 'Immediately',
      'this-quarter': 'This Quarter',
      '3-6-months': '3-6 Months',
      '6-plus-months': '6+ Months',
    }

    const roiSummary = [
      `ROI Calculator Submission`,
      ``,
      `Firm Type: ${firmType}`,
      `Role: ${role || 'N/A'}`,
      `Team Size: ${teamSize}`,
      `Deals Evaluated/yr: ${dealsEvaluated}`,
      `Deals Completed/yr: ${dealsCompleted}`,
      `Avg Deal Size: $${avgDealSize}M`,
      `Avg Hourly Rate: $${avgHourlyRate}`,
      ``,
      `Estimated Annual Savings: $${annualCostSavings?.toLocaleString()}`,
      `Hours Saved/yr: ${totalHoursSaved?.toLocaleString()}`,
      `FTE Equivalent: ${fteEquivalent?.toFixed(1)}`,
      `Brightwave Annual Cost: $${brightwaveAnnualCost?.toLocaleString()}`,
      `ROI: ${roi?.toFixed(0)}%`,
      ``,
      `Urgency: ${urgency}/10`,
      `Timeframe: ${timeframeLabel[timeframe] || timeframe}`,
      `Lead Score: ${leadScore}/10`,
    ].join('\n')

    if (!HUBSPOT_ACCESS_TOKEN) {
      console.error('HUBSPOT_ACCESS_TOKEN not configured')
      return NextResponse.json({ success: true })
    }

    // ---- 1. Contact: create or update ----
    const contactProps = {
      firstname: firstName,
      lastname: lastName,
      email,
      company: companyName,
      jobtitle: role || '',
      hubspot_owner_id: BRADY_OWNER_ID,
      lifecyclestage: 'lead',
      hs_lead_status: 'NEW',
      lead_source: 'Inbound - Website Lead Form',
      industry: 'FINANCE',
      company_size: teamSize ? String(teamSize) : '',
      message: roiSummary,
      website: domain ? `https://${domain}` : '',
      // Custom properties
      lead_score_custom: leadScore ? String(leadScore) : '',
      urgency_score: urgency ? String(urgency) : '',
      implementation_timeframe: timeframe || '',
      firm_type: firmTypeValue || '',
    }

    let contactId: string | null = null
    const { res: createRes, data: createData } = await hsPost(
      'https://api.hubapi.com/crm/v3/objects/contacts',
      { properties: contactProps },
    )

    if (createRes.ok) {
      contactId = createData.id
    } else if (createRes.status === 409) {
      contactId = createData?.message?.match(/Existing ID: (\d+)/)?.[1] ?? null
      if (contactId) {
        // Don't overwrite lifecyclestage on existing contacts (HubSpot prevents backward movement)
        const { lifecyclestage: _, ...updateProps } = contactProps
        void _
        await hsPatch(
          `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`,
          { properties: updateProps },
        )
      }
    } else {
      console.error('HubSpot contact creation failed:', createData)
    }

    if (!contactId) {
      return NextResponse.json({ success: true })
    }

    // ---- 2. Company: find or create, then associate ----
    let companyId: string | null = null

    if (domain) {
      // Search by domain first (more reliable than name)
      const { res: searchRes, data: searchData } = await hsPost(
        'https://api.hubapi.com/crm/v3/objects/companies/search',
        { filterGroups: [{ filters: [{ propertyName: 'domain', operator: 'EQ', value: domain }] }], limit: 1 },
      )
      if (searchRes.ok && searchData.total > 0) {
        companyId = searchData.results[0].id
      }
    }

    if (!companyId) {
      const { res: compCreateRes, data: compCreateData } = await hsPost(
        'https://api.hubapi.com/crm/v3/objects/companies',
        {
          properties: {
            name: companyName,
            domain: domain || '',
            industry: 'FINANCE',
            numberofemployees: teamSize ? String(teamSize) : '',
            hubspot_owner_id: BRADY_OWNER_ID,
            firm_type: firmTypeValue || '',
            annualrevenue: avgDealSize && dealsCompleted
              ? String(avgDealSize * dealsCompleted * 1_000_000)
              : '',
          },
        },
      )
      if (compCreateRes.ok) {
        companyId = compCreateData.id
      } else {
        console.error('HubSpot company creation failed:', compCreateData)
      }
    }

    if (companyId) {
      await fetch(
        `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}/associations/companies/${companyId}/contact_to_company`,
        { method: 'PUT', headers: hsHeaders() },
      )
    }

    // ---- 3. Deal: create and associate ----
    const dealAmount = dealValue || Math.max(teamSize || 5, 5) * 6600
    const { res: dealRes, data: dealData } = await hsPost(
      'https://api.hubapi.com/crm/v3/objects/deals',
      {
        properties: {
          dealname: companyName,
          pipeline: DEAL_PIPELINE,
          dealstage: DEAL_STAGE,
          amount: String(dealAmount),
          hubspot_owner_id: BRADY_OWNER_ID,
          dealtype: 'newbusiness',
          description: roiSummary,
          lead_score_custom: leadScore ? String(leadScore) : '',
          hs_priority: leadScore >= 7 ? 'high' : leadScore >= 4 ? 'medium' : 'low',
        },
      },
    )

    if (dealRes.ok) {
      const dealId = dealData.id
      // Associate deal → contact
      await fetch(
        `https://api.hubapi.com/crm/v3/objects/deals/${dealId}/associations/contacts/${contactId}/deal_to_contact`,
        { method: 'PUT', headers: hsHeaders() },
      )
      // Associate deal → company
      if (companyId) {
        await fetch(
          `https://api.hubapi.com/crm/v3/objects/deals/${dealId}/associations/companies/${companyId}/deal_to_company`,
          { method: 'PUT', headers: hsHeaders() },
        )
      }
    } else {
      console.error('HubSpot deal creation failed:', dealData)
    }

    // ---- 4. Note: log form submission as activity on the contact ----
    await hsPost('https://api.hubapi.com/crm/v3/objects/notes', {
      properties: {
        hs_timestamp: new Date().toISOString(),
        hs_note_body: roiSummary,
        hubspot_owner_id: BRADY_OWNER_ID,
      },
      associations: [
        {
          to: { id: contactId },
          types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 202 }], // note_to_contact
        },
        ...(companyId ? [{
          to: { id: companyId },
          types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 190 }], // note_to_company
        }] : []),
      ],
    })

    // ---- 5. PostHog: identify + event ----
    if (POSTHOG_API_KEY) {
      await fetch(`${POSTHOG_HOST}/capture/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: POSTHOG_API_KEY,
          event: 'roi_calculator_completed',
          distinct_id: email,
          properties: {
            firmType, role, teamSize,
            dealsEvaluated, dealsCompleted, avgDealSize, avgHourlyRate,
            urgency, timeframe: timeframeLabel[timeframe] || timeframe,
            annualCostSavings, totalHoursSaved, fteEquivalent,
            brightwaveAnnualCost, roi, dealValue: dealAmount, leadScore,
            source: 'enterprise_page',
            $set: {
              email,
              name: name?.trim(),
              company: companyName,
              jobtitle: role,
              lead_score: leadScore,
            },
          },
        }),
      }).catch(err => console.error('PostHog capture failed:', err))
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('ROI calculator error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
