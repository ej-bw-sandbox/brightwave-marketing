import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'mainNav',
      title: 'Main Navigation',
      type: 'array',
      of: [{
        type: 'object',
        name: 'navItem',
        fields: [
          { name: 'label', title: 'Label', type: 'string' },
          { name: 'url', title: 'URL', type: 'string' },
          {
            name: 'children',
            title: 'Dropdown Items',
            type: 'array',
            of: [{ type: 'object', fields: [
              { name: 'label', title: 'Label', type: 'string' },
              { name: 'url', title: 'URL', type: 'string' },
              { name: 'description', title: 'Description', type: 'string' },
            ] }],
          },
        ],
      }],
    }),
    defineField({ name: 'headerCtas', title: 'Header CTAs', type: 'array', of: [{ type: 'cta' }] }),
    defineField({
      name: 'footerColumns',
      title: 'Footer Link Columns',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Column Title', type: 'string' },
          {
            name: 'links',
            title: 'Links',
            type: 'array',
            of: [{ type: 'object', fields: [
              { name: 'label', title: 'Label', type: 'string' },
              { name: 'url', title: 'URL', type: 'string' },
            ] }],
          },
        ],
      }],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'linkedin', title: 'LinkedIn', type: 'url' },
        { name: 'twitter', title: 'Twitter/X', type: 'url' },
        { name: 'github', title: 'GitHub', type: 'url' },
        { name: 'youtube', title: 'YouTube', type: 'url' },
      ],
    }),
    defineField({ name: 'defaultSeo', title: 'Default SEO', type: 'seo' }),
    defineField({ name: 'companyName', title: 'Company Name', type: 'string', initialValue: 'Brightwave' }),
    defineField({ name: 'footerTagline', title: 'Footer Tagline', type: 'string' }),
    defineField({
      name: 'announcementBar',
      title: 'Announcement Bar',
      type: 'object',
      fields: [
        { name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: false },
        { name: 'text', title: 'Text', type: 'string' },
        { name: 'link', title: 'Link', type: 'url' },
        { name: 'linkText', title: 'Link Text', type: 'string' },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Site Settings' }),
  },
})
