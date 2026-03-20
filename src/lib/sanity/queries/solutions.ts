import { client } from '../client'

export const solutionsIndexQuery = `
  *[_type == "firmType"] | order(title asc) {
    title, slug, eyebrow, h1,
    heroImage{ asset->{ _id, url, metadata { lqip, dimensions } } }
  }
`

export const solutionQuery = `
  *[_type == "firmType" && slug.current == $slug][0]{
    ...,
    heroImage{ asset->{ _id, url, metadata { lqip, dimensions } } },
    relatedCaseStudies[]->{ title, slug, excerpt, thumbnail{ asset->{ _id, url } } },
    relatedUseCases[]->{ title, slug, excerpt }
  }
`

export const solutionSlugsQuery = `*[_type == "firmType" && defined(slug.current)]{ "slug": slug.current }`
