import { defineType } from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    {
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      validation: (r) => r.max(60).warning('Keep under 60 characters for SERP display'),
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      validation: (r) => r.max(160).warning('Keep under 160 characters'),
    },
    {
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: '1200x630px recommended. Falls back to auto-generated OG image if empty.',
      options: { hotspot: true },
    },
    {
      name: 'noIndex',
      title: 'No Index',
      type: 'boolean',
      initialValue: false,
      description: 'Prevent search engines from indexing this page',
    },
  ],
})
