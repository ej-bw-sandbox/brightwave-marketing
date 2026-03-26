export const partner_termsQuery = `
  *[_type == "partnerTermsPage"][0]{
    title, description, body, seo
  }
`
