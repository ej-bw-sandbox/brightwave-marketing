export const securityQuery = `
  *[_id == "securityPageOverview"][0]{
    title, description, body, seo
  }
`
