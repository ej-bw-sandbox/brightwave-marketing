import { client } from '../client'

export const resourceIndexQuery = `
  *[_type == "resourceItem"] | order(title asc) {
    title, slug, resourceType, subtitle, thumbnail, topics, isGated
  }
`

export const resourceQuery = `
  *[_type == "resourceItem" && slug.current == $slug][0]{
    title, slug, resourceType, description, subtitle, thumbnail,
    learningPoints, file{ asset->{ url } }, externalUrl, isGated, topics, seo
  }
`

export const resourceSlugsQuery = `*[_type == "resourceItem" && defined(slug.current)]{ "slug": slug.current }`
