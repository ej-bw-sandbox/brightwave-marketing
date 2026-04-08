export const contactQuery = `
  *[_type == "contactPage"][0]{
    headline,
    supportingText,
    linkedinUrl,
    twitterUrl,
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
    seo
  }
`
