'use client'

import { useState, useRef } from 'react'

interface CalcData {
  firmType: string
  teamSize: number
  platformDeals: number
  addonDeals: number
  juniorRate: number
  seniorRate: number
}

const CALC_CSS = `
  .bw-calc-wrapper {
    width: 100%;
    max-width: 62.1rem;
    margin: 0 auto;
    background: #ffffff;
    border-radius: 1rem;
    overflow: hidden;
    border: 1px solid #000000;
  }
  .bw-calc-header .c-text-4 {
    opacity: 0.75;
  }
  .bw-calc-header {
    background: black url('/webflow-images/calc-header-bg.png')
      no-repeat top right;
    background-size: contain;
    color: white;
    padding: 2.375rem 2rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    align-items: flex-start;
  }
  .bw-calc-content {
    padding: 2rem;
  }
  .bw-calc-step {
    display: none;
    max-width: 49rem;
    margin-right: auto;
    margin-left: auto;
    animation: bw-fadeInUp 0.4s ease;
  }
  .bw-calc-step.bw-active {
    display: block;
  }
  @keyframes bw-fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .bw-calc-radio-group {
    display: grid;
    gap: 12px;
    margin-top: 1.5rem;
  }
  .bw-calc-progress {
    display: flex;
    gap: 8px;
    margin-bottom: 2.5rem;
  }
  .bw-calc-progress-dot {
    flex: 1;
    height: 8px;
    background: #e5e7eb;
    border-radius: 2px;
    transition: background 0.3s;
  }
  .bw-calc-progress-dot.bw-complete {
    background: #E7E70D;
  }
  .bw-calc-step-title {
    font-size: 2.25rem;
    line-height: 1.1;
    font-weight: 700;
    color: #0a0a0a;
    margin-bottom: 1.5rem;
  }
  .bw-calc-input-group {
    margin-bottom: 24px;
  }
  .bw-calc-label {
    display: block;
    font-size: 1rem;
    font-weight: 400;
    margin-bottom: 8px;
  }
  .bw-calc-input {
    width: 100%;
    padding: 0px 8px;
    font-size: 1rem;
    border-bottom: 1px solid black;
    border-right: none;
    border-left: none;
    border-top: none;
    transition: border-color 0.4s;
    height: 48px;
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
  }
  .bw-calc-input:focus {
    outline: none;
    border-color: black;
  }
  .bw-calc-radio-option {
    position: relative;
    padding: 0.88rem 1.25rem;
    border: 2px solid transparent;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.4s;
    background: #EFF1F5;
  }
  .bw-calc-radio-option:hover {
    border-color: #0F0F0F;
  }
  .bw-calc-radio-option.bw-selected {
    border-color: black;
  }
  .bw-calc-radio-option input[type="radio"] {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }
  .bw-calc-radio-content {
    display: flex;
    align-items: center;
    gap: 12px;
    font-weight: 700;
    color: #0F0F0F;
    transition: color 0.4s;
    font-size: 1.125rem;
  }
  .bw-calc-radio-check {
    width: 20px;
    height: 20px;
    border: 1px solid #d1d5db;
    border-radius: 50%;
    position: absolute;
    right: 1.69rem;
    transition: all 0.2s;
    flex-shrink: 0;
  }
  .bw-calc-radio-option.bw-selected .bw-calc-radio-check {
    background: white;
    border-color: black;
  }
  .bw-calc-radio-check::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 14px;
    height: 14px;
    background: black;
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.4s;
  }
  .bw-calc-radio-option.bw-selected .bw-calc-radio-check::after {
    opacity: 1;
  }
  .bw-calc-buttons {
    display: flex;
    gap: 12px;
    margin-top: 32px;
  }
  .bw-calc-cta-btn {
    position: relative;
    flex: 1;
    padding: 2rem 2.5rem 0.62rem 0.62rem;
    font-size: 1rem;
    font-weight: 700;
    border: none;
    cursor: pointer;
    transition: all 0.4s;
    text-align: left;
    background: #E7E70D;
    color: black;
    margin-top: 2rem;
    display: block;
    text-decoration: none;
  }
  .bw-calc-cta-btn::after {
    content: "";
    position: absolute;
    width: 0.5rem;
    height: 0.5rem;
    top: 0.62rem;
    right: 0.62rem;
    background-color: currentColor;
  }
  .bw-calc-btn {
    position: relative;
    flex: 1;
    padding: 2rem 0.62rem 0.62rem 0.62rem;
    font-size: 1rem;
    font-weight: 700;
    border: none;
    cursor: pointer;
    transition: all 0.4s;
    text-align: left;
  }
  .bw-calc-btn::after {
    content: "";
    position: absolute;
    width: 0.5rem;
    height: 0.5rem;
    top: 0.62rem;
    right: 0.62rem;
    background-color: currentColor;
  }
  .bw-calc-btn-primary {
    background: #E7E70D;
    color: black;
  }
  .bw-calc-btn-secondary {
    background: white;
    color: black;
    border: 1px solid black;
  }
  .bw-calc-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .bw-calc-results {
    background: black;
    color: white;
    padding: 2.5rem;
    border-radius: 12px;
    margin-top: 32px;
  }
  .bw-calc-results-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 24px;
    text-align: center;
  }
  .bw-calc-metric {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    padding: 24px;
    border-radius: 12px;
    margin-bottom: 16px;
  }
  .bw-calc-metric-label {
    font-size: 0.875rem;
    opacity: 0.9;
    margin-bottom: 8px;
  }
  .bw-calc-metric-value {
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 1;
  }
  .bw-calc-metric-subvalue {
    font-size: 1rem;
    opacity: 0.9;
    margin-top: 4px;
  }
  .bw-calc-breakdown {
    background: rgba(255, 255, 255, 0.1);
    padding: 20px;
    border-radius: 8px;
    margin-top: 24px;
  }
  .bw-calc-breakdown-title {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 16px;
  }
  .bw-calc-breakdown-item {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  .bw-calc-breakdown-item:last-child {
    border-bottom: none;
  }
  .bw-calc-cta {
    text-align: center;
    margin-top: 32px;
  }
  .bw-calc-help-text {
    font-size: 1rem;
    color: black;
    margin-top: 4px;
    opacity: 0.75;
    font-weight: 400;
  }
`

const FIRM_TYPES = [
  { value: 'mega', label: 'Mega Fund', help: '$10B+ AUM' },
  { value: 'large', label: 'Large Fund', help: '$1B-$10B AUM' },
  { value: 'middle', label: 'Middle Market', help: '$500M-$1B AUM' },
  { value: 'lower', label: 'Lower Middle Market', help: '$100M-$500M AUM' },
]

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function RoiCalculator() {
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState<Partial<CalcData>>({})
  const [name, setName] = useState('')
  const [businessEmail, setBusinessEmail] = useState('')
  const [results, setResults] = useState<{
    totalCostSavings: number
    totalHoursSaved: number
    fteEquivalent: number
    weeksCompressed: number
    additionalDealsCapacity: number
    totalPlatformHours: number
    totalAddonHours: number
    platformDeals: number
    addonDeals: number
  } | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  const nextStep = () => {
    setCurrentStep((s) => s + 1)
  }

  const prevStep = () => {
    setCurrentStep((s) => s - 1)
  }

  const selectFirm = (value: string) => {
    setData((d) => ({ ...d, firmType: value }))
  }

  const calculate = () => {
    const juniorRate = data.juniorRate ?? 200
    const seniorRate = data.seniorRate ?? 400
    const platformDeals = data.platformDeals ?? 0
    const addonDeals = data.addonDeals ?? 0

    const hoursPerPlatformDeal = 420
    const hoursPerAddonDeal = 180
    const totalPlatformHours = platformDeals * hoursPerPlatformDeal
    const totalAddonHours = addonDeals * hoursPerAddonDeal
    const totalHoursSaved = totalPlatformHours + totalAddonHours

    const juniorHours = totalHoursSaved * 0.7
    const seniorHours = totalHoursSaved * 0.3
    const juniorCostSavings = juniorHours * juniorRate
    const seniorCostSavings = seniorHours * seniorRate
    const totalCostSavings = juniorCostSavings + seniorCostSavings

    const fteEquivalent = totalHoursSaved / 2000
    const weeksCompressed = platformDeals * 2.5
    const additionalDealsCapacity = Math.floor(totalHoursSaved / 400)

    setResults({
      totalCostSavings,
      totalHoursSaved,
      fteEquivalent,
      weeksCompressed,
      additionalDealsCapacity,
      totalPlatformHours,
      totalAddonHours,
      platformDeals,
      addonDeals,
    })

    // Move to step 6 to show results
    setCurrentStep(6)

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }, 100)
  }

  const formatCurrency = (v: number) =>
    v >= 1000000
      ? `$${(v / 1000000).toFixed(1)}M`
      : `$${(v / 1000).toFixed(0)}K`

  const isStep1Valid = !!data.firmType
  const isStep2Valid = !!data.teamSize && data.teamSize >= 1
  const isStep3Valid = !!data.platformDeals && data.platformDeals >= 1
  const isStep4Valid =
    !!data.juniorRate &&
    !!data.seniorRate &&
    data.juniorRate >= 50 &&
    data.seniorRate >= 100
  const isStep5Valid = name.trim().length > 0 && isValidEmail(businessEmail)

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CALC_CSS }} />
      <div className="bw-calc-wrapper">
        <div className="bw-calc-header">
          <h2 className="c-title-3">See How Much</h2>
        </div>
        <div className="bw-calc-content">
          <div className="bw-calc-progress">
            <div className={`bw-calc-progress-dot${currentStep >= 1 ? ' bw-complete' : ''}`} />
            <div className={`bw-calc-progress-dot${currentStep >= 2 ? ' bw-complete' : ''}`} />
            <div className={`bw-calc-progress-dot${currentStep >= 3 ? ' bw-complete' : ''}`} />
            <div className={`bw-calc-progress-dot${currentStep >= 4 ? ' bw-complete' : ''}`} />
            <div className={`bw-calc-progress-dot${currentStep >= 5 ? ' bw-complete' : ''}`} />
          </div>

          {/* Step 1: Firm Type */}
          <div className={`bw-calc-step${currentStep === 1 ? ' bw-active' : ''}`}>
            <h3 className="c-title-4">What type of firm are you?</h3>
            <div className="bw-calc-radio-group">
              {FIRM_TYPES.map((ft) => (
                <label
                  key={ft.value}
                  className={`bw-calc-radio-option${data.firmType === ft.value ? ' bw-selected' : ''}`}
                  onClick={() => selectFirm(ft.value)}
                >
                  <input
                    type="radio"
                    name="firmType"
                    value={ft.value}
                    checked={data.firmType === ft.value}
                    readOnly
                  />
                  <div className="bw-calc-radio-content">
                    <div className="bw-calc-radio-check" />
                    <div>
                      <div>{ft.label}</div>
                      <div className="bw-calc-help-text">{ft.help}</div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
            <div className="bw-calc-buttons">
              <button
                className="bw-calc-btn bw-calc-btn-primary"
                onClick={nextStep}
                disabled={!isStep1Valid}
              >
                Next
              </button>
            </div>
          </div>

          {/* Step 2: Team Size */}
          <div className={`bw-calc-step${currentStep === 2 ? ' bw-active' : ''}`}>
            <h3 className="bw-calc-step-title">How many investment professionals on your team?</h3>
            <div className="bw-calc-input-group">
              <label className="bw-calc-label">Number of investment professionals</label>
              <input
                type="number"
                className="bw-calc-input"
                min={1}
                max={500}
                placeholder="e.g., 15"
                value={data.teamSize ?? ''}
                onChange={(e) =>
                  setData((d) => ({ ...d, teamSize: parseInt(e.target.value) || 0 }))
                }
              />
              <p className="bw-calc-help-text">
                Include partners, principals, VPs, associates, and analysts
              </p>
            </div>
            <div className="bw-calc-buttons">
              <button className="bw-calc-btn bw-calc-btn-secondary" onClick={prevStep}>
                Back
              </button>
              <button
                className="bw-calc-btn bw-calc-btn-primary"
                onClick={nextStep}
                disabled={!isStep2Valid}
              >
                Next
              </button>
            </div>
          </div>

          {/* Step 3: Deal Volume */}
          <div className={`bw-calc-step${currentStep === 3 ? ' bw-active' : ''}`}>
            <h3 className="bw-calc-step-title">What&apos;s your annual deal activity?</h3>
            <div className="bw-calc-input-group">
              <label className="bw-calc-label">Platform deals closed per year</label>
              <input
                type="number"
                className="bw-calc-input"
                min={1}
                max={100}
                placeholder="e.g., 5"
                value={data.platformDeals ?? ''}
                onChange={(e) =>
                  setData((d) => ({ ...d, platformDeals: parseInt(e.target.value) || 0 }))
                }
              />
            </div>
            <div className="bw-calc-input-group">
              <label className="bw-calc-label">Add-on acquisitions per year</label>
              <input
                type="number"
                className="bw-calc-input"
                min={0}
                max={200}
                placeholder="e.g., 8"
                value={data.addonDeals ?? ''}
                onChange={(e) =>
                  setData((d) => ({ ...d, addonDeals: parseInt(e.target.value) || 0 }))
                }
              />
            </div>
            <div className="bw-calc-buttons">
              <button className="bw-calc-btn bw-calc-btn-secondary" onClick={prevStep}>
                Back
              </button>
              <button
                className="bw-calc-btn bw-calc-btn-primary"
                onClick={nextStep}
                disabled={!isStep3Valid}
              >
                Next
              </button>
            </div>
          </div>

          {/* Step 4: Labor Costs */}
          <div className={`bw-calc-step${currentStep === 4 ? ' bw-active' : ''}`}>
            <h3 className="bw-calc-step-title">What are your average labor costs?</h3>
            <div className="bw-calc-input-group">
              <label className="bw-calc-label">Average hourly rate (junior staff)</label>
              <div style={{ position: 'relative' }}>
                <span
                  style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#6b7280',
                    fontSize: '1rem',
                  }}
                >
                  $
                </span>
                <input
                  type="number"
                  className="bw-calc-input"
                  min={50}
                  max={500}
                  placeholder="200"
                  value={data.juniorRate ?? ''}
                  onChange={(e) =>
                    setData((d) => ({ ...d, juniorRate: parseInt(e.target.value) || 0 }))
                  }
                  style={{ paddingLeft: '32px' }}
                />
              </div>
              <p className="bw-calc-help-text">
                Associates and analysts - typical range $150-250/hr
              </p>
            </div>
            <div className="bw-calc-input-group">
              <label className="bw-calc-label">Average hourly rate (senior staff)</label>
              <div style={{ position: 'relative' }}>
                <span
                  style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#6b7280',
                    fontSize: '1rem',
                  }}
                >
                  $
                </span>
                <input
                  type="number"
                  className="bw-calc-input"
                  min={100}
                  max={1000}
                  placeholder="400"
                  value={data.seniorRate ?? ''}
                  onChange={(e) =>
                    setData((d) => ({ ...d, seniorRate: parseInt(e.target.value) || 0 }))
                  }
                  style={{ paddingLeft: '32px' }}
                />
              </div>
              <p className="bw-calc-help-text">
                VPs and principals - typical range $300-500/hr
              </p>
            </div>
            <div className="bw-calc-buttons">
              <button className="bw-calc-btn bw-calc-btn-secondary" onClick={prevStep}>
                Back
              </button>
              <button
                className="bw-calc-btn bw-calc-btn-primary"
                onClick={nextStep}
                disabled={!isStep4Valid}
              >
                Next
              </button>
            </div>
          </div>

          {/* Step 5: Email Capture */}
          <div className={`bw-calc-step${currentStep === 5 ? ' bw-active' : ''}`}>
            <h3 className="bw-calc-step-title">Where should we send the impact report?</h3>
            <div className="bw-calc-input-group">
              <label className="bw-calc-label">Name</label>
              <input
                type="text"
                className="bw-calc-input"
                placeholder="Jane Smith"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="bw-calc-input-group">
              <label className="bw-calc-label">Business email</label>
              <input
                type="email"
                className="bw-calc-input"
                placeholder="name@company.com"
                value={businessEmail}
                onChange={(e) => setBusinessEmail(e.target.value)}
              />
            </div>
            <div className="bw-calc-buttons">
              <button className="bw-calc-btn bw-calc-btn-secondary" onClick={prevStep}>
                Back
              </button>
              <button
                className="bw-calc-btn bw-calc-btn-primary"
                onClick={calculate}
                disabled={!isStep5Valid}
              >
                Calculate ROI
              </button>
            </div>
          </div>

          {/* Results */}
          {results && currentStep === 6 && (
            <div ref={resultsRef}>
              <div className="bw-calc-results">
                <h3 className="bw-calc-results-title">Your Brightwave Impact</h3>
                <div className="bw-calc-metric">
                  <div className="bw-calc-metric-label">Annual Cost Savings</div>
                  <div className="bw-calc-metric-value">
                    {formatCurrency(results.totalCostSavings)}
                  </div>
                  <div className="bw-calc-metric-subvalue">in labor costs per year</div>
                </div>
                <div className="bw-calc-metric">
                  <div className="bw-calc-metric-label">Time Saved</div>
                  <div className="bw-calc-metric-value">
                    {results.totalHoursSaved.toLocaleString()}
                  </div>
                  <div className="bw-calc-metric-subvalue">
                    hours per year ({results.fteEquivalent.toFixed(1)} FTE equivalent)
                  </div>
                </div>
                <div className="bw-calc-metric">
                  <div className="bw-calc-metric-label">Deal Velocity</div>
                  <div className="bw-calc-metric-value">
                    {results.weeksCompressed.toFixed(0)}
                  </div>
                  <div className="bw-calc-metric-subvalue">
                    weeks compressed across your deal pipeline
                  </div>
                </div>
                <div className="bw-calc-metric">
                  <div className="bw-calc-metric-label">Additional Capacity</div>
                  <div className="bw-calc-metric-value">
                    {results.additionalDealsCapacity}
                  </div>
                  <div className="bw-calc-metric-subvalue">
                    more deals your team could evaluate per year
                  </div>
                </div>
                <div className="bw-calc-breakdown">
                  <div className="bw-calc-breakdown-title">Time Savings Breakdown</div>
                  <div className="bw-calc-breakdown-item">
                    <span>Platform Deals ({results.platformDeals})</span>
                    <span>{results.totalPlatformHours.toLocaleString()} hrs</span>
                  </div>
                  <div className="bw-calc-breakdown-item">
                    <span>Add-on Deals ({results.addonDeals})</span>
                    <span>{results.totalAddonHours.toLocaleString()} hrs</span>
                  </div>
                  <div className="bw-calc-breakdown-item">
                    <span>
                      <strong>Total Annual Savings</strong>
                    </span>
                    <span>
                      <strong>{results.totalHoursSaved.toLocaleString()} hrs</strong>
                    </span>
                  </div>
                </div>
                <div className="bw-calc-cta">
                  <a
                    href="https://calendly.com/d/cv37-bhv-664/brightwave-trial"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bw-calc-cta-btn"
                  >
                    Schedule a Demo
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
