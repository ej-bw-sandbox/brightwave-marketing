import { client } from '../client'

export const icpIndexQuery = `
  *[_type == "icpPage"] | order(title asc) {
    _id, title, slug, h1, heroTagline, excerpt, product,
    heroImage{ asset->{ _id, url, metadata { lqip, dimensions } } }
  }
`

export const icpQuery = `
  *[_type == "icpPage" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    product,
    menuLabel,
    excerpt,
    h1,
    heroTagline,
    heroBody,
    heroImage{ asset->{ _id, url, metadata { lqip, dimensions } } },
    valueH2,
    valuePillars[]{ title, bullets },
    capabilitiesH2,
    capabilitiesSubtitle,
    capabilities[]{ title, intro, features, content },
    workflowH2,
    workflows[]{ title, before, after },
    metricsH2,
    metricsContent,
    securityH2,
    securityContent,
    socialH2,
    testimonialQuote,
    testimonialAttribution,
    socialContent,
    pricingContent,
    purposeBuiltContent,
    ctaH2,
    ctaSubheadline,
    ctaBody,
    ctaButtonLabel,
    ctaTagline,
    relatedUseCases[]->{ title, slug, excerpt },
    relatedCaseStudies[]->{ title, slug, excerpt, thumbnail },
    relatedFeatures[]->{ title, slug, tagline },
    seo
  }
`

export const icpSlugsQuery = `*[_type == "icpPage" && defined(slug.current)]{ "slug": slug.current }`
