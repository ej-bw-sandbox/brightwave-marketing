'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { BrightwaveLogo } from './logo'

/* ------------------------------------------------------------------ */
/*  Navigation Data                                                    */
/* ------------------------------------------------------------------ */

interface NavDropdownItem {
  title: string
  href: string
  description?: string
  external?: boolean
}

interface NavDropdown {
  label: string
  items: NavDropdownItem[]
}

const dropdowns: NavDropdown[] = [
  {
    label: 'Platform',
    items: [
      {
        title: 'Investment Intelligence Engine',
        href: '/investment-intelligence-engine',
        description: 'AI-powered research and analysis for investment professionals',
      },
      {
        title: 'Enterprise Security & Compliance',
        href: '/enterprise-security-compliance',
        description: 'SOC 2 Type II certified infrastructure built for institutional data',
      },
    ],
  },
  {
    label: 'Solutions',
    items: [
      {
        title: 'Private Markets',
        href: '/private-markets-platform',
        description: 'Due diligence, deal screening, and portfolio monitoring at scale',
      },
      {
        title: 'Public Markets',
        href: '/public-markets-platform',
        description: 'Earnings analysis, sector research, and investment thesis generation',
      },
    ],
  },
  {
    label: 'Company',
    items: [
      {
        title: 'About',
        href: '/about',
        description: 'Our mission to transform investment research',
      },
      {
        title: 'Careers',
        href: 'https://www.linkedin.com/company/brightwaveio/jobs/',
        external: true,
        description: 'Join the team building the future of financial AI',
      },
      {
        title: 'News',
        href: '/news',
        description: 'Latest updates and press coverage',
      },
    ],
  },
]

const standaloneLinks = [
  { label: 'Blog', href: '/blog' },
]

/* ------------------------------------------------------------------ */
/*  Arrow icon                                                         */
/* ------------------------------------------------------------------ */

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M1 1L5 5L9 1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M3 8H13M13 8L9 4M13 8L9 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
/*  Desktop Dropdown                                                   */
/* ------------------------------------------------------------------ */

function DesktopDropdown({
  dropdown,
  isOpen,
  onOpen,
  onClose,
}: {
  dropdown: NavDropdown
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

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="flex items-center gap-1.5 text-sm font-medium text-bw-gray-200 transition-colors hover:text-bw-gray-50"
        onClick={() => (isOpen ? onClose() : onOpen())}
      >
        {dropdown.label}
        <ChevronDown
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3">
          <div className="rounded-lg border border-bw-gray-600 bg-bw-gray-700 p-5 shadow-2xl">
            <div className="flex gap-3" style={{ minWidth: dropdown.items.length > 2 ? '540px' : '420px' }}>
              {dropdown.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className="group flex flex-1 flex-col justify-between rounded-lg border border-bw-gray-600 bg-bw-gray-800 p-5 transition-colors hover:border-bw-gray-300 hover:bg-bw-gray-700"
                  onClick={onClose}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-base font-semibold text-bw-gray-50">
                        {item.title}
                      </span>
                      <ArrowRight className="h-4 w-4 text-bw-gray-300 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </div>
                    {item.description && (
                      <p className="mt-2 text-sm leading-relaxed text-bw-gray-300">
                        {item.description}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
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
          {dropdowns.map((dropdown) => (
            <div key={dropdown.label} className="border-b border-bw-gray-600 py-4">
              <button
                className="flex w-full items-center justify-between text-lg font-medium text-bw-gray-50"
                onClick={() =>
                  setExpandedSection(
                    expandedSection === dropdown.label ? null : dropdown.label
                  )
                }
              >
                {dropdown.label}
                <ChevronDown
                  className={`transition-transform duration-200 ${
                    expandedSection === dropdown.label ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {expandedSection === dropdown.label && (
                <div className="mt-3 flex flex-col gap-2 pl-3">
                  {dropdown.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      className="rounded-md px-3 py-2 text-base text-bw-gray-200 transition-colors hover:bg-bw-gray-700 hover:text-bw-gray-50"
                      onClick={onClose}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {standaloneLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block border-b border-bw-gray-600 py-4 text-lg font-medium text-bw-gray-50"
              onClick={onClose}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-bw-gray-600 px-5 py-6">
          <div className="flex flex-col gap-3">
            <Link
              href="/pricing"
              className="block text-center text-base font-medium text-bw-gray-50"
              onClick={onClose}
            >
              Pricing
            </Link>
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
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Header                                                             */
/* ------------------------------------------------------------------ */

export function Header() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdown on Escape
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
          <nav className="hidden items-center gap-6 lg:flex">
            {dropdowns.map((dropdown) => (
              <DesktopDropdown
                key={dropdown.label}
                dropdown={dropdown}
                isOpen={openDropdown === dropdown.label}
                onOpen={() => setOpenDropdown(dropdown.label)}
                onClose={() => setOpenDropdown(null)}
              />
            ))}

            {standaloneLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-bw-gray-200 transition-colors hover:text-bw-gray-50"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/pricing"
              className="text-sm font-medium text-bw-gray-200 transition-colors hover:text-bw-gray-50"
            >
              Pricing
            </Link>
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
              Get Started
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
