export const engineering_citationsQuery = `
  *[_type == "engineeringCitationsPage"][0]{
    title,
    description,
    goBackLabel,
    byLabel,
    shareOnLabel,
    linkedinLabel,
    xLabel,
    ctaTitleLine1{ word1, word2 },
    ctaTitleLine2{ word1, word2, word3 },
    ctaTitleLine3{ word1 },
    ctaTitleLine4{ word1 },
    ctaButtonLabel,
    ctaButtonUrl,
    seo
  }
`
