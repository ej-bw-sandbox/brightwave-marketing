export const contentPostIndexQuery = `{
  "posts": *[_type == "contentPost" && category == $category && defined(publishedAt)] | order(publishedAt desc) [($offset)...($offset + $limit)] {
    _id, title, slug, excerpt, coverImage, publishedAt, category,
    author->{ name, slug, image }
  },
  "total": count(*[_type == "contentPost" && category == $category && defined(publishedAt)])
}`

export const contentPostDetailQuery = `
  *[_type == "contentPost" && slug.current == $slug && category == $category][0]{
    _id, title, slug, publishedAt, category, excerpt,
    author->{ name, slug, image, bio, linkedin },
    coverImage{ asset->{ url, metadata { lqip, dimensions } } },
    body,
    seo,
    "relatedPosts": *[_type == "contentPost" && category == $category && slug.current != $slug] | order(publishedAt desc) [0..2] {
      title, slug, excerpt, coverImage, publishedAt, author->{ name }
    }
  }
`

export const contentPostSlugsQuery = `*[_type == "contentPost" && category == $category && defined(slug.current)]{ "slug": slug.current }`
