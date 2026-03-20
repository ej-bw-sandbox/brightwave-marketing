import { client } from '../client'

export const blogIndexQuery = `{
  "posts": *[_type == "blogPost" && defined(publishedAt)] | order(publishedAt desc) [($offset)...($offset + $limit)] {
    title, slug, excerpt, featuredImage, publishedAt, postType,
    author->{ name, slug, image },
    categories[]->{ title, slug }
  },
  "total": count(*[_type == "blogPost" && defined(publishedAt)]),
  "categories": *[_type == "category"] | order(title asc) { title, slug }
}`

export const blogPostQuery = `
  *[_type == "blogPost" && slug.current == $slug][0]{
    title, slug, publishedAt,
    author->{ name, slug, image, bio, linkedin },
    categories[]->{ title, slug }, tags, postType, excerpt,
    featuredImage{ asset->{ url, metadata { lqip, dimensions } } },
    body, relatedUseCases[]->{ title, slug, excerpt },
    relatedFeatures[]->{ title, slug }, seo,
    "relatedPosts": *[_type == "blogPost" && slug.current != $slug && count(categories[@._ref in ^.^.categories[]._ref]) > 0] | order(publishedAt desc) [0..2] {
      title, slug, excerpt, featuredImage, publishedAt, author->{ name }
    }
  }
`

export const blogSlugsQuery = `*[_type == "blogPost" && defined(slug.current)]{ "slug": slug.current }`
