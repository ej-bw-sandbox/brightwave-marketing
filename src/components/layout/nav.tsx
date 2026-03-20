import Link from 'next/link'

const navItems = [
  { label: 'Platform', href: '/platform' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Use Cases', href: '/use-cases' },
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Resources', href: '/resources' },
  { label: 'Blog', href: '/blog' },
]

export function Nav() {
  return (
    <nav className="hidden md:flex items-center gap-6">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-sm text-text-secondary hover:text-text-primary transition-colors"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
