import { client } from '../client'

export const solutionsIndexQuery = `
  *[_type == "firmType"] | order(title asc) {
    title, slug, eyebrow, h1, heroImage
  }
`

export const solutionQuery = `
  *[_type == "firmType" && slug.current == $slug][0]{
    ...,
    relatedCaseStudies[]->{ title, slug, excerpt, thumbnail },
    relatedUseCases[]->{ title, slug, excerpt }
  }
`

export const solutionSlugsQuery = `*[_type == "firmType" && defined(slug.current)]{ "slug": slug.current }`
