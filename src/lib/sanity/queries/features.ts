export const featureIndexQuery = `
  *[_type == "platformFeature"] | order(title asc) {
    title, slug, heroH1, tags, menuCategory,
    heroImage{ asset->{ _id, url, metadata { lqip, dimensions } } }
  }
`

export const featureQuery = `
  *[_type == "platformFeature" && slug.current == $slug][0]{
    title,
    slug,
    tagline,
    heroH1,
    heroBody,
    heroImage{ asset->{ _id, url, metadata { lqip, dimensions } } },
    statBadges[]{ value, label, context },
    stats[]{ value, label, context },

    capabilitiesH2,
    capabilitiesSubtitle,
    capabilityPillars[]{ title, description },
    pillars[]{ title, description, icon },

    howItWorksH2,
    howItWorksSteps[]{
      number, label, title, description, bullets,
      image{ asset->{ _id, url, metadata { lqip, dimensions } } }
    },
    steps[]{
      title, description,
      image{ asset->{ _id, url, metadata { lqip, dimensions } } }
    },

    deepDiveH2,
    deepDiveRows[]{
      title, body,
      image{ asset->{ _id, url, metadata { lqip, dimensions } } }
    },

    outputH2,
    outputSubtitle,
    outputs[]{
      tabLabel, description,
      image{ asset->{ _id, url, metadata { lqip, dimensions } } }
    },

    techSpecsH2,
    technicalCapabilities,
    securityCompliance,
    techCapabilities,
    securityItems,

    useCasesH2,
    useCaseCards[]{ title, description, outcome, linkUrl },

    testimonialQuote,
    testimonialAttribution,
    socialProofLogos[]{ asset->{ _id, url } },

    relatedFeatures[]->{ title, slug, heroH1, tagline,
      heroImage{ asset->{ _id, url, metadata { lqip, dimensions } } }
    },
    relatedUseCases[]->{ title, slug },

    ctaH2,
    ctaBody,
    ctaButtonLabel,
    ctaHeadline,
    ctaButtons,

    body,
    seo,
    tags,
    menuCategory,
  }
`

export const featureSlugsQuery = `*[_type == "platformFeature" && defined(slug.current)]{ "slug": slug.current }`
