'use client'

import { PortableText, PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity/image'

const slugRouteMap: Record<string, string> = {
  contentPost: '/blog/',
  caseStudy: '/case-studies/',
  useCase: '/use-cases/',
  platformFeature: '/features/',
  firmType: '/firm-types/',
  icpPage: '/i-am-a/',
  comparison: '/comparisons/',
  resourceItem: '/resources/',
  virtualEvent: '/events/',
}

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-bw-gray-800 mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-bw-gray-800 mt-8 mb-3">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold text-bw-gray-800 mt-6 mb-2">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="mb-5 leading-relaxed text-bw-gray-600">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-3 border-bw-yellow-500 pl-5 my-6 text-bw-gray-600 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-5 space-y-2 text-bw-gray-600">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-5 space-y-2 text-bw-gray-600">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-bw-gray-800">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => (
      <code className="bg-bw-gray-75 px-1.5 py-0.5 rounded text-sm text-bw-yellow-600">
        {children}
      </code>
    ),
    highlight: ({ children }) => (
      <mark className="bg-bw-yellow-500/20 text-brand-300 px-1 rounded">{children}</mark>
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
            className="text-bw-yellow-600 underline decoration-bw-yellow-500/40 underline-offset-2 hover:decoration-bw-yellow-500 transition-colors"
          >
            {children}
          </a>
        )
      }
      return (
        <Link
          href={href}
          className="text-bw-yellow-600 underline decoration-bw-yellow-500/40 underline-offset-2 hover:decoration-bw-yellow-500 transition-colors"
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
          className="text-bw-yellow-600 underline decoration-bw-yellow-500/40 underline-offset-2 hover:decoration-bw-yellow-500 transition-colors"
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
            <figcaption className="mt-2 text-sm text-bw-gray-500 text-center">
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
          <p className="text-sm text-bw-gray-600">{value?.body}</p>
        </aside>
      )
    },
    codeBlock: ({ value }) => (
      <pre className="bg-bw-gray-75 border border-bw-gray-200 rounded-lg p-4 overflow-x-auto my-6">
        <code className="text-sm text-bw-gray-600">{value?.code}</code>
      </pre>
    ),
    ctaBlock: ({ value }) => {
      const styleClasses: Record<string, string> = {
        primary: 'bg-bw-yellow-500 text-bw-gray-800 hover:bg-bw-yellow-550',
        secondary: 'bg-bw-gray-75 text-bw-gray-800 border border-bw-gray-200 hover:bg-bw-gray-700',
        ghost: 'text-bw-yellow-600 hover:bg-bw-yellow-500/10',
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
