export const thank_you_contactQuery = `
  *[_type == "thankYouContactPage"][0]{
    title, description, body, seo
  }
`
