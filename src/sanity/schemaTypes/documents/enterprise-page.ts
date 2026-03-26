import { defineType, defineField } from 'sanity'

export const enterpriseSalesPage = defineType({
  name: 'enterpriseSalesPage',
  title: 'Enterprise Sales Page',
  type: 'document',
  fields: [
    // Hero
    defineField({ name: 'heroHeadline', title: 'Hero Headline', type: 'string' }),
    defineField({ name: 'heroSubheadline', title: 'Hero Sub-headline', type: 'text' }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'heroCtas', title: 'Hero CTAs', type: 'array', of: [{ type: 'cta' }] }),

    // Social Proof
    defineField({ name: 'socialProofHeadline', title: 'Social Proof Headline', type: 'string' }),
    defineField({ name: 'socialProofLogos', title: 'Enterprise Client Logos', type: 'array', of: [{ type: 'image' }] }),

    // Proof Points
    defineField({ name: 'proofPointsEyebrow', title: 'Proof Points Eyebrow', type: 'string' }),
    defineField({
      name: 'proofPoints',
      title: 'Proof Points',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'value', title: 'Value', type: 'string' },
          { name: 'description', title: 'Description', type: 'string' },
        ],
      }],
    }),

    // Research Section
    defineField({ name: 'researchHeadline', title: 'Research Section Headline', type: 'string' }),
    defineField({ name: 'researchEyebrow', title: 'Research Section Eyebrow', type: 'string' }),
    defineField({ name: 'researchBody', title: 'Research Section Body', type: 'text' }),

    // Core Capabilities
    defineField({ name: 'capabilitiesEyebrow', title: 'Capabilities Eyebrow', type: 'string' }),
    defineField({ name: 'capabilitiesStickyTitle', title: 'Capabilities Sticky Title', type: 'string' }),
    defineField({
      name: 'capabilityCards',
      title: 'Capability Cards',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'subtitle', title: 'Subtitle', type: 'text' },
          { name: 'howHelpsLabel', title: 'How Helps Label', type: 'string' },
          { name: 'howHelpsText', title: 'How Helps Text', type: 'text' },
        ],
      }],
    }),

    // ROI / By the Numbers
    defineField({ name: 'roiHeadline', title: 'ROI Section Headline', type: 'string' }),
    defineField({ name: 'metrics', title: 'ROI Metrics', type: 'array', of: [{ type: 'stat' }] }),

    // By the Numbers
    defineField({ name: 'byTheNumbersHeadline', title: 'By The Numbers Headline', type: 'string' }),
    defineField({
      name: 'byTheNumbersItems',
      title: 'By The Numbers Items',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', title: 'Label', type: 'string' },
        ],
      }],
    }),

    // Security Certifications
    defineField({ name: 'securityEyebrow', title: 'Security Section Eyebrow', type: 'string' }),
    defineField({
      name: 'securityCertifications',
      title: 'Security Certifications',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'description', title: 'Description', type: 'text' },
        ],
      }],
    }),

    // Security Features
    defineField({ name: 'securityFeaturesHeadline', title: 'Security Features Headline', type: 'string' }),
    defineField({ name: 'securityFeaturesCtaLabel', title: 'Security Features CTA Label', type: 'string' }),
    defineField({ name: 'securityFeaturesCtaUrl', title: 'Security Features CTA URL', type: 'string' }),
    defineField({
      name: 'securityFeatures',
      title: 'Security Features',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'description', title: 'Description', type: 'text' },
        ],
      }],
    }),

    // Why Choose
    defineField({ name: 'whyChooseHeadline', title: 'Why Choose Headline', type: 'string' }),
    defineField({
      name: 'whyChooseCards',
      title: 'Why Choose Cards',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
          { name: 'body', title: 'Body', type: 'text' },
        ],
      }],
    }),

    // Timeline
    defineField({ name: 'timelineHeadline', title: 'Timeline Headline', type: 'string' }),
    defineField({
      name: 'timelineSteps',
      title: 'Timeline Steps',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'description', title: 'Description', type: 'text' },
        ],
      }],
    }),

    // FAQs
    defineField({ name: 'faqsTitle', title: 'FAQs Title', type: 'string' }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'question', title: 'Question', type: 'string' },
          { name: 'answer', title: 'Answer', type: 'text' },
        ],
      }],
    }),

    // Testimonials
    defineField({ name: 'testimonials', title: 'Testimonials', type: 'array', of: [{ type: 'testimonialRef' }] }),

    // Footer CTA
    defineField({ name: 'footerTagline', title: 'Footer Tagline', type: 'string' }),
    defineField({ name: 'footerCtaLabel', title: 'Footer CTA Label', type: 'string' }),
    defineField({ name: 'footerCtaUrl', title: 'Footer CTA URL', type: 'string' }),

    // Form
    defineField({ name: 'formHeadline', title: 'Form Section Headline', type: 'string' }),
    defineField({ name: 'formDescription', title: 'Form Description', type: 'text' }),

    // Legacy fields
    defineField({ name: 'benefits', title: 'Key Benefits', type: 'array', of: [{ type: 'object', fields: [
      { name: 'title', title: 'Title', type: 'string' },
      { name: 'description', title: 'Description', type: 'text' },
      { name: 'icon', title: 'Icon', type: 'string' },
    ] }] }),
    defineField({ name: 'securitySummary', title: 'Security Summary', type: 'blockContent' }),
    defineField({ name: 'complianceBadges', title: 'Compliance Badges', type: 'array', of: [{
      type: 'object',
      fields: [
        { name: 'label', title: 'Label', type: 'string' },
        { name: 'icon', title: 'Icon', type: 'image' },
      ],
    }] }),

    // SEO
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  preview: {
    prepare: () => ({ title: 'Enterprise Sales Page' }),
  },
})
