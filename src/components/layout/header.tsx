import Link from 'next/link'
import { Nav } from './nav'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800 bg-surface/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold text-brand-400">
          Brightwave
        </Link>
        <Nav />
        <div className="flex items-center gap-3">
          <Link
            href="https://app.brightwave.io"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/contact"
            className="rounded-md bg-brand-400 px-4 py-2 text-sm font-medium text-black hover:bg-brand-500 transition-colors"
          >
            Get a Demo
          </Link>
        </div>
      </div>
    </header>
  )
}
