import { defineType, defineField } from 'sanity'

export const platformFeature = defineType({
  name: 'platformFeature',
  title: 'Platform Feature',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'capabilities', title: 'Capabilities' },
    { name: 'howItWorks', title: 'How It Works' },
    { name: 'deepDive', title: 'Deep Dive' },
    { name: 'output', title: 'Output Showcase' },
    { name: 'specs', title: 'Specs & Trust' },
    { name: 'useCases', title: 'Use Cases' },
    { name: 'social', title: 'Social Proof' },
    { name: 'related', title: 'Related' },
    { name: 'cta', title: 'CTA' },
    { name: 'settings', title: 'Settings' },
  ],
  fields: [
    /* ------------------------------------------------------------------ */
    /*  Settings (always visible)                                          */
    /* ------------------------------------------------------------------ */
    defineField({ name: 'title', title: 'Feature Name', type: 'string', validation: (r) => r.required(), group: 'settings' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required(), group: 'settings' }),
    defineField({
      name: 'menuLabel',
      title: 'Menu Label',
      type: 'string',
      description: 'Short 1-2 word label for navigation menus (e.g. "Agentic Workflows", "Reports")',
      group: 'settings',
    }),
    defineField({
      name: 'menuCategory',
      title: 'Menu Category',
      type: 'string',
      description: 'Category grouping for the Platform navigation dropdown',
      group: 'settings',
      options: {
        list: [
          { title: 'Analyze', value: 'Analyze' },
          { title: 'Collaborate', value: 'Collaborate' },
          { title: 'Create', value: 'Create' },
          { title: 'Productivity', value: 'Productivity' },
        ],
      },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'settings',
      options: {
        list: [
          { title: 'Analysis', value: 'analysis' },
          { title: 'Collaboration', value: 'collaboration' },
          { title: 'Reporting', value: 'reporting' },
          { title: 'Data Ingestion', value: 'data-ingestion' },
          { title: 'Security', value: 'security' },
        ],
      },
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo', group: 'settings' }),

    /* ------------------------------------------------------------------ */
    /*  Hero                                                               */
    /* ------------------------------------------------------------------ */
    defineField({ name: 'heroH1', title: 'Hero H1 (subtitle)', type: 'string', group: 'hero' }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string', group: 'hero' }),
    defineField({ name: 'heroBody', title: 'Hero Body', type: 'blockContent', group: 'hero' }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true }, group: 'hero' }),
    defineField({ name: 'heroVideo', title: 'Hero Video', type: 'file', group: 'hero' }),
    defineField({
      name: 'statBadges',
      title: 'Stat Badges',
      description: 'Up to 4 stat badges displayed below the hero',
      type: 'array',
      of: [{ type: 'stat' }],
      group: 'hero',
    }),
    // Legacy field kept for backward compat
    defineField({ name: 'stats', title: 'Statistics (legacy)', type: 'array', of: [{ type: 'stat' }], group: 'hero', hidden: true }),

    /* ------------------------------------------------------------------ */
    /*  Capabilities                                                       */
    /* ------------------------------------------------------------------ */
    defineField({ name: 'capabilitiesH2', title: 'Capabilities Heading', type: 'string', group: 'capabilities' }),
    defineField({ name: 'capabilitiesSubtitle', title: 'Capabilities Subtitle', type: 'string', group: 'capabilities' }),
    defineField({
      name: 'capabilityPillars',
      title: 'Capability Pillars',
      type: 'array',
      group: 'capabilities',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'description', title: 'Description', type: 'text' },
        ],
        preview: { select: { title: 'title' } },
      }],
    }),
    // Legacy field
    defineField({
      name: 'pillars',
      title: 'Feature Pillars (legacy)',
      type: 'array',
      hidden: true,
      group: 'capabilities',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'description', title: 'Description', type: 'text' },
          { name: 'icon', title: 'Icon', type: 'string' },
        ],
      }],
    }),
    defineField({ name: 'overviewSubtitle', title: 'Overview Subtitle (legacy)', type: 'string', group: 'capabilities', hidden: true }),

    /* ------------------------------------------------------------------ */
    /*  How It Works                                                       */
    /* ------------------------------------------------------------------ */
    defineField({ name: 'howItWorksH2', title: 'How It Works Heading', type: 'string', group: 'howItWorks' }),
    defineField({
      name: 'howItWorksSteps',
      title: 'How It Works Steps',
      type: 'array',
      group: 'howItWorks',
      of: [{
        type: 'object',
        fields: [
          { name: 'number', title: 'Step Number', type: 'string', description: 'e.g. "01", "02"' },
          { name: 'label', title: 'Tab Label', type: 'string', description: 'Short label for tab' },
          { name: 'title', title: 'Step Title', type: 'string' },
          { name: 'description', title: 'Description', type: 'text' },
          { name: 'bullets', title: 'Bullets', type: 'blockContent' },
          { name: 'image', title: 'Step Image', type: 'image', options: { hotspot: true } },
        ],
        preview: { select: { title: 'title', subtitle: 'number' } },
      }],
    }),
    // Legacy field
    defineField({
      name: 'steps',
      title: 'How It Works Steps (legacy)',
      type: 'array',
      hidden: true,
      group: 'howItWorks',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'description', title: 'Description', type: 'text' },
          { name: 'image', title: 'Image', type: 'image' },
        ],
      }],
    }),

    /* ------------------------------------------------------------------ */
    /*  Deep Dive                                                          */
    /* ------------------------------------------------------------------ */
    defineField({ name: 'deepDiveH2', title: 'Deep Dive Heading', type: 'string', group: 'deepDive' }),
    defineField({
      name: 'deepDiveRows',
      title: 'Deep Dive Rows',
      description: 'Alternating image-left/text-right and image-right/text-left rows',
      type: 'array',
      group: 'deepDive',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'body', title: 'Body', type: 'blockContent' },
          { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
        ],
        preview: { select: { title: 'title', media: 'image' } },
      }],
    }),

    /* ------------------------------------------------------------------ */
    /*  Output Showcase                                                    */
    /* ------------------------------------------------------------------ */
    defineField({ name: 'outputH2', title: 'Output Heading', type: 'string', group: 'output' }),
    defineField({ name: 'outputSubtitle', title: 'Output Subtitle', type: 'string', group: 'output' }),
    defineField({
      name: 'outputs',
      title: 'Output Tabs',
      type: 'array',
      group: 'output',
      of: [{
        type: 'object',
        fields: [
          { name: 'tabLabel', title: 'Tab Label', type: 'string' },
          { name: 'image', title: 'Preview Image', type: 'image', options: { hotspot: true } },
          { name: 'description', title: 'Description', type: 'text' },
        ],
        preview: { select: { title: 'tabLabel', media: 'image' } },
      }],
    }),

    /* ------------------------------------------------------------------ */
    /*  Technical Specs & Trust                                            */
    /* ------------------------------------------------------------------ */
    defineField({ name: 'techSpecsH2', title: 'Tech Specs Heading', type: 'string', group: 'specs' }),
    defineField({ name: 'technicalCapabilities', title: 'Technical Capabilities', type: 'blockContent', group: 'specs' }),
    defineField({ name: 'securityCompliance', title: 'Security & Compliance', type: 'blockContent', group: 'specs' }),
    // Legacy fields
    defineField({ name: 'techCapabilities', title: 'Tech Capabilities (legacy)', type: 'blockContent', group: 'specs', hidden: true }),
    defineField({ name: 'securityItems', title: 'Security Items (legacy)', type: 'blockContent', group: 'specs', hidden: true }),

    /* ------------------------------------------------------------------ */
    /*  Use Cases                                                          */
    /* ------------------------------------------------------------------ */
    defineField({ name: 'useCasesH2', title: 'Use Cases Heading', type: 'string', group: 'useCases' }),
    defineField({
      name: 'useCaseCards',
      title: 'Use Case Cards',
      type: 'array',
      group: 'useCases',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'description', title: 'Description', type: 'text' },
          { name: 'outcome', title: 'Key Outcome Metric', type: 'string', description: 'e.g. "3x faster analysis"' },
          { name: 'linkUrl', title: 'Explore Link URL', type: 'string' },
        ],
        preview: { select: { title: 'title', subtitle: 'outcome' } },
      }],
    }),
    defineField({ name: 'relatedUseCases', title: 'Related Use Cases (legacy)', type: 'array', of: [{ type: 'reference', to: [{ type: 'useCase' }] }], group: 'useCases', hidden: true }),

    /* ------------------------------------------------------------------ */
    /*  Social Proof                                                       */
    /* ------------------------------------------------------------------ */
    defineField({ name: 'testimonialQuote', title: 'Testimonial Quote', type: 'text', group: 'social' }),
    defineField({ name: 'testimonialAttribution', title: 'Testimonial Attribution', type: 'string', group: 'social' }),
    defineField({ name: 'socialProofLogos', title: 'Social Proof Logos', type: 'array', of: [{ type: 'image' }], group: 'social' }),

    /* ------------------------------------------------------------------ */
    /*  Related Features                                                   */
    /* ------------------------------------------------------------------ */
    defineField({
      name: 'relatedFeatures',
      title: 'Related Features',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'platformFeature' }] }],
      group: 'related',
    }),

    /* ------------------------------------------------------------------ */
    /*  CTA Footer                                                         */
    /* ------------------------------------------------------------------ */
    defineField({ name: 'ctaH2', title: 'CTA Headline', type: 'string', group: 'cta' }),
    defineField({ name: 'ctaBody', title: 'CTA Body', type: 'text', group: 'cta' }),
    defineField({ name: 'ctaButtonLabel', title: 'CTA Button Label', type: 'string', group: 'cta' }),
    // Legacy fields
    defineField({ name: 'ctaHeadline', title: 'CTA Headline (legacy)', type: 'string', group: 'cta', hidden: true }),
    defineField({ name: 'ctaButtons', title: 'CTA Buttons (legacy)', type: 'array', of: [{ type: 'cta' }], group: 'cta', hidden: true }),

    /* ------------------------------------------------------------------ */
    /*  Body (legacy rich text)                                            */
    /* ------------------------------------------------------------------ */
    defineField({ name: 'body', title: 'Body (legacy)', type: 'blockContent', group: 'settings', hidden: true }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'tagline', media: 'heroImage' },
  },
})
