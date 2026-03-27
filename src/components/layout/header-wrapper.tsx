import { client } from '@/lib/sanity/client'
import { HeaderClient } from './header-client'

const caseStudyCountQuery = `count(*[_type == "caseStudy"])`

const navDataQuery = `{
  "useCases": *[_type == "useCase"] | order(coalesce(menuLabel, title) asc) [0...4] {title, "menuLabel": coalesce(menuLabel, title), "slug": slug.current},
  "icpPages": *[_type == "icpPage"] | order(coalesce(menuLabel, title) asc) [0...4] {title, "menuLabel": coalesce(menuLabel, title), "slug": slug.current},
  "firmTypes": *[_type == "firmType"] | order(coalesce(menuLabel, title) asc) [0...4] {title, "menuLabel": coalesce(menuLabel, title), "slug": slug.current},
  "platformFeatures": *[_type == "platformFeature" && defined(menuCategory)] | order(menuCategory asc, coalesce(menuLabel, title) asc) {title, "menuLabel": coalesce(menuLabel, title), "slug": slug.current, "category": menuCategory}
}`

const siteSettingsNavQuery = `*[_type == "siteSettings" && _id == "siteSettings"][0] {
  headerCtas[] { _key, label, url, style, openInNewTab },
  mainNav[] {
    _key, label, url,
    children[] { _key, label, url, description }
  }
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

export interface HeaderCta {
  _key: string
  label: string
  url: string
  style?: string
  openInNewTab?: boolean
}

export interface NavItem {
  _key: string
  label: string
  url: string
  children?: { _key: string; label: string; url: string; description?: string }[]
}

export interface SiteSettingsNav {
  headerCtas?: HeaderCta[]
  mainNav?: NavItem[]
}

export async function Header() {
  let caseStudyCount = 0
  let navData: SolutionsNavData | null = null
  let siteSettingsNav: SiteSettingsNav | null = null

  try {
    const [count, data, settings] = await Promise.all([
      client.fetch(caseStudyCountQuery, {}, { next: { tags: ['caseStudy'], revalidate: 3600 } }),
      client.fetch(navDataQuery, {}, { next: { tags: ['icpPage', 'useCase', 'firmType', 'platformFeature'], revalidate: 3600 } }),
      client.fetch(siteSettingsNavQuery, {}, { next: { tags: ['siteSettings'], revalidate: 3600 } }),
    ])
    caseStudyCount = count ?? 0
    navData = data ?? null
    siteSettingsNav = settings ?? null
  } catch {
    caseStudyCount = 0
    navData = null
    siteSettingsNav = null
  }

  return (
    <HeaderClient
      caseStudyCount={caseStudyCount}
      solutionsNavData={navData}
      headerCtas={siteSettingsNav?.headerCtas}
    />
  )
}
