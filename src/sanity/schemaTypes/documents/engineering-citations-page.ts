import { defineType, defineField } from 'sanity'

export const engineeringCitationsPage = defineType({
  name: 'engineeringCitationsPage',
  title: 'Engineering Citations Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Page Title', type: 'string' }),
    defineField({ name: 'description', title: 'Meta Description', type: 'text', rows: 3 }),

    // Template header
    defineField({ name: 'goBackLabel', title: 'Go Back Label', type: 'string', description: 'Text for the "Go back" link (e.g. "Go back")' }),
    defineField({ name: 'byLabel', title: 'By Label', type: 'string', description: 'Author attribution prefix (e.g. "By")' }),

    // Share section
    defineField({ name: 'shareOnLabel', title: 'Share On Label', type: 'string', description: 'Label above social links (e.g. "Share on")' }),
    defineField({ name: 'linkedinLabel', title: 'LinkedIn Label', type: 'string', description: 'Text for LinkedIn share link' }),
    defineField({ name: 'xLabel', title: 'X Label', type: 'string', description: 'Text for X/Twitter share link' }),

    // Bottom CTA section
    defineField({
      name: 'ctaTitleLine1',
      title: 'CTA Title Line 1',
      type: 'object',
      description: 'First line of the CTA heading (e.g. "Step" + "Into")',
      fields: [
        { name: 'word1', title: 'Word 1 (highlighted)', type: 'string' },
        { name: 'word2', title: 'Word 2 (grey)', type: 'string' },
      ],
    }),
    defineField({
      name: 'ctaTitleLine2',
      title: 'CTA Title Line 2',
      type: 'object',
      description: 'Second line of the CTA heading (e.g. "THe" + "Future" + "OF")',
      fields: [
        { name: 'word1', title: 'Word 1 (grey)', type: 'string' },
        { name: 'word2', title: 'Word 2 (highlighted)', type: 'string' },
        { name: 'word3', title: 'Word 3 (grey)', type: 'string' },
      ],
    }),
    defineField({
      name: 'ctaTitleLine3',
      title: 'CTA Title Line 3',
      type: 'object',
      description: 'Third line of the CTA heading (e.g. "FiNANCIAL")',
      fields: [
        { name: 'word1', title: 'Word 1 (highlighted)', type: 'string' },
      ],
    }),
    defineField({
      name: 'ctaTitleLine4',
      title: 'CTA Title Line 4',
      type: 'object',
      description: 'Fourth line of the CTA heading (e.g. "Research")',
      fields: [
        { name: 'word1', title: 'Word 1 (highlighted)', type: 'string' },
      ],
    }),
    defineField({ name: 'ctaButtonLabel', title: 'CTA Button Label', type: 'string', description: 'Text on the CTA button (e.g. "Schedule a Trial")' }),
    defineField({
      name: 'ctaButtonUrl',
      title: 'CTA Button URL',
      type: 'url',
      description: 'Link for the CTA button',
      validation: (rule) => rule.uri({ allowRelative: true, scheme: ['https', 'http'] }),
    }),

    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  preview: {
    select: { title: 'title' },
  },
})
