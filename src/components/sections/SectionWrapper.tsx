interface SectionWrapperProps {
  children: React.ReactNode
  id?: string
  className?: string
  background?: 'default' | 'elevated' | 'accent'
  width?: 'default' | 'narrow' | 'wide' | 'full'
}

export function SectionWrapper({
  children,
  id,
  className = '',
  background = 'default',
  width = 'default',
}: SectionWrapperProps) {
  const bgStyles = {
    default: '',
    elevated: 'bg-bw-gray-700',
    accent: 'bg-gradient-to-b from-bw-yellow-500/5 to-transparent',
  }

  const widthStyles = {
    default: 'max-w-7xl',
    narrow: 'max-w-4xl',
    wide: 'max-w-[90rem]',
    full: 'max-w-full',
  }

  return (
    <section id={id} className={`py-section ${bgStyles[background]} ${className}`}>
      <div className={`mx-auto ${widthStyles[width]} px-4 sm:px-6 lg:px-8`}>
        {children}
      </div>
    </section>
  )
}
