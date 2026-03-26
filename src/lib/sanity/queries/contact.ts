export const contactQuery = `
  *[_type == "contactPage"][0]{
    headline,
    supportingText,
    linkedinUrl,
    twitterUrl,
    recentBlogsSectionTitle,
    latestPostsSectionTitle,
    readMoreLabel,
    seo
  }
`
