import { client } from '../client'

export const useCaseIndexQuery = `
  *[_type == "useCase"] | order(title asc) {
    title, slug, eyebrow, excerpt, heroImage
  }
`

export const useCaseQuery = `
  *[_type == "useCase" && slug.current == $slug][0]{
    ...,
    relatedFeatures[]->{ title, slug, tagline },
    relatedCaseStudies[]->{ title, slug, excerpt, thumbnail },
    relatedFirmTypes[]->{ title, slug }
  }
`

export const useCaseSlugsQuery = `*[_type == "useCase" && defined(slug.current)]{ "slug": slug.current }`
