import type { Metadata } from 'next'
import { LottiePlayer } from '@/components/ui/LottiePlayer'
import { RoiCalculator } from './roi-calculator'

export const metadata: Metadata = {
  title: 'Enterprise | Brightwave',
  description:
    'Turn a 5-hour CIM review into a 30-minute strategic briefing. Brightwave synthesizes filings, transcripts, and market data into actionable intelligence for private markets firms.',
}

export default function EnterprisePricingPage() {
  return (
    <>
    <div className="w-embed">
      {/* Inline Webflow styles */}
<style dangerouslySetInnerHTML={{ __html: `
[slider-accordion].cc-active [slider-text]{
	color: var(--darkmode--onsurface);
}
.u-dark-mode [slider-accordion].cc-active [slider-text]{
	color: var(--grey-800)!important;
}
.ui-slider_left_item.cc-active .slider-ui_left_icon-wrap{
	background-color: var(--lightmode--primary);
}
.ui-slider_left_item.cc-active .slider-ui_left_icon{
filter: brightness(0);
}
` }} />
    </div>
    <div className="w-embed">
      {/* Inline Webflow styles */}
<style dangerouslySetInnerHTML={{ __html: `
html.wf-design-mode .num-slider_item{
	display:none;
}
` }} />
    </div>
    <div className="main">
      <section className="c-section ent-price-hero">
        <div className="c-container">
          <div className="ent-pricing_hero-content">
            <div className="c-ent-price_hero-wrapper">
              <div>
                <h1 className="c-title-3">Turn a 5-Hour CIM Review Into a 30-Minute Strategic Briefing.</h1>
              </div>
              <div className="text-cta ent-price-hero">
                <div>
                  <div className="c-text-3">Brightwave synthesizes the flood of filings, transcripts, sell-side analysis and market chatter into real, actionable intelligence—so you move fast, stay sharp, and confidently act on the best opportunities.</div>
                </div>
                <div className="h-20">
                  <a stagger-cta="" href="/contact" className="cta-p-sm w-inline-block">
                    <div>
                      <div stagger-cta-text="dark" className="c-text-link cc-stagger-cta">Book a demo</div>
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
                  <a stagger-cta="" href="#" className="cta-p-sm cc-stroke w-inline-block">
                    <div stagger-cta-text="dark" className="c-text-link cc-stagger-cta">See How It Works</div>
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
            </div>
            <div className="c-ent-price_wizard-wrapper">
              <RoiCalculator />
            </div>
          </div>
        </div>
      </section>
      <section className="c-section cc-program-lottie">
        <div className="c-container">
          <div lottie-bg="" className="lottie-crop cc-market">
            <LottiePlayer src="/webflow-documents/Generative-Loop-Final-25.json" className="lottie_cropped-desktop cc-market" loop={true} autoplay={true} />
            <LottiePlayer src="/webflow-documents/Generative-Loop-Final.json" className="lottie_cropped-mobile" loop={true} autoplay={true} />
          </div>
        </div>
      </section>
      <section className="c-section ent-pricing-proofs">
        <div className="c-container">
          <div className="partner-proofs_main-wrapper">
            <div>
              <div className="small-marquee_wrapper">
                <div className="small-marquee_header">
                  <div className="c-title-5">Trusted by leading private markets firms</div>
                </div>
                <div marquee="" className="marquee-horizontal">
                  <div className="marquee-horizontal-alt-css w-embed">
                    {/* Inline Webflow styles */}
<style dangerouslySetInnerHTML={{ __html: `
:root {
  --gap: 5rem; /* default for larger screens */
  --duration: 30s;
  --scroll-start: 0;
  --scroll-end: calc(-50% - (var(--gap) / 2));
}
@media (max-width: 767px) {
  :root {
    --gap: 2.5rem;
  }
}
.marquee {
  display: flex;
  overflow: hidden;
  user-select: none;
  gap: var(--gap);
  mask-image: linear-gradient(
    to right,
    hsl(0 0% 0% / 0),
    hsl(0 0% 0% / 1) 20%,
    hsl(0 0% 0% / 1) 80%,
    hsl(0 0% 0% / 0)
  );
}
.marquee__group {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: var(--gap);
  min-width: 100%;
  animation: scroll-x var(--duration) linear infinite;
}
@keyframes scroll-x {
  from {
    transform: translateX(var(--scroll-start));
  }
  to {
    transform: translateX(var(--scroll-end));
  }
}
` }} />
                  </div>
                  <div className="marquee">
                    <div className="marquee__group">
                      <div className="marquee-logo"><img src="/webflow-images/fortune.avif" loading="lazy" width="105.5" fetchPriority="high" alt="" /></div>
                      <div className="marquee-logo"><img src="/webflow-images/axios.avif" loading="lazy" width="93.5" fetchPriority="high" alt="" /></div>
                      <div className="marquee-logo"><img src="/webflow-images/american-banker.avif" loading="lazy" width="214" fetchPriority="high" alt="" /></div>
                      <div className="marquee-logo"><img src="/webflow-images/wjs-pro.avif" loading="lazy" width="126.5" fetchPriority="high" alt="" /></div>
                      <div className="marquee-logo"><img src="/webflow-images/tech-crunch.avif" loading="lazy" width="204.5" fetchPriority="high" alt="" /></div>
                      <div className="marquee-logo"><img src="/webflow-images/time_1.avif" loading="lazy" width="97" fetchPriority="high" alt="" /></div>
                      <div className="marquee-logo"><img src="/webflow-images/latent.avif" loading="lazy" width="62.5" fetchPriority="high" alt="" /></div>
                      <div className="marquee-logo"><img src="/webflow-images/fox-business.avif" loading="lazy" width="69.5" fetchPriority="high" alt="" /></div>
                      <div className="marquee-logo"><img src="/webflow-images/%3Edf.avif" loading="lazy" width="52.5" fetchPriority="high" alt="" /></div>
                      <div className="marquee-logo"><img src="/webflow-images/cerebral.avif" loading="lazy" width="92.5" fetchPriority="high" alt="" /></div>
                      <div className="marquee-logo"><img src="/webflow-images/fortune.avif" loading="lazy" width="105.5" alt="" /></div>
                      <div className="marquee-logo"><img src="/webflow-images/axios.avif" loading="lazy" width="93.5" alt="" /></div>
                      <div className="marquee-logo"><img src="/webflow-images/american-banker.avif" loading="lazy" width="214" alt="" /></div>
                      <div className="marquee-logo"><img src="/webflow-images/wjs-pro.avif" loading="lazy" width="126.5" alt="" /></div>
                      <div className="marquee-logo"><img src="/webflow-images/tech-crunch.avif" loading="lazy" width="204.5" alt="" /></div>
                      <div className="marquee-logo"><img src="/webflow-images/time_1.avif" loading="lazy" width="97" alt="" /></div>
                      <div className="marquee-logo"><img src="/webflow-images/latent.avif" loading="lazy" width="62.5" alt="" /></div>
                      <div className="marquee-logo"><img src="/webflow-images/fox-business.avif" loading="lazy" width="69.5" alt="" /></div>
                      <div className="marquee-logo"><img src="/webflow-images/%3Edf.avif" loading="lazy" width="52.5" alt="" /></div>
                      <div className="marquee-logo"><img src="/webflow-images/cerebral.avif" loading="lazy" width="92.5" alt="" /></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="partner-proofs_wrapper">
              <div>
                <div className="eyebrow cc-no-bp blue">
                  <div className="block blue"></div>
                  <div className="c-title-5">Key Proof Points</div>
                </div>
              </div>
              <div className="partner-proof_points col-3">
                <div className="partner-proof_point">
                  <h3 className="c-title-4">[X]+ Firms</h3>
                  <div className="c-text-4">Private markets firms across PE, credit, and growth equity</div>
                </div>
                <div className="partner-proof_point">
                  <h3 className="c-title-4">$[X]B+ AUM</h3>
                  <div className="c-text-4">Combined assets under management across our customer base</div>
                </div>
                <div className="partner-proof_point">
                  <h3 className="c-title-4">[X]M+ Documents Analyzed</h3>
                  <div className="c-text-4">CIMs, data room files, credit agreements, and portfolio reports processed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="c-section ent-price-research">
        <div className="c-container">
          <div className="v-64 cc-stretch">
            <div className="ent-price-research_header">
              <h2 className="c-title-3">AI Research That Your Investment Committee Can Actually Trust</h2>
            </div>
            <div className="c-abm-temp-chal_header-wrapper">
              <div className="c-abm-temp-chal_header">
                <div className="c-amb-temp-chal_box"></div>
                <div className="c-title-5">Solution Overview</div>
              </div>
            </div>
            <div className="ent-price-research_main-wrapper">
              <div id="w-node-_26ce0361-b134-8876-cb28-6c8325fe2322-0464d2c1" className="stretch-child">
                <div className="c-text-4">Brightwave is an AI-native research platform built exclusively for buy-side private markets professionals. It does not summarize documents and hope for the best. It analyzes them -- extracting key data, identifying risks, surfacing contradictions, and generating structured outputs where every claim traces to its source document, page, and paragraph.<br />‍<br />Your team uploads a CIM, a data room, a set of credit agreements, or a portfolio of quarterly reports. Brightwave reads everything, structures the information, and delivers analysis that is ready for your Investment Committee -- not a rough draft that needs three rounds of manual verification.<br />‍<br />The result is not just speed (though you will move faster). It is depth. Your team analyzes more deals, catches more risks, monitors more portfolio companies, and produces higher-quality research -- without adding headcount. The associates who used to spend 60% of their day on data extraction now spend it on judgment, pattern recognition, and insight generation. The work that actually matters.</div>
              </div>
              <div id="w-node-f9ae8fe7-8f00-3ade-a63e-f85227591594-0464d2c1" className="stretch-child img">
                <div className="partner-about_image-wrapper">
                  <LottiePlayer src="/webflow-documents/About-Lottie-25.json" className="partner-about_lottie-wrapper" loop={false} autoplay={true} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="c-section ent-price-cards">
        <div className="c-container">
          <div className="c-abm-temp_chal_main-wrapper">
            <div className="c-abm-temp-chal_header-wrapper">
              <div className="c-abm-temp-chal_header">
                <div className="c-amb-temp-chal_box"></div>
                <div className="c-title-5">Core Capability</div>
              </div>
            </div>
            <div className="c-abm-temp-chal_card-wrapper c-abm-template_grid">
              <div id="w-node-a775d520-4823-fc86-7112-94123056007b-0464d2c1" className="c-amb-temp-chal_sticky">
                <div className="c-abm-temp-chal_title-wrapper">
                  <h2 className="c-title-3">Who Should Become a Partner</h2>
                </div>
                <div className="c-abm-temp-chal_button-wrapper">
                  <a stagger-cta="" href="#" className="cta-p-sm w-inline-block">
                    <div>
                      <div stagger-cta-text="dark" className="c-text-link cc-stagger-cta">Book a demo</div>
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
                  <a stagger-cta="" href="#" className="cta-p-sm cc-stroke w-inline-block">
                    <div stagger-cta-text="dark" className="c-text-link cc-stagger-cta">See How It Works</div>
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
              <div id="w-node-a775d520-4823-fc86-7112-941230560082-0464d2c1" className="c-abm-temp-chal_card-list">
                <div>
                  <div className="c-abm-temp-chal_card">
                    <div className="c-abm-temp-chal_card-content">
                      <div className="c-text-3 cc-500">Document Analysis</div>
                      <div className="c-text-5">Turn 500 Pages Into a Structured Briefing in Minutes</div>
                    </div>
                    <div className="c-abm-temp-chal_card-highlight">
                      <div className="c-abm-temp-chal_card-icon-wrapper">
                        <div className="c-abm-temp-chal_icon w-embed"><svg width="100%" height="100%" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.0631 8.24795V11.6458L10.6197 12.0987L6.84961 8.24795C6.84961 8.05359 6.84961 7.94459 6.84961 7.75024L11.4371 3.06457L11.5085 2.99165C11.6279 2.94114 11.7336 2.89634 11.853 2.84583H14.1303C14.3206 3.04018 14.4278 3.14943 14.6183 3.34378V7.25377C14.4285 7.44763 14.3223 7.55613 14.1325 7.74999H11.5504L11.0631 8.2477V8.24795Z" fill="#0F0F0F"></path>
                            <path d="M0 2.84589L0.434168 2.39895L2.78627 4.80139C3.05525 4.80139 3.20655 4.80139 3.47553 4.80139L6.01817 2.20435L8.17634 0H8.86535L11.0635 2.24516V2.74287L10.9626 2.84589L6.50569 7.39818L6.30396 7.60423L5.95945 7.75006H0.488013C0.29773 7.5557 0.191015 7.4467 0.000731636 7.25235V7.24439" fill="#0F0F0F"></path>
                            <path d="M0 8.75335V13.1518L0.436117 13.5973L2.78627 11.1968C3.05525 11.1968 3.20655 11.1968 3.47553 11.1968L6.49936 14.2854L8.17828 16C8.44751 16 8.59832 16 8.8673 16L11.0635 13.7568V13.2551L10.9626 13.1521L6.50569 8.5998L6.30396 8.39375C6.18457 8.34324 6.07883 8.29844 5.95945 8.24792H0.488013C0.29773 8.44228 0.191015 8.55128 0.000731636 8.74563V8.7536L0 8.75335Z" fill="#0F0F0F"></path>
                            <path d="M12.0376 8.24792H14.1309C14.3212 8.44228 14.4279 8.55128 14.6182 8.74563V12.6541C14.4279 12.8485 14.3212 12.9575 14.1309 13.1518H12.0376L11.5503 12.6541V8.74563L12.0376 8.24792Z" fill="#0F0F0F"></path>
                          </svg></div>
                      </div>
                      <div className="c-abm-temp-chal_card-text-stack">
                        <div className="c-abm-temp-chal_card-title-wrapper">
                          <div className="c-text-4 cc-weight-500">How Brightwave Helps:</div>
                        </div>
                        <div className="c-abm-temp-chal_card-text-wrapper">
                          <p className="c-text-5">Upload a CIM, data room, or any collection of deal documents. Brightwave reads every page, extracts key financial metrics, flags risk factors, identifies competitive dynamics, and produces a structured briefing you can act on immediately. What used to take an associate 3-5 hours of manual extraction now takes less than 30 minutes -- with every data point linked to its source.</p>
                        </div>
                      </div>
                      <div className="c-abm-temp-chal_card-top-box"></div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="c-abm-temp-chal_card">
                    <div className="c-abm-temp-chal_card-content">
                      <div className="c-text-3 cc-500">AI-Generated Reports</div>
                      <div className="c-text-5">IC-Ready Analysis With Every Claim Cited to Source</div>
                    </div>
                    <div className="c-abm-temp-chal_card-highlight">
                      <div className="c-abm-temp-chal_card-icon-wrapper">
                        <div className="c-abm-temp-chal_icon w-embed"><svg width="100%" height="100%" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.0631 8.24795V11.6458L10.6197 12.0987L6.84961 8.24795C6.84961 8.05359 6.84961 7.94459 6.84961 7.75024L11.4371 3.06457L11.5085 2.99165C11.6279 2.94114 11.7336 2.89634 11.853 2.84583H14.1303C14.3206 3.04018 14.4278 3.14943 14.6183 3.34378V7.25377C14.4285 7.44763 14.3223 7.55613 14.1325 7.74999H11.5504L11.0631 8.2477V8.24795Z" fill="#0F0F0F"></path>
                            <path d="M0 2.84589L0.434168 2.39895L2.78627 4.80139C3.05525 4.80139 3.20655 4.80139 3.47553 4.80139L6.01817 2.20435L8.17634 0H8.86535L11.0635 2.24516V2.74287L10.9626 2.84589L6.50569 7.39818L6.30396 7.60423L5.95945 7.75006H0.488013C0.29773 7.5557 0.191015 7.4467 0.000731636 7.25235V7.24439" fill="#0F0F0F"></path>
                            <path d="M0 8.75335V13.1518L0.436117 13.5973L2.78627 11.1968C3.05525 11.1968 3.20655 11.1968 3.47553 11.1968L6.49936 14.2854L8.17828 16C8.44751 16 8.59832 16 8.8673 16L11.0635 13.7568V13.2551L10.9626 13.1521L6.50569 8.5998L6.30396 8.39375C6.18457 8.34324 6.07883 8.29844 5.95945 8.24792H0.488013C0.29773 8.44228 0.191015 8.55128 0.000731636 8.74563V8.7536L0 8.75335Z" fill="#0F0F0F"></path>
                            <path d="M12.0376 8.24792H14.1309C14.3212 8.44228 14.4279 8.55128 14.6182 8.74563V12.6541C14.4279 12.8485 14.3212 12.9575 14.1309 13.1518H12.0376L11.5503 12.6541V8.74563L12.0376 8.24792Z" fill="#0F0F0F"></path>
                          </svg></div>
                      </div>
                      <div className="c-abm-temp-chal_card-text-stack">
                        <div className="c-abm-temp-chal_card-title-wrapper">
                          <div className="c-text-4 cc-weight-500">How Brightwave Helps:</div>
                        </div>
                        <div className="c-abm-temp-chal_card-text-wrapper">
                          <p className="c-text-5">Brightwave generates structured research reports -- market analyses, competitive assessments, risk summaries, and deal evaluations -- that are formatted for your Investment Committee. Every finding includes inline citations to the specific source document and page. Your team reviews and refines the analysis. They do not rebuild it from scratch.</p>
                        </div>
                      </div>
                      <div className="c-abm-temp-chal_card-top-box"></div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="c-abm-temp-chal_card">
                    <div className="c-abm-temp-chal_card-content">
                      <div className="c-text-3 cc-500">Inefficient senior professional utilization</div>
                      <div className="c-text-5">When your senior credit professionals spend hours synthesizing data rooms instead of negotiating terms, your deal capacity suffers. High-value underwriting expertise shouldn't be wasted on low-value document preparation and data extraction.</div>
                    </div>
                    <div className="c-abm-temp-chal_card-highlight">
                      <div className="c-abm-temp-chal_card-icon-wrapper">
                        <div className="c-abm-temp-chal_icon w-embed"><svg width="100%" height="100%" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.0631 8.24795V11.6458L10.6197 12.0987L6.84961 8.24795C6.84961 8.05359 6.84961 7.94459 6.84961 7.75024L11.4371 3.06457L11.5085 2.99165C11.6279 2.94114 11.7336 2.89634 11.853 2.84583H14.1303C14.3206 3.04018 14.4278 3.14943 14.6183 3.34378V7.25377C14.4285 7.44763 14.3223 7.55613 14.1325 7.74999H11.5504L11.0631 8.2477V8.24795Z" fill="#0F0F0F"></path>
                            <path d="M0 2.84589L0.434168 2.39895L2.78627 4.80139C3.05525 4.80139 3.20655 4.80139 3.47553 4.80139L6.01817 2.20435L8.17634 0H8.86535L11.0635 2.24516V2.74287L10.9626 2.84589L6.50569 7.39818L6.30396 7.60423L5.95945 7.75006H0.488013C0.29773 7.5557 0.191015 7.4467 0.000731636 7.25235V7.24439" fill="#0F0F0F"></path>
                            <path d="M0 8.75335V13.1518L0.436117 13.5973L2.78627 11.1968C3.05525 11.1968 3.20655 11.1968 3.47553 11.1968L6.49936 14.2854L8.17828 16C8.44751 16 8.59832 16 8.8673 16L11.0635 13.7568V13.2551L10.9626 13.1521L6.50569 8.5998L6.30396 8.39375C6.18457 8.34324 6.07883 8.29844 5.95945 8.24792H0.488013C0.29773 8.44228 0.191015 8.55128 0.000731636 8.74563V8.7536L0 8.75335Z" fill="#0F0F0F"></path>
                            <path d="M12.0376 8.24792H14.1309C14.3212 8.44228 14.4279 8.55128 14.6182 8.74563V12.6541C14.4279 12.8485 14.3212 12.9575 14.1309 13.1518H12.0376L11.5503 12.6541V8.74563L12.0376 8.24792Z" fill="#0F0F0F"></path>
                          </svg></div>
                      </div>
                      <div className="c-abm-temp-chal_card-text-stack">
                        <div className="c-abm-temp-chal_card-title-wrapper">
                          <div className="c-text-4 cc-weight-500">How Brightwave Helps:</div>
                        </div>
                        <div className="c-abm-temp-chal_card-text-wrapper">
                          <p className="c-text-5">Empower your team to process data rooms 25x faster, allowing senior talent to focus on structuring situational capital solutions. Start processing your first deal in under 30 seconds to reclaim time for high-leverage decision making.</p>
                        </div>
                      </div>
                      <div className="c-abm-temp-chal_card-top-box"></div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="c-abm-temp-chal_card">
                    <div className="c-abm-temp-chal_card-content">
                      <div className="c-text-3 cc-500">Inefficient senior professional utilization</div>
                      <div className="c-text-5">When your senior credit professionals spend hours synthesizing data rooms instead of negotiating terms, your deal capacity suffers. High-value underwriting expertise shouldn't be wasted on low-value document preparation and data extraction.</div>
                    </div>
                    <div className="c-abm-temp-chal_card-highlight">
                      <div className="c-abm-temp-chal_card-icon-wrapper">
                        <div className="c-abm-temp-chal_icon w-embed"><svg width="100%" height="100%" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.0631 8.24795V11.6458L10.6197 12.0987L6.84961 8.24795C6.84961 8.05359 6.84961 7.94459 6.84961 7.75024L11.4371 3.06457L11.5085 2.99165C11.6279 2.94114 11.7336 2.89634 11.853 2.84583H14.1303C14.3206 3.04018 14.4278 3.14943 14.6183 3.34378V7.25377C14.4285 7.44763 14.3223 7.55613 14.1325 7.74999H11.5504L11.0631 8.2477V8.24795Z" fill="#0F0F0F"></path>
                            <path d="M0 2.84589L0.434168 2.39895L2.78627 4.80139C3.05525 4.80139 3.20655 4.80139 3.47553 4.80139L6.01817 2.20435L8.17634 0H8.86535L11.0635 2.24516V2.74287L10.9626 2.84589L6.50569 7.39818L6.30396 7.60423L5.95945 7.75006H0.488013C0.29773 7.5557 0.191015 7.4467 0.000731636 7.25235V7.24439" fill="#0F0F0F"></path>
                            <path d="M0 8.75335V13.1518L0.436117 13.5973L2.78627 11.1968C3.05525 11.1968 3.20655 11.1968 3.47553 11.1968L6.49936 14.2854L8.17828 16C8.44751 16 8.59832 16 8.8673 16L11.0635 13.7568V13.2551L10.9626 13.1521L6.50569 8.5998L6.30396 8.39375C6.18457 8.34324 6.07883 8.29844 5.95945 8.24792H0.488013C0.29773 8.44228 0.191015 8.55128 0.000731636 8.74563V8.7536L0 8.75335Z" fill="#0F0F0F"></path>
                            <path d="M12.0376 8.24792H14.1309C14.3212 8.44228 14.4279 8.55128 14.6182 8.74563V12.6541C14.4279 12.8485 14.3212 12.9575 14.1309 13.1518H12.0376L11.5503 12.6541V8.74563L12.0376 8.24792Z" fill="#0F0F0F"></path>
                          </svg></div>
                      </div>
                      <div className="c-abm-temp-chal_card-text-stack">
                        <div className="c-abm-temp-chal_card-title-wrapper">
                          <div className="c-text-4 cc-weight-500">How Brightwave Helps:</div>
                        </div>
                        <div className="c-abm-temp-chal_card-text-wrapper">
                          <p className="c-text-5">Empower your team to process data rooms 25x faster, allowing senior talent to focus on structuring situational capital solutions. Start processing your first deal in under 30 seconds to reclaim time for high-leverage decision making.</p>
                        </div>
                      </div>
                      <div className="c-abm-temp-chal_card-top-box"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section no-fade="" className="c-section ent-price-slider">
        <div className="c-container">
          <div className="smart-tabs-wrapper">
            <div className="smart-tabs-left">
              <div className="smart-tabs-links"></div>
              <div className="smart-tabs-paragraphs">
                <div className="smart-tabs-p-item"></div>
                <div className="smart-tabs-p-item"></div>
                <div className="smart-tabs-p-item"></div>
                <div className="smart-tabs-p-item"></div>
                <div className="smart-tabs-p-item"></div>
              </div>
            </div>
            <div className="smart-tabs-right">
              <div className="smart-tabs-element">
                <div className="div-block-111"><img src="/webflow-images/placeholder.svg" loading="lazy" alt="" className="image-14" /></div>
                <div className="div-block-112"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section no-fade="" className="c-section ent-price-slider">
        <div className="c-container">
          <div className="slider-wrap">
            <LottiePlayer src="/webflow-documents/Testimonial-BG-25.json" className="slider_lottie" loop={true} autoplay={true} />
            <div className="slider w-dyn-list">
              <div slider="" role="list" className="slider_list w-dyn-items">
                <div role="listitem" className="slider_cms-item w-dyn-item">
                  <div className="slider_item">
                    <div slider-a-1="" className="slider_flex ent-price">
                      <div slider-a-3="" className="eyebrow-flex">
                        <div className="block cc-primary"></div>
                        <div className="c-title-5 cc-primary w-dyn-bind-empty"></div>
                      </div>
                      <div slider-a-2="" className="c-text-2 w-dyn-bind-empty"></div>
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
                <div className="svg cc-nav-arrow-bg w-embed"><svg width="54" height="51" viewBox="0 0 54 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M54 5.59996L48.75 -3.8147e-05H6L0.375 5.99996L0 5.59996V45.4L0.375 45L6 51H48.75L54 45.4V5.59996Z" fill="white"></path>
                  </svg></div>
                <div className="arrow-wrap cc-2">
                  <div className="nav_arrow-svg cc-slider w-embed"><svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                  <div className="nav_arrow-svg cc-slider w-embed"><svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                <div className="svg cc-nav-arrow-bg w-embed"><svg width="54" height="51" viewBox="0 0 54 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M54 5.59996L48.75 -3.8147e-05H6L0.375 5.99996L0 5.59996V45.4L0.375 45L6 51H48.75L54 45.4V5.59996Z" fill="white"></path>
                  </svg></div>
                <div className="arrow-wrap cc-2">
                  <div className="nav_arrow-svg cc-slider w-embed"><svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                  <div className="nav_arrow-svg cc-slider w-embed"><svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
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
              <div className="c-title-5"><span className="hide-tablet">Featured Quote</span></div>
            </div><img src="/webflow-images/testimonial.svg" loading="lazy" width="294.5" alt="" className="slider_img" />
          </div>
        </div>
      </section>
      <section className="c-section ent-price-numbers">
        <div className="c-container">
          <div className="partner-list_wrapper">
            <div className="partner-list_title">
              <h3 className="c-title-3">Brightwave by the Numbers</h3>
              <a stagger-cta="" href="#" className="cta-p-sm w-inline-block">
                <div>
                  <div stagger-cta-text="dark" className="c-text-link cc-stagger-cta">Book a demo</div>
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
            </div>
            <div className="partner-list_list-wrapper">
              <div className="partner-list_list-item">
                <div className="partner_icon">
                  <div className="svg w-embed"><svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="40" height="40" rx="4" fill="#E7E70D"></rect>
                      <mask id="mask0_5757_19561" style={{ "maskType": "alpha" }} maskUnits="userSpaceOnUse" x="8" y="8" width="24" height="24">
                        <rect x="8" y="8" width="24" height="24" fill="currentColor"></rect>
                      </mask>
                      <g mask="url(#mask0_5757_19561)">
                        <path d="M20 30C18.6167 30 17.3167 29.7375 16.1 29.2125C14.8833 28.6875 13.825 27.975 12.925 27.075C12.025 26.175 11.3125 25.1167 10.7875 23.9C10.2625 22.6833 10 21.3833 10 20C10 18.6167 10.2625 17.3167 10.7875 16.1C11.3125 14.8833 12.025 13.825 12.925 12.925C13.825 12.025 14.8833 11.3125 16.1 10.7875C17.3167 10.2625 18.6167 10 20 10C21.3833 10 22.6833 10.2625 23.9 10.7875C25.1167 11.3125 26.175 12.025 27.075 12.925C27.975 13.825 28.6875 14.8833 29.2125 16.1C29.7375 17.3167 30 18.6167 30 20C30 21.3833 29.7375 22.6833 29.2125 23.9C28.6875 25.1167 27.975 26.175 27.075 27.075C26.175 27.975 25.1167 28.6875 23.9 29.2125C22.6833 29.7375 21.3833 30 20 30ZM20 28C22.2333 28 24.125 27.225 25.675 25.675C27.225 24.125 28 22.2333 28 20C28 17.7667 27.225 15.875 25.675 14.325C24.125 12.775 22.2333 12 20 12C17.7667 12 15.875 12.775 14.325 14.325C12.775 15.875 12 17.7667 12 20C12 22.2333 12.775 24.125 14.325 25.675C15.875 27.225 17.7667 28 20 28ZM20.5875 26.7375C20.7625 26.5625 20.85 26.3583 20.85 26.125V25.75C21.6833 25.6 22.4 25.275 23 24.775C23.6 24.275 23.9 23.5333 23.9 22.55C23.9 21.85 23.7 21.2083 23.3 20.625C22.9 20.0417 22.1 19.5333 20.9 19.1C19.9 18.7667 19.2083 18.475 18.825 18.225C18.4417 17.975 18.25 17.6333 18.25 17.2C18.25 16.7667 18.4042 16.425 18.7125 16.175C19.0208 15.925 19.4667 15.8 20.05 15.8C20.3833 15.8 20.675 15.8583 20.925 15.975C21.175 16.0917 21.3833 16.25 21.55 16.45C21.7167 16.65 21.9042 16.7875 22.1125 16.8625C22.3208 16.9375 22.5167 16.9333 22.7 16.85C22.95 16.75 23.1208 16.5792 23.2125 16.3375C23.3042 16.0958 23.2833 15.875 23.15 15.675C22.8833 15.2917 22.5542 14.9667 22.1625 14.7C21.7708 14.4333 21.35 14.2833 20.9 14.25V13.875C20.9 13.6417 20.8125 13.4375 20.6375 13.2625C20.4625 13.0875 20.2583 13 20.025 13C19.7917 13 19.5875 13.0875 19.4125 13.2625C19.2375 13.4375 19.15 13.6417 19.15 13.875V14.25C18.3167 14.4333 17.6667 14.8 17.2 15.35C16.7333 15.9 16.5 16.5167 16.5 17.2C16.5 17.9833 16.7292 18.6167 17.1875 19.1C17.6458 19.5833 18.3667 20 19.35 20.35C20.4 20.7333 21.1292 21.075 21.5375 21.375C21.9458 21.675 22.15 22.0667 22.15 22.55C22.15 23.1 21.9542 23.5042 21.5625 23.7625C21.1708 24.0208 20.7 24.15 20.15 24.15C19.7167 24.15 19.325 24.0458 18.975 23.8375C18.625 23.6292 18.3333 23.3167 18.1 22.9C17.9667 22.6667 17.7917 22.5083 17.575 22.425C17.3583 22.3417 17.1417 22.3417 16.925 22.425C16.6917 22.5083 16.5208 22.6667 16.4125 22.9C16.3042 23.1333 16.3 23.3583 16.4 23.575C16.6667 24.1417 17.025 24.6042 17.475 24.9625C17.925 25.3208 18.4667 25.5667 19.1 25.7V26.125C19.1 26.3583 19.1875 26.5625 19.3625 26.7375C19.5375 26.9125 19.7417 27 19.975 27C20.2083 27 20.4125 26.9125 20.5875 26.7375Z" fill="currentColor"></path>
                      </g>
                    </svg></div>
                </div>
                <div className="c-text-3 cc-500">[X]+ Firms</div>
              </div>
              <div className="partner-list_list-item">
                <div className="partner_icon">
                  <div className="svg w-embed"><svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="40" height="40" rx="4" fill="#E7E70D"></rect>
                      <mask id="mask0_5757_19616" style={{ "maskType": "alpha" }} maskUnits="userSpaceOnUse" x="8" y="8" width="24" height="24">
                        <rect x="8" y="8" width="24" height="24" fill="#D9D9D9"></rect>
                      </mask>
                      <g mask="url(#mask0_5757_19616)">
                        <path d="M9.74998 21.4C9.53331 21.25 9.40414 21.0458 9.36248 20.7875C9.32081 20.5292 9.36664 20.2833 9.49998 20.05L12.55 15.15C12.9166 14.5667 13.4375 14.2542 14.1125 14.2125C14.7875 14.1708 15.3416 14.4083 15.775 14.925L17 16.35L19.375 12.5C19.7583 11.8667 20.3125 11.5458 21.0375 11.5375C21.7625 11.5292 22.325 11.8333 22.725 12.45L24 14.35L26.8 9.9C26.95 9.65 27.1708 9.49584 27.4625 9.4375C27.7541 9.37917 28.0166 9.44167 28.25 9.625C28.4666 9.775 28.5958 9.97917 28.6375 10.2375C28.6791 10.4958 28.6333 10.7417 28.5 10.975L25.7 15.425C25.3166 16.0417 24.7625 16.35 24.0375 16.35C23.3125 16.35 22.75 16.05 22.35 15.45L21.075 13.55L18.7 17.4C18.35 17.9833 17.8375 18.3 17.1625 18.35C16.4875 18.4 15.9333 18.1667 15.5 17.65L14.25 16.2L11.2 21.125C11.05 21.375 10.8291 21.5292 10.5375 21.5875C10.2458 21.6458 9.98331 21.5833 9.74998 21.4ZM22.5 26C23.2 26 23.7916 25.7583 24.275 25.275C24.7583 24.7917 25 24.2 25 23.5C25 22.8 24.7583 22.2083 24.275 21.725C23.7916 21.2417 23.2 21 22.5 21C21.8 21 21.2083 21.2417 20.725 21.725C20.2416 22.2083 20 22.8 20 23.5C20 24.2 20.2416 24.7917 20.725 25.275C21.2083 25.7583 21.8 26 22.5 26ZM22.5 28C21.25 28 20.1875 27.5625 19.3125 26.6875C18.4375 25.8125 18 24.75 18 23.5C18 22.25 18.4375 21.1875 19.3125 20.3125C20.1875 19.4375 21.25 19 22.5 19C23.75 19 24.8125 19.4375 25.6875 20.3125C26.5625 21.1875 27 22.25 27 23.5C27 23.9333 26.9416 24.3542 26.825 24.7625C26.7083 25.1708 26.5333 25.55 26.3 25.9L28.3 27.9C28.4833 28.0833 28.575 28.3167 28.575 28.6C28.575 28.8833 28.4833 29.1167 28.3 29.3C28.1166 29.4833 27.8833 29.575 27.6 29.575C27.3166 29.575 27.0833 29.4833 26.9 29.3L24.9 27.3C24.55 27.5333 24.1708 27.7083 23.7625 27.825C23.3541 27.9417 22.9333 28 22.5 28Z" fill="#1C1B1F"></path>
                      </g>
                    </svg></div>
                </div>
                <div className="c-text-3 cc-500">$[X]B+ AUM</div>
              </div>
              <div className="partner-list_list-item">
                <div className="partner_icon">
                  <div className="svg w-embed"><svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="40" height="40" rx="4" fill="#E7E70D"></rect>
                      <mask id="mask0_5757_19621" style={{ "maskType": "alpha" }} maskUnits="userSpaceOnUse" x="8" y="8" width="24" height="24">
                        <rect x="8" y="8" width="24" height="24" fill="#D9D9D9"></rect>
                      </mask>
                      <g mask="url(#mask0_5757_19621)">
                        <path d="M29 20.9999H27C26.7167 20.9999 26.4792 20.9041 26.2875 20.7124C26.0958 20.5208 26 20.2833 26 19.9999C26 19.7166 26.0958 19.4791 26.2875 19.2874C26.4792 19.0958 26.7167 18.9999 27 18.9999H29C29.2833 18.9999 29.5208 19.0958 29.7125 19.2874C29.9042 19.4791 30 19.7166 30 19.9999C30 20.2833 29.9042 20.5208 29.7125 20.7124C29.5208 20.9041 29.2833 20.9999 29 20.9999ZM24.6 24.7999C24.7667 24.5666 24.9833 24.4333 25.25 24.3999C25.5167 24.3666 25.7667 24.4333 26 24.5999L27.6 25.7999C27.8333 25.9666 27.9667 26.1833 28 26.4499C28.0333 26.7166 27.9667 26.9666 27.8 27.1999C27.6333 27.4333 27.4167 27.5666 27.15 27.5999C26.8833 27.6333 26.6333 27.5666 26.4 27.3999L24.8 26.1999C24.5667 26.0333 24.4333 25.8166 24.4 25.5499C24.3667 25.2833 24.4333 25.0333 24.6 24.7999ZM27.6 14.1999L26 15.3999C25.7667 15.5666 25.5167 15.6333 25.25 15.5999C24.9833 15.5666 24.7667 15.4333 24.6 15.1999C24.4333 14.9666 24.3667 14.7166 24.4 14.4499C24.4333 14.1833 24.5667 13.9666 24.8 13.7999L26.4 12.5999C26.6333 12.4333 26.8833 12.3666 27.15 12.3999C27.4167 12.4333 27.6333 12.5666 27.8 12.7999C27.9667 13.0333 28.0333 13.2833 28 13.5499C27.9667 13.8166 27.8333 14.0333 27.6 14.1999ZM13 22.9999H12C11.45 22.9999 10.9792 22.8041 10.5875 22.4124C10.1958 22.0208 10 21.5499 10 20.9999V18.9999C10 18.4499 10.1958 17.9791 10.5875 17.5874C10.9792 17.1958 11.45 16.9999 12 16.9999H16L19.475 14.8999C19.8083 14.6999 20.1458 14.6999 20.4875 14.8999C20.8292 15.0999 21 15.3916 21 15.7749V24.2249C21 24.6083 20.8292 24.8999 20.4875 25.0999C20.1458 25.2999 19.8083 25.2999 19.475 25.0999L16 22.9999H15V25.9999C15 26.2833 14.9042 26.5208 14.7125 26.7124C14.5208 26.9041 14.2833 26.9999 14 26.9999C13.7167 26.9999 13.4792 26.9041 13.2875 26.7124C13.0958 26.5208 13 26.2833 13 25.9999V22.9999ZM19 22.4499V17.5499L16.55 18.9999H12V20.9999H16.55L19 22.4499ZM22 23.3499V16.6499C22.45 17.0499 22.8125 17.5374 23.0875 18.1124C23.3625 18.6874 23.5 19.3166 23.5 19.9999C23.5 20.6833 23.3625 21.3124 23.0875 21.8874C22.8125 22.4624 22.45 22.9499 22 23.3499Z" fill="#1C1B1F"></path>
                      </g>
                    </svg></div>
                </div>
                <div className="c-text-3 cc-500">[X]M+ Documents Analyzed</div>
              </div>
              <div className="partner-list_list-item">
                <div className="partner_icon">
                  <div className="svg w-embed"><svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="40" height="40" rx="4" fill="#E7E70D"></rect>
                      <mask id="mask0_5757_19626" style={{ "maskType": "alpha" }} maskUnits="userSpaceOnUse" x="8" y="8" width="24" height="24">
                        <rect x="8" y="8" width="24" height="24" fill="#D9D9D9"></rect>
                      </mask>
                      <g mask="url(#mask0_5757_19626)">
                        <path d="M11.875 30.125C11.2917 29.5417 11 28.8333 11 28C11 27.1667 11.2917 26.4583 11.875 25.875C12.4583 25.2917 13.1667 25 14 25C14.2333 25 14.45 25.025 14.65 25.075C14.85 25.125 15.0417 25.1917 15.225 25.275L16.65 23.5C16.1833 22.9833 15.8583 22.4 15.675 21.75C15.4917 21.1 15.45 20.45 15.55 19.8L13.525 19.125C13.2417 19.5417 12.8833 19.875 12.45 20.125C12.0167 20.375 11.5333 20.5 11 20.5C10.1667 20.5 9.45833 20.2083 8.875 19.625C8.29167 19.0417 8 18.3333 8 17.5C8 16.6667 8.29167 15.9583 8.875 15.375C9.45833 14.7917 10.1667 14.5 11 14.5C11.8333 14.5 12.5417 14.7917 13.125 15.375C13.7083 15.9583 14 16.6667 14 17.5V17.7L16.025 18.4C16.3583 17.8 16.8042 17.2917 17.3625 16.875C17.9208 16.4583 18.55 16.1917 19.25 16.075V13.9C18.6 13.7167 18.0625 13.3625 17.6375 12.8375C17.2125 12.3125 17 11.7 17 11C17 10.1667 17.2917 9.45833 17.875 8.875C18.4583 8.29167 19.1667 8 20 8C20.8333 8 21.5417 8.29167 22.125 8.875C22.7083 9.45833 23 10.1667 23 11C23 11.7 22.7833 12.3125 22.35 12.8375C21.9167 13.3625 21.3833 13.7167 20.75 13.9V16.075C21.45 16.1917 22.0792 16.4583 22.6375 16.875C23.1958 17.2917 23.6417 17.8 23.975 18.4L26 17.7V17.5C26 16.6667 26.2917 15.9583 26.875 15.375C27.4583 14.7917 28.1667 14.5 29 14.5C29.8333 14.5 30.5417 14.7917 31.125 15.375C31.7083 15.9583 32 16.6667 32 17.5C32 18.3333 31.7083 19.0417 31.125 19.625C30.5417 20.2083 29.8333 20.5 29 20.5C28.4667 20.5 27.9792 20.375 27.5375 20.125C27.0958 19.875 26.7417 19.5417 26.475 19.125L24.45 19.8C24.55 20.45 24.5083 21.0958 24.325 21.7375C24.1417 22.3792 23.8167 22.9667 23.35 23.5L24.775 25.25C24.9583 25.1667 25.15 25.1042 25.35 25.0625C25.55 25.0208 25.7667 25 26 25C26.8333 25 27.5417 25.2917 28.125 25.875C28.7083 26.4583 29 27.1667 29 28C29 28.8333 28.7083 29.5417 28.125 30.125C27.5417 30.7083 26.8333 31 26 31C25.1667 31 24.4583 30.7083 23.875 30.125C23.2917 29.5417 23 28.8333 23 28C23 27.6667 23.0542 27.3458 23.1625 27.0375C23.2708 26.7292 23.4167 26.45 23.6 26.2L22.175 24.425C21.4917 24.8083 20.7625 25 19.9875 25C19.2125 25 18.4833 24.8083 17.8 24.425L16.4 26.2C16.5833 26.45 16.7292 26.7292 16.8375 27.0375C16.9458 27.3458 17 27.6667 17 28C17 28.8333 16.7083 29.5417 16.125 30.125C15.5417 30.7083 14.8333 31 14 31C13.1667 31 12.4583 30.7083 11.875 30.125ZM11 18.5C11.2833 18.5 11.5208 18.4042 11.7125 18.2125C11.9042 18.0208 12 17.7833 12 17.5C12 17.2167 11.9042 16.9792 11.7125 16.7875C11.5208 16.5958 11.2833 16.5 11 16.5C10.7167 16.5 10.4792 16.5958 10.2875 16.7875C10.0958 16.9792 10 17.2167 10 17.5C10 17.7833 10.0958 18.0208 10.2875 18.2125C10.4792 18.4042 10.7167 18.5 11 18.5ZM14.7125 28.7125C14.9042 28.5208 15 28.2833 15 28C15 27.7167 14.9042 27.4792 14.7125 27.2875C14.5208 27.0958 14.2833 27 14 27C13.7167 27 13.4792 27.0958 13.2875 27.2875C13.0958 27.4792 13 27.7167 13 28C13 28.2833 13.0958 28.5208 13.2875 28.7125C13.4792 28.9042 13.7167 29 14 29C14.2833 29 14.5208 28.9042 14.7125 28.7125ZM20.7125 11.7125C20.9042 11.5208 21 11.2833 21 11C21 10.7167 20.9042 10.4792 20.7125 10.2875C20.5208 10.0958 20.2833 10 20 10C19.7167 10 19.4792 10.0958 19.2875 10.2875C19.0958 10.4792 19 10.7167 19 11C19 11.2833 19.0958 11.5208 19.2875 11.7125C19.4792 11.9042 19.7167 12 20 12C20.2833 12 20.5208 11.9042 20.7125 11.7125ZM20 23C20.7 23 21.2917 22.7583 21.775 22.275C22.2583 21.7917 22.5 21.2 22.5 20.5C22.5 19.8 22.2583 19.2083 21.775 18.725C21.2917 18.2417 20.7 18 20 18C19.3 18 18.7083 18.2417 18.225 18.725C17.7417 19.2083 17.5 19.8 17.5 20.5C17.5 21.2 17.7417 21.7917 18.225 22.275C18.7083 22.7583 19.3 23 20 23ZM26.7125 28.7125C26.9042 28.5208 27 28.2833 27 28C27 27.7167 26.9042 27.4792 26.7125 27.2875C26.5208 27.0958 26.2833 27 26 27C25.7167 27 25.4792 27.0958 25.2875 27.2875C25.0958 27.4792 25 27.7167 25 28C25 28.2833 25.0958 28.5208 25.2875 28.7125C25.4792 28.9042 25.7167 29 26 29C26.2833 29 26.5208 28.9042 26.7125 28.7125ZM29.7125 18.2125C29.9042 18.0208 30 17.7833 30 17.5C30 17.2167 29.9042 16.9792 29.7125 16.7875C29.5208 16.5958 29.2833 16.5 29 16.5C28.7167 16.5 28.4792 16.5958 28.2875 16.7875C28.0958 16.9792 28 17.2167 28 17.5C28 17.7833 28.0958 18.0208 28.2875 18.2125C28.4792 18.4042 28.7167 18.5 29 18.5C29.2833 18.5 29.5208 18.4042 29.7125 18.2125Z" fill="#1C1B1F"></path>
                      </g>
                    </svg></div>
                </div>
                <div className="c-text-3 cc-500">[X]% Expand Within 12 Months</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="c-section ent-price-cert">
        <div className="c-container">
          <div>
            <div className="v-40">
              <div className="c-abm-temp-chal_header-wrapper">
                <div className="c-abm-temp-chal_header">
                  <div className="c-amb-temp-chal_box"></div>
                  <div className="c-title-5">Enterprise-Grade Security. Your Data Stays Yours.</div>
                </div>
              </div>
              <div className="h-flex-20">
                <div className="explore-item">
                  <div className="aspect-16-9">
                    <div className="u-relative"><img src="/webflow-images/illustration_Enterprise-Trust--Security.svg" loading="lazy" width="70" light-asset="" alt="" className="image-abso" /><img src="/webflow-images/illustration_Enterprise-Trust--Security-1.svg" loading="lazy" width="70" dark-asset="" alt="" className="image-abso" /></div>
                  </div>
                  <div className="v-64 cc-fill">
                    <div className="v-20 cc-explore">
                      <div className="c-title-3">SOC 2 Type II Compliant</div>
                      <div>
                        <div className="c-text-4">Brightwave maintains SOC 2 Type II certification, independently audited annually. Our security controls meet the standards required by the world's most security-conscious financial institutions.</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="explore-item">
                  <div className="aspect-16-9">
                    <div className="u-relative"><img src="/webflow-images/illustration_Investment-Intelligence-Engine.svg" loading="lazy" width="70" light-asset="" alt="" className="image-abso" /><img src="/webflow-images/illustration_Investment-Intelligence-Engine-1.svg" loading="lazy" width="70" dark-asset="" alt="" className="image-abso" /></div>
                  </div>
                  <div className="v-64 cc-fill">
                    <div className="v-20 cc-explore">
                      <div className="c-title-3">Your Data Never Trains Our Models</div>
                      <div className="c-text-4">Your documents, your research, your proprietary data -- none of it is used to train, fine-tune, or improve Brightwave's AI models. Your data is processed, analyzed, and returned to you. Period. This is not a checkbox commitment. It is a contractual guarantee.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="c-section ent-price">
        <div className="c-container">
          <div className="c-abm-temp_chal_main-wrapper">
            <div className="c-abm-temp-chal_card-wrapper c-abm-template_grid">
              <div id="w-node-_5f88d3a5-961e-345d-f130-ff55642cc44b-0464d2c1" className="c-amb-temp-chal_sticky">
                <div className="c-abm-temp-chal_title-wrapper">
                  <h2 className="c-title-2">Built for Financial Services Security Requirements</h2>
                </div>
                <div className="c-abm-temp-chal_button-wrapper">
                  <a stagger-cta="" href="#" className="cta-p-sm w-inline-block">
                    <div>
                      <div stagger-cta-text="dark" className="c-text-link cc-stagger-cta">Explore the Platform</div>
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
                </div>
              </div>
              <div id="w-node-_5f88d3a5-961e-345d-f130-ff55642cc454-0464d2c1" className="c-abm-temp-chal_card-list">
                <div className="v-12">
                  <div className="c-title-5">SSO / SAML Integration</div>
                  <div className="c-text-4">Connect to your firm's existing identity provider. One login, centralized access control.</div>
                </div>
                <div className="v-12">
                  <div className="c-title-5">Role-Based Access Controls</div>
                  <div className="c-text-4">Define who can access which documents, workspaces, and outputs. Analyst-level, VP-level, and admin permissions.</div>
                </div>
                <div className="v-12">
                  <div className="c-title-5">Audit Logs</div>
                  <div className="c-text-4">Full visibility into who accessed what, when, and what actions were taken. Exportable for compliance reporting.</div>
                </div>
                <div className="v-12">
                  <div className="c-title-5">Data Encryption</div>
                  <div className="c-text-4">AES-256 encryption at rest, TLS 1.3 in transit. Your documents are encrypted from upload through analysis through storage.</div>
                </div>
                <div className="v-12">
                  <div className="c-title-5">Data Residency Options</div>
                  <div className="c-text-4">Deploy in your preferred cloud region. US, EU, and custom residency configurations available for firms with jurisdictional requirements.</div>
                </div>
                <div className="v-12">
                  <div className="c-title-5">Dedicated Tenant Architecture</div>
                  <div className="c-text-4">Enterprise customers receive isolated infrastructure. Your data is not co-mingled with other customers.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="c-section ent-price">
        <div className="c-container">
          <div className="v-48">
            <div className="ent-price-head">
              <h2 className="c-title-4">Why the Most Demanding Investment Teams Choose Brightwave</h2>
            </div>
            <div lottie-bg="" className="lottie-crop">
              <LottiePlayer src="/webflow-documents/CTA-Lottie-25.json" className="lottie_cropped-desktop" loop={true} autoplay={true} />
              <LottiePlayer src="/webflow-documents/Generative-Loop-Final-25.json" className="lottie_cropped-mobile" loop={true} autoplay={true} />
            </div>
            <div className="ent-price-card-grid">
              <div id="w-node-a29a653e-f15e-d745-d2a0-721a238a6540-238a6540" className="ent-price-dark-card">
                <div className="ent-price-dark-card_header">
                  <div className="eyebrow-box"></div>
                  <div className="c-title-5">Built Exclusively for Private Markets</div>
                </div>
                <div>
                  <p className="c-text-5">Brightwave is not a horizontal AI tool adapted for finance. It is not a sell-side platform repurposed for buy-side workflows. Every feature, every workflow template, every analytical model is built around how PE, private credit, growth equity, and infrastructure firms actually work. Our team has spent thousands of hours mapping the 27 core workflows that define the buy-side investment lifecycle -- from CIM screening through portfolio exit. That specificity shows in every output.</p>
                </div>
              </div>
              <div id="w-node-a29a653e-f15e-d745-d2a0-721a238a6540-238a6540" className="ent-price-dark-card">
                <div className="ent-price-dark-card_header">
                  <div className="eyebrow-box"></div>
                  <div className="c-title-5">Citation-Backed Outputs You Can Trust in Front of Your IC</div>
                </div>
                <div>
                  <p className="c-text-5">Every finding Brightwave generates traces to its source document, page, and passage. Click any claim and see exactly where it came from. No hallucinations. No black boxes. No unverifiable assertions. Your Investment Committee sees cited analysis -- the same standard they expect from your deal team's manual work, delivered in a fraction of the time. This is not an incremental improvement over general AI tools. It is a fundamentally different approach to trust.</p>
                </div>
              </div>
              <div id="w-node-a29a653e-f15e-d745-d2a0-721a238a6540-238a6540" className="ent-price-dark-card">
                <div className="ent-price-dark-card_header">
                  <div className="eyebrow-box"></div>
                  <div className="c-title-5">Deployed in Days, Not Months</div>
                </div>
                <div>
                  <p className="c-text-5">There is no 6-month IT project. No custom implementation. No waiting for engineering resources. Your team is running live workflows within 2 weeks of signing -- analyzing real CIMs, ingesting real data rooms, monitoring real portfolio companies. Brightwave connects to your existing infrastructure (SSO, data rooms, CRM) with minimal IT involvement. Most firms complete setup in under 10 business days, including security review, team onboarding, and workflow configuration.</p>
                </div>
              </div>
              <div id="w-node-a29a653e-f15e-d745-d2a0-721a238a6540-238a6540" className="ent-price-dark-card">
                <div className="ent-price-dark-card_header">
                  <div className="eyebrow-box"></div>
                  <div className="c-title-5">Scales With Your Portfolio</div>
                </div>
                <div>
                  <p className="c-text-5">Five portfolio companies or fifty. Three deals in pipeline or thirty. Brightwave scales with your firm's activity without requiring additional headcount. As your portfolio grows, your monitoring capacity grows with it. As your deal flow increases, your screening capacity increases with it. The economics work in your favor: every new deal, every new portfolio company, every new fund adds marginal effort, not marginal cost. That is the difference between a tool that helps today and a platform that compounds value over years.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="c-section ent-price">
        <div className="c-container">
          <div className="v-48">
            <div className="ent-price-head">
              <h2 className="c-title-3">From First Conversation to Measurable Results in 30 Days</h2>
            </div>
            <div className="ent-price-timeline-grid">
              <div id="w-node-_09b67bba-09f7-03c4-2ba6-4d083c51c7ad-3c51c7ad" className="ent-price-timeline-item">
                <div className="ent-price-timeline-top">
                  <div className="ent-price-timeline-box"></div>
                  <div className="c-title-5">01</div>
                  <div className="ent-price-divider"></div>
                </div>
                <div className="ent-price-timeline-bottom">
                  <div className="div-block-106">
                    <div className="c-text-4 cc-weight-500">Title goes here</div>
                    <div>Description text goes here</div>
                  </div>
                  <div className="div-block-105">
                    <div className="w-embed"><svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24.0007 25.9998C25.1053 25.9998 26.0007 25.1043 26.0007 23.9998C26.0007 22.8952 25.1053 21.9998 24.0007 21.9998C22.8962 21.9998 22.0007 22.8952 22.0007 23.9998C22.0007 25.1043 22.8962 25.9998 24.0007 25.9998Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M40.4007 40.3998C44.4807 36.3398 40.4407 25.6798 31.4007 16.5998C22.3207 7.55977 11.6607 3.51977 7.60075 7.59977C3.52075 11.6598 7.56075 22.3198 16.6007 31.3998C25.6807 40.4398 36.3407 44.4798 40.4007 40.3998Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M31.4007 31.3998C40.4407 22.3198 44.4807 11.6598 40.4007 7.59977C36.3407 3.51977 25.6807 7.55977 16.6007 16.5998C7.56075 25.6798 3.52075 36.3398 7.60075 40.3998C11.6607 44.4798 22.3207 40.4398 31.4007 31.3998Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg></div>
                  </div>
                </div>
              </div>
              <div id="w-node-_09b67bba-09f7-03c4-2ba6-4d083c51c7ad-3c51c7ad" className="ent-price-timeline-item">
                <div className="ent-price-timeline-top">
                  <div className="ent-price-timeline-box"></div>
                  <div className="c-title-5">02</div>
                  <div className="ent-price-divider"></div>
                </div>
                <div className="ent-price-timeline-bottom">
                  <div className="div-block-106">
                    <div className="c-text-4 cc-weight-500">Title goes here</div>
                    <div>Description text goes here</div>
                  </div>
                  <div className="div-block-105">
                    <div className="w-embed"><svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24.0007 25.9998C25.1053 25.9998 26.0007 25.1043 26.0007 23.9998C26.0007 22.8952 25.1053 21.9998 24.0007 21.9998C22.8962 21.9998 22.0007 22.8952 22.0007 23.9998C22.0007 25.1043 22.8962 25.9998 24.0007 25.9998Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M40.4007 40.3998C44.4807 36.3398 40.4407 25.6798 31.4007 16.5998C22.3207 7.55977 11.6607 3.51977 7.60075 7.59977C3.52075 11.6598 7.56075 22.3198 16.6007 31.3998C25.6807 40.4398 36.3407 44.4798 40.4007 40.3998Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M31.4007 31.3998C40.4407 22.3198 44.4807 11.6598 40.4007 7.59977C36.3407 3.51977 25.6807 7.55977 16.6007 16.5998C7.56075 25.6798 3.52075 36.3398 7.60075 40.3998C11.6607 44.4798 22.3207 40.4398 31.4007 31.3998Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg></div>
                  </div>
                </div>
              </div>
              <div id="w-node-_09b67bba-09f7-03c4-2ba6-4d083c51c7ad-3c51c7ad" className="ent-price-timeline-item">
                <div className="ent-price-timeline-top">
                  <div className="ent-price-timeline-box"></div>
                  <div className="c-title-5">03</div>
                  <div className="ent-price-divider"></div>
                </div>
                <div className="ent-price-timeline-bottom">
                  <div className="div-block-106">
                    <div className="c-text-4 cc-weight-500">Title goes here</div>
                    <div>Description text goes here</div>
                  </div>
                  <div className="div-block-105">
                    <div className="w-embed"><svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24.0007 25.9998C25.1053 25.9998 26.0007 25.1043 26.0007 23.9998C26.0007 22.8952 25.1053 21.9998 24.0007 21.9998C22.8962 21.9998 22.0007 22.8952 22.0007 23.9998C22.0007 25.1043 22.8962 25.9998 24.0007 25.9998Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M40.4007 40.3998C44.4807 36.3398 40.4407 25.6798 31.4007 16.5998C22.3207 7.55977 11.6607 3.51977 7.60075 7.59977C3.52075 11.6598 7.56075 22.3198 16.6007 31.3998C25.6807 40.4398 36.3407 44.4798 40.4007 40.3998Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M31.4007 31.3998C40.4407 22.3198 44.4807 11.6598 40.4007 7.59977C36.3407 3.51977 25.6807 7.55977 16.6007 16.5998C7.56075 25.6798 3.52075 36.3398 7.60075 40.3998C11.6607 44.4798 22.3207 40.4398 31.4007 31.3998Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg></div>
                  </div>
                </div>
              </div>
              <div id="w-node-_09b67bba-09f7-03c4-2ba6-4d083c51c7ad-3c51c7ad" className="ent-price-timeline-item">
                <div className="ent-price-timeline-top">
                  <div className="ent-price-timeline-box"></div>
                  <div className="c-title-5">04</div>
                  <div className="ent-price-divider"></div>
                </div>
                <div className="ent-price-timeline-bottom">
                  <div className="div-block-106">
                    <div className="c-text-4 cc-weight-500">Title goes here</div>
                    <div>Description text goes here</div>
                  </div>
                  <div className="div-block-105">
                    <div className="w-embed"><svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24.0007 25.9998C25.1053 25.9998 26.0007 25.1043 26.0007 23.9998C26.0007 22.8952 25.1053 21.9998 24.0007 21.9998C22.8962 21.9998 22.0007 22.8952 22.0007 23.9998C22.0007 25.1043 22.8962 25.9998 24.0007 25.9998Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M40.4007 40.3998C44.4807 36.3398 40.4407 25.6798 31.4007 16.5998C22.3207 7.55977 11.6607 3.51977 7.60075 7.59977C3.52075 11.6598 7.56075 22.3198 16.6007 31.3998C25.6807 40.4398 36.3407 44.4798 40.4007 40.3998Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M31.4007 31.3998C40.4407 22.3198 44.4807 11.6598 40.4007 7.59977C36.3407 3.51977 25.6807 7.55977 16.6007 16.5998C7.56075 25.6798 3.52075 36.3398 7.60075 40.3998C11.6607 44.4798 22.3207 40.4398 31.4007 31.3998Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="c-section ent-price">
        <div className="c-container">
          <div className="v-40">
            <h2 className="c-title-2">FAQs</h2>
            <div className="grid cc-no-gap">
              <div id="w-node-_75619d1a-78b4-96ff-3dc0-f26a0a3c53b1-0464d2c1" className="c-line"></div>
              <div id="w-node-_75619d1a-78b4-96ff-3dc0-f26a0a3c53b2-0464d2c1">
                <div accordion="" id="w-node-_0d758a7c-5986-fc72-0a2c-7e16d285f79d-d285f79d" className="accordion">
                  <div className="accordion_toggle">
                    <div className="c-text-2 cc-balance">How does Brightwave ensure the accuracy of its insights?</div>
                    <div chevron-x="" className="c-svg-2 cc-20 w-embed"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg></div><input accordion-checkbox="" type="checkbox" className="accordion_checkbox" />
                  </div>
                  <div accordion="element" className="accordion_dropdown">
                    <div mask-height="element">
                      <div className="accordion_content">
                        <div className="c-text-4 w-richtext">
                          <p>Brightwave uses state-of-the-art entailment models to cross-verify every research finding against the source content, ensuring high accuracy and reliability of insights. The platform provides sentence-level attribution to the underlying primary sources, allowing you to trace the origin of every data point for complete transparency.<br /></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="w-node-_75619d1a-78b4-96ff-3dc0-f26a0a3c53b8-0464d2c1" className="c-line"></div>
              <div id="w-node-_75619d1a-78b4-96ff-3dc0-f26a0a3c53b9-0464d2c1">
                <div accordion="" id="w-node-_0d758a7c-5986-fc72-0a2c-7e16d285f79d-d285f79d" className="accordion">
                  <div className="accordion_toggle">
                    <div className="c-text-2 cc-balance">Can I customize the data sources for my analysis?</div>
                    <div chevron-x="" className="c-svg-2 cc-20 w-embed"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg></div><input accordion-checkbox="" type="checkbox" className="accordion_checkbox" />
                  </div>
                  <div accordion="element" className="accordion_dropdown">
                    <div mask-height="element">
                      <div className="accordion_content">
                        <div className="c-text-4 w-richtext">
                          <p>Absolutely. Brightwave allows you to select and prioritize data sources, tailoring the input to best suit your specific research needs. Our analysis engine can operate over your firm’s proprietary content or our own extensive library of primary sources.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="w-node-_75619d1a-78b4-96ff-3dc0-f26a0a3c53be-0464d2c1" className="c-line"></div>
              <div id="w-node-_75619d1a-78b4-96ff-3dc0-f26a0a3c53bf-0464d2c1">
                <div accordion="" id="w-node-_0d758a7c-5986-fc72-0a2c-7e16d285f79d-d285f79d" className="accordion">
                  <div className="accordion_toggle">
                    <div className="c-text-2 cc-balance">How secure is my data with Brightwave?</div>
                    <div chevron-x="" className="c-svg-2 cc-20 w-embed"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg></div><input accordion-checkbox="" type="checkbox" className="accordion_checkbox" />
                  </div>
                  <div accordion="element" className="accordion_dropdown">
                    <div mask-height="element">
                      <div className="accordion_content">
                        <div className="c-text-4 w-richtext">
                          <p>Brightwave takes your data security seriously. Founded by engineers who build systems responsible for handling the world's most sensitive and mission-critical financial datasets, our platform is designed from the ground up to meet the stringent security and operational requirements of the most demanding enterprise clients.<br /></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="w-node-_17011205-ff2a-a9a4-ac89-0237411dde3b-0464d2c1" className="c-line"></div>
              <div id="w-node-_080df105-be57-4dad-160c-15a106276c67-0464d2c1">
                <div accordion="" id="w-node-_0d758a7c-5986-fc72-0a2c-7e16d285f79d-d285f79d" className="accordion">
                  <div className="accordion_toggle">
                    <div className="c-text-2 cc-balance">How secure is my data with Brightwave?</div>
                    <div chevron-x="" className="c-svg-2 cc-20 w-embed"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg></div><input accordion-checkbox="" type="checkbox" className="accordion_checkbox" />
                  </div>
                  <div accordion="element" className="accordion_dropdown">
                    <div mask-height="element">
                      <div className="accordion_content">
                        <div className="c-text-4 w-richtext">
                          <p>Brightwave takes your data security seriously. Founded by engineers who build systems responsible for handling the world's most sensitive and mission-critical financial datasets, our platform is designed from the ground up to meet the stringent security and operational requirements of the most demanding enterprise clients.<br /></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="w-node-_086a3925-b14f-7fc5-484e-42feec612975-0464d2c1" className="c-line"></div>
              <div id="w-node-cd589347-366e-d93a-0b03-87e52e533137-0464d2c1">
                <div accordion="" id="w-node-_0d758a7c-5986-fc72-0a2c-7e16d285f79d-d285f79d" className="accordion">
                  <div className="accordion_toggle">
                    <div className="c-text-2 cc-balance">How secure is my data with Brightwave?</div>
                    <div chevron-x="" className="c-svg-2 cc-20 w-embed"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg></div><input accordion-checkbox="" type="checkbox" className="accordion_checkbox" />
                  </div>
                  <div accordion="element" className="accordion_dropdown">
                    <div mask-height="element">
                      <div className="accordion_content">
                        <div className="c-text-4 w-richtext">
                          <p>Brightwave takes your data security seriously. Founded by engineers who build systems responsible for handling the world's most sensitive and mission-critical financial datasets, our platform is designed from the ground up to meet the stringent security and operational requirements of the most demanding enterprise clients.<br /></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="w-node-_99cafbbd-700d-13b4-3934-447077a75961-0464d2c1" className="c-line"></div>
              <div id="w-node-e6c6a525-8b7a-46ed-2058-f0ce5731b86b-0464d2c1">
                <div accordion="" id="w-node-_0d758a7c-5986-fc72-0a2c-7e16d285f79d-d285f79d" className="accordion">
                  <div className="accordion_toggle">
                    <div className="c-text-2 cc-balance">How secure is my data with Brightwave?</div>
                    <div chevron-x="" className="c-svg-2 cc-20 w-embed"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg></div><input accordion-checkbox="" type="checkbox" className="accordion_checkbox" />
                  </div>
                  <div accordion="element" className="accordion_dropdown">
                    <div mask-height="element">
                      <div className="accordion_content">
                        <div className="c-text-4 w-richtext">
                          <p>Brightwave takes your data security seriously. Founded by engineers who build systems responsible for handling the world's most sensitive and mission-critical financial datasets, our platform is designed from the ground up to meet the stringent security and operational requirements of the most demanding enterprise clients.<br /></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="w-node-ea060e38-537f-28ad-e74a-8be4ece1ffba-0464d2c1" className="c-line"></div>
              <div id="w-node-_6050b00e-a476-2a19-b5a0-2a9bd84189cd-0464d2c1">
                <div accordion="" id="w-node-_0d758a7c-5986-fc72-0a2c-7e16d285f79d-d285f79d" className="accordion">
                  <div className="accordion_toggle">
                    <div className="c-text-2 cc-balance">How secure is my data with Brightwave?</div>
                    <div chevron-x="" className="c-svg-2 cc-20 w-embed"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg></div><input accordion-checkbox="" type="checkbox" className="accordion_checkbox" />
                  </div>
                  <div accordion="element" className="accordion_dropdown">
                    <div mask-height="element">
                      <div className="accordion_content">
                        <div className="c-text-4 w-richtext">
                          <p>Brightwave takes your data security seriously. Founded by engineers who build systems responsible for handling the world's most sensitive and mission-critical financial datasets, our platform is designed from the ground up to meet the stringent security and operational requirements of the most demanding enterprise clients.<br /></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="w-node-_6229a2ed-e093-255f-07b3-9cbf2c08bf69-0464d2c1" className="c-line"></div>
              <div id="w-node-_578b5bac-54df-d488-fa15-466ea66caf6d-0464d2c1">
                <div accordion="" id="w-node-_0d758a7c-5986-fc72-0a2c-7e16d285f79d-d285f79d" className="accordion">
                  <div className="accordion_toggle">
                    <div className="c-text-2 cc-balance">How secure is my data with Brightwave?</div>
                    <div chevron-x="" className="c-svg-2 cc-20 w-embed"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg></div><input accordion-checkbox="" type="checkbox" className="accordion_checkbox" />
                  </div>
                  <div accordion="element" className="accordion_dropdown">
                    <div mask-height="element">
                      <div className="accordion_content">
                        <div className="c-text-4 w-richtext">
                          <p>Brightwave takes your data security seriously. Founded by engineers who build systems responsible for handling the world's most sensitive and mission-critical financial datasets, our platform is designed from the ground up to meet the stringent security and operational requirements of the most demanding enterprise clients.<br /></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="w-node-ae3fcf6e-df9f-288b-edcf-428669309624-0464d2c1" className="c-line"></div>
              <div id="w-node-_0c3d4377-a34d-304d-a5b0-24f9b30dcd44-0464d2c1">
                <div accordion="" id="w-node-_0d758a7c-5986-fc72-0a2c-7e16d285f79d-d285f79d" className="accordion">
                  <div className="accordion_toggle">
                    <div className="c-text-2 cc-balance">How secure is my data with Brightwave?</div>
                    <div chevron-x="" className="c-svg-2 cc-20 w-embed"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg></div><input accordion-checkbox="" type="checkbox" className="accordion_checkbox" />
                  </div>
                  <div accordion="element" className="accordion_dropdown">
                    <div mask-height="element">
                      <div className="accordion_content">
                        <div className="c-text-4 w-richtext">
                          <p>Brightwave takes your data security seriously. Founded by engineers who build systems responsible for handling the world's most sensitive and mission-critical financial datasets, our platform is designed from the ground up to meet the stringent security and operational requirements of the most demanding enterprise clients.<br /></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="w-node-bdceef8e-9641-1b58-27b1-8ada286ea3e9-0464d2c1" className="c-line"></div>
              <div id="w-node-_6d00bd92-ac20-86fc-6e61-1540457bd23e-0464d2c1">
                <div accordion="" id="w-node-_0d758a7c-5986-fc72-0a2c-7e16d285f79d-d285f79d" className="accordion">
                  <div className="accordion_toggle">
                    <div className="c-text-2 cc-balance">How secure is my data with Brightwave?</div>
                    <div chevron-x="" className="c-svg-2 cc-20 w-embed"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg></div><input accordion-checkbox="" type="checkbox" className="accordion_checkbox" />
                  </div>
                  <div accordion="element" className="accordion_dropdown">
                    <div mask-height="element">
                      <div className="accordion_content">
                        <div className="c-text-4 w-richtext">
                          <p>Brightwave takes your data security seriously. Founded by engineers who build systems responsible for handling the world's most sensitive and mission-critical financial datasets, our platform is designed from the ground up to meet the stringent security and operational requirements of the most demanding enterprise clients.<br /></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="w-node-_362bbb2b-1bce-4cef-b674-c935c4317a41-0464d2c1" className="c-line"></div>
            </div>
          </div>
        </div>
      </section>
      <section no-fade="" className="c-section cc-footer">
        <div className="c-container">
          <div className="footer-wrap">
            <div className="footer">
              <div className="footer_content">
                <div className="v-48 cc-footer">
                  <div className="c-text-1">Professional-grade AI for the world's most complex challenges.</div>
                  <div className="invert">
                    <div className="dark-mode-invert">
                      <a stagger-cta="" href="/contact" className="cta-p-sm cc-stroke w-inline-block">
                        <div stagger-cta-text="dark" className="c-text-link cc-stagger-cta">Contact us</div>
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
                </div>
                <div className="footer_cols">
                  <div className="v-40">
                    <div className="footer_cat">
                      <div className="c-text-link">Platform</div>
                      <div className="footer_cat_spacer">
                        <a href="/investment-intelligence-engine" className="c-text-5 cc-link">Investment Intelligence Engine</a>
                        <a href="/enterprise-security-compliance" className="c-text-5 cc-link">Enterprise Trust &amp; Security</a>
                        <a href="release-notes.html" className="c-text-5 cc-link">Release Notes</a>
                        <a href="https://docs.brightwave.io" className="c-text-5 cc-link">Knowledge Base</a>
                      </div>
                    </div>
                    <div className="footer_cat">
                      <div className="c-text-link">Solutions</div>
                      <div className="footer_cat_spacer">
                        <a href="/private-markets" className="c-text-5 cc-link">Private Markets</a>
                      </div>
                    </div>
                  </div>
                  <div className="v-40">
                    <div className="footer_cat">
                      <div className="c-text-link">Resources</div>
                      <div className="footer_cat_spacer">
                        <a href="/blog" className="c-text-5 cc-link">Blog</a>
                        <a href="engineering.html" className="c-text-5 cc-link">Engineering Blog</a>
                      </div>
                    </div>
                    <div className="footer_cat">
                      <div className="c-text-link">Company</div>
                      <div className="footer_cat_spacer">
                        <a href="/about" className="c-text-5 cc-link">About</a>
                        <a href="/news" className="c-text-5 cc-link">News</a>
                        <a href="https://www.linkedin.com/company/brightwaveio/jobs/" className="c-text-5 cc-link">Careers</a>
                      </div>
                    </div>
                  </div>
                  <div className="mobile-btns cc-footer">
                    <div className="nav-social">
                      <a href="https://www.linkedin.com/company/brightwave-io/about/" target="_blank" className="c-linkedin w-inline-block">
                        <div className="svg w-embed"><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.94043 5.00002C6.94017 5.53046 6.7292 6.03906 6.35394 6.41394C5.97868 6.78883 5.46986 6.99929 4.93943 6.99902C4.409 6.99876 3.90039 6.78779 3.52551 6.41253C3.15062 6.03727 2.94016 5.52846 2.94043 4.99802C2.9407 4.46759 3.15166 3.95899 3.52692 3.5841C3.90218 3.20922 4.411 2.99876 4.94143 2.99902C5.47186 2.99929 5.98047 3.21026 6.35535 3.58552C6.73024 3.96078 6.9407 4.46959 6.94043 5.00002ZM7.00043 8.48002H3.00043L3.00043 21H7.00043L7.00043 8.48002ZM13.3204 8.48002H9.34043L9.34043 21H13.2804V14.43C13.2804 10.77 18.0504 10.43 18.0504 14.43V21H22.0004L22.0004 13.07C22.0004 6.90002 14.9404 7.13002 13.2804 10.16L13.3204 8.48002Z" fill="white"></path>
                          </svg></div>
                      </a>
                    </div>
                    <div className="nav-social">
                      <a href="https://x.com/brightwaveio" target="_blank" className="c-x w-inline-block">
                        <div className="svg w-embed"><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.6873 3.06299L12.6913 8.77399L8.3713 3.06299H2.1123L9.5893 12.839L2.5033 20.938H5.5373L11.0063 14.688L15.7863 20.938H21.8883L14.0943 10.634L20.7193 3.06299H17.6873ZM16.6233 19.123L5.6543 4.78199H7.4573L18.3033 19.122L16.6233 19.123Z" fill="white"></path>
                          </svg></div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="footer_grid">
                <div id="w-node-dc976ae4-68fc-b3a7-f2fa-a21c48aa546d-48aa5435" className="grid_1"></div>
                <div className="grid_2"></div>
                <div className="grid_2"></div>
                <div className="grid_3"></div>
              </div>
              <div className="footer_brightwave"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 1505 285" fill="none" className="brightwave">
                  <path d="M1431.27 223.017C1385.07 223.017 1354.57 190.366 1354.57 141.081C1354.57 91.7958 1384.76 59.1445 1430.96 59.1445C1479.32 59.1445 1508.89 95.1842 1504.58 149.09H1385.68C1388.15 180.817 1405.09 199.299 1431.58 199.299C1450.37 199.299 1465.77 190.058 1471.31 174.656H1500.58C1492.88 204.227 1466.39 223.017 1431.27 223.017ZM1386.3 128.143H1474.7C1472.55 99.4966 1456.84 82.8629 1431.89 82.8629C1406.63 82.8629 1389.99 99.8046 1386.3 128.143Z" fill="currentColor"></path>
                  <path d="M1316.52 64.0703H1347.94L1289.73 218.086H1254.92L1197.01 64.0703H1228.12L1272.48 186.359L1316.52 64.0703Z" fill="currentColor"></path>
                  <path d="M1080.83 108.121H1051.26C1056.49 77.3184 1081.44 59.1445 1118.41 59.1445C1157.22 59.1445 1181.55 79.4746 1181.55 112.742V190.674C1181.55 201.147 1182.48 208.232 1184.63 218.089H1155.06C1153.52 211.62 1152.6 204.843 1152.29 197.142C1140.28 213.468 1120.26 223.017 1096.85 223.017C1065.73 223.017 1046.33 206.075 1046.33 178.661C1046.33 152.478 1063.58 135.536 1097.77 129.992L1123.95 125.679C1143.36 122.291 1151.67 115.822 1151.67 104.425C1151.67 90.5637 1139.05 81.6308 1118.72 81.6308C1097.46 81.6308 1082.98 91.7958 1080.83 108.121ZM1151.98 153.094V133.072C1145.21 139.233 1136.58 143.237 1124.57 145.393L1102.7 149.09C1085.76 151.862 1076.52 161.103 1076.52 175.58C1076.52 191.29 1086.99 200.531 1105.78 200.531C1132.58 200.531 1151.98 180.817 1151.98 153.094Z" fill="currentColor"></path>
                  <path d="M904.067 64.0703H936.102L973.066 181.122L1005.72 64.0703H1036.83L992.163 218.086H957.356L920.084 104.114L883.12 218.086H848.005L803.648 64.0703H834.452L867.103 181.122L904.067 64.0703Z" fill="currentColor"></path>
                  <path d="M717.829 22.1797H747.4V64.0719H784.364V87.1743H747.4V170.035C747.4 187.9 753.253 194.985 768.654 194.985H785.288V218.087H761.877C730.766 218.087 717.829 202.378 717.829 168.494V87.1743H694.727V64.0719H717.829V22.1797Z" fill="currentColor"></path>
                  <path d="M540.453 2.46094H569.408V83.4731C581.421 67.7635 599.287 59.1387 620.541 59.1387C655.041 59.1387 675.679 82.241 675.679 119.513V218.083H646.108V124.749C646.108 98.2586 634.711 84.3972 611.3 84.3972C586.658 84.3972 570.024 100.107 570.024 125.057V218.083H540.453V2.46094Z" fill="currentColor"></path>
                  <path d="M387.08 230.41C391.393 250.124 407.41 260.905 431.437 260.905C461.008 260.905 477.026 244.887 477.026 215.316V190.366C464.704 209.156 446.222 219.013 423.736 219.013C382.768 219.013 354.121 186.669 354.121 138.925C354.121 92.1038 383.076 59.1445 423.428 59.1445C445.914 59.1445 464.704 69.0015 477.026 87.7914V64.073H506.596V211.928C506.596 257.825 479.182 284.623 431.437 284.623C390.469 284.623 363.978 264.909 358.126 230.41H387.08ZM431.437 193.754C459.16 193.754 477.334 171.268 477.334 138.925C477.334 106.889 459.16 84.4031 431.437 84.4031C403.714 84.4031 384.924 106.889 384.924 138.925C384.924 170.96 403.714 193.754 431.437 193.754Z" fill="currentColor"></path>
                  <path d="M307.163 38.8119C293.917 38.8119 287.141 29.571 287.141 19.4059C287.141 8.93289 293.917 0 307.163 0C319.792 0 327.185 8.93289 327.185 19.4059C327.185 29.571 319.792 38.8119 307.163 38.8119ZM292.377 218.086V64.0705H321.948V218.086H292.377Z" fill="currentColor"></path>
                  <path d="M185.941 64.073H214.896V90.2557C226.293 69.6176 245.391 59.1445 270.034 59.1445V87.4834C232.762 87.4834 215.512 102.885 215.512 135.536V218.089H185.941V64.073Z" fill="currentColor"></path>
                  <path d="M111.199 101.955C142.002 105.651 162.332 128.138 162.332 159.249C162.332 194.672 135.534 218.083 95.1816 218.083H0V2.46094H87.4808C123.828 2.46094 146.931 22.483 146.931 54.2102C146.931 78.2366 133.377 96.4104 111.199 101.955ZM82.2443 92.7141C104.731 92.7141 117.36 81.0089 117.36 60.0628C117.36 39.7327 105.655 29.2596 82.5523 29.2596H30.8031V92.7141H82.2443ZM30.8031 191.284H91.4852C118.284 191.284 131.529 179.271 131.529 154.936C131.529 130.602 117.36 117.973 89.637 117.973H30.8031V191.284Z" fill="currentColor"></path>
                </svg></div>
              <div className="emblem-wrap"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 1538 1669" fill="none" className="brightwave_emblem">
                  <path d="M260.505 300.816L306.359 347.238V751.384L260.505 797.805H45.8869L0.00679596 751.384V347.238L45.8869 300.816H260.505Z" fill="currentColor" fillOpacity="0.35"></path>
                  <path d="M672.07 -2.66019e-05L1173.5 507.345H1255.6L1501.89 258.154L1538 294.666V751.384L1492.12 797.805H915.059L882.142 784.005L379.097 275.03V230.764L607.199 -2.66019e-05H672.07Z" fill="currentColor" fillOpacity="0.35"></path>
                  <path d="M1492.12 871.405L1538 917.826V1374.6L1502.07 1411.24L1255.6 1161.87H1173.5L672.278 1669H607.407L379.097 1438.03V1394.15L882.142 885.206L915.059 871.405H1492.12Z" fill="currentColor" fillOpacity="0.35"></path>
                  <path d="M807.605 812.677V856.522L315.316 1354.61L282.4 1368.41H45.9325C37.2033 1359.58 8.7036 1330.8 0.000401625 1321.97V917.663L45.7246 871.4H321.058L379.096 812.677V453.768L415.987 416.442L807.605 812.677Z" fill="currentColor" fillOpacity="0.35"></path>
                </svg></div>
            </div>
          </div>
          <div className="footer_bootom-wrap">
            <div className="footer_links">
              <a href="security.html" className="footer_link w-inline-block">
                <div>Safety &amp; Security</div>
              </a>
              <a href="privacy-policy.html" className="footer_link w-inline-block">
                <div>Privacy Policy</div>
              </a>
              <a href="terms-of-use.html" className="footer_link w-inline-block">
                <div>Terms of Service</div>
              </a>
            </div>
            <div>
              <div>2025 Brightwave Inc. All rights reserved.</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  <div className="hide w-embed">
    {/* Inline Webflow styles */}
<style dangerouslySetInnerHTML={{ __html: `
  .u-dark-mode .marquee-logo {
    filter: invert(1);
  }
` }} />
  </div>

    </>
  )
}
