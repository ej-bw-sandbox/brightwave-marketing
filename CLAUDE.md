## Demo Page (`/demo/[personaId]`)

AI-powered video demo at `/demo/[personaId]` using Anam.ai — Zoom/Meet-style video call with a digital AI sales agent.

### Key Files
- Route: `src/app/(marketing)/demo/[personaId]/page.tsx`
- Components: `src/components/demo/` (DemoPage, PreCallLobby, VideoCallView, BottomToolbar, ChatSidePanel, ReactionsOverlay, PostCallScreen)
- Hook: `src/hooks/useAnamSession.ts`
- API: `/api/demo/session`, `/api/demo/events`, `/api/demo/qualification`
- Libs: `src/lib/anam/client.ts`, `src/lib/demo/types.ts`, `src/lib/demo/summarize.ts`, `src/lib/demo/hubspot.ts`, `src/lib/kb/brightwave.ts`

### Sanity
`demoPersona` documents control: `anamPersonaId`, `llmModel`, `knowledgeBaseOverride`, `greeting`, `calendarLink`, `qualificationThreshold`. Default persona: `c1298d71-48b2-40c9-98d1-e3d7c0bf8030`.

### Prospect Context
URL params (`?name=&email=&company=&role=&aum=&firmType=`) merged with `localStorage.brightwave_prospect`. Params take priority.

### Env Vars Required
```
ANAM_API_KEY                       # Anam Connected App (api.anam.ai, label: brightwave)
NEXT_PUBLIC_CALENDLY_WORKSHOP_URL  # Calendly link for qualified prospects
HUBSPOT_API_KEY                    # HubSpot private app token
ANTHROPIC_API_KEY                  # Claude for summary generation
```

### HubSpot Custom Properties (create before deploy)
`brightwave_demo_taken` (bool), `brightwave_qualification_score` (number), `brightwave_qualified` (bool), `brightwave_recommended_next_step` (string), `brightwave_demo_date` (date)
