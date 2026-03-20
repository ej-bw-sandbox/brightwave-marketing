import Link from 'next/link'

const footerLinks = {
  Solutions: [
    { label: 'Private Markets', href: '/products/private-markets' },
    { label: 'Use Cases', href: '/use-cases' },
    { label: 'Firm Types', href: '/firm-types' },
    { label: 'Roles', href: '/i-am-a' },
  ],
  Platform: [
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Security', href: '/security' },
  ],
  Resources: [
    { label: 'Blog', href: '/blog' },
    { label: 'Comparisons', href: '/comparisons' },
    { label: 'Release Notes', href: '/release-notes' },
    { label: 'Engineering Log', href: '/engineering-log' },
    { label: 'Support', href: '/support' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'News', href: '/news' },
    { label: 'Careers', href: 'https://www.linkedin.com/company/brightwaveio/jobs/' },
    { label: 'Contact', href: '/contact' },
  ],
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="c-section cc-footer">
      <div className="c-container">
        <div className="bg-bw-gray-700 rounded-2xl flex flex-col relative overflow-hidden">
          {/* Decorative grid lines */}
          <div className="absolute inset-0 z-[4] grid grid-cols-4 pointer-events-none">
            <div className="border-l border-bw-yellow-500/20" />
            <div />
            <div />
            <div className="border-r border-bw-yellow-500/20" />
          </div>

          {/* Content */}
          <div className="z-50 text-[#d9d9d9] flex flex-col lg:flex-row justify-between items-start p-10 relative gap-10">
            {/* Left: tagline + CTA */}
            <div className="flex flex-col gap-12 max-w-text">
              <p className="c-text-1 text-[#d9d9d9]">
                Professional-grade AI for the world&apos;s most complex challenges.
              </p>
              <Link
                href="/contact"
                className="inline-flex justify-start items-end pt-8 pr-12 pb-2.5 pl-2.5 relative overflow-hidden min-w-[10.625rem] border border-[#d9d9d9] group self-start"
              >
                <span className="text-base font-semibold leading-none tracking-[0.01em] text-[#d9d9d9]">
                  Contact us
                </span>
                <div className="absolute top-3 right-3 w-[4.5px] h-[4.5px]">
                  <div className="bg-[#d9d9d9] w-full h-full absolute inset-0 rounded-full transition-transform duration-[0.4s] ease-stagger group-hover:scale-[60] transform-origin-center" />
                </div>
                <div className="absolute top-2.5 right-2.5 w-6 h-6 flex items-center justify-center">
                  <span className="text-bw-gray-700 opacity-0 group-hover:opacity-100 transition-opacity z-[5] absolute">
                    <ArrowIcon />
                  </span>
                </div>
              </Link>
            </div>

            {/* Right: link columns */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-10">
              {Object.entries(footerLinks).map(([category, links]) => (
                <div key={category} className="flex flex-col gap-5">
                  <span className="c-text-link text-[#d9d9d9]">{category}</span>
                  <div className="flex flex-col gap-2.5">
                    {links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="c-text-5 text-bw-gray-300 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="z-50 relative flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-bw-gray-200 px-10 py-6 text-sm text-bw-gray-300">
            <p>{new Date().getFullYear()} Brightwave, Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-use" className="hover:text-white transition-colors">
                Terms of Use
              </Link>
            </div>
          </div>

          {/* Large BRIGHTWAVE wordmark at bottom */}
          <div className="relative z-[11] overflow-hidden px-5 pb-5">
            <svg viewBox="0 0 1400 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto opacity-10">
              <text x="0" y="100" fill="#d9d9d9" fontSize="120" fontWeight="700" fontFamily="PST Mail Sans, sans-serif" letterSpacing="-0.02em">
                BRIGHTWAVE
              </text>
            </svg>
          </div>
        </div>
      </div>
    </footer>
  )
}
