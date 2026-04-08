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
                .title('Enterprise')
                .child(
                  S.document()
                    .schemaType('enterpriseSalesPage')
                    .documentId('enterpriseSalesPage')
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
                .title('Downloads')
                .child(
                  S.document().schemaType('downloadsPage').documentId('downloadsPage')
                ),
              S.listItem()
                .title('Site Settings')
                .child(
                  S.document().schemaType('siteSettings').documentId('siteSettings')
                ),
              S.listItem()
                .title('Partners')
                .child(
                  S.document().schemaType('partnersPage').documentId('partnersPage')
                ),
              S.listItem()
                .title('Private Markets Platform')
                .child(
                  S.document()
                    .schemaType('privateMarketsPlatformPage')
                    .documentId('privateMarketsPlatformPage')
                ),
              S.listItem()
                .title('Enterprise Security & Compliance')
                .child(
                  S.document()
                    .schemaType('enterpriseSecurityCompliancePage')
                    .documentId('enterpriseSecurityCompliancePage')
                ),
              S.listItem()
                .title('Referral')
                .child(
                  S.document().schemaType('referralPage').documentId('referralPage')
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

      // ── Social Proof ──
      S.listItem()
        .title('Social Proof')
        .child(
          S.list()
            .title('Social Proof')
            .items([
              S.documentTypeListItem('testimonial').title('Testimonials'),
            ])
        ),

      S.divider(),

      // ── Demo ──
      S.listItem()
        .title('Demo')
        .child(
          S.list()
            .title('Demo')
            .items([
              S.documentTypeListItem('demoPersona').title('Personas'),
            ])
        ),

      S.divider(),

      // ── Forms ──
      S.listItem()
        .title('Forms')
        .child(
          S.list()
            .title('Forms')
            .items([
              S.listItem()
                .title('Wizard')
                .child(
                  S.list()
                    .title('Wizard')
                    .items([
                      S.listItem()
                        .title('Private Markets')
                        .child(
                          S.document()
                            .schemaType('privateMarketsWizardForm')
                            .documentId('privateMarketsWizardForm')
                        ),
                    ])
                ),
              S.listItem()
                .title('Static')
                .child(
                  S.list()
                    .title('Static')
                    .items([
                      S.listItem()
                        .title('Contact Form')
                        .child(
                          S.document()
                            .schemaType('contactForm')
                            .documentId('contactForm')
                        ),
                      S.listItem()
                        .title('Referral Form')
                        .child(
                          S.document()
                            .schemaType('contactForm')
                            .documentId('referralContactForm')
                        ),
                      S.listItem()
                        .title('Partners Form')
                        .child(
                          S.document()
                            .schemaType('contactForm')
                            .documentId('partnersContactForm')
                        ),
                    ])
                ),
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
              S.listItem()
                .title('Legal Pages')
                .child(
                  S.list()
                    .title('Legal Pages')
                    .items([
                      S.documentTypeListItem('legalPage').title('All Legal Pages'),
                      S.listItem()
                        .title('Partner Terms')
                        .child(
                          S.document()
                            .schemaType('partnerTermsPage')
                            .documentId('partnerTermsPage')
                        ),
                    ])
                ),
              S.listItem()
                .title('Landing Pages')
                .child(
                  S.list()
                    .title('Landing Pages')
                    .items([
                      S.documentTypeListItem('abmPage').title('ABM Pages'),
                    ])
                ),
              S.listItem()
                .title('Thank You')
                .child(
                  S.list()
                    .title('Thank You Pages')
                    .items([
                      S.documentTypeListItem('thankYouPage').title('All Thank You Pages'),
                    ])
                ),
            ])
        ),
    ])
