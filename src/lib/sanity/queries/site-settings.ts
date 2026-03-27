export const siteSettingsQuery = `
  *[_type == "siteSettings" && _id == "siteSettings"][0] {
    footerTagline,
    footerColumns[] {
      _key, title,
      links[] { _key, label, url }
    },
    socialLinks { linkedin, twitter, github, youtube },
    legalLinks[] { _key, label, url },
    copyrightText,
    companyName,
    headerCtas[] { _key, label, url, style, openInNewTab },
  }
`
