import Link from 'next/link'

function CtaSmArrow() {
  return (
    <div className="svg cta-sm-arrow w-embed">
      <svg width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_774_4073)">
          <path d="M2.27832 1.625L12.3577 1.44906L12.5325 11.4643" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel"></path>
          <path d="M12.3563 1.44945L1.48389 12.6365" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel"></path>
        </g>
        <defs>
          <clipPath id="clip0_774_4073">
            <rect width={12} height="11.9237" fill="white" transform="translate(0.896484 1.10547) rotate(-1)"></rect>
          </clipPath>
        </defs>
      </svg>
    </div>
  )
}

interface CtaButtonProps {
  label: string
  href: string
  variant?: 'primary' | 'outline'
  size?: 'default' | 'big'
}

export function CtaButton({ label, href, variant = 'primary', size = 'default' }: CtaButtonProps) {
  const baseClass = variant === 'primary' ? 'cta-p-sm w-inline-block' : 'cta-p-sm cc-stroke w-inline-block'
  const isExternal = href.startsWith('http')

  const inner = (
    <>
      <div>
        <div className="c-text-link cc-stagger-cta">{label}</div>
      </div>
      <div className="flip-small">
        <div className="flip-bg"></div>
      </div>
      <div className="flip-big">
        <CtaSmArrow />
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
