import type { Metadata } from 'next'
import { client } from '@/lib/sanity/client'
import { engineeringQuery } from '@/lib/sanity/queries/engineering'
import { buildMetadata } from '@/lib/metadata'

export async function generateMetadata(): Promise<Metadata> {
  const doc = await client.fetch(engineeringQuery, {}, { next: { tags: ['engineeringPage'], revalidate: 3600 } })
  if (!doc) return {}
  return buildMetadata({
    title: doc.headline,
    description: doc.description,
    seo: doc.seo,
    path: '/engineering',
  })
}

export default async function Page() {
  let doc: any = null
  try {
    doc = await client.fetch(engineeringQuery, {}, { next: { tags: ['engineeringPage'], revalidate: 3600 } })
  } catch { doc = null }

  if (!doc) return null

  return (
    <>
      <div className="main">
            <section className="c-section cc-template">
              <div className="c-container">
                <div className="bp40-underline">
                  <h1 className="c-title-1">{doc.headline}</h1>
                </div>
                <div className="w-dyn-list">
                  <div role="list" className="w-dyn-items">
                    <div role="listitem" className="card_item w-dyn-item">
                      <a href="#" className="grid cc-featured w-inline-block">
                        <div inject-landscape-target="featured" id="w-node-e2951a01-7cde-c0f1-ea55-4886d93acba7-78bc35b2" className="inject-landscape"></div>
                        <div id="w-node-f9b03eb8-910b-ab17-f4ee-5292131266ca-78bc35b2" className="aspect-16-9 u-overflow-hidden"><img src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg" loading="lazy" alt="" className="img-cover w-dyn-bind-empty" />
                          <div className="featured-svg">
                            <div className="svg w-embed"><svg width="74" height="57" viewBox="0 0 74 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M36.8281 3.24967e-06L74 0.0499327L74 57L0.0693104 57L0.0693072 20.2931L36.8281 3.24967e-06Z" fill="#E7E70D"></path>
                              </svg></div>
                            <div data-is-ix2-target="1" className="cta-lottie" data-w-id="97ecced1-deb7-c354-caf9-40c127a1b4f3" data-animation-type="lottie" data-src="/webflow-documents/Arrow-Lottie.json" data-loop="0" data-direction="1" data-autoplay="0" data-renderer="svg" data-default-duration="0" data-duration="0"></div>
                          </div>
                        </div>
                        <div id="w-node-_84f72f45-9c97-833f-e8b4-b3d528fbcee2-78bc35b2" className="featured_right">
                          <div inject-landscape="featured" className="featured_top">
                            <div className="eyebrow-flex">
                              <div className="block-4"></div>
                              <div className="c-title-5">{doc.featuredEyebrow}</div>
                            </div>
                            <div className="c-title-4 w-dyn-bind-empty"></div>
                          </div>
                          <div className="c-text-4 w-dyn-bind-empty"></div>
                        </div>
                      </a>
                      <a href="#" className="card_link-abso w-inline-block"></a>
                    </div>
                  </div>
                  <div className="w-dyn-empty">
                    <div>{doc.emptyStateText}</div>
                  </div>
                </div>
                <div className="collection">
                  <div className="form-block w-form">
                    <form id="email-form" name="email-form" data-name="Email Form" redirect="/" data-redirect="/" method="get" className="filters" data-wf-page-id="69b9c091a1a7c77c78bc35b2" data-wf-element-id="5a27d368-cb4d-aec5-fd28-2ca5cde7f9ba">
                      <div className="filters_serach">
                        <div className="filters_flex">
                          <div className="eyebrow-flex">
                            <div className="block"></div>
                            <div className="c-title-5">{doc.searchLabel}</div>
                          </div>
                          <div className="search_flex">
                            <div dm-invert="" className="svg w-embed"><svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="40" height="40" rx="4" fill="#0F0F0F"></rect>
                                <path d="M19.25 25.25C22.5637 25.25 25.25 22.5637 25.25 19.25C25.25 15.9363 22.5637 13.25 19.25 13.25C15.9363 13.25 13.25 15.9363 13.25 19.25C13.25 22.5637 15.9363 25.25 19.25 25.25Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M26.7498 26.7498L23.4873 23.4873" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                              </svg></div><input className="search_field w-input" maxLength={256} name="name-2" data-name="Name 2" r-filter="input" placeholder={doc.searchPlaceholder} type="text" id="name-2" />
                          </div>
                        </div>
                      </div>
                      <div className="filters_flex">
                        <div className="eyebrow-flex">
                          <div className="block"></div>
                          <div className="c-title-5">{doc.sortByLabel}</div>
                        </div>
                        <div className="search_flex">
                          <div data-delay="300" data-hover="false" fs-cmssort-element="trigger" className="filter-dropdown w-dropdown">
                            <div className="dropdown-toggle w-dropdown-toggle">
                              <div fs-cmssort-element="dropdown-label" className="c-text-link">{doc.sortByDateLabel}</div>
                            </div>
                            <nav className="dropdown-list cc-date w-dropdown-list">
                              <a fs-cmssort-field="update-date" href="#" className="c-text-6 cc-dropdown w-dropdown-link">{doc.sortAscendingLabel}</a>
                              <a fs-cmssort-field="update-date-desc" href="#" className="c-text-6 cc-dropdown w-dropdown-link">{doc.sortDescendingLabel}</a>
                            </nav>
                          </div>
                          <div data-delay="300" data-hover="false" fs-cmssort-element="trigger" className="filter-dropdown cc-hide w-dropdown">
                            <div className="dropdown-toggle w-dropdown-toggle">
                              <div className="c-text-link">{doc.authorLabel}</div>
                              <div className="author-no-wrap">
                                <div className="c-text-link"> (</div>
                                <div author-no="" className="c-text-link">0</div>
                                <div className="c-text-link">)</div>
                              </div>
                            </div>
                            <nav className="dropdown-list w-dropdown-list">
                              <div className="w-dyn-list">
                                <div role="list" className="author-list w-dyn-items">
                                  <div r-filter="author" role="listitem" className="w-dyn-item"><label className="w-checkbox c-text-6 cc-dropdown">
                                      <div className="w-checkbox-input w-checkbox-input--inputType-custom author-checkbox"></div><input type="checkbox" name="checkbox" id="checkbox" data-name="Checkbox" style={{opacity: '0', position: 'absolute', zIndex: '-1'}} /><span className="w-form-label" htmlFor="checkbox"></span>
                                    </label></div>
                                </div>
                                <div className="w-dyn-empty">
                                  <div>{doc.emptyStateText}</div>
                                </div>
                              </div>
                            </nav>
                          </div>
                        </div>
                      </div>
                    </form>
                    <div className="w-form-done">
                      <div>{doc.formSuccessMessage}</div>
                    </div>
                    <div className="w-form-fail">
                      <div>{doc.formErrorMessage}</div>
                    </div>
                  </div>
                  <div className="collection_flex">
                    <div className="w-dyn-list">
                      <div role="list" className="grid cc-collection w-dyn-items">
                        <div id="w-node-_6a5ce2d3-a20d-9e92-2985-bf1031d2f190-78bc35b2" role="listitem" className="collection_card w-dyn-item">
                          <a href="#" className="card w-inline-block">
                            <div className="aspect-4-3"><img alt="" loading="lazy" src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg" className="img-cover w-dyn-bind-empty" /></div>
                            <div className="card_flex">
                              <div r-indexed="input" className="c-title-5 w-dyn-bind-empty"></div>
                              <div r-indexed="author" className="author-hide w-dyn-bind-empty"></div>
                              <div fs-cmssort-field="update-date" fs-cmssort-type="date" className="c-text-6 w-dyn-bind-empty"></div>
                            </div>
                          </a>
                          <a href="#" className="card_link-abso w-inline-block"></a>
                        </div>
                      </div>
                      <div className="w-dyn-empty">
                        <div>{doc.emptyStateText}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="c-section">
              <div className="c-container">
                <div className="titles">
                  {doc.ctaTitleWords && (
                    <>
                      <div className="title_flex">
                        {doc.ctaTitleWords[0] && (
                          <div className="c-title-cta">{doc.ctaTitleWords[0].text}</div>
                        )}
                        {doc.ctaTitleWords[1] && (
                          <div grey="" className="c-title-cta cc-grey">{doc.ctaTitleWords[1].text}</div>
                        )}
                      </div>
                      <div className="title_flex">
                        {doc.ctaTitleWords[2] && (
                          <div grey="" className="c-title-cta cc-grey">{doc.ctaTitleWords[2].text}</div>
                        )}
                        <div className="spacer"></div>
                        {doc.ctaTitleWords[3] && (
                          <div className="c-title-cta">{doc.ctaTitleWords[3].text}</div>
                        )}
                        {doc.ctaTitleWords[4] && (
                          <div grey="" className="c-title-cta cc-grey">{doc.ctaTitleWords[4].text}</div>
                        )}
                      </div>
                      <div className="title_flex cc-financial">
                        <div className="spacer cc-financial"></div>
                        {doc.ctaTitleWords[5] && (
                          <div>
                            <div className="c-title-cta">{doc.ctaTitleWords[5].text}</div>
                          </div>
                        )}
                      </div>
                      <div className="title_flex cc-stetch">
                        {doc.ctaTitleWords[6] && (
                          <div className="c-title-cta">{doc.ctaTitleWords[6].text}</div>
                        )}
                      </div>
                    </>
                  )}
                  <div className="cta-step">
                    <a stagger-cta-big="" data-w-id="f984e0fd-5317-bfcf-7b12-0d02f1476f56" href={doc.ctaButtonUrl} className="cta-p-big w-inline-block">
                      <div a-dm="" className="cta-p-big_top">
                        <div stagger-cta-text-big="" className="c-text-link cc-stagger-cta">{doc.ctaButtonText}</div>
                      </div><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 35 33" fill="none" className="cta-p-big_arrows cc-hide">
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
                      <div data-is-ix2-target="1" className="cta-p-big_arrows cc-lotti" data-w-id="1cfa6afb-a27b-299d-3baa-19d0ad081838" data-animation-type="lottie" data-src="https://uploads-ssl.webflow.com/6537758130c3d278e4b6eecc/6576e8acfcf807e5bebe727c_Arrow-Lottie.json" data-loop="0" data-direction="1" data-autoplay="0" data-renderer="svg" data-default-duration="2" data-duration="0"></div><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 74 20" fill="none" className="cta-p-big_chop">
                        <path d="M36.7933 20L74 19.9508L74 5.72205e-06L1.74845e-06 4.97481e-06L36.7933 20Z" fill="currentColor" className="path"></path>
                      </svg>
                    </a>
                  </div>
                </div>
                <div lottie-bg="" className="lottie-step">
                  <div lottie-bg="" className="lottie-crop">
                    <div className="lottie_cropped-desktop" data-w-id="ee46ba2d-714e-5fb7-2641-bfc6f471f78a" data-animation-type="lottie" data-src="/webflow-documents/CTA-Lottie-25.json" data-loop="1" data-direction="1" data-autoplay="1" data-is-ix2-target="0" data-renderer="svg" data-default-duration="0" data-duration="20"></div>
                    <div slice="" className="lottie_cropped-mobile" data-w-id="806ac869-7326-a178-3a49-0a83ab847ac2" data-animation-type="lottie" data-src="/webflow-documents/Generative-Loop-Final-25.json" data-loop="1" data-direction="1" data-autoplay="1" data-is-ix2-target="0" data-renderer="svg" data-default-duration="0" data-duration="10"></div>
                  </div>
                </div>
              </div>
            </section>
      </div>
    </>
  )
}
