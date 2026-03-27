export const private_markets_platformQuery = `
  *[_type == "privateMarketsPlatformPage"][0]{
    heroHeadline, heroDescription,
    heroPrimaryCtaLabel, heroPrimaryCtaUrl,
    heroSecondaryCtaLabel, heroSecondaryCtaUrl,
    personas[]{ eyebrow, body },
    benefitsEyebrow, benefitsStickyTitle,
    benefitsCtaLabel, benefitsCtaUrl,
    benefits[]{ title, description },
    useCasesEyebrow,
    useCases[]{ number, title, description, whyBrightwave, image{ asset->{ _id, url, metadata { lqip, dimensions } } } },
    superchargeCtaLabel, superchargeCtaUrl,
    superchargeEyebrow, superchargeBody,
    testimonialsLabel,
    testimonials[]->{
      _id, quote, authorName, authorTitle, company, attribution,
      authorImage{ asset->{ _id, url } },
      companyLogo{ asset->{ _id, url } }
    },
    faqsTitle,
    faqs[]{ question, answer },
    footerCtaDescription,
    footerCtaWords[]{ text, style, row },
    footerCtaLabel, footerCtaUrl,
    seo
  }
`
