# DEMO_BUILD_BRIEF.md

> **Purpose:** Architecture and pattern reference for three parallel build agents adding a `/demo` page to the marketing site with an embedded Anam.ai sales avatar experience.
>
> **Generated from:** Code review of `ej-bw-sandbox/brightwave-marketing` and `ej-bw-sandbox/sales-avatar` repos.

---

## Table of Contents

1. [Marketing Site Architecture](#1-marketing-site-architecture)
2. [Enterprise Page & Form Patterns](#2-enterprise-page--form-patterns)
3. [Sanity CMS Integration](#3-sanity-cms-integration)
4. [Component Conventions](#4-component-conventions)
5. [Environment Variables](#5-environment-variables)
6. [Sales Avatar Architecture](#6-sales-avatar-architecture)
7. [Anam.ai SDK Integration](#7-anamai-sdk-integration)
8. [Video Call UI Components](#8-video-call-ui-components)
9. [Session Lifecycle](#9-session-lifecycle)
10. [State Management](#10-state-management)
11. [Chat, Reactions & Controls](#11-chat-reactions--controls)
12. [Non-Anam Integrations (Ignore/Replace)](#12-non-anam-integrations-ignorereplace)
13. [Knowledge Base (Verbatim)](#13-knowledge-base-verbatim)
14. [CLAUDE.md / AI Agent Config](#14-claudemd--ai-agent-config)

---

## 1. Marketing Site Architecture

### Framework & Build
- **Framework:** Next.js ^16.0.4 with App Router (NOT Pages Router)
- **React:** ^19.2.4
- **Node:** 20.x
- **Package manager:** npm 10.8.2 (`npm install --legacy-peer-deps`)
- **TypeScript:** strict
- **Build tool:** Turbopack (dev), standard Next.js build (prod)

### package.json Scripts
```json
{
  "dev": "next dev --turbopack",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "typecheck": "tsc --noEmit",
  "sanity:dev": "...",
  "sanity:deploy": "...",
  "sanity:typegen": "...",
  "format": "...",
  "analyze": "..."
}
```

### next.config.ts Key Settings
- **Images:** Allowed domains: `cdn.sanity.io`, `cdn.prod.website-files.com`
- **Redirects:** `/pricing` -> `/enterprise`, `/comparison` -> `/comparisons`, `/security` -> `/enterprise-security-compliance`
- **Headers:** Content-Security-Policy for `/studio`, X-Frame-Options DENY everywhere else
- **Logging:** `{ fetches: { fullUrl: true } }`

### Deployment
- **Platform:** Vercel
- **Region:** `iad1` (US East)
- **vercel.json:** Framework nextjs, `npm install --legacy-peer-deps`, font caching headers

### Routing Structure
```
src/app/
  layout.tsx              <- Root layout
  (marketing)/            <- Route group for all marketing pages
    layout.tsx            <- Marketing layout (header/footer)
    enterprise/
      page.tsx            <- Server component, fetches from Sanity
      roi-calculator.tsx  <- Client component (wizard form)
    about/
    blog/
    contact/
    ... (30+ routes)
  (legal)/                <- Route group for legal pages
    privacy-policy/
    terms-of-use/
  api/                    <- API routes
    contact/
    roi-calculator/
    draft-mode/
    revalidate/
  studio/                 <- Sanity Studio (embedded)
```

**Key pattern:** Route groups `(marketing)` and `(legal)` share different layouts. All marketing pages live under `(marketing)/`.

**For the demo page, create: `src/app/(marketing)/demo/page.tsx`**

---

## 2. Enterprise Page & Form Patterns

### localStorage Schema
**There is NO localStorage usage for form data.** The only localStorage key in the entire codebase is:
- `theme` -- used for dark mode toggle in the root layout (`localStorage.getItem('theme')`)

Form data is managed entirely in React state (`useState`) and submitted via `fetch()` to API routes.

### Query Parameter Patterns
**There are NO query parameters used anywhere in the marketing site.** No `useSearchParams` or `searchParams` usage exists. The site is entirely server-rendered from Sanity CMS data.

However, the **sales-avatar** app DOES use query params: `?name=...&email=...&mode=discovery|demo` -- keep this in mind for the demo page integration.

### ROI Calculator Form (Reference Pattern)
The enterprise page's ROI Calculator (`src/app/(marketing)/enterprise/roi-calculator.tsx`) is the best reference for building a multi-step form:

- **Pattern:** `'use client'` component, 5-step wizard
- **State:** All form data in `useState<Partial<CalcData>>({ urgency: 5 })`
- **Validation:** Per-step boolean checks (e.g., `isStep1Valid = !!data.firmType && !!data.teamSize`)
- **Submission:** `fetch('/api/roi-calculator', { method: 'POST', ... })`
- **Styling:** Inline CSS via template literal + `dangerouslySetInnerHTML` (self-contained, no external stylesheets)

### Contact Form Patterns
Two contact form implementations exist:
1. `src/components/forms/ContactForm.tsx` -- Classic `fetch()` POST to `/api/contact`
2. `src/components/forms/contact-form.tsx` -- React 19 `useActionState` server action pattern

### API Route Pattern
```typescript
// src/app/api/roi-calculator/route.ts (example structure)
export async function POST(request: Request) {
  const body = await request.json()
  // Process, validate, forward to HubSpot, etc.
  return Response.json({ success: true })
}
```

---

## 3. Sanity CMS Integration

### Configuration
- **Project ID:** `v4tc8ohn`
- **Dataset:** `production`
- **API Version:** `2024-01-01`
- **Studio path:** `/studio`

### Client Setup (`src/lib/sanity/client.ts`)
```typescript
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: true,
  stega: {
    enabled: process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview',
    studioUrl: '/studio',
  },
})

export const draftClient = createClient({
  // Same but useCdn: false, token: process.env.SANITY_API_TOKEN, perspective: 'previewDrafts'
})
```

### GROQ Query Pattern
Queries are stored as exported template literals in `src/lib/sanity/queries/`:

```typescript
// src/lib/sanity/queries/enterprise.ts
export const enterpriseQuery = `
  *[_type == "enterpriseSalesPage"][0]{
    heroHeadline, heroSubheadline,
    heroCtas[]{ label, url, style, openInNewTab },
    socialProofHeadline,
    // ... all fields
    seo
  }
`
```

Pages fetch data using:
```typescript
const doc = await client.fetch(enterpriseQuery, {}, { next: { tags: ['enterpriseSalesPage', 'testimonial'], revalidate: 60 } })
```

### Schema Structure
```
src/sanity/schemaTypes/
  index.ts                <- Exports all schemas as `schemaTypes` array
  documents/              <- Document type schemas
    homepage.ts
    enterprise-page.ts    <- enterpriseSalesPage (singleton)
    case-study.ts
    content-post.ts
    testimonial.ts
    ... (30+ document types)
  objects/                <- Object type schemas
    seo-fields.ts         <- `seo` object type
    cta-block.ts          <- `cta` object type
    metric-stat.ts        <- `stat` object type
    portable-text.ts      <- `blockContent` rich text
    testimonial.ts        <- `testimonialRef` reference type
    ...
```

### Schema Definition Pattern
```typescript
import { defineType, defineField } from 'sanity'

export const enterpriseSalesPage = defineType({
  name: 'enterpriseSalesPage',
  title: 'Enterprise Sales Page',
  type: 'document',
  fields: [
    defineField({ name: 'heroHeadline', title: 'Hero Headline', type: 'string' }),
    defineField({ name: 'heroCtas', title: 'Hero CTAs', type: 'array', of: [{ type: 'cta' }] }),
    defineField({ name: 'testimonials', title: 'Testimonials', type: 'array', of: [{ type: 'testimonialRef' }] }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  preview: { prepare: () => ({ title: 'Enterprise Sales Page' }) },
})
```

### Singleton Pattern
Singleton documents have fixed IDs matching their schema name (e.g., `documentId('enterpriseSalesPage')`). They are configured in `src/sanity/sanity.config.ts` and `src/sanity/structure.ts`.

### Portable Text Rendering
```typescript
import { PortableText } from '@portabletext/react'
import { ptComponents } from '@/lib/sanity/portable-text-components'
// Usage: <PortableText value={doc.body} components={ptComponents} />
```

---

## 4. Component Conventions

### UI Library
- **Base:** shadcn/ui (new-york style)
- **Config:** `components.json` at root
- **Icon library:** Lucide React
- **Styling:** Tailwind CSS v4 + CVA (class-variance-authority) + clsx + tailwind-merge

### cn() Utility
```typescript
// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### Import Aliases
```
@/components  -> src/components
@/components/ui -> src/components/ui
@/lib         -> src/lib
@/lib/utils   -> src/lib/utils
@/hooks       -> src/hooks
```

### Component Directory Structure
```
src/components/
  forms/
    ContactForm.tsx       <- POST to /api/contact
    contact-form.tsx      <- Server action pattern
    demo-form.tsx         <- Placeholder (not implemented)
    resource-gate-form.tsx
    rsvp-form.tsx
  layout/
    header-wrapper.tsx
    header-client.tsx
    footer.tsx
    logo.tsx
    nav.tsx
  sections/               <- Page-level section components
    Hero.tsx
    CtaSection.tsx
    CtaButton.tsx
    FeatureBlock.tsx
    TestimonialGrid.tsx
    SectionWrapper.tsx
    PortableTextRenderer.tsx
    ... (20+ section components)
  ui/                     <- Low-level UI primitives
    AccordionItem.tsx
    FadeInOnScroll.tsx
    LogoMarquee.tsx
    LottiePlayer.tsx
    RenderField.tsx
    TestimonialSlider.tsx
    button.tsx            <- shadcn button
```

### Tailwind Theme (Marketing Site)
```css
/* Custom breakpoints */
sm: 480px, md: 768px, lg: 992px, xl: 1280px, 2xl: 1440px

/* Brand colors */
bw-gray-50 through bw-gray-800
bw-yellow-200 through bw-yellow-800
brand-400, brand-500, brand-600

/* Font */
"PST Mail Sans" (custom web font)
```

### CSS Architecture
The marketing site uses a hybrid approach:
1. **Tailwind v4** utility classes via `@import "tailwindcss" layer(utilities)`
2. **Webflow CSS** imported from `/public/webflow-css/` (legacy migration from Webflow)
3. **Inline styles** via `dangerouslySetInnerHTML` for component-scoped CSS (see ROI calculator)

**For new components, prefer Tailwind classes. Use shadcn patterns (cn() utility, CVA variants).**

---

## 5. Environment Variables

### Marketing Site (.env.example)
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=v4tc8ohn
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=sk_...
SANITY_WEBHOOK_SECRET=webhook_...
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://us.posthog.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXX
HUBSPOT_ACCESS_TOKEN=pat-...
HUBSPOT_PORTAL_ID=44461736
NEXT_PUBLIC_ALGOLIA_APP_ID=...
NEXT_PUBLIC_ALGOLIA_SEARCH_KEY=...
ALGOLIA_ADMIN_KEY=...
NEXT_PUBLIC_SENTRY_DSN=https://...
SENTRY_AUTH_TOKEN=sntrys_...
```

### New Env Vars Needed for Demo Page
```bash
# Anam.ai avatar (add to .env.example)
NEXT_PUBLIC_ANAM_API_URL=https://api.anam.ai
ANAM_API_KEY=               # Server-side only, for session token creation
NEXT_PUBLIC_ANAM_AVATAR_ID=8a339c9f-0666-46bd-ab27-e90acd0409dc

# Anthropic (for chat route, server-side only)
ANTHROPIC_API_KEY=

# Deepgram (for STT, server-side token vending)
DEEPGRAM_API_KEY=
```

---

## 6. Sales Avatar Architecture

### Monorepo Structure
```
ej-bw-sandbox/sales-avatar/
  packages/
    web/          <- Next.js 14 frontend (React 18, Tailwind 3)
    api/          <- Express.js API server (Railway)
    shared/       <- Shared types and KB content
    widget/       <- Embeddable widget build
    nemo-proxy/   <- NemoClaw inference proxy (IGNORE)
```

### Key Dependency: `@anam-ai/js-sdk` ^4.12.0

### API Server (Express)
The API server at `packages/api/` provides these endpoints:
| Endpoint | Purpose |
|---|---|
| `POST /api/anam-session` | Creates Anam session token (proxies to `api.anam.ai/v1/auth/session-token`) |
| `GET /api/deepgram-token` | Vends short-lived Deepgram API key for browser STT |
| `POST /api/chat` | Claude streaming LLM (SSE) with sales agent system prompt |
| `POST /api/tts` | ElevenLabs TTS proxy (PCM stream) -- **LEGACY, not used in current flow** |
| `POST /api/demo/dispatch` | Rivet/Playwright demo sandbox -- **IGNORE** |
| `GET /api/health` | Health check |

### Current Pipeline
```
User mic -> Deepgram STT (browser WebSocket, nova-3)
         -> POST /api/chat (Claude streaming, SSE)
         -> anamClient.talk(responseText)  [Anam speaks + lip-syncs]
```

The avatar uses Anam's native TTS via `talk()`. ElevenLabs TTS endpoint exists but is not called in the current web client.

---

## 7. Anam.ai SDK Integration

### Session Creation
**Backend creates session token:**
```typescript
// POST to https://api.anam.ai/v1/auth/session-token
const anamRes = await fetch('https://api.anam.ai/v1/auth/session-token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${anamApiKey}`,  // ANAM_API_KEY env var
  },
  body: JSON.stringify({
    personaConfig: {
      avatarId,  // '8a339c9f-0666-46bd-ab27-e90acd0409dc'
    },
  }),
});
const { sessionToken } = await anamRes.json();
```

### SDK Initialization (Client-side)
```typescript
// Dynamic import (browser-only, avoid SSR)
const anamSdk = await import('@anam-ai/js-sdk');
const mod = anamSdk as any;
const createAnamClient = mod.createClient ?? mod.default?.createClient;
const AnamEvent = mod.AnamEvent ?? mod.default?.AnamEvent;

// Create client with session token (no disableInputAudio)
const anamClient = createAnamClient(sessionToken);
```

### Key SDK Methods Used
| Method | Purpose |
|---|---|
| `createClient(sessionToken)` | Create client instance |
| `anamClient.streamToVideoElement('anam-avatar-video')` | Start video streaming to a `<video>` element by ID |
| `anamClient.talk(text)` | Make avatar speak text with lip-sync (returns Promise) |
| `anamClient.interruptPersona()` | Stop current speech |
| `anamClient.stopStreaming()` | End the session |
| `anamClient.muteInputAudio()` | Mute mic |
| `anamClient.unmuteInputAudio()` | Unmute mic |
| `anamClient.addListener(event, callback)` | Listen for SDK events |

### SDK Events
| Event | Description |
|---|---|
| `AnamEvent.CONNECTION_ESTABLISHED` | WebRTC connection is live |
| `AnamEvent.CONNECTION_CLOSED` | Connection was lost |

### Required HTML Elements
```html
<video id="anam-avatar-video" autoPlay playsInline />
<audio id="anam-avatar-audio" autoPlay style={{ display: 'none' }} />
```

The video element must have `id="anam-avatar-video"` for `streamToVideoElement()`.

### Persona Config
- **Avatar ID:** `8a339c9f-0666-46bd-ab27-e90acd0409dc` (env: `NEXT_PUBLIC_ANAM_AVATAR_ID`)
- **Persona ID:** `0d52760b-454e-4b74-b814-46056748c1f4` (env: `NEXT_PUBLIC_ANAM_PERSONA_ID`, for reference)
- **Character name:** Max

---

## 8. Video Call UI Components

### Component Map (from `packages/web/src/components/`)

| File | Purpose | Client? |
|---|---|---|
| `AvatarVideoPanel.tsx` | Full-height video panel with loading/error/idle/ended states. Renders `<video>` and `<audio>` elements. Has LIVE indicator overlay. | Yes |
| `BottomToolbar.tsx` | Zoom-style bottom toolbar: Mute, Camera, Chat, React, Share Screen (demo mode), End Call. Uses `TBtn` sub-component. | Yes |
| `ChatSidePanel.tsx` | Slide-in chat panel (right side, 380px). Shows messages, typing input, timestamps. Messages styled by role (user/persona/system). | Yes |
| `SelfViewPip.tsx` | Draggable picture-in-picture self-view camera. Gets user media, renders to `<video>`. | Yes |
| `ReactionsOverlay.tsx` | Emoji reaction picker (thumbs up, party, heart, clap, laugh) + floating emoji animation. | Yes |
| `EndCallModal.tsx` | Modal with two options: "Talk to a live person" (schedule) or "End call". Contains `ScheduleSelector`. | Yes |
| `ScheduleSelector.tsx` | Mock time slot picker for booking a sales call. Hardcoded slots. | Yes |
| `StatusIndicators.tsx` | Top-left status pills: connection state dot, elapsed timer, LIVE badge. | Yes |
| `StatusBadge.tsx` | Compact status badge component (idle/connecting/connected/ended/error). | Yes |
| `PreSessionForm.tsx` | Pre-call screen with name/email form + "Book a Live Demo" and "On-Demand Demo" tiles. Reads `?name` and `?email` from URL. | Yes |
| `SessionControls.tsx` | Alternative control panel (start/end, mic toggle, audio level meter, text input, "Book a Demo" CTA). Not used in main page. | Yes |
| `TranscriptPanel.tsx` | Scrollable conversation transcript. Similar to ChatSidePanel but read-only display. | Yes |
| `DemoScreenPanel.tsx` | Screen share panel for Rivet sandbox demos. WebSocket frame streaming to canvas. **IGNORE -- Rivet integration.** | Yes |
| `RivetSandboxPanel.tsx` | Rivet sandbox panel. **IGNORE.** | Yes |

### Main Page Component (`packages/web/src/app/page.tsx`)
The main page orchestrates everything in `VideoCallInner`:
1. Reads `?name`, `?email`, `?mode` query params
2. If params present, auto-starts session
3. Otherwise shows minimal name/email form
4. When session starts, shows full-screen video with overlays:
   - `StatusIndicators` (top-left)
   - Brand mark (top-right)
   - `SelfViewPip` (bottom-right, draggable)
   - `BottomToolbar` (bottom-center)
   - `ReactionsOverlay` (above toolbar)
   - `ChatSidePanel` (right slide-in)
   - `EndCallModal` (centered modal)

---

## 9. Session Lifecycle

### Hook: `useAvatarSession()` (`packages/web/src/hooks/useAvatarSession.ts`)

**Exposed API:**
```typescript
const {
  status,       // SessionStatus: 'idle' | 'connecting' | 'connected' | 'ended' | 'error'
  messages,     // Message[]: { id, role, content, timestamp }
  isMicMuted,   // boolean
  error,        // string | null
  videoRef,     // RefObject<HTMLVideoElement>
  startSession, // (config?: SessionConfig) => Promise<void>
  endSession,   // () => void
  toggleMic,    // () => void
  sendText,     // (text: string) => void
} = useAvatarSession();
```

### Session Start Flow
```
1. POST /api/anam-session { avatarId } -> { sessionToken }
2. Dynamic import @anam-ai/js-sdk
3. createClient(sessionToken) -> anamClient
4. anamClient.addListener(CONNECTION_ESTABLISHED, ...)
5. anamClient.addListener(CONNECTION_CLOSED, ...)
6. anamClient.streamToVideoElement('anam-avatar-video')
7. anamClient.talk(greeting) -- avatar says hello
8. startDeepgramSTT() -- mic -> Deepgram WebSocket -> transcription
9. setStatus('connected')
```

### Conversation Flow
```
Deepgram speech_final -> handleUserSpeech(transcript)
  -> If avatar speaking: anamClient.interruptPersona()
  -> Abort previous chat request
  -> appendMessage('user', transcript)
  -> POST /api/chat (SSE stream)
  -> Accumulate response text, update 'persona' message
  -> anamClient.talk(fullResponse) -- avatar speaks response
```

### Session End Flow
```
endSession() ->
  1. deepgramSocket.close()
  2. mediaRecorder.stop()
  3. mediaStream tracks stop
  4. anamClient.stopStreaming()
  5. setStatus('ended')
  6. router.push('/post-call')
```

### Message Format
```typescript
interface Message {
  id: string;           // 'msg-{timestamp}-{counter}'
  role: 'user' | 'persona' | 'system';
  content: string;
  timestamp: number;    // Date.now()
}
```

---

## 10. State Management

**All state is plain React hooks.** No Zustand, Redux, or Context.

### In `useAvatarSession` hook:
- `useState<SessionStatus>('idle')` -- connection state
- `useState<Message[]>([])` -- chat messages
- `useState<boolean>(false)` -- mic muted
- `useState<string | null>(null)` -- error message
- `useRef` for: anamClient, videoElement, deepgramSocket, mediaRecorder, mediaStream, conversationHistory, abortController

### In `page.tsx` (VideoCallInner):
- `useState(true)` -- cameraOn
- `useState(false)` -- chatOpen
- `useState(false)` -- reactionsOpen
- `useState(false)` -- endCallModalOpen
- `useState('')` -- nameInput, emailInput
- `useState(false)` -- hasStarted
- `useMemo` -- mode (from searchParams)

---

## 11. Chat, Reactions & Controls

### Chat Messages (`ChatSidePanel.tsx`)
- Messages array from `useAvatarSession().messages`
- Role-based styling: user (indigo/right), persona (dark bg/left), system (gray/italic)
- Text input at bottom, sends via `onSendText` -> `handleUserSpeech()`
- Auto-scrolls to bottom on new messages

### Reactions (`ReactionsOverlay.tsx`)
- 5 fixed reactions: thumbs up, party, heart, clap, laugh
- Picker appears above toolbar when `pickerOpen` is true
- Selected emoji floats up and fades out (2s animation)
- Purely visual -- no server communication

### Bottom Toolbar (`BottomToolbar.tsx`)
Buttons in order:
1. **Mute/Unmute** -- toggles mic (red state when muted)
2. **Camera** -- toggles self-view PiP (red state when off)
3. Separator
4. **Chat** -- toggles ChatSidePanel
5. **React** -- toggles ReactionsOverlay picker
6. **Share Screen** -- only shown in `mode === 'demo'` (no-op currently)
7. Separator
8. **End Call** -- red button, opens EndCallModal

### Self-View PiP (`SelfViewPip.tsx`)
- Gets user media (320x240 video, no audio)
- Renders mirrored in a draggable 200x150px container
- Positioned bottom-right by default

---

## 12. Non-Anam Integrations (Ignore/Replace)

The sales-avatar API server references several services that build agents should be aware of but **should NOT implement in the marketing site demo page:**

| Service | Where Referenced | What It Does | Action |
|---|---|---|---|
| **Deepgram** | `useAvatarSession.ts`, API route `deepgram-token.ts` | Real-time STT via browser WebSocket | **KEEP** -- needed for mic-to-text |
| **Anthropic/Claude** | API route `chat.ts` | Streaming LLM for Max's responses | **KEEP** -- needed for conversation |
| **ElevenLabs** | API route `tts.ts`, `.env.example` | TTS proxy (PCM stream) | **IGNORE** -- not used in current flow; Anam's `talk()` handles TTS |
| **Rivet** | API route `demo-dispatch.ts`, `DemoScreenPanel.tsx`, `RivetSandboxPanel.tsx` | Playwright browser sandbox for live demos | **IGNORE** -- not needed |
| **NemoClaw/Brev** | `packages/nemo-proxy/`, `.env.example` | Fast GPU inference | **IGNORE** -- not used in current web client |
| **AWS S3** | `.env.example` | Session persistence | **IGNORE** -- not needed for demo page |

### For the Marketing Site Demo Page
The demo page needs only:
1. **Anam.ai SDK** (`@anam-ai/js-sdk`) -- avatar video/audio
2. **Anam API** (via a new API route) -- session token creation
3. **Deepgram** (via a new API route) -- STT token vending
4. **Anthropic** (via a new API route) -- Claude chat streaming

Create three new API routes in the marketing site:
- `src/app/api/demo/anam-session/route.ts`
- `src/app/api/demo/deepgram-token/route.ts`
- `src/app/api/demo/chat/route.ts`

---

## 13. Knowledge Base (Verbatim)

The following is the complete content of `packages/shared/src/kb/brightwave.ts`:

```typescript
/**
 * Brightwave Sales Knowledge Base
 *
 * Product facts, features, pricing tiers, and demo scripts for the
 * digital salesperson avatar. This module is the single source of truth
 * for all Brightwave product information used in avatar conversations.
 */

export const COMPANY_OVERVIEW = {
  name: 'Brightwave',
  tagline: 'AI-powered research for private equity and financial services',
  description:
    'Brightwave is an agentic AI research platform purpose-built for private equity ' +
    'and financial services professionals. It automates the most time-intensive parts ' +
    'of investment research by deploying multi-agent AI systems that reason over ' +
    'documents, synthesize findings, and generate institutional-grade analysis.',
  founded: 2023,
  headquarters: 'New York, NY',
  website: 'https://brightwave.io',
} as const;

export const KEY_FEATURES = [
  {
    name: 'Multi-Agent Research',
    description:
      'Deploy teams of specialized AI agents that work in parallel to research ' +
      'companies, industries, and investment themes. Each agent handles a specific ' +
      'research workstream — financial analysis, market sizing, competitive landscape, ' +
      'risk assessment — then findings are synthesized into a unified report.',
  },
  {
    name: 'Document Analysis',
    description:
      'Upload and analyze any financial document — 10-Ks, CIMs, credit agreements, ' +
      'pitch decks, earnings transcripts. Brightwave extracts key data points, ' +
      'identifies risks, and cross-references across your entire document library.',
  },
  {
    name: 'Financial Document Search',
    description:
      'Semantic search across your uploaded documents and public filings. Ask ' +
      'questions in natural language and get precise answers with source citations. ' +
      'Search understands financial terminology, entity relationships, and temporal context.',
  },
  {
    name: 'Report Generation',
    description:
      'Generate investment memos, industry overviews, competitive analyses, and ' +
      'due diligence reports. Output is formatted for institutional consumption ' +
      'with proper sourcing, data tables, and executive summaries.',
  },
  {
    name: 'Automated Workflows',
    description:
      'Set up recurring research workflows that run on schedule or trigger on events. ' +
      'Monitor portfolio companies, track industry developments, and get alerts ' +
      'when material changes occur in your coverage universe.',
  },
  {
    name: 'Knowledge Graph',
    description:
      'Brightwave builds a persistent knowledge graph from every document and ' +
      'research session. Entity relationships, financial metrics, and qualitative ' +
      'insights accumulate over time, making each subsequent query smarter.',
  },
] as const;

export const TARGET_CUSTOMERS = [
  {
    segment: 'Private Equity Firms',
    description:
      'Mid-market to mega-cap PE firms running deal sourcing, due diligence, ' +
      'and portfolio monitoring. Primary users are associates and VPs who spend ' +
      '60%+ of their time on research and analysis.',
    useCases: [
      'CIM screening and triage',
      'Industry and market research',
      'Due diligence acceleration',
      'Portfolio company monitoring',
      'Investment committee memo preparation',
    ],
  },
  {
    segment: 'Hedge Funds',
    description:
      'Fundamental equity and credit hedge funds that need rapid, deep research ' +
      'on public and private companies. Analysts use Brightwave to accelerate ' +
      'idea generation and thesis validation.',
    useCases: [
      'Earnings analysis and monitoring',
      'Thematic research',
      'Company deep dives',
      'SEC filing analysis',
      'Competitive intelligence',
    ],
  },
  {
    segment: 'Investment Banks',
    description:
      'M&A advisory and capital markets teams that need fast, accurate research ' +
      'for pitch books, fairness opinions, and deal execution.',
    useCases: [
      'Comparable company analysis',
      'Industry landscape mapping',
      'Precedent transaction research',
      'Pitch book content generation',
      'Client briefing preparation',
    ],
  },
  {
    segment: 'Credit Funds',
    description:
      'Direct lending, distressed debt, and structured credit funds that analyze ' +
      'credit agreements, financial covenants, and borrower performance.',
    useCases: [
      'Credit agreement analysis',
      'Covenant monitoring',
      'Borrower financial tracking',
      'Sector credit risk assessment',
      'Restructuring research',
    ],
  },
] as const;

export const VALUE_PROPOSITIONS = [
  {
    claim: '10x Faster Research',
    description:
      'What takes an analyst 8-10 hours of manual research, Brightwave completes ' +
      'in under an hour. Multi-agent parallelism means you get comprehensive ' +
      'coverage without the time investment.',
    proof:
      'Early customers report reducing initial deal screening from 2 days to ' +
      '2 hours, and due diligence research prep from 2 weeks to 2 days.',
  },
  {
    claim: 'Institutional-Grade Sourcing',
    description:
      'Every insight is traceable to a specific source document, page, and passage. ' +
      'Brightwave never hallucinates financial data — it only reports what it can ' +
      'cite from your uploaded documents and verified public sources.',
    proof:
      'All outputs include inline citations with document references, page numbers, ' +
      'and direct quotes. Audit trails are maintained for compliance review.',
  },
  {
    claim: 'AI That Reasons Over Documents',
    description:
      'Unlike generic chatbots that summarize text, Brightwave agents perform ' +
      'multi-step reasoning — comparing metrics across time periods, identifying ' +
      'contradictions between sources, and drawing conclusions that require ' +
      'synthesizing information from multiple documents.',
    proof:
      'The platform handles cross-document analysis (e.g., comparing a CIM\'s ' +
      'projections against historical financials and industry benchmarks) in a ' +
      'single workflow.',
  },
] as const;

export const PRICING = {
  model: 'Enterprise subscription',
  tiers: [
    {
      name: 'Growth',
      description:
        'For small teams getting started with AI-powered research. Includes ' +
        'core document analysis, search, and report generation.',
      pricing: 'Contact for pricing',
      features: [
        'Up to 5 seats',
        'Document analysis and search',
        'Basic report generation',
        'Email support',
      ],
    },
    {
      name: 'Professional',
      description:
        'For established teams that need multi-agent research workflows, ' +
        'automated monitoring, and advanced analytics.',
      pricing: 'Contact for pricing',
      features: [
        'Up to 25 seats',
        'Multi-agent research workflows',
        'Automated portfolio monitoring',
        'Custom report templates',
        'Knowledge graph',
        'Priority support',
        'SSO / SAML',
      ],
    },
    {
      name: 'Enterprise',
      description:
        'For large organizations requiring dedicated infrastructure, custom ' +
        'integrations, and white-glove onboarding.',
      pricing: 'Contact for pricing',
      features: [
        'Unlimited seats',
        'Dedicated infrastructure',
        'Custom model fine-tuning',
        'API access',
        'Custom integrations (Salesforce, Bloomberg, etc.)',
        'Dedicated customer success manager',
        'SLA guarantee',
        'On-premise deployment option',
      ],
    },
  ],
  cta: 'Contact sales@brightwave.io or visit brightwave.io/demo to schedule a demo.',
} as const;

export const COMPETITIVE_DIFFERENTIATION = [
  {
    competitor: 'ChatGPT / Generic LLMs',
    brightwaveAdvantage:
      'ChatGPT is a general-purpose assistant. Brightwave is purpose-built for ' +
      'financial research with domain-specific agents, document processing pipelines, ' +
      'and institutional-grade citation. ChatGPT cannot reason across a library of ' +
      'uploaded financial documents or generate compliant investment memos.',
  },
  {
    competitor: 'Notion AI / Workspace AI',
    brightwaveAdvantage:
      'Notion AI helps with note-taking and text generation within a workspace. ' +
      'Brightwave is a dedicated research platform that understands financial ' +
      'documents, builds knowledge graphs, and runs multi-agent research workflows. ' +
      'The depth of financial domain expertise is incomparable.',
  },
  {
    competitor: 'Bloomberg Terminal AI',
    brightwaveAdvantage:
      'Bloomberg provides market data and news. Brightwave focuses on deep document ' +
      'analysis and research synthesis. They are complementary — Brightwave can ' +
      'ingest Bloomberg data as an input source. Brightwave excels at analyzing ' +
      'private documents (CIMs, credit agreements) that Bloomberg does not cover.',
  },
  {
    competitor: 'AlphaSense / Tegus',
    brightwaveAdvantage:
      'AlphaSense and Tegus provide search and expert transcripts. Brightwave ' +
      'goes beyond search — it performs multi-step reasoning, generates full ' +
      'research reports, and automates recurring workflows. Brightwave is an ' +
      'AI analyst, not just a search engine.',
  },
] as const;

export const DEMO_SCRIPTS = {
  quickDemo: {
    name: 'Quick Product Overview (2 minutes)',
    script: [
      'Hello! I\'m the Brightwave AI assistant. Let me show you how Brightwave ' +
      'is transforming investment research.',
      'Brightwave is an agentic AI research platform built specifically for ' +
      'private equity and financial services. Think of it as having a team of ' +
      'AI analysts that can research companies, analyze documents, and generate ' +
      'reports in a fraction of the time.',
      'Our customers — PE firms, hedge funds, and investment banks — typically ' +
      'see a 10x improvement in research speed. What used to take days now ' +
      'takes hours.',
      'What makes us different from ChatGPT or generic AI tools is that we\'re ' +
      'purpose-built for finance. Every output is sourced, cited, and formatted ' +
      'for institutional use. We never hallucinate financial data.',
      'Would you like me to walk through a specific use case, or do you have ' +
      'questions about how Brightwave could fit into your workflow?',
    ],
  },
  deepDive: {
    name: 'Deep Dive Demo (10 minutes)',
    script: [
      'Welcome to Brightwave. I\'d like to walk you through the full platform ' +
      'and show you how it handles real-world investment research workflows.',
      'Let\'s start with document analysis. You can upload any financial document ' +
      '— 10-Ks, CIMs, credit agreements, pitch decks. Brightwave reads the entire ' +
      'document, extracts key data points, and adds it to your knowledge graph.',
      'Now let\'s look at multi-agent research. When you ask a complex question, ' +
      'Brightwave deploys multiple specialized agents that work in parallel. One ' +
      'agent handles financial analysis, another does competitive research, a third ' +
      'assesses market size — then findings are synthesized into one coherent report.',
      'Every claim in the output is backed by a source citation. Click any citation ' +
      'to see the exact passage in the original document. This is critical for ' +
      'institutional use — your IC memo needs to be auditable.',
      'For ongoing coverage, you can set up automated monitoring workflows. Track ' +
      'portfolio companies, watch for material events, and get alerts when something ' +
      'needs your attention.',
      'Let\'s talk about integration. Brightwave fits into your existing workflow. ' +
      'Export to Word, PowerPoint, or PDF. API access for custom integrations. SSO ' +
      'for enterprise security requirements.',
      'Our pricing is based on team size and usage. We offer Growth, Professional, ' +
      'and Enterprise tiers. I\'d recommend scheduling a call with our sales team ' +
      'to discuss which tier fits your needs.',
      'Do you have any questions about what you\'ve seen?',
    ],
  },
} as const;
```

---

## 14. CLAUDE.md / AI Agent Config

**There is no `CLAUDE.md` at the root of the marketing site.** Instead, the repo has:

- `.claude/agents/aidesigner-frontend.md` -- AI Designer integration agent instructions
- `.claude/commands/aidesigner.md` -- AI Designer command definitions

These are for the Anthropic MCP AI Designer tool integration, not general project instructions.

### Sales Avatar Chat System Prompt (from `packages/api/src/routes/chat.ts`)

The system prompt for Max (the avatar) follows this structure:

```
You are Max, Brightwave's AI sales guide.

USER CONTEXT: name, email, mode (discovery|demo)

ABOUT BRIGHTWAVE: [product description]

KEY CAPABILITIES: Smart Grid, multi-doc synthesis, IC memo generation, web research, document types

CONVERSATION PLAYBOOK:
  Discovery mode: OPEN -> QUALIFY -> PITCH -> HANDLE OBJECTIONS -> CLOSE
  Demo mode: Frame -> Walk through features -> Check-in -> Close

CONVERSATION RULES:
  - Drive the conversation
  - Always end with a specific question that advances the sale
  - Keep responses under 60 words
  - Address user by first name
  - Never make up features
  - Never mention competitors
```

**Model used:** `claude-sonnet-4-5-20250929` (configurable via `CLAUDE_SMART_MODEL` env var)
**Max tokens:** 300 per response

---

## Quick Reference: File Paths to Copy/Adapt

| What | Source (sales-avatar) | Target (marketing site) |
|---|---|---|
| Avatar hook | `packages/web/src/hooks/useAvatarSession.ts` | `src/hooks/useAvatarSession.ts` |
| Video panel | `packages/web/src/components/AvatarVideoPanel.tsx` | Can inline in page |
| Bottom toolbar | `packages/web/src/components/BottomToolbar.tsx` | `src/components/ui/BottomToolbar.tsx` |
| Chat panel | `packages/web/src/components/ChatSidePanel.tsx` | `src/components/ui/ChatSidePanel.tsx` |
| Reactions | `packages/web/src/components/ReactionsOverlay.tsx` | `src/components/ui/ReactionsOverlay.tsx` |
| Self-view PiP | `packages/web/src/components/SelfViewPip.tsx` | `src/components/ui/SelfViewPip.tsx` |
| End call modal | `packages/web/src/components/EndCallModal.tsx` | `src/components/ui/EndCallModal.tsx` |
| Status indicators | `packages/web/src/components/StatusIndicators.tsx` | `src/components/ui/StatusIndicators.tsx` |
| Schedule selector | `packages/web/src/components/ScheduleSelector.tsx` | `src/components/ui/ScheduleSelector.tsx` |
| Pre-session form | `packages/web/src/components/PreSessionForm.tsx` | Can inline in page |
| KB data | `packages/shared/src/kb/brightwave.ts` | `src/lib/kb/brightwave.ts` |
| Anam session API | `packages/api/src/routes/anam-session.ts` | `src/app/api/demo/anam-session/route.ts` |
| Chat API | `packages/api/src/routes/chat.ts` | `src/app/api/demo/chat/route.ts` |
| Deepgram token API | `packages/api/src/routes/deepgram-token.ts` | `src/app/api/demo/deepgram-token/route.ts` |

### Files to IGNORE
- `DemoScreenPanel.tsx` -- Rivet sandbox streaming
- `RivetSandboxPanel.tsx` -- Rivet sandbox
- `packages/api/src/routes/demo-dispatch.ts` -- Rivet dispatch
- `packages/api/src/routes/tts.ts` -- ElevenLabs TTS (Anam handles TTS)
- `packages/nemo-proxy/` -- entire directory

---

*End of brief. This document should contain everything needed for parallel build agents to implement the demo page without re-reading the source repos.*
