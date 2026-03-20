import { client } from '../client'

export const featureIndexQuery = `
  *[_type == "platformFeature"] | order(title asc) {
    title, slug, heroH1, tags
  }
`

export const featureQuery = `
  *[_type == "platformFeature" && slug.current == $slug][0]{
    ...,
    relatedUseCases[]->{ title, slug },
    relatedFeatures[]->{ title, slug, heroH1 }
  }
`

export const featureSlugsQuery = `*[_type == "platformFeature" && defined(slug.current)]{ "slug": slug.current }`
