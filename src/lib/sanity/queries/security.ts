export const securityQuery = `
  *[_type == "securityPage" && pageVariant == "overview"][0]{
    title, headline, subheadline, dateLabel, introText,
    heroCta{ label, url, style, openInNewTab },
    pillars[]{ _key, title, description, icon },
    faqHeading,
    faq[]{ _key, question, answer },
    privacyHeading,
    privacyBody,
    bottomCta{ heading, cta{ label, url, style, openInNewTab } },
    seo
  }
`
