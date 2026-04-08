/**
 * Utility functions for the demo page.
 * Handles prospect context parsing from URL query params and localStorage.
 */

export interface ProspectContext {
  // Identity
  name?: string
  email?: string
  company?: string
  // Role/firm context
  role?: string
  firmType?: string
  teamSize?: number
  // ROI calculator outputs
  annualCostSavings?: number
  totalHoursSaved?: number
  roi?: number
  dealsEvaluated?: number
  dealsCompleted?: number
  avgDealSize?: number
  avgHourlyRate?: number
  timeframe?: string
  urgency?: string
  additionalDealsCapacity?: number
}

export interface DemoPersonaConfig {
  personaId?: string
  anamPersonaId: string
  llmModel: string
  knowledgeBase?: string
  greeting?: string
  calendarLink: string
}

// All keys we scan in localStorage
const STORAGE_KEYS = ['brightwave_prospect', 'bw_prospect', 'bw_roi', 'brightwave_roi', 'roiCalc', 'prospect']

// Fields we recognize and their types
const STRING_FIELDS = ['name', 'email', 'company', 'role', 'firmType', 'timeframe', 'urgency'] as const
const NUMBER_FIELDS = [
  'teamSize', 'annualCostSavings', 'totalHoursSaved', 'roi',
  'dealsEvaluated', 'dealsCompleted', 'avgDealSize', 'avgHourlyRate',
  'additionalDealsCapacity'
] as const

function parseObject(parsed: unknown): Partial<ProspectContext> {
  if (typeof parsed !== 'object' || parsed === null) return {}
  const obj = parsed as Record<string, unknown>
  const result: Partial<ProspectContext> = {}

  for (const field of STRING_FIELDS) {
    const val = obj[field]
    if (typeof val === 'string' && val.trim()) {
      result[field] = val.trim()
    }
  }
  for (const field of NUMBER_FIELDS) {
    const val = obj[field]
    if (typeof val === 'number' && !isNaN(val)) {
      (result as Record<string, unknown>)[field] = val
    } else if (typeof val === 'string') {
      const num = parseFloat(val)
      if (!isNaN(num)) (result as Record<string, unknown>)[field] = num
    }
  }
  return result
}

function readLocalStorage(): Partial<ProspectContext> {
  if (typeof window === 'undefined') return {}
  const merged: Partial<ProspectContext> = {}

  // 1. Check known keys first
  for (const key of STORAGE_KEYS) {
    try {
      const raw = localStorage.getItem(key)
      if (!raw) continue
      const parsed = JSON.parse(raw)
      Object.assign(merged, parseObject(parsed))
    } catch {
      // ignore parse errors
    }
  }

  // 2. Scan ALL keys for any object containing recognized fields
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (!key || STORAGE_KEYS.includes(key)) continue
      const raw = localStorage.getItem(key)
      if (!raw) continue
      try {
        const parsed = JSON.parse(raw)
        const candidate = parseObject(parsed)
        if (Object.keys(candidate).length > 0) {
          Object.assign(merged, candidate)
        }
      } catch {
        // not JSON, skip
      }
    }
  } catch {
    // localStorage.length may throw in some contexts
  }

  return merged
}

function readQueryParams(searchParams: URLSearchParams): Partial<ProspectContext> {
  const result: Partial<ProspectContext> = {}
  for (const field of STRING_FIELDS) {
    const value = searchParams.get(field)
    if (value && value.trim()) result[field] = value.trim()
  }
  for (const field of NUMBER_FIELDS) {
    const value = searchParams.get(field)
    if (value) {
      const num = parseFloat(value)
      if (!isNaN(num)) (result as Record<string, unknown>)[field] = num
    }
  }
  return result
}

export function getProspectContext(searchParams: URLSearchParams): ProspectContext {
  const fromStorage = readLocalStorage()
  const fromParams = readQueryParams(searchParams)
  // Query params take priority
  return { ...fromStorage, ...fromParams }
}

export function getFirstName(prospect: ProspectContext): string {
  const name = prospect.name?.trim() ?? ''
  if (!name) return ''
  return name.split(' ')[0]
}

export function formatElapsed(seconds: number): string {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0')
  const s = String(seconds % 60).padStart(2, '0')
  return `${m}:${s}`
}
