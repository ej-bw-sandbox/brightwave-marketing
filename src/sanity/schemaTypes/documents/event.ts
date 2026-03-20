import { defineType, defineField } from 'sanity'

export const virtualEvent = defineType({
  name: 'virtualEvent',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Event Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
    defineField({ name: 'thumbnailImage', title: 'Hub Thumbnail', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'headerImage', title: 'Header Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'startDate', title: 'Start Date/Time', type: 'datetime', validation: (r) => r.required() }),
    defineField({ name: 'endDate', title: 'End Date/Time', type: 'datetime' }),
    defineField({ name: 'dateLabel', title: 'Date Display Label', type: 'string', description: 'Override for custom date display' }),
    defineField({ name: 'city', title: 'City', type: 'string' }),
    defineField({ name: 'venue', title: 'Venue', type: 'string' }),
    defineField({ name: 'isVirtual', title: 'Virtual Event?', type: 'boolean', initialValue: false }),
    defineField({ name: 'virtualEventUrl', title: 'Virtual Event URL', type: 'url' }),
    defineField({
      name: 'format',
      title: 'Event Format',
      type: 'string',
      options: {
        list: [
          { title: 'Webinar', value: 'webinar' },
          { title: 'Roundtable', value: 'roundtable' },
          { title: 'Conference', value: 'conference' },
          { title: 'Workshop', value: 'workshop' },
          { title: 'Meetup', value: 'meetup' },
        ],
      },
    }),
    defineField({
      name: 'statusOverride',
      title: 'Status Override',
      type: 'string',
      options: { list: ['upcoming', 'past', 'cancelled'] },
      description: 'Leave empty to auto-compute from dates',
    }),
    defineField({
      name: 'speakers',
      title: 'Speakers',
      type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'name', title: 'Name', type: 'string' },
        { name: 'role', title: 'Role/Title', type: 'string' },
        { name: 'company', title: 'Company', type: 'string' },
        { name: 'image', title: 'Photo', type: 'image', options: { hotspot: true } },
        { name: 'linkedin', title: 'LinkedIn', type: 'url' },
      ] }],
    }),
    defineField({ name: 'hubspotFormId', title: 'HubSpot Form ID', type: 'string', description: 'HubSpot form ID for RSVP' }),
    defineField({ name: 'recordingUrl', title: 'Recording URL', type: 'url', description: 'Add after event concludes' }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  orderings: [
    { title: 'Date (Upcoming First)', name: 'dateAsc', by: [{ field: 'startDate', direction: 'asc' }] },
    { title: 'Date (Most Recent)', name: 'dateDesc', by: [{ field: 'startDate', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'startDate', media: 'thumbnailImage' },
  },
})
