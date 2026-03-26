import { client } from '../client'

export const comparisonIndexQuery = `
  *[_type == "comparison"] | order(title asc) {
    _id,
    title,
    slug,
    competitorName,
    heroDescription,
    competitorLogo{ asset->{ _id, url } },
    competitorIcon{ asset->{ _id, url } },
    comparisonCategory->{ title }
  }
`

export const comparisonQuery = `
  *[_type == "comparison" && slug.current == $slug][0]{
    ...,
    competitorLogo{ asset->{ _id, url } },
    competitorIcon{ asset->{ _id, url } },
    comparisonCategory->{ title },
    contentBlocks[]{
      ...,
      image{ asset->{ _id, url } },
      icon{ asset->{ _id, url } }
    },
    useCaseFitItems,
    comparisonTable,
    faqs,
    testimonial{
      ...,
      authorImage{ asset->{ _id, url } },
      companyLogo{ asset->{ _id, url } }
    },
    "otherComparisons": *[_type == "comparison" && slug.current != $slug] | order(title asc) [0..3] {
      title, slug, competitorName, heroDescription,
      competitorLogo{ asset->{ _id, url } },
      competitorIcon{ asset->{ _id, url } }
    }
  }
`

export const comparisonSlugsQuery = `*[_type == "comparison" && defined(slug.current)]{ "slug": slug.current }`
