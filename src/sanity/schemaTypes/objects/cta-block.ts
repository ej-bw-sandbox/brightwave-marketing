import { defineType } from 'sanity'

export const cta = defineType({
  name: 'cta',
  title: 'Call to Action',
  type: 'object',
  fields: [
    { name: 'label', title: 'Button Label', type: 'string', validation: (r) => r.required() },
    { name: 'url', title: 'URL', type: 'url', validation: (r) => r.required().uri({ allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel'] }) },
    {
      name: 'style',
      title: 'Style',
      type: 'string',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Ghost', value: 'ghost' },
        ],
      },
      initialValue: 'primary',
    },
    { name: 'openInNewTab', title: 'Open in New Tab', type: 'boolean', initialValue: false },
  ],
  preview: {
    select: { title: 'label', subtitle: 'url' },
  },
})
