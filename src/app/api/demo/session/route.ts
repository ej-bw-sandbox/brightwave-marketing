import { client } from '@/lib/sanity/client'
import { DEMO_PERSONA_QUERY } from '@/lib/sanity/queries/demoPersona'
import { buildDefaultSystemPrompt, buildFullKBText } from '@/lib/kb/brightwave'
import type { ProspectInfo } from '@/lib/demo/types'

/**
 * POST /api/demo/session
 *
 * Creates an Anam.ai session token for a demo persona.
 * Fetches persona config from Sanity, builds a personalized system prompt
 * with the Brightwave KB, and returns a session token for the client SDK.
 *
 * Anam.ai Connected App: api.anam.ai (label: brightwave)
 * The ANAM_API_KEY env var corresponds to the Anam connected app credentials.
 */

interface SessionRequestBody {
  personaId?: string
  prospect: Partial<ProspectInfo> & Record<string, unknown>
}

interface PersonaConfig {
  personaId: string
  anamAvatarId: string
  anamVoiceId: string
  anamLlmId: string
  anamPersonaName: string
  systemPromptOverride: string | null
  knowledgeBaseOverride: string | null
  greeting: string | null
  calendarLink: string | null
  qualificationThreshold: number
}

const DEFAULT_PERSONA_CONFIG: PersonaConfig = {
  personaId: 'default',
  anamAvatarId: process.env.ANAM_AVATAR_ID ?? '8a339c9f-0666-46bd-ab27-e90acd0409dc',
  anamVoiceId: process.env.ANAM_VOICE_ID ?? 'b482f972-1b1b-4337-ae60-940b90b5bb41',
  anamLlmId: process.env.ANAM_LLM_ID ?? '0934d97d-0c3a-4f33-91b0-5e136a0ef466',
  anamPersonaName: process.env.ANAM_PERSONA_NAME ?? 'Max',
  systemPromptOverride: null,
  knowledgeBaseOverride: null,
  greeting: null,
  calendarLink: null,
  qualificationThreshold: 60,
}

/**
 * Builds a personalization block from prospect context including ROI data.
 */
function buildPersonalizationBlock(
  prospect: Partial<ProspectInfo> & Record<string, unknown>,
): string {
  if (!prospect || Object.keys(prospect).length === 0) return ''

  const lines: string[] = ['## About This Prospect']

  // Identity
  if (prospect.name) lines.push(`- Name: ${prospect.name}`)
  if (prospect.email) lines.push(`- Email: ${prospect.email}`)
  if (prospect.company) lines.push(`- Company: ${prospect.company}`)
  if (prospect.role) lines.push(`- Role: ${prospect.role}`)

  // Firm context
  if (prospect.firmType) lines.push(`- Firm Type: ${prospect.firmType}`)
  if (prospect.teamSize) lines.push(`- Team Size: ${prospect.teamSize} people`)

  // ROI data — this is gold, use it
  if (prospect.annualCostSavings) {
    lines.push(`- Estimated Annual Cost Savings: $${Number(prospect.annualCostSavings).toLocaleString()}`)
  }
  if (prospect.roi) {
    lines.push(`- Estimated ROI: ${prospect.roi}%`)
  }
  if (prospect.totalHoursSaved) {
    lines.push(`- Estimated Hours Saved Per Year: ${prospect.totalHoursSaved}`)
  }
  if (prospect.dealsEvaluated) {
    lines.push(`- Deals Evaluated Per Year: ${prospect.dealsEvaluated}`)
  }
  if (prospect.avgDealSize) {
    lines.push(`- Average Deal Size: $${Number(prospect.avgDealSize).toLocaleString()}`)
  }
  if (prospect.timeframe) lines.push(`- Buying Timeframe: ${prospect.timeframe}`)
  if (prospect.urgency) lines.push(`- Urgency: ${prospect.urgency}`)

  lines.push('')
  lines.push('Use this information to personalize the conversation. Reference their specific numbers when relevant.')
  lines.push('If they have ROI data, lead with those numbers to establish value quickly.')
  lines.push(prospect.name
    ? `Address them as ${prospect.name.split(' ')[0]}.`
    : 'You do not know their name yet — ask for it naturally early in the conversation.')

  return lines.join('\n')
}

function buildSystemPrompt(
  persona: PersonaConfig,
  prospect: Partial<ProspectInfo> & Record<string, unknown>,
): string {
  // If there is a full system prompt override, use it directly
  if (persona.systemPromptOverride) {
    return persona.systemPromptOverride
  }

  const personalization = buildPersonalizationBlock(prospect)

  // If there is a KB override, build a custom prompt with that KB
  if (persona.knowledgeBaseOverride) {
    return `You are Max, Brightwave's AI sales guide. You are a knowledgeable, professional, and consultative salesperson who helps prospects understand how Brightwave can transform their investment research workflow.

${personalization}

## Knowledge Base
${persona.knowledgeBaseOverride}

## Conversation Guidelines
- Keep responses concise \u2014 under 60 words when possible.
- Address the prospect by first name when known.
- Drive the conversation forward: always end with a question that advances the sale.
- Be consultative, not pushy. Understand their workflow before pitching features.
- Never make up features or capabilities not listed in the knowledge base.
- Never mention competitors by name unless the prospect brings them up first.
- If asked about pricing, encourage scheduling a call for a tailored quote.

## Conversation Playbook
1. OPEN: Warm greeting, establish rapport, ask about their role and current workflow.
2. QUALIFY: Understand their firm type, team size, AUM, current research process, and pain points.
3. PITCH: Map their pain points to specific Brightwave features and value propositions.
4. HANDLE OBJECTIONS: Address concerns with proof points and customer evidence.
5. CLOSE: Suggest scheduling a deeper demo or workshop with the team.

## Qualification Scoring
Internally track a qualification score from 0-100 based on these signals. Do NOT share the score with the prospect.

### Fit Signals (up to 50 points)
- AUM $500M+: +15 points
- Firm type is PE, credit, growth equity, or hedge fund: +15 points
- Team size 5+: +10 points
- Currently doing manual research: +10 points

### Intent Signals (up to 50 points)
- Mentions specific pain points: +15 points
- Asks about pricing or packaging: +10 points
- Mentions timeline or urgency: +10 points
- Asks about integration or security: +10 points
- Requests a follow-up meeting: +5 points

When the conversation ends naturally (the user says goodbye, thanks you, or the session is wrapping up), include a JSON qualification block at the end of your final message in exactly this format:

{"qualification":{"score":<number>,"qualified":<boolean>,"reason":"<one-line summary>","fitSignals":["<signal1>","<signal2>"],"intentSignals":["<signal1>","<signal2>"]}}`
  }

  // Default: use the full KB with the buildDefaultSystemPrompt helper
  return buildDefaultSystemPrompt(prospect)
}

export async function POST(request: Request) {
  try {
    const body: SessionRequestBody = await request.json()
    const { personaId, prospect } = body

    if (!prospect) {
      return Response.json(
        { error: 'Missing required field: prospect' },
        { status: 400 },
      )
    }

    // Fetch persona config from Sanity, or fall back to defaults
    let persona: PersonaConfig = DEFAULT_PERSONA_CONFIG

    if (personaId) {
      const sanityPersona = await client.fetch<PersonaConfig | null>(
        DEMO_PERSONA_QUERY,
        { personaId },
        { next: { revalidate: 60 } },
      )

      if (sanityPersona) {
        persona = {
          ...DEFAULT_PERSONA_CONFIG,
          ...sanityPersona,
          qualificationThreshold:
            sanityPersona.qualificationThreshold ??
            DEFAULT_PERSONA_CONFIG.qualificationThreshold,
        }
      }
    }

    // Build the system prompt with prospect context and KB
    const systemPrompt = buildSystemPrompt(persona, prospect)

    // Create an Anam.ai session token
    // Uses the Anam connected app (api.anam.ai, label: brightwave)
    const anamApiKey = process.env.ANAM_API_KEY
    if (!anamApiKey) {
      console.error('ANAM_API_KEY environment variable is not set')
      return Response.json(
        { error: 'Server configuration error: missing Anam API key' },
        { status: 500 },
      )
    }

    // Resolve avatar and voice IDs: Sanity -> defaults (which already include env var fallback)
    const defaults = DEFAULT_PERSONA_CONFIG
    const avatarId = persona?.anamAvatarId ?? defaults.anamAvatarId
    const voiceId = persona?.anamVoiceId ?? defaults.anamVoiceId
    const personaName = persona?.anamPersonaName ?? defaults.anamPersonaName

    // Build the persona config for the new Anam API format.
    // The new API requires `personaConfig` with inline persona definition
    // instead of the legacy top-level `personaId` + `sessionConfig`.
    // See: https://docs.anam.ai/resources/migrating-legacy
    const anamResponse = await fetch(
      'https://api.anam.ai/v1/auth/session-token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${anamApiKey}`,
        },
        body: JSON.stringify({
          personaConfig: {
            name: personaName,
            avatarId,
            voiceId,
            llmId: persona?.anamLlmId ?? defaults.anamLlmId,
            systemPrompt,
          },
        }),
      },
    )

    if (!anamResponse.ok) {
      const errorText = await anamResponse.text()
      console.error(
        `Anam session token request failed: ${anamResponse.status} ${errorText}`,
      )
      return Response.json(
        { error: 'Failed to create avatar session' },
        { status: 502 },
      )
    }

    const { sessionToken } = await anamResponse.json()

    // Generate a session ID for event tracking
    const sessionId = `demo-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

    // Determine the calendar link: persona-specific or env fallback
    const calendarLink =
      persona.calendarLink ||
      process.env.NEXT_PUBLIC_CALENDLY_WORKSHOP_URL ||
      null

    // Build greeting: use name if available, otherwise a generic warm opener
    const prospectName = prospect.name ? ` ${prospect.name}` : ''
    const defaultGreeting = prospect.name
      ? `Hello${prospectName}! I'm Max from Brightwave. I'd love to show you how we're transforming investment research. What does your current research workflow look like?`
      : `Hello! I'm Max from Brightwave. Thanks for taking the time to chat. Before we dive in, may I ask your name?`

    return Response.json({
      sessionToken,
      sessionId,
      personaConfig: {
        greeting: persona.greeting || defaultGreeting,
        calendarLink,
        qualificationThreshold: persona.qualificationThreshold,
      },
    })
  } catch (error) {
    console.error('Error creating demo session:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
