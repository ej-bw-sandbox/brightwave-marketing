import { createClient } from '@sanity/client'

export const projectId =
  import.meta.env.PUBLIC_SANITY_PROJECT_ID ||
  import.meta.env.ASTRO_PUBLIC_SANITY_PROJECT_ID ||
  import.meta.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.PUBLIC_SANITY_PROJECT_ID ||
  process.env.ASTRO_PUBLIC_SANITY_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  'v4tc8ohn'

export const dataset =
  import.meta.env.PUBLIC_SANITY_DATASET ||
  import.meta.env.ASTRO_PUBLIC_SANITY_DATASET ||
  import.meta.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.PUBLIC_SANITY_DATASET ||
  process.env.ASTRO_PUBLIC_SANITY_DATASET ||
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  'production'

export const apiVersion =
  import.meta.env.SANITY_API_VERSION || process.env.SANITY_API_VERSION || '2024-01-01'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
})

export const draftClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: import.meta.env.SANITY_API_TOKEN || process.env.SANITY_API_TOKEN,
  perspective: 'previewDrafts',
})

export async function safeFetch<T = any>(query: string, params: Record<string, any> = {}, fallback: T): Promise<T> {
  try {
    return (await client.fetch<T>(query, params)) ?? fallback
  } catch (error) {
    console.warn('[sanity] fetch failed', error instanceof Error ? error.message : error)
    return fallback
  }
}
