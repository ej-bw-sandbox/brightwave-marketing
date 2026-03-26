import Link from 'next/link'
import { LottiePlayer } from '@/components/ui/LottiePlayer'

export function StepCtaSection() {
  return (
    <section className="c-section">
      <div className="c-container">
        <div className="titles">
          <div className="title_flex">
            <div className="c-title-cta">Step</div>
            <div className="c-title-cta cc-grey">Into</div>
          </div>
          <div className="title_flex">
            <div className="c-title-cta cc-grey">THe</div>
            <div className="spacer"></div>
            <div className="c-title-cta">Future</div>
            <div className="c-title-cta cc-grey">OF</div>
          </div>
          <div className="title_flex cc-financial">
            <div className="spacer cc-financial"></div>
            <div>
              <div className="c-title-cta">FiNANCIAL</div>
            </div>
          </div>
          <div className="title_flex cc-stetch">
            <div className="c-title-cta">Research</div>
          </div>
          <div className="cta-step">
            <Link href="/contact" className="cta-p-big w-inline-block">
              <div className="cta-p-big_top">
                <div className="c-text-link cc-stagger-cta">Schedule a Trial</div>
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
              <LottiePlayer src="/webflow-documents/Arrow-Lottie.json" className="cta-p-big_arrows cc-lotti" />
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 35 33" fill="none" className="cta-p-big_arrows">
                <rect width="4.52527" height="4.49649" transform="matrix(1 8.74228e-08 8.74228e-08 -1 30.0078 32.5312)" fill="currentColor"></rect>
                <g clipPath="url(#clip0_913_4549b)">
                  <path d="M3.34961 20.228L21.2115 20.228L21.2115 2.47975" stroke="currentColor" strokeWidth="1.92707" strokeLinejoin="bevel"></path>
                  <path d="M21.2099 20.228L1.60254 0.745389" stroke="currentColor" strokeWidth="1.92707" strokeLinejoin="bevel"></path>
                </g>
                <defs>
                  <clipPath id="clip0_913_4549b">
                    <rect width="21.2623" height="21.1271" fill="currentColor" transform="matrix(1 8.74228e-08 8.74228e-08 -1 0.917969 21.1914)"></rect>
                  </clipPath>
                </defs>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
