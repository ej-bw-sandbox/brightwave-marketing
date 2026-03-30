import { client } from '../client'

export const solutionsIndexQuery = `
  *[_type == "firmType"] | order(title asc) {
    _id, title, slug, eyebrow, h1, excerpt, product,
    heroImage{ asset->{ _id, url, metadata { lqip, dimensions } } }
  }
`

export const solutionQuery = `
  *[_type == "firmType" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    product,
    menuLabel,
    excerpt,
    eyebrow,
    h1,
    heroH2,
    heroH3,
    heroBody,
    heroImage{ asset->{ _id, url, metadata { lqip, dimensions } } },
    challengeH2,
    challengeH3,
    operationalPressures,
    traditionalFailures,
    solutionH2,
    solutionH3,
    solutionBody,
    solutionLabel,
    capabilities[]{ title, bullets },
    valueH2,
    valueH3,
    valueCards[]{ title, bullets },
    valueSummary,
    securityH2,
    securityH3,
    securityArchitecture,
    complianceFeatures,
    integrationH2,
    integrationH3,
    integrations[]{ title, bullets },
    resultsQuote,
    resultsAttribution,
    performanceBullets,
    roiBullets,
    implementationH2,
    implementationSteps[]{ title, description },
    differentiationH2,
    differentiators[]{ title, body },
    ctaH2,
    ctaSubheadline,
    ctaBody,
    ctaButtonLabel,
    ctaTagline,
    faqTitle,
    faqs[]{ question, answer },
    relatedCaseStudies[]->{ title, slug, excerpt, thumbnail{ asset->{ _id, url } } },
    relatedUseCases[]->{ title, slug, excerpt },
    seo
  }
`

export const solutionSlugsQuery = `*[_type == "firmType" && defined(slug.current)]{ "slug": slug.current }`
