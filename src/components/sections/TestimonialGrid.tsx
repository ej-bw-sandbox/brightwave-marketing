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
    <div className="rounded-xl border border-bw-gray-600 bg-bw-gray-700 p-6 flex flex-col">
      <div className="mb-4">
        <svg
          className="h-8 w-8 text-bw-yellow-500/40"
          fill="currentColor"
          viewBox="0 0 32 32"
        >
          <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
        </svg>
      </div>
      <blockquote className="flex-1 text-bw-gray-200 leading-relaxed text-sm">
        {quote}
      </blockquote>
      <div className="mt-6 flex items-center gap-3 border-t border-bw-gray-600 pt-4">
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
            <div className="text-sm font-medium text-bw-gray-50 truncate">{authorName}</div>
          )}
          {attribution && (
            <div className="text-xs text-bw-gray-300 truncate">{attribution}</div>
          )}
        </div>
        {companyLogo?.asset && (
          <Image
            src={urlFor(companyLogo).height(24).url()}
            alt=""
            width={60}
            height={24}
            className="h-6 w-auto opacity-60"
          />
        )}
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
    <section className="py-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(headline || subheadline) && (
          <div className="mb-12 text-center">
            {headline && (
              <h2 className="text-3xl font-bold text-bw-gray-50 sm:text-4xl">{headline}</h2>
            )}
            {subheadline && (
              <p className="mt-4 text-lg text-bw-gray-200">{subheadline}</p>
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

/** Single large testimonial for use inside page sections */
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
      <blockquote className="text-xl text-bw-gray-200 italic leading-relaxed">
        &ldquo;{quote}&rdquo;
      </blockquote>
      {attribution && (
        <p className="mt-4 text-sm font-medium text-bw-gray-300">&mdash; {attribution}</p>
      )}
    </div>
  )
}
