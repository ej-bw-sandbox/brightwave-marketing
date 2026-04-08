import { defineType, defineField } from 'sanity'

export const partnersPage = defineType({
  name: 'partnersPage',
  title: 'Partners Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Page Title', type: 'string' }),
    defineField({ name: 'description', title: 'Meta Description', type: 'text', rows: 3 }),

    // ── Hero ──
    defineField({ name: 'heroHeading', title: 'Hero Heading', type: 'string' }),
    defineField({ name: 'heroSubtitlePrefix', title: 'Hero Subtitle Prefix', type: 'string', description: 'Text before the bold phrase, e.g. "Earn "' }),
    defineField({ name: 'heroSubtitleBold', title: 'Hero Subtitle Bold Phrase', type: 'string', description: 'Bold text, e.g. "industry-leading rewards"' }),
    defineField({ name: 'heroSubtitleSuffix', title: 'Hero Subtitle Suffix', type: 'string', description: 'Text after the bold phrase' }),
    defineField({ name: 'heroCta', title: 'Hero CTA', type: 'cta' }),

    // ── Partner Info ──
    defineField({ name: 'infoEyebrow', title: 'Info Section Eyebrow', type: 'string' }),
    defineField({ name: 'infoHeading', title: 'Info Section Heading', type: 'text', rows: 3 }),
    defineField({ name: 'infoCardTitle', title: 'Info Card Title', type: 'string', description: 'Use {highlight} to wrap highlighted text, e.g. "Earn up to {$1000} for each meeting you send our way."' }),
    defineField({
      name: 'infoCardBullets',
      title: 'Info Card Bullet Points',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'infoCardCta', title: 'Info Card CTA', type: 'cta' }),

    // ── Proof Points ──
    defineField({ name: 'proofEyebrow', title: 'Proof Points Eyebrow', type: 'string' }),
    defineField({
      name: 'proofPoints',
      title: 'Proof Points',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'stat', title: 'Stat', type: 'string' },
          { name: 'description', title: 'Description', type: 'string' },
        ],
      }],
    }),

    // ── Who Should Become a Partner ──
    defineField({ name: 'partnerListHeading', title: 'Partner List Heading', type: 'string' }),
    defineField({ name: 'partnerListCta', title: 'Partner List CTA', type: 'cta' }),
    defineField({
      name: 'partnerTypes',
      title: 'Partner Types',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of partner type labels (icons are fixed in code)',
    }),

    // ── Why Partner Callout ──
    defineField({ name: 'calloutHeading', title: 'Callout Section Heading', type: 'string' }),
    defineField({
      name: 'calloutParagraphs',
      title: 'Callout Paragraphs',
      type: 'array',
      of: [{ type: 'text' }],
    }),
    defineField({ name: 'calloutCta', title: 'Callout CTA', type: 'cta' }),

    // ── About Brightwave ──
    defineField({ name: 'aboutHeading', title: 'About Section Heading', type: 'string' }),
    defineField({
      name: 'aboutParagraphs',
      title: 'About Paragraphs',
      type: 'array',
      of: [{ type: 'text' }],
    }),

    // ── FAQ ──
    defineField({ name: 'faqHeading', title: 'FAQ Heading', type: 'string' }),
    defineField({
      name: 'faq',
      title: 'FAQ Items',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'question', title: 'Question', type: 'string' },
          { name: 'answer', title: 'Answer', type: 'blockContent' },
        ],
      }],
    }),

    // ── Step CTA Section ──
    defineField({
      name: 'stepCtaHeading',
      title: 'Step CTA Heading',
      type: 'string',
      description: 'Headline for the bottom CTA section (defaults to "Step Into The Future Of Financial Research")',
    }),
    defineField({
      name: 'stepCtaButtonLabel',
      title: 'Step CTA Button Label',
      type: 'string',
      description: 'CTA button text (defaults to "Schedule a Trial")',
    }),
    defineField({
      name: 'stepCtaButtonUrl',
      title: 'Step CTA Button URL',
      type: 'string',
      description: 'CTA button link (defaults to /enterprise)',
    }),

    // ── Contact Form ──
    defineField({
      name: 'contactForm',
      title: 'Contact Form',
      type: 'reference',
      to: [{ type: 'contactForm' }],
      description: 'The contact form to display on this page',
    }),

    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
})
