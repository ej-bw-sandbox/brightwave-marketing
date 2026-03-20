import { client } from '@/lib/sanity/client'
import { HeaderClient } from './header-client'

const caseStudyCountQuery = `count(*[_type == "caseStudy"])`

const privateMarketsQuery = `*[_type == "product" && slug.current == "private-markets"][0]{
  title,
  tagline,
  "roles": roles[]->{title, "slug": slug.current},
  "industries": industries[]->{title, "slug": slug.current},
  "useCases": useCases[]->{title, "slug": slug.current}
}`

export interface NavAssociation {
  title: string
  slug: string
}

export interface PrivateMarketsNav {
  title: string
  tagline: string | null
  roles: NavAssociation[]
  industries: NavAssociation[]
  useCases: NavAssociation[]
}

export async function Header() {
  let caseStudyCount = 0
  let privateMarketsNav: PrivateMarketsNav | null = null

  try {
    const [count, pm] = await Promise.all([
      client.fetch(caseStudyCountQuery, {}, { next: { tags: ['caseStudy'], revalidate: 3600 } }),
      client.fetch(privateMarketsQuery, {}, { next: { tags: ['product'], revalidate: 3600 } }),
    ])
    caseStudyCount = count ?? 0
    privateMarketsNav = pm ?? null
  } catch {
    caseStudyCount = 0
    privateMarketsNav = null
  }

  return (
    <HeaderClient
      caseStudyCount={caseStudyCount}
      privateMarketsNav={privateMarketsNav}
    />
  )
}
