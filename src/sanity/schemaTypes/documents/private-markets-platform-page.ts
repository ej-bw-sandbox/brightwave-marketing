import { defineType, defineField } from 'sanity'

export const privateMarketsPlatformPage = defineType({
  name: 'privateMarketsPlatformPage',
  title: 'Private Markets Platform Page',
  type: 'document',
  fields: [
    // Hero
    defineField({ name: 'heroHeadline', title: 'Hero Headline', type: 'string' }),
    defineField({ name: 'heroDescription', title: 'Hero Description', type: 'text', rows: 3 }),
    defineField({ name: 'heroPrimaryCtaLabel', title: 'Hero Primary CTA Label', type: 'string' }),
    defineField({ name: 'heroPrimaryCtaUrl', title: 'Hero Primary CTA URL', type: 'string' }),
    defineField({ name: 'heroSecondaryCtaLabel', title: 'Hero Secondary CTA Label', type: 'string' }),
    defineField({ name: 'heroSecondaryCtaUrl', title: 'Hero Secondary CTA URL', type: 'string' }),

    // Personas
    defineField({
      name: 'personas',
      title: 'Personas',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
          { name: 'body', title: 'Body', type: 'text' },
        ],
      }],
    }),

    // Benefits
    defineField({ name: 'benefitsEyebrow', title: 'Benefits Eyebrow', type: 'string' }),
    defineField({ name: 'benefitsStickyTitle', title: 'Benefits Sticky Title', type: 'string' }),
    defineField({ name: 'benefitsCtaLabel', title: 'Benefits CTA Label', type: 'string' }),
    defineField({ name: 'benefitsCtaUrl', title: 'Benefits CTA URL', type: 'string' }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'description', title: 'Description', type: 'text' },
        ],
      }],
    }),

    // Use Cases
    defineField({ name: 'useCasesEyebrow', title: 'Use Cases Eyebrow', type: 'string' }),
    defineField({
      name: 'useCases',
      title: 'Use Cases',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'number', title: 'Number (e.g. "01")', type: 'string' },
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'description', title: 'Description', type: 'text' },
          { name: 'whyBrightwave', title: 'Why Brightwave', type: 'text' },
          { name: 'image', title: 'Illustration', type: 'image', options: { hotspot: true } },
        ],
        preview: {
          select: { title: 'title', subtitle: 'number' },
        },
      }],
    }),

    // Supercharge Section
    defineField({ name: 'superchargeCtaLabel', title: 'Supercharge CTA Label', type: 'string' }),
    defineField({ name: 'superchargeCtaUrl', title: 'Supercharge CTA URL', type: 'string' }),
    defineField({ name: 'superchargeEyebrow', title: 'Supercharge Eyebrow', type: 'string' }),
    defineField({ name: 'superchargeBody', title: 'Supercharge Body', type: 'text', rows: 4 }),

    // Testimonials
    defineField({ name: 'testimonialsLabel', title: 'Testimonials Label', type: 'string' }),
    defineField({ name: 'testimonials', title: 'Testimonials', type: 'array', of: [{ type: 'testimonialRef' }] }),

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

    // Footer CTA
    defineField({ name: 'footerCtaDescription', title: 'Footer CTA Description', type: 'text', rows: 3 }),
    defineField({
      name: 'footerCtaWords',
      title: 'Footer CTA Words',
      description: 'The large title words displayed in the footer CTA. Each word has a style: "bold" for primary color, "grey" for muted.',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'text', title: 'Text', type: 'string' },
          { name: 'style', title: 'Style', type: 'string', options: { list: ['bold', 'grey'] } },
          { name: 'row', title: 'Row (1-4)', type: 'number' },
        ],
      }],
    }),
    defineField({ name: 'footerCtaLabel', title: 'Footer CTA Label', type: 'string' }),
    defineField({ name: 'footerCtaUrl', title: 'Footer CTA URL', type: 'string' }),

    // SEO
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  preview: {
    prepare: () => ({ title: 'Private Markets Platform Page' }),
  },
})
