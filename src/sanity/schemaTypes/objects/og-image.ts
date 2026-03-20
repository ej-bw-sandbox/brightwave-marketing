import { defineType } from 'sanity'

export const ogImage = defineType({
  name: 'ogImage',
  title: 'OG Image',
  type: 'image',
  options: { hotspot: true },
  fields: [
    { name: 'alt', type: 'string', title: 'Alt Text' },
  ],
})
