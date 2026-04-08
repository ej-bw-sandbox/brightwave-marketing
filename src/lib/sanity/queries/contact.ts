export const contactQuery = `
  *[_type == "contactPage"][0]{
    headline,
    supportingText,
    linkedinUrl,
    twitterUrl,
    contactForm->{
      formTitle, formSubtitle, formVariant, slug,
      fields[]{ _key, fieldName, fieldLabel, fieldPlaceholder, fieldType, isRequired, options[]{ _key, value, label } },
      submitButtonText, successMessage, errorMessage, apiEndpoint, notificationEmail
    },
    recentBlogsSectionTitle,
    latestPostsSectionTitle,
    readMoreLabel,
    seo
  }
`
