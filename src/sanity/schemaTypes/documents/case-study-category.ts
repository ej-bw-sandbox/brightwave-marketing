import { defineType, defineField } from 'sanity'

export const caseStudyCategory = defineType({
  name: 'caseStudyCategory',
  title: 'Case Study Category',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
  ],
})
