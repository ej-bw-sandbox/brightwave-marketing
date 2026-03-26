import type { Metadata } from 'next'
import { client } from '@/lib/sanity/client'
import { pricingQuery } from '@/lib/sanity/queries/pricing'
import { buildMetadata } from '@/lib/metadata'
import { LottiePlayer } from '@/components/ui/LottiePlayer'

export async function generateMetadata(): Promise<Metadata> {
  try {
    const doc = await client.fetch(pricingQuery, {}, { next: { tags: ['pricingPage'], revalidate: 3600 } })
    if (!doc) return { title: 'Pricing | Brightwave' }
    return buildMetadata({
      title: doc.headline,
      description: doc.subheadline,
      seo: doc.seo,
      path: '/pricing',
    })
  } catch {
    return { title: 'Pricing | Brightwave' }
  }
}

export default async function Page() {
  let doc: any = null
  try {
    doc = await client.fetch(pricingQuery, {}, { next: { tags: ['pricingPage'], revalidate: 3600 } })
  } catch {
    doc = null
  }

  if (!doc) return null

  const plans = (doc.plans ?? []) as any[]
  const productOptions = (doc.productSelector ?? []) as string[]

  return (
    <>
      <section className="c-section cc-center">
        <div></div>
        <div className="c-container">
          {doc.headline && <h1 className="c-title-1">{doc.headline}</h1>}
          {doc.subheadline && (
            <div className="c-text-2">{doc.subheadline}<br /></div>
          )}
        </div>
        <div className="c-container">
          <div className="pricing-blurb-wrapper">
            {productOptions.length > 0 && (
              <div className="product-dropdown">
                <div className="product-selection-block w-form">
                  <form id="wf-form-Product-Selection" name="wf-form-Product-Selection" data-name="Product Selection" method="get" className="product-selection" data-wf-page-id="69012b56372a6fa3067a404f" data-wf-element-id="18c474f0-069a-bc40-689d-9b4f05c4e20a">
                    {doc.productSelectorLabel && (
                      <label htmlFor="productSelect" className="field-label-2">{doc.productSelectorLabel}</label>
                    )}
                    <select id="productSelect" name="product" data-name="product" className="product-select-field w-select">
                      {productOptions.map((option: string) => (
                        <option key={option} value={option.toLowerCase().replace(/\s+/g, '-')}>{option}</option>
                      ))}
                    </select>
                  </form>
                  <div className="w-form-done">
                    <div>Thank you! Your submission has been received!</div>
                  </div>
                  <div className="w-form-fail">
                    <div>Oops! Something went wrong while submitting the form.</div>
                  </div>
                </div>
              </div>
            )}
            {doc.billingToggle && (
              <div data-toggle="" className="div-block-6 pricing-time-wrapper">
                {doc.billingMonthlyLabel && (
                  <div id="monthlyLabel" className="pricing-plan-label billing-label-active">{doc.billingMonthlyLabel}</div>
                )}
                <div id="billingToggle" className="pricing-toggle-outter toogle-container">
                  <div className="pricing-toggle-inner toggle-slider"></div>
                </div>
                {doc.billingAnnualLabel && (
                  <div id="annualLabel" className="pricing-plan-label billing-label">{doc.billingAnnualLabel}</div>
                )}
              </div>
            )}
          </div>
          <div id="w-node-_2abe156e-587a-a415-b51c-08157f80cc46-067a404f" className="w-layout-layout pricing-card-wrapper wf-layout-layout">
            {plans.map((plan: any, i: number) => {
              const isEnterprise = plan.product === 'enterprise'
              const planKey = plan.product ?? `plan-${i}`

              return (
                <div key={planKey} className={`w-layout-cell ${plan.isFeatured ? 'team-plan-wrapper' : 'individual-plan-wrapper'}`}>
                  <div data-plan={planKey} className="plan-card">
                    {plan.isFeatured && plan.featuredBadgeText && (
                      <div className="popular-badge-wrapper">
                        <div className="popular-badge">
                          <div className="badge-text">{plan.featuredBadgeText}</div>
                        </div>
                      </div>
                    )}
                    {plan.name && <h4 className="pricing-card-header">{plan.name}</h4>}
                    {plan.description && (
                      <p data-description="" className="pricng-card-description">{plan.description}</p>
                    )}
                    <div className={isEnterprise ? 'div-block-54' : 'pricing-wrapper'}>
                      <div className={plan.isFeatured ? 'div-block-58' : isEnterprise ? 'div-block-59' : 'price-wrapper'}>
                        {plan.priceMonthly && (
                          <h2 data-price={planKey} className="pricing">{plan.priceMonthly}</h2>
                        )}
                        {plan.priceSuffix && (
                          <div data-period={planKey} className="pricing-term-details">{plan.priceSuffix}</div>
                        )}
                      </div>
                      {plan.userLimit && (
                        <div className="team-size">{plan.userLimit}</div>
                      )}
                    </div>
                    {plan.cta?.url && plan.cta?.label && (
                      <a
                        id="paywall-cta-btn"
                        stagger-cta-big=""
                        {...(!isEnterprise ? { 'pricing-link': '' } : {})}
                        href={plan.cta.url}
                        className="cta-p-big w-inline-block"
                      >
                        <div {...(!isEnterprise ? { 'pricing-link': '', 'a-d': '' } : { 'a-dm': '' })} className="cta-p-big_top">
                          <div stagger-cta-text-big="" className="c-text-link cc-stagger-cta">{plan.cta.label}</div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 35 33" fill="none" className="cta-p-big_arrows cc-hide">
                          <rect width="4.52527" height="4.49649" transform="matrix(1 8.74228e-08 8.74228e-08 -1 30.0078 32.5312)" fill="currentColor"></rect>
                          <g clipPath="url(#clip0_913_4549)">
                            <path d="M3.34961 20.228L21.2115 20.228L21.2115 2.47975" stroke="currentColor" strokeWidth="1.92707" strokeLinejoin="bevel"></path>
                            <path d="M21.2099 20.228L1.60254 0.745389" stroke="currentColor" strokeWidth="1.92707" strokeLinejoin="bevel"></path>
                          </g>
                          <defs>
                            <clipPath id="clip0_913_4549">
                              <rect width="21.2623" height="21.1271" fill="currentColor" transform="matrix(1 8.74228e-08 8.74228e-08 -1 0.917969 21.1914)"></rect>
                            </clipPath>
                          </defs>
                        </svg>
                        <LottiePlayer src="/webflow-documents/Arrow-Lottie.json" className="cta-p-big_arrows cc-lotti" loop={false} autoplay={false} />
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 74 20" fill="none" className="cta-p-big_chop">
                          <path d="M36.7933 20L74 19.9508L74 5.72205e-06L1.74845e-06 4.97481e-06L36.7933 20Z" fill="currentColor" className="path"></path>
                        </svg>
                      </a>
                    )}
                    {plan.trialNote && (
                      <div className="trial-info">{plan.trialNote}</div>
                    )}
                    {(plan.features ?? []).length > 0 && (
                      <ul data-features="" role="list" className="feature-list">
                        {plan.features.map((feat: string, fi: number) => (
                          <li key={fi} className="feature-list-item">{feat}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
