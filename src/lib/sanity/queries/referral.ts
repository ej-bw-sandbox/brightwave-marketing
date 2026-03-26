export const referralQuery = `
  *[_type == "referralPage"][0]{
    title, description, body, seo
  }
`
