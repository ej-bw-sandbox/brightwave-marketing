export const engineering_citationsQuery = `
  *[_type == "engineeringCitationsPage"][0]{
    title, description, body, seo
  }
`
