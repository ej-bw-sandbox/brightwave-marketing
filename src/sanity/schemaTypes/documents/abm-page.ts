import { defineType, defineField } from 'sanity'

export const abmPage = defineType({
  name: 'abmPage',
  title: 'ABM Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Internal Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', validation: (r) => r.required() }),
    defineField({ name: 'companyName', title: 'Company Name', type: 'string' }),
    defineField({ name: 'companyDomain', title: 'Company Domain', type: 'string' }),
    defineField({ name: 'companyLogo', title: 'Company Logo', type: 'image' }),
    defineField({ name: 'companyLogoUrl', title: 'Company Logo URL', type: 'url', description: 'External logo URL (used if no uploaded logo)' }),
    defineField({ name: 'primaryBrandColor', title: 'Primary Brand Color', type: 'string', description: 'Hex code' }),
    defineField({ name: 'secondaryBrandColor', title: 'Secondary Brand Color', type: 'string' }),
    defineField({ name: 'heroTitle', title: 'Hero Title', type: 'string' }),
    defineField({ name: 'heroSubtitle', title: 'Hero Subtitle', type: 'string' }),
    defineField({
      name: 'challenges',
      title: 'Challenges & Solutions',
      type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'title', title: 'Challenge Title', type: 'string' },
        { name: 'description', title: 'Description', type: 'text' },
        { name: 'solution', title: 'Solution', type: 'text' },
      ] }],
      validation: (r) => r.max(4),
    }),
    defineField({ name: 'ctaPrimaryText', title: 'Primary CTA Text', type: 'string', initialValue: 'Get Started' }),
    defineField({ name: 'ctaSecondaryText', title: 'Secondary CTA Text', type: 'string', initialValue: 'Schedule a Demo' }),
    defineField({ name: 'demoUrl', title: 'Demo URL', type: 'url' }),
    defineField({ name: 'contactUrl', title: 'Contact URL', type: 'url' }),
    defineField({ name: 'socialProofText', title: 'Social Proof Text', type: 'text' }),

    /* ---------------------------------------------------------------- */
    /*  Timeline / Deal Impact phases                                    */
    /* ---------------------------------------------------------------- */
    defineField({
      name: 'timelineHeadline',
      title: 'Timeline Section Headline',
      type: 'string',
      initialValue: 'Deal Impact Timeline',
      group: 'timeline',
    }),
    defineField({
      name: 'timelineSubheadline',
      title: 'Timeline Section Subheadline',
      type: 'text',
      group: 'timeline',
    }),
    defineField({
      name: 'timelinePhases',
      title: 'Timeline Phases',
      type: 'array',
      group: 'timeline',
      of: [{
        type: 'object',
        fields: [
          { name: 'phase', title: 'Phase Name', type: 'string' },
          { name: 'description', title: 'Phase Description', type: 'text' },
          {
            name: 'items',
            title: 'Phase Items',
            type: 'array',
            of: [{
              type: 'object',
              fields: [
                { name: 'title', title: 'Item Title', type: 'string' },
                { name: 'description', title: 'Item Description', type: 'text' },
                { name: 'beforeLabel', title: 'Before Label', type: 'string' },
                { name: 'beforeValue', title: 'Before Value', type: 'string' },
                { name: 'afterLabel', title: 'After Label', type: 'string' },
                { name: 'afterValue', title: 'After Value', type: 'string' },
                { name: 'timeSaved', title: 'Time Saved', type: 'string' },
                { name: 'problems', title: 'Pain Points', type: 'array', of: [{ type: 'string' }] },
              ],
            }],
          },
        ],
        preview: {
          select: { title: 'phase' },
        },
      }],
    }),

    /* ---------------------------------------------------------------- */
    /*  Competitive positioning                                          */
    /* ---------------------------------------------------------------- */
    defineField({
      name: 'competitiveHeadline',
      title: 'Competitive Section Headline',
      type: 'string',
      description: 'e.g. "Ready to beat [competitors]?"',
    }),
    defineField({
      name: 'competitiveBody',
      title: 'Competitive Section Body',
      type: 'text',
    }),

    defineField({ name: 'finalCtaHeadline', title: 'Final CTA Headline', type: 'string' }),
    defineField({ name: 'finalCtaSubheadline', title: 'Final CTA Sub-headline', type: 'string' }),
    defineField({ name: 'competitorNames', title: 'Competitor Names', type: 'string', description: 'Comma-separated' }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  groups: [
    { name: 'timeline', title: 'Deal Impact Timeline' },
  ],
  preview: {
    select: { title: 'companyName', subtitle: 'title', media: 'companyLogo' },
  },
})
