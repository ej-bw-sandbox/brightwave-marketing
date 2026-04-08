'use client'

import { useEffect, useState } from 'react'
import type { DownloadManifest, ManifestArtifact } from '@/lib/downloads/manifest'
import { getDownloadUrl, formatBytes } from '@/lib/downloads/manifest'

/* ── OS Detection ── */

type DetectedOS = 'windows' | 'linux' | 'macos-intel' | 'macos-silicon' | 'ios' | 'android' | null

function detectOS(): DetectedOS {
  const ua = navigator.userAgent
  if (/iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)) return 'ios'
  if (/Android/.test(ua)) return 'android'
  if (/Macintosh/.test(ua)) {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl')
      if (gl) {
        const dbg = gl.getExtension('WEBGL_debug_renderer_info')
        if (dbg) {
          const renderer = gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL)
          if (/Apple M|Apple GPU/.test(renderer)) return 'macos-silicon'
        }
      }
    } catch {}
    return 'macos-intel'
  }
  if (/Windows/.test(ua)) return 'windows'
  if (/Linux/.test(ua)) return 'linux'
  return null
}

/* ── Colors ── */
const c = {
  text: '#ffffff',
  textMuted: '#a5a6a8',
  textSubtle: '#5a5b5c',
  surface: '#282829',
  border: 'rgba(255,255,255,0.08)',
  yellow: '#e7e70d',
  bg: '#0f0f0f',
}

/* ── Platform Icons ── */

function WindowsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 88 88" fill="currentColor">
      <path d="M0 12.402l35.687-4.86v35.342H0V12.402zM39.635 6.467L87.794 0v42.884H39.635V6.467zM0 46.852h35.687v35.334L0 77.299V46.852zM39.635 46.852H87.794v42.884L39.635 83.218V46.852z" />
    </svg>
  )
}

function LinuxIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 448 512" fill="currentColor">
      <path d="M220.8 123.3c1 .5 1.8 1.7 3 1.7 1.1 0 2.8-.4 2.9-1.5.2-1.4-1.9-2.3-3.2-2.9-1.7-.7-3.9-1-5.5-.1-.4.2-.8.7-.6 1.1.3 1.3 2.3 1.1 3.4 1.7zm-21.9 1.7c1.2 0 2-1.2 3-1.7 1.1-.6 3.1-.4 3.5-1.6.2-.4-.2-.9-.6-1.1-1.6-.9-3.8-.6-5.5.1-1.3.6-3.4 1.5-3.2 2.9.1 1 1.8 1.5 2.8 1.4zM420 403.8c-3.6-4-5.3-11.6-7.2-19.7-1.8-8.1-3.9-16.8-10.5-22.4-1.3-1.1-2.6-2.1-4-2.9-1.3-.8-2.7-1.5-4.1-2 9.2-27.3 5.6-54.5-3.7-79.1-11.4-30.1-31.3-56.4-46.5-74.4-17.1-21.5-33.7-41.9-33.4-72C311.1 85.4 315.7.1 234.8 0 132.4-.2 158 103.4 156.9 135.2c-1.7 23.4-6.4 41.8-22.5 64.7-18.9 22.5-45.5 58.8-58.1 96.7-6 17.9-8.8 36.1-6.2 53.3-6.5 5.8-11.4 14.7-16.6 20.2-4.2 4.3-10.3 5.9-17 8.3s-14 6-18.5 14.5c-2.1 3.9-2.8 8.1-2.8 12.4 0 3.9.6 7.9 1.2 11.8 1.2 8.1 2.5 15.7.8 20.8-5.2 14.4-5.9 24.4-2.2 31.7 3.8 7.3 11.4 10.5 20.1 12.3 17.3 3.6 40.8 2.7 59.3 12.5 19.8 10.4 39.9 14.1 55.9 10.4 11.6-2.6 21.1-9.6 25.9-20.2 12.5-.1 26.3-5.4 48.3-6.6 14.9-1.2 33.6 5.3 55.1 4.1.6 2.3 1.4 4.6 2.5 6.7v.1c8.3 16.7 23.8 24.3 40.3 23 16.6-1.3 34.1-11 48.3-27.9 13.6-16.4 36-23.2 50.9-32.2 7.4-4.5 13.4-10.1 13.9-18.3.4-8.2-4.4-17.3-15.5-29.7zM223.7 87.3c9.8-22.2 34.2-21.8 44-.4 6.5 14.2 3.6 30.9-4.3 40.4-1.6-.8-5.9-2.6-12.6-4.9 1.1-1.2 3.1-2.7 3.9-4.6 4.8-11.8-.2-27-9.1-27.3-7.3-.5-13.9 10.8-11.8 23-4.1-2-9.4-3.5-13-4.4-1-6.9-.3-14.6 2.9-21.8zM183 75.8c10.1 0 20.8 14.2 19.1 33.5-3.5 1-7.1 2.5-10.2 4.6 1.2-8.9-3.3-20.1-9.6-19.6-8.4.7-9.8 21.2-1.8 28.1 1 .8 1.9-.2-5.9 5.5-15.6-14.6-10.5-52.1 8.4-52.1zm-13.6 60.7c6.2-4.6 13.6-10 14.1-10.5 4.7-4.4 13.5-14.2 27.9-14.2 7.1 0 15.6 2.3 25.9 8.9 6.3 4.1 11.3 4.4 22.6 9.3 8.4 3.5 13.7 9.7 10.5 18.2-2.6 7.1-11 14.4-22.7 18.1-11.1 3.6-19.8 16-38.2 14.9-3.9-.2-7-1-9.6-2.1-8-3.5-12.2-10.4-20-15-8.6-4.8-13.2-10.4-14.7-15.3-1.4-4.9 0-9 4.2-12.3zm3.3 334c-2.7 35.1-43.9 34.4-75.3 18-29.9-15.8-68.6-6.5-76.5-21.9-2.4-4.7-2.4-12.7 2.6-26.4v-.2c2.4-7.6.6-16-.6-23.9-1.2-7.8-1.8-15 .9-20 3.5-6.7 8.5-9.1 14.8-11.3 10.3-3.7 11.8-3.4 19.6-9.9 5.5-5.7 9.5-12.9 14.3-18 5.1-5.5 10-8.1 17.7-6.9 8.1 1.2 15.1 6.8 21.9 16l19.6 35.6c9.5 19.9 43.1 48.4 41 68.9zm-1.4-25.9c-4.1-6.6-9.6-13.6-14.4-19.6 7.1 0 14.2-2.2 16.7-8.9 2.3-6.2 0-14.9-7.4-24.9-13.5-18.2-38.3-32.5-38.3-32.5-13.5-8.4-21.1-18.7-24.6-29.9s-3-23.3-.3-35.2c5.2-22.9 18.6-45.2 27.2-59.2 2.3-1.7.8 3.2-8.7 20.8-8.5 16.1-24.4 53.3-2.6 82.4.6-20.7 5.5-41.8 13.8-61.5 12-27.4 37.3-74.9 39.3-112.7 1.1.8 4.6 3.2 6.2 4.1 4.6 2.7 8.1 6.7 12.6 10.3 12.4 10 28.5 9.2 42.4 1.2 6.2-3.5 11.2-7.5 15.9-9 9.9-3.1 17.8-8.6 22.3-15 7.7 30.4 25.7 74.3 37.2 95.7 6.1 11.4 18.3 35.5 23.6 64.6 3.3-.1 7 .4 10.9 1.4 13.8-35.7-11.7-74.2-23.3-84.9-4.7-4.6-4.9-6.6-2.6-6.5 12.6 11.2 29.2 33.7 35.2 59 2.8 11.6 3.3 23.7.4 35.7 16.4 6.8 35.9 17.9 30.7 34.8-2.2-.1-3.2 0-4.2 0 3.2-10.1-3.9-17.6-22.8-26.1-19.6-8.6-36-8.6-38.3 12.5-12.1 4.2-18.3 14.7-21.4 27.3-2.8 11.2-3.6 24.7-4.4 39.9-.5 7.7-3.6 18-6.8 29-32.1 22.9-76.7 32.9-114.3 7.2zm257.4-11.5c-.9 16.8-41.2 19.9-63.2 46.5-13.2 15.7-29.4 24.4-43.6 25.5s-26.5-4.8-33.7-19.3c-4.7-11.1-2.4-23.1 1.1-36.3 3.7-14.2 9.2-28.8 9.9-40.6.8-15.2 1.7-28.5 4.2-38.7 2.6-10.3 6.6-17.2 13.7-21.1.3-.2.7-.3 1-.5.8 13.2 7.3 26.6 18.8 29.5 12.6 3.3 30.7-7.5 38.4-16.3 9-.3 15.7-.9 22.6 5.1 9.9 8.5 7.1 30.3 17.1 41.6 10.6 11.6 14 19.5 13.7 24.6zM173.3 148.7c2 1.9 4.7 4.5 8 7.1 6.6 5.2 15.8 10.6 27.3 10.6 11.6 0 22.5-5.9 31.8-10.8 4.9-2.6 10.9-7 14.8-10.4s5.9-6.3 3.1-6.6-2.6 2.6-6 5.1c-4.4 3.2-9.7 7.4-13.9 9.8-7.4 4.2-19.5 10.2-29.9 10.2s-18.7-4.8-24.9-9.7c-3.1-2.5-5.7-5-7.7-6.9-1.5-1.4-1.9-4.6-4.3-4.9-1.4-.1-1.8 3.7 1.7 6.5z" />
    </svg>
  )
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 384 512" fill="currentColor">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  )
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  )
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
}

/* ── Platform display config ── */

interface PlatformGroup {
  key: string
  label: string
  iconKey: 'apple' | 'windows' | 'linux'
  artifact: ManifestArtifact
}

const iconComponents = {
  apple: AppleIcon,
  windows: WindowsIcon,
  linux: LinuxIcon,
}

/** Map detected OS to a specific artifact */
function findPrimaryArtifact(artifacts: ManifestArtifact[], os: DetectedOS): ManifestArtifact | null {
  switch (os) {
    case 'macos-silicon':
      return artifacts.find((a) => a.platform === 'mac' && a.arch === 'arm64') ?? null
    case 'macos-intel':
      return artifacts.find((a) => a.platform === 'mac' && a.arch === 'x64') ?? null
    case 'windows':
      return artifacts.find((a) => a.platform === 'win') ?? null
    case 'linux':
      return artifacts.find((a) => a.platform === 'linux' && a.arch === 'x64' && a.format === 'AppImage') ?? null
    default:
      return null
  }
}

const platformIconKey: Record<string, 'apple' | 'windows' | 'linux'> = {
  mac: 'apple',
  win: 'windows',
  linux: 'linux',
}

const platformDisplayName: Record<string, string> = {
  mac: 'macOS',
  win: 'Windows',
  linux: 'Linux',
}

/** Build one representative item per platform variant for the "also available" row.
 *  Mac splits by arch (Apple Silicon vs Intel); others pick the first artifact. */
function buildPlatformGroups(artifacts: ManifestArtifact[]): PlatformGroup[] {
  const groups: PlatformGroup[] = []

  // Mac: split by arch since the distinction matters
  for (const arch of ['arm64', 'x64'] as const) {
    const a = artifacts.find((a) => a.platform === 'mac' && a.arch === arch)
    if (a) {
      const suffix = a.label // "Apple Silicon" / "Intel" from manifest
      groups.push({ key: `mac-${arch}`, label: `macOS (${suffix})`, iconKey: 'apple', artifact: a })
    }
  }

  // Other platforms: one representative each (prefer .exe for win, AppImage for linux)
  const preferredFormats: Record<string, string> = { win: 'exe', linux: 'AppImage' }
  for (const platform of ['win', 'linux'] as const) {
    const preferred = artifacts.find((a) => a.platform === platform && a.format === preferredFormats[platform] && a.arch === 'x64')
    const fallback = artifacts.find((a) => a.platform === platform)
    const a = preferred ?? fallback
    if (a) {
      groups.push({
        key: platform,
        label: platformDisplayName[platform] ?? a.label,
        iconKey: platformIconKey[platform] ?? 'linux',
        artifact: a,
      })
    }
  }

  return groups
}

/** Group artifacts by platform for the "view all" table */
const platformOrder: Record<string, number> = { mac: 0, win: 1, linux: 2 }

function groupByPlatform(artifacts: ManifestArtifact[]) {
  const groups: Record<string, ManifestArtifact[]> = {}
  for (const a of artifacts) {
    ;(groups[a.platform] ??= []).push(a)
  }
  return Object.entries(groups)
    .map(([platform, items]) => ({
      platform,
      label: platformDisplayName[platform] ?? platform,
      iconKey: platformIconKey[platform] ?? 'linux' as const,
      order: platformOrder[platform] ?? 99,
      items,
    }))
    .sort((a, b) => a.order - b.order)
}

/* ── Main Section ── */

export function DownloadSection({ manifest }: { manifest: DownloadManifest | null }) {
  const [detectedOS, setDetectedOS] = useState<DetectedOS>(null)
  const [ready, setReady] = useState(false)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    setDetectedOS(detectOS())
    setReady(true)
  }, [])

  if (!manifest || manifest.artifacts.length === 0) {
    return (
      <p className="text-sm" style={{ color: c.textMuted }}>
        Downloads are temporarily unavailable. Please check back shortly.
      </p>
    )
  }

  if (!ready) {
    return (
      <div className="flex flex-col items-center animate-pulse">
        <div className="w-20 h-20 rounded-2xl mb-8" style={{ backgroundColor: c.surface }} />
        <div className="w-72 h-16 rounded-xl" style={{ backgroundColor: c.surface }} />
      </div>
    )
  }

  const { artifacts, version } = manifest
  const groups = buildPlatformGroups(artifacts)
  const primaryArtifact = findPrimaryArtifact(artifacts, detectedOS)

  // Fall back to first group's artifact if OS not detected
  const primary = primaryArtifact ?? groups[0]?.artifact
  const primaryGroup = groups.find((g) => g.artifact === primary)
  const others = groups.filter((g) => g.artifact !== primary)

  const PrimaryIcon = primaryGroup ? iconComponents[primaryGroup.iconKey] : AppleIcon
  const primaryLabel = primaryGroup?.label ?? primary?.label ?? 'your platform'

  return (
    <div className="flex flex-col items-center w-full">

      {/* Mobile / unsupported OS notice */}
      {(detectedOS === 'ios' || detectedOS === 'android') && (
        <div
          className="rounded-2xl px-8 py-6 mb-10 text-center backdrop-blur-sm"
          style={{ backgroundColor: c.surface, border: `1px solid ${c.border}` }}
        >
          <p className="text-base font-semibold" style={{ color: c.text }}>
            Brightwave is available for desktop platforms.
          </p>
          <p className="text-sm mt-1" style={{ color: c.textMuted }}>
            Download for macOS, Windows, or Linux below.
          </p>
        </div>
      )}

      {/* Primary download */}
      {primary && (
        <>
          <div className="w-20 h-20 mb-8" style={{ color: c.text }}>
            <PrimaryIcon className="w-full h-full" />
          </div>
          <a stagger-cta="" href={getDownloadUrl(primary.filename)} className="cta-p-sm w-inline-block">
            <div>
              <div stagger-cta-text="dark" className="c-text-link cc-stagger-cta">
                Download for {primaryLabel}
              </div>
            </div>
            <div className="flip-small">
              <div className="flip-bg"></div>
            </div>
            <div className="flip-big">
              <div className="svg cta-sm-arrow w-embed">
                <svg width={14} height={14} viewBox="0 0 14 14" fill="none">
                  <g clipPath="url(#dl-clip)">
                    <path d="M2.27832 1.625L12.3577 1.44906L12.5325 11.4643" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel" />
                    <path d="M12.3563 1.44945L1.48389 12.6365" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel" />
                  </g>
                  <defs>
                    <clipPath id="dl-clip">
                      <rect width={12} height="11.9237" fill="white" transform="translate(0.896484 1.10547) rotate(-1)" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
          </a>
          <p className="text-xs mt-3" style={{ color: c.textSubtle }}>
            v{version} · {formatBytes(primary.size)} · .{primary.format}
          </p>
        </>
      )}

      {/* Also available for */}
      {others.length > 0 && (
        <div className="mt-10 flex flex-col md:flex-row items-center gap-4 text-sm">
          <span style={{ color: c.textSubtle }}>Also available for</span>
          <div className="flex gap-3">
            {others.map((g) => {
              const Icon = iconComponents[g.iconKey]
              return (
                <a
                  key={g.key}
                  href={getDownloadUrl(g.artifact.filename)}
                  className="flex items-center gap-2.5 px-5 py-3 rounded-xl font-medium text-sm transition-all hover:brightness-125"
                  style={{ backgroundColor: c.surface, color: c.text, border: `1px solid ${c.border}` }}
                >
                  <div className="w-5 h-5" style={{ color: c.text }}>
                    <Icon className="w-full h-full" />
                  </div>
                  {g.label}
                </a>
              )
            })}
          </div>
        </div>
      )}

      {/* View all platforms */}
      <div className="mt-12 w-full max-w-lg">
        <button
          className="flex items-center gap-2 mx-auto cursor-pointer text-sm transition-opacity hover:opacity-80"
          style={{ color: c.textSubtle }}
          onClick={() => setShowAll((v) => !v)}
        >
          {showAll ? 'Hide' : 'View'} all platforms
          <ChevronIcon className={`w-4 h-4 transition-transform ${showAll ? 'rotate-180' : ''}`} />
        </button>

        {showAll && (
          <div className="mt-6 rounded-2xl overflow-hidden" style={{ border: `1px solid ${c.border}` }}>
            {groupByPlatform(artifacts).map((group, gi) => {
              const Icon = iconComponents[group.iconKey] ?? WindowsIcon
              return (
                <div key={group.platform}>
                  {/* Platform header */}
                  <div
                    className="flex items-center gap-3 px-6 py-3"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.03)',
                      borderTop: gi > 0 ? `1px solid ${c.border}` : undefined,
                    }}
                  >
                    <div className="w-5 h-5" style={{ color: c.text }}>
                      <Icon className="w-full h-full" />
                    </div>
                    <span className="text-sm font-semibold" style={{ color: c.text }}>
                      {group.label}
                    </span>
                  </div>
                  {/* Artifacts */}
                  {group.items.map((a) => (
                    <div
                      key={a.filename}
                      className="flex items-center justify-between px-6 py-3.5"
                      style={{ borderTop: `1px solid ${c.border}` }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-sm" style={{ color: c.text }}>
                          {a.label}
                        </span>
                        <span className="text-xs" style={{ color: c.textSubtle }}>
                          .{a.format} · {formatBytes(a.size)}
                        </span>
                      </div>
                      <a
                        href={getDownloadUrl(a.filename)}
                        className="text-sm font-medium flex items-center gap-1.5 transition-opacity hover:opacity-80"
                        style={{ color: c.yellow }}
                      >
                        <DownloadIcon className="w-4 h-4" />
                        Download
                      </a>
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
