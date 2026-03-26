import type { Metadata } from 'next'
import { client } from '@/lib/sanity/client'
import { securityQuery } from '@/lib/sanity/queries/security'
import { buildMetadata } from '@/lib/metadata'
import { LottiePlayer } from '@/components/ui/LottiePlayer'

export async function generateMetadata(): Promise<Metadata> {
  const doc = await client.fetch(securityQuery, {}, { next: { tags: ['securityPage'], revalidate: 3600 } })
  if (!doc) return { title: 'Secure, Reliable AI for Financial Professionals | Brightwave' }
  return buildMetadata({
    title: doc.title || 'Secure, Reliable AI for Financial Professionals | Brightwave',
    description: doc.description || 'At Brightwave, your data security is our top priority. Through robust encryption methods, isolated storage and rigorous',
    seo: doc.seo,
    path: '/security',
  })
}

export default async function Page() {
  let doc: Record<string, string> | null = null
  try {
    doc = await client.fetch(securityQuery, {}, { next: { tags: ['securityPage'], revalidate: 3600 } })
  } catch {
    doc = null
  }

  return (
    <>
      <div className="main">
            <section className="c-section cc-legal">
              <div className="c-container">
                <div className="grid cc-8">
                  <div id="w-node-_3bbee836-a3f8-06de-9221-e35cf06798d6-529b11d5" className="legal_flex cc-gap-0">
                    <div className="legal_titles">
                      <div className="legal_title">
                        <div className="c-title-2 cc-bm">SAFETY</div>
                      </div>
                      <div className="legal_title cc-right">
                        <div className="c-title-2">&amp;</div>
                      </div>
                      <div className="legal_title cc-right">
                        <div className="c-title-2">SECURITY</div>
                      </div>
                      <div className="legal_date">
                        <div className="block"></div>
                        <div className="c-title-5">March 2024<br /></div>
                      </div>
                    </div>
                    <div>
                      <div className="legal-rt w-richtext">
                        <h2>Secure, Reliable AI for Financial Professionals</h2>
                      </div>
                      <div className="c-cta-wrapper">
                        <a stagger-cta-big="" data-w-id="f984e0fd-5317-bfcf-7b12-0d02f1476f56" href="referral.html" className="cta-p-big w-inline-block">
                          <div a-dm="" className="cta-p-big_top">
                            <div stagger-cta-text-big="" className="c-text-link cc-stagger-cta">Talk to an Expert</div>
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
                          <LottiePlayer src="https://uploads-ssl.webflow.com/6537758130c3d278e4b6eecc/6576e8acfcf807e5bebe727c_Arrow-Lottie.json" className="cta-p-big_arrows cc-lotti" loop={false} autoplay={false} /><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 74 20" fill="none" className="cta-p-big_chop">
                            <path d="M36.7933 20L74 19.9508L74 5.72205e-06L1.74845e-06 4.97481e-06L36.7933 20Z" fill="currentColor" className="path"></path>
                          </svg>
                        </a>
                      </div>
                      <div className="legal-rt cc-underline w-richtext">
                        <p>At Brightwave, we prioritize the safety of your data with industry-leading practices to ensure it remains private and accessible only to you.</p>
                        <p>‍</p>
                        <h3>Industry-Leading Encryption</h3>
                        <p>Your data is safeguarded with state-of-the-art encryption, both in transit and at rest. Every document you upload is encrypted using industry-standard methods, ensuring maximum protection from unauthorized access.</p>
                        <p>‍</p>
                        <h3>Isolated and Secure Storage</h3>
                        <p>We store your data in isolated sections of our secure infrastructure. This segregation ensures that your information remains entirely separate from other customers, guaranteeing your data’s privacy and security.</p>
                        <p>‍</p>
                        <h3>Designed for Enterprise</h3>
                        <p>Founded by engineers with experience handling the world’s most sensitive and mission-critical financial datasets, Brightwave is built from the ground up to meet the security and operational requirements of the most demanding enterprise clients.</p>
                        <h2>Frequently Asked Questions</h2>
                      </div>
                      <div accordion="" id="w-node-_0d758a7c-5986-fc72-0a2c-7e16d285f79d-d285f79d" className="accordion">
                        <div className="accordion_toggle">
                          <div className="c-text-2 cc-balance">How does Brightwave ensure the security of my uploaded documents?</div>
                          <div chevron-x="" className="c-svg-2 cc-20 w-embed"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                              <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg></div><input accordion-checkbox="" type="checkbox" className="accordion_checkbox" />
                        </div>
                        <div accordion="element" className="accordion_dropdown">
                          <div mask-height="element">
                            <div className="accordion_content">
                              <div className="c-text-4 w-richtext">
                                <p>Every document you upload is encrypted using industry-standard encryption techniques and stored in isolated, secure storage to ensure that your data is kept private and accessible only to you. Access to your sensitive information is tightly controlled. We implement strict access protocols to ensure that only authorized personnel can view or manage your data.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="c-line"></div>
                      <div accordion="" id="w-node-_0d758a7c-5986-fc72-0a2c-7e16d285f79d-d285f79d" className="accordion">
                        <div className="accordion_toggle">
                          <div className="c-text-2 cc-balance">How secure are Brightwave’s third-party integrations?</div>
                          <div chevron-x="" className="c-svg-2 cc-20 w-embed"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                              <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg></div><input accordion-checkbox="" type="checkbox" className="accordion_checkbox" />
                        </div>
                        <div accordion="element" className="accordion_dropdown">
                          <div mask-height="element">
                            <div className="accordion_content">
                              <div className="c-text-4 w-richtext">
                                <p>All data interactions with third-party large language models are encrypted, ensuring confidentiality. Responses from these services are private and exclusive to your use.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="c-line"></div>
                      <div accordion="" id="w-node-_0d758a7c-5986-fc72-0a2c-7e16d285f79d-d285f79d" className="accordion">
                        <div className="accordion_toggle">
                          <div className="c-text-2 cc-balance">What measures does Brightwave take to protect personally identifiable information (PII)?</div>
                          <div chevron-x="" className="c-svg-2 cc-20 w-embed"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                              <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg></div><input accordion-checkbox="" type="checkbox" className="accordion_checkbox" />
                        </div>
                        <div accordion="element" className="accordion_dropdown">
                          <div mask-height="element">
                            <div className="accordion_content">
                              <div className="c-text-4 w-richtext">
                                <p>We do not extract PII from your documents into separate databases. Instead, all PII remains within the original document structure, fully encrypted at all stages. Additionally, all user-uploaded documents are stored with anonymous IDs, making it impossible for anyone to identify the file’s origin.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="c-line"></div>
                      <div accordion="" id="w-node-_0d758a7c-5986-fc72-0a2c-7e16d285f79d-d285f79d" className="accordion">
                        <div className="accordion_toggle">
                          <div className="c-text-2 cc-balance">Does Brightwave use my data to train generative models?</div>
                          <div chevron-x="" className="c-svg-2 cc-20 w-embed"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                              <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg></div><input accordion-checkbox="" type="checkbox" className="accordion_checkbox" />
                        </div>
                        <div accordion="element" className="accordion_dropdown">
                          <div mask-height="element">
                            <div className="accordion_content">
                              <div className="c-text-4 w-richtext">
                                <p>No, Brightwave ensures strict data isolation. Your data is used exclusively for your own insights and is never shared or used to train our models.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="c-line"></div>
                      <div accordion="" id="w-node-_0d758a7c-5986-fc72-0a2c-7e16d285f79d-d285f79d" className="accordion">
                        <div className="accordion_toggle">
                          <div className="c-text-2 cc-balance">What should I do if I have concerns about data security?</div>
                          <div chevron-x="" className="c-svg-2 cc-20 w-embed"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                              <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg></div><input accordion-checkbox="" type="checkbox" className="accordion_checkbox" />
                        </div>
                        <div accordion="element" className="accordion_dropdown">
                          <div mask-height="element">
                            <div className="accordion_content">
                              <div className="c-text-4 w-richtext">
                                <p>If you have any questions or concerns about the security of your data, please <a href="referral.html">contact us</a> directly. Our team of experts is here to address your needs and ensure that your data remains protected at all times.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="legal-rt w-richtext">
                        <h2>Privacy and Terms</h2>
                        <p>For more detailed information regarding how we collect, use, and protect your personal data, please review our <a href="privacy-policy.html">Privacy Policy</a>. By using our services, you agree to abide by our <a href="terms-of-use.html">Terms of Use</a>, which outline the conditions for accessing and utilizing Brightwave’s platform and website.</p>
                      </div>
                      <div className="v-40 cc-tp-40">
                        <div className="c-title-4">Ready to Get Started?</div>
                        <div className="c-cta-wrapper">
                          <a stagger-cta-big="" data-w-id="f984e0fd-5317-bfcf-7b12-0d02f1476f56" href="referral.html" className="cta-p-big w-inline-block">
                            <div a-dm="" className="cta-p-big_top">
                              <div stagger-cta-text-big="" className="c-text-link cc-stagger-cta">Get Started with a Demo</div>
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
                            <LottiePlayer src="https://uploads-ssl.webflow.com/6537758130c3d278e4b6eecc/6576e8acfcf807e5bebe727c_Arrow-Lottie.json" className="cta-p-big_arrows cc-lotti" loop={false} autoplay={false} /><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 74 20" fill="none" className="cta-p-big_chop">
                              <path d="M36.7933 20L74 19.9508L74 5.72205e-06L1.74845e-06 4.97481e-06L36.7933 20Z" fill="currentColor" className="path"></path>
                            </svg>
                          </a>
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
