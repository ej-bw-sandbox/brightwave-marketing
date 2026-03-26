# Brightwave Marketing Site

The Brightwave marketing website built with Next.js 15 (App Router), Sanity Studio v3, Tailwind CSS 4, and deployed on Vercel.

## Stack

- **Framework:** Next.js 15 (App Router, React Server Components)
- **CMS:** Sanity v3 (embedded Studio at `/studio`)
- **Styling:** Tailwind CSS 4 + shadcn/ui
- **Forms:** React Hook Form + Server Actions + HubSpot API
- **Analytics:** PostHog + GA4 + Vercel Web Analytics
- **Search:** Algolia InstantSearch
- **Hosting:** Vercel

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.local.example .env.local
# Fill in values from Vercel dashboard

# Start the development server
npm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.
Open [http://localhost:3000/studio](http://localhost:3000/studio) to access Sanity Studio.

## Project Structure

```
src/
  app/              # Next.js App Router pages and API routes
  components/       # React components (ui, layout, sections, forms)
  lib/              # Shared utilities (Sanity client, analytics, metadata)
  sanity/           # Sanity schema definitions and config
```

## Scripts

- `pnpm dev` -- Start dev server with Turbopack
- `pnpm build` -- Production build
- `pnpm lint` -- Run ESLint
- `pnpm typecheck` -- Run TypeScript type checker
- `pnpm sanity:typegen` -- Generate TypeScript types from Sanity schemas
