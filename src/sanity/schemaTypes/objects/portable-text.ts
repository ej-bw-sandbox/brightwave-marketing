import { defineType, defineArrayMember } from 'sanity'

export const blockContent = defineType({
  name: 'blockContent',
  title: 'Block Content',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Number', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
          { title: 'Highlight', value: 'highlight' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'External Link',
            fields: [
              { name: 'href', type: 'url', title: 'URL' },
              { name: 'openInNewTab', type: 'boolean', title: 'Open in new tab', initialValue: true },
            ],
          },
          {
            name: 'internalLink',
            type: 'object',
            title: 'Internal Link',
            fields: [
              {
                name: 'reference',
                type: 'reference',
                title: 'Reference',
                to: [
                  { type: 'blogPost' },
                  { type: 'caseStudy' },
                  { type: 'useCase' },
                  { type: 'platformFeature' },
                  { type: 'firmType' },
                  { type: 'icpPage' },
                  { type: 'comparison' },
                  { type: 'resourceItem' },
                  { type: 'virtualEvent' },
                  { type: 'newsPost' },
                ],
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alt Text' },
        { name: 'caption', type: 'string', title: 'Caption' },
      ],
    }),
    defineArrayMember({
      type: 'object',
      name: 'callout',
      title: 'Callout',
      fields: [
        { name: 'tone', type: 'string', title: 'Tone', options: { list: ['info', 'warning', 'tip'] }, initialValue: 'info' },
        { name: 'body', type: 'text', title: 'Body' },
      ],
      preview: {
        select: { title: 'body', subtitle: 'tone' },
      },
    }),
    defineArrayMember({
      type: 'object',
      name: 'codeBlock',
      title: 'Code Block',
      fields: [
        { name: 'language', type: 'string', title: 'Language' },
        { name: 'code', type: 'text', title: 'Code' },
      ],
      preview: {
        select: { title: 'language' },
        prepare: ({ title }) => ({ title: `Code: ${title || 'unknown'}` }),
      },
    }),
    defineArrayMember({
      type: 'object',
      name: 'ctaBlock',
      title: 'CTA Block',
      fields: [
        { name: 'label', type: 'string', title: 'Label' },
        { name: 'url', type: 'url', title: 'URL' },
        { name: 'style', type: 'string', title: 'Style', options: { list: ['primary', 'secondary', 'ghost'] } },
      ],
    }),
  ],
})
