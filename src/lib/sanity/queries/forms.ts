export const privateMarketsWizardFormQuery = `
  *[_type == "privateMarketsWizardForm"][0]{
    step1Title, step2Title, step3Title, step4Title, step5Title,
    firmTypeOptions[]{ value, label, teamSize, dealsEvaluated, dealsCompleted, avgDealSize, avgHourlyRate },
    urgencyMinLabel, urgencyMaxLabel,
    timeframeOptions[]{ value, label },
    roleOptions,
    resultsHeadline, resultsSubheadline,
    instantDemoLabel, instantDemoUrl,
    scheduleDemoLabel, scheduleDemoUrl,
    apiEndpoint, hubspotFormId
  }
`

export const contactFormQuery = `
  *[_type == "contactForm" && formVariant == $variant][0]{
    formTitle, formSubtitle, formVariant,
    fields[]{ fieldName, fieldLabel, fieldPlaceholder, fieldType, isRequired, options[]{ value, label } },
    submitButtonText, successMessage, errorMessage, apiEndpoint, notificationEmail
  }
`
