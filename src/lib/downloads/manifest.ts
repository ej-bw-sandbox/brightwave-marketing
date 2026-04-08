const MANIFEST_URL = 'https://downloads.brightwave.io/manifest.json'
const BASE_URL = 'https://downloads.brightwave.io/'

export interface ManifestArtifact {
  platform: 'mac' | 'win' | 'linux'
  arch: string
  format: string
  filename: string
  size: number
  label: string
}

export interface DownloadManifest {
  version: string
  sha: string
  uploaded_at: string
  artifacts: ManifestArtifact[]
}

export function getDownloadUrl(filename: string): string {
  return `${BASE_URL}${filename}`
}

export function formatBytes(bytes: number): string {
  if (bytes >= 1_073_741_824) return `${(bytes / 1_073_741_824).toFixed(1)} GB`
  if (bytes >= 1_048_576) return `${(bytes / 1_048_576).toFixed(0)} MB`
  return `${(bytes / 1024).toFixed(0)} KB`
}

export async function fetchManifest(): Promise<DownloadManifest | null> {
  try {
    const res = await fetch(MANIFEST_URL, { next: { revalidate: 60 } })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}
