import { homepage } from './documents/homepage'
import { aboutPage } from './documents/about'
import { pricingPage } from './documents/pricing'
import { author } from './documents/author'
import { category } from './documents/category'
import { caseStudy } from './documents/case-study'
import { caseStudyCategory } from './documents/case-study-category'
import { comparison } from './documents/comparison'
import { comparisonCategory } from './documents/comparison-category'
import { platformFeature } from './documents/platform-feature'
import { useCase } from './documents/use-case'
import { firmType } from './documents/firm-type'
import { icpPage } from './documents/icp'
import { resourceItem } from './documents/resource'
import { virtualEvent } from './documents/event'
import { landingPage } from './documents/landing-page'
import { abmPage } from './documents/abm-page'
import { legalPage } from './documents/legal-page'
import { securityPage } from './documents/security-page'
import { enterpriseSalesPage } from './documents/enterprise-page'
import { siteSettings } from './documents/site-settings'

// New types
import { contentPost } from './documents/content-post'
import { supportPage } from './documents/support-page'
import { contactPage } from './documents/contact-page'

// Agent 2A new page types
import { partnersPage } from './documents/partners-page'
import { privateMarketsPlatformPage } from './documents/private-markets-platform-page'
import { enterpriseSecurityCompliancePage } from './documents/enterprise-security-compliance-page'
import { partnerTermsPage } from './documents/partner-terms-page'
import { referralPage } from './documents/referral-page'
import { thankYouContactPage } from './documents/thank-you-contact-page'
import { engineeringPage } from './documents/engineering-page'
import { engineeringCitationsPage } from './documents/engineering-citations-page'

// Legacy types (kept for migration compatibility)
import { blogPost } from './documents/blog-post'
import { newsPost } from './documents/news'
import { releaseNote } from './documents/release-note'

// Objects
import { seo } from './objects/seo-fields'
import { cta } from './objects/cta-block'
import { stat } from './objects/metric-stat'
import { testimonialRef } from './objects/testimonial'
import { blockContent } from './objects/portable-text'

export const schemaTypes = [
  // Singletons
  homepage,
  aboutPage,
  pricingPage,
  enterpriseSalesPage,
  securityPage,
  supportPage,
  contactPage,
  siteSettings,

  // Agent 2A singletons
  partnersPage,
  privateMarketsPlatformPage,
  enterpriseSecurityCompliancePage,
  partnerTermsPage,
  referralPage,
  thankYouContactPage,
  engineeringPage,
  engineeringCitationsPage,

  // Product
  platformFeature,

  // Solutions
  icpPage,
  firmType,
  useCase,

  // Resources
  contentPost,
  resourceItem,
  comparison,
  comparisonCategory,
  virtualEvent,
  caseStudy,
  caseStudyCategory,
  category,
  author,

  // Campaigns
  landingPage,
  abmPage,

  // Legal
  legalPage,

  // Legacy (kept for migration, hidden in Studio)
  blogPost,
  newsPost,
  releaseNote,

  // Objects
  seo,
  cta,
  stat,
  testimonialRef,
  blockContent,
]
