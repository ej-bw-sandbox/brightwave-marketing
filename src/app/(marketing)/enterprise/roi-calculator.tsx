'use client'

import { useState, useRef, useEffect } from 'react'

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface CalcData {
  firmType: string
  teamSize: number
  dealsEvaluated: number
  dealsCompleted: number
  avgDealSize: number
  avgHourlyRate: number
  urgency: number
  timeframe: string
  role: string
}

/* ------------------------------------------------------------------ */
/*  Firm-type benchmarks                                               */
/* ------------------------------------------------------------------ */

interface FirmBenchmark {
  value: string
  label: string
  teamSize: number
  dealsEvaluated: number
  dealsCompleted: number
  avgDealSize: number
  avgHourlyRate: number
}

const FIRM_TYPES: FirmBenchmark[] = [
  { value: 'buyout',         label: 'Buyout',                      teamSize: 15, dealsEvaluated: 150, dealsCompleted: 5,  avgDealSize: 400,  avgHourlyRate: 300 },
  { value: 'growth',         label: 'Growth Equity',               teamSize: 12, dealsEvaluated: 200, dealsCompleted: 8,  avgDealSize: 150,  avgHourlyRate: 275 },
  { value: 'infrastructure', label: 'Infrastructure',              teamSize: 10, dealsEvaluated: 80,  dealsCompleted: 3,  avgDealSize: 500,  avgHourlyRate: 300 },
  { value: 'large',          label: 'Large-Cap PE',                teamSize: 20, dealsEvaluated: 120, dealsCompleted: 5,  avgDealSize: 750,  avgHourlyRate: 325 },
  { value: 'lower',          label: 'Lower Mid-Market PE',         teamSize: 8,  dealsEvaluated: 100, dealsCompleted: 5,  avgDealSize: 50,   avgHourlyRate: 200 },
  { value: 'mega',           label: 'Mega Fund',                   teamSize: 30, dealsEvaluated: 200, dealsCompleted: 8,  avgDealSize: 2000, avgHourlyRate: 350 },
  { value: 'middle',         label: 'Middle Market',               teamSize: 12, dealsEvaluated: 120, dealsCompleted: 5,  avgDealSize: 250,  avgHourlyRate: 250 },
  { value: 'credit',         label: 'Private Credit',              teamSize: 15, dealsEvaluated: 180, dealsCompleted: 12, avgDealSize: 150,  avgHourlyRate: 275 },
  { value: 'fof',            label: 'Secondaries & Fund of Funds', teamSize: 10, dealsEvaluated: 100, dealsCompleted: 6,  avgDealSize: 200,  avgHourlyRate: 275 },
]

const ROLES = [
  'Analyst',
  'Associate',
  'Vice President',
  'Principal',
  'Director',
  'Managing Director',
  'Operating Partner',
  'Portfolio Manager',
  'Senior',
  'Other',
]

const TIMEFRAMES = [
  { value: 'immediately', label: 'Immediately' },
  { value: 'this-quarter', label: 'This Quarter' },
  { value: '3-6-months', label: '3–6 Months' },
  { value: '6-plus-months', label: 'More than 6 Months' },
]

function getBenchmark(firmType: string): FirmBenchmark | undefined {
  return FIRM_TYPES.find(f => f.value === firmType)
}

/* ------------------------------------------------------------------ */
/*  Pricing                                                            */
/* ------------------------------------------------------------------ */

const PRICE_PER_USER_YEAR = 6600
const MIN_SEATS = 5

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function formatCurrency(v: number) {
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`
  if (v >= 1_000) return `$${(v / 1_000).toFixed(0)}K`
  return `$${v.toFixed(0)}`
}

function formatNumber(v: number) {
  return v.toLocaleString()
}

/* ------------------------------------------------------------------ */
/*  Lead scoring                                                       */
/* ------------------------------------------------------------------ */

const ROLE_WEIGHTS: Record<string, number> = {
  'Managing Director': 10,
  'Operating Partner': 9,
  'Portfolio Manager': 9,
  'Director': 8,
  'Principal': 8,
  'Senior': 7,
  'Vice President': 7,
  'Associate': 5,
  'Analyst': 4,
  'Other': 3,
}

const TIMEFRAME_WEIGHTS: Record<string, number> = {
  'immediately': 10,
  'this-quarter': 7,
  '3-6-months': 4,
  '6-plus-months': 2,
}

function computeLeadScore(params: {
  annualCostSavings: number
  brightwaveAnnualCost: number
  role: string
  urgency: number
  timeframe: string
  avgDealSize: number
  dealsCompleted: number
}): number {
  // ROI component (0-10): savings / cost ratio, 10x = midpoint (score 5)
  const roiRatio = params.brightwaveAnnualCost > 0
    ? params.annualCostSavings / params.brightwaveAnnualCost
    : 0
  const roiScore = Math.min(roiRatio / 20, 1) * 10

  // Role component (0-10)
  const roleScore = ROLE_WEIGHTS[params.role] ?? 5

  // Urgency component (0-10): direct from slider
  const urgencyScore = params.urgency

  // Timeframe component (0-10)
  const timeframeScore = TIMEFRAME_WEIGHTS[params.timeframe] ?? 5

  // Deal opportunity size component (0-10): total annual deal value, capped at $5B
  const totalDealValue = params.avgDealSize * params.dealsCompleted
  const dealScore = Math.min(totalDealValue / 5000, 1) * 10

  // Weighted average
  const weighted =
    roiScore * 0.20 +
    roleScore * 0.25 +
    urgencyScore * 0.20 +
    timeframeScore * 0.20 +
    dealScore * 0.15

  return Math.round(Math.min(Math.max(weighted, 1), 10) * 10) / 10
}

/* ------------------------------------------------------------------ */
/*  CSS                                                                */
/* ------------------------------------------------------------------ */

const CALC_CSS = `
  .bw-calc-wrapper { width: 100%; max-width: 62.1rem; margin: 0 auto; background: #ffffff; border-radius: 1rem; overflow: hidden; border: 1px solid #000000; }
  .bw-calc-header .c-text-4 { opacity: 0.75; }
  .bw-calc-header { background: black url('/webflow-images/calc-header-bg.png') no-repeat top right; background-size: contain; color: white; padding: 2.375rem 2rem 1.5rem; display: flex; flex-direction: column; gap: 1.5rem; align-items: flex-start; }
  .bw-calc-content { padding: 2rem; }
  .bw-calc-step { display: none; max-width: 49rem; margin-right: auto; margin-left: auto; animation: bw-fadeInUp 0.4s ease; }
  .bw-calc-step.bw-active { display: block; }
  @keyframes bw-fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  .bw-calc-progress { display: flex; gap: 8px; margin-bottom: 2.5rem; }
  .bw-calc-progress-dot { flex: 1; height: 8px; background: #e5e7eb; border-radius: 2px; transition: background 0.3s; }
  .bw-calc-progress-dot.bw-complete { background: #E7E70D; }
  .bw-calc-step-title { font-size: 2.25rem; line-height: 1.1; font-weight: 700; color: #0a0a0a; margin-bottom: 1.5rem; }
  .bw-calc-input-group { margin-bottom: 24px; }
  .bw-calc-label { display: block; font-size: 1rem; font-weight: 400; margin-bottom: 8px; }
  .bw-calc-input, .bw-calc-select { width: 100%; padding: 0px 8px; font-size: 1rem; border-bottom: 1px solid black; border-right: none; border-left: none; border-top: none; transition: border-color 0.4s; height: 48px; margin-bottom: 0.5rem; margin-top: 0.5rem; background: transparent; color: #0a0a0a; }
  .bw-calc-select { appearance: none; background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e"); background-position: right 8px center; background-repeat: no-repeat; background-size: 20px; padding-right: 32px; cursor: pointer; }
  .bw-calc-input:focus, .bw-calc-select:focus { outline: none; border-color: black; }
  .bw-calc-buttons { display: flex; gap: 12px; margin-top: 32px; }
  .bw-calc-cta-btn { position: relative; flex: 1; padding: 2rem 2.5rem 0.62rem 0.62rem; font-size: 1rem; font-weight: 700; border: none; cursor: pointer; transition: all 0.4s; text-align: left; background: #E7E70D; color: black; margin-top: 2rem; display: block; text-decoration: none; }
  .bw-calc-cta-btn::after { content: ""; position: absolute; width: 0.5rem; height: 0.5rem; top: 0.62rem; right: 0.62rem; background-color: currentColor; }
  .bw-calc-btn { position: relative; flex: 1; padding: 2rem 0.62rem 0.62rem 0.62rem; font-size: 1rem; font-weight: 700; border: none; cursor: pointer; transition: all 0.4s; text-align: left; }
  .bw-calc-btn::after { content: ""; position: absolute; width: 0.5rem; height: 0.5rem; top: 0.62rem; right: 0.62rem; background-color: currentColor; }
  .bw-calc-btn-primary { background: #E7E70D; color: black; }
  .bw-calc-btn-secondary { background: white; color: black; border: 1px solid black; }
  .bw-calc-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .bw-calc-results { background: black; color: white; padding: 2.5rem; border-radius: 12px; margin-top: 32px; }
  .bw-calc-results-title { font-size: 1.5rem; font-weight: 700; margin-bottom: 24px; text-align: center; }
  .bw-calc-metric { background: rgba(255, 255, 255, 0.15); backdrop-filter: blur(10px); padding: 24px; border-radius: 12px; margin-bottom: 16px; }
  .bw-calc-metric-label { font-size: 0.875rem; opacity: 0.9; margin-bottom: 8px; }
  .bw-calc-metric-value { font-size: 2.5rem; font-weight: 700; line-height: 1; }
  .bw-calc-metric-subvalue { font-size: 1rem; opacity: 0.9; margin-top: 4px; }
  .bw-calc-breakdown { background: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 8px; margin-top: 24px; }
  .bw-calc-breakdown-title { font-size: 1rem; font-weight: 600; margin-bottom: 16px; }
  .bw-calc-breakdown-item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
  .bw-calc-breakdown-item:last-child { border-bottom: none; }
  .bw-calc-cta { text-align: center; margin-top: 32px; }
  .bw-calc-help-text { font-size: 1rem; color: black; margin-top: 4px; opacity: 0.75; font-weight: 400; }
  .bw-calc-slider-wrap { margin-top: 1.5rem; margin-bottom: 2rem; }
  .bw-calc-slider-label { display: flex; justify-content: space-between; font-size: 0.875rem; color: #6b7280; margin-top: 8px; }
  .bw-calc-slider { width: 100%; height: 8px; appearance: none; background: #e5e7eb; border-radius: 4px; outline: none; cursor: pointer; }
  .bw-calc-slider::-webkit-slider-thumb { appearance: none; width: 24px; height: 24px; border-radius: 50%; background: #E7E70D; border: 2px solid black; cursor: pointer; }
  .bw-calc-slider::-moz-range-thumb { width: 24px; height: 24px; border-radius: 50%; background: #E7E70D; border: 2px solid black; cursor: pointer; }
  .bw-calc-slider-value { font-size: 2rem; font-weight: 700; color: #0a0a0a; text-align: center; margin-bottom: 8px; }
  .bw-calc-timeframe-options { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-top: 12px; }
  .bw-calc-tf-option { padding: 12px 8px; border: 2px solid #e5e7eb; border-radius: 8px; text-align: center; font-size: 0.875rem; font-weight: 600; cursor: pointer; transition: all 0.3s; color: #0a0a0a; background: white; }
  .bw-calc-tf-option:hover { border-color: #0F0F0F; }
  .bw-calc-tf-option.bw-selected { border-color: black; background: #f9fafb; }
`

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const TOTAL_STEPS = 5

export function RoiCalculator() {
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState<Partial<CalcData>>({ urgency: 5 })
  const [name, setName] = useState('')
  const [businessEmail, setBusinessEmail] = useState('')
  const [results, setResults] = useState<{
    annualCostSavings: number
    totalHoursSaved: number
    fteEquivalent: number
    dealVelocityWeeks: number
    additionalDealsCapacity: number
    screeningHoursSaved: number
    ddHoursSaved: number
    brightwaveAnnualCost: number
    roi: number
  } | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  // Prefill fields when firm type changes
  useEffect(() => {
    if (!data.firmType) return
    const b = getBenchmark(data.firmType)
    if (!b) return
    setData(d => ({
      ...d,
      teamSize: d.teamSize || b.teamSize,
      dealsEvaluated: d.dealsEvaluated || b.dealsEvaluated,
      dealsCompleted: d.dealsCompleted || b.dealsCompleted,
      avgDealSize: d.avgDealSize || b.avgDealSize,
      avgHourlyRate: d.avgHourlyRate || b.avgHourlyRate,
    }))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.firmType])

  const selectFirm = (value: string) => {
    setData(d => ({ urgency: d.urgency, timeframe: d.timeframe, role: d.role, firmType: value }))
  }

  const nextStep = () => setCurrentStep(s => s + 1)
  const prevStep = () => setCurrentStep(s => s - 1)

  const calculate = async () => {
    const teamSize = data.teamSize ?? 10
    const dealsEvaluated = data.dealsEvaluated ?? 100
    const dealsCompleted = data.dealsCompleted ?? 5
    const avgHourlyRate = data.avgHourlyRate ?? 275

    const hoursPerScreenedDeal = 20
    const hoursPerCompletedDeal = 200
    const screeningHoursSaved = dealsEvaluated * hoursPerScreenedDeal
    const ddHoursSaved = dealsCompleted * hoursPerCompletedDeal
    const totalHoursSaved = screeningHoursSaved + ddHoursSaved

    const annualCostSavings = totalHoursSaved * avgHourlyRate
    const fteEquivalent = totalHoursSaved / 2000
    const dealVelocityWeeks = dealsCompleted * 2.5
    const additionalDealsCapacity = Math.floor(totalHoursSaved / 400)

    const seats = Math.max(teamSize, MIN_SEATS)
    const brightwaveAnnualCost = seats * PRICE_PER_USER_YEAR
    const roi = ((annualCostSavings - brightwaveAnnualCost) / brightwaveAnnualCost) * 100

    const calcResults = {
      annualCostSavings, totalHoursSaved, fteEquivalent, dealVelocityWeeks,
      additionalDealsCapacity, screeningHoursSaved, ddHoursSaved, brightwaveAnnualCost, roi,
    }

    setResults(calcResults)
    setCurrentStep(TOTAL_STEPS + 1) // results step

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }, 100)

    const firmLabel = FIRM_TYPES.find(f => f.value === data.firmType)?.label || data.firmType || ''
    const leadScore = computeLeadScore({
      annualCostSavings,
      brightwaveAnnualCost,
      role: data.role || '',
      urgency: data.urgency ?? 5,
      timeframe: data.timeframe || '',
      avgDealSize: data.avgDealSize ?? 0,
      dealsCompleted,
    })

    fetch('/api/roi-calculator', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name, email: businessEmail, role: data.role, firmType: firmLabel, firmTypeValue: data.firmType, teamSize,
        dealsEvaluated, dealsCompleted, avgDealSize: data.avgDealSize, avgHourlyRate,
        urgency: data.urgency, timeframe: data.timeframe,
        annualCostSavings: calcResults.annualCostSavings,
        totalHoursSaved: calcResults.totalHoursSaved,
        fteEquivalent: calcResults.fteEquivalent,
        brightwaveAnnualCost: calcResults.brightwaveAnnualCost,
        roi: calcResults.roi,
        dealValue: seats * PRICE_PER_USER_YEAR,
        leadScore,
      }),
    }).catch(() => {})
  }

  const isStep1Valid = !!data.firmType && !!data.teamSize && data.teamSize >= 1
  const isStep2Valid =
    !!data.dealsEvaluated && data.dealsEvaluated >= 1 &&
    !!data.dealsCompleted && data.dealsCompleted >= 1 &&
    !!data.avgDealSize && data.avgDealSize >= 1
  const isStep3Valid = !!data.avgHourlyRate && data.avgHourlyRate >= 50
  const isStep4Valid = !!data.urgency && !!data.timeframe
  const isStep5Valid = !!data.role && name.trim().length > 0 && isValidEmail(businessEmail)

  const benchmark = data.firmType ? getBenchmark(data.firmType) : null

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CALC_CSS }} />
      <div className="bw-calc-wrapper">
        <div className="bw-calc-header">
          <h2 className="c-title-3">See How Much</h2>
        </div>
        <div className="bw-calc-content">
          <div className="bw-calc-progress">
            {Array.from({ length: TOTAL_STEPS }, (_, i) => (
              <div key={i} className={`bw-calc-progress-dot${currentStep >= i + 1 ? ' bw-complete' : ''}`} />
            ))}
          </div>

          {/* Step 1: Firm Type + Team Size */}
          <div className={`bw-calc-step${currentStep === 1 ? ' bw-active' : ''}`}>
            <h3 className="bw-calc-step-title">Tell us about your firm</h3>
            <div className="bw-calc-input-group">
              <label className="bw-calc-label">What type of firm are you?</label>
              <select className="bw-calc-select" value={data.firmType || ''} onChange={e => selectFirm(e.target.value)}>
                <option value="" disabled>Select firm type...</option>
                {FIRM_TYPES.map(ft => (
                  <option key={ft.value} value={ft.value}>{ft.label}</option>
                ))}
              </select>
            </div>
            <div className="bw-calc-input-group">
              <label className="bw-calc-label">How many investment professionals on your team?</label>
              <input
                type="number" className="bw-calc-input" min={1} max={500}
                placeholder={benchmark ? String(benchmark.teamSize) : 'e.g., 15'}
                value={data.teamSize ?? ''}
                onChange={e => setData(d => ({ ...d, teamSize: parseInt(e.target.value) || 0 }))}
              />
              <p className="bw-calc-help-text">Partners, principals, VPs, associates, and analysts</p>
            </div>
            <div className="bw-calc-buttons">
              <button className="bw-calc-btn bw-calc-btn-primary" onClick={nextStep} disabled={!isStep1Valid}>Next</button>
            </div>
          </div>

          {/* Step 2: Deal Activity */}
          <div className={`bw-calc-step${currentStep === 2 ? ' bw-active' : ''}`}>
            <h3 className="bw-calc-step-title">What&apos;s your annual deal activity?</h3>
            <div className="bw-calc-input-group">
              <label className="bw-calc-label">Deals evaluated each year</label>
              <input
                type="number" className="bw-calc-input" min={1} max={1000}
                placeholder={benchmark ? String(benchmark.dealsEvaluated) : 'e.g., 120'}
                value={data.dealsEvaluated ?? ''}
                onChange={e => setData(d => ({ ...d, dealsEvaluated: parseInt(e.target.value) || 0 }))}
              />
              <p className="bw-calc-help-text">Total opportunities screened, including those that don&apos;t proceed</p>
            </div>
            <div className="bw-calc-input-group">
              <label className="bw-calc-label">Deals completed each year</label>
              <input
                type="number" className="bw-calc-input" min={1} max={200}
                placeholder={benchmark ? String(benchmark.dealsCompleted) : 'e.g., 5'}
                value={data.dealsCompleted ?? ''}
                onChange={e => setData(d => ({ ...d, dealsCompleted: parseInt(e.target.value) || 0 }))}
              />
              <p className="bw-calc-help-text">Deals that reach signing or close</p>
            </div>
            <div className="bw-calc-input-group">
              <label className="bw-calc-label">Average deal size ($M)</label>
              <input
                type="number" className="bw-calc-input" min={1} max={50000}
                placeholder={benchmark ? String(benchmark.avgDealSize) : 'e.g., 250'}
                value={data.avgDealSize ?? ''}
                onChange={e => setData(d => ({ ...d, avgDealSize: parseInt(e.target.value) || 0 }))}
              />
              <p className="bw-calc-help-text">Enterprise value in millions</p>
            </div>
            <div className="bw-calc-buttons">
              <button className="bw-calc-btn bw-calc-btn-secondary" onClick={prevStep}>Back</button>
              <button className="bw-calc-btn bw-calc-btn-primary" onClick={nextStep} disabled={!isStep2Valid}>Next</button>
            </div>
          </div>

          {/* Step 3: Labor Cost */}
          <div className={`bw-calc-step${currentStep === 3 ? ' bw-active' : ''}`}>
            <h3 className="bw-calc-step-title">What is your deal team's average hourly rate?</h3>
            <div className="bw-calc-input-group">
              <label className="bw-calc-label">Average investment team member hourly rate</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#6b7280', fontSize: '1rem' }}>$</span>
                <input
                  type="number" className="bw-calc-input" min={50} max={1000}
                  placeholder={benchmark ? String(benchmark.avgHourlyRate) : '275'}
                  value={data.avgHourlyRate ?? ''}
                  onChange={e => setData(d => ({ ...d, avgHourlyRate: parseInt(e.target.value) || 0 }))}
                  style={{ paddingLeft: 32 }}
                />
              </div>
              <p className="bw-calc-help-text">US weighted average across associates, VPs, principals, and partners</p>
            </div>
            <div className="bw-calc-buttons">
              <button className="bw-calc-btn bw-calc-btn-secondary" onClick={prevStep}>Back</button>
              <button className="bw-calc-btn bw-calc-btn-primary" onClick={nextStep} disabled={!isStep3Valid}>Next</button>
            </div>
          </div>

          {/* Step 4: Urgency & Timeline */}
          <div className={`bw-calc-step${currentStep === 4 ? ' bw-active' : ''}`}>
            <h3 className="bw-calc-step-title">How urgent is this for your firm?</h3>
            <div className="bw-calc-slider-wrap">
              <label className="bw-calc-label">How urgent is finding a full-stack AI solution to streamline investing operations?</label>
              <div className="bw-calc-slider-value">{data.urgency ?? 5}</div>
              <input
                type="range" className="bw-calc-slider" min={1} max={10} step={1}
                value={data.urgency ?? 5}
                onChange={e => setData(d => ({ ...d, urgency: parseInt(e.target.value) }))}
              />
              <div className="bw-calc-slider-label">
                <span>Not urgent</span>
                <span>Extremely urgent</span>
              </div>
            </div>
            <div className="bw-calc-input-group">
              <label className="bw-calc-label">What is your timeframe for implementing a solution that fits your firm&apos;s needs?</label>
              <div className="bw-calc-timeframe-options">
                {TIMEFRAMES.map(tf => (
                  <div
                    key={tf.value}
                    className={`bw-calc-tf-option${data.timeframe === tf.value ? ' bw-selected' : ''}`}
                    onClick={() => setData(d => ({ ...d, timeframe: tf.value }))}
                  >
                    {tf.label}
                  </div>
                ))}
              </div>
            </div>
            <div className="bw-calc-buttons">
              <button className="bw-calc-btn bw-calc-btn-secondary" onClick={prevStep}>Back</button>
              <button className="bw-calc-btn bw-calc-btn-primary" onClick={nextStep} disabled={!isStep4Valid}>Next</button>
            </div>
          </div>

          {/* Step 5: Contact Info + Role */}
          <div className={`bw-calc-step${currentStep === 5 ? ' bw-active' : ''}`}>
            <h3 className="bw-calc-step-title">Where should we send the impact report?</h3>
            <div className="bw-calc-input-group">
              <label className="bw-calc-label">Name</label>
              <input type="text" className="bw-calc-input" placeholder="Jane Smith" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="bw-calc-input-group">
              <label className="bw-calc-label">Business email</label>
              <input type="email" className="bw-calc-input" placeholder="name@company.com" value={businessEmail} onChange={e => setBusinessEmail(e.target.value)} />
            </div>
            <div className="bw-calc-input-group">
              <label className="bw-calc-label">What&apos;s your role?</label>
              <select className="bw-calc-select" value={data.role || ''} onChange={e => setData(d => ({ ...d, role: e.target.value }))}>
                <option value="" disabled>Select your role...</option>
                {ROLES.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <div className="bw-calc-buttons">
              <button className="bw-calc-btn bw-calc-btn-secondary" onClick={prevStep}>Back</button>
              <button className="bw-calc-btn bw-calc-btn-primary" onClick={calculate} disabled={!isStep5Valid}>Calculate ROI</button>
            </div>
          </div>

          {/* Results */}
          {results && currentStep === TOTAL_STEPS + 1 && (
            <div ref={resultsRef}>
              <div className="bw-calc-results">
                <h3 className="bw-calc-results-title">Your Brightwave Impact</h3>
                <div className="bw-calc-metric">
                  <div className="bw-calc-metric-label">Annual Cost Savings</div>
                  <div className="bw-calc-metric-value">{formatCurrency(results.annualCostSavings)}</div>
                  <div className="bw-calc-metric-subvalue">in labor costs per year</div>
                </div>
                <div className="bw-calc-metric">
                  <div className="bw-calc-metric-label">Time Saved</div>
                  <div className="bw-calc-metric-value">{formatNumber(results.totalHoursSaved)}</div>
                  <div className="bw-calc-metric-subvalue">hours per year ({results.fteEquivalent.toFixed(1)} FTE equivalent)</div>
                </div>
                <div className="bw-calc-metric">
                  <div className="bw-calc-metric-label">Deal Velocity</div>
                  <div className="bw-calc-metric-value">{results.dealVelocityWeeks.toFixed(0)} weeks</div>
                  <div className="bw-calc-metric-subvalue">compressed across your deal pipeline</div>
                </div>
                <div className="bw-calc-metric">
                  <div className="bw-calc-metric-label">Additional Capacity</div>
                  <div className="bw-calc-metric-value">+{results.additionalDealsCapacity} deals</div>
                  <div className="bw-calc-metric-subvalue">your team could evaluate per year</div>
                </div>
                <div className="bw-calc-cta">
                  <a href="https://calendly.com/d/cv37-bhv-664/brightwave-trial" target="_blank" rel="noopener noreferrer" className="bw-calc-cta-btn">
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
