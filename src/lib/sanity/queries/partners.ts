export const partnersQuery = `
  *[_type == "partnersPage"][0]{
    title,
    description,
    heroHeading,
    heroSubtitlePrefix,
    heroSubtitleBold,
    heroSubtitleSuffix,
    heroCta,
    infoEyebrow,
    infoHeading,
    infoCardTitle,
    infoCardBullets,
    infoCardCta,
    proofEyebrow,
    proofPoints[]{
      stat,
      description
    },
    partnerListHeading,
    partnerListCta,
    partnerTypes,
    calloutHeading,
    calloutParagraphs,
    calloutCta,
    aboutHeading,
    aboutParagraphs,
    faqHeading,
    faq[]{
      question,
      answer
    },
    stepCtaHeading,
    stepCtaButtonLabel,
    stepCtaButtonUrl,
    contactForm->{
      formTitle, formSubtitle, formVariant,
      fields[]{ _key, fieldName, fieldLabel, fieldPlaceholder, fieldType, isRequired, options[]{ _key, value, label } },
      referralCodeField{ fieldLabel, fieldPlaceholder, isRequired },
      partnerTypeField{ fieldLabel, options[]{ value, label }, isRequired },
      submitButtonText, successMessage, errorMessage, apiEndpoint, notificationEmail
    },
    seo
  }
`
