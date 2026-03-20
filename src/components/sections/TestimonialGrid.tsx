import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'

interface Testimonial {
  quote: string
  attribution?: string
  authorName?: string
  authorImage?: any
  companyLogo?: any
}

function TestimonialCard({ quote, attribution, authorName, authorImage, companyLogo }: Testimonial) {
  return (
    <div className="rounded-lg border border-bw-gray-200 bg-white p-6 flex flex-col">
      <div className="mb-4">
        <svg
          className="h-8 w-8 text-bw-yellow-500/40"
          fill="currentColor"
          viewBox="0 0 32 32"
        >
          <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
        </svg>
      </div>
      <blockquote className="flex-1 text-bw-gray-600 leading-relaxed text-sm">
        {quote}
      </blockquote>
      <div className="mt-6 flex items-center gap-3 border-t border-bw-gray-200 pt-4">
        {authorImage?.asset && (
          <Image
            src={urlFor(authorImage).width(40).height(40).url()}
            alt={authorName || ''}
            width={40}
            height={40}
            className="rounded-full"
          />
        )}
        <div className="flex-1 min-w-0">
          {authorName && (
            <div className="text-sm font-medium text-bw-gray-800 truncate">{authorName}</div>
          )}
          {attribution && (
            <div className="text-xs text-bw-gray-500 truncate">{attribution}</div>
          )}
        </div>
      </div>
    </div>
  )
}

interface TestimonialGridProps {
  headline?: string
  subheadline?: string
  testimonials: Testimonial[]
  columns?: 2 | 3
}

export function TestimonialGrid({
  headline,
  subheadline,
  testimonials,
  columns = 3,
}: TestimonialGridProps) {
  if ((testimonials ?? []).length === 0) return null

  return (
    <section className="c-section">
      <div className="mx-auto max-w-site px-5">
        {(headline || subheadline) && (
          <div className="mb-12 text-center">
            {headline && (
              <h2 className="c-title-3 text-bw-gray-800">{headline}</h2>
            )}
            {subheadline && (
              <p className="mt-4 c-text-4 text-bw-gray-500">{subheadline}</p>
            )}
          </div>
        )}
        <div
          className={`grid grid-cols-1 gap-6 ${
            columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {(testimonials ?? []).map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function TestimonialInline({ quote, attribution }: { quote: string; attribution?: string }) {
  if (!quote) return null
  return (
    <div className="my-12 mx-auto max-w-3xl text-center">
      <svg
        className="mx-auto mb-4 h-10 w-10 text-bw-yellow-500/30"
        fill="currentColor"
        viewBox="0 0 32 32"
      >
        <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
      </svg>
      <blockquote className="text-xl text-bw-gray-600 italic leading-relaxed">
        &ldquo;{quote}&rdquo;
      </blockquote>
      {attribution && (
        <p className="mt-4 text-sm font-medium text-bw-gray-500">&mdash; {attribution}</p>
      )}
    </div>
  )
}
