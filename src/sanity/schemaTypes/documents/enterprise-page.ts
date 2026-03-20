import { defineType, defineField } from 'sanity'

export const enterpriseSalesPage = defineType({
  name: 'enterpriseSalesPage',
  title: 'Enterprise Sales Page',
  type: 'document',
  fields: [
    defineField({ name: 'heroHeadline', title: 'Hero Headline', type: 'string' }),
    defineField({ name: 'heroSubheadline', title: 'Hero Sub-headline', type: 'text' }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'heroCtas', title: 'Hero CTAs', type: 'array', of: [{ type: 'cta' }] }),
    defineField({
      name: 'benefits',
      title: 'Key Benefits',
      type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'description', title: 'Description', type: 'text' },
        { name: 'icon', title: 'Icon', type: 'string' },
      ] }],
    }),
    defineField({ name: 'socialProofLogos', title: 'Enterprise Client Logos', type: 'array', of: [{ type: 'image' }] }),
    defineField({ name: 'socialProofHeadline', title: 'Social Proof Headline', type: 'string' }),
    defineField({ name: 'roiHeadline', title: 'ROI Section Headline', type: 'string' }),
    defineField({ name: 'metrics', title: 'ROI Metrics', type: 'array', of: [{ type: 'stat' }] }),
    defineField({ name: 'testimonials', title: 'Testimonials', type: 'array', of: [{ type: 'testimonialRef' }] }),
    defineField({ name: 'securitySummary', title: 'Security Summary', type: 'blockContent' }),
    defineField({ name: 'complianceBadges', title: 'Compliance Badges', type: 'array', of: [{
      type: 'object',
      fields: [
        { name: 'label', title: 'Label', type: 'string' },
        { name: 'icon', title: 'Icon', type: 'image' },
      ],
    }] }),
    defineField({ name: 'formHeadline', title: 'Form Section Headline', type: 'string' }),
    defineField({ name: 'formDescription', title: 'Form Description', type: 'text' }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  preview: {
    prepare: () => ({ title: 'Enterprise Sales Page' }),
  },
})
