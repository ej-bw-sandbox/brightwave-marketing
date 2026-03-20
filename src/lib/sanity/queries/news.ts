import { client } from '../client'

export const newsIndexQuery = `{
  "posts": *[_type == "newsPost"] | order(publishedAt desc) [($offset)...($offset + $limit)] {
    title, slug, excerpt, featuredImage, publishedAt, pressLogo, externalUrl,
    author->{ name }
  },
  "total": count(*[_type == "newsPost"])
}`

export const newsPostQuery = `
  *[_type == "newsPost" && slug.current == $slug][0]{
    title, slug, publishedAt, author->{ name, image, bio },
    featuredImage{ asset->{ url, metadata } }, pressLogo, body, externalUrl, seo
  }
`

export const newsSlugsQuery = `*[_type == "newsPost" && defined(slug.current)]{ "slug": slug.current }`
