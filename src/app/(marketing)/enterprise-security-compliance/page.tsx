import type { Metadata } from 'next'
import { client } from '@/lib/sanity/client'
import { enterprise_security_complianceQuery } from '@/lib/sanity/queries/enterprise-security-compliance'
import { buildMetadata } from '@/lib/metadata'

export async function generateMetadata(): Promise<Metadata> {
  const doc = await client.fetch(enterprise_security_complianceQuery, {}, { next: { tags: ['enterpriseSecurityCompliancePage'], revalidate: 3600 } })
  if (!doc) return { title: 'Enterprise Security &amp; Compliance | Protecting Your Most Sensitive Financial Data' }
  return buildMetadata({
    title: doc.title || 'Enterprise Security &amp; Compliance | Protecting Your Most Sensitive Financial Data',
    description: doc.description || 'Discover how Brightwave secures sensitive financial information with advanced enterprise-grade encryption, isolated storage, and rigorous data privacy controls—built for mission-critical compliance.',
    seo: doc.seo,
    path: '/enterprise-security-compliance',
  })
}

export default async function Page() {
  let doc: Record<string, string> | null = null
  try {
    doc = await client.fetch(enterprise_security_complianceQuery, {}, { next: { tags: ['enterpriseSecurityCompliancePage'], revalidate: 3600 } })
  } catch {
    doc = null
  }

  return (
    <>
      <div className="main">
            <section className="c-section cc-center">
              <div className="c-container">
                <div className="bp40-underline u-text-center">
                  <h1 className="c-title-1 u-balance">Built to Handle the World&#x27;s Most Sensitive Financial Data</h1>
                </div>
                <div className="v-80">
                  <div className="text-cta">
                    <div className="_589">
                      <div className="c-text-3">Built by engineers with experience handling mission-critical financial datasets, security isn&#x27;t an afterthought—it&#x27;s our foundation.</div>
                    </div>
                    <div className="buttons">
                      <a stagger-cta="" href="contact.html" className="cta-p-sm w-inline-block">
                        <div>
                          <div stagger-cta-text="dark" className="c-text-link cc-stagger-cta">Request a Demo</div>
                        </div>
                        <div className="flip-small">
                          <div className="flip-bg"></div>
                        </div>
                        <div className="flip-big">
                          <div className="svg cta-sm-arrow w-embed"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g clipPath="url(#clip0_774_4073)">
                                <path d="M2.27832 1.625L12.3577 1.44906L12.5325 11.4643" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel"></path>
                                <path d="M12.3563 1.44945L1.48389 12.6365" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel"></path>
                              </g>
                              <defs>
                                <clipPath id="clip0_774_4073">
                                  <rect width="12" height="11.9237" fill="white" transform="translate(0.896484 1.10547) rotate(-1)"></rect>
                                </clipPath>
                              </defs>
                            </svg></div>
                        </div>
                      </a>
                      <a stagger-cta="" href="investment-intelligence-engine.html" className="cta-p-sm cc-stroke w-inline-block">
                        <div stagger-cta-text="dark" className="c-text-link cc-stagger-cta">Explore the Platform</div>
                        <div className="flip-small">
                          <div className="flip-bg"></div>
                        </div>
                        <div className="flip-big">
                          <div className="svg cta-sm-arrow w-embed"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g clipPath="url(#clip0_774_4073)">
                                <path d="M2.27832 1.625L12.3577 1.44906L12.5325 11.4643" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel"></path>
                                <path d="M12.3563 1.44945L1.48389 12.6365" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel"></path>
                              </g>
                              <defs>
                                <clipPath id="clip0_774_4073">
                                  <rect width="12" height="11.9237" fill="white" transform="translate(0.896484 1.10547) rotate(-1)"></rect>
                                </clipPath>
                              </defs>
                            </svg></div>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="h-20 cc-strech">
                    <div className="home-usp cc-40">
                      <div className="eyebrow cc-no-bp">
                        <div className="block cc-dm-light"></div>
                        <div className="c-title-5">Data Usage Guarantees</div>
                      </div>
                      <div className="c-text-4">We never use your data to train our generative models. Your data is used exclusively for your insights, maintaining complete data privacy.</div>
                    </div>
                    <div className="home-usp cc-40">
                      <div className="eyebrow cc-no-bp">
                        <div className="block cc-dm-light"></div>
                        <div className="c-title-5">Third-Party Integrations</div>
                      </div>
                      <div className="c-text-4">Encrypted data interactions that deliver private and exclusive responses. Your data pipelines are always protected and subject to our secure integration protocols.</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="c-section">
              <div className="c-container">
                <div className="v-40">
                  <div className="eyebrow cc-no-bp">
                    <div className="block"></div>
                    <div className="c-title-5">Core Security Pillars</div>
                  </div>
                  <div className="v-64 cc-stretch">
                    <div className="v-line">
                      <div className="c-line"></div>
                    </div>
                    <div className="grid">
                      <div id="w-node-aa4fef93-e6d4-db49-e351-36279d16afd6-1bbf8481" className="v-40 cc-481">
                        <div className="c-title-3">Industry-Leading Encryption</div>
                        <div className="c-text-3">All data is encrypted in transit and at rest. Your data is stored using industry-leading encryption and security protocols to safeguard it from unauthorized access.</div>
                      </div><img src="/webflow-images/Frame-1321317355_1.avif" loading="lazy" width="791" id="w-node-f55ed71e-db8d-5afe-bef0-d8ebcf87cee5-1bbf8481" alt="" srcset="/webflow-images/Frame-1321317355_1Frame-1321317355.avif 500w, images/Frame-1321317355_1Frame-1321317355.avif 800w, images/Frame-1321317355_1.avif 1582w" sizes="(max-width: 991px) 100vw, 791px" className="aspect-16-9 cc-100" />
                    </div>
                    <div className="v-line">
                      <div className="c-line"></div>
                    </div>
                    <div className="grid">
                      <div id="w-node-_1206ec9c-98af-a45f-4521-895d3d9aac97-1bbf8481" className="v-40 cc-481">
                        <div className="c-title-3">Strict Access Controls</div>
                        <div className="c-text-3">Data is stored in isolated infrastructure sections to maintain complete separation from other customers. Only authorized personnel with verified credentials can access your data, ensuring your privacy is protected.</div>
                      </div><img src="/webflow-images/Frame-1321317355-1_1.avif" loading="lazy" width="791" id="w-node-_1206ec9c-98af-a45f-4521-895d3d9aac9c-1bbf8481" alt="" srcset="/webflow-images/Frame-1321317355-1_1Frame-1321317355-1.avif 500w, images/Frame-1321317355-1_1Frame-1321317355-1.avif 800w, images/Frame-1321317355-1_1.avif 1582w" sizes="(max-width: 991px) 100vw, 791px" className="aspect-16-9 cc-100" />
                    </div>
                    <div className="v-line">
                      <div className="c-line"></div>
                    </div>
                    <div className="grid">
                      <div id="w-node-_70ce1d87-927d-c079-b121-109b28182783-1bbf8481" className="v-40 cc-481">
                        <div className="c-title-3">Compliance &amp; Best Practices</div>
                        <div className="c-text-3">We comply with global data protection standards (including GDPR, CCPA, etc.), to ensure your rights and privacy are always upheld. Customers can easily manage privacy settings, request access to information, or choose to delete data at any time.</div>
                      </div><img src="/webflow-images/Frame-1321317355-2_1.avif" loading="lazy" width="791" id="w-node-_70ce1d87-927d-c079-b121-109b28182788-1bbf8481" alt="" srcset="/webflow-images/Frame-1321317355-2_1Frame-1321317355-2.avif 500w, images/Frame-1321317355-2_1.avif 1582w" sizes="(max-width: 991px) 100vw, 791px" className="aspect-16-9 cc-100" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="c-section">
              <div className="c-container">
                <div className="v-40">
                  <h2 className="c-title-2">FAQs</h2>
                  <div>
                    <div id="w-node-_0a8ba2b4-0421-c0a4-dea7-2bca8530acd2-1bbf8481" className="c-line"></div>
                    <div id="w-node-_0a20a89b-b283-5976-980a-6034e2c9ecd3-1bbf8481" className="accordion-wrap">
                      <div accordion="" id="w-node-_0d758a7c-5986-fc72-0a2c-7e16d285f79d-d285f79d" className="accordion">
                        <div className="accordion_toggle">
                          <div className="c-text-2 cc-balance">How does Brightwave keep my data secure?</div>
                          <div chevron-x="" className="c-svg-2 cc-20 w-embed"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                              <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg></div><input accordion-checkbox="" type="checkbox" className="accordion_checkbox" />
                        </div>
                        <div accordion="element" className="accordion_dropdown">
                          <div mask-height="element">
                            <div className="accordion_content">
                              <div className="c-text-4 w-richtext">
                                <p>We take data protection extremely seriously. All data is encrypted with industry-standard protocols (SSL for in transit, AWS KMS for data at rest). Okta single sign-on (SSO) gates our core systems and user privileges are tightly managed with programmatic Access Control Lists (ACLs).<br /></p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="w-node-_0a20a89b-b283-5976-980a-6034e2c9ecd9-1bbf8481" className="c-line"></div>
                    <div id="w-node-_0a20a89b-b283-5976-980a-6034e2c9ecda-1bbf8481" className="accordion-wrap">
                      <div accordion="" id="w-node-_0d758a7c-5986-fc72-0a2c-7e16d285f79d-d285f79d" className="accordion">
                        <div className="accordion_toggle">
                          <div className="c-text-2 cc-balance">Does Brightwave use our data to train its models? </div>
                          <div chevron-x="" className="c-svg-2 cc-20 w-embed"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                              <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg></div><input accordion-checkbox="" type="checkbox" className="accordion_checkbox" />
                        </div>
                        <div accordion="element" className="accordion_dropdown">
                          <div mask-height="element">
                            <div className="accordion_content">
                              <div className="c-text-4 w-richtext">
                                <p>No. Your data is used exclusively for your own insights and is never shared or used to train our models.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="w-node-_440705bf-3465-c212-a46f-a171c74212bf-1bbf8481" className="c-line"></div>
                    <div id="w-node-_0a20a89b-b283-5976-980a-6034e2c9ece0-1bbf8481" className="accordion-wrap">
                      <div accordion="" id="w-node-_0d758a7c-5986-fc72-0a2c-7e16d285f79d-d285f79d" className="accordion">
                        <div className="accordion_toggle">
                          <div className="c-text-2 cc-balance">How do you handle sensitive information? <br /></div>
                          <div chevron-x="" className="c-svg-2 cc-20 w-embed"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                              <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg></div><input accordion-checkbox="" type="checkbox" className="accordion_checkbox" />
                        </div>
                        <div accordion="element" className="accordion_dropdown">
                          <div mask-height="element">
                            <div className="accordion_content">
                              <div className="c-text-4 w-richtext">
                                <p>We protect your data with industry-leading encryption and security protocols, ensuring access is granted only to authorized personnel. You have full control over your privacy settings and can request access to your information or delete it at any time. We comply with global data protection standards (e.g., GDPR, CCPA) to uphold your rights and privacy.<br /></p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="w-node-_0e5c3573-8545-97cf-c375-1a45e6398e3c-1bbf8481" className="c-line"></div>
                    <div id="w-node-c50ebea5-6c74-669f-8c37-a809a2a8065a-1bbf8481" className="accordion-wrap">
                      <div accordion="" id="w-node-_0d758a7c-5986-fc72-0a2c-7e16d285f79d-d285f79d" className="accordion">
                        <div className="accordion_toggle">
                          <div className="c-text-2 cc-balance">Is Brightwave compliant with major security standards?</div>
                          <div chevron-x="" className="c-svg-2 cc-20 w-embed"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                              <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg></div><input accordion-checkbox="" type="checkbox" className="accordion_checkbox" />
                        </div>
                        <div accordion="element" className="accordion_dropdown">
                          <div mask-height="element">
                            <div className="accordion_content">
                              <div className="c-text-4 w-richtext">
                                <p>We are actively pursuing our SOC 2 Type 2 report and already adhere to industry-leading security frameworks. Our team includes deeply experienced security and infrastructure experts, with backgrounds spanning regulated exchanges and clearinghouses and security expertise at multi-billion financial planning companies. We also perform annual third-party penetration tests and regularly audit our code dependencies for vulnerabilities.<br /></p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="w-node-_0a20a89b-b283-5976-980a-6034e2c9ecdf-1bbf8481" className="c-line"></div>
                    <div id="w-node-b06fd41c-9b9d-71f1-89ac-e562d2c0341c-1bbf8481" className="accordion-wrap">
                      <div accordion="" id="w-node-_0d758a7c-5986-fc72-0a2c-7e16d285f79d-d285f79d" className="accordion">
                        <div className="accordion_toggle">
                          <div className="c-text-2 cc-balance">What is your approach to third-party risk management?<br /></div>
                          <div chevron-x="" className="c-svg-2 cc-20 w-embed"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                              <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg></div><input accordion-checkbox="" type="checkbox" className="accordion_checkbox" />
                        </div>
                        <div accordion="element" className="accordion_dropdown">
                          <div mask-height="element">
                            <div className="accordion_content">
                              <div className="c-text-4 w-richtext">
                                <p>We carefully vet all third-party providers (e.g. hosting or logging services) to ensure they meet our strict security and compliance standards. Our due diligence includes verifying recognized certifications (e.g., SOC 2, ISO 27001), reviewing technical controls, and requiring contractual data protection obligations. We perform ongoing monitoring and periodic audits to ensure our third-party providers remain in compliance with our high security standards.<br /></p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="w-node-_98b12d19-35ec-2df0-f5bb-2bc93fdbb8b4-1bbf8481" className="c-line"></div>
                    <div id="w-node-_1b75f894-937a-a8b0-70af-42382f2ff517-1bbf8481" className="accordion-wrap">
                      <div accordion="" id="w-node-_0d758a7c-5986-fc72-0a2c-7e16d285f79d-d285f79d" className="accordion">
                        <div className="accordion_toggle">
                          <div className="c-text-2 cc-balance">How long do you store my data, and can it be deleted?</div>
                          <div chevron-x="" className="c-svg-2 cc-20 w-embed"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                              <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg></div><input accordion-checkbox="" type="checkbox" className="accordion_checkbox" />
                        </div>
                        <div accordion="element" className="accordion_dropdown">
                          <div mask-height="element">
                            <div className="accordion_content">
                              <div className="c-text-4 w-richtext">
                                <p>By default, we retain customer data indefinitely to allow users to revisit historical analysis. However, you can request data deletion at any point (including upon offboarding) to ensure your information is removed from our systems.<br /></p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="w-node-_0a20a89b-b283-5976-980a-6034e2c9ecd2-1bbf8481" className="c-line"></div>
                    <div id="w-node-b36449ba-b453-3012-0c79-892e638b5102-1bbf8481" className="accordion-wrap">
                      <div accordion="" id="w-node-_0d758a7c-5986-fc72-0a2c-7e16d285f79d-d285f79d" className="accordion">
                        <div className="accordion_toggle">
                          <div className="c-text-2 cc-balance">What kind of support and training does Brightwave provide?</div>
                          <div chevron-x="" className="c-svg-2 cc-20 w-embed"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                              <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg></div><input accordion-checkbox="" type="checkbox" className="accordion_checkbox" />
                        </div>
                        <div accordion="element" className="accordion_dropdown">
                          <div mask-height="element">
                            <div className="accordion_content">
                              <div className="c-text-4 w-richtext">
                                <p>Our team is available via dedicated support channels for quick responses to any technical or product-related questions. Additionally, we provide tutorials, webinars and detailed documentation as needed to ensure your team is fully equipped to leverage Brightwave’s capabilities from a security and compliance perspective.<br /></p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
      </div>
    </>
  )
}
