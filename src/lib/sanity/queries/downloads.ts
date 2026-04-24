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
      iconKey,
      downloadUrl,
      version,
      fileSize,
      systemRequirements,
      comingSoon
    },
    seo
  }
`

export type DownloadsPagePlatformValue =
  | 'windows'
  | 'linux'
  | 'macos-intel'
  | 'macos-silicon'
  | 'ios'
  | 'android'
  | 'plugins'

export interface DownloadsPagePlatform {
  _key?: string
  platform: DownloadsPagePlatformValue
  displayName: string
  description?: string
  iconKey?: 'excel' | 'word' | 'powerpoint' | 'chrome' | 'safari' | 'firefox' | 'edge' | 'plugin'
  downloadUrl?: string
  version?: string
  fileSize?: string
  systemRequirements?: string
  comingSoon?: boolean
}
