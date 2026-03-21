import type { Metadata } from 'next'
import { LottiePlayer } from '@/components/ui/LottiePlayer'
import HeroPrompt from '@/components/sections/HeroPrompt'
import KeyFeatures from '@/components/sections/KeyFeatures'
import { LatestReleaseNotes, LatestBlogPosts } from '@/components/sections/LatestPosts'


export const metadata: Metadata = {
  title: 'Brightwave - AI Financial Research',
  description: 'AI-powered financial research platform for investment professionals.',
}

export default function HomePage() {
  return (
    <>
<section className="c-section cc-hero">
        <div className="c-container">
          <div className="hero">
            <h1 className="c-title-1">Research agents <br />built for professionals.</h1>
          </div>
          <div className="grid">
            <div id="w-node-a3cb6969-1e3a-7786-457c-fdbdb4350bc1-f86f60fa" className="hero_text cc-top">
              <div inject-tablet="hero" className="c-text-3 u-balance">Conduct in-depth research, screen thousands of documents, and create share-ready deliverables with autonomous agents that consider every detail, source every claim, and synthesize real insights. <br /></div>
            </div>
            <div id="w-node-f2725423-f2dc-ef11-7810-6f4d54fb4c8e-f86f60fa" className="hero_text cc-buttons">
              <div className="h-20 cc-hero">
                <a stagger-cta="" href="https://app.brightwave.io/register" className="cta-p-sm w-inline-block">
                  <div>
                    <div stagger-cta-text="dark" className="c-text-link cc-stagger-cta">Try for Free</div>
                  </div>
                  <div className="flip-small">
                    <div className="flip-bg"></div>
                  </div>
                  <div className="flip-big">
                    <div className="svg cta-sm-arrow w-embed"><svg width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_774_4073)">
                          <path d="M2.27832 1.625L12.3577 1.44906L12.5325 11.4643" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel"></path>
                          <path d="M12.3563 1.44945L1.48389 12.6365" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel"></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_774_4073">
                            <rect width={12} height="11.9237" fill="white" transform="translate(0.896484 1.10547) rotate(-1)"></rect>
                          </clipPath>
                        </defs>
                      </svg></div>
                  </div>
                </a>
                <link rel="prefetch" href="https://app.brightwave.io/register" />
                <a stagger-cta="" href="/referral" className="cta-p-sm cc-stroke w-inline-block">
                  <div stagger-cta-text="dark" className="c-text-link cc-stagger-cta">Get a Demo</div>
                  <div className="flip-small">
                    <div className="flip-bg"></div>
                  </div>
                  <div className="flip-big">
                    <div className="svg cta-sm-arrow w-embed"><svg width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_774_4073)">
                          <path d="M2.27832 1.625L12.3577 1.44906L12.5325 11.4643" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel"></path>
                          <path d="M12.3563 1.44945L1.48389 12.6365" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel"></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_774_4073">
                            <rect width={12} height="11.9237" fill="white" transform="translate(0.896484 1.10547) rotate(-1)"></rect>
                          </clipPath>
                        </defs>
                      </svg></div>
                  </div>
                </a>
                <link rel="prefetch" href="/referral" />
              </div>
            </div>
          </div>
          <HeroPrompt />
          <div lottie-bg="" className="lottie-reverse">
            <div className="learning-lottie">
              <div lottie-bg="" className="lottie-crop">
                <LottiePlayer src="/webflow-documents/CTA-Lottie-25.json" className="lottie_cropped-desktop" />
                <LottiePlayer src="/webflow-documents/Generative-Loop-Final-25.json" className="lottie_cropped-mobile" />
              </div>
            </div>
          </div>
          <div className="v-20 cc-home">
            <div className="home-usp cc-left">
              <div className="eyebrow cc-no-bp">
                <div className="block cc-dm-light"></div>
                <div className="c-title-5">Traditional Process</div>
              </div>
              <div className="home-usp_inner">
                <div className="v-24 cc-12-tablet">
                  <div className="c-title-3">20 hours</div>
                  <div className="c-text-4">Manual document review.</div>
                </div>
                <div className="v-24 cc-12-tablet">
                  <div className="c-title-3">Uncertainty</div>
                  <div className="c-text-4">Critical details noticed too late.</div>
                </div>
              </div>
            </div>
            <div className="home-usp cc-right">
              <div className="eyebrow cc-no-bp">
                <div className="block cc-primary"></div>
                <div className="c-title-5 cc-primary">With Brightwave</div>
              </div>
              <div className="home-usp_inner">
                <div className="v-24 cc-12-tablet">
                  <div className="c-title-3">5 minutes</div>
                  <div className="c-text-4">Custom outputs on demand.</div>
                </div>
                <div className="v-24 cc-12-tablet">
                  <div className="c-title-3">Confidence</div>
                  <div className="c-text-4">No stone is left unturned.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="c-section">
        <div className="c-container">
          <div className="grid">
            <div id="w-node-_9b9ddfcb-6d2a-87a1-d17c-e9f678accebf-f86f60fa" className="c-title-5 u-balance">Featured in renowned publications and trusted by industry leaders.</div>
            <div id="w-node-_14d87916-2524-3389-bb0c-e4ab4b8cf925-f86f60fa" className="logos"><img src="/webflow-images/Frame-1321316806.avif" loading="eager" width={191} alt="fortune" className="logo_item" /><img src="/webflow-images/Frame-1321316797.avif" loading="eager" width={191} alt="WSJ pro" className="logo_item" /><img src="/webflow-images/Frame-1321316805.avif" loading="eager" width={191} alt="Axios" className="logo_item" /><img src="/webflow-images/american-banker.svg" loading="eager" width={191} alt="" className="logo_item" /><img src="/webflow-images/Frame-1321316804.avif" loading="eager" width={191} alt="Fox Business" className="logo_item" /><img src="/webflow-images/latent-space.png" loading="eager" width={191} alt="" className="logo_item" /><img src="/webflow-images/Frame-1321316818.avif" loading="eager" width={191} alt="Cerebral valley" className="logo_item" /><img src="/webflow-images/Frame-1321316819.avif" loading="eager" width={191} alt="" className="logo_item" /><img src="/webflow-images/Frame-1321316820.avif" loading="eager" width={191} alt="" className="logo_item" /><img src="/webflow-images/TIme.avif" loading="eager" width={191} alt="" className="logo_item" /></div>
          </div>
        </div>
      </section>
      <section className="c-section">
        <div className="c-container">
          <KeyFeatures />
        </div>
      </section>
      <section className="c-section">
        <div className="c-container">
          <div className="usp-tables">
            <div className="usp-table">
              <div className="usp-table_top">
                <div className="c-title-4 cc-white-dynamic">Before Brightwave</div>
              </div>
              <div className="usp-table_bottom">
                <div className="c-text-3">Critical details go missing</div>
                <div className="c-line"></div>
                <div className="c-text-3">Endless CTRL-F</div>
                <div className="c-line"></div>
                <div className="c-text-3">Short on team bandwidth</div>
                <div className="c-line"></div>
                <div className="c-text-3">Half-baked prompts</div>
                <div className="c-line"></div>
                <div className="c-text-3">Race to disseminate new information</div>
              </div>
            </div>
            <div className="usp-table">
              <div className="usp-table_top cc-brigtwave">
                <div className="c-title-4 cc-dark">After Brightwave</div>
              </div>
              <div className="usp-table_bottom">
                <div className="c-text-3">Agents surface key insights</div>
                <div className="c-line"></div>
                <div className="c-text-3">Synthesize across 2000+ documents</div>
                <div className="c-line"></div>
                <div className="c-text-3">Massive capacity unlock</div>
                <div className="c-line"></div>
                <div className="c-text-3">Custom research from your templates</div>
                <div className="c-line"></div>
                <div className="c-text-3">Self-updating, sharable outputs </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section no-fade="" className="c-section">
        <div className="c-container">
          <div className="slider-wrap"><img width="294.5" loading="lazy" alt="" src="/webflow-images/testimonial.svg" className="slider_img" />
            <LottiePlayer src="/webflow-documents/Testimonial-BG-25.json" className="slider_lottie" />
            <div className="slider w-dyn-list">
              <div slider="" role="list" className="slider_list w-dyn-items">
                <div role="listitem" className="slider_cms-item w-dyn-item">
                  <div className="slider_item">
                    <div slider-a-1="" className="slider_flex">
                      <div slider-a-3="" className="eyebrow-flex">
                        <div className="block cc-primary"></div>
                        <div className="c-title-5 cc-primary w-dyn-bind-empty"></div>
                      </div>
                      <div slider-a-2="" className="c-title-4 cc-white w-dyn-bind-empty"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-dyn-empty">
                <div>No items found.</div>
              </div>
            </div>
            <div className="slider_arrows">
              <div id="arrow-left" className="slider_arrow cc-prev">
                <div className="svg cc-nav-arrow-bg w-embed"><svg width={54} height={51} viewBox="0 0 54 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M54 5.59996L48.75 -3.8147e-05H6L0.375 5.99996L0 5.59996V45.4L0.375 45L6 51H48.75L54 45.4V5.59996Z" fill="white"></path>
                  </svg></div>
                <div className="arrow-wrap cc-2">
                  <div className="nav_arrow-svg cc-slider w-embed"><svg width={28} height={27} viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_575_3505)">
                        <path d="M13.1074 24.8372L1.73026 13.46L13.0351 2.15519" stroke="#0F0F0F" strokeWidth="1.4453" strokeLinejoin="bevel"></path>
                        <path d="M1.73274 13.4614L26.6312 13.5408" stroke="#0F0F0F" strokeWidth="2" strokeLinejoin="bevel"></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_575_3505">
                          <rect width="19.1528" height="19.031" fill="white" transform="translate(14.043 27) rotate(-135)"></rect>
                        </clipPath>
                      </defs>
                    </svg></div>
                </div>
                <div className="arrow-wrap">
                  <div className="nav_arrow-svg cc-slider w-embed"><svg width={28} height={27} viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_575_3505)">
                        <path d="M13.1074 24.8372L1.73026 13.46L13.0351 2.15519" stroke="#0F0F0F" strokeWidth="1.4453" strokeLinejoin="bevel"></path>
                        <path d="M1.73274 13.4614L26.6312 13.5408" stroke="#0F0F0F" strokeWidth="2" strokeLinejoin="bevel"></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_575_3505">
                          <rect width="19.1528" height="19.031" fill="white" transform="translate(14.043 27) rotate(-135)"></rect>
                        </clipPath>
                      </defs>
                    </svg></div>
                </div>
              </div>
              <div id="arrow-right" className="slider_arrow">
                <div className="svg cc-nav-arrow-bg w-embed"><svg width={54} height={51} viewBox="0 0 54 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M54 5.59996L48.75 -3.8147e-05H6L0.375 5.99996L0 5.59996V45.4L0.375 45L6 51H48.75L54 45.4V5.59996Z" fill="white"></path>
                  </svg></div>
                <div className="arrow-wrap cc-2">
                  <div className="nav_arrow-svg cc-slider w-embed"><svg width={28} height={27} viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_782_8055)">
                        <path d="M14.8926 24.8372L26.2697 13.46L14.9649 2.15519" stroke="#0F0F0F" strokeWidth="1.4453" strokeLinejoin="bevel"></path>
                        <path d="M26.2663 13.4614L1.36784 13.5408" stroke="#0F0F0F" strokeWidth="2" strokeLinejoin="bevel"></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_782_8055">
                          <rect width="19.1528" height="19.031" fill="white" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 13.957 27)"></rect>
                        </clipPath>
                      </defs>
                    </svg></div>
                </div>
                <div className="arrow-wrap">
                  <div className="nav_arrow-svg cc-slider w-embed"><svg width={28} height={27} viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_782_8055)">
                        <path d="M14.8926 24.8372L26.2697 13.46L14.9649 2.15519" stroke="#0F0F0F" strokeWidth="1.4453" strokeLinejoin="bevel"></path>
                        <path d="M26.2663 13.4614L1.36784 13.5408" stroke="#0F0F0F" strokeWidth="2" strokeLinejoin="bevel"></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_782_8055">
                          <rect width="19.1528" height="19.031" fill="white" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 13.957 27)"></rect>
                        </clipPath>
                      </defs>
                    </svg></div>
                </div>
              </div>
            </div>
            <div className="slider_test">
              <div className="c-title-5"><span className="hide-tablet">Customer </span>Testimonials</div>
            </div>
          </div>
        </div>
      </section>
      <section className="c-section">
        <div className="c-container">
          <div className="v-60">
            <div>
              <div className="learning-lottie">
                <div lottie-bg="" className="lottie-crop">
                  <LottiePlayer src="/webflow-documents/CTA-Lottie-25.json" className="lottie_cropped-desktop" />
                  <LottiePlayer src="/webflow-documents/Generative-Loop-Final-25.json" className="lottie_cropped-mobile" />
                </div>
              </div>
            </div>
            <div className="titles">
              <div className="title_flex">
                <div className="c-title-cta">EXPLORE</div>
              </div>
              <div className="title_flex cc-explore">
                <div className="c-title-cta cc-new-grey">THE</div>
                <div className="c-title-cta">Platform</div>
              </div>
            </div>
            <div className="h-flex-20">
              <div className="explore-item">
                <div className="aspect-16-9">
                  <div className="u-relative"><img src="/webflow-images/illustration_Investment-Intelligence-Engine.svg" loading="lazy" width={70} light-asset="" alt="" className="image-abso" /><img src="/webflow-images/illustration_Investment-Intelligence-Engine-1.svg" loading="lazy" width={70} dark-asset="" alt="" className="image-abso" /></div>
                </div>
                <div className="v-64 cc-fill">
                  <div className="v-20 cc-explore">
                    <div className="c-title-3">Research Intelligence Engine</div>
                    <div className="c-text-4">Process entire data rooms and produce high-quality deliveables in minutes. Surface material factors instantly. Never miss a critical detail.</div>
                  </div>
                  <a stagger-cta="" href="/investment-intelligence-engine" className="cta-p-sm w-inline-block">
                    <div>
                      <div stagger-cta-text="dark" className="c-text-link cc-stagger-cta">Learn more</div>
                    </div>
                    <div className="flip-small">
                      <div className="flip-bg"></div>
                    </div>
                    <div className="flip-big">
                      <div className="svg cta-sm-arrow w-embed"><svg width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_774_4073)">
                            <path d="M2.27832 1.625L12.3577 1.44906L12.5325 11.4643" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel"></path>
                            <path d="M12.3563 1.44945L1.48389 12.6365" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel"></path>
                          </g>
                          <defs>
                            <clipPath id="clip0_774_4073">
                              <rect width={12} height="11.9237" fill="white" transform="translate(0.896484 1.10547) rotate(-1)"></rect>
                            </clipPath>
                          </defs>
                        </svg></div>
                    </div>
                  </a>
                </div>
              </div>
              <div className="explore-item">
                <div className="aspect-16-9">
                  <div className="u-relative"><img src="/webflow-images/illustration_Enterprise-Trust--Security.svg" loading="lazy" width={70} light-asset="" alt="" className="image-abso" /><img src="/webflow-images/illustration_Enterprise-Trust--Security-1.svg" loading="lazy" width={70} dark-asset="" alt="" className="image-abso" /></div>
                </div>
                <div className="v-64 cc-fill">
                  <div className="v-20 cc-explore">
                    <div className="c-title-3">SOC 2 Type II Compliant</div>
                    <div className="c-text-4">Exchange-grade security built by financial services veterans with robust data isolation and quality controls.</div>
                  </div>
                  <a stagger-cta="" href="/enterprise-security-compliance" className="cta-p-sm w-inline-block">
                    <div>
                      <div stagger-cta-text="dark" className="c-text-link cc-stagger-cta">Learn More</div>
                    </div>
                    <div className="flip-small">
                      <div className="flip-bg"></div>
                    </div>
                    <div className="flip-big">
                      <div className="svg cta-sm-arrow w-embed"><svg width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_774_4073)">
                            <path d="M2.27832 1.625L12.3577 1.44906L12.5325 11.4643" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel"></path>
                            <path d="M12.3563 1.44945L1.48389 12.6365" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel"></path>
                          </g>
                          <defs>
                            <clipPath id="clip0_774_4073">
                              <rect width={12} height="11.9237" fill="white" transform="translate(0.896484 1.10547) rotate(-1)"></rect>
                            </clipPath>
                          </defs>
                        </svg></div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <LatestReleaseNotes />
      <LatestBlogPosts />
      
    </>
  )
}
