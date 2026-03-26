import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // ── Singletons ──
      S.listItem()
        .title('Singletons')
        .child(
          S.list()
            .title('Singletons')
            .items([
              S.listItem()
                .title('Homepage')
                .child(S.document().schemaType('homepage').documentId('homepage')),
              S.listItem()
                .title('About')
                .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
              S.listItem()
                .title('Pricing')
                .child(S.document().schemaType('pricingPage').documentId('pricingPage')),
              S.listItem()
                .title('Enterprise')
                .child(
                  S.document()
                    .schemaType('enterpriseSalesPage')
                    .documentId('enterpriseSalesPage')
                ),
              S.listItem()
                .title('Security')
                .child(
                  S.document().schemaType('securityPage').documentId('securityPage')
                ),
              S.listItem()
                .title('Support')
                .child(
                  S.document().schemaType('supportPage').documentId('supportPage')
                ),
              S.listItem()
                .title('Contact')
                .child(
                  S.document().schemaType('contactPage').documentId('contactPage')
                ),
              S.listItem()
                .title('Site Settings')
                .child(
                  S.document().schemaType('siteSettings').documentId('siteSettings')
                ),
            ])
        ),

      S.divider(),

      // ── Product ──
      S.listItem()
        .title('Product')
        .child(
          S.list()
            .title('Product')
            .items([
              S.documentTypeListItem('platformFeature').title('Features'),
            ])
        ),

      S.divider(),

      // ── Solutions ──
      S.listItem()
        .title('Solutions')
        .child(
          S.list()
            .title('Solutions')
            .items([
              S.documentTypeListItem('icpPage').title('Roles'),
              S.documentTypeListItem('firmType').title('Industries'),
              S.documentTypeListItem('useCase').title('Use Cases'),
            ])
        ),

      S.divider(),

      // ── Resources ──
      S.listItem()
        .title('Resources')
        .child(
          S.list()
            .title('Resources')
            .items([
              // Content — all posts
              S.listItem()
                .title('Content')
                .child(
                  S.list()
                    .title('Content')
                    .items([
                      S.listItem()
                        .title('All Posts')
                        .child(
                          S.documentTypeList('contentPost')
                            .title('All Posts')
                            .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                        ),
                      S.listItem()
                        .title('Blog')
                        .child(
                          S.documentList()
                            .title('Blog Posts')
                            .filter('_type == "contentPost" && category == "blog"')
                            .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                        ),
                      S.listItem()
                        .title('News')
                        .child(
                          S.documentList()
                            .title('News Posts')
                            .filter('_type == "contentPost" && category == "news"')
                            .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                        ),
                      S.listItem()
                        .title('Engineering Log')
                        .child(
                          S.documentList()
                            .title('Engineering Log')
                            .filter(
                              '_type == "contentPost" && category == "engineering-log"'
                            )
                            .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                        ),
                      S.listItem()
                        .title('Release Notes')
                        .child(
                          S.documentList()
                            .title('Release Notes')
                            .filter(
                              '_type == "contentPost" && category == "release-notes"'
                            )
                            .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                        ),
                    ])
                ),
              S.documentTypeListItem('resourceItem').title('Tools & Guides'),
              S.documentTypeListItem('comparison').title('Comparisons'),
              S.documentTypeListItem('caseStudy').title('Case Studies'),
              S.documentTypeListItem('virtualEvent').title('Virtual Events'),
            ])
        ),

      S.divider(),

      // ── System ──
      S.listItem()
        .title('System')
        .child(
          S.list()
            .title('System')
            .items([
              S.documentTypeListItem('author').title('Authors'),
              S.documentTypeListItem('category').title('Categories'),
              S.documentTypeListItem('comparisonCategory').title('Comparison Categories'),
              S.documentTypeListItem('caseStudyCategory').title('Case Study Categories'),
              S.documentTypeListItem('legalPage').title('Legal Pages'),
              S.documentTypeListItem('landingPage').title('Landing Pages'),
              S.documentTypeListItem('abmPage').title('ABM Pages'),
            ])
        ),
    ])
