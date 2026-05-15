# Astro Migration Notes

## Branch scope

This branch converts the public Brightwave marketing frontend from Next.js App Router toward Astro + TypeScript. The implementation is intentionally focused on a working Astro/Vercel preview foundation for Sanity-powered public marketing pages while isolating higher-risk app surfaces.

## Implemented stack/config

- Astro 5 with TypeScript.
- `@astrojs/react` for React islands.
- `@astrojs/vercel` with Astro's current static/server adapter behavior so prerendered marketing pages and server endpoints can coexist. (`output: 'hybrid'` was removed in Astro 5; `output: 'static'` now supports this pattern with `prerender = false` routes.)
- npm remains the package manager. Node engine remains `20.x`.
- Scripts now use:
  - `npm run dev` -> `astro dev`
  - `npm run build` -> `astro build`
  - `npm run preview` -> `astro preview`
  - `npm run typecheck` -> `astro check && tsc --noEmit`
- `vercel.json` is updated for Astro and preserves security headers, Studio noindex/CSP headers, cache headers, and canonical redirects.

## Environment variables

Astro public variables use `PUBLIC_*`. Compatibility fallbacks are kept for existing `NEXT_PUBLIC_*` variables where practical.

Sanity:

- `PUBLIC_SANITY_PROJECT_ID` or existing `NEXT_PUBLIC_SANITY_PROJECT_ID`, default `v4tc8ohn`
- `PUBLIC_SANITY_DATASET` or existing `NEXT_PUBLIC_SANITY_DATASET`, default `production`
- `SANITY_API_VERSION`, default `2024-01-01`
- `SANITY_API_TOKEN` server-only for future preview work

Analytics:

- `PUBLIC_GA_MEASUREMENT_ID` or existing `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `PUBLIC_POSTHOG_KEY` or existing `NEXT_PUBLIC_POSTHOG_KEY`
- `PUBLIC_POSTHOG_HOST` or existing `NEXT_PUBLIC_POSTHOG_HOST`
- `POSTHOG_PROJECT_API_KEY` is preferred for server-side capture, with compatibility fallback to the existing PostHog key

Server endpoints:

- `HUBSPOT_ACCESS_TOKEN`
- `CALENDLY_API_KEY`

Deferred demo/avatar endpoints still require Anam/Anthropic variables if ported later.

## Implemented public routes

Core singleton/static pages:

- `/`
- `/about`
- `/enterprise`
- `/enterprise-security-compliance`
- `/private-markets-platform`
- `/contact`
- `/partners`
- `/partner-terms`
- `/referral`
- `/support`
- `/thank-you-contact`

Sanity collection indexes and detail pages:

- `/features`, `/features/[slug]`
- `/use-cases`, `/use-cases/[slug]`
- `/i-am-a`, `/i-am-a/[slug]`
- `/firm-types`, `/firm-types/[slug]`
- `/blog`, `/blog/[slug]`
- `/news`, `/news/[slug]`
- `/release-notes`, `/release-notes/[slug]`
- `/case-studies`, `/case-studies/[slug]`
- `/comparisons`, `/comparisons/[slug]`
- `/resources`, `/resources/[slug]`
- `/legal/[slug]`

SEO/system endpoints:

- `/sitemap.xml`
- `/robots.txt`
- `/llms.txt`
- `/api/llms.txt` compatibility export

Server endpoints:

- `/api/contact`
- `/api/roi-calculator`
- `/api/calendly`

## Redirects moved to Vercel

The Astro Vercel config includes canonical redirects for:

- `/comparison*` -> `/comparisons*`
- `/solutions*` -> `/firm-types*`
- `/for*` -> `/i-am-a*`
- `/changelog*` -> `/release-notes*`
- `/pricing` -> `/enterprise`
- `/security` -> `/enterprise-security-compliance`
- `/privacy-policy` -> `/legal/privacy-policy`
- `/terms-of-use` and `/terms-of-service` -> `/legal/terms-of-use`
- `/safety-security` -> `/legal/safety-security`
- `/vs*` -> `/comparisons*`

## Styling/assets

- Existing `public/webflow-css`, `public/webflow-fonts`, `public/webflow-images`, and `public/webflow-documents` paths are preserved.
- Webflow CSS load order is preserved in `BaseLayout.astro`: normalize, components, brightwave, inline overrides, then Astro global CSS.
- `src/app/globals.css` was copied to `src/styles/globals.css` for Astro import without deleting the prior Next source tree.
- Dark-mode anti-FOUC script is preserved in the Astro base layout.

## React islands

Implemented as islands where browser state or existing interactivity is high-value:

- Header mega menu/theme toggle via `HeaderClient` (`client:load`)
- Contact form (`client:visible`)
- Enterprise ROI calculator (`client:visible`)
- Lottie animations through an Astro component that mounts `lottie-web`

The island code has been adjusted to avoid `next/link`, `next/image`, `next/script`, and `next/navigation` usage for the migrated surfaces.

## Known gaps and deferred areas

- The route templates intentionally prioritize buildability and content coverage over full pixel parity for this first safe preview branch. Rich legacy page templates remain under `src/app` as reference material, but the new Astro pages use simplified Webflow-class layouts.
- Sanity Studio is deferred. The previous embedded `NextStudio` route is Next-specific. Use the Sanity-hosted Studio or create a separate Studio app/deployment before replacing production editorial workflows.
- Draft preview and tag-based revalidation are deferred. The Next implementation used `revalidateTag`; Astro should use Sanity publish webhooks to trigger Vercel preview/production rebuilds, or a future SSR preview cookie flow using `SANITY_API_TOKEN` and `previewDrafts`.
- Demo/avatar and private-markets sandbox pages are isolated behind documented noindex/deferred placeholders. Porting them needs Astro server endpoints for Anam/Anthropic plus durable session storage instead of the previous module-level in-memory store.
- ABM routes are not included in this first migration foundation because they are high-count, noindex/campaign-like pages and should be SSR/on-demand or split from the public marketing build.
- Resource gating and event RSVP flows are not fully implemented beyond public resource display. Add dedicated endpoints if gated asset capture is required.
- Old `src/app` and `next.config.ts` are retained as reference during the migration branch, but the build uses `src/pages` and Astro config.

## Testing

Local validation commands:

```bash
npm install --legacy-peer-deps
npm run build
npm run preview
```

Suggested smoke tests on a Vercel preview:

1. Load `/`, `/features`, one `/features/[slug]`, `/blog`, one `/blog/[slug]`, `/contact`, `/enterprise`, `/sitemap.xml`, `/robots.txt`, and `/llms.txt`.
2. Confirm Webflow CSS/fonts/images load from the preserved public paths.
3. Submit test payloads to `/api/contact`, `/api/roi-calculator`, and `/api/calendly` only in a safe preview environment with the correct server env vars.
4. Confirm canonical redirects work for `/pricing`, `/security`, `/comparison/...`, `/solutions/...`, `/for/...`, `/changelog/...`, `/privacy-policy`, and `/vs/...`.
5. Confirm Studio/demo/sandbox placeholders are noindex and do not expose secrets.

## Recommended next steps

1. Run visual diff QA against current production for the top marketing pages and progressively replace simplified Astro templates with closer page-specific ports.
2. Decide Studio strategy: separate Sanity Studio deployment is preferred.
3. Configure Sanity webhooks to Vercel build hooks for static freshness.
4. Port ABM and demo/avatar only after selecting durable session storage and confirming the Vercel/Astro serverless streaming behavior.
5. Remove the legacy Next `src/app` tree after Astro parity is accepted, then prune unused Next-only dependencies and config.
