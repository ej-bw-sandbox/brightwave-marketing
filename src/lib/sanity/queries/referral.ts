export const referralQuery = `
  *[_type == "referralPage"][0]{
    headline,
    supportingText,
    linkedinUrl,
    twitterUrl,
    formSectionTitle,
    calendlyUrl,
    recentBlogsSectionTitle,
    latestPostsSectionTitle,
    readMoreLabel,
    seo
  }
`
