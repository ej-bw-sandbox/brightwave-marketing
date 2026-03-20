import Link from 'next/link'

function ArrowSvg() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_774_4073)">
        <path d="M2.27832 1.625L12.3577 1.44906L12.5325 11.4643" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel"/>
        <path d="M12.3563 1.44945L1.48389 12.6365" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel"/>
      </g>
      <defs>
        <clipPath id="clip0_774_4073">
          <rect width="12" height="11.9237" fill="white" transform="translate(0.896484 1.10547) rotate(-1)"/>
        </clipPath>
      </defs>
    </svg>
  )
}

interface CtaButtonProps {
  label: string
  href: string
  variant?: 'primary' | 'outline'
  size?: 'default' | 'big'
}

export function CtaButton({ label, href, variant = 'primary', size = 'default' }: CtaButtonProps) {
  const baseClass = variant === 'primary' ? 'cta-primary' : 'cta-outline'
  const textClass = size === 'big' ? 'c-text-link cc-stagger-cta text-[2rem]' : 'cta-label'
  const isExternal = href.startsWith('http')

  const inner = (
    <>
      <span className={textClass}>{label}</span>
      <div className="cta-dot">
        <div className="cta-dot-bg" />
      </div>
      <div className="cta-arrow-wrap">
        <span className="cta-arrow">
          <ArrowSvg />
        </span>
      </div>
    </>
  )

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={baseClass}>
        {inner}
      </a>
    )
  }

  return (
    <Link href={href} className={baseClass}>
      {inner}
    </Link>
  )
}
