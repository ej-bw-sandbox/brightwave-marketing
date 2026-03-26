export const pricingQuery = `
  *[_type == "pricingPage"][0]{
    headline,
    subheadline,
    productSelector,
    productSelectorLabel,
    billingToggle,
    billingMonthlyLabel,
    billingAnnualLabel,
    plans[]{
      name,
      description,
      priceMonthly,
      priceAnnual,
      priceSuffix,
      userLimit,
      isFeatured,
      featuredBadgeText,
      features,
      cta{ label, url, style, openInNewTab },
      trialNote,
      product
    },
    faq[]{ question, answer },
    seo
  }
`
