export const engineeringQuery = `
  *[_type == "engineeringPage"][0]{
    headline,
    description,
    featuredEyebrow,
    searchLabel,
    searchPlaceholder,
    sortByLabel,
    sortByDateLabel,
    sortAscendingLabel,
    sortDescendingLabel,
    authorLabel,
    emptyStateText,
    formSuccessMessage,
    formErrorMessage,
    ctaTitleWords[]{
      text,
      variant,
      _key
    },
    ctaButtonText,
    ctaButtonUrl,
    seo
  }
`
