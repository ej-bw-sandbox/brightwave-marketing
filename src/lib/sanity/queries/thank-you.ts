export const thankYouPageQuery = `
  *[_type == "thankYouPage" && slug.current == $slug][0]{
    title,
    slug,
    heroHeading,
    heroBody,
    ctaText,
    ctaUrl,
    heroImageUrl,
    heroImageAlt,
    seo
  }
`

export const thankYouPageSlugsQuery = `
  *[_type == "thankYouPage" && defined(slug.current)]{
    "slug": slug.current
  }
`
