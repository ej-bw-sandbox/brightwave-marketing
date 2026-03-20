import { client } from '../client'

export const caseStudyIndexQuery = `{
  "studies": *[_type == "caseStudy"] | order(publishedAt desc) {
    title, slug, excerpt, industry, firmSize, isFeatured, isFeaturedGrid,
    thumbnail{ asset->{ _id, url, metadata { lqip, dimensions } } },
    companyLogo{ asset->{ _id, url } },
    category->{ title, slug }
  },
  "categories": *[_type == "caseStudyCategory"] | order(title asc) { title, slug }
}`

export const caseStudyQuery = `
  *[_type == "caseStudy" && slug.current == $slug][0]{
    ...,
    thumbnail{ asset->{ _id, url, metadata { lqip, dimensions } } },
    companyLogo{ asset->{ _id, url } },
    category->{ title, slug },
    relatedFirmType->{ title, slug },
    relatedUseCases[]->{ title, slug, excerpt },
    relatedFeatures[]->{ title, slug },
    "moreCaseStudies": *[_type == "caseStudy" && slug.current != $slug] | order(publishedAt desc) [0..2] {
      title, slug, excerpt, industry,
      thumbnail{ asset->{ _id, url, metadata { lqip, dimensions } } },
      category->{ title }
    }
  }
`

export const caseStudySlugsQuery = `*[_type == "caseStudy" && defined(slug.current)]{ "slug": slug.current }`
