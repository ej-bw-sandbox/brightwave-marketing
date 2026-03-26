export const thank_you_contactQuery = `
  *[_type == "thankYouContactPage"][0]{
    heroHeading,
    heroBody,
    ctaText,
    ctaUrl,
    heroImageUrl,
    heroImageAlt,
    seo
  }
`
