export const enterprise_security_complianceQuery = `
  *[_type == "enterpriseSecurityCompliancePage"][0]{
    title,
    description,
    heroHeadline,
    heroSubtext,
    heroPrimaryCta{ label, url, style, openInNewTab },
    heroSecondaryCta{ label, url, style, openInNewTab },
    heroUsps[]{ _key, title, description },
    pillarsEyebrow,
    pillars[]{ _key, title, description, "imageUrl": image.asset->url, imageAlt },
    faqHeading,
    faqs[]{ _key, question, answer },
    seo
  }
`
