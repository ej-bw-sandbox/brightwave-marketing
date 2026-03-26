export const enterprise_security_complianceQuery = `
  *[_type == "enterpriseSecurityCompliancePage"][0]{
    title, description, body, seo
  }
`
