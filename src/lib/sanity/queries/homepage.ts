export const homepageQuery = `
  *[_type == "homepage"][0]{
    heroHeadline,
    heroSubheadline,
    heroCtas[]{ label, url, style, openInNewTab },
    comparisonSection{
      leftLabel,
      leftStats[]{ value, description },
      rightLabel,
      rightStats[]{ value, description }
    },
    socialProofHeadline,
    beforeAfter{ beforeTitle, afterTitle, beforeItems, afterItems },
    testimonialsSectionLabel,
    exploreSectionTitleLines[]{ segments[]{ text, style } },
    explorePlatformCards[]{ title, description, lightImage, darkImage, ctaLabel, ctaUrl },
    seo
  }
`
