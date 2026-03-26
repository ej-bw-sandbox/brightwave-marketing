import { defineType, defineField } from 'sanity'

export const referralPage = defineType({
  name: 'referralPage',
  title: 'Referral  Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Page Title', type: 'string' }),
    defineField({ name: 'description', title: 'Meta Description', type: 'text', rows: 3 }),
    defineField({ name: 'body', title: 'Page Body (HTML)', type: 'text', description: 'Full HTML body content for the page' }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
})
