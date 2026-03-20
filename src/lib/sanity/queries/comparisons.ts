import { client } from '../client'

export const comparisonIndexQuery = `
  *[_type == "comparison"] | order(title asc) {
    title, slug, competitor, summary,
    competitorLogo{ asset->{ _id, url } },
    competitorIcon{ asset->{ _id, url } }
  }
`

export const comparisonQuery = `
  *[_type == "comparison" && slug.current == $slug][0]{
    ...,
    competitorLogo{ asset->{ _id, url } },
    competitorIcon{ asset->{ _id, url } },
    "otherComparisons": *[_type == "comparison" && slug.current != $slug] | order(title asc) [0..3] {
      title, slug, competitor, summary,
      competitorLogo{ asset->{ _id, url } }
    }
  }
`

export const comparisonSlugsQuery = `*[_type == "comparison" && defined(slug.current)]{ "slug": slug.current }`
