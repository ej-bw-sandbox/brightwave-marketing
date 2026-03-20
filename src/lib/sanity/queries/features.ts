import { client } from '../client'

export const featureIndexQuery = `
  *[_type == "platformFeature"] | order(title asc) {
    title, slug, tagline, tags, heroImage
  }
`

export const featureQuery = `
  *[_type == "platformFeature" && slug.current == $slug][0]{
    ...,
    relatedUseCases[]->{ title, slug, excerpt },
    relatedFeatures[]->{ title, slug, tagline }
  }
`

export const featureSlugsQuery = `*[_type == "platformFeature" && defined(slug.current)]{ "slug": slug.current }`
