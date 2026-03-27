'use client'

import { useState } from 'react'

/* ------------------------------------------------------------------ */
/*  Types & constants                                                  */
/* ------------------------------------------------------------------ */

interface CalcResults {
  hoursPerWeek: number
  hoursPerYear: number
  costSavings: number
  dealAcceleration: string
}

const FIRM_TYPES = [
  { label: 'Private Equity', value: 'pe', multiplier: 1.0 },
  { label: 'Venture Capital', value: 'vc', multiplier: 0.85 },
  { label: 'Hedge Fund', value: 'hf', multiplier: 1.1 },
  { label: 'Investment Bank', value: 'ib', multiplier: 0.95 },
  { label: 'Family Office', value: 'fo', multiplier: 0.75 },
]

const TEAM_SIZES = [
  { label: '1-5 analysts', value: 3, hours: 12 },
  { label: '6-15 analysts', value: 10, hours: 14 },
  { label: '16-30 analysts', value: 22, hours: 16 },
  { label: '30+ analysts', value: 40, hours: 18 },
]

const DEAL_ACTIVITY = [
  { label: '1-5 deals/year', value: 3 },
  { label: '6-15 deals/year', value: 10 },
  { label: '16-30 deals/year', value: 22 },
  { label: '30+ deals/year', value: 40 },
]

const STEP_TITLES = ['Firm Type', 'Team Size', 'Deal Activity', 'Results']

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function AbmRoiCalculator({ demoUrl }: { demoUrl: string }) {
  const [step, setStep] = useState(0)
  const [firmType, setFirmType] = useState<number | null>(null)
  const [teamSize, setTeamSize] = useState<number | null>(null)
  const [dealActivity, setDealActivity] = useState<number | null>(null)

  function calculate(): CalcResults | null {
    if (firmType === null || teamSize === null || dealActivity === null) return null
    const firm = FIRM_TYPES[firmType]
    const team = TEAM_SIZES[teamSize]
    const deals = DEAL_ACTIVITY[dealActivity]

    const hoursPerWeek = Math.round(team.hours * firm.multiplier * (deals.value / 10))
    const hoursPerYear = hoursPerWeek * 50
    const avgHourlyCost = 175
    const costSavings = hoursPerYear * avgHourlyCost * team.value
    const weeksSaved = Math.round(hoursPerYear / 40)

    return {
      hoursPerWeek,
      hoursPerYear,
      costSavings,
      dealAcceleration: `${weeksSaved} weeks`,
    }
  }

  function canAdvance(): boolean {
    if (step === 0) return firmType !== null
    if (step === 1) return teamSize !== null
    if (step === 2) return dealActivity !== null
    return false
  }

  function handleNext() {
    if (step < 3 && canAdvance()) setStep(step + 1)
  }

  function handleBack() {
    if (step > 0) setStep(step - 1)
  }

  const results = step === 3 ? calculate() : null

  return (
    <section className="c-section cc-abm-calc">
      <div className="c-container">
        <div className="bw-calc-wrapper">
          {/* Header */}
          <div
            className="bw-calc-header"
            style={{
              backgroundImage: 'url(/webflow-images/calc-header-bg.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              padding: '2.5rem 2rem',
              color: '#fff',
            }}
          >
            <h2 className="c-title-3" style={{ color: '#fff' }}>
              ROI Calculator
            </h2>
            <p className="c-text-4" style={{ color: 'rgba(255,255,255,.8)', marginTop: '.5rem' }}>
              See how much time and money Brightwave can save your team.
            </p>
          </div>

          {/* Step indicator */}
          <div
            style={{
              display: 'flex',
              gap: '0',
              borderBottom: '1px solid var(--lightmode--onsurface-border, #e5e5e5)',
            }}
          >
            {STEP_TITLES.map((title, i) => (
              <button
                key={i}
                onClick={() => {
                  if (i < step || (i === step)) return
                  if (i <= step) setStep(i)
                }}
                style={{
                  flex: 1,
                  padding: '.75rem 1rem',
                  fontSize: '.875rem',
                  fontWeight: i === step ? 700 : 500,
                  background: i === step ? 'var(--lightmode--surface-1, #f5f5f5)' : 'transparent',
                  borderBottom: i === step ? '2px solid var(--lightmode--onsurface, #0f0f0f)' : '2px solid transparent',
                  cursor: i <= step ? 'pointer' : 'default',
                  opacity: i <= step ? 1 : 0.4,
                  border: 'none',
                  borderBottomWidth: '2px',
                  borderBottomStyle: 'solid',
                  borderBottomColor: i === step ? 'var(--lightmode--onsurface, #0f0f0f)' : 'transparent',
                }}
              >
                {title}
              </button>
            ))}
          </div>

          {/* Step content */}
          <div style={{ padding: '2rem' }}>
            {step === 0 && (
              <div className="bw-calc-step">
                <h3 className="c-title-5" style={{ marginBottom: '1.5rem' }}>
                  What type of firm are you?
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
                  {FIRM_TYPES.map((ft, i) => (
                    <button
                      key={ft.value}
                      onClick={() => setFirmType(i)}
                      style={{
                        padding: '1rem 1.25rem',
                        borderRadius: '.25rem',
                        border: firmType === i ? '2px solid var(--lightmode--onsurface, #0f0f0f)' : '1px solid var(--lightmode--onsurface-border, #d9d9d9)',
                        background: firmType === i ? 'var(--lightmode--surface-1, #f5f5f5)' : '#fff',
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontWeight: firmType === i ? 600 : 400,
                        fontSize: '1rem',
                      }}
                    >
                      {ft.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="bw-calc-step">
                <h3 className="c-title-5" style={{ marginBottom: '1.5rem' }}>
                  How large is your research team?
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
                  {TEAM_SIZES.map((ts, i) => (
                    <button
                      key={ts.value}
                      onClick={() => setTeamSize(i)}
                      style={{
                        padding: '1rem 1.25rem',
                        borderRadius: '.25rem',
                        border: teamSize === i ? '2px solid var(--lightmode--onsurface, #0f0f0f)' : '1px solid var(--lightmode--onsurface-border, #d9d9d9)',
                        background: teamSize === i ? 'var(--lightmode--surface-1, #f5f5f5)' : '#fff',
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontWeight: teamSize === i ? 600 : 400,
                        fontSize: '1rem',
                      }}
                    >
                      {ts.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="bw-calc-step">
                <h3 className="c-title-5" style={{ marginBottom: '1.5rem' }}>
                  How many deals do you evaluate per year?
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
                  {DEAL_ACTIVITY.map((da, i) => (
                    <button
                      key={da.value}
                      onClick={() => setDealActivity(i)}
                      style={{
                        padding: '1rem 1.25rem',
                        borderRadius: '.25rem',
                        border: dealActivity === i ? '2px solid var(--lightmode--onsurface, #0f0f0f)' : '1px solid var(--lightmode--onsurface-border, #d9d9d9)',
                        background: dealActivity === i ? 'var(--lightmode--surface-1, #f5f5f5)' : '#fff',
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontWeight: dealActivity === i ? 600 : 400,
                        fontSize: '1rem',
                      }}
                    >
                      {da.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && results && (
              <div className="bw-calc-step">
                <h3 className="c-title-5" style={{ marginBottom: '1.5rem' }}>
                  Your Estimated Savings with Brightwave
                </h3>
                <div className="c-abm-temp-tl-item_dropdown-stats-block" style={{ marginTop: 0 }}>
                  <div className="c-abm-temp-tl-item_stats-item cc-yellow">
                    <div className="c-title-4">{results.hoursPerWeek}h</div>
                    <div className="c-text-6">Saved per week</div>
                  </div>
                  <div className="c-abm-temp-tl-item_stats-item cc-black">
                    <div className="c-title-4" style={{ color: 'var(--background, #fff)' }}>
                      {results.hoursPerYear.toLocaleString()}h
                    </div>
                    <div className="c-text-6" style={{ color: 'rgba(255,255,255,.7)' }}>Saved per year</div>
                  </div>
                  <div className="c-abm-temp-tl-item_stats-item cc-yellow">
                    <div className="c-title-4">
                      ${(results.costSavings / 1000).toFixed(0)}k
                    </div>
                    <div className="c-text-6">Annual cost savings</div>
                  </div>
                  <div className="c-abm-temp-tl-item_stats-item cc-white" style={{ border: '1px solid var(--lightmode--onsurface-border, #d9d9d9)' }}>
                    <div className="c-title-4">{results.dealAcceleration}</div>
                    <div className="c-text-6">Faster per deal</div>
                  </div>
                </div>
                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                  <a href={demoUrl} className="cta-p-sm w-inline-block" style={{ display: 'inline-flex' }}>
                    <div>
                      <div className="c-text-link cc-stagger-cta">See it in action</div>
                    </div>
                    <div className="flip-small"><div className="flip-bg" /></div>
                    <div className="flip-big">
                      <div className="svg cta-sm-arrow w-embed">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip_calc)">
                            <path d="M2.27832 1.625L12.3577 1.44906L12.5325 11.4643" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel" />
                            <path d="M12.3563 1.44945L1.48389 12.6365" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel" />
                          </g>
                          <defs><clipPath id="clip_calc"><rect width="12" height="11.9237" fill="white" transform="translate(0.896484 1.10547) rotate(-1)" /></clipPath></defs>
                        </svg>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            )}

            {/* Navigation */}
            {step < 3 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                <button
                  onClick={handleBack}
                  style={{
                    padding: '.75rem 1.5rem',
                    borderRadius: '.25rem',
                    border: '1px solid var(--lightmode--onsurface-border, #d9d9d9)',
                    background: 'transparent',
                    cursor: step > 0 ? 'pointer' : 'default',
                    opacity: step > 0 ? 1 : 0.3,
                    fontSize: '.875rem',
                    fontWeight: 500,
                  }}
                  disabled={step === 0}
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  style={{
                    padding: '.75rem 1.5rem',
                    borderRadius: '.25rem',
                    border: 'none',
                    background: canAdvance() ? 'var(--lightmode--onsurface, #0f0f0f)' : '#ccc',
                    color: '#fff',
                    cursor: canAdvance() ? 'pointer' : 'default',
                    fontSize: '.875rem',
                    fontWeight: 600,
                  }}
                  disabled={!canAdvance()}
                >
                  {step === 2 ? 'Calculate' : 'Next'}
                </button>
              </div>
            )}
            {step === 3 && (
              <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '1.5rem' }}>
                <button
                  onClick={() => { setStep(0); setFirmType(null); setTeamSize(null); setDealActivity(null) }}
                  style={{
                    padding: '.75rem 1.5rem',
                    borderRadius: '.25rem',
                    border: '1px solid var(--lightmode--onsurface-border, #d9d9d9)',
                    background: 'transparent',
                    cursor: 'pointer',
                    fontSize: '.875rem',
                    fontWeight: 500,
                  }}
                >
                  Start Over
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
