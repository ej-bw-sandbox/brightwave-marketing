import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { presentationTool } from 'sanity/presentation'
import { schemaTypes } from './schemaTypes'

const singletonTypes = new Set([
  'homepage',
  'aboutPage',
  'pricingPage',
  'enterpriseSalesPage',
  'siteSettings',
])

const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

export default defineConfig({
  name: 'brightwave',
  title: 'Brightwave CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Marketing Pages
            S.listItem()
              .title('Marketing Pages')
              .child(
                S.list()
                  .title('Marketing Pages')
                  .items([
                    S.listItem().title('Homepage').child(S.document().schemaType('homepage').documentId('homepage')),
                    S.listItem().title('About').child(S.document().schemaType('aboutPage').documentId('aboutPage')),
                    S.listItem().title('Pricing').child(S.document().schemaType('pricingPage').documentId('pricingPage')),
                    S.listItem().title('Enterprise').child(S.document().schemaType('enterpriseSalesPage').documentId('enterpriseSalesPage')),
                    S.documentTypeListItem('securityPage').title('Security Pages'),
                    S.documentTypeListItem('productPage').title('Product Pages'),
                  ])
              ),
            S.divider(),
            // Blog & News
            S.listItem()
              .title('Blog & News')
              .child(
                S.list()
                  .title('Blog & News')
                  .items([
                    S.documentTypeListItem('blogPost').title('Blog Posts'),
                    S.documentTypeListItem('newsPost').title('News Posts'),
                    S.documentTypeListItem('author').title('Authors'),
                    S.documentTypeListItem('category').title('Categories'),
                  ])
              ),
            S.divider(),
            // Content Pages
            S.listItem()
              .title('Content Pages')
              .child(
                S.list()
                  .title('Content Pages')
                  .items([
                    S.documentTypeListItem('caseStudy').title('Case Studies'),
                    S.documentTypeListItem('caseStudyCategory').title('Case Study Categories'),
                    S.documentTypeListItem('comparison').title('Comparisons'),
                    S.documentTypeListItem('comparisonCategory').title('Comparison Categories'),
                    S.documentTypeListItem('platformFeature').title('Platform Features'),
                    S.documentTypeListItem('useCase').title('Use Cases'),
                    S.documentTypeListItem('firmType').title('Solutions / Firm Types'),
                    S.documentTypeListItem('icpPage').title('ICP / Persona Pages'),
                    S.documentTypeListItem('releaseNote').title('Release Notes'),
                    S.documentTypeListItem('resourceItem').title('Resources'),
                    S.documentTypeListItem('virtualEvent').title('Events'),
                  ])
              ),
            S.divider(),
            // Campaign Pages
            S.listItem()
              .title('Campaign Pages')
              .child(
                S.list()
                  .title('Campaign Pages')
                  .items([
                    S.documentTypeListItem('landingPage').title('Landing Pages'),
                    S.documentTypeListItem('abmPage').title('ABM Pages'),
                  ])
              ),
            S.divider(),
            // Legal & Settings
            S.documentTypeListItem('legalPage').title('Legal Pages'),
            S.listItem().title('Site Settings').child(S.document().schemaType('siteSettings').documentId('siteSettings')),
          ]),
    }),
    presentationTool({
      previewUrl: {
        draftMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
    visionTool({ defaultApiVersion: '2024-01-01' }),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
})
