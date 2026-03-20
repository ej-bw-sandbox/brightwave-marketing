import { client } from '../client'

export const resourceIndexQuery = `
  *[_type == "resourceItem"] | order(title asc) {
    title, slug, resourceType, subtitle, topics, isGated,
    thumbnail{ asset->{ _id, url, metadata { lqip, dimensions } } }
  }
`

export const resourceQuery = `
  *[_type == "resourceItem" && slug.current == $slug][0]{
    title, slug, resourceType, description, subtitle, topics, isGated, seo,
    thumbnail{ asset->{ _id, url, metadata { lqip, dimensions } } },
    learningPoints, file{ asset->{ url } }, externalUrl
  }
`

export const resourceSlugsQuery = `*[_type == "resourceItem" && defined(slug.current)]{ "slug": slug.current }`
