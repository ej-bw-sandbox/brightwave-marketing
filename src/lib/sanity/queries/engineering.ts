export const engineeringQuery = `
  *[_type == "engineeringPage"][0]{
    title, description, body, seo
  }
`
