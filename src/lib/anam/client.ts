/**
 * Anam.ai SDK Client Helper
 *
 * Provides typed wrappers around @anam-ai/js-sdk (v4.12.x) for creating
 * and managing avatar sessions. This module handles the browser-only
 * dynamic import pattern required for Next.js SSR compatibility.
 *
 * Connected App: api.anam.ai (label: brightwave)
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Lifecycle state of an Anam avatar session. */
export type AnamSessionState =
  | 'idle'
  | 'connecting'
  | 'connected'
  | 'ended'
  | 'error'

/** A single message in the avatar conversation. */
export interface AnamMessage {
  /** Unique identifier in the format `msg-{timestamp}-{counter}`. */
  id: string
  /** Who authored the message. */
  role: 'user' | 'persona' | 'system'
  /** Plain-text content of the message. */
  content: string
  /** Unix-epoch millisecond timestamp when the message was created. */
  timestamp: number
}

/**
 * Minimal typed surface of the Anam client returned by `createClient`.
 * Keeps consuming code type-safe without depending on the SDK at build time.
 */
export interface AnamClient {
  /** Begin streaming the avatar video/audio to the element with the given ID. */
  streamToVideoElement: (elementId: string) => Promise<void>
  /** Make the avatar speak the provided text with lip-sync. */
  talk: (text: string) => Promise<void>
  /** Interrupt the avatar mid-speech. */
  interruptPersona: () => void
  /** End the streaming session and release resources. */
  stopStreaming: () => void
  /** Mute the user's microphone input. */
  muteInputAudio: () => void
  /** Unmute the user's microphone input. */
  unmuteInputAudio: () => void
  /** Register an event listener on the SDK. */
  addListener: (event: string, callback: (...args: unknown[]) => void) => void
}

/**
 * SDK event constants surfaced by `@anam-ai/js-sdk`.
 * Defined here so consumers do not need to import the SDK directly.
 */
export interface AnamEvents {
  CONNECTION_ESTABLISHED: string
  CONNECTION_CLOSED: string
}

/** Return value of `createAnamSession`. */
export interface AnamSessionResult {
  client: AnamClient
  events: AnamEvents
}

// ---------------------------------------------------------------------------
// Session factory
// ---------------------------------------------------------------------------

/**
 * Dynamically imports the Anam SDK (browser-only) and returns an initialised
 * client for the given session token.
 *
 * @param sessionToken - A short-lived token obtained from `POST /api/demo/session`.
 * @returns An object containing the typed `AnamClient` and `AnamEvents` constants.
 *
 * @throws {Error} If called in a non-browser environment or the SDK fails to load.
 *
 * @example
 * ```ts
 * const { client, events } = await createAnamSession(token);
 * client.addListener(events.CONNECTION_ESTABLISHED, () => { ... });
 * await client.streamToVideoElement('anam-avatar-video');
 * ```
 */
export async function createAnamSession(
  sessionToken: string,
): Promise<AnamSessionResult> {
  if (typeof window === 'undefined') {
    throw new Error(
      'createAnamSession must be called in a browser environment. ' +
        'The Anam SDK requires DOM APIs and cannot run during SSR.',
    )
  }

  if (!sessionToken) {
    throw new Error('A valid session token is required to create an Anam session.')
  }

  // Dynamic import keeps the SDK out of the server bundle.
  // The SDK exports vary between CJS/ESM builds, so we probe for the
  // correct shape defensively.
  const anamSdk = await import('@anam-ai/js-sdk')
  const mod = anamSdk as Record<string, unknown>

  const createClient =
    (mod.createClient as (token: string) => AnamClient) ??
    ((mod.default as Record<string, unknown>)?.createClient as
      | ((token: string) => AnamClient)
      | undefined)

  if (typeof createClient !== 'function') {
    throw new Error(
      'Failed to resolve createClient from @anam-ai/js-sdk. ' +
        'Ensure the SDK is installed at a compatible version (^4.12.0).',
    )
  }

  const AnamEvent =
    (mod.AnamEvent as AnamEvents) ??
    ((mod.default as Record<string, unknown>)?.AnamEvent as AnamEvents | undefined)

  if (!AnamEvent) {
    throw new Error(
      'Failed to resolve AnamEvent from @anam-ai/js-sdk. ' +
        'Ensure the SDK is installed at a compatible version (^4.12.0).',
    )
  }

  const client = createClient(sessionToken)

  return {
    client,
    events: AnamEvent,
  }
}
