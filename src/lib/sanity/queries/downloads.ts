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
    plugins[]{
      _key,
      name,
      description,
      iconKey,
      downloadUrl,
      meta,
      comingSoon
    },
    seo
  }
`

export interface DownloadsPagePlugin {
  _key?: string
  name: string
  description?: string
  iconKey?: 'excel' | 'word' | 'powerpoint' | 'chrome' | 'safari' | 'firefox' | 'edge' | 'plugin'
  downloadUrl?: string
  meta?: string
  comingSoon?: boolean
}
