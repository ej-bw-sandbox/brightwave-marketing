import { client } from '../client'

export const legalQuery = `
  *[_type == "legalPage" && slug.current == $slug][0]{
    title, effectiveDate, body, seo
  }
`

export const legalSlugsQuery = `*[_type == "legalPage" && defined(slug.current)]{ "slug": slug.current }`
