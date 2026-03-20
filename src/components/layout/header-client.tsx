'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { BrightwaveLogo } from './logo'
import type { SolutionsNavData, NavAssociation } from './header-wrapper'

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface NavItem {
  title: string
  description: string
  href: string
  icon: string
  iconBg: string
}

interface NavColumn {
  heading: string
  items: NavItem[]
  viewAllLabel?: string
  viewAllHref?: string
}

/* ------------------------------------------------------------------ */
/*  Platform Dropdown Data — MAX 4 items per column, then "More..."    */
/* ------------------------------------------------------------------ */

const platformColumns: NavColumn[] = [
  {
    heading: 'CREATE',
    items: [
      { title: 'Presentations', description: 'Build investor decks', href: '/features/presentations', icon: '\u25A0', iconBg: 'bg-blue-900/40' },
      { title: 'Reports', description: 'Generate analysis reports', href: '/features/reports', icon: '\u25A0', iconBg: 'bg-purple-900/40' },
      { title: 'Artifacts', description: 'Charts and tables', href: '/features/artifacts', icon: '\u25A0', iconBg: 'bg-green-900/40' },
      { title: 'Excel/Spreadsheets', description: 'Data analysis tools', href: '/features/excel-spreadsheets', icon: '\u25A0', iconBg: 'bg-gray-700/60' },
    ],
    viewAllLabel: '...More',
    viewAllHref: '/features#create',
  },
  {
    heading: 'ANALYZE',
    items: [
      { title: 'Extraction Grid', description: 'Pull data from documents', href: '/features/extraction-grid', icon: '\u25A0', iconBg: 'bg-teal-900/40' },
      { title: 'Web Search', description: 'Real-time information', href: '/features/web-search', icon: '\u25A0', iconBg: 'bg-cyan-900/40' },
      { title: 'Public Markets Data', description: 'Financial market insights', href: '/features/public-markets-data', icon: '\u25A0', iconBg: 'bg-emerald-900/40' },
    ],
    viewAllLabel: '...More',
    viewAllHref: '/features#analyze',
  },
  {
    heading: 'PRODUCTIVITY',
    items: [
      { title: 'Quick Prompts', description: 'Save time with shortcuts', href: '/features/quick-prompts', icon: '\u25A0', iconBg: 'bg-yellow-900/40' },
      { title: 'Templates', description: 'Reusable blueprints', href: '/features/templates', icon: '\u25A0', iconBg: 'bg-slate-700/60' },
      { title: 'Custom Instructions', description: 'Personalized AI behavior', href: '/features/custom-instructions', icon: '\u25A0', iconBg: 'bg-pink-900/40' },
    ],
    viewAllLabel: '...More',
    viewAllHref: '/features#productivity',
  },
  {
    heading: 'COLLABORATE',
    items: [
      { title: 'Team Collaboration', description: 'Work together seamlessly', href: '/features/team-collaboration', icon: '\u25A0', iconBg: 'bg-indigo-900/40' },
      { title: 'Sharing', description: 'Share work with anyone', href: '/features/sharing', icon: '\u25A0', iconBg: 'bg-violet-900/40' },
      { title: 'Integrations', description: 'Connect your tools', href: '/features/integrations', icon: '\u25A0', iconBg: 'bg-orange-900/40' },
    ],
    viewAllLabel: '...More',
    viewAllHref: '/features#collaborate',
  },
]

/* ------------------------------------------------------------------ */
/*  Solutions Dropdown Data (static fallback)                          */
/*  Column 1: "Use Cases" -> /use-cases/[slug]                        */
/*  Column 2: "I am a..." -> /i-am-a/[slug]                          */
/*  Column 3: "Firm Type" -> /firm-types/[slug]                       */
/* ------------------------------------------------------------------ */

const fallbackSolutionColumns: NavColumn[] = [
  {
    heading: 'USE CASES',
    items: [
      { title: 'CIM Analysis', description: '', href: '/use-cases/cim-analysis', icon: '', iconBg: '' },
      { title: 'Data Room Review', description: '', href: '/use-cases/data-room-review', icon: '', iconBg: '' },
      { title: 'Due Diligence', description: '', href: '/use-cases/due-diligence', icon: '', iconBg: '' },
      { title: 'Market Research', description: '', href: '/use-cases/market-research', icon: '', iconBg: '' },
    ],
    viewAllLabel: '...More',
    viewAllHref: '/use-cases',
  },
  {
    heading: 'I AM A...',
    items: [
      { title: 'Analyst', description: '', href: '/i-am-a/analyst', icon: '', iconBg: '' },
      { title: 'Associate', description: '', href: '/i-am-a/associate', icon: '', iconBg: '' },
      { title: 'Director', description: '', href: '/i-am-a/director', icon: '', iconBg: '' },
      { title: 'Managing Director', description: '', href: '/i-am-a/managing-director', icon: '', iconBg: '' },
    ],
    viewAllLabel: '...More',
    viewAllHref: '/i-am-a',
  },
  {
    heading: 'FIRM TYPE',
    items: [
      { title: 'Buyout', description: '', href: '/firm-types/buyout', icon: '', iconBg: '' },
      { title: 'Growth Equity', description: '', href: '/firm-types/growth', icon: '', iconBg: '' },
      { title: 'Venture Capital', description: '', href: '/firm-types/venture-capital', icon: '', iconBg: '' },
      { title: 'Fund of Funds', description: '', href: '/firm-types/fund-of-funds', icon: '', iconBg: '' },
    ],
    viewAllLabel: '...More',
    viewAllHref: '/firm-types',
  },
]

function buildSolutionColumns(data: SolutionsNavData | null): NavColumn[] {
  if (!data) return fallbackSolutionColumns

  const mapToItems = (items: NavAssociation[], basePath: string): NavItem[] =>
    items.map((i) => ({
      title: i.title,
      description: '',
      href: `${basePath}/${i.slug}`,
      icon: '',
      iconBg: '',
    }))

  const cols: NavColumn[] = []

  // Column 1: Use Cases -> /use-cases/[slug]
  if (data.useCases && data.useCases.length > 0) {
    cols.push({
      heading: 'USE CASES',
      items: mapToItems(data.useCases.slice(0, 4), '/use-cases'),
      viewAllLabel: '...More',
      viewAllHref: '/use-cases',
    })
  } else {
    cols.push(fallbackSolutionColumns[0])
  }

  // Column 2: I am a... -> /i-am-a/[slug]
  if (data.icpPages && data.icpPages.length > 0) {
    cols.push({
      heading: 'I AM A...',
      items: mapToItems(data.icpPages.slice(0, 4), '/i-am-a'),
      viewAllLabel: '...More',
      viewAllHref: '/i-am-a',
    })
  } else {
    cols.push(fallbackSolutionColumns[1])
  }

  // Column 3: Firm Type -> /firm-types/[slug]
  if (data.firmTypes && data.firmTypes.length > 0) {
    cols.push({
      heading: 'FIRM TYPE',
      items: mapToItems(data.firmTypes.slice(0, 4), '/firm-types'),
      viewAllLabel: '...More',
      viewAllHref: '/firm-types',
    })
  } else {
    cols.push(fallbackSolutionColumns[2])
  }

  return cols
}

/* ------------------------------------------------------------------ */
/*  Resources Dropdown Data — FLAT LIST, NO COLUMN HEADERS             */
/* ------------------------------------------------------------------ */

const resourceItems: NavItem[] = [
  { title: 'Blog', description: 'Industry insights and updates', href: '/blog', icon: '\u25A0', iconBg: 'bg-green-900/40' },
  { title: 'Tutorials', description: 'Step-by-step guides', href: 'https://www.youtube.com/@brightwave', icon: '\u25A0', iconBg: 'bg-purple-900/40' },
  { title: 'Knowledge Base', description: 'Complete documentation', href: '/knowledge-base', icon: '\u25A0', iconBg: 'bg-blue-900/40' },
  { title: 'Tools & Guides', description: 'Practical resources', href: '/tools-guides', icon: '\u25A0', iconBg: 'bg-orange-900/40' },
  { title: 'Comparisons', description: 'See how we stack up', href: '/comparisons', icon: '\u25A0', iconBg: 'bg-cyan-900/40' },
  { title: 'Release Notes', description: 'Latest product updates', href: '/release-notes', icon: '\u25A0', iconBg: 'bg-indigo-900/40' },
  { title: 'Engineering Log', description: 'Behind the scenes', href: '/engineering-log', icon: '\u25A0', iconBg: 'bg-slate-700/60' },
  { title: 'Virtual Events', description: 'Webinars and workshops', href: '/virtual-events', icon: '\u25A0', iconBg: 'bg-red-900/40' },
  { title: 'Support', description: 'Get help when you need it', href: '/support', icon: '\u25A0', iconBg: 'bg-emerald-900/40' },
]

/* ------------------------------------------------------------------ */
/*  SVG Icons                                                          */
/* ------------------------------------------------------------------ */

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Nav Item with Icon                                                 */
/* ------------------------------------------------------------------ */

function NavItemRow({ item }: { item: NavItem }) {
  const isExternal = item.href.startsWith('http')
  const LinkComponent = isExternal ? 'a' : Link
  const extraProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <LinkComponent
      href={item.href}
      className="group flex items-start gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 hover:bg-[#333335]"
      {...extraProps}
    >
      {item.icon && (
        <span className={`mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${item.iconBg} text-sm`}>
          {item.icon}
        </span>
      )}
      <div className="min-w-0">
        <span className="block text-sm font-semibold text-white group-hover:text-white transition-colors">
          {item.title}
        </span>
        <span className="block text-xs text-bw-gray-300 leading-tight mt-0.5 group-hover:text-bw-gray-200 transition-colors">
          {item.description}
        </span>
      </div>
    </LinkComponent>
  )
}

function NavItemRowPlain({ item }: { item: NavItem }) {
  return (
    <Link
      href={item.href}
      className="group block rounded-lg px-3 py-2.5 transition-all duration-200 hover:bg-[#333335]"
    >
      <span className="block text-sm font-semibold text-white group-hover:text-white transition-colors">
        {item.title}
      </span>
      {item.description && (
        <span className="block text-xs text-bw-gray-300 leading-tight mt-0.5 group-hover:text-bw-gray-200 transition-colors">
          {item.description}
        </span>
      )}
    </Link>
  )
}

/* ------------------------------------------------------------------ */
/*  Column Renderer                                                    */
/* ------------------------------------------------------------------ */

function ColumnRenderer({ column, plain }: { column: NavColumn; plain?: boolean }) {
  const ItemComponent = plain ? NavItemRowPlain : NavItemRow
  return (
    <div className="flex flex-col">
      <span className="px-3 pb-3 text-xs font-semibold tracking-wider text-[#e7e70d] uppercase">
        {column.heading}
      </span>
      <div className="flex flex-col gap-0.5">
        {column.items.map((item) => (
          <ItemComponent key={item.href} item={item} />
        ))}
      </div>
      {column.viewAllLabel && column.viewAllHref && (
        <Link
          href={column.viewAllHref}
          className="mt-3 px-3 text-xs font-medium text-bw-gray-300 hover:text-[#e7e70d] transition-colors"
        >
          {column.viewAllLabel}
        </Link>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Platform Dropdown Panel                                            */
/* ------------------------------------------------------------------ */

function PlatformPanel() {
  return (
    <div className="grid grid-cols-4 gap-6 p-6" style={{ minWidth: '820px' }}>
      {platformColumns.map((col) => (
        <ColumnRenderer key={col.heading} column={col} />
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Solutions Dropdown Panel                                           */
/*  ONE card only: Private Markets. NO "Solution" badge.               */
/* ------------------------------------------------------------------ */

function SolutionsPanel({ solutionColumns }: { solutionColumns: NavColumn[] }) {
  return (
    <div className="p-6" style={{ minWidth: '820px' }}>
      {/* Top: Single Private Markets card -- NO "Solution" badge */}
      <div className="mb-6">
        <Link
          href="/products/private-markets"
          className="group relative block rounded-lg border border-[#414142] bg-[#282829] p-6 transition-all hover:border-[#e7e70d] hover:bg-[#282829]"
        >
          <div>
            <h3 className="text-lg font-semibold text-white transition-colors">Private Markets</h3>
            <p className="mt-1 text-sm text-bw-gray-300 transition-colors">For PE, VC, and alternative investors</p>
          </div>
        </Link>
      </div>

      {/* Divider */}
      <div className="border-t border-[#414142] mb-6" />

      {/* Bottom: 3 columns */}
      <div className="grid grid-cols-3 gap-6">
        {solutionColumns.map((col) => (
          <ColumnRenderer key={col.heading} column={col} plain />
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Resources Dropdown Panel — FLAT LIST, NO COLUMN HEADERS            */
/* ------------------------------------------------------------------ */

function ResourcesPanel() {
  return (
    <div className="p-6" style={{ minWidth: '600px' }}>
      <div className="grid grid-cols-3 gap-1">
        {resourceItems.map((item) => (
          <NavItemRow key={item.href} item={item} />
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Desktop Dropdown Wrapper                                           */
/* ------------------------------------------------------------------ */

type DropdownKey = 'platform' | 'solutions' | 'resources'

function DesktopDropdown({
  label,
  panelKey,
  isOpen,
  onOpen,
  onClose,
  solutionColumns,
}: {
  label: string
  panelKey: DropdownKey
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  solutionColumns?: NavColumn[]
}) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    onOpen()
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(onClose, 200)
  }

  const renderPanel = () => {
    switch (panelKey) {
      case 'platform':
        return <PlatformPanel />
      case 'solutions':
        return <SolutionsPanel solutionColumns={solutionColumns ?? fallbackSolutionColumns} />
      case 'resources':
        return <ResourcesPanel />
    }
  }

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button
        className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-colors ${
          isOpen
            ? 'text-bw-gray-800'
            : 'text-bw-gray-600 hover:text-bw-gray-800'
        }`}
        onClick={() => (isOpen ? onClose() : onOpen())}
      >
        {label}
        <ChevronDown className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3">
          <div className="rounded-xl border border-[#333335] bg-[#1a1a1a] shadow-2xl">
            {renderPanel()}
          </div>
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Mobile Menu                                                        */
/* ------------------------------------------------------------------ */

function MobileMenu({
  isOpen,
  onClose,
  solutionColumns,
}: {
  isOpen: boolean
  onClose: () => void
  solutionColumns: NavColumn[]
}) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-40 bg-white lg:hidden">
      <div className="flex h-full flex-col overflow-y-auto">
        <div className="flex items-center justify-between border-b border-bw-gray-200 px-5 py-3">
          <Link href="/" onClick={onClose}>
            <BrightwaveLogo className="h-6 text-bw-gray-800" />
          </Link>
          <button onClick={onClose} className="p-2 text-bw-gray-800">
            <CloseIcon />
          </button>
        </div>

        <nav className="flex-1 px-5 py-6">
          {/* Platform */}
          <MobileSection title="Platform" expanded={expandedSection === 'platform'} onToggle={() => setExpandedSection(expandedSection === 'platform' ? null : 'platform')}>
            {platformColumns.map((col) => (
              <div key={col.heading} className="mb-4">
                <span className="text-xs font-semibold tracking-wider text-bw-gray-500 uppercase">{col.heading}</span>
                {col.items.map((item) => (
                  <Link key={item.href} href={item.href} className="block py-1.5 text-sm text-bw-gray-600 hover:text-bw-gray-800" onClick={onClose}>
                    {item.title}
                  </Link>
                ))}
              </div>
            ))}
          </MobileSection>

          {/* Solutions */}
          <MobileSection title="Solutions" expanded={expandedSection === 'solutions'} onToggle={() => setExpandedSection(expandedSection === 'solutions' ? null : 'solutions')}>
            <Link href="/products/private-markets" className="block py-1.5 text-sm font-semibold text-bw-gray-800 hover:text-bw-yellow-600" onClick={onClose}>
              Private Markets
            </Link>
            <div className="my-2 border-t border-bw-gray-200" />
            {solutionColumns.map((col) => (
              <div key={col.heading} className="mb-3">
                <span className="text-xs font-semibold tracking-wider text-bw-gray-500 uppercase">{col.heading}</span>
                {col.items.map((item) => (
                  <Link key={item.href} href={item.href} className="block py-1.5 text-sm text-bw-gray-600 hover:text-bw-gray-800" onClick={onClose}>
                    {item.title}
                  </Link>
                ))}
              </div>
            ))}
          </MobileSection>

          {/* Customers */}
          <Link href="/case-studies" className="block border-b border-bw-gray-200 py-4 text-lg font-medium text-bw-gray-800" onClick={onClose}>
            Customers
          </Link>

          {/* Resources -- flat list in mobile too */}
          <MobileSection title="Resources" expanded={expandedSection === 'resources'} onToggle={() => setExpandedSection(expandedSection === 'resources' ? null : 'resources')}>
            {resourceItems.map((item) => {
              const isExternal = item.href.startsWith('http')
              if (isExternal) {
                return (
                  <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" className="block py-1.5 text-sm text-bw-gray-600 hover:text-bw-gray-800" onClick={onClose}>
                    {item.title}
                  </a>
                )
              }
              return (
                <Link key={item.href} href={item.href} className="block py-1.5 text-sm text-bw-gray-600 hover:text-bw-gray-800" onClick={onClose}>
                  {item.title}
                </Link>
              )
            })}
          </MobileSection>

          <Link href="/pricing" className="block border-b border-bw-gray-200 py-4 text-lg font-medium text-bw-gray-800" onClick={onClose}>
            Pricing
          </Link>
        </nav>

        <div className="border-t border-bw-gray-200 px-5 py-6">
          <div className="flex flex-col gap-3">
            <Link
              href="https://app.brightwave.io/login"
              className="btn-nav btn-nav-filled block text-center"
              onClick={onClose}
            >
              Login
            </Link>
            <Link
              href="/contact"
              className="block text-center border border-[#e7e70d] bg-[#e7e70d] text-[#0f0f0f] px-5 pt-3 pb-[0.6rem] overflow-hidden text-base font-semibold leading-none transition-colors hover:bg-[#c1c10b]"
              onClick={onClose}
            >
              Start Trial
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function MobileSection({
  title,
  expanded,
  onToggle,
  children,
}: {
  title: string
  expanded: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div className="border-b border-bw-gray-200 py-4">
      <button className="flex w-full items-center justify-between text-lg font-medium text-bw-gray-800" onClick={onToggle}>
        {title}
        <ChevronDown className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
      </button>
      {expanded && <div className="mt-3 pl-3">{children}</div>}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Header                                                             */
/* ------------------------------------------------------------------ */

export function HeaderClient({
  caseStudyCount = 0,
  solutionsNavData = null,
}: {
  caseStudyCount?: number
  solutionsNavData?: SolutionsNavData | null
}) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const solutionColumns = buildSolutionColumns(solutionsNavData)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null)
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <>
      <header
        className={`sticky top-0 z-[100] border-b transition-all duration-300 ${
          scrolled
            ? 'border-bw-gray-200 bg-white/95 backdrop-blur-lg'
            : 'border-bw-gray-200 bg-white'
        }`}
        style={{ padding: '0.78125rem 0' }}
      >
        <div className="mx-auto flex max-w-nav-inner items-center justify-between px-5">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0" style={{ width: '9.375rem' }}>
            <BrightwaveLogo className="h-6 w-auto text-bw-gray-800" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-4 lg:flex">
            <DesktopDropdown
              label="Platform"
              panelKey="platform"
              isOpen={openDropdown === 'platform'}
              onOpen={() => setOpenDropdown('platform')}
              onClose={() => setOpenDropdown(null)}
            />
            <DesktopDropdown
              label="Solutions"
              panelKey="solutions"
              isOpen={openDropdown === 'solutions'}
              onOpen={() => setOpenDropdown('solutions')}
              onClose={() => setOpenDropdown(null)}
              solutionColumns={solutionColumns}
            />
            <Link
              href="/case-studies"
              className="px-3 py-1.5 text-sm font-medium text-bw-gray-600 transition-colors hover:text-bw-gray-800"
            >
              Customers
            </Link>
            <DesktopDropdown
              label="Resources"
              panelKey="resources"
              isOpen={openDropdown === 'resources'}
              onOpen={() => setOpenDropdown('resources')}
              onClose={() => setOpenDropdown(null)}
            />
            <Link
              href="/pricing"
              className="px-3 py-1.5 text-sm font-medium text-bw-gray-600 transition-colors hover:text-bw-gray-800"
            >
              Pricing
            </Link>
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden items-center gap-4 lg:flex">
            <Link
              href="https://app.brightwave.io/login"
              className="btn-nav btn-nav-filled"
            >
              Login
            </Link>
            <Link
              href="/contact"
              className="border border-[#e7e70d] bg-[#e7e70d] text-[#0f0f0f] px-5 pt-3 pb-[0.6rem] overflow-hidden text-base font-semibold leading-none transition-colors hover:bg-[#c1c10b] hover:border-[#c1c10b]"
            >
              Start Trial
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="p-2 text-bw-gray-800 lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        solutionColumns={solutionColumns}
      />
    </>
  )
}
