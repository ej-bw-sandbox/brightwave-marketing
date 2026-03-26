import { client } from '@/lib/sanity/client'
import { HeaderClient } from './header-client'

const caseStudyCountQuery = `count(*[_type == "caseStudy"])`

const navDataQuery = `{
  "useCases": *[_type == "useCase"] | order(coalesce(menuLabel, title) asc) [0...4] {title, "menuLabel": coalesce(menuLabel, title), "slug": slug.current},
  "icpPages": *[_type == "icpPage"] | order(coalesce(menuLabel, title) asc) [0...4] {title, "menuLabel": coalesce(menuLabel, title), "slug": slug.current},
  "firmTypes": *[_type == "firmType"] | order(coalesce(menuLabel, title) asc) [0...4] {title, "menuLabel": coalesce(menuLabel, title), "slug": slug.current},
  "platformFeatures": *[_type == "platformFeature" && defined(menuCategory)] | order(menuCategory asc, coalesce(menuLabel, title) asc) {title, "menuLabel": coalesce(menuLabel, title), "slug": slug.current, "category": menuCategory}
}`

export interface NavAssociation {
  title: string
  menuLabel: string
  slug: string
}

export interface PlatformFeature {
  title: string
  menuLabel: string
  slug: string
  category: string
}

export interface SolutionsNavData {
  icpPages: NavAssociation[]
  useCases: NavAssociation[]
  firmTypes: NavAssociation[]
  platformFeatures: PlatformFeature[]
}

export async function Header() {
  let caseStudyCount = 0
  let navData: SolutionsNavData | null = null

  try {
    const [count, data] = await Promise.all([
      client.fetch(caseStudyCountQuery, {}, { next: { tags: ['caseStudy'], revalidate: 3600 } }),
      client.fetch(navDataQuery, {}, { next: { tags: ['icpPage', 'useCase', 'firmType', 'platformFeature'], revalidate: 3600 } }),
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
