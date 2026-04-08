/**
 * Utility functions for the demo page.
 * Handles prospect context parsing from URL query params and localStorage.
 */

export interface ProspectContext {
  // Identity (may come from URL params or form)
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
  urgency?: number
  additionalDealsCapacity?: number
  // AUM (may come from URL param)
  aum?: string
}

export interface DemoPersonaConfig {
  personaId?: string
  anamPersonaId: string
  llmModel: string
  knowledgeBase?: string
  greeting?: string
  calendarLink: string
}

/**
 * All localStorage key names that may contain prospect or ROI data.
 */
const STORAGE_KEYS = [
  'brightwave_prospect',
  'bw_prospect',
  'bw_roi',
  'brightwave_roi',
  'roiCalc',
  'prospect',
]

/**
 * String fields we recognize from prospect/ROI data.
 */
const STRING_FIELDS: (keyof ProspectContext)[] = [
  'name',
  'email',
  'company',
  'role',
  'firmType',
  'timeframe',
  'aum',
]

/**
 * Numeric fields we recognize from prospect/ROI data.
 */
const NUMBER_FIELDS: (keyof ProspectContext)[] = [
  'teamSize',
  'annualCostSavings',
  'totalHoursSaved',
  'roi',
  'dealsEvaluated',
  'dealsCompleted',
  'avgDealSize',
  'avgHourlyRate',
  'urgency',
  'additionalDealsCapacity',
]

/**
 * Attempts to parse a JSON value from localStorage at the given key.
 * Returns null if the key does not exist, the value is not valid JSON,
 * or the parsed value is not a plain object.
 */
function tryParseStorageKey(key: string): Record<string, unknown> | null {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) return null
    return parsed as Record<string, unknown>
  } catch {
    return null
  }
}

/**
 * Reads prospect context from localStorage.
 * Scans multiple well-known key names and merges any relevant fields found.
 * Returns a partial ProspectContext.
 */
function readLocalStorage(): Partial<ProspectContext> {
  if (typeof window === 'undefined') return {}

  const result: Partial<ProspectContext> = {}

  // Collect data from all known keys
  const allData: Record<string, unknown>[] = []

  for (const key of STORAGE_KEYS) {
    const parsed = tryParseStorageKey(key)
    if (parsed) allData.push(parsed)
  }

  // Also scan ALL localStorage keys for any JSON objects that contain
  // recognizable prospect or ROI fields
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (!key || STORAGE_KEYS.includes(key)) continue
      const parsed = tryParseStorageKey(key)
      if (!parsed) continue
      // Only include if it has at least one field we recognize
      const hasKnownField = [...STRING_FIELDS, ...NUMBER_FIELDS].some(
        (f) => f in parsed,
      )
      if (hasKnownField) allData.push(parsed)
    }
  } catch {
    // localStorage iteration failed -- continue with what we have
  }

  // Merge all found data (later keys overwrite earlier ones for the same field)
  for (const data of allData) {
    for (const field of STRING_FIELDS) {
      const val = data[field]
      if (typeof val === 'string' && val.trim()) {
        ;(result as Record<string, unknown>)[field] = val.trim()
      }
    }
    for (const field of NUMBER_FIELDS) {
      const val = data[field]
      if (typeof val === 'number' && !Number.isNaN(val)) {
        ;(result as Record<string, unknown>)[field] = val
      }
    }
  }

  return result
}

/**
 * Reads prospect context from URL search params.
 * Returns a partial ProspectContext (only fields present in the URL).
 */
function readQueryParams(searchParams: URLSearchParams): Partial<ProspectContext> {
  const result: Partial<ProspectContext> = {}

  for (const field of STRING_FIELDS) {
    const value = searchParams.get(field)
    if (value && value.trim()) {
      ;(result as Record<string, unknown>)[field] = value.trim()
    }
  }

  for (const field of NUMBER_FIELDS) {
    const value = searchParams.get(field)
    if (value) {
      const num = Number(value)
      if (!Number.isNaN(num)) {
        ;(result as Record<string, unknown>)[field] = num
      }
    }
  }

  return result
}

/**
 * Merges prospect context from URL query params and localStorage.
 * Query params take priority over localStorage values.
 */
export function getProspectContext(searchParams: URLSearchParams): ProspectContext {
  const fromStorage = readLocalStorage()
  const fromParams = readQueryParams(searchParams)

  // Merge: query params override storage
  const merged: ProspectContext = { ...fromStorage, ...fromParams }

  // Persist the merged context back to localStorage for future use
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('brightwave_prospect', JSON.stringify(merged))
    } catch {
      // Storage full or unavailable -- silent fail
    }
  }

  return merged
}

/**
 * Returns the prospect's first name for personalized greetings.
 * Returns an empty string if no name is available.
 */
export function getFirstName(prospect: ProspectContext): string {
  const name = (prospect.name ?? '').trim()
  if (!name) return ''
  return name.split(' ')[0]
}

/**
 * Formats elapsed seconds into MM:SS display format.
 */
export function formatElapsed(seconds: number): string {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0')
  const s = String(seconds % 60).padStart(2, '0')
  return `${m}:${s}`
}
