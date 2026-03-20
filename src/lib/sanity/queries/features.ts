import { client } from '../client'

export const featureIndexQuery = `
  *[_type == "platformFeature"] | order(title asc) {
    title, slug, heroH1, tags,
    heroImage{ asset->{ _id, url, metadata { lqip, dimensions } } }
  }
`

export const featureQuery = `
  *[_type == "platformFeature" && slug.current == $slug][0]{
    ...,
    heroImage{ asset->{ _id, url, metadata { lqip, dimensions } } },
    relatedUseCases[]->{ title, slug },
    relatedFeatures[]->{ title, slug, heroH1 }
  }
`

export const featureSlugsQuery = `*[_type == "platformFeature" && defined(slug.current)]{ "slug": slug.current }`
