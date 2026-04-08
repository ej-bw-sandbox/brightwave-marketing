import { defineType, defineField } from 'sanity'

export const privateMarketsWizardForm = defineType({
  name: 'privateMarketsWizardForm',
  title: 'Private Markets Wizard Form',
  type: 'document',
  fields: [
    // ── Step Titles ──
    defineField({
      name: 'step1Title',
      title: 'Step 1 Title',
      type: 'string',
      description: 'Heading for the firm-type / team-size step.',
      initialValue: 'Tell us about your firm',
    }),
    defineField({
      name: 'step2Title',
      title: 'Step 2 Title',
      type: 'string',
      description: 'Heading for the annual deal-activity step.',
      initialValue: "What's your annual deal activity?",
    }),
    defineField({
      name: 'step3Title',
      title: 'Step 3 Title',
      type: 'string',
      description: 'Heading for the hourly-rate step.',
      initialValue: "What is your deal team's average hourly rate?",
    }),
    defineField({
      name: 'step4Title',
      title: 'Step 4 Title',
      type: 'string',
      description: 'Heading for the urgency / timeline step.',
      initialValue: 'How urgent is this for your firm?',
    }),
    defineField({
      name: 'step5Title',
      title: 'Step 5 Title',
      type: 'string',
      description: 'Heading for the contact-info step.',
      initialValue: 'Where should we send the impact report?',
    }),

    // ── Step 1: Firm Types ──
    defineField({
      name: 'firmTypeOptions',
      title: 'Firm Type Options',
      type: 'array',
      description: 'Dropdown options for firm type with benchmark defaults.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'value', title: 'Value', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'label', title: 'Label', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'teamSize', title: 'Default Team Size', type: 'number' }),
            defineField({ name: 'dealsEvaluated', title: 'Default Deals Evaluated', type: 'number' }),
            defineField({ name: 'dealsCompleted', title: 'Default Deals Completed', type: 'number' }),
            defineField({ name: 'avgDealSize', title: 'Default Avg Deal Size ($M)', type: 'number' }),
            defineField({ name: 'avgHourlyRate', title: 'Default Avg Hourly Rate ($)', type: 'number' }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'value' },
          },
        },
      ],
    }),

    // ── Step 4: Urgency ──
    defineField({
      name: 'urgencyMinLabel',
      title: 'Urgency Min Label',
      type: 'string',
      initialValue: 'Not urgent',
    }),
    defineField({
      name: 'urgencyMaxLabel',
      title: 'Urgency Max Label',
      type: 'string',
      initialValue: 'Extremely urgent',
    }),

    // ── Step 4: Timeframes ──
    defineField({
      name: 'timeframeOptions',
      title: 'Timeframe Options',
      type: 'array',
      description: 'Options for the implementation-timeframe selector.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'value', title: 'Value', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'label', title: 'Label', type: 'string', validation: (r) => r.required() }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'value' },
          },
        },
      ],
    }),

    // ── Step 5: Roles ──
    defineField({
      name: 'roleOptions',
      title: 'Role Options',
      type: 'array',
      description: 'Dropdown options for the role selector.',
      of: [{ type: 'string' }],
    }),

    // ── Results Screen ──
    defineField({
      name: 'resultsHeadline',
      title: 'Results Headline',
      type: 'string',
      initialValue: 'Your Brightwave Impact',
    }),
    defineField({
      name: 'resultsSubheadline',
      title: 'Results Subheadline',
      type: 'text',
      rows: 3,
    }),

    // ── Results CTA Buttons ──
    defineField({
      name: 'instantDemoLabel',
      title: 'Instant Demo Button Label',
      type: 'string',
      initialValue: 'Instant Demo',
    }),
    defineField({
      name: 'instantDemoUrl',
      title: 'Instant Demo URL',
      type: 'url',
      description: 'Link for the primary instant-demo button.',
      validation: (r) =>
        r.uri({ scheme: ['http', 'https'], allowRelative: false }),
    }),
    defineField({
      name: 'scheduleDemoLabel',
      title: 'Schedule Demo Button Label',
      type: 'string',
      initialValue: 'Schedule a Demo',
    }),
    defineField({
      name: 'scheduleDemoUrl',
      title: 'Schedule Demo URL',
      type: 'url',
      description: 'Calendly or other scheduling link for the secondary button.',
      validation: (r) =>
        r.uri({ scheme: ['http', 'https'], allowRelative: false }),
    }),

    // ── Submission ──
    defineField({
      name: 'apiEndpoint',
      title: 'API Endpoint',
      type: 'string',
      description: 'Server route that receives form submissions.',
      initialValue: '/api/roi-calculator',
    }),
    defineField({
      name: 'hubspotFormId',
      title: 'HubSpot Form ID',
      type: 'string',
      description: 'Optional HubSpot form GUID for CRM sync.',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Private Markets Wizard Form' }
    },
  },
})
