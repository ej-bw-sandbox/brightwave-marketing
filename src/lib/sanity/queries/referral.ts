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
      referralCodeField{ fieldLabel, fieldPlaceholder, isRequired },
      partnerTypeField{ fieldLabel, options[]{ value, label }, isRequired },
      submitButtonText, successMessage, errorMessage, apiEndpoint, notificationEmail
    },
    recentBlogsSectionTitle,
    latestPostsSectionTitle,
    readMoreLabel,
    readMoreUrl,
    linkedinLabel,
    emptyStateText,
    seo
  }
`
