import { client } from '@/lib/sanity/client'
import { HeaderClient } from './header-client'

const caseStudyCountQuery = `count(*[_type == "caseStudy"])`

const navDataQuery = `{
  "useCases": *[_type == "useCase"] | order(title asc) [0...4] {title, "slug": slug.current},
  "icpPages": *[_type == "icpPage"] | order(title asc) [0...4] {title, "slug": slug.current},
  "firmTypes": *[_type == "firmType"] | order(title asc) [0...4] {title, "slug": slug.current},
  "platformFeatures": *[_type == "platformFeature"] | order(category asc, title asc) {title, "slug": slug.current, category}
}`

export interface NavAssociation {
  title: string
  slug: string
}

export interface PlatformFeature {
  title: string
  slug: string
  category: string
}

export interface SolutionsNavData {
  useCases: NavAssociation[]
  icpPages: NavAssociation[]
  firmTypes: NavAssociation[]
  platformFeatures: PlatformFeature[]
}

export async function Header() {
  let caseStudyCount = 0
  let navData: SolutionsNavData | null = null

  try {
    const [count, data] = await Promise.all([
      client.fetch(caseStudyCountQuery, {}, { next: { tags: ['caseStudy'], revalidate: 3600 } }),
      client.fetch(navDataQuery, {}, { next: { tags: ['useCase', 'icpPage', 'firmType', 'platformFeature'], revalidate: 3600 } }),
    ])
    caseStudyCount = count ?? 0
    navData = data ?? null
  } catch {
    caseStudyCount = 0
    navData = null
  }

  return (
    <HeaderClient
      caseStudyCount={caseStudyCount}
      solutionsNavData={navData}
    />
  )
}
