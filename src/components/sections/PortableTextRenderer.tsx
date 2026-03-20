'use client'

import { PortableText, PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity/image'

const slugRouteMap: Record<string, string> = {
  blogPost: '/blog/',
  caseStudy: '/case-studies/',
  useCase: '/use-cases/',
  platformFeature: '/features/',
  firmType: '/solutions/',
  icpPage: '/for/',
  comparison: '/vs/',
  resourceItem: '/resources/',
  virtualEvent: '/events/',
  newsPost: '/news/',
}

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-text-primary mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-text-primary mt-8 mb-3">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold text-text-primary mt-6 mb-2">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="mb-5 leading-relaxed text-text-secondary">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-3 border-brand-400 pl-5 my-6 text-neutral-300 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-5 space-y-2 text-text-secondary">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-5 space-y-2 text-text-secondary">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-text-primary">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => (
      <code className="bg-surface-overlay px-1.5 py-0.5 rounded text-sm text-brand-400">
        {children}
      </code>
    ),
    highlight: ({ children }) => (
      <mark className="bg-brand-400/20 text-brand-300 px-1 rounded">{children}</mark>
    ),
    link: ({ children, value }) => {
      const href = value?.href || '#'
      const isExternal = href.startsWith('http')
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-400 underline decoration-brand-400/40 underline-offset-2 hover:decoration-brand-400 transition-colors"
          >
            {children}
          </a>
        )
      }
      return (
        <Link
          href={href}
          className="text-brand-400 underline decoration-brand-400/40 underline-offset-2 hover:decoration-brand-400 transition-colors"
        >
          {children}
        </Link>
      )
    },
    internalLink: ({ children, value }) => {
      const ref = value?.reference
      if (!ref) return <span>{children}</span>
      const basePath = slugRouteMap[ref._type] || '/'
      const slug = ref.slug?.current || ''
      return (
        <Link
          href={`${basePath}${slug}`}
          className="text-brand-400 underline decoration-brand-400/40 underline-offset-2 hover:decoration-brand-400 transition-colors"
        >
          {children}
        </Link>
      )
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      const imageUrl = urlFor(value).width(960).quality(85).url()
      return (
        <figure className="my-8">
          <Image
            src={imageUrl}
            alt={value.alt || ''}
            width={960}
            height={540}
            className="rounded-lg w-full"
          />
          {value.caption && (
            <figcaption className="mt-2 text-sm text-text-muted text-center">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
    callout: ({ value }) => {
      const toneStyles: Record<string, string> = {
        info: 'border-info/40 bg-info/5',
        warning: 'border-warning/40 bg-warning/5',
        tip: 'border-success/40 bg-success/5',
      }
      const tone = value?.tone || 'info'
      return (
        <aside
          className={`border-l-3 pl-4 py-3 my-6 rounded-r-md ${toneStyles[tone] || toneStyles.info}`}
        >
          <p className="text-sm text-text-secondary">{value?.body}</p>
        </aside>
      )
    },
    codeBlock: ({ value }) => (
      <pre className="bg-surface-elevated border border-border rounded-lg p-4 overflow-x-auto my-6">
        <code className="text-sm text-neutral-300">{value?.code}</code>
      </pre>
    ),
    ctaBlock: ({ value }) => {
      const styleClasses: Record<string, string> = {
        primary: 'bg-brand-400 text-black hover:bg-brand-500',
        secondary: 'bg-surface-elevated text-text-primary border border-neutral-700 hover:bg-neutral-800',
        ghost: 'text-brand-400 hover:bg-brand-400/10',
      }
      return (
        <div className="my-6">
          <a
            href={value?.url || '#'}
            className={`inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-medium transition-colors ${
              styleClasses[value?.style || 'primary'] || styleClasses.primary
            }`}
          >
            {value?.label}
          </a>
        </div>
      )
    },
  },
}

interface PortableTextRendererProps {
  value: any[] | undefined | null
  className?: string
}

export function PortableTextRenderer({ value, className }: PortableTextRendererProps) {
  if (!value || value.length === 0) return null

  return (
    <div className={className || 'prose-brand'}>
      <PortableText value={value} components={components} />
    </div>
  )
}
