import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/lib/sanity/client'
import { urlFor } from '@/lib/sanity/image'
import { buildMetadata } from '@/lib/metadata'
import { CtaButton } from '@/components/sections/CtaButton'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Research Agents for Professionals | Brightwave',
  description:
    'Research agents for professionals. Brightwave turns massive data rooms into insightful deliverables you can share and refine with colleagues.',
}

/* ------------------------------------------------------------------ */
/*  Hardcoded content matching the live site                           */
/* ------------------------------------------------------------------ */

const heroHeadline = 'Research agents built for professionals.'
const heroSubtext =
  'Conduct in-depth research, screen thousands of documents, and create share-ready deliverables with autonomous agents that consider every detail, source every claim, and synthesize real insights.'

const logoBar = {
  heading:
    'Featured in renowned publications and trusted by industry leaders.',
  logos: [
    { alt: 'Fortune', src: 'https://cdn.prod.website-files.com/6703d386a4ee8baaaceaffe5/670558f7430f5cb4e46a6790_Frame%201321316806.avif' },
    { alt: 'WSJ Pro', src: 'https://cdn.prod.website-files.com/6703d386a4ee8baaaceaffe5/670558f7375a18cb62da7d3e_Frame%201321316797.avif' },
    { alt: 'Bloomberg', src: 'https://cdn.prod.website-files.com/6703d386a4ee8baaaceaffe5/670558f7953725f0bdea202e_Frame%201321316805.avif' },
  ],
}

const keyFeatures = [
  {
    title: 'Custom Research on Autopilot',
    description:
      'Assign complex, long-running tasks to agents that run in the background so you can keep moving forward.',
    image: 'https://cdn.prod.website-files.com/6703d386a4ee8baaaceaffe5/67b07b26f67a8cad36c7599a_illustration_01.avif',
  },
  {
    title: 'Reports, Charts, Tables, Grids, Slides & More',
    description:
      'From deep research reports and slide decks to grids that extract data from hundreds of documents simultaneously, Brightwave outputs go way beyond chat.',
    image: 'https://cdn.prod.website-files.com/6703d386a4ee8baaaceaffe5/67b07b26949c9dd5de755839_illustration_01-1.avif',
  },
  {
    title: '2000+ Document Data Rooms',
    description:
      'Brightwave speaks your language. Work with PDFs, Word, Excel, SEC filings, earnings calls, cloud storage and more.',
    image: 'https://cdn.prod.website-files.com/6703d386a4ee8baaaceaffe5/67b07b265aa2c7918f03fce8_illustration_01-2.avif',
  },
  {
    title: 'Sourced and Verifiable',
    description:
      'Every claim in Brightwave research is verified and sourced back to source material, ensuring you can trust what you read.',
    image: 'https://cdn.prod.website-files.com/6703d386a4ee8baaaceaffe5/67b07b26f67a8cad36c7599a_illustration_01.avif',
  },
]

const beforeAfter = {
  before: [
    'Critical details go missing',
    'Endless CTRL-F',
    'Short on team bandwidth',
    'Half-baked prompts',
    'Race to disseminate new information',
  ],
  after: [
    'Agents surface key insights',
    'Synthesize across 2000+ documents',
    'Massive capacity unlock',
    'Custom research from your templates',
    'Self-updating, sharable outputs',
  ],
}

const testimonials = [
  {
    badge: 'Portfolio Manager, $4B Hedge Fund',
    quote:
      "Brightwave's platform allows us to better leverage our scarcest resource, and most important asset -- time. Using Brightwave to speed our diligence process and identify relevant risks and drivers of performance, our team can spend more time doing what they do best -- generating ideas and performing differentiated analysis of investment returns.",
  },
  {
    badge: 'Managing Director, $1B AUM Private Credit Fund',
    quote:
      "Brightwave's technology signifies a groundbreaking development in financial research -- what the team has developed is unrivaled. We are continually astonished by the wide array of applications for Brightwave within the financial services sector.",
  },
  {
    badge: 'Managing Partner, Top-50 AUM Pension Fund',
    quote:
      "Brightwave is the most impressive piece of technology I've seen this year. Our team is in Brightwave all the time -- it's the ultimate tool for getting at the core issues for any investment decision. It enables us to cover more sectors, more comprehensively.",
  },
]

const processComparison = {
  traditional: [
    { title: '20 hours', desc: 'Manual document review.' },
    { title: 'Uncertainty', desc: 'Critical details noticed too late.' },
  ],
  brightwave: [
    { title: '5 minutes', desc: 'Custom outputs on demand.' },
    { title: 'Confidence', desc: 'No stone is left unturned.' },
  ],
}

/* ------------------------------------------------------------------ */
/*  Fetch Sanity blog posts for "Feature Releases" and "Latest Posts"  */
/* ------------------------------------------------------------------ */

const releaseNotesQuery = `*[_type == "contentPost" && category == "release-notes"] | order(publishedAt desc) [0...3] {
  title,
  "slug": slug.current,
  publishedAt,
  coverImage{ asset->{ url, metadata } }
}`

const latestPostsQuery = `*[_type == "contentPost" && category == "blog"] | order(publishedAt desc) [0...3] {
  title,
  "slug": slug.current,
  publishedAt,
  coverImage{ asset->{ url, metadata } }
}`

/* ------------------------------------------------------------------ */
/*  Homepage Component                                                 */
/* ------------------------------------------------------------------ */

export default async function HomePage() {
  let releaseNotes: any[] = []
  let latestPosts: any[] = []

  try {
    const [rn, lp] = await Promise.all([
      client.fetch(releaseNotesQuery, {}, { next: { tags: ['contentPost'] } }),
      client.fetch(latestPostsQuery, {}, { next: { tags: ['contentPost'] } }),
    ])
    releaseNotes = rn ?? []
    latestPosts = lp ?? []
  } catch {
    // fallback: empty
  }

  return (
    <>
      {/* ============================================================ */}
      {/* Section 1: Hero                                               */}
      {/* ============================================================ */}
      <section className="c-section cc-hero">
        <div className="c-container">
          {/* Headline row with bottom border */}
          <div className="flex justify-between items-end gap-10 border-b border-bw-gray-200 pb-10">
            <h1 className="c-title-1 text-bw-gray-800">
              Research agents <br />built for professionals.
            </h1>
          </div>

          {/* Sub-row: text + CTAs on a 7-col grid */}
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-5 mt-0">
            <div className="lg:col-span-4 mt-10 mb-[2.9375rem]">
              <p className="c-text-3 text-bw-gray-500 u-balance">
                {heroSubtext}
              </p>
            </div>
            <div className="lg:col-span-3 flex items-end mt-10 mb-[2.9375rem]">
              <div className="flex flex-wrap items-center gap-2.5">
                <CtaButton label="Try for Free" href="https://app.brightwave.io/register" variant="primary" />
                <CtaButton label="Get a Demo" href="/contact" variant="outline" />
              </div>
            </div>
          </div>

          {/* Prompt box (decorative placeholder) */}
          <div className="bg-white border border-[#e4e4e4] rounded-lg shadow-prompt p-4 max-w-full">
            <div className="flex items-center gap-3">
              <span className="text-bw-gray-300 text-sm flex-1">What can I do for you?</span>
              <div className="w-8 h-8 rounded-full bg-[#e7e70d] flex items-center justify-center flex-shrink-0">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 1V13M1 7H13" stroke="#0f0f0f" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Section 2: Logo Bar                                           */}
      {/* ============================================================ */}
      <section className="c-section">
        <div className="c-container">
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-5">
            <div className="lg:col-span-2">
              <p className="c-title-5 u-balance text-bw-gray-800">
                {logoBar.heading}
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="flex flex-wrap gap-2.5">
                {logoBar.logos.map((logo) => (
                  <div key={logo.alt} className="bg-[#eff1f5] rounded-[0.5625rem] flex items-center justify-center p-4" style={{ width: '191px', height: '80px' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={logo.src} alt={logo.alt} className="max-h-10 max-w-full object-contain" loading="eager" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Section 3: Key Features                                       */}
      {/* ============================================================ */}
      <section className="c-section">
        <div className="c-container">
          <div className="flex flex-col gap-5">
            {/* Eyebrow */}
            <div className="eyebrow">
              <div className="block" />
              <div className="c-title-5">Key Features</div>
            </div>

            {/* Features list */}
            <div className="flex flex-col">
              {keyFeatures.map((feature, i) => (
                <div key={i} className="border-b border-bw-gray-200 py-8 last:border-b-0">
                  <div className="grid grid-cols-1 lg:grid-cols-7 gap-5">
                    <div className="lg:col-span-4">
                      <h3 className="c-title-4 text-bw-gray-800">{feature.title}</h3>
                      <p className="c-text-3 text-bw-gray-500 mt-4">{feature.description}</p>
                    </div>
                    <div className="lg:col-span-3 flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="w-16 h-16 object-contain"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Section 4: Before / After Brightwave                          */}
      {/* ============================================================ */}
      <section className="c-section">
        <div className="c-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Before */}
            <div className="flex flex-col">
              <div className="bg-bw-gray-800 text-white px-5 py-6 rounded-t-lg">
                <h3 className="c-title-4">Before Brightwave</h3>
              </div>
              <div className="flex flex-col bg-white border border-bw-gray-200 rounded-b-lg">
                {beforeAfter.before.map((item, i) => (
                  <div key={i}>
                    <div className="px-5 py-5">
                      <p className="c-text-3 text-bw-gray-800">{item}</p>
                    </div>
                    {i < beforeAfter.before.length - 1 && <div className="c-line mx-5" />}
                  </div>
                ))}
              </div>
            </div>

            {/* After */}
            <div className="flex flex-col">
              <div className="bg-[#e7e70d] text-bw-gray-800 px-5 py-6 rounded-t-lg">
                <h3 className="c-title-4">After Brightwave</h3>
              </div>
              <div className="flex flex-col bg-white border border-bw-gray-200 rounded-b-lg">
                {beforeAfter.after.map((item, i) => (
                  <div key={i}>
                    <div className="px-5 py-5">
                      <p className="c-text-3 text-bw-gray-800">{item}</p>
                    </div>
                    {i < beforeAfter.after.length - 1 && <div className="c-line mx-5" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Section 5: Testimonials                                       */}
      {/* ============================================================ */}
      <section className="c-section">
        <div className="c-container">
          <div className="bg-black rounded-2xl relative overflow-hidden">
            <div className="flex flex-col gap-[6.75rem] text-[#d9d9d9] pt-[9.5rem] px-5 pb-5">
              <div className="flex flex-col gap-[3.75rem] max-w-[42.5rem]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#e7e70d] flex-shrink-0" />
                  <span className="c-title-5 text-[#e7e70d]">{testimonials[0].badge}</span>
                </div>
                <p className="c-title-4 text-[#d9d9d9]">
                  {testimonials[0].quote}
                </p>
              </div>
            </div>

            {/* Additional testimonials below */}
            {testimonials.slice(1).map((t, i) => (
              <div key={i} className="border-t border-[#333] px-5 py-10">
                <div className="flex flex-col gap-6 max-w-[42.5rem]">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#e7e70d] flex-shrink-0" />
                    <span className="c-title-5 text-[#e7e70d]">{t.badge}</span>
                  </div>
                  <p className="c-title-4 text-[#d9d9d9]">{t.quote}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Section 6: Traditional vs Brightwave Process                  */}
      {/* ============================================================ */}
      <section className="c-section">
        <div className="c-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Traditional */}
            <div className="bg-bw-gray-75 rounded-lg p-8">
              <div className="eyebrow cc-no-bp mb-6">
                <div className="block" />
                <div className="c-title-5">Traditional Process</div>
              </div>
              <div className="flex flex-col gap-8">
                {processComparison.traditional.map((item, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <span className="c-title-3 text-bw-gray-800">{item.title}</span>
                    <span className="c-text-4 text-bw-gray-500">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Brightwave */}
            <div className="bg-bw-gray-75 rounded-lg p-8">
              <div className="eyebrow cc-no-bp mb-6">
                <div className="block cc-primary" />
                <div className="c-title-5 text-[#e7e70d]">With Brightwave</div>
              </div>
              <div className="flex flex-col gap-8">
                {processComparison.brightwave.map((item, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <span className="c-title-3 text-bw-gray-800">{item.title}</span>
                    <span className="c-text-4 text-bw-gray-500">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Section 7: Feature Releases (from Sanity or placeholder)      */}
      {/* ============================================================ */}
      <section className="c-section">
        <div className="c-container">
          <div className="flex flex-col gap-10">
            <div className="flex items-end justify-between">
              <h2 className="c-title-2 text-bw-gray-800">Feature Releases</h2>
            </div>
            {releaseNotes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {releaseNotes.map((post: any) => (
                  <Link
                    key={post.slug}
                    href={`/release-notes/${post.slug}`}
                    className="group flex flex-col gap-2.5 w-full"
                  >
                    {post.coverImage?.asset?.url && (
                      <div className="aspect-[4/3] relative overflow-hidden">
                        <Image
                          src={urlFor(post.coverImage).width(600).height(450).quality(80).url()}
                          alt={post.title}
                          width={600}
                          height={450}
                          className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="flex flex-col gap-3">
                      <h3 className="c-title-5 text-bw-gray-800 group-hover:text-bw-yellow-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      {post.publishedAt && (
                        <span className="c-text-6 text-bw-gray-500">
                          {new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(post.publishedAt))}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="c-text-3 text-bw-gray-500">New feature releases coming soon.</p>
            )}
            <div>
              <CtaButton label="Read More" href="/release-notes" variant="outline" />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Section 8: Latest Posts (from Sanity or placeholder)          */}
      {/* ============================================================ */}
      <section className="c-section">
        <div className="c-container">
          <div className="flex flex-col gap-10">
            <div className="flex items-end justify-between">
              <h2 className="c-title-2 text-bw-gray-800">Latest Posts</h2>
            </div>
            {latestPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {latestPosts.map((post: any) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col gap-2.5 w-full"
                  >
                    {post.coverImage?.asset?.url && (
                      <div className="aspect-[4/3] relative overflow-hidden">
                        <Image
                          src={urlFor(post.coverImage).width(600).height(450).quality(80).url()}
                          alt={post.title}
                          width={600}
                          height={450}
                          className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="flex flex-col gap-3">
                      <h3 className="c-title-5 text-bw-gray-800 group-hover:text-bw-yellow-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      {post.publishedAt && (
                        <span className="c-text-6 text-bw-gray-500">
                          {new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(post.publishedAt))}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="c-text-3 text-bw-gray-500">New posts coming soon.</p>
            )}
            <div>
              <CtaButton label="Read More" href="/blog" variant="outline" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
