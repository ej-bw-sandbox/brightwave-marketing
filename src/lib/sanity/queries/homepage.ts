import { client } from '../client'

export const homepageQuery = `
  *[_type == "homepage"][0]{
    heroHeadline,
    heroSubheadline,
    heroCtas[]{ label, url, style, openInNewTab },
    heroVideoUrl,
    heroImage{ asset->{ url, metadata { lqip, dimensions } } },
    comparisonSection{
      leftLabel,
      leftStats[]{ value, description },
      rightLabel,
      rightStats[]{ value, description }
    },
    socialProofHeadline,
    socialProofLogos[]{ name, logo{ asset->{ url } }, url },
    metrics[]{ value, label, context },
    featureSections[]{ title, description, image{ asset->{ url, metadata { lqip, dimensions } } }, icon },
    beforeAfter{ beforeTitle, afterTitle, beforeItems, afterItems },
    testimonialsSectionLabel,
    testimonials[]{ quote, attribution, authorName, authorImage{ asset->{ url } }, companyLogo{ asset->{ url } } },
    exploreSectionTitleLines[]{ segments[]{ text, style } },
    explorePlatformCards[]{ title, description, lightImage, darkImage, ctaLabel, ctaUrl },
    bottomCta{ headline, subheadline, ctas[]{ label, url, style, openInNewTab } },
    seo
  }
`
