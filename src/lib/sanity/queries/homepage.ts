import { client } from '../client'

export const homepageQuery = `
  *[_type == "homepage"][0]{
    heroHeadline, heroSubheadline, heroCtas, heroVideoUrl,
    heroImage{ asset->{ url, metadata { lqip, dimensions } } },
    socialProofLogos[]{ name, logo{ asset->{ url } }, url },
    socialProofHeadline, metrics, featureSections, beforeAfter,
    testimonials, bottomCta, seo
  }
`
