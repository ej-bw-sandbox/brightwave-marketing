import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { structure } from './structure'

const singletonTypes = new Set([
  'homepage',
  'aboutPage',
  'pricingPage',
  'enterpriseSalesPage',
  'securityPage',
  'supportPage',
  'contactPage',
  'siteSettings',
])

const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

// Hide legacy types from "Create new" menu
const hiddenTypes = new Set(['blogPost', 'newsPost', 'releaseNote'])

export default defineConfig({
  name: 'brightwave',
  title: 'Brightwave CMS',
  projectId: 'v4tc8ohn',
  dataset: 'production',
  basePath: '/studio',
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: '2024-01-01' }),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(
        ({ schemaType }) =>
          !singletonTypes.has(schemaType) && !hiddenTypes.has(schemaType)
      ),
  },
  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
})
