import { client } from '../client'

export const useCaseIndexQuery = `
  *[_type == "useCase"] | order(title asc) {
    _id, title, slug, eyebrow, excerpt, product,
    heroImage{ asset->{ _id, url, metadata { lqip, dimensions } } }
  }
`

export const useCaseQuery = `
  *[_type == "useCase" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    product,
    menuLabel,
    excerpt,

    // Hero
    eyebrow,
    h1,
    heroSubtitle,
    h2Hero,
    heroBody,
    heroImage{ asset->{ _id, url, metadata { lqip, dimensions } } },
    statPills[]{ value, label },
    stats[]{ value, label },

    // Challenge
    challengeH2,
    challenges[]{ _key, title, bullets },

    // Solution
    solutionH2,
    solutions[]{ _key, title, body, image{ asset->{ _id, url, metadata { lqip, dimensions } } } },

    // Timeline
    timelineH2,
    beforeSteps[]{ _key, time, description },
    afterSteps[]{ _key, time, description },
    beforeTotal,
    afterTotal,

    // Features
    featuresH2,
    featureHighlights[]{ _key, title, bullets },

    // Results
    resultsH2,
    resultMetrics[]{ _key, value, label, description },
    specializationH2,
    specializations[]{ _key, title, bullets },

    // Social proof
    testimonialQuote,
    testimonialAttribution,
    technologyBullets,
    competitiveEdgeBullets,

    // CTA
    ctaH2,
    ctaBody,
    ctaPrimaryLabel,
    ctaSecondaryLabel,
    ctaTertiaryLabel,

    // Relations
    relatedFeatures[]->{ title, slug, tagline },
    relatedCaseStudies[]->{ title, slug, excerpt, thumbnail{ asset->{ _id, url } } },
    relatedFirmTypes[]->{ title, slug },

    // SEO
    seo
  }
`

export const useCaseSlugsQuery = `*[_type == "useCase" && defined(slug.current)]{ "slug": slug.current }`
