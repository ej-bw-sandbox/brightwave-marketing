export const downloadsQuery = `
  *[_type == "downloadsPage"][0]{
    headline,
    subheadline,
    description,
    platforms[]{
      _key,
      platform,
      displayName,
      description,
      downloadUrl,
      version,
      fileSize,
      systemRequirements,
      comingSoon
    },
    seo
  }
`
