import Link from 'next/link'
import { BrightwaveLogo } from './logo'

const footerLinks = {
  Platform: [
    { label: 'Investment Intelligence', href: '/investment-intelligence-engine' },
    { label: 'Security & Compliance', href: '/enterprise-security-compliance' },
    { label: 'Pricing', href: '/pricing' },
  ],
  Solutions: [
    { label: 'Private Markets', href: '/private-markets-platform' },
    { label: 'Public Markets', href: '/public-markets-platform' },
  ],
  Resources: [
    { label: 'Blog', href: '/blog' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'News', href: '/news' },
    { label: 'Comparisons', href: '/comparisons' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Careers', href: 'https://www.linkedin.com/company/brightwaveio/jobs/' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy Policy', href: '/legal/privacy' },
    { label: 'Terms of Service', href: '/legal/terms' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-bw-gray-600 bg-bw-gray-800">
      <div className="mx-auto max-w-site px-5 py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Logo + tagline */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/">
              <BrightwaveLogo className="h-6 text-bw-gray-50" />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-bw-gray-300">
              Research agents built for professionals.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-bw-gray-50">{category}</h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-bw-gray-300 transition-colors hover:text-bw-gray-50"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-bw-gray-600 pt-8 md:flex-row">
          <p className="text-sm text-bw-gray-500">
            {new Date().getFullYear()} Brightwave, Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/legal/privacy" className="text-sm text-bw-gray-500 transition-colors hover:text-bw-gray-300">
              Privacy
            </Link>
            <Link href="/legal/terms" className="text-sm text-bw-gray-500 transition-colors hover:text-bw-gray-300">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
