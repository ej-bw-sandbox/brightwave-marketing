import { defineType, defineField } from 'sanity'

export const partnerTermsPage = defineType({
  name: 'partnerTermsPage',
  title: 'Partner Terms Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'Internal title for the Studio listing',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'headerLine1',
      title: 'Header Line 1',
      type: 'string',
      description: 'First header line, e.g. "PARTNER PROGRAM"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'headerLine2',
      title: 'Header Line 2',
      type: 'string',
      description: 'Second header line, e.g. "Terms of use"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'effectiveDate',
      title: 'Effective Date Label',
      type: 'string',
      description: 'Date shown in the header, e.g. "February 2026"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      description: 'Full legal body content rendered as Portable Text',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'effectiveDate' },
  },
})
