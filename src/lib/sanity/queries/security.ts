export const securityQuery = `
  *[_type == "securityPage" && pageVariant == "overview"][0]{
    title, description, body, seo
  }
`
