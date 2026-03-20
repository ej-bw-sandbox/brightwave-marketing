import { client } from '../client'

export const useCaseIndexQuery = `
  *[_type == "useCase"] | order(title asc) {
    title, slug, eyebrow, excerpt,
    heroImage{ asset->{ _id, url, metadata { lqip, dimensions } } }
  }
`

export const useCaseQuery = `
  *[_type == "useCase" && slug.current == $slug][0]{
    ...,
    heroImage{ asset->{ _id, url, metadata { lqip, dimensions } } },
    relatedFeatures[]->{ title, slug, tagline },
    relatedCaseStudies[]->{ title, slug, excerpt, thumbnail{ asset->{ _id, url } } },
    relatedFirmTypes[]->{ title, slug }
  }
`

export const useCaseSlugsQuery = `*[_type == "useCase" && defined(slug.current)]{ "slug": slug.current }`
