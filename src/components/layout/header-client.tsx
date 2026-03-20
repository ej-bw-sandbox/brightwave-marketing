'use client'

import Link from 'next/link'
import { useState, useEffect, useRef, useCallback } from 'react'
import { BrightwaveLogo } from './logo'

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
/*  Platform Dropdown Data                                             */
/* ------------------------------------------------------------------ */

const platformColumns: NavColumn[] = [
  {
    heading: 'CREATE',
    items: [
      { title: 'Presentations', description: 'Build investor-grade decks', href: '/features/presentations', icon: '\uD83D\uDCCA', iconBg: 'bg-blue-900/40' },
      { title: 'Reports', description: 'Generate deep analysis reports', href: '/features/reports', icon: '\uD83D\uDCC4', iconBg: 'bg-purple-900/40' },
      { title: 'Artifacts', description: 'Charts, tables, and visuals', href: '/features/artifacts', icon: '\u2705', iconBg: 'bg-green-900/40' },
      { title: 'Excel/Spreadsheets', description: 'Data analysis tools', href: '/features/excel-spreadsheets', icon: '\uD83D\uDCDD', iconBg: 'bg-gray-700/60' },
    ],
    viewAllLabel: '...More',
    viewAllHref: '/features#create',
  },
  {
    heading: 'ANALYZE',
    items: [
      { title: 'Extraction Grid', description: 'Pull data from documents', href: '/features/extraction-grid', icon: '\uD83D\uDD0D', iconBg: 'bg-teal-900/40' },
      { title: 'Web Search', description: 'Real-time information', href: '/features/web-search', icon: '\uD83C\uDF10', iconBg: 'bg-cyan-900/40' },
      { title: 'Public Markets Data', description: 'Financial market insights', href: '/features/public-markets-data', icon: '\uD83D\uDCC8', iconBg: 'bg-emerald-900/40' },
    ],
    viewAllLabel: '...More',
    viewAllHref: '/features#analyze',
  },
  {
    heading: 'PRODUCTIVITY',
    items: [
      { title: 'Quick Prompts', description: 'Save time with shortcuts', href: '/features/quick-prompts', icon: '\u26A1', iconBg: 'bg-yellow-900/40' },
      { title: 'Templates', description: 'Reusable blueprints', href: '/features/templates', icon: '\uD83D\uDCC1', iconBg: 'bg-slate-700/60' },
      { title: 'Custom Instructions', description: 'Personalized AI behavior', href: '/features/custom-instructions', icon: '\uD83C\uDFA8', iconBg: 'bg-pink-900/40' },
    ],
    viewAllLabel: '...More',
    viewAllHref: '/features#productivity',
  },
  {
    heading: 'COLLABORATE',
    items: [
      { title: 'Team Collaboration', description: 'Work together seamlessly', href: '/features/team-collaboration', icon: '\uD83D\uDC65', iconBg: 'bg-indigo-900/40' },
      { title: 'Sharing', description: 'Share work with anyone', href: '/features/sharing', icon: '\uD83D\uDD17', iconBg: 'bg-violet-900/40' },
      { title: 'Integrations', description: 'Connect your tools', href: '/features/integrations', icon: '\uD83D\uDD27', iconBg: 'bg-orange-900/40' },
    ],
    viewAllLabel: '...More',
    viewAllHref: '/features#collaborate',
  },
]

/* ------------------------------------------------------------------ */
/*  Solutions Dropdown Data                                            */
/* ------------------------------------------------------------------ */

const solutionCards = [
  {
    title: 'Private Markets',
    description: 'For PE, VC, and alternative investors',
    href: '/solutions/private-markets',
    tag: 'Solution',
    featured: true,
  },
  {
    title: 'Research',
    description: 'For research teams and analysts',
    href: '/solutions/research',
    tag: null,
    featured: false,
  },
]

const solutionColumns: NavColumn[] = [
  {
    heading: 'FOR',
    items: [
      { title: 'Buy Out', description: 'Traditional buyout strategies', href: '/firm-types/buy-out', icon: '', iconBg: '' },
      { title: 'Growth', description: 'Growth equity investing', href: '/firm-types/growth', icon: '', iconBg: '' },
      { title: 'VC', description: 'Venture capital firms', href: '/firm-types/vc', icon: '', iconBg: '' },
      { title: 'Wealth Management', description: 'Private wealth solutions', href: '/firm-types/wealth-management', icon: '', iconBg: '' },
    ],
    viewAllLabel: '...More',
    viewAllHref: '/firm-types',
  },
  {
    heading: 'I AM A...',
    items: [
      { title: 'Associate', description: 'Entry-level professionals', href: '/i-am-a/associate', icon: '', iconBg: '' },
      { title: 'Manager', description: 'Deal team managers', href: '/i-am-a/manager', icon: '', iconBg: '' },
      { title: 'Principal/Director', description: 'Senior investment professionals', href: '/i-am-a/principal-director', icon: '', iconBg: '' },
      { title: 'VP/MD', description: 'Investment leadership', href: '/i-am-a/vp-md', icon: '', iconBg: '' },
    ],
    viewAllLabel: '...More',
    viewAllHref: '/i-am-a',
  },
  {
    heading: 'INDUSTRIES',
    items: [
      { title: 'Lower Middle Market', description: '$10M-$100M deals', href: '/use-cases/lower-middle-market', icon: '', iconBg: '' },
      { title: 'Middle Market', description: '$100M-$500M deals', href: '/use-cases/middle-market', icon: '', iconBg: '' },
      { title: 'Large Fund', description: '$500M-$2B AUM', href: '/use-cases/large-fund', icon: '', iconBg: '' },
      { title: 'Mega Fund', description: '$2B+ AUM', href: '/use-cases/mega-fund', icon: '', iconBg: '' },
    ],
    viewAllLabel: '...More',
    viewAllHref: '/use-cases',
  },
]

/* ------------------------------------------------------------------ */
/*  Resources Dropdown Data                                            */
/* ------------------------------------------------------------------ */

const resourceColumns: NavColumn[] = [
  {
    heading: 'LEARN',
    items: [
      { title: 'Blog', description: 'Industry insights and updates', href: '/blog', icon: '\uD83D\uDCF0', iconBg: 'bg-green-900/40' },
      { title: 'Tutorials', description: 'Step-by-step guides', href: '/tutorials', icon: '\uD83C\uDF93', iconBg: 'bg-purple-900/40' },
      { title: 'Knowledge Base', description: 'Complete documentation', href: '/knowledge-base', icon: '\uD83D\uDCDA', iconBg: 'bg-blue-900/40' },
    ],
  },
  {
    heading: 'RESOURCES',
    items: [
      { title: 'Tools & Guides', description: 'Practical resources', href: '/tools-guides', icon: '\uD83D\uDEE0\uFE0F', iconBg: 'bg-orange-900/40' },
      { title: 'Comparisons', description: 'See how we stack up', href: '/comparisons', icon: '\uD83D\uDCCA', iconBg: 'bg-cyan-900/40' },
      { title: 'Changelog', description: 'Latest product updates', href: '/changelog', icon: '\uD83D\uDCCB', iconBg: 'bg-indigo-900/40' },
    ],
  },
  {
    heading: 'CONNECT',
    items: [
      { title: 'Virtual Events', description: 'Webinars and workshops', href: '/virtual-events', icon: '\uD83C\uDF99\uFE0F', iconBg: 'bg-red-900/40' },
      { title: 'Support', description: 'Get help when you need it', href: '/support', icon: '\uD83D\uDCAC', iconBg: 'bg-emerald-900/40' },
    ],
  },
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
  return (
    <Link
      href={item.href}
      className="group flex items-start gap-3 rounded-md px-2 py-1.5 transition-colors hover:bg-bw-gray-600/50"
    >
      {item.icon && (
        <span className={`mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${item.iconBg} text-sm`}>
          {item.icon}
        </span>
      )}
      <div className="min-w-0">
        <span className="block text-sm font-semibold text-bw-gray-50 group-hover:text-bw-yellow-500 transition-colors">
          {item.title}
        </span>
        <span className="block text-xs text-bw-gray-300 leading-tight mt-0.5">
          {item.description}
        </span>
      </div>
    </Link>
  )
}

function NavItemRowPlain({ item }: { item: NavItem }) {
  return (
    <Link
      href={item.href}
      className="group block rounded-md px-2 py-2 transition-colors hover:bg-bw-gray-600/50"
    >
      <span className="block text-sm font-semibold text-bw-gray-50 group-hover:text-bw-yellow-500 transition-colors">
        {item.title}
      </span>
      <span className="block text-xs text-bw-gray-300 leading-tight mt-0.5">
        {item.description}
      </span>
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
      <span className="px-2 pb-3 text-xs font-semibold tracking-wider text-bw-yellow-500 uppercase">
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
          className="mt-3 px-2 text-xs font-medium text-bw-gray-300 hover:text-bw-yellow-500 transition-colors"
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
/* ------------------------------------------------------------------ */

function SolutionsPanel() {
  return (
    <div className="p-6" style={{ minWidth: '820px' }}>
      {/* Top: Solution cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {solutionCards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className={`group relative block rounded-xl border p-6 transition-colors ${
              card.featured
                ? 'border-bw-yellow-500 bg-bw-gray-700/60 hover:bg-bw-gray-600/60'
                : 'border-bw-gray-600 bg-bw-gray-700/40 hover:border-bw-gray-300 hover:bg-bw-gray-600/40'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-bw-gray-50">{card.title}</h3>
                <p className="mt-1 text-sm text-bw-gray-300">{card.description}</p>
              </div>
              {card.tag && (
                <span className="rounded-md px-2 py-0.5 text-xs font-semibold text-bw-yellow-500">
                  {card.tag}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-bw-gray-600 mb-6" />

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
/*  Resources Dropdown Panel                                           */
/* ------------------------------------------------------------------ */

function ResourcesPanel() {
  return (
    <div className="grid grid-cols-3 gap-6 p-6" style={{ minWidth: '700px' }}>
      {resourceColumns.map((col) => (
        <ColumnRenderer key={col.heading} column={col} />
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Desktop Dropdown Wrapper                                           */
/* ------------------------------------------------------------------ */

type DropdownKey = 'platform' | 'solutions' | 'resources'

const panelMap: Record<DropdownKey, () => React.JSX.Element> = {
  platform: PlatformPanel,
  solutions: SolutionsPanel,
  resources: ResourcesPanel,
}

function DesktopDropdown({
  label,
  panelKey,
  isOpen,
  onOpen,
  onClose,
}: {
  label: string
  panelKey: DropdownKey
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    onOpen()
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(onClose, 200)
  }

  const Panel = panelMap[panelKey]

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button
        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
          isOpen
            ? 'bg-bw-gray-700 text-bw-gray-50'
            : 'text-bw-gray-200 hover:text-bw-gray-50'
        }`}
        onClick={() => (isOpen ? onClose() : onOpen())}
      >
        {label}
        <ChevronDown className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3">
          <div className="rounded-xl border border-bw-gray-600 bg-bw-gray-800 shadow-2xl">
            <Panel />
          </div>
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Mobile Menu                                                        */
/* ------------------------------------------------------------------ */

function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-40 bg-bw-gray-800 lg:hidden">
      <div className="flex h-full flex-col overflow-y-auto">
        <div className="flex items-center justify-between border-b border-bw-gray-600 px-5 py-3">
          <Link href="/" onClick={onClose}>
            <BrightwaveLogo className="h-6 text-bw-gray-50" />
          </Link>
          <button onClick={onClose} className="p-2 text-bw-gray-50">
            <CloseIcon />
          </button>
        </div>

        <nav className="flex-1 px-5 py-6">
          {/* Platform */}
          <MobileSection title="Platform" expanded={expandedSection === 'platform'} onToggle={() => setExpandedSection(expandedSection === 'platform' ? null : 'platform')}>
            {platformColumns.map((col) => (
              <div key={col.heading} className="mb-4">
                <span className="text-xs font-semibold tracking-wider text-bw-yellow-500 uppercase">{col.heading}</span>
                {col.items.map((item) => (
                  <Link key={item.href} href={item.href} className="block py-1.5 text-sm text-bw-gray-200 hover:text-bw-gray-50" onClick={onClose}>
                    {item.title}
                  </Link>
                ))}
              </div>
            ))}
          </MobileSection>

          {/* Solutions */}
          <MobileSection title="Solutions" expanded={expandedSection === 'solutions'} onToggle={() => setExpandedSection(expandedSection === 'solutions' ? null : 'solutions')}>
            {solutionCards.map((card) => (
              <Link key={card.href} href={card.href} className="block py-1.5 text-sm font-semibold text-bw-gray-50 hover:text-bw-yellow-500" onClick={onClose}>
                {card.title}
              </Link>
            ))}
            <div className="my-2 border-t border-bw-gray-600" />
            {solutionColumns.map((col) => (
              <div key={col.heading} className="mb-3">
                <span className="text-xs font-semibold tracking-wider text-bw-yellow-500 uppercase">{col.heading}</span>
                {col.items.map((item) => (
                  <Link key={item.href} href={item.href} className="block py-1.5 text-sm text-bw-gray-200 hover:text-bw-gray-50" onClick={onClose}>
                    {item.title}
                  </Link>
                ))}
              </div>
            ))}
          </MobileSection>

          {/* Customers */}
          <Link href="/case-studies" className="block border-b border-bw-gray-600 py-4 text-lg font-medium text-bw-gray-50" onClick={onClose}>
            Customers
          </Link>

          {/* Resources */}
          <MobileSection title="Resources" expanded={expandedSection === 'resources'} onToggle={() => setExpandedSection(expandedSection === 'resources' ? null : 'resources')}>
            {resourceColumns.map((col) => (
              <div key={col.heading} className="mb-4">
                <span className="text-xs font-semibold tracking-wider text-bw-yellow-500 uppercase">{col.heading}</span>
                {col.items.map((item) => (
                  <Link key={item.href} href={item.href} className="block py-1.5 text-sm text-bw-gray-200 hover:text-bw-gray-50" onClick={onClose}>
                    {item.title}
                  </Link>
                ))}
              </div>
            ))}
          </MobileSection>

          <Link href="/pricing" className="block border-b border-bw-gray-600 py-4 text-lg font-medium text-bw-gray-50" onClick={onClose}>
            Pricing
          </Link>
        </nav>

        <div className="border-t border-bw-gray-600 px-5 py-6">
          <div className="flex flex-col gap-3">
            <Link
              href="https://app.brightwave.io/login"
              className="block rounded-md border border-bw-gray-50 px-5 py-2.5 text-center text-base font-medium text-bw-gray-50 transition-colors hover:bg-bw-gray-50 hover:text-bw-gray-800"
              onClick={onClose}
            >
              Login
            </Link>
            <Link
              href="/contact"
              className="block rounded-md bg-bw-yellow-500 px-5 py-2.5 text-center text-base font-medium text-bw-gray-800 transition-colors hover:bg-bw-yellow-550"
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
    <div className="border-b border-bw-gray-600 py-4">
      <button className="flex w-full items-center justify-between text-lg font-medium text-bw-gray-50" onClick={onToggle}>
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

export function HeaderClient({ caseStudyCount = 0 }: { caseStudyCount?: number }) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? 'border-bw-gray-600 bg-bw-gray-800/95 backdrop-blur-lg'
            : 'border-bw-gray-600 bg-bw-gray-800'
        }`}
      >
        <div className="mx-auto flex max-w-[87.5rem] items-center justify-between px-5 py-3">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <BrightwaveLogo className="h-6 w-auto text-bw-gray-50" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 lg:flex">
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
            />
            {caseStudyCount > 0 && (
              <Link
                href="/case-studies"
                className="rounded-full px-3 py-1.5 text-sm font-medium text-bw-gray-200 transition-colors hover:text-bw-gray-50"
              >
                Customers
              </Link>
            )}
            <DesktopDropdown
              label="Resources"
              panelKey="resources"
              isOpen={openDropdown === 'resources'}
              onOpen={() => setOpenDropdown('resources')}
              onClose={() => setOpenDropdown(null)}
            />
            <Link
              href="/pricing"
              className="rounded-full px-3 py-1.5 text-sm font-medium text-bw-gray-200 transition-colors hover:text-bw-gray-50"
            >
              Pricing
            </Link>
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="https://app.brightwave.io/login"
              className="rounded-md border border-bw-gray-50 px-4 py-1.5 text-sm font-medium text-bw-gray-50 transition-colors hover:bg-bw-gray-50 hover:text-bw-gray-800"
            >
              Login
            </Link>
            <Link
              href="/contact"
              className="rounded-md bg-bw-yellow-500 px-4 py-1.5 text-sm font-medium text-bw-gray-800 transition-colors hover:bg-bw-yellow-550"
            >
              Start Trial
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="p-2 text-bw-gray-50 lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </header>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  )
}
