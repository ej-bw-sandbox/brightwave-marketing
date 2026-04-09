## Editing Sanity Content Programmatically

When the user asks to update CMS-managed content (announcement bar text, form copy, page settings, etc.), use the Sanity HTTP API directly rather than telling them to edit in Studio.

### How to read
```bash
source .env.local && curl -s \
  -H "Authorization: Bearer $SANITY_API_TOKEN" \
  "https://v4tc8ohn.api.sanity.io/v2024-01-01/data/query/production?query=<URL-encoded GROQ>"
```

### How to write
```bash
source .env.local && curl -s -X POST \
  "https://v4tc8ohn.api.sanity.io/v2024-01-01/data/mutate/production" \
  -H "Authorization: Bearer $SANITY_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"mutations":[{"patch":{"id":"<documentId>","set":{"field.path":"value"}}}]}'
```

### Common document IDs
- `siteSettings` — header CTAs, footer, announcement bar, social links
- `contactForm` / `referralContactForm` / `partnersContactForm` — form content

### Notes
- Project ID: `v4tc8ohn`, dataset: `production`
- The `SANITY_API_TOKEN` from `.env.local` has write access
- After mutating, Next.js ISR cache (`revalidate: 60`) may delay local updates — hard-refresh or restart dev server

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

## Forms (Sanity Studio > Forms > Static)

Three singleton `contactForm` documents power form content across the site. Each uses `formVariant` to distinguish its purpose. All form copy (titles, labels, placeholders, button text, success/error messages) is editable in Sanity Studio under **Forms > Static**.

### Singletons

| Studio Label | Document ID | formVariant | Page |
|---|---|---|---|
| Contact Form | `contactForm` | `contact` | `/contact` |
| Referral Form | `referralContactForm` | `referral` | `/referral` |
| Partners Form | `partnersContactForm` | `partners` | `/partners` |

### Schema (`contactForm`)
- `formTitle`, `formSubtitle` — heading and supporting copy
- `formVariant` — `contact` | `referral` | `partners`
- `fields[]` — ordered array of form fields (fieldName, fieldLabel, fieldPlaceholder, fieldType, isRequired, options)
- `referralCodeField` — referral code configuration (visible only when variant is `referral`)
- `partnerTypeField` — partner type selector configuration (visible only when variant is `partners`)
- `submitButtonText`, `successMessage`, `errorMessage` — submission UX copy
- `apiEndpoint` — server route for form submissions (default: `/api/contact`)
- `notificationEmail` — optional email for submission notifications

### Key Files
- Schema: `src/sanity/schemaTypes/documents/contact-form.ts`
- Structure: `src/sanity/structure.ts` (Forms > Static section)
- GROQ queries: `src/lib/sanity/queries/forms.ts` (standalone query + TypeScript types)
- Page queries: `src/lib/sanity/queries/contact.ts`, `referral.ts`, `partners.ts` (dereference `contactForm->{}`)
- Component: `src/components/forms/ContactForm.tsx` (accepts `FormConfig` prop with hardcoded fallbacks)
- Pages: `src/app/(marketing)/contact/page.tsx`, `referral/page.tsx`, `partners/page.tsx`

### How it works
1. Each page schema (contactPage, referralPage, partnersPage) has a `contactForm` reference field pointing to the relevant singleton
2. Page queries use `contactForm->{...}` to dereference the form config inline
3. The `ContactForm` component renders fields dynamically from the Sanity config, falling back to hardcoded defaults if Sanity returns null
4. Form submissions go to the existing `/api/contact` route — only the copy/content is Sanity-managed, not the submission logic
