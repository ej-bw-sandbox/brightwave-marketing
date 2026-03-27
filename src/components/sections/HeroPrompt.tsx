'use client'

import { useState, useEffect, useCallback } from 'react'

interface PopupOverlayProps {
  isOpen: boolean
  onClose: () => void
}

function PopupOverlay({ isOpen, onClose }: PopupOverlayProps) {
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div id="paywall" className="paywall" style={{ display: 'block', position: 'fixed', inset: 0, zIndex: 9999 }}>
      <div id="overlay" className="popup-overlay" style={{ display: 'flex' }} onClick={onClose}></div>
      <div id="popup" className="sandbox-pop-up" style={{ display: 'flex' }}>
        <div className="div-block-40">
          <img
            src="/webflow-images/private-markets.png"
            loading="lazy"
            alt="brightwave private markets logo"
            className="image-5"
          />
          <div className="div-block-38">
            <h1 className="heading-10">Start Your 7-Day Free Trial to Continue Exploring</h1>
          </div>
          <div>
            <div className="text-block-17">
              The professional-grade research partner built to the requirements of Private Markets professionals.<br />
            </div>
          </div>
          <div className="div-block-45">
            <a
              id="paywall-cta-btn"
              stagger-cta=""
              href="https://app.brightwave.io/register?type=individual"
              className="paywall-cta w-inline-block"
            >
              <div>
                <div stagger-cta-text="dark" className="c-text-link cc-stagger-cta">Start My Free Trial</div>
              </div>
              <div className="flip-small">
                <div className="flip-bg"></div>
              </div>
              <div className="flip-big">
                <div className="svg cta-sm-arrow w-embed">
                  <svg width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_774_4073_popup)">
                      <path d="M2.27832 1.625L12.3577 1.44906L12.5325 11.4643" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel"></path>
                      <path d="M12.3563 1.44945L1.48389 12.6365" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel"></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_774_4073_popup">
                        <rect width={12} height="11.9237" fill="white" transform="translate(0.896484 1.10547) rotate(-1)"></rect>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
            </a>
          </div>
          <div className="div-block-39">
            <div className="div-block-42">
              <div className="code-embed-6 w-embed">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                  <line x1="2" x2="22" y1="10" y2="10"></line>
                </svg>
              </div>
            </div>
            <div><div>No Credit Card Required.</div></div>
          </div>
        </div>
        <div className="div-block-41">
          <img
            src="/webflow-images/New-thank-you-contact_1New thank you contact.avif"
            loading="lazy"
            alt="Brightwave mosaic accent"
            className="image-6"
          />
        </div>
      </div>
    </div>
  )
}

export default function HeroPrompt() {
  const [popupOpen, setPopupOpen] = useState(false)

  const openPopup = useCallback(() => setPopupOpen(true), [])
  const closePopup = useCallback(() => setPopupOpen(false), [])

  return (
    <>
      <div className="div-block-48">
        <div className="prompt-entry-wrapper">
          <div className="prompt-wrapper">
            <textarea
              placeholder="What can I do for you?"
              className="prompt-text-field"
            />
            <div className="prompt-cta-wrapper">
              <div className="prompt-actions-wrapper">
                <div className="attachments-button-wrapper trigger-popup" onClick={openPopup} role="button" tabIndex={0}>
                  <div className="attachements-icon w-embed">
                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551" />
                    </svg>
                  </div>
                  <div className="attachments-button-text">Attachments</div>
                </div>
                <div className="tools-button-wrapper trigger-popup" onClick={openPopup} role="button" tabIndex={0}>
                  <div className="tools-icon w-embed">
                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 5H3" /><path d="M12 19H3" /><path d="M14 3v4" /><path d="M16 17v4" />
                      <path d="M21 12h-9" /><path d="M21 19h-5" /><path d="M21 5h-7" /><path d="M8 10v4" /><path d="M8 12H3" />
                    </svg>
                  </div>
                  <div className="tools-button-text">Tools</div>
                  <div className="tools-menu-wrapper">
                    <div className="tools-item-wrapper trigger-popup" onClick={openPopup} role="button" tabIndex={0}>
                      <div className="tools-icon-wrapper">
                        <div className="tools-blueprint-icon w-embed">
                          <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 18h-5" /><path d="M18 14h-8" />
                            <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2" />
                            <rect width={8} height={4} x="10" y="6" rx="1" />
                          </svg>
                        </div>
                      </div>
                      <div className="tools-content-wrapper">
                        <div className="tools-content-header-wrapper"><strong className="tools-content-header">Create report from blueprint</strong></div>
                        <div className="tools-content-body">Select a previously saved blueprint to create a new report based on the sources of this project.</div>
                      </div>
                    </div>
                    <div className="tools-item-wrapper trigger-popup" onClick={openPopup} role="button" tabIndex={0}>
                      <div className="tools-icon-wrapper">
                        <div className="tools-blueprint-icon w-embed">
                          <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
                            <path d="M8 11h8" /><path d="M8 7h6" />
                          </svg>
                        </div>
                      </div>
                      <div className="tools-content-wrapper">
                        <div className="tools-content-header-wrapper"><strong className="tools-content-header">Create a new report</strong></div>
                        <div className="tools-content-body">Create a new report from scratch.</div>
                      </div>
                    </div>
                    <div className="tools-item-wrapper trigger-popup" onClick={openPopup} role="button" tabIndex={0}>
                      <div className="tools-icon-wrapper">
                        <div className="tools-blueprint-icon w-embed">
                          <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width={18} height={18} x="3" y="3" rx="2" />
                            <path d="M3 9h18" /><path d="M3 15h18" /><path d="M9 3v18" /><path d="M15 3v18" />
                          </svg>
                        </div>
                      </div>
                      <div className="tools-content-wrapper">
                        <div className="tools-content-header-wrapper"><strong className="tools-content-header">Extract data with a grid view.</strong></div>
                        <div className="tools-content-body">Extract structured data from across each of your sources.</div>
                      </div>
                    </div>
                    <div className="trigger-popup tools-item-wrapper" onClick={openPopup} role="button" tabIndex={0}>
                      <div className="tools-icon-wrapper">
                        <div className="tools-blueprint-icon w-embed">
                          <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                            <path d="M2 12h20" />
                          </svg>
                        </div>
                      </div>
                      <div className="tools-content-wrapper">
                        <div className="tools-content-header-wrapper"><strong className="tools-content-header">Web Search</strong></div>
                        <div className="tools-content-body">Searching the internet for current information.</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="prompt-button-wrapper trigger-popup" onClick={openPopup} role="button" tabIndex={0}>
                  <div className="tools-icon w-embed">
                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
                    </svg>
                  </div>
                  <div className="action-button-text">Prompts</div>
                  <div className="prompts-menu-wrapper">
                    <div className="prompt-menu-list-wrapper">
                      <div className="div-block-27">
                        <div>
                          <div className="text-block-14"><strong className="bold-text-15">Ask questions</strong></div>
                        </div>
                        <ul role="list" className="list w-list-unstyled">
                          <li className="list-item trigger-popup" onClick={openPopup}>From the attached documents, <strong>produce a structured inventory by doc type with 1-2 line summaries per file</strong>, identify obvious gaps, and propose a prioritized reading plan (Top 10 first).</li>
                          <li className="list-item trigger-popup" onClick={openPopup}>Based on the attached CIM/deck(s), <strong>create a one-page tear sheet</strong>: business summary, revenue model, customers, growth drivers, key metrics, moats, 5-7 diligence red flags.</li>
                          <li className="list-item trigger-popup" onClick={openPopup}>From the attached docs, <strong>reconstruct a dated timeline (founding to latest), equity rounds, investors, and debt instruments</strong> with amounts, terms, and current cap stack.</li>
                          <li className="list-item trigger-popup" onClick={openPopup}>For each attached contract, <strong>extract: change-of-control, exclusivity, liability caps, auto-renewal, indemnity</strong>. Populate one row per contract with clause text and a short risk note.</li>
                          <li className="list-item trigger-popup" onClick={openPopup}><strong>Extract SLO/SLA commitments</strong> (uptime, response/restore times, credits, carve-outs, exclusions) and <strong>note any onerous terms</strong> or asymmetries.</li>
                          <li className="list-item trigger-popup" onClick={openPopup}><strong>Identify related-party references</strong>, MFN triggers, unusual fee/most-favored terms. Provide clause text, counterparty, and <strong>potential impact</strong>.</li>
                          <li className="list-item trigger-popup" onClick={openPopup}>From the attachments, <strong>explain working capital normalization adjustments, seasonality, and one-offs</strong>. Separate documented facts from assumptions.</li>
                          <li className="list-item trigger-popup" onClick={openPopup}><strong>Summarize stated revenue recognition policies</strong> in the attachments and <strong>note any misalignments</strong> with contract terms that could affect ARR/GAAP revenue.</li>
                          <li className="list-item trigger-popup" onClick={openPopup}><strong>Assess ARR quality</strong> (new vs. expansion vs. churn), retention/cohort behavior, and deal-level risks if visible in attachments.</li>
                          <li className="list-item trigger-popup" onClick={openPopup}><strong>Summarize known litigation/IP matters</strong> found in the attachments with status, jurisdiction, and potential exposure.</li>
                          <li className="list-item trigger-popup" onClick={openPopup}>From attached docs, <strong>map key suppliers and customers,</strong> note single-source dependencies, and any SLAs/Penalties tied to them.</li>
                          <li className="list-item trigger-popup" onClick={openPopup}><strong>Draft an investment memo</strong> using only the attachments: Executive Summary; Market/Competition; Business Model & Unit Econ; Financials & KPIs; Management; Risks/Mitigations; Open Questions.</li>
                        </ul>
                      </div>
                      <div className="div-block-29">
                        <div className="div-block-30 trigger-popup" onClick={openPopup} role="button" tabIndex={0}>
                          <div className="w-embed">
                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="m15 18-6-6 6-6" />
                            </svg>
                          </div>
                          <div className="code-embed-4 w-embed">
                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="m21 21-4.34-4.34" />
                              <circle cx="11" cy="11" r="8" />
                            </svg>
                          </div>
                        </div>
                        <textarea placeholder="Search prompts..." className="textarea-3" readOnly />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="div-block-49">
                <div className="cta-button-home trigger-popup" onClick={openPopup} role="button" tabIndex={0}>
                  <div className="cta-botton-arrow w-embed">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 7h10v10" />
                      <path d="M7 17 17 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PopupOverlay isOpen={popupOpen} onClose={closePopup} />
    </>
  )
}
