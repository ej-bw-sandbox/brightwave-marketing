"use client"

import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  Workflow, Grid3x3, Brain, Database, Search, Bot,
  Sparkles, Sheet, Presentation, FileText, FileType,
  Plug, Share2, Users, Settings, Zap, Clock, ListChecks, LayoutTemplate,
  SearchCode, PenTool, Rocket,
  BookOpen, Newspaper, Scale, Calendar, Megaphone, Library, LifeBuoy, Handshake, Wrench, FlaskConical, Briefcase, Building2,
  Sun, Moon,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Header Component - Mega-Menu                                       */
/*  Webflow CSS classes + React-driven dropdown interactivity          */
/* ------------------------------------------------------------------ */

/* ---- Dark-mode-aware mega-menu tokens ---- */
function getMegaTokens(dark: boolean) {
  return {
    bg: dark ? '#1a1a1a' : '#ffffff',
    text: dark ? '#f5f5f5' : '#0F0F0F',
    textMuted: dark ? '#a1a1a1' : '#6b7280',
    accent: dark ? '#f5f5f5' : '#0F0F0F',
    border: dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
    cardBg: dark ? '#252525' : '#f3f4f6',
    cardBgHover: dark ? '#333333' : '#e5e7eb',
  }
}

/* ---- Icon mappings ---- */
const CATEGORY_ICONS: Record<string, LucideIcon> = {
  'Analyze': SearchCode,
  'Create': PenTool,
  'Collaborate': Users,
  'Productivity': Rocket,
}

const FEATURE_ICONS: Record<string, LucideIcon> = {
  'agentic-workflows': Workflow,
  'data-extraction-grid': Grid3x3,
  'multi-model-intelligence': Brain,
  'processing-volume': Database,
  'real-time-search': Search,
  'sandbox-agents': Bot,
  'artifacts': Sparkles,
  'excel-spreadsheets': Sheet,
  'presentations': Presentation,
  'reports': FileText,
  'word-documents': FileType,
  'integrations': Plug,
  'public-sharing': Share2,
  'team-collaboration': Users,
  'custom-instructions': Settings,
  'quick-prompts': Zap,
  'scheduled-tasks': Clock,
  'structured-planning': ListChecks,
  'templates': LayoutTemplate,
}

function getFeatureIcon(href: string, menuIcon?: string): LucideIcon | null {
  if (menuIcon && ICON_NAME_MAP[menuIcon]) return ICON_NAME_MAP[menuIcon]
  const slug = href.split('/').pop() || ''
  return FEATURE_ICONS[slug] || null
}

/* ---- Reusable SVG sub-components ---- */
const ChevronSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 10 6" fill="none" className="chevron">
    <path d="M0.525391 1L5.02539 5L9.52539 1" stroke="currentColor"></path>
  </svg>
)

interface PlatformFeature {
  title: string
  menuLabel: string
  slug: string
  category: string
  menuIcon?: string
}

/* Map Sanity menuIcon string names to Lucide components */
const ICON_NAME_MAP: Record<string, LucideIcon> = {
  Workflow, Grid3x3, Brain, Database, Search, Bot,
  Sparkles, Sheet, Presentation, FileText, FileType,
  Plug, Share2, Users, Settings, Zap, Clock, ListChecks, LayoutTemplate,
  SearchCode, PenTool, Rocket, BookOpen, Newspaper, Scale, Calendar,
  Megaphone, Library, LifeBuoy, Handshake, Wrench, FlaskConical, Briefcase, Building2,
}

interface NavAssociation {
  title: string
  menuLabel: string
  slug: string
}

interface SolutionsNavData {
  useCases: NavAssociation[]
  icpPages: NavAssociation[]
  firmTypes: NavAssociation[]
  platformFeatures: PlatformFeature[]
}

interface HeaderCta {
  _key: string
  label: string
  url: string
  style?: string
  openInNewTab?: boolean
}

export function HeaderClient({
  solutionsNavData = null,
  headerCtas,
}: {
  caseStudyCount?: number
  solutionsNavData?: SolutionsNavData | null
  headerCtas?: HeaderCta[]
}) {
  /* ---- State ---- */
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  /* ---- Dark mode state ---- */
  const [isDark, setIsDark] = useState(false)

  /* Sync dark mode state on mount from DOM (set by anti-FOUC script in layout.tsx) */
  useEffect(() => {
    const html = document.documentElement
    const hasDark = html.getAttribute('theme') === 'dark' || html.classList.contains('u-dark-mode')
    setIsDark(hasDark)
  }, [])

  /* Toggle dark mode handler */
  const toggleDarkMode = useCallback(() => {
    const html = document.documentElement
    const newDark = !isDark
    if (newDark) {
      html.setAttribute('theme', 'dark')
      html.classList.add('u-dark-mode')
    } else {
      html.removeAttribute('theme')
      html.classList.remove('u-dark-mode')
    }
    localStorage.setItem('theme', newDark ? 'dark' : 'light')
    setIsDark(newDark)
  }, [isDark])

  /* Close dropdown on Escape */
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpenDropdown(null)
        setMobileMenuOpen(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  /* Close dropdown when clicking outside */
  useEffect(() => {
    if (!openDropdown) return
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement
      if (!target.closest('.nav_dropdown')) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [openDropdown])

  const toggleDropdown = useCallback((name: string) => {
    setOpenDropdown(prev => prev === name ? null : name)
  }, [])

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev)
  }, [])

  /* Group platform features by category */
  const platformGroups: Record<string, PlatformFeature[]> = {}
  if (solutionsNavData?.platformFeatures) {
    for (const f of solutionsNavData.platformFeatures) {
      const cat = f.category || 'General'
      if (!platformGroups[cat]) platformGroups[cat] = []
      platformGroups[cat].push(f)
    }
  }

  const icpPages = solutionsNavData?.icpPages ?? []
  const useCases = solutionsNavData?.useCases ?? []
  const firmTypes = solutionsNavData?.firmTypes ?? []

  const resourceLinks: { title: string; href: string; desc: string; icon: LucideIcon; external?: boolean }[] = [
    { title: 'About Us', href: '/about', desc: 'Learn about Brightwave and our mission', icon: Building2 },
    { title: 'Blog', href: '/blog', desc: 'Insights on AI and investment research', icon: BookOpen },
    { title: 'Careers', href: 'https://www.linkedin.com/company/brightwaveio/jobs/', desc: 'Join the Brightwave team', icon: Briefcase, external: true },
    { title: 'Comparisons', href: '/comparisons', desc: 'How Brightwave compares to alternatives', icon: Scale },
    { title: 'Engineering Log', href: '/engineering-log', desc: 'Technical deep dives from our team', icon: FlaskConical },
    { title: 'Events', href: '/events', desc: 'Live and past online events', icon: Calendar },
    { title: 'Knowledge Base', href: 'https://docs.brightwave.io', desc: 'In-depth guides and documentation', icon: Library, external: true },
    { title: 'News', href: '/news', desc: 'Latest updates and press coverage', icon: Newspaper },
    { title: 'Partner Program', href: '/partners', desc: 'Join our partner ecosystem', icon: Handshake },
    { title: 'Release Notes', href: '/release-notes', desc: 'See our latest feature launches', icon: Megaphone },
    { title: 'Support', href: '/support', desc: 'Product support and documentation', icon: LifeBuoy },
    { title: 'Tools & Guides', href: '/tools-guides', desc: 'Resources and growth assets', icon: Wrench },
  ]

  /* Feature categories from Sanity or fallbacks */
  const featureCategories = Object.keys(platformGroups).length > 0
    ? Object.entries(platformGroups)
      .filter(([category]) => category.toLowerCase() !== 'general')
      .map(([category, features]) => ({
        title: category,
        href: `/features#${category.toLowerCase().replace(/\s+/g, '-')}`,
        items: features.map(f => ({ title: f.menuLabel || f.title, href: `/features/${f.slug}`, menuIcon: f.menuIcon as string | undefined })),
      }))
    : [
      {
        title: 'Analyze',
        href: '/features#analyze',
        items: [
          { title: 'Agentic Workflows', href: '/features/agentic-workflows' },
          { title: 'Data Extraction Grid', href: '/features/data-extraction-grid' },
          { title: 'Multi-Model Intelligence', href: '/features/multi-model-intelligence' },
          { title: 'Processing Volume', href: '/features/processing-volume' },
          { title: 'Real-Time Search', href: '/features/real-time-search' },
          { title: 'Sandbox Agents', href: '/features/sandbox-agents' },
        ],
      },
      {
        title: 'Create',
        href: '/features#create',
        items: [
          { title: 'Artifacts', href: '/features/artifacts' },
          { title: 'Excel & Spreadsheets', href: '/features/excel-spreadsheets' },
          { title: 'Presentations', href: '/features/presentations' },
          { title: 'Reports', href: '/features/reports' },
          { title: 'Word Documents', href: '/features/word-documents' },
        ],
      },
      {
        title: 'Collaborate',
        href: '/features#collaborate',
        items: [
          { title: 'Integrations', href: '/features/integrations' },
          { title: 'Public Sharing', href: '/features/public-sharing' },
          { title: 'Team Collaboration', href: '/features/team-collaboration' },
        ],
      },
      {
        title: 'Productivity',
        href: '/features#productivity',
        items: [
          { title: 'Custom Instructions', href: '/features/custom-instructions' },
          { title: 'Quick Prompts', href: '/features/quick-prompts' },
          { title: 'Scheduled Tasks', href: '/features/scheduled-tasks' },
          { title: 'Structured Planning', href: '/features/structured-planning' },
          { title: 'Templates', href: '/features/templates' },
        ],
      },
    ]

  const MEGA = getMegaTokens(isDark)

  /* ---- Shared mega-menu panel styles ---- */
  const megaPanelStyle: React.CSSProperties = {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '100%',
    background: MEGA.bg,
    borderTop: `1px solid ${MEGA.border}`,
    boxShadow: isDark ? '0 8px 30px rgba(0,0,0,0.4)' : '0 8px 30px rgba(0,0,0,0.12)',
    zIndex: 100,
    overflowY: 'auto',
    maxHeight: 'calc(100vh - 80px)',
  }

  const megaInnerStyle: React.CSSProperties = {
    maxWidth: 1400,
    margin: '0 auto',
    padding: '48px 40px',
  }

  return (
    <>
      <div data-animation="default" data-collapse="medium" role="banner" className="nav w-nav">
        <div id="cio-banner" className="cio-banner"></div>
        <div className="c-container cc-nav">
          <div className="nav_flex">
            <div className="nav-abso">
              <div className="nav-asbo_flex">
                {/* ---- LOGO ---- */}
                <a href="/" aria-current="page" className="nav_logo w-nav-brand w--current">
                  <div className="svg cc-onsurface-fill cc-logo w-embed"><svg width={150} height={28} viewBox="0 0 150 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M143.169 22.3786C139.582 22.3786 137.215 19.7896 137.215 15.8817C137.215 11.9738 139.558 9.38477 143.145 9.38477C146.899 9.38477 149.195 12.2424 148.86 16.5167H139.63C139.821 19.0324 141.137 20.4979 143.193 20.4979C144.652 20.4979 145.847 19.7651 146.278 18.5439H148.549C147.952 20.8887 145.895 22.3786 143.169 22.3786ZM139.678 14.8558H146.541C146.373 12.5844 145.154 11.2654 143.217 11.2654C141.256 11.2654 139.965 12.6088 139.678 14.8558Z" fill="currentColor"></path>
                      <path d="M134.261 9.77539H136.7L132.18 21.9876H129.478L124.982 9.77539H127.398L130.841 19.4719L134.261 9.77539Z" fill="currentColor"></path>
                      <path d="M115.963 13.2682H113.668C114.074 10.8258 116.011 9.38477 118.881 9.38477C121.894 9.38477 123.783 10.9968 123.783 13.6346V19.814C123.783 20.6444 123.855 21.2062 124.022 21.9878H121.726C121.607 21.4748 121.535 20.9375 121.511 20.3269C120.579 21.6214 119.024 22.3786 117.207 22.3786C114.792 22.3786 113.285 21.0352 113.285 18.8614C113.285 16.7854 114.624 15.442 117.279 15.0024L119.311 14.6604C120.818 14.3918 121.463 13.8789 121.463 12.9752C121.463 11.8761 120.483 11.1677 118.905 11.1677C117.255 11.1677 116.131 11.9738 115.963 13.2682ZM121.487 16.8342V15.2466C120.961 15.7351 120.292 16.0526 119.359 16.2236L117.661 16.5167C116.346 16.7365 115.629 17.4692 115.629 18.6172C115.629 19.8628 116.442 20.5956 117.9 20.5956C119.981 20.5956 121.487 19.0324 121.487 16.8342Z" fill="currentColor"></path>
                      <path d="M102.241 9.77539H104.728L107.597 19.0567L110.132 9.77539H112.547L109.08 21.9876H106.378L103.484 12.9506L100.615 21.9876H97.8887L94.4453 9.77539H96.8366L99.3713 19.0567L102.241 9.77539Z" fill="currentColor"></path>
                      <path d="M87.7837 6.45361H90.0793V9.77533H92.9488V11.6072H90.0793V18.1773C90.0793 19.5939 90.5337 20.1557 91.7293 20.1557H93.0206V21.9875H91.2032C88.788 21.9875 87.7837 20.7419 87.7837 18.0552V11.6072H85.9902V9.77533H87.7837V6.45361Z" fill="currentColor"></path>
                      <path d="M74.0137 4.89062H76.2615V11.3142C77.1941 10.0686 78.581 9.38472 80.231 9.38472C82.9092 9.38472 84.5114 11.2165 84.5114 14.1719V21.9877H82.2157V14.5871C82.2157 12.4866 81.331 11.3875 79.5136 11.3875C77.6006 11.3875 76.3093 12.6332 76.3093 14.6115V21.9877H74.0137V4.89062Z" fill="currentColor"></path>
                      <path d="M62.1075 22.9647C62.4423 24.5279 63.6857 25.3828 65.5509 25.3828C67.8465 25.3828 69.09 24.1127 69.09 21.7679V19.7896C68.1335 21.2795 66.6987 22.061 64.9531 22.061C61.7727 22.061 59.5488 19.4965 59.5488 15.7107C59.5488 11.9982 61.7966 9.38477 64.9292 9.38477C66.6748 9.38477 68.1335 10.1663 69.09 11.6562V9.77556H71.3856V21.4993C71.3856 25.1385 69.2574 27.2634 65.5509 27.2634C62.3705 27.2634 60.314 25.7003 59.8597 22.9647H62.1075ZM65.5509 20.0582C67.7031 20.0582 69.1139 18.2753 69.1139 15.7107C69.1139 13.1705 67.7031 11.3876 65.5509 11.3876C63.3988 11.3876 61.9401 13.1705 61.9401 15.7107C61.9401 18.2508 63.3988 20.0582 65.5509 20.0582Z" fill="currentColor"></path>
                      <path d="M55.903 7.77279C54.8747 7.77279 54.3486 7.04005 54.3486 6.23405C54.3486 5.40362 54.8747 4.69531 55.903 4.69531C56.8834 4.69531 57.4573 5.40362 57.4573 6.23405C57.4573 7.04005 56.8834 7.77279 55.903 7.77279ZM54.7551 21.9878V9.77559H57.0508V21.9878H54.7551Z" fill="currentColor"></path>
                      <path d="M46.4932 9.77556H48.741V11.8516C49.6257 10.2152 51.1083 9.38477 53.0213 9.38477V11.6318C50.1279 11.6318 48.7888 12.853 48.7888 15.442V21.9878H46.4932V9.77556Z" fill="currentColor"></path>
                      <path d="M40.6901 12.7797C43.0814 13.0728 44.6596 14.8558 44.6596 17.3226C44.6596 20.1315 42.5792 21.9877 39.4467 21.9877H32.0576V4.89062H38.8488C41.6705 4.89062 43.464 6.47821 43.464 8.99393C43.464 10.899 42.4118 12.3401 40.6901 12.7797ZM38.4423 12.047C40.1879 12.047 41.1684 11.1188 41.1684 9.45799C41.1684 7.84598 40.2597 7.01555 38.4662 7.01555H34.4489V12.047H38.4423ZM34.4489 19.8628H39.1597C41.2401 19.8628 42.2684 18.9102 42.2684 16.9807C42.2684 15.0512 41.1684 14.0498 39.0162 14.0498H34.4489V19.8628Z" fill="currentColor"></path>
                      <path d="M18.7779 14V19.7675L18.0253 20.5363L11.626 14C11.626 13.6702 11.626 13.4851 11.626 13.1552L19.4127 5.20186L19.5339 5.07809C19.7366 4.99235 19.916 4.91631 20.1187 4.83057H23.9842C24.3071 5.16046 24.4891 5.3459 24.8125 5.67579V12.3126C24.4903 12.6416 24.31 12.8258 23.9879 13.1548H19.605L18.7779 13.9996V14Z" fill="currentColor"></path>
                      <path d="M0 4.83058L0.73695 4.07194L4.72938 8.1498C5.18594 8.1498 5.44276 8.1498 5.89932 8.1498L10.2151 3.74163L13.8784 0H15.0479L18.779 3.8109V4.6557L18.6078 4.83058L11.0427 12.5576L10.7002 12.9073L10.1155 13.1548H0.828346C0.505362 12.8249 0.324226 12.6399 0.00124187 12.31V12.2965" fill="currentColor"></path>
                      <path d="M0 14.8579V22.3238L0.740259 23.0799L4.72938 19.0055C5.18594 19.0055 5.44276 19.0055 5.89932 19.0055L11.0319 24.2479L13.8817 27.1582C14.3387 27.1582 14.5947 27.1582 15.0512 27.1582L18.779 23.3507V22.4991L18.6078 22.3243L11.0427 14.5973L10.7002 14.2475C10.4976 14.1618 10.3181 14.0857 10.1155 14H0.828346C0.505362 14.3299 0.324226 14.5149 0.00124187 14.8448V14.8583L0 14.8579Z" fill="currentColor"></path>
                      <path d="M20.4326 14H23.9858C24.3088 14.3299 24.4899 14.5149 24.8129 14.8448V21.479C24.4899 21.8089 24.3088 21.9939 23.9858 22.3238H20.4326L19.6055 21.479V14.8448L20.4326 14Z" fill="currentColor"></path>
                    </svg></div>
                </a>

                {/* ---- NAV MENU ---- */}
                <nav role="navigation" className="nav_menu w-nav-menu" {...(mobileMenuOpen ? { 'data-nav-menu-open': '' } : {})}>
                  <div className="nav_links">

                    {/* ==================== PLATFORM DROPDOWN (Desktop) ==================== */}
                    <div className={`nav_dropdown cc-desktop w-dropdown${openDropdown === 'platform' ? ' w--open' : ''}`}>
                      <div className="nav_toggle w-dropdown-toggle" onClick={() => toggleDropdown('platform')} aria-expanded={openDropdown === 'platform'} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && toggleDropdown('platform')}>
                        <div className="text-overflow">
                          <div className="c-text-link cc-nav">Platform</div>
                          <div className="nav_line"></div>
                        </div>
                        <ChevronSvg />
                      </div>
                      {openDropdown === 'platform' && (
                        <nav className="nav_list w-dropdown-list w--open">
                          <div style={megaPanelStyle}>
                            <div style={megaInnerStyle}>
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 40 }}>
                                {/* Left: Category columns */}
                                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${featureCategories.length}, 1fr)`, gap: 40 }}>
                                  {featureCategories.map((cat, ci) => (
                                    <div key={ci}>
                                      <Link href={cat.href} style={{
                                        display: 'flex', alignItems: 'center', gap: 8,
                                        fontSize: 14, fontWeight: 600, color: MEGA.text,
                                        textDecoration: 'none', marginBottom: 16,
                                      }} onClick={() => setOpenDropdown(null)}>
                                        {(() => { const CatIcon = CATEGORY_ICONS[cat.title]; return CatIcon ? <CatIcon size={16} style={{ opacity: 0.7 }} /> : null })()}
                                        {cat.title} <span style={{ fontSize: 16 }}>&rarr;</span>
                                      </Link>
                                      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                        {cat.items.slice(0, 4).map((item, ii) => {
                                          const ItemIcon = getFeatureIcon(item.href, (item as any).menuIcon)
                                          return (
                                          <Link key={ii} href={item.href} style={{
                                            display: 'flex', alignItems: 'center', gap: 10,
                                            padding: '6px 0', color: MEGA.text,
                                            textDecoration: 'none', fontSize: 14, fontWeight: 400,
                                            transition: 'opacity 0.15s',
                                          }}
                                            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.opacity = '0.7')}
                                            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.opacity = '1')}
                                            onClick={() => setOpenDropdown(null)}
                                          >
                                            {ItemIcon && <ItemIcon size={15} style={{ opacity: 0.5, flexShrink: 0 }} />}
                                            <span>{item.title}</span>
                                          </Link>
                                          )
                                        })}
                                        {cat.items.length > 4 && (
                                          <Link href={cat.href} style={{
                                            display: 'flex', alignItems: 'center', gap: 6,
                                            padding: '8px 0 2px', color: MEGA.accent,
                                            textDecoration: 'none', fontSize: 13, fontWeight: 600,
                                            transition: 'opacity 0.15s',
                                          }}
                                            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.opacity = '0.7')}
                                            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.opacity = '1')}
                                            onClick={() => setOpenDropdown(null)}
                                          >
                                            More &rarr;
                                          </Link>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>

                                {/* Right sidebar */}
                                <div style={{
                                  borderLeft: `1px solid ${MEGA.border}`,
                                  paddingLeft: 40,
                                  minWidth: 280,
                                  maxWidth: 320,
                                }}>
                                  <div style={{ fontSize: 18, fontWeight: 600, color: MEGA.text, marginBottom: 8 }}>
                                    Brightwave Platform
                                  </div>
                                  <div style={{ fontSize: 13, color: MEGA.textMuted, marginBottom: 20, lineHeight: 1.5 }}>
                                    AI-powered research and analysis for investment professionals
                                  </div>
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    <Link href="/features" style={{ color: MEGA.accent, fontSize: 14, fontWeight: 500, textDecoration: 'none' }} onClick={() => setOpenDropdown(null)}>View All Features &rarr;</Link>
                                    <Link href="/enterprise-security-compliance" style={{ color: MEGA.accent, fontSize: 14, fontWeight: 500, textDecoration: 'none' }} onClick={() => setOpenDropdown(null)}>Enterprise Security &rarr;</Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </nav>
                      )}
                    </div>

                    {/* ==================== SOLUTIONS DROPDOWN (Desktop) ==================== */}
                    <div className={`nav_dropdown cc-desktop w-dropdown${openDropdown === 'solutions' ? ' w--open' : ''}`}>
                      <div className="nav_toggle w-dropdown-toggle" onClick={() => toggleDropdown('solutions')} aria-expanded={openDropdown === 'solutions'} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && toggleDropdown('solutions')}>
                        <div className="text-overflow">
                          <div className="c-text-link cc-nav">Solutions</div>
                          <div className="nav_line"></div>
                        </div>
                        <ChevronSvg />
                      </div>
                      {openDropdown === 'solutions' && (
                        <nav className="nav_list w-dropdown-list w--open">
                          <div style={megaPanelStyle}>
                            <div style={{ ...megaInnerStyle, padding: '40px' }}>
                              <div style={{ display: 'flex', alignItems: 'stretch', gap: 0 }}>
                                {/* Left: Private Markets card */}
                                <div style={{ display: 'flex', alignItems: 'center', paddingRight: 40, flexShrink: 0 }}>
                                  <Link
                                    href="/private-markets-platform"
                                    onClick={() => setOpenDropdown(null)}
                                    style={{
                                      display: 'flex', alignItems: 'center', gap: 12,
                                      padding: '20px 32px',
                                      background: MEGA.cardBg,
                                      borderRadius: 8,
                                      textDecoration: 'none',
                                      color: MEGA.text,
                                      fontSize: 20, fontWeight: 700,
                                      transition: 'background 0.2s',
                                    }}
                                    onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.background = MEGA.cardBgHover)}
                                    onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.background = MEGA.cardBg)}
                                  >
                                    Private Markets
                                  </Link>
                                </div>

                                {/* Vertical divider */}
                                <div style={{ width: 1, background: MEGA.border, flexShrink: 0 }} />

                                {/* Right: 3 columns */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 40, flex: 1, paddingLeft: 40 }}>
                                  {/* I am a... */}
                                  <div>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: MEGA.text, marginBottom: 16 }}>
                                      I am a...
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                      {icpPages.length > 0 ? icpPages.map((icp, i) => (
                                        <Link key={i} href={`/i-am-a/${icp.slug}`} style={{
                                          display: 'flex', alignItems: 'center', gap: 8,
                                          padding: '6px 0', color: MEGA.text,
                                          textDecoration: 'none', fontSize: 14, fontWeight: 400,
                                          transition: 'opacity 0.15s',
                                        }}
                                          onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.opacity = '0.7')}
                                          onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.opacity = '1')}
                                          onClick={() => setOpenDropdown(null)}
                                        >
                                          <span style={{ width: 6, height: 6, borderRadius: 1, background: MEGA.textMuted, flexShrink: 0 }} />
                                          {icp.menuLabel || icp.title}
                                        </Link>
                                      )) : (
                                        <div style={{ fontSize: 13, color: MEGA.textMuted }}>Coming soon</div>
                                      )}
                                      <Link href="/i-am-a" style={{ fontSize: 13, color: MEGA.textMuted, textDecoration: 'none', marginTop: 8, transition: 'opacity 0.15s' }}
                                        onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.opacity = '0.7')}
                                        onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.opacity = '1')}
                                        onClick={() => setOpenDropdown(null)}
                                      >More &rarr;</Link>
                                    </div>
                                  </div>

                                  {/* Working on... */}
                                  <div>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: MEGA.text, marginBottom: 16 }}>
                                      Working on...
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                      {useCases.length > 0 ? useCases.map((uc, i) => (
                                        <Link key={i} href={`/use-cases/${uc.slug}`} style={{
                                          display: 'flex', alignItems: 'center', gap: 8,
                                          padding: '6px 0', color: MEGA.text,
                                          textDecoration: 'none', fontSize: 14, fontWeight: 400,
                                          transition: 'opacity 0.15s',
                                        }}
                                          onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.opacity = '0.7')}
                                          onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.opacity = '1')}
                                          onClick={() => setOpenDropdown(null)}
                                        >
                                          <span style={{ width: 6, height: 6, borderRadius: 1, background: MEGA.textMuted, flexShrink: 0 }} />
                                          {uc.menuLabel || uc.title}
                                        </Link>
                                      )) : (
                                        <Link href="/private-markets-platform" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', color: MEGA.text, textDecoration: 'none', fontSize: 14 }} onClick={() => setOpenDropdown(null)}>
                                          <span style={{ width: 6, height: 6, borderRadius: 1, background: MEGA.textMuted, flexShrink: 0 }} /> Private Markets
                                        </Link>
                                      )}
                                      <Link href="/use-cases" style={{ fontSize: 13, color: MEGA.textMuted, textDecoration: 'none', marginTop: 8, transition: 'opacity 0.15s' }}
                                        onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.opacity = '0.7')}
                                        onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.opacity = '1')}
                                        onClick={() => setOpenDropdown(null)}
                                      >More &rarr;</Link>
                                    </div>
                                  </div>

                                  {/* Working at a... */}
                                  <div>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: MEGA.text, marginBottom: 16 }}>
                                      Working at a...
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                      {firmTypes.length > 0 ? firmTypes.map((ft, i) => (
                                        <Link key={i} href={`/firm-types/${ft.slug}`} style={{
                                          display: 'flex', alignItems: 'center', gap: 8,
                                          padding: '6px 0', color: MEGA.text,
                                          textDecoration: 'none', fontSize: 14, fontWeight: 400,
                                          transition: 'opacity 0.15s',
                                        }}
                                          onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.opacity = '0.7')}
                                          onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.opacity = '1')}
                                          onClick={() => setOpenDropdown(null)}
                                        >
                                          <span style={{ width: 6, height: 6, borderRadius: 1, background: MEGA.textMuted, flexShrink: 0 }} />
                                          {ft.menuLabel || ft.title}
                                        </Link>
                                      )) : (
                                        <div style={{ fontSize: 13, color: MEGA.textMuted }}>Coming soon</div>
                                      )}
                                      <Link href="/firm-types" style={{ fontSize: 13, color: MEGA.textMuted, textDecoration: 'none', marginTop: 8, transition: 'opacity 0.15s' }}
                                        onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.opacity = '0.7')}
                                        onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.opacity = '1')}
                                        onClick={() => setOpenDropdown(null)}
                                      >More &rarr;</Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </nav>
                      )}
                    </div>

                    {/* ==================== CUSTOMERS (Direct Link) ==================== */}
                    <a href="/case-studies" className="nav_link w-inline-block">
                      <div className="c-text-link cc-nav">Customers</div>
                      <div className="nav_line"></div>
                    </a>

                    {/* ==================== RESOURCES DROPDOWN (Desktop) ==================== */}
                    <div className={`nav_dropdown cc-desktop w-dropdown${openDropdown === 'resources' ? ' w--open' : ''}`}>
                      <div className="nav_toggle w-dropdown-toggle" onClick={() => toggleDropdown('resources')} aria-expanded={openDropdown === 'resources'} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && toggleDropdown('resources')}>
                        <div className="text-overflow">
                          <div className="c-text-link cc-nav">Resources</div>
                          <div className="nav_line"></div>
                        </div>
                        <ChevronSvg />
                      </div>
                      {openDropdown === 'resources' && (
                        <nav className="nav_list w-dropdown-list w--open">
                          <div style={megaPanelStyle}>
                            <div style={megaInnerStyle}>
                              <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(3, 1fr)',
                                gap: '28px 36px',
                              }}>
                                {resourceLinks.map((link, i) => {
                                  const ResIcon = link.icon
                                  const linkProps = {
                                    style: {
                                      display: 'flex', alignItems: 'flex-start', gap: 12,
                                      textDecoration: 'none', color: MEGA.text,
                                      padding: '8px 0',
                                      transition: 'opacity 0.15s',
                                    } as React.CSSProperties,
                                    onMouseEnter: (e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.opacity = '0.7'),
                                    onMouseLeave: (e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.opacity = '1'),
                                    onClick: () => setOpenDropdown(null),
                                  }
                                  const content = (
                                    <>
                                      <ResIcon size={18} style={{ opacity: 0.5, flexShrink: 0, marginTop: 2 }} />
                                      <div>
                                        <div style={{ fontSize: 15, fontWeight: 600 }}>{link.title}</div>
                                        <div style={{ fontSize: 13, color: MEGA.textMuted, lineHeight: 1.5 }}>{link.desc}</div>
                                      </div>
                                    </>
                                  )
                                  return link.external ? (
                                    <a key={i} href={link.href} target="_blank" rel="noopener noreferrer" {...linkProps}>
                                      {content}
                                    </a>
                                  ) : (
                                    <Link key={i} href={link.href} {...linkProps}>
                                      {content}
                                    </Link>
                                  )
                                })}
                              </div>
                            </div>
                          </div>
                        </nav>
                      )}
                    </div>

                    {/* ==================== PRICING (Direct Link) ==================== */}
                    <a href="/enterprise" className="nav_link w-inline-block">
                      <div className="c-text-link cc-nav">Pricing</div>
                      <div className="nav_line"></div>
                    </a>

                    {/* ==================== MOBILE ACCORDIONS ==================== */}

                    {/* Mobile: Platform */}
                    <div className="nav_dropdown cc-mobile">
                      <div className="nav_toggle">
                        <div className="c-text-link cc-nav">Platform</div>
                        <ChevronSvg />
                        <input type="checkbox" className="accordion_checkbox" />
                      </div>
                      <div className="nav_list">
                        <div>
                          <div className="mobile_items">
                            {featureCategories.map((cat) =>
                              cat.items.slice(0, 4).map((item, i) => (
                                <a key={`mob-plat-${cat.title}-${i}`} href={item.href} className="c-title-4">{item.title}</a>
                              ))
                            ).flat()}
                            <a href="/features" className="c-title-4" style={{ color: MEGA.accent }}>View All Features</a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Mobile: Solutions */}
                    <div className="nav_dropdown cc-mobile">
                      <div className="nav_toggle">
                        <div className="c-text-link cc-nav">Solutions</div>
                        <ChevronSvg />
                        <input type="checkbox" className="accordion_checkbox" />
                      </div>
                      <div className="nav_list">
                        <div>
                          <div className="mobile_items">
                            {useCases.map((uc, i) => (
                              <a key={`mob-uc-${i}`} href={`/use-cases/${uc.slug}`} className="c-title-4">{uc.menuLabel || uc.title}</a>
                            ))}
                            {icpPages.map((icp, i) => (
                              <a key={`mob-icp-${i}`} href={`/i-am-a/${icp.slug}`} className="c-title-4">{icp.menuLabel || icp.title}</a>
                            ))}
                            {firmTypes.map((ft, i) => (
                              <a key={`mob-ft-${i}`} href={`/firm-types/${ft.slug}`} className="c-title-4">{ft.menuLabel || ft.title}</a>
                            ))}
                            {useCases.length === 0 && icpPages.length === 0 && firmTypes.length === 0 && (
                              <>
                                <a href="/private-markets-platform" className="c-title-4">Private Markets</a>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Mobile: Resources */}
                    <div className="nav_dropdown cc-mobile">
                      <div className="nav_toggle">
                        <div className="c-text-link cc-nav">Resources</div>
                        <ChevronSvg />
                        <input type="checkbox" className="accordion_checkbox" />
                      </div>
                      <div className="nav_list">
                        <div>
                          <div className="mobile_items">
                            {resourceLinks.map((link, i) => (
                              <a key={`mob-res-${i}`} href={link.href} className="c-title-4" {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{link.title}</a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </nav>

                {/* ---- CTAs ---- */}
                <div className="nav_ctas">
                  <div className="nav_btns">
                    <button
                      onClick={toggleDarkMode}
                      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                      className="toggle"
                      type="button"
                    >
                      {isDark ? (
                        <Sun size={18} strokeWidth={1.5} />
                      ) : (
                        <Moon size={18} strokeWidth={1.5} />
                      )}
                    </button>
                    {(headerCtas && headerCtas.length > 0 ? headerCtas : [
                      { _key: 'login', label: 'Login', url: 'https://app.brightwave.io/login', style: 'secondary' },
                      { _key: 'get-started', label: 'Contact Sales', url: '/enterprise', style: 'primary' },
                    ]).map((cta) => {
                      const isFill = cta.style === 'secondary' || cta.label.toLowerCase() === 'login'
                      const isExternal = cta.url.startsWith('http')
                      return (
                        <a
                          key={cta._key}
                          href={cta.url}
                          className={`cta-sec${isFill ? ' cc-fill' : ''} w-inline-block`}
                          {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          {...(cta.openInNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        >
                          <div className="c-text-link cc-stagger">{cta.label}</div>
                        </a>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* ---- HAMBURGER ---- */}
            <div className={`hamburger w-nav-button${mobileMenuOpen ? ' w--open' : ''}`} onClick={toggleMobileMenu} aria-label="Toggle mobile menu" role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && toggleMobileMenu()}>
              <div className="hamburger_inner cc-fill">
                <div className="c-text-link cc-stagger">Menu</div>
              </div>
              <div className="hamburger_inner cc-abso">
                <div className="c-text-link cc-stagger">Close</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop overlay when mega menu is open */}
      {openDropdown && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            top: 'var(--nav-height, 64px)',
            background: 'rgba(0,0,0,0.4)',
            zIndex: 99,
          }}
          onClick={() => setOpenDropdown(null)}
        />
      )}
    </>
  )
}
