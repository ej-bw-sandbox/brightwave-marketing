import { client } from '../client'

export const comparisonIndexQuery = `
  *[_type == "comparison"] | order(competitorName asc) {
    title, slug, competitorName, competitorIcon, heroDescription,
    comparisonCategory->{ title }
  }
`

export const comparisonQuery = `
  *[_type == "comparison" && slug.current == $slug][0]{
    ...,
    comparisonCategory->{ title },
    "otherComparisons": *[_type == "comparison" && slug.current != $slug] | order(publishedAt desc) [0..3] {
      title, slug, competitorName, competitorIcon, heroDescription
    }
  }
`

export const comparisonSlugsQuery = `*[_type == "comparison" && defined(slug.current)]{ "slug": slug.current }`
