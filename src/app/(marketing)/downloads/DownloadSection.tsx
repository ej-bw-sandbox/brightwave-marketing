'use client'

import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import {
  ArrowUpRight,
  Check,
  Download,
  ExternalLink,
  FileSpreadsheet,
  MonitorDown,
  Plug,
  Smartphone,
  Sparkles,
  X,
} from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import type { DownloadManifest, ManifestArtifact } from '@/lib/downloads/manifest'
import { formatBytes, getDownloadUrl } from '@/lib/downloads/manifest'
import type { DownloadsPagePlatform } from '@/lib/sanity/queries/downloads'

type DetectedOS = 'windows' | 'linux' | 'macos-intel' | 'macos-silicon' | 'ios' | 'android' | null
type PlatformIconKey = 'apple' | 'windows' | 'linux'
type PluginIconKey = 'excel' | 'word' | 'powerpoint' | 'chrome' | 'safari' | 'firefox' | 'edge' | 'plugin'

const IOS_APP_STORE_URL = 'https://apps.apple.com/us/app/brightwave/id6762927069'
const ANDROID_PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=io.brightwave.app'

interface MobileDownload {
  title: string
  buttonLabel: string
  url: string
  icon: ReactNode
}

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

function WindowsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M0 3.5l9.8-1.35v9.55H0zm10.8-1.5L24 0v11.7H10.8zM0 12.8h9.8v9.55L0 21zm10.8 0H24V24l-13.2-2.3z" />
    </svg>
  )
}

function LinuxIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 0 0-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 0 0-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724v.105a.086.086 0 0 1-.004-.021l-.004-.024a1.807 1.807 0 0 1-.15.706.953.953 0 0 1-.213.335.71.71 0 0 0-.088-.042c-.104-.045-.198-.064-.284-.133a1.312 1.312 0 0 0-.22-.066c.05-.06.146-.133.183-.198.053-.128.082-.264.088-.402v-.02a1.21 1.21 0 0 0-.061-.4c-.045-.134-.101-.2-.183-.333-.084-.066-.167-.132-.267-.132h-.016c-.093 0-.176.03-.262.132a.8.8 0 0 0-.205.334 1.18 1.18 0 0 0-.09.4v.019c.002.089.008.179.02.267-.193-.067-.438-.135-.607-.202a1.635 1.635 0 0 1-.018-.2v-.02a1.772 1.772 0 0 1 .15-.768 1.08 1.08 0 0 1 .43-.533.985.985 0 0 1 .594-.2zm-2.962.059h.036c.142 0 .27.048.399.135.146.129.264.288.344.465.09.199.14.4.153.667v.004c.007.134.006.2-.002.266v.08c-.03.007-.056.018-.083.024-.152.055-.274.135-.393.2.012-.09.013-.18.003-.267v-.015c-.012-.133-.04-.2-.082-.333a.613.613 0 0 0-.166-.267.248.248 0 0 0-.183-.064h-.021c-.071.006-.13.04-.186.132a.552.552 0 0 0-.12.27.944.944 0 0 0-.023.33v.015c.012.135.037.2.08.334.046.134.098.2.166.268.01.009.02.018.034.024-.07.057-.117.07-.176.136a.304.304 0 0 1-.131.068 2.62 2.62 0 0 1-.275-.402 1.772 1.772 0 0 1-.155-.667 1.759 1.759 0 0 1 .08-.668 1.43 1.43 0 0 1 .283-.535c.128-.133.26-.2.418-.2z" />
    </svg>
  )
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </svg>
  )
}

function AndroidIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.6 8.1 19.2 5.3a.7.7 0 0 0-.25-.96.7.7 0 0 0-.96.25l-1.67 2.9a10.3 10.3 0 0 0-8.64 0L6.01 4.59a.7.7 0 0 0-.96-.25.7.7 0 0 0-.25.96l1.6 2.8A9.24 9.24 0 0 0 2 15.8h20a9.24 9.24 0 0 0-4.4-7.7ZM7.5 12.7a1.1 1.1 0 1 1 0-2.2 1.1 1.1 0 0 1 0 2.2Zm9 0a1.1 1.1 0 1 1 0-2.2 1.1 1.1 0 0 1 0 2.2ZM4 17h2v3.5a1.5 1.5 0 0 0 3 0V17h6v3.5a1.5 1.5 0 0 0 3 0V17h2v-1H4v1Z" />
    </svg>
  )
}

function ChromeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 1 8.66 5H12a5 5 0 0 0-4.54 2.92L4.18 4.26A10 10 0 0 1 12 2Zm-9.34 5.78 4.46 7.72A5 5 0 0 0 12 17h.28l-3.2 5.54A10 10 0 0 1 2.66 7.78ZM12 22a10 10 0 0 1-.6-.02l4.46-7.72A5 5 0 0 0 16.99 12c0-1.07-.34-2.06-.92-2.87l5.86-.01A10 10 0 0 1 12 22Zm0-13a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z" />
    </svg>
  )
}

function SafariIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 18.2a8.2 8.2 0 1 1 0-16.4 8.2 8.2 0 0 1 0 16.4ZM13.5 6.5l-2.3 5.7-5.7 2.3 2.3-5.7 5.7-2.3Zm-1.5 4.2a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 0 0 0-2.6Z" />
    </svg>
  )
}

const platformDisplayName: Record<string, string> = {
  mac: 'macOS',
  win: 'Windows',
  linux: 'Linux',
}

const platformDescription: Record<string, string> = {
  mac: 'Native desktop app for Apple Silicon and Intel Macs.',
  win: 'Fast installer for Windows workstations.',
  linux: 'AppImage and .deb builds for Linux desktops.',
}

const platformIconKey: Record<string, PlatformIconKey> = {
  mac: 'apple',
  win: 'windows',
  linux: 'linux',
}

const platformOrder: Record<string, number> = { mac: 0, win: 1, linux: 2 }

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

function findPrimaryLabel(os: DetectedOS): string {
  switch (os) {
    case 'macos-silicon':
      return 'macOS Apple Silicon'
    case 'macos-intel':
      return 'macOS Intel'
    case 'windows':
      return 'Windows'
    case 'linux':
      return 'Linux'
    default:
      return 'macOS'
  }
}

function groupByPlatform(artifacts: ManifestArtifact[]) {
  const groups: Record<string, ManifestArtifact[]> = {}
  for (const artifact of artifacts) {
    ;(groups[artifact.platform] ??= []).push(artifact)
  }

  return Object.entries(groups)
    .map(([platform, items]) => ({
      platform,
      label: platformDisplayName[platform] ?? platform,
      description: platformDescription[platform] ?? '',
      iconKey: platformIconKey[platform] ?? 'linux',
      order: platformOrder[platform] ?? 99,
      items: items.sort((a, b) => a.label.localeCompare(b.label)),
    }))
    .sort((a, b) => a.order - b.order)
}

function PlatformIcon({ iconKey, className }: { iconKey: PlatformIconKey; className?: string }) {
  if (iconKey === 'apple') return <AppleIcon className={className} />
  if (iconKey === 'windows') return <WindowsIcon className={className} />
  return <LinuxIcon className={className} />
}

function AssetIcon({ src, className }: { src: string; className?: string }) {
  return <img src={src} alt="" aria-hidden="true" className={`dl-asset-icon ${className ?? ''}`} />
}

function PluginIcon({ iconKey, className }: { iconKey: PluginIconKey; className?: string }) {
  if (iconKey === 'excel') return <AssetIcon src="/icons/microsoft/excel.svg" className={className} />
  if (iconKey === 'word') return <AssetIcon src="/icons/microsoft/word.svg" className={className} />
  if (iconKey === 'powerpoint') return <AssetIcon src="/icons/microsoft/powerpoint.svg" className={className} />
  if (iconKey === 'chrome') return <ChromeIcon className={className} />
  if (iconKey === 'safari') return <SafariIcon className={className} />
  if (iconKey === 'firefox') return <ExternalLink className={className} />
  if (iconKey === 'edge') return <ExternalLink className={className} />
  return <Plug className={className} />
}

function pluginIconKey(key: DownloadsPagePlatform['iconKey']): PluginIconKey {
  return key ?? 'plugin'
}

function DesktopMockup() {
  const rows = [
    ['NVEX', 'Novex Technologies', '+7.4%'],
    ['SLRP', 'SolarPeak Energy', '+5.8%'],
    ['MDVR', 'MedVera Health', '+4.1%'],
    ['AQFN', 'AquaFin Capital', '+3.6%'],
    ['VRTX', 'Vortex Logistics', '+2.9%'],
  ]

  return (
    <div className="relative min-h-[360px] overflow-hidden rounded-[8px] border border-white/10 bg-[#10100f] p-4 sm:p-5 lg:min-h-[430px]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px] opacity-40" />
      <div className="relative ml-auto w-[92%] overflow-hidden rounded-[8px] border border-white/10 bg-[#1f201e] shadow-2xl shadow-black/30">
        <div className="flex items-center gap-2 border-b border-white/10 bg-[#242522] px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff605c]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd44]" />
          <span className="h-3 w-3 rounded-full bg-[#00ca4e]" />
          <div className="ml-4 h-6 flex-1 rounded bg-black/25" />
        </div>
        <div
          className="border-b border-white/10 bg-[#313a58] px-4 py-2 text-[11px] font-medium text-white/80"
          style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.35fr 0.9fr' }}
        >
          <span>Ticker</span>
          <span>Company</span>
          <span>Move</span>
        </div>
        <div>
          {rows.map((row, index) => (
            <div
              key={row[0]}
              className="border-b border-white/5 px-4 py-2 text-[11px] text-white/75"
              style={{
                display: 'grid',
                gridTemplateColumns: '0.85fr 1.35fr 0.9fr',
                backgroundColor: index % 2 === 0 ? 'rgba(255,255,255,0.035)' : 'transparent',
              }}
            >
              <span className="font-semibold text-white">{row[0]}</span>
              <span>{row[1]}</span>
              <span className="text-[#9ef0b5]">{row[2]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative -mt-8 max-w-[340px] rounded-[8px] border border-white/15 bg-[#262622]/90 p-4 shadow-2xl shadow-black/40 backdrop-blur">
        <p className="mb-3 text-lg leading-snug text-white">Which portfolio names moved today, and why?</p>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-[#f2f218]">
            <Sparkles className="h-4 w-4" />
            <span>Searching research sources</span>
          </div>
          {['S&P Global', 'PitchBook', 'FactSet'].map((source) => (
            <div key={source} className="flex items-center gap-2 text-white/75">
              <Check className="h-4 w-4 text-[#84e19a]" />
              <span>{source}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mt-5 flex flex-wrap gap-2">
        {['CIM review', 'Market map', 'IC memo'].map((label) => (
          <span key={label} className="rounded-[8px] border border-white/10 bg-white/[0.06] px-3 py-2 text-xs text-white/70">
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}

function PrimaryButton({ artifact, detectedOS }: { artifact: ManifestArtifact | null; detectedOS: DetectedOS }) {
  const fallback = artifact
  if (!fallback) return null

  return (
    <a
      href={getDownloadUrl(fallback.filename)}
      className="dl-primary-button inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#f2f218] focus:ring-offset-2 focus:ring-offset-[#1b1b18]"
    >
      <Download className="h-4 w-4" />
      Download for {findPrimaryLabel(detectedOS)}
    </a>
  )
}

function ArtifactRow({ artifact }: { artifact: ManifestArtifact }) {
  return (
    <a
      href={getDownloadUrl(artifact.filename)}
      className="dl-border group flex items-center justify-between gap-4 border-t py-4 transition hover:opacity-80"
    >
      <div className="min-w-0">
        <p className="dl-text m-0 text-base font-medium">{artifact.label}</p>
        <p className="dl-subtle m-0 mt-1 text-sm">
          .{artifact.format} / {formatBytes(artifact.size)}
        </p>
      </div>
      <span className="dl-control-border dl-muted flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] border transition group-hover:border-[#f2f218]/60 group-hover:text-[#f2f218]">
        <Download className="h-4 w-4" />
      </span>
    </a>
  )
}

function PluginRow({ plugin }: { plugin: DownloadsPagePlatform }) {
  const isComingSoon = plugin.comingSoon || !plugin.downloadUrl
  const iconKey = pluginIconKey(plugin.iconKey)
  const content = (
    <>
      <div className="flex min-w-0 items-center gap-3">
        <span className="dl-icon-box flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] border">
          <PluginIcon iconKey={iconKey} className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="dl-text m-0 text-base font-medium leading-snug">{plugin.displayName}</p>
          <p className="dl-subtle m-0 mt-1 text-sm">{isComingSoon ? 'Coming soon' : plugin.description ?? 'Install add-in'}</p>
        </div>
      </div>
      <span className="dl-secondary-button flex h-10 min-w-24 shrink-0 items-center justify-center rounded-[8px] border px-4 text-sm font-medium">
        {isComingSoon ? 'Soon' : 'Install'}
        {!isComingSoon && <ArrowUpRight className="ml-2 h-4 w-4" />}
      </span>
    </>
  )

  const className = "dl-border flex items-center justify-between gap-4 border-t py-4"

  if (isComingSoon) {
    return <div className={`${className} opacity-65`}>{content}</div>
  }

  return (
    <a href={plugin.downloadUrl} target="_blank" rel="noopener noreferrer" className={`${className} group transition hover:border-white/20`}>
      {content}
    </a>
  )
}

interface ComingSoonRowProps {
  icon: React.ReactNode
  label: string
}

function ComingSoonRow({ icon, label }: ComingSoonRowProps) {
  return (
    <div className="dl-border flex items-center justify-between gap-4 border-t py-4 opacity-65">
      <div className="flex min-w-0 items-center gap-3">
        <span className="dl-icon-box flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] border">
          {icon}
        </span>
        <div className="min-w-0">
          <p className="dl-text m-0 text-base font-medium leading-snug">{label}</p>
          <p className="dl-subtle m-0 mt-1 text-sm">Coming soon</p>
        </div>
      </div>
      <span className="dl-secondary-button flex h-10 min-w-24 shrink-0 items-center justify-center rounded-[8px] border px-4 text-sm font-medium">
        Soon
      </span>
    </div>
  )
}

const mobileDownloads: MobileDownload[] = [
  {
    title: 'iOS',
    buttonLabel: 'Download iOS app',
    url: IOS_APP_STORE_URL,
    icon: <AppleIcon className="h-5 w-5" />,
  },
  {
    title: 'Android',
    buttonLabel: 'Download Android app',
    url: ANDROID_PLAY_STORE_URL,
    icon: <AndroidIcon className="h-5 w-5" />,
  },
]

function MobileDownloadRow({ download, onOpen }: { download: MobileDownload; onOpen: (download: MobileDownload) => void }) {
  return (
    <div className="dl-border flex items-center justify-between gap-4 border-t py-5">
      <div className="flex min-w-0 items-center gap-3">
        <span className="dl-icon-box flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] border">
          {download.icon}
        </span>
        <div className="min-w-0">
          <p className="dl-text m-0 text-base font-medium leading-snug">{download.title}</p>
        </div>
      </div>
      <button
        type="button"
        className="dl-secondary-button flex h-10 min-w-24 shrink-0 items-center justify-center rounded-[8px] border px-4 text-sm font-medium transition"
        onClick={() => onOpen(download)}
      >
        Download
      </button>
    </div>
  )
}

function MobileQrModal({ download, onClose }: { download: MobileDownload | null; onClose: () => void }) {
  useEffect(() => {
    if (!download) return

    const previousOverflow = document.body.style.overflow
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [download, onClose])

  if (!download) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-qr-title"
      onClick={onClose}
    >
      <div
        className="dl-qr-modal relative w-full max-w-[560px] rounded-[8px] border p-6 shadow-2xl sm:p-8 md:p-10"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="dl-qr-close absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-[8px] border"
          aria-label="Close QR code"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>

        <h3 id="mobile-qr-title" className="m-0 pr-14 text-center text-3xl font-semibold leading-tight text-white sm:text-5xl">
          Get Brightwave on your phone
        </h3>

        <div className="mt-8 rounded-[8px] border border-white/15 p-6 sm:p-8">
          <div className="mx-auto flex w-fit rounded-[8px] bg-white p-4">
            <QRCodeSVG value={download.url} size={220} level="M" className="dl-qr-code" />
          </div>

          <a
            href={download.url}
            target="_blank"
            rel="noopener noreferrer"
            className="dl-qr-link mx-auto mt-8 flex min-h-12 w-fit items-center justify-center gap-3 rounded-[8px] border px-5 py-3 text-base font-semibold text-white transition"
          >
            {download.icon}
            {download.buttonLabel}
          </a>
        </div>
      </div>
    </div>
  )
}

export function DownloadSection({
  manifest,
  plugins = [],
}: {
  manifest: DownloadManifest | null
  plugins?: DownloadsPagePlatform[]
}) {
  const [detectedOS, setDetectedOS] = useState<DetectedOS>(null)
  const [ready, setReady] = useState(false)
  const [activeMobileDownload, setActiveMobileDownload] = useState<MobileDownload | null>(null)

  useEffect(() => {
    setDetectedOS(detectOS())
    setReady(true)
  }, [])

  const artifacts = manifest?.artifacts ?? []
  const platformGroups = useMemo(() => groupByPlatform(artifacts), [artifacts])
  const primary = useMemo(() => findPrimaryArtifact(artifacts, detectedOS) ?? artifacts.find((a) => a.platform === 'mac') ?? null, [artifacts, detectedOS])

  if (!manifest || artifacts.length === 0) {
    return (
      <div className="dl-panel-raised dl-muted rounded-[8px] border p-8 text-center">
        Downloads are temporarily unavailable. Please check back shortly.
      </div>
    )
  }

  if (!ready) {
    return (
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="dl-panel-raised h-[420px] animate-pulse rounded-[8px]" />
        <div className="dl-panel-raised h-[420px] animate-pulse rounded-[8px]" />
      </div>
    )
  }

  const officePlugins = plugins.filter((plugin) => ['excel', 'powerpoint', 'word'].includes(plugin.iconKey ?? ''))

  return (
    <>
    <div className="w-[calc(100vw-2rem)] max-w-full space-y-5 md:w-full">
      <section className="dl-panel flex flex-col overflow-hidden rounded-[8px] border lg:flex-row">
        <div className="flex flex-col justify-between gap-10 p-6 sm:p-8 lg:w-[44%] lg:flex-none lg:p-10">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-[8px] border border-[#f2f218]/25 bg-[#f2f218]/10 px-3 py-2 text-xs font-medium uppercase tracking-[0.12em] text-[#f2f218]">
              <Sparkles className="h-4 w-4" />
              Recommended
            </div>
            <h2 className="dl-text m-0 max-w-xl text-3xl font-semibold leading-tight md:text-5xl">
              Brightwave for every research workflow.
            </h2>
            <p className="dl-muted mt-5 max-w-xl text-base leading-relaxed md:text-lg">
              Install the desktop app, bring Brightwave into Office, or connect browser, workspace, and mobile apps when research moves between surfaces.
            </p>
          </div>

          <div className="space-y-5">
            <div className="flex flex-col gap-3 sm:flex-row">
              <PrimaryButton artifact={primary} detectedOS={detectedOS} />
              <a
                href="#all-downloads"
                className="dl-secondary-button inline-flex min-h-12 items-center justify-center rounded-[8px] border px-5 py-3 text-sm font-semibold transition"
              >
                View all installers
              </a>
            </div>
            {primary && (
              <p className="dl-subtle m-0 text-sm">
                Latest build {manifest.version} / {formatBytes(primary.size)} / SHA {manifest.sha.slice(0, 7)}
              </p>
            )}
          </div>
        </div>

        <div className="dl-border border-t p-3 sm:p-5 lg:flex-1 lg:border-l lg:border-t-0">
          <DesktopMockup />
        </div>
      </section>

      <section id="all-downloads" className="flex flex-col gap-5 xl:flex-row">
        <div className="dl-panel-raised rounded-[8px] border p-6 sm:p-8 xl:w-[58%] xl:flex-none">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <div className="dl-icon-box mb-4 flex h-11 w-11 items-center justify-center rounded-[8px] border text-[#f2f218]">
                <MonitorDown className="h-5 w-5" />
              </div>
              <h3 className="dl-text m-0 text-2xl font-semibold">Desktop installers</h3>
              <p className="dl-muted m-0 mt-2 max-w-2xl text-sm leading-relaxed">
                Choose a native build for your operating system. macOS downloads include both Apple Silicon and Intel packages.
              </p>
            </div>
            <span className="dl-control-border dl-subtle rounded-[8px] border px-3 py-2 text-xs font-medium uppercase tracking-[0.12em]">
              v{manifest.version}
            </span>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            {platformGroups.map((group) => (
              <div key={group.platform} className="dl-panel-soft dl-border rounded-[8px] border p-5 lg:flex-1">
                <div className="mb-5 flex items-start gap-3">
                  <span className="dl-icon-box flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] border">
                    <PlatformIcon iconKey={group.iconKey} className="h-5 w-5" />
                  </span>
                  <div>
                    <h4 className="dl-text m-0 text-xl font-semibold">{group.label}</h4>
                    <p className="dl-subtle m-0 mt-1 text-sm leading-relaxed">{group.description}</p>
                  </div>
                </div>
                <div>
                  {group.items.map((artifact) => (
                    <ArtifactRow key={artifact.filename} artifact={artifact} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dl-panel-raised rounded-[8px] border p-6 sm:p-8 xl:flex-1">
          <div className="mb-8">
            <div className="dl-icon-box mb-4 flex h-11 w-11 items-center justify-center rounded-[8px] border text-[#f2f218]">
              <FileSpreadsheet className="h-5 w-5" />
            </div>
            <h3 className="dl-text m-0 text-2xl font-semibold">Microsoft Office</h3>
            <p className="dl-muted m-0 mt-2 text-sm leading-relaxed">
              Analyze data, build presentations, and draft documents with Brightwave next to your files.
            </p>
          </div>

          <div>
            {officePlugins.length === 0 ? (
              <div className="dl-border dl-subtle border-t py-4 text-sm">Office add-ins are coming soon.</div>
            ) : (
              officePlugins.map((plugin) => <PluginRow key={plugin._key ?? plugin.displayName} plugin={plugin} />)
            )}
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-5 lg:flex-row">
        <div className="dl-panel-raised overflow-hidden rounded-[8px] border p-6 sm:p-8 lg:flex-1">
          <div className="mb-8 flex items-start justify-between gap-6">
            <div>
              <div className="dl-icon-box mb-4 flex h-11 w-11 items-center justify-center rounded-[8px] border text-[#f2f218]">
                <Smartphone className="h-5 w-5" />
              </div>
              <h3 className="dl-text m-0 text-2xl font-semibold">Mobile</h3>
              <p className="dl-muted m-0 mt-2 max-w-xl text-sm leading-relaxed">
                Get Brightwave on iOS and Android.
              </p>
            </div>
          </div>
          <div>
            {mobileDownloads.map((download) => (
              <MobileDownloadRow key={download.title} download={download} onOpen={setActiveMobileDownload} />
            ))}
          </div>
        </div>

        <div className="dl-panel-raised overflow-hidden rounded-[8px] border p-6 sm:p-8 lg:flex-1">
          <div className="mb-8">
            <div className="dl-icon-box mb-4 flex h-11 w-11 items-center justify-center rounded-[8px] border text-[#f2f218]">
              <Plug className="h-5 w-5" />
            </div>
            <h3 className="dl-text m-0 text-2xl font-semibold">Browser and workspace apps</h3>
            <p className="dl-muted m-0 mt-2 max-w-xl text-sm leading-relaxed">
              Bring Brightwave into browser-based research and the Google files your team already uses.
            </p>
          </div>
          <div className="mb-5">
            <ComingSoonRow icon={<ChromeIcon className="h-5 w-5" />} label="Brightwave for Chrome" />
            <ComingSoonRow icon={<AssetIcon src="/icons/google/sheets.svg" className="h-5 w-5" />} label="Brightwave for Google Sheets" />
            <ComingSoonRow icon={<AssetIcon src="/icons/google/slides.svg" className="h-5 w-5" />} label="Brightwave for Google Slides" />
            <ComingSoonRow icon={<AssetIcon src="/icons/google/docs.svg" className="h-5 w-5" />} label="Brightwave for Google Docs" />
          </div>
        </div>
      </section>
    </div>
    <MobileQrModal download={activeMobileDownload} onClose={() => setActiveMobileDownload(null)} />
    </>
  )
}
