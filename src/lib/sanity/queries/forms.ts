export const privateMarketsWizardFormQuery = `
  *[_type == "privateMarketsWizardForm" && slug.current == $slug][0]{
    title, slug,
    step1Title, step2Title, step3Title, step4Title, step5Title,
    firmTypeOptions[]{ _key, value, label, description },
    teamSizeOptions[]{ _key, value, label, min, max },
    dealsPerYearOptions[]{ _key, value, label, min, max },
    hoursPerDealOptions[]{ _key, value, label, min, max },
    timeframeOptions[]{ _key, value, label },
    roleOptions,
    urgencyMinLabel, urgencyMaxLabel,
    resultsHeadline, resultsSubheadline,
    instantDemoLabel, instantDemoUrl,
    scheduleDemoLabel, scheduleDemoUrl,
    apiEndpoint, hubspotFormId
  }
`

export const contactFormQuery = `
  *[_type == "contactForm" && slug.current == $slug][0]{
    formTitle, formSubtitle, formVariant, slug,
    fields[]{ _key, fieldName, fieldLabel, fieldPlaceholder, fieldType, isRequired, options[]{ _key, value, label } },
    submitButtonText, successMessage, errorMessage, apiEndpoint, notificationEmail
  }
`
