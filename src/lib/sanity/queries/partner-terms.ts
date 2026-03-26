export const partner_termsQuery = `
  *[_type == "partnerTermsPage"][0]{
    title,
    headerLine1,
    headerLine2,
    effectiveDate,
    body,
    seo
  }
`
