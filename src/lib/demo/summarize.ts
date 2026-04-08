/**
 * Conversation summary builder for completed demo sessions.
 *
 * Processes the raw event stream into a structured ConversationSummary,
 * using an Anthropic Claude call to extract qualitative insights
 * (topics discussed, pain points, questions asked, and agent notes)
 * from the conversation transcript.
 *
 * Requires the `@anthropic-ai/sdk` package — install it with:
 *   npm install @anthropic-ai/sdk
 */

import Anthropic from '@anthropic-ai/sdk'
import type {
  ChatMessage,
  ConversationSummary,
  DemoSessionEvent,
  QualificationResult,
  ReactionEvent,
  RecommendedNextStep,
  TranscriptEntry,
} from './types'

/** Shape of the LLM extraction response. */
interface LLMExtraction {
  topicsDiscussed: string[]
  painPointsExpressed: string[]
  questionsAsked: string[]
  notes: string
}

/**
 * Calls Anthropic Claude to extract qualitative insights from a transcript.
 *
 * The model is asked to return a JSON object with four fields. If the LLM
 * call fails, a safe fallback with empty arrays is returned so the rest
 * of the pipeline is unaffected.
 */
async function extractInsightsFromTranscript(
  transcript: TranscriptEntry[],
): Promise<LLMExtraction> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    console.warn(
      '[summarize] ANTHROPIC_API_KEY is not set — skipping LLM extraction.',
    )
    return {
      topicsDiscussed: [],
      painPointsExpressed: [],
      questionsAsked: [],
      notes: 'LLM extraction skipped: ANTHROPIC_API_KEY not configured.',
    }
  }

  const client = new Anthropic({ apiKey })

  const formattedTranscript = transcript
    .map((t) => `[${t.speaker.toUpperCase()}]: ${t.text}`)
    .join('\n')

  const systemPrompt = `You are an expert sales analyst reviewing a demo conversation transcript between a prospect and an AI sales agent for Brightwave, an AI-powered research platform for financial services.

Analyze the transcript and extract the following in JSON format:
{
  "topicsDiscussed": ["topic1", "topic2", ...],
  "painPointsExpressed": ["pain point 1", "pain point 2", ...],
  "questionsAsked": ["question 1", "question 2", ...],
  "notes": "A concise 2-4 sentence summary of the conversation, the prospect's engagement level, and any notable signals for the sales team."
}

Rules:
- topicsDiscussed: List the main product topics, use cases, or features discussed.
- painPointsExpressed: List any explicit or implied pain points the prospect mentioned about their current workflow.
- questionsAsked: List the substantive questions the prospect asked (ignore phatic/greeting exchanges).
- notes: Write a brief, actionable summary for the sales team.
- Return ONLY the JSON object, no markdown fences or surrounding text.`

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `Here is the demo conversation transcript:\n\n${formattedTranscript}`,
        },
      ],
      system: systemPrompt,
    })

    const textBlock = response.content.find((block) => block.type === 'text')
    if (!textBlock || textBlock.type !== 'text') {
      throw new Error('No text block in Anthropic response')
    }

    const parsed = JSON.parse(textBlock.text) as LLMExtraction
    return {
      topicsDiscussed: parsed.topicsDiscussed ?? [],
      painPointsExpressed: parsed.painPointsExpressed ?? [],
      questionsAsked: parsed.questionsAsked ?? [],
      notes: parsed.notes ?? '',
    }
  } catch (error) {
    console.error('[summarize] LLM extraction failed:', error)
    return {
      topicsDiscussed: [],
      painPointsExpressed: [],
      questionsAsked: [],
      notes: 'LLM extraction failed — see server logs for details.',
    }
  }
}

/**
 * Determines the recommended next step based on qualification signals.
 *
 * - Qualified prospects with score >= 70 are routed to workshop booking.
 * - Qualified prospects with score 50-69 are routed to trial registration.
 * - Everyone else enters the nurture sequence.
 */
function determineNextStep(qualification: QualificationResult): RecommendedNextStep {
  if (qualification.qualified && qualification.score >= 70) {
    return 'workshop_booking'
  }
  if (qualification.qualified && qualification.score >= 50) {
    return 'trial_registration'
  }
  return 'nurture'
}

/**
 * Builds a full ConversationSummary from the raw session event stream.
 *
 * This function:
 * 1. Separates events by type (messages, reactions, chat, raise hands).
 * 2. Extracts the qualification result from the session_end event.
 * 3. Calculates session duration from first to last event timestamp.
 * 4. Calls the LLM to extract qualitative insights from the transcript.
 * 5. Returns a complete ConversationSummary object.
 */
export async function buildConversationSummary(
  sessionId: string,
  events: DemoSessionEvent[],
): Promise<ConversationSummary> {
  const transcript: TranscriptEntry[] = []
  const chatMessages: ChatMessage[] = []
  const reactions: ReactionEvent[] = []
  let raiseHandCount = 0
  let qualification: QualificationResult = {
    score: 0,
    qualified: false,
    reason: 'No qualification data received.',
    fitSignals: [],
    intentSignals: [],
  }
  let prospect = events[0]?.prospect ?? {
    name: 'Unknown',
    email: 'unknown@example.com',
    company: 'Unknown',
    role: 'Unknown',
  }

  for (const event of events) {
    // Always use the most recent prospect data
    if (event.prospect) {
      prospect = event.prospect
    }

    switch (event.eventType) {
      case 'message': {
        const payload = event.payload as { speaker: 'user' | 'agent'; text: string }
        transcript.push({
          speaker: payload.speaker,
          text: payload.text,
          timestamp: event.timestamp,
        })
        break
      }
      case 'chat_message': {
        const payload = event.payload as { sender: 'user' | 'agent'; text: string }
        chatMessages.push({
          sender: payload.sender,
          text: payload.text,
          timestamp: event.timestamp,
        })
        break
      }
      case 'reaction': {
        const payload = event.payload as { emoji: string }
        reactions.push({
          emoji: payload.emoji,
          timestamp: event.timestamp,
        })
        break
      }
      case 'raise_hand':
        raiseHandCount++
        break
      case 'session_end': {
        const payload = event.payload as { qualification?: QualificationResult }
        if (payload.qualification) {
          qualification = payload.qualification
        }
        break
      }
    }
  }

  // Calculate duration in seconds
  const timestamps = events.map((e) => new Date(e.timestamp).getTime())
  const duration =
    timestamps.length >= 2
      ? Math.round((Math.max(...timestamps) - Math.min(...timestamps)) / 1000)
      : 0

  // Extract qualitative insights via LLM
  const insights = await extractInsightsFromTranscript(transcript)

  const recommendedNextStep = determineNextStep(qualification)

  return {
    sessionId,
    date: new Date().toISOString(),
    duration,
    prospect,
    transcript,
    chatMessages,
    reactions,
    raiseHandCount,
    topicsDiscussed: insights.topicsDiscussed,
    painPointsExpressed: insights.painPointsExpressed,
    questionsAsked: insights.questionsAsked,
    qualification,
    recommendedNextStep,
    notes: insights.notes,
  }
}
