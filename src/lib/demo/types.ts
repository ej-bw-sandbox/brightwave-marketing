/**
 * Shared TypeScript types for the Brightwave demo feature.
 *
 * These types define the data structures used across the session event
 * pipeline, conversation summary builder, qualification routing, and
 * HubSpot integration.
 */

/** Prospect information collected in the pre-session form. */
export interface ProspectInfo {
  name: string
  email: string
  company: string
  role: string
  aum?: string
  firmType?: string
  teamSize?: number
  annualCostSavings?: number
  totalHoursSaved?: number
  roi?: number
  dealsEvaluated?: number
  avgDealSize?: number
  timeframe?: string
  urgency?: string
}

/** A single timestamped transcript entry from the conversation. */
export interface TranscriptEntry {
  speaker: 'user' | 'agent'
  text: string
  timestamp: string
}

/** A text chat message sent through the sidebar chat panel. */
export interface ChatMessage {
  sender: 'user' | 'agent'
  text: string
  timestamp: string
}

/** An emoji reaction event fired from the reactions overlay. */
export interface ReactionEvent {
  emoji: string
  timestamp: string
}

/** Qualification result produced by the agent at session end. */
export interface QualificationResult {
  score: number
  qualified: boolean
  reason: string
  fitSignals: string[]
  intentSignals: string[]
}

/**
 * Event types emitted by the frontend during the demo session.
 *
 * - `session_start`: Fired when the Anam connection is established.
 * - `message`: Fired for each spoken transcript turn (user or agent).
 * - `raise_hand`: Fired when the user clicks the raise-hand button.
 * - `reaction`: Fired when the user selects an emoji reaction.
 * - `chat_message`: Fired when a text chat message is sent.
 * - `session_end`: Fired when the session is terminated, includes qualification data.
 */
export type DemoEventType =
  | 'session_start'
  | 'message'
  | 'raise_hand'
  | 'reaction'
  | 'chat_message'
  | 'session_end'

/** Payload shape for each event type. */
export interface DemoEventPayloads {
  session_start: Record<string, never>
  message: { speaker: 'user' | 'agent'; text: string }
  raise_hand: Record<string, never>
  reaction: { emoji: string }
  chat_message: { sender: 'user' | 'agent'; text: string }
  session_end: {
    qualification?: QualificationResult
  }
}

/** A single event dispatched from the frontend to POST /api/demo/events. */
export interface DemoSessionEvent<T extends DemoEventType = DemoEventType> {
  sessionId: string
  eventType: T
  payload: DemoEventPayloads[T]
  prospect: ProspectInfo
  timestamp: string
}

/** Recommended next step based on qualification outcome. */
export type RecommendedNextStep =
  | 'workshop_booking'
  | 'trial_registration'
  | 'nurture'

/**
 * Full structured summary of a completed demo conversation.
 *
 * Built by `buildConversationSummary()` after `session_end` is received.
 */
export interface ConversationSummary {
  sessionId: string
  date: string
  duration: number
  prospect: ProspectInfo
  transcript: TranscriptEntry[]
  chatMessages: ChatMessage[]
  reactions: ReactionEvent[]
  raiseHandCount: number
  topicsDiscussed: string[]
  painPointsExpressed: string[]
  questionsAsked: string[]
  qualification: QualificationResult
  recommendedNextStep: RecommendedNextStep
  notes: string
}
