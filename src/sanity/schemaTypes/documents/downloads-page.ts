import { defineType, defineField } from 'sanity'

export const downloadsPage = defineType({
  name: 'downloadsPage',
  title: 'Downloads Page',
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'platforms',
      title: 'Download Platforms',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'downloadPlatform',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Windows', value: 'windows' },
                  { title: 'Linux', value: 'linux' },
                  { title: 'macOS (Intel)', value: 'macos-intel' },
                  { title: 'macOS (Apple Silicon)', value: 'macos-silicon' },
                  { title: 'iOS', value: 'ios' },
                  { title: 'Android', value: 'android' },
                ],
              },
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'displayName',
              title: 'Display Name',
              type: 'string',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            }),
            defineField({
              name: 'downloadUrl',
              title: 'Download URL',
              type: 'url',
              description: 'Leave empty for coming-soon platforms',
              validation: (r) => r.uri({ scheme: ['https', 'http'] }),
            }),
            defineField({
              name: 'version',
              title: 'Version',
              type: 'string',
            }),
            defineField({
              name: 'fileSize',
              title: 'File Size',
              type: 'string',
            }),
            defineField({
              name: 'systemRequirements',
              title: 'System Requirements',
              type: 'text',
              rows: 2,
            }),
            defineField({
              name: 'comingSoon',
              title: 'Coming Soon',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: { title: 'displayName', subtitle: 'platform' },
          },
        },
      ],
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  preview: {
    prepare: () => ({ title: 'Downloads Page' }),
  },
})
