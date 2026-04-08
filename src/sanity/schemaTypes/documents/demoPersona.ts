import { defineType, defineField } from 'sanity'

export const demoPersona = defineType({
  name: 'demoPersona',
  title: 'Demo Persona',
  type: 'document',
  icon: () => '\u{1F916}',
  fields: [
    defineField({
      name: 'personaId',
      title: 'Persona ID',
      type: 'string',
      description:
        'URL-safe identifier used in the /demo/[personaId] route. Must be unique.',
      validation: (r) =>
        r
          .required()
          .regex(
            /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
            'Must be URL-safe: lowercase letters, numbers, and hyphens only.',
          ),
    }),
    defineField({
      name: 'displayName',
      title: 'Display Name',
      type: 'string',
      description: 'Human-readable name shown in the CMS for this persona.',
    }),
    defineField({
      name: 'anamPersonaName',
      title: 'Persona Name',
      type: 'string',
      description: 'Display name passed to the Anam.ai avatar engine (e.g. "Max").',
    }),
    defineField({
      name: 'anamAvatarId',
      title: 'Avatar ID',
      type: 'string',
      description: 'Anam.ai avatar UUID. Default: 8a339c9f-0666-46bd-ab27-e90acd0409dc',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'anamVoiceId',
      title: 'Voice ID',
      type: 'string',
      description: 'Anam.ai voice UUID. Default: b482f972-1b1b-4337-ae60-940b90b5bb41',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'anamLlmId',
      title: 'LLM ID',
      type: 'string',
      description:
        'Paste the LLM UUID from your Anam dashboard (GET /v1/llms to list available IDs). Default: 0934d97d-0c3a-4f33-91b0-5e136a0ef466',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'systemPromptOverride',
      title: 'System Prompt Override',
      type: 'text',
      rows: 10,
      description:
        'Overrides the default system prompt. If blank, the default prompt built from the KB is used.',
    }),
    defineField({
      name: 'knowledgeBaseOverride',
      title: 'Knowledge Base Override',
      type: 'text',
      rows: 10,
      description:
        'Custom KB text injected into the system prompt. If blank, the full brightwave.ts KB is used.',
    }),
    defineField({
      name: 'greeting',
      title: 'Greeting',
      type: 'string',
      description:
        'Opening line the avatar speaks when the session starts. Defaults to a standard greeting if blank.',
    }),
    defineField({
      name: 'calendarLink',
      title: 'Calendar Link',
      type: 'url',
      description:
        'Calendly URL for qualified prospects. Falls back to NEXT_PUBLIC_CALENDLY_WORKSHOP_URL.',
      validation: (r) =>
        r.uri({
          scheme: ['http', 'https'],
          allowRelative: false,
        }),
    }),
    defineField({
      name: 'qualificationThreshold',
      title: 'Qualification Threshold',
      type: 'number',
      description:
        'Minimum qualification score (0-100) to be considered qualified. Defaults to 60.',
      initialValue: 60,
      validation: (r) => r.min(0).max(100).integer(),
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Whether this persona is live and available for demo sessions.',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'displayName',
      subtitle: 'personaId',
      active: 'isActive',
    },
    prepare({ title, subtitle, active }) {
      return {
        title: title || subtitle || 'Untitled persona',
        subtitle: `${subtitle || ''}${active === false ? ' (inactive)' : ''}`,
      }
    },
  },
})
