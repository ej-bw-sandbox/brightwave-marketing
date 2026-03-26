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
    superchargeCtaLabel, superchargeCtaUrl,
    superchargeEyebrow, superchargeBody,
    testimonialsLabel,
    faqsTitle,
    faqs[]{ question, answer },
    footerCtaDescription,
    footerCtaWords[]{ text, style, row },
    footerCtaLabel, footerCtaUrl,
    seo
  }
`
