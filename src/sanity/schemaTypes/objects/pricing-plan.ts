import { defineType } from 'sanity'

export const pricingPlan = defineType({
  name: 'pricingPlan',
  title: 'Pricing Plan',
  type: 'object',
  fields: [
    { name: 'name', title: 'Plan Name', type: 'string', validation: (r) => r.required() },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'priceMonthly', title: 'Monthly Price', type: 'number' },
    { name: 'priceAnnual', title: 'Annual Price', type: 'number' },
    { name: 'priceLabel', title: 'Price Label Override', type: 'string', description: 'e.g. "Contact for Pricing"' },
    { name: 'priceSuffix', title: 'Price Suffix', type: 'string', description: 'e.g. "/month", "/seat per month"' },
    { name: 'userLimit', title: 'User Limit Label', type: 'string', description: 'e.g. "1 User", "Up to 10 Users"' },
    { name: 'isFeatured', title: 'Featured/Most Popular', type: 'boolean', initialValue: false },
    { name: 'features', title: 'Feature List', type: 'array', of: [{ type: 'string' }] },
    { name: 'cta', title: 'CTA', type: 'cta' },
    { name: 'trialNote', title: 'Trial Note', type: 'string', description: 'e.g. "7-day free trial - No credit card required"' },
    { name: 'product', title: 'Product', type: 'string', description: 'Which product toggle this plan belongs to' },
  ],
  preview: {
    select: { title: 'name', subtitle: 'priceLabel' },
  },
})
