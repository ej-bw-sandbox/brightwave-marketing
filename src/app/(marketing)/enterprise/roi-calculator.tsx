'use client'

import { useState, useCallback } from 'react'

type FirmType = 'mega' | 'large' | 'middle' | 'lower'

interface CalcData {
  firmType: FirmType | null
  teamSize: number
  platformDeals: number
  addonDeals: number
  juniorRate: number
  seniorRate: number
}

const firmOptions: { value: FirmType; label: string; sub: string }[] = [
  { value: 'mega', label: 'Mega Fund', sub: '$10B+ AUM' },
  { value: 'large', label: 'Large Fund', sub: '$1B-$10B AUM' },
  { value: 'middle', label: 'Middle Market', sub: '$500M-$1B AUM' },
  { value: 'lower', label: 'Lower Middle Market', sub: '$100M-$500M AUM' },
]

function formatCurrency(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`
  return `$${(value / 1_000).toFixed(0)}K`
}

export function RoiCalculator() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<CalcData>({
    firmType: null,
    teamSize: 0,
    platformDeals: 0,
    addonDeals: 0,
    juniorRate: 0,
    seniorRate: 0,
  })
  const [results, setResults] = useState<{
    totalCostSavings: number
    totalHoursSaved: number
    fteEquivalent: number
    weeksCompressed: number
    additionalDealsCapacity: number
    totalPlatformHours: number
    totalAddonHours: number
  } | null>(null)

  const nextStep = useCallback(() => {
    setStep((s) => s + 1)
  }, [])

  const prevStep = useCallback(() => {
    setStep((s) => s - 1)
  }, [])

  const calculate = useCallback(() => {
    const hoursPerPlatformDeal = 420
    const hoursPerAddonDeal = 180
    const totalPlatformHours = data.platformDeals * hoursPerPlatformDeal
    const totalAddonHours = data.addonDeals * hoursPerAddonDeal
    const totalHoursSaved = totalPlatformHours + totalAddonHours

    const juniorHours = totalHoursSaved * 0.7
    const seniorHours = totalHoursSaved * 0.3
    const totalCostSavings =
      juniorHours * data.juniorRate + seniorHours * data.seniorRate

    const fteEquivalent = totalHoursSaved / 2000
    const weeksCompressed = data.platformDeals * 2.5
    const additionalDealsCapacity = Math.floor(totalHoursSaved / 400)

    setResults({
      totalCostSavings,
      totalHoursSaved,
      fteEquivalent,
      weeksCompressed,
      additionalDealsCapacity,
      totalPlatformHours,
      totalAddonHours,
    })
  }, [data])

  const canProceedStep1 = data.firmType !== null
  const canProceedStep2 = data.teamSize >= 1
  const canProceedStep3 = data.platformDeals >= 1
  const canProceedStep4 = data.juniorRate >= 50 && data.seniorRate >= 100

  return (
    <div className="bw-calc-wrapper">
      <div className="bw-calc-header">
        <h2 className="c-title-3">Brightwave ROI Calculator</h2>
        <p className="c-text-4">
          See how much time and money your firm could save
        </p>
      </div>
      <div className="bw-calc-content">
        {/* Progress */}
        <div className="bw-calc-progress">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`bw-calc-progress-dot${i <= step ? ' bw-complete' : ''}`}
            />
          ))}
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div className="bw-calc-step bw-active">
            <h3 className="c-title-4">What type of firm are you?</h3>
            <div className="bw-calc-radio-group">
              {firmOptions.map((opt) => (
                <label
                  key={opt.value}
                  className={`bw-calc-radio-option${data.firmType === opt.value ? ' bw-selected' : ''}`}
                  onClick={() => setData((d) => ({ ...d, firmType: opt.value }))}
                >
                  <input
                    type="radio"
                    name="firmType"
                    value={opt.value}
                    checked={data.firmType === opt.value}
                    readOnly
                  />
                  <div className="bw-calc-radio-content">
                    <div className="bw-calc-radio-check" />
                    <div>
                      <div>{opt.label}</div>
                      <div className="bw-calc-help-text">{opt.sub}</div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
            <div className="bw-calc-buttons">
              <button
                className="bw-calc-btn bw-calc-btn-primary"
                disabled={!canProceedStep1}
                onClick={nextStep}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="bw-calc-step bw-active">
            <h3 className="bw-calc-step-title">
              How many investment professionals on your team?
            </h3>
            <div className="bw-calc-input-group">
              <label className="bw-calc-label">
                Number of investment professionals
              </label>
              <input
                type="number"
                className="bw-calc-input"
                min={1}
                max={500}
                placeholder="e.g., 15"
                value={data.teamSize || ''}
                onChange={(e) =>
                  setData((d) => ({
                    ...d,
                    teamSize: parseInt(e.target.value) || 0,
                  }))
                }
              />
              <p className="bw-calc-help-text">
                Include partners, principals, VPs, associates, and analysts
              </p>
            </div>
            <div className="bw-calc-buttons">
              <button
                className="bw-calc-btn bw-calc-btn-secondary"
                onClick={prevStep}
              >
                Back
              </button>
              <button
                className="bw-calc-btn bw-calc-btn-primary"
                disabled={!canProceedStep2}
                onClick={nextStep}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="bw-calc-step bw-active">
            <h3 className="bw-calc-step-title">
              What&apos;s your annual deal activity?
            </h3>
            <div className="bw-calc-input-group">
              <label className="bw-calc-label">
                Platform deals closed per year
              </label>
              <input
                type="number"
                className="bw-calc-input"
                min={1}
                max={100}
                placeholder="e.g., 5"
                value={data.platformDeals || ''}
                onChange={(e) =>
                  setData((d) => ({
                    ...d,
                    platformDeals: parseInt(e.target.value) || 0,
                  }))
                }
              />
            </div>
            <div className="bw-calc-input-group">
              <label className="bw-calc-label">
                Add-on acquisitions per year
              </label>
              <input
                type="number"
                className="bw-calc-input"
                min={0}
                max={200}
                placeholder="e.g., 8"
                value={data.addonDeals || ''}
                onChange={(e) =>
                  setData((d) => ({
                    ...d,
                    addonDeals: parseInt(e.target.value) || 0,
                  }))
                }
              />
            </div>
            <div className="bw-calc-buttons">
              <button
                className="bw-calc-btn bw-calc-btn-secondary"
                onClick={prevStep}
              >
                Back
              </button>
              <button
                className="bw-calc-btn bw-calc-btn-primary"
                disabled={!canProceedStep3}
                onClick={nextStep}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 4 */}
        {step === 4 && !results && (
          <div className="bw-calc-step bw-active">
            <h3 className="bw-calc-step-title">
              What are your average labor costs?
            </h3>
            <div className="bw-calc-input-group">
              <label className="bw-calc-label">
                Average hourly rate (junior staff)
              </label>
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
                  value={data.juniorRate || ''}
                  onChange={(e) =>
                    setData((d) => ({
                      ...d,
                      juniorRate: parseInt(e.target.value) || 0,
                    }))
                  }
                  style={{ paddingLeft: '32px' }}
                />
              </div>
              <p className="bw-calc-help-text">
                Associates and analysts - typical range $150-250/hr
              </p>
            </div>
            <div className="bw-calc-input-group">
              <label className="bw-calc-label">
                Average hourly rate (senior staff)
              </label>
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
                  value={data.seniorRate || ''}
                  onChange={(e) =>
                    setData((d) => ({
                      ...d,
                      seniorRate: parseInt(e.target.value) || 0,
                    }))
                  }
                  style={{ paddingLeft: '32px' }}
                />
              </div>
              <p className="bw-calc-help-text">
                VPs and principals - typical range $300-500/hr
              </p>
            </div>
            <div className="bw-calc-buttons">
              <button
                className="bw-calc-btn bw-calc-btn-secondary"
                onClick={prevStep}
              >
                Back
              </button>
              <button
                className="bw-calc-btn bw-calc-btn-primary"
                disabled={!canProceedStep4}
                onClick={calculate}
              >
                Calculate ROI
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        {results && (
          <div className="bw-calc-results">
            <h3 className="bw-calc-results-title">Your Brightwave Impact</h3>
            <div className="bw-calc-metric">
              <div className="bw-calc-metric-label">Annual Cost Savings</div>
              <div className="bw-calc-metric-value">
                {formatCurrency(results.totalCostSavings)}
              </div>
              <div className="bw-calc-metric-subvalue">
                in labor costs per year
              </div>
            </div>
            <div className="bw-calc-metric">
              <div className="bw-calc-metric-label">Time Saved</div>
              <div className="bw-calc-metric-value">
                {results.totalHoursSaved.toLocaleString()}
              </div>
              <div className="bw-calc-metric-subvalue">
                hours per year ({results.fteEquivalent.toFixed(1)} FTE
                equivalent)
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
              <div className="bw-calc-breakdown-title">
                Time Savings Breakdown
              </div>
              <div className="bw-calc-breakdown-item">
                <span>Platform Deals ({data.platformDeals})</span>
                <span>{results.totalPlatformHours.toLocaleString()} hrs</span>
              </div>
              <div className="bw-calc-breakdown-item">
                <span>Add-on Deals ({data.addonDeals})</span>
                <span>{results.totalAddonHours.toLocaleString()} hrs</span>
              </div>
              <div className="bw-calc-breakdown-item">
                <span>
                  <strong>Total Annual Savings</strong>
                </span>
                <span>
                  <strong>
                    {results.totalHoursSaved.toLocaleString()} hrs
                  </strong>
                </span>
              </div>
            </div>
            <div className="bw-calc-cta">
              <a href="/contact" className="bw-calc-cta-btn">
                Schedule a Demo
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
