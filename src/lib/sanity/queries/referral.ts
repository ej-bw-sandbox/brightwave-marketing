export const referralQuery = `
  *[_type == "referralPage"][0]{
    headline,
    supportingText,
    linkedinUrl,
    twitterUrl,
    formSectionTitle,
    calendlyUrl,
    contactForm->{
      formTitle, formSubtitle, formVariant,
      fields[]{ _key, fieldName, fieldLabel, fieldPlaceholder, fieldType, isRequired, options[]{ _key, value, label } },
      submitButtonText, successMessage, errorMessage, apiEndpoint, notificationEmail
    },
    recentBlogsSectionTitle,
    latestPostsSectionTitle,
    readMoreLabel,
    seo
  }
`
