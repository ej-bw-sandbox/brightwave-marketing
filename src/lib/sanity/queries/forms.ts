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
    referralCodeField{ fieldLabel, fieldPlaceholder, isRequired },
    partnerTypeField{ fieldLabel, options[]{ value, label }, isRequired },
    submitButtonText, successMessage, errorMessage, apiEndpoint, notificationEmail
  }
`

// ── TypeScript types ──

export interface FormFieldOption {
  value: string
  label: string
}

export interface FormField {
  fieldName: string
  fieldLabel: string
  fieldPlaceholder?: string
  fieldType: 'text' | 'email' | 'tel' | 'textarea' | 'select'
  isRequired?: boolean
  options?: FormFieldOption[]
}

export interface ReferralCodeField {
  fieldLabel?: string
  fieldPlaceholder?: string
  isRequired?: boolean
}

export interface PartnerTypeField {
  fieldLabel?: string
  options?: FormFieldOption[]
  isRequired?: boolean
}

export interface FormConfig {
  formTitle?: string
  formSubtitle?: string
  formVariant?: 'contact' | 'referral' | 'partners'
  fields?: FormField[]
  referralCodeField?: ReferralCodeField
  partnerTypeField?: PartnerTypeField
  submitButtonText?: string
  successMessage?: string
  errorMessage?: string
  apiEndpoint?: string
  notificationEmail?: string
}
