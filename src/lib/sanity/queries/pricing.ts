import { client } from '../client'

export const pricingQuery = `
  *[_type == "pricingPage"][0]{
    headline, subheadline, productSelector, billingToggle,
    plans[]{ name, description, priceMonthly, priceAnnual, priceLabel, priceSuffix,
             userLimit, isFeatured, features, cta, trialNote, product },
    faq[]{ question, answer }, seo
  }
`
