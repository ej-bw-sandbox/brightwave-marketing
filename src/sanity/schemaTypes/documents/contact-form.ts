import { defineType, defineField } from 'sanity'

export const contactForm = defineType({
  name: 'contactForm',
  title: 'Contact Form',
  type: 'document',
  fields: [
    defineField({
      name: 'formTitle',
      title: 'Form Title',
      type: 'string',
      description: 'Heading displayed above the form.',
      initialValue: 'Tell us a bit about yourself',
    }),
    defineField({
      name: 'formSubtitle',
      title: 'Form Subtitle',
      type: 'text',
      rows: 2,
      description: 'Optional supporting copy below the title.',
    }),
    defineField({
      name: 'formVariant',
      title: 'Form Variant',
      type: 'string',
      description: 'Differentiates Contact, Referral and Partners forms.',
      options: {
        list: [
          { title: 'Contact', value: 'contact' },
          { title: 'Referral', value: 'referral' },
          { title: 'Partners', value: 'partners' },
        ],
        layout: 'dropdown',
      },
      validation: (r) => r.required(),
    }),

    // ── Fields ──
    defineField({
      name: 'fields',
      title: 'Form Fields',
      type: 'array',
      description: 'Ordered list of fields rendered in the form.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'fieldName',
              title: 'Field Name',
              type: 'string',
              description: 'HTML name attribute (e.g. "firstName").',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'fieldLabel',
              title: 'Field Label',
              type: 'string',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'fieldPlaceholder',
              title: 'Placeholder',
              type: 'string',
            }),
            defineField({
              name: 'fieldType',
              title: 'Field Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Text', value: 'text' },
                  { title: 'Email', value: 'email' },
                  { title: 'Phone', value: 'tel' },
                  { title: 'Textarea', value: 'textarea' },
                  { title: 'Select', value: 'select' },
                ],
                layout: 'dropdown',
              },
              initialValue: 'text',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'isRequired',
              title: 'Required',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'options',
              title: 'Select Options',
              type: 'array',
              description: 'Only used when Field Type is "select".',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({ name: 'value', title: 'Value', type: 'string', validation: (r) => r.required() }),
                    defineField({ name: 'label', title: 'Label', type: 'string', validation: (r) => r.required() }),
                  ],
                  preview: {
                    select: { title: 'label', subtitle: 'value' },
                  },
                },
              ],
              hidden: ({ parent }) => parent?.fieldType !== 'select',
            }),
          ],
          preview: {
            select: { title: 'fieldLabel', subtitle: 'fieldName' },
          },
        },
      ],
    }),

    // ── Variant-specific fields ──
    defineField({
      name: 'referralCodeField',
      title: 'Referral Code Field',
      type: 'object',
      description: 'Optional referral code field configuration (referral variant only).',
      fields: [
        defineField({ name: 'fieldLabel', title: 'Label', type: 'string', initialValue: 'Referral Code' }),
        defineField({ name: 'fieldPlaceholder', title: 'Placeholder', type: 'string', initialValue: 'Enter your referral code' }),
        defineField({ name: 'isRequired', title: 'Required', type: 'boolean', initialValue: false }),
      ],
      hidden: ({ document }) => document?.formVariant !== 'referral',
    }),
    defineField({
      name: 'partnerTypeField',
      title: 'Partner Type Field',
      type: 'object',
      description: 'Optional partner type selector configuration (partners variant only).',
      fields: [
        defineField({ name: 'fieldLabel', title: 'Label', type: 'string', initialValue: 'Partner Type' }),
        defineField({
          name: 'options',
          title: 'Options',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'value', title: 'Value', type: 'string', validation: (r) => r.required() }),
                defineField({ name: 'label', title: 'Label', type: 'string', validation: (r) => r.required() }),
              ],
              preview: {
                select: { title: 'label', subtitle: 'value' },
              },
            },
          ],
        }),
        defineField({ name: 'isRequired', title: 'Required', type: 'boolean', initialValue: true }),
      ],
      hidden: ({ document }) => document?.formVariant !== 'partners',
    }),

    // ── Submission ──
    defineField({
      name: 'submitButtonText',
      title: 'Submit Button Text',
      type: 'string',
      initialValue: 'Submit',
    }),
    defineField({
      name: 'successMessage',
      title: 'Success Message',
      type: 'text',
      rows: 2,
      initialValue: 'We received your message and will be in touch shortly.',
    }),
    defineField({
      name: 'errorMessage',
      title: 'Error Message',
      type: 'text',
      rows: 2,
      initialValue: 'Something went wrong. Please try again.',
    }),
    defineField({
      name: 'apiEndpoint',
      title: 'API Endpoint',
      type: 'string',
      description: 'Server route that receives form submissions.',
      initialValue: '/api/contact',
    }),

    // ── Notification ──
    defineField({
      name: 'notificationEmail',
      title: 'Notification Email',
      type: 'string',
      description: 'Optional email address where form submissions are sent.',
      validation: (r) =>
        r.regex(
          /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
          'Must be a valid email address.',
        ).warning(),
    }),
  ],
  preview: {
    select: { variant: 'formVariant', title: 'formTitle' },
    prepare({ variant, title }) {
      return {
        title: title || 'Contact Form',
        subtitle: variant ? `Variant: ${variant}` : '',
      }
    },
  },
})
