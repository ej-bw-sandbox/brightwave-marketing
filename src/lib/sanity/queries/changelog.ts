import { client } from '../client'

export const changelogIndexQuery = `{
  "notes": *[_type == "releaseNote"] | order(releaseDate desc) [($offset)...($offset + $limit)] {
    title, slug, releaseDate, version, updateType, summary, featuredImage,
    author->{ name }
  },
  "total": count(*[_type == "releaseNote"])
}`

export const changelogQuery = `
  *[_type == "releaseNote" && slug.current == $slug][0]{
    ...,
    author->{ name, image },
    relatedFeatures[]->{ title, slug, tagline }
  }
`

export const changelogSlugsQuery = `*[_type == "releaseNote" && defined(slug.current)]{ "slug": slug.current }`
