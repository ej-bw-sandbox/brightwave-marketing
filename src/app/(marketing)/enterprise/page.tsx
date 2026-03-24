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
      {/* ==================== HERO ==================== */}
      <section className="c-section ent-price-hero">
        <div className="c-container">
          <div className="ent-pricing_hero-content">
            <div className="c-ent-price_hero-wrapper">
              <div>
                <h1 className="c-title-3">If Your Firm is Using Another AI Tool, You're Losing Carry.</h1>
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
                  <a stagger-cta="" href="#" className="cta-p-sm cc-stroke w-inline-block">
                    <div>
                      <div stagger-cta-text="dark" className="c-text-link cc-stagger-cta">See How It Works</div>
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
            <div className="c-ent-price_wizard-wrapper">
              <RoiCalculator />
            </div>
          </div>
        </div>
      </section>

      {/* ==================== LOTTIE ANIMATION ==================== */}
      <section className="c-section cc-program-lottie">
        <div className="c-container">
          <div lottie-bg="" className="lottie-crop cc-market">
            <LottiePlayer src="/webflow-documents/Generative-Loop-Final-25.json" className="lottie_cropped-desktop cc-market" />
            <LottiePlayer src="/webflow-documents/Generative-Loop-Final.json" className="lottie_cropped-mobile" slice="" />
          </div>
        </div>
      </section>

      {/* ==================== SOCIAL PROOF ==================== */}
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
                    <style dangerouslySetInnerHTML={{ __html: `:root {
  --gap: 5rem;
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
}` }} />
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

      {/* ==================== AI RESEARCH TRUST ==================== */}
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
              <div className="stretch-child">
                <div className="c-text-4">Brightwave is an AI-native research platform built exclusively for buy-side private markets professionals. It does not summarize documents and hope for the best. It analyzes them -- extracting key data, identifying risks, surfacing contradictions, and generating structured outputs where every claim traces to its source document, page, and paragraph.<br /><br />Your team uploads a CIM, a data room, a set of credit agreements, or a portfolio of quarterly reports. Brightwave reads everything, structures the information, and delivers analysis that is ready for your Investment Committee -- not a rough draft that needs three rounds of manual verification.<br /><br />The result is not just speed (though you will move faster). It is depth. Your team analyzes more deals, catches more risks, monitors more portfolio companies, and produces higher-quality research -- without adding headcount. The associates who used to spend 60% of their day on data extraction now spend it on judgment, pattern recognition, and insight generation. The work that actually matters.</div>
              </div>
              <div className="stretch-child img">
                <div className="partner-about_image-wrapper">
                  <LottiePlayer src="/webflow-documents/About-Lottie-25.json" className="partner-about_lottie-wrapper" loop={false} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CORE CAPABILITIES ==================== */}
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
              <div className="c-amb-temp-chal_sticky">
                <div className="c-abm-temp-chal_title-wrapper">
                  <h2 className="c-title-3">Who Should Become a Partner</h2>
                </div>
                <div className="c-abm-temp-chal_button-wrapper">
                  <a stagger-cta="" href="/contact" className="cta-p-sm w-inline-block">
                    <div>
                      <div stagger-cta-text="dark" className="c-text-link cc-stagger-cta">Book a demo</div>
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
                  <a stagger-cta="" href="#" className="cta-p-sm cc-stroke w-inline-block">
                    <div>
                      <div stagger-cta-text="dark" className="c-text-link cc-stagger-cta">See How It Works</div>
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
              <div className="c-abm-temp-chal_card-list">
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
                          <p className="c-text-5">Brightwave generates structured research reports -- market analyses, competitive assessments, risk summaries, and deal evaluations -- that are formatted for your Investment Committee. Every finding includes a citation to the source document, page, and passage. Your IC does not have to trust a black box. They can verify every claim with a single click.</p>
                        </div>
                      </div>
                      <div className="c-abm-temp-chal_card-top-box"></div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="c-abm-temp-chal_card">
                    <div className="c-abm-temp-chal_card-content">
                      <div className="c-text-3 cc-500">Portfolio Monitoring</div>
                      <div className="c-text-5">Continuous Intelligence Across Your Entire Portfolio</div>
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
                          <p className="c-text-5">Empower your team to process data rooms 25x faster, allowing senior talent to focus on structuring situational capital solutions. Start processing your first deal in under 30 seconds to reclaim time for high-value analysis.</p>
                        </div>
                      </div>
                      <div className="c-abm-temp-chal_card-top-box"></div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="c-abm-temp-chal_card">
                    <div className="c-abm-temp-chal_card-content">
                      <div className="c-text-3 cc-500">Data Room Analysis</div>
                      <div className="c-text-5">From Upload to Insight in Minutes, Not Days</div>
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
                          <p className="c-text-5">Empower your team to process data rooms 25x faster, allowing senior talent to focus on structuring situational capital solutions. Start processing your first deal in under 30 seconds to reclaim time for high-value analysis.</p>
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

      {/* ==================== BRIGHTWAVE BY THE NUMBERS ==================== */}
      <section className="c-section ent-price-numbers">
        <div className="c-container">
          <div className="partner-list_wrapper">
            <div className="partner-list_title">
              <h3 className="c-title-3">Brightwave by the Numbers</h3>
              <a stagger-cta="" href="/contact" className="cta-p-sm w-inline-block">
                    <div>
                      <div stagger-cta-text="dark" className="c-text-link cc-stagger-cta">Book a demo</div>
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
            <div className="partner-list_list-wrapper">
              <div className="partner-list_list-item">
                <div className="partner_icon">
                  <div className="svg w-embed"><svg width={40} height={40} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="4" fill="#E7E70D"></rect><mask id="m1" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="8" y="8" width="24" height="24"><rect x="8" y="8" width="24" height="24" fill="currentColor"></rect></mask><g mask="url(#m1)"><path d="M20 30C18.6167 30 17.3167 29.7375 16.1 29.2125C14.8833 28.6875 13.825 27.975 12.925 27.075C12.025 26.175 11.3125 25.1167 10.7875 23.9C10.2625 22.6833 10 21.3833 10 20C10 18.6167 10.2625 17.3167 10.7875 16.1C11.3125 14.8833 12.025 13.825 12.925 12.925C13.825 12.025 14.8833 11.3125 16.1 10.7875C17.3167 10.2625 18.6167 10 20 10C21.3833 10 22.6833 10.2625 23.9 10.7875C25.1167 11.3125 26.175 12.025 27.075 12.925C27.975 13.825 28.6875 14.8833 29.2125 16.1C29.7375 17.3167 30 18.6167 30 20C30 21.3833 29.7375 22.6833 29.2125 23.9C28.6875 25.1167 27.975 26.175 27.075 27.075C26.175 27.975 25.1167 28.6875 23.9 29.2125C22.6833 29.7375 21.3833 30 20 30Z" fill="currentColor"></path></g></svg></div>
                </div>
                <div className="c-text-3 cc-500">[X]+ Firms</div>
              </div>
              <div className="partner-list_list-item">
                <div className="partner_icon">
                  <div className="svg w-embed"><svg width={40} height={40} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="4" fill="#E7E70D"></rect><mask id="m2" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="8" y="8" width="24" height="24"><rect x="8" y="8" width="24" height="24" fill="#D9D9D9"></rect></mask><g mask="url(#m2)"><path d="M22.5 26C23.2 26 23.7916 25.7583 24.275 25.275C24.7583 24.7917 25 24.2 25 23.5C25 22.8 24.7583 22.2083 24.275 21.725C23.7916 21.2417 23.2 21 22.5 21C21.8 21 21.2083 21.2417 20.725 21.725C20.2416 22.2083 20 22.8 20 23.5C20 24.2 20.2416 24.7917 20.725 25.275C21.2083 25.7583 21.8 26 22.5 26Z" fill="#1C1B1F"></path></g></svg></div>
                </div>
                <div className="c-text-3 cc-500">$[X]B+ AUM</div>
              </div>
              <div className="partner-list_list-item">
                <div className="partner_icon">
                  <div className="svg w-embed"><svg width={40} height={40} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="4" fill="#E7E70D"></rect><mask id="m3" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="8" y="8" width="24" height="24"><rect x="8" y="8" width="24" height="24" fill="#D9D9D9"></rect></mask><g mask="url(#m3)"><path d="M13 22.9999H12C11.45 22.9999 10.9792 22.8041 10.5875 22.4124C10.1958 22.0208 10 21.5499 10 20.9999V18.9999C10 18.4499 10.1958 17.9791 10.5875 17.5874C10.9792 17.1958 11.45 16.9999 12 16.9999H16L19.475 14.8999C19.8083 14.6999 20.1458 14.6999 20.4875 14.8999C20.8292 15.0999 21 15.3916 21 15.7749V24.2249C21 24.6083 20.8292 24.8999 20.4875 25.0999C20.1458 25.2999 19.8083 25.2999 19.475 25.0999L16 22.9999H15V25.9999C15 26.2833 14.9042 26.5208 14.7125 26.7124C14.5208 26.9041 14.2833 26.9999 14 26.9999C13.7167 26.9999 13.4792 26.9041 13.2875 26.7124C13.0958 26.5208 13 26.2833 13 25.9999V22.9999Z" fill="#1C1B1F"></path></g></svg></div>
                </div>
                <div className="c-text-3 cc-500">[X]M+ Documents Analyzed</div>
              </div>
              <div className="partner-list_list-item">
                <div className="partner_icon">
                  <div className="svg w-embed"><svg width={40} height={40} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="4" fill="#E7E70D"></rect><mask id="m4" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="8" y="8" width="24" height="24"><rect x="8" y="8" width="24" height="24" fill="#D9D9D9"></rect></mask><g mask="url(#m4)"><path d="M20 23C20.7 23 21.2917 22.7583 21.775 22.275C22.2583 21.7917 22.5 21.2 22.5 20.5C22.5 19.8 22.2583 19.2083 21.775 18.725C21.2917 18.2417 20.7 18 20 18C19.3 18 18.7083 18.2417 18.225 18.725C17.7417 19.2083 17.5 19.8 17.5 20.5C17.5 21.2 17.7417 21.7917 18.225 22.275C18.7083 22.7583 19.3 23 20 23Z" fill="#1C1B1F"></path></g></svg></div>
                </div>
                <div className="c-text-3 cc-500">[X]% Expand Within 12 Months</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== ENTERPRISE SECURITY ==================== */}
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
                    <div className="u-relative">
                      <img src="/webflow-images/illustration_Enterprise-Trust--Security.svg" loading="lazy" width={70} light-asset="" alt="" className="image-abso" />
                      <img src="/webflow-images/illustration_Enterprise-Trust--Security-1.svg" loading="lazy" width={70} dark-asset="" alt="" className="image-abso" />
                    </div>
                  </div>
                  <div className="v-64 cc-fill">
                    <div className="v-20 cc-explore">
                      <div className="c-title-3">SOC 2 Type II Compliant</div>
                      <div>
                        <div className="c-text-4">Brightwave maintains SOC 2 Type II certification, independently audited annually. Our security controls meet the standards required by the world&apos;s most security-conscious financial institutions.</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="explore-item">
                  <div className="aspect-16-9">
                    <div className="u-relative">
                      <img src="/webflow-images/illustration_Investment-Intelligence-Engine.svg" loading="lazy" width={70} light-asset="" alt="" className="image-abso" />
                      <img src="/webflow-images/illustration_Investment-Intelligence-Engine-1.svg" loading="lazy" width={70} dark-asset="" alt="" className="image-abso" />
                    </div>
                  </div>
                  <div className="v-64 cc-fill">
                    <div className="v-20 cc-explore">
                      <div className="c-title-3">Your Data Never Trains Our Models</div>
                      <div className="c-text-4">Your documents, your research, your proprietary data -- none of it is used to train, fine-tune, or improve Brightwave&apos;s AI models. Your data is processed, analyzed, and returned to you. Period. This is not a checkbox commitment. It is a contractual guarantee.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SECURITY FEATURES ==================== */}
      <section className="c-section ent-price">
        <div className="c-container">
          <div className="c-abm-temp_chal_main-wrapper">
            <div className="c-abm-temp-chal_card-wrapper c-abm-template_grid">
              <div className="c-amb-temp-chal_sticky">
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
              <div className="c-abm-temp-chal_card-list">
                <div className="v-12 border">
                  <div className="c-title-5">SSO / SAML Integration</div>
                  <div className="c-text-4">Connect to your firm&apos;s existing identity provider. One login, centralized access control.</div>
                </div>
                <div className="v-12 border">
                  <div className="c-title-5">Role-Based Access Controls</div>
                  <div className="c-text-4">Define who can access which documents, workspaces, and outputs. Analyst-level, VP-level, and admin permissions.</div>
                </div>
                <div className="v-12 border">
                  <div className="c-title-5">Audit Logs</div>
                  <div className="c-text-4">Full visibility into who accessed what, when, and what actions were taken. Exportable for compliance reporting.</div>
                </div>
                <div className="v-12 border">
                  <div className="c-title-5">Data Encryption</div>
                  <div className="c-text-4">AES-256 encryption at rest, TLS 1.3 in transit. Your documents are encrypted from upload through analysis through storage.</div>
                </div>
                <div className="v-12 border">
                  <div className="c-title-5">Data Residency Options</div>
                  <div className="c-text-4">Deploy in your preferred cloud region. US, EU, and custom residency configurations available for firms with jurisdictional requirements.</div>
                </div>
                <div className="v-12 border">
                  <div className="c-title-5">Dedicated Tenant Architecture</div>
                  <div className="c-text-4">Enterprise customers receive isolated infrastructure. Your data is not co-mingled with other customers.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== WHY CHOOSE BRIGHTWAVE ==================== */}
      <section className="c-section ent-price">
        <div className="c-container">
          <div className="v-48">
            <div className="ent-price-head">
              <h2 className="c-title-4">Why the Most Demanding Investment Teams Choose Brightwave</h2>
            </div>
            <div lottie-bg="" className="lottie-crop">
              <LottiePlayer src="/webflow-documents/CTA-Lottie-25.json" className="lottie_cropped-desktop" />
              <LottiePlayer src="/webflow-documents/Generative-Loop-Final-25.json" className="lottie_cropped-mobile" slice="" />
            </div>
            <div className="ent-price-card-grid">
              <div className="ent-price-dark-card">
                <div className="ent-price-dark-card_header">
                  <div className="eyebrow-box"></div>
                  <div className="c-title-5">Built Exclusively for Private Markets</div>
                </div>
                <div>
                  <p className="c-text-5">Brightwave is not a horizontal AI tool adapted for finance. It is not a sell-side platform repurposed for buy-side workflows. Every feature, every workflow template, every analytical model is built around how PE, private credit, growth equity, and infrastructure firms actually work. Our team has spent thousands of hours mapping the 27 core workflows that define the buy-side investment lifecycle -- from CIM screening through portfolio exit. That specificity shows in every output.</p>
                </div>
              </div>
              <div className="ent-price-dark-card">
                <div className="ent-price-dark-card_header">
                  <div className="eyebrow-box"></div>
                  <div className="c-title-5">Citation-Backed Outputs You Can Trust in Front of Your IC</div>
                </div>
                <div>
                  <p className="c-text-5">Every finding Brightwave generates traces to its source document, page, and passage. Click any claim and see exactly where it came from. No hallucinations. No black boxes. No unverifiable assertions. Your Investment Committee sees cited analysis -- the same standard they expect from your deal team&apos;s manual work, delivered in a fraction of the time. This is not an incremental improvement over general AI tools. It is a fundamentally different approach to trust.</p>
                </div>
              </div>
              <div className="ent-price-dark-card">
                <div className="ent-price-dark-card_header">
                  <div className="eyebrow-box"></div>
                  <div className="c-title-5">Deployed in Days, Not Months</div>
                </div>
                <div>
                  <p className="c-text-5">There is no 6-month IT project. No custom implementation. No waiting for engineering resources. Your team is running live workflows within 2 weeks of signing -- analyzing real CIMs, ingesting real data rooms, monitoring real portfolio companies. Brightwave connects to your existing infrastructure (SSO, data rooms, CRM) with minimal IT involvement. Most firms complete setup in under 10 business days, including security review, team onboarding, and workflow configuration.</p>
                </div>
              </div>
              <div className="ent-price-dark-card">
                <div className="ent-price-dark-card_header">
                  <div className="eyebrow-box"></div>
                  <div className="c-title-5">Scales With Your Portfolio</div>
                </div>
                <div>
                  <p className="c-text-5">Five portfolio companies or fifty. Three deals in pipeline or thirty. Brightwave scales with your firm&apos;s activity without requiring additional headcount. As your portfolio grows, your monitoring capacity grows with it. As your deal flow increases, your screening capacity increases with it. The economics work in your favor: every new deal, every new portfolio company, every new fund adds marginal effort, not marginal cost. That is the difference between a tool that helps today and a platform that compounds value over years.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== TIMELINE ==================== */}
      <section className="c-section ent-price">
        <div className="c-container">
          <div className="v-48">
            <div className="ent-price-head">
              <h2 className="c-title-3">From First Conversation to Measurable Results in 30 Days</h2>
            </div>
            <div className="ent-price-timeline-grid">
              <div className="ent-price-timeline-item">
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
                    <div className="w-embed"><svg width={48} height={48} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24.0007 25.9998C25.1053 25.9998 26.0007 25.1043 26.0007 23.9998C26.0007 22.8952 25.1053 21.9998 24.0007 21.9998C22.8962 21.9998 22.0007 22.8952 22.0007 23.9998C22.0007 25.1043 22.8962 25.9998 24.0007 25.9998Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M40.4007 40.3998C44.4807 36.3398 40.4407 25.6798 31.4007 16.5998C22.3207 7.55977 11.6607 3.51977 7.60075 7.59977C3.52075 11.6598 7.56075 22.3198 16.6007 31.3998C25.6807 40.4398 36.3407 44.4798 40.4007 40.3998Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M31.4007 31.3998C40.4407 22.3198 44.4807 11.6598 40.4007 7.59977C36.3407 3.51977 25.6807 7.55977 16.6007 16.5998C7.56075 25.6798 3.52075 36.3398 7.60075 40.3998C11.6607 44.4798 22.3207 40.4398 31.4007 31.3998Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg></div>
                  </div>
                </div>
              </div>
              <div className="ent-price-timeline-item">
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
                    <div className="w-embed"><svg width={48} height={48} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24.0007 25.9998C25.1053 25.9998 26.0007 25.1043 26.0007 23.9998C26.0007 22.8952 25.1053 21.9998 24.0007 21.9998C22.8962 21.9998 22.0007 22.8952 22.0007 23.9998C22.0007 25.1043 22.8962 25.9998 24.0007 25.9998Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M40.4007 40.3998C44.4807 36.3398 40.4407 25.6798 31.4007 16.5998C22.3207 7.55977 11.6607 3.51977 7.60075 7.59977C3.52075 11.6598 7.56075 22.3198 16.6007 31.3998C25.6807 40.4398 36.3407 44.4798 40.4007 40.3998Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M31.4007 31.3998C40.4407 22.3198 44.4807 11.6598 40.4007 7.59977C36.3407 3.51977 25.6807 7.55977 16.6007 16.5998C7.56075 25.6798 3.52075 36.3398 7.60075 40.3998C11.6607 44.4798 22.3207 40.4398 31.4007 31.3998Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg></div>
                  </div>
                </div>
              </div>
              <div className="ent-price-timeline-item">
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
                    <div className="w-embed"><svg width={48} height={48} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24.0007 25.9998C25.1053 25.9998 26.0007 25.1043 26.0007 23.9998C26.0007 22.8952 25.1053 21.9998 24.0007 21.9998C22.8962 21.9998 22.0007 22.8952 22.0007 23.9998C22.0007 25.1043 22.8962 25.9998 24.0007 25.9998Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M40.4007 40.3998C44.4807 36.3398 40.4407 25.6798 31.4007 16.5998C22.3207 7.55977 11.6607 3.51977 7.60075 7.59977C3.52075 11.6598 7.56075 22.3198 16.6007 31.3998C25.6807 40.4398 36.3407 44.4798 40.4007 40.3998Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M31.4007 31.3998C40.4407 22.3198 44.4807 11.6598 40.4007 7.59977C36.3407 3.51977 25.6807 7.55977 16.6007 16.5998C7.56075 25.6798 3.52075 36.3398 7.60075 40.3998C11.6607 44.4798 22.3207 40.4398 31.4007 31.3998Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg></div>
                  </div>
                </div>
              </div>
              <div className="ent-price-timeline-item">
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
                    <div className="w-embed"><svg width={48} height={48} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
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

      {/* ==================== FAQs ==================== */}
      <section className="c-section ent-price">
        <div className="c-container">
          <div className="v-40">
            <h2 className="c-title-2">FAQs</h2>
            <div className="grid cc-no-gap">
              <div id="faq-line-0" className="c-line"></div>
              <div id="faq-acc-0">
                <div accordion="" className="accordion">
                  <div className="accordion_toggle">
                    <div className="c-text-2 cc-balance">How does Brightwave ensure the accuracy of its insights?</div>
                    <div chevron-x="" className="c-svg-2 cc-20 w-embed"><svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg></div>
                    <input accordion-checkbox="" type="checkbox" className="accordion_checkbox" />
                  </div>
                  <div accordion="element" className="accordion_dropdown">
                    <div mask-height="element">
                      <div className="accordion_content">
                        <div className="c-text-4 w-richtext">
                          <p>Brightwave uses state-of-the-art entailment models to cross-verify every research finding against the source content, ensuring high accuracy and reliability of insights. The platform provides sentence-level attribution to the underlying primary sources, allowing you to trace the origin of every data point for complete transparency.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="faq-line-1" className="c-line"></div>
              <div id="faq-acc-1">
                <div accordion="" className="accordion">
                  <div className="accordion_toggle">
                    <div className="c-text-2 cc-balance">Can I customize the data sources for my analysis?</div>
                    <div chevron-x="" className="c-svg-2 cc-20 w-embed"><svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg></div>
                    <input accordion-checkbox="" type="checkbox" className="accordion_checkbox" />
                  </div>
                  <div accordion="element" className="accordion_dropdown">
                    <div mask-height="element">
                      <div className="accordion_content">
                        <div className="c-text-4 w-richtext">
                          <p>Absolutely. Brightwave allows you to select and prioritize data sources, tailoring the input to best suit your specific research needs. Our analysis engine can operate over your firm&apos;s proprietary content or our own extensive library of primary sources.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="faq-line-2" className="c-line"></div>
              <div id="faq-acc-2">
                <div accordion="" className="accordion">
                  <div className="accordion_toggle">
                    <div className="c-text-2 cc-balance">How secure is my data with Brightwave?</div>
                    <div chevron-x="" className="c-svg-2 cc-20 w-embed"><svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg></div>
                    <input accordion-checkbox="" type="checkbox" className="accordion_checkbox" />
                  </div>
                  <div accordion="element" className="accordion_dropdown">
                    <div mask-height="element">
                      <div className="accordion_content">
                        <div className="c-text-4 w-richtext">
                          <p>Brightwave takes your data security seriously. Founded by engineers who build systems responsible for handling the world&apos;s most sensitive and mission-critical financial datasets, our platform is designed from the ground up to meet the stringent security and operational requirements of the most demanding enterprise clients.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="c-line"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
