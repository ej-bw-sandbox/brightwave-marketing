import { defineType, defineField } from 'sanity'

export const resourceItem = defineType({
  name: 'resourceItem',
  title: 'Resource',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({
      name: 'resourceType',
      title: 'Resource Type',
      type: 'string',
      options: {
        list: [
          { title: 'Whitepaper', value: 'whitepaper' },
          { title: 'Guide', value: 'guide' },
          { title: 'Video', value: 'video' },
          { title: 'Report', value: 'report' },
          { title: 'Template', value: 'template' },
          { title: 'Tool', value: 'tool' },
          { title: 'Webinar Recording', value: 'webinar-recording' },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'description', title: 'Description', type: 'blockContent' }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'string' }),
    defineField({ name: 'thumbnail', title: 'Thumbnail', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'learningPoints', title: 'What You Will Learn', type: 'array', of: [{ type: 'string' }], validation: (r) => r.max(4) }),
    defineField({ name: 'file', title: 'Downloadable File', type: 'file', description: 'PDF, PPTX, etc.' }),
    defineField({ name: 'externalUrl', title: 'External URL', type: 'url', description: 'Link to video or external resource' }),
    defineField({ name: 'isGated', title: 'Gated Resource', type: 'boolean', initialValue: false, description: 'If true, user must fill form before accessing' }),
    defineField({
      name: 'topics',
      title: 'Topics',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Due Diligence', value: 'due-diligence' },
          { title: 'Private Equity', value: 'private-equity' },
          { title: 'Private Credit', value: 'private-credit' },
          { title: 'AI in Finance', value: 'ai-finance' },
          { title: 'Portfolio Management', value: 'portfolio-management' },
        ],
      },
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'resourceType', media: 'thumbnail' },
  },
})
