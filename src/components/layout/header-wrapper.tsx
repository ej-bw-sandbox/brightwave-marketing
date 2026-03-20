import { client } from '@/lib/sanity/client'
import { HeaderClient } from './header-client'

const caseStudyCountQuery = `count(*[_type == "caseStudy"])`

export async function Header() {
  let caseStudyCount = 0
  try {
    caseStudyCount = await client.fetch(caseStudyCountQuery, {}, { next: { tags: ['caseStudy'], revalidate: 3600 } }) ?? 0
  } catch {
    caseStudyCount = 0
  }

  return <HeaderClient caseStudyCount={caseStudyCount} />
}
