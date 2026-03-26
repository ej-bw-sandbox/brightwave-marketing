export const private_markets_platformQuery = `
  *[_type == "privateMarketsPlatformPage"][0]{
    title, description, body, seo
  }
`
