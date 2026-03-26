export const partnersQuery = `
  *[_type == "partnersPage"][0]{
    title, description, body, seo
  }
`
