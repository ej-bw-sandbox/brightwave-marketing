export const enterpriseQuery = `
  *[_type == "enterpriseSalesPage"][0]{
    heroHeadline, heroSubheadline,
    heroCtas[]{ label, url, style, openInNewTab },
    socialProofHeadline,
    proofPointsEyebrow,
    proofPoints[]{ value, description },
    researchHeadline, researchEyebrow, researchBody,
    capabilitiesEyebrow, capabilitiesStickyTitle,
    capabilityCards[]{ title, subtitle, howHelpsLabel, howHelpsText },
    byTheNumbersHeadline,
    byTheNumbersItems[]{ label },
    securityEyebrow,
    securityCertifications[]{ title, description },
    securityFeaturesHeadline, securityFeaturesCtaLabel, securityFeaturesCtaUrl,
    securityFeatures[]{ title, description },
    whyChooseHeadline,
    whyChooseCards[]{ eyebrow, body },
    timelineHeadline,
    timelineSteps[]{ title, description },
    faqsTitle,
    faqs[]{ question, answer },
    testimonials[]->{
      _id, quote, authorName, authorTitle, company, attribution,
      authorImage{ asset->{ _id, url } },
      companyLogo{ asset->{ _id, url } }
    },
    footerTagline, footerCtaLabel, footerCtaUrl,
    seo
  }
`
