import { homepage } from './documents/homepage'
import { aboutPage } from './documents/about'
import { pricingPage } from './documents/pricing'
import { blogPost } from './documents/blog-post'
import { newsPost } from './documents/news'
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
import { releaseNote } from './documents/release-note'
import { resourceItem } from './documents/resource'
import { virtualEvent } from './documents/event'
import { landingPage } from './documents/landing-page'
import { abmPage } from './documents/abm-page'
import { legalPage } from './documents/legal-page'
import { securityPage } from './documents/security-page'
import { productPage } from './documents/product-page'
import { enterpriseSalesPage } from './documents/enterprise-page'
import { siteSettings } from './documents/site-settings'

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
  siteSettings,
  // Security (2 instances)
  securityPage,
  // Product pages (4 instances)
  productPage,
  // Collections
  blogPost,
  newsPost,
  author,
  category,
  caseStudy,
  caseStudyCategory,
  comparison,
  comparisonCategory,
  platformFeature,
  useCase,
  firmType,
  icpPage,
  releaseNote,
  resourceItem,
  virtualEvent,
  landingPage,
  abmPage,
  legalPage,
  // Objects
  seo,
  cta,
  stat,
  testimonialRef,
  blockContent,
]
