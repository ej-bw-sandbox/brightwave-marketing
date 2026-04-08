import { defineType, defineField } from 'sanity'

export const demoPersona = defineType({
  name: 'demoPersona',
  title: 'Demo Persona',
  type: 'document',
  icon: () => '🤖',
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
      name: 'anamPersonaId',
      title: 'Anam Persona ID',
      type: 'string',
      description: 'The Anam.ai persona UUID used for avatar rendering.',
      initialValue: 'c1298d71-48b2-40c9-98d1-e3d7c0bf8030',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'anamAvatarId',
      title: 'Avatar ID',
      type: 'string',
      description: 'Anam.ai avatar UUID. Find this in your Anam.ai dashboard. Default: 8a339c9f-0666-46bd-ab27-e90acd0409dc',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'anamVoiceId',
      title: 'Voice ID',
      type: 'string',
      description: 'Anam.ai voice UUID. Find this in your Anam.ai dashboard. Default: b482f972-1b1b-4337-ae60-940b90b5bb41',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'anamPersonaName',
      title: 'Persona Name',
      type: 'string',
      description: 'The name field in personaConfig shown to the avatar engine. Optional; defaults to "Max".',
    }),
    defineField({
      name: 'llmModel',
      title: 'LLM Model',
      type: 'string',
      description: 'Language model used for the conversation AI.',
      options: {
        list: [
          { title: 'Claude 3.5 Sonnet', value: 'claude-3-5-sonnet-20241022' },
          { title: 'Claude 3 Opus', value: 'claude-3-opus-20240229' },
          { title: 'GPT-4o', value: 'gpt-4o' },
          { title: 'GPT-4o Mini', value: 'gpt-4o-mini' },
        ],
        layout: 'dropdown',
      },
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
