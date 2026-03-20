import Link from 'next/link'

const footerColumns = [
  {
    title: 'Product',
    links: [
      { label: 'Platform', href: '/platform' },
      { label: 'Features', href: '/features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Security', href: '/security' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'By Firm Type', href: '/solutions' },
      { label: 'By Role', href: '/for' },
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'Case Studies', href: '/case-studies' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'News', href: '/news' },
      { label: 'Events', href: '/events' },
      { label: 'Changelog', href: '/changelog' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Enterprise', href: '/enterprise' },
      { label: 'Privacy Policy', href: '/legal/privacy-policy' },
      { label: 'Terms of Use', href: '/legal/terms-of-use' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-text-primary mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-neutral-800 text-center text-sm text-text-secondary">
          &copy; {new Date().getFullYear()} Brightwave. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
