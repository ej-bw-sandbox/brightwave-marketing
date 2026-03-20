import { client } from '@/lib/sanity/client'
import { pricingQuery } from '@/lib/sanity/queries/pricing'
import { buildMetadata } from '@/lib/metadata'
import Link from 'next/link'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const page = await client.fetch(pricingQuery, {}, { next: { tags: ['pricingPage'] } })
  return buildMetadata({
    title: 'Pricing',
    description: page?.seo?.metaDescription || 'Products & Pricing for Brightwave.',
    seo: page?.seo,
    path: '/pricing',
  })
}

export default async function PricingPage() {
  const page = await client.fetch(pricingQuery, {}, { next: { tags: ['pricingPage'] } })

  const plans = page?.plans ?? [
    {
      name: 'Individual',
      priceLabel: '$200',
      priceSuffix: '/month',
      userLimit: '1 User',
      features: ['Full platform access', 'All AI features', 'Email support'],
      cta: { label: 'Get Started', url: '/contact' },
      trialNote: '7-day free trial, No credit card required',
    },
    {
      name: 'Team',
      priceLabel: '$200',
      priceSuffix: '/seat per month',
      userLimit: 'Up to 10 Users',
      isFeatured: true,
      features: ['Everything in Individual', 'Team collaboration', 'Priority support'],
      cta: { label: 'Get Started', url: '/contact' },
    },
    {
      name: 'Enterprise',
      priceLabel: 'Contact for Pricing',
      userLimit: '10+ Users',
      features: ['Everything in Team', 'Custom integrations', 'Dedicated account manager', 'SSO & SAML'],
      cta: { label: 'Schedule a Trial', url: '/contact' },
      trialNote: 'Custom Demo + Proof of Concept',
    },
  ]

  return (
    <>
      <section className="c-section cc-hero">
        <div className="c-container">
          <div className="flex justify-between items-end gap-10 border-b border-bw-gray-200 pb-10">
            <h1 className="c-title-3 text-bw-gray-800">
              {page?.headline || 'Products & Pricing'}
            </h1>
          </div>
          <p className="c-text-3 text-bw-gray-500 mt-10">
            {page?.subheadline || 'Agentic research for professionals solving the world\'s most complex problems.'}
          </p>
        </div>
      </section>

      <section className="pb-24 max-w-site mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan: any, i: number) => (
            <div
              key={plan.name || i}
              className={`flex flex-col rounded-lg border p-8 ${
                plan.isFeatured
                  ? 'border-bw-yellow-550 bg-white shadow-lg'
                  : 'border-bw-gray-200 bg-white'
              }`}
            >
              {plan.isFeatured && (
                <span className="text-xs font-semibold text-bw-yellow-600 uppercase tracking-wider mb-2">Most Popular</span>
              )}
              <h3 className="c-title-5 text-bw-gray-800">{plan.name}</h3>
              <div className="mt-4">
                <span className="text-3xl font-bold text-bw-gray-800">{plan.priceLabel}</span>
                {plan.priceSuffix && <span className="text-sm text-bw-gray-500 ml-1">{plan.priceSuffix}</span>}
              </div>
              <p className="text-sm text-bw-gray-500 mt-2">{plan.userLimit}</p>
              <ul className="mt-6 space-y-3 flex-1">
                {(plan.features ?? []).map((f: string, fi: number) => (
                  <li key={fi} className="flex items-start gap-2 text-sm text-bw-gray-600">
                    <span className="text-bw-yellow-550 mt-0.5">&#10003;</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={plan.cta?.url || '/contact'}
                className={`mt-8 block text-center font-semibold py-3 rounded-md transition-colors ${
                  plan.isFeatured
                    ? 'bg-bw-yellow-550 text-bw-gray-800 hover:bg-bw-yellow-600'
                    : 'border border-bw-gray-800 text-bw-gray-800 hover:bg-bw-gray-800 hover:text-white'
                }`}
              >
                {plan.cta?.label || 'Get Started'}
              </Link>
              {plan.trialNote && (
                <p className="text-xs text-bw-gray-500 text-center mt-3">{plan.trialNote}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
