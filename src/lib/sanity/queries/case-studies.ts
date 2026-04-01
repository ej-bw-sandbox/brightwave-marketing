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
    title,
    "slug": slug.current,
    publishedAt,
    heroDescription,
    excerpt,
    industry,
    firmSize,
    body,
    testimonialQuote,
    testimonialAttribution,
    heroImage{ asset->{ _id, url, metadata { lqip, dimensions } } },
    thumbnail{ asset->{ _id, url, metadata { lqip, dimensions } } },
    companyLogo{ asset->{ _id, url } },
    category->{ title, "slug": slug.current },
    statsLight{
      context,
      stats[]{ value, label, context }
    },
    statsDark{
      context,
      stats[]{ value, label, context }
    },
    pullQuotes[]->{
      quote,
      authorName,
      authorTitle,
      company,
      attribution,
      authorImage{ asset->{ _id, url, metadata { lqip, dimensions } } },
      companyLogo{ asset->{ _id, url } }
    },
    relatedFirmType->{ title, "slug": slug.current },
    relatedUseCases[]->{ title, "slug": slug.current, excerpt },
    relatedFeatures[]->{ title, "slug": slug.current },
    seo,
    "moreCaseStudies": *[_type == "caseStudy" && slug.current != $slug] | order(publishedAt desc) [0..2] {
      title,
      "slug": slug.current,
      excerpt,
      industry,
      thumbnail{ asset->{ _id, url, metadata { lqip, dimensions } } },
      companyLogo{ asset->{ _id, url } },
      category->{ title }
    }
  }
`

export const caseStudySlugsQuery = `*[_type == "caseStudy" && defined(slug.current)]{ "slug": slug.current }`
