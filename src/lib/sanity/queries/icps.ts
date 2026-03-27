import { client } from '../client'

export const icpIndexQuery = `
  *[_type == "icpPage"] | order(title asc) {
    _id, title, slug, h1, heroTagline, excerpt, product,
    heroImage{ asset->{ _id, url, metadata { lqip, dimensions } } }
  }
`

export const icpQuery = `
  *[_type == "icpPage" && slug.current == $slug][0]{
    ...,
    relatedUseCases[]->{ title, slug, excerpt },
    relatedCaseStudies[]->{ title, slug, excerpt, thumbnail },
    relatedFeatures[]->{ title, slug, tagline }
  }
`

export const icpSlugsQuery = `*[_type == "icpPage" && defined(slug.current)]{ "slug": slug.current }`
