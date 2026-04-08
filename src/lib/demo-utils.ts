/**
 * Utility functions for the demo page.
 * Handles prospect context parsing from URL query params and localStorage.
 */

export interface ProspectContext {
  name: string;
  email: string;
  company: string;
  role: string;
  aum: string;
  firmType: string;
}

export interface DemoPersonaConfig {
  anamPersonaId: string;
  llmModel: string;
  knowledgeBase?: string;
  greeting?: string;
  calendarLink: string;
}

const PROSPECT_FIELDS: (keyof ProspectContext)[] = [
  'name',
  'email',
  'company',
  'role',
  'aum',
  'firmType',
];

const STORAGE_KEY = 'brightwave_prospect';

/**
 * Reads prospect context from localStorage.
 * Returns a partial ProspectContext (only fields that exist in storage).
 */
function readLocalStorage(): Partial<ProspectContext> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) return {};
    const result: Partial<ProspectContext> = {};
    for (const field of PROSPECT_FIELDS) {
      if (typeof parsed[field] === 'string' && parsed[field].trim()) {
        result[field] = parsed[field].trim();
      }
    }
    return result;
  } catch {
    return {};
  }
}

/**
 * Reads prospect context from URL search params.
 * Returns a partial ProspectContext (only fields present in the URL).
 */
function readQueryParams(searchParams: URLSearchParams): Partial<ProspectContext> {
  const result: Partial<ProspectContext> = {};
  for (const field of PROSPECT_FIELDS) {
    const value = searchParams.get(field);
    if (value && value.trim()) {
      result[field] = value.trim();
    }
  }
  return result;
}

/**
 * Merges prospect context from URL query params and localStorage.
 * Query params take priority over localStorage values.
 */
export function getProspectContext(searchParams: URLSearchParams): ProspectContext {
  const fromStorage = readLocalStorage();
  const fromParams = readQueryParams(searchParams);

  const merged: ProspectContext = {
    name: fromParams.name ?? fromStorage.name ?? '',
    email: fromParams.email ?? fromStorage.email ?? '',
    company: fromParams.company ?? fromStorage.company ?? '',
    role: fromParams.role ?? fromStorage.role ?? '',
    aum: fromParams.aum ?? fromStorage.aum ?? '',
    firmType: fromParams.firmType ?? fromStorage.firmType ?? '',
  };

  // Persist the merged context back to localStorage for future use
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    } catch {
      // Storage full or unavailable -- silent fail
    }
  }

  return merged;
}

/**
 * Returns the prospect's first name for personalized greetings.
 */
export function getFirstName(prospect: ProspectContext): string {
  const name = prospect.name.trim();
  if (!name) return '';
  return name.split(' ')[0];
}

/**
 * Formats elapsed seconds into MM:SS display format.
 */
export function formatElapsed(seconds: number): string {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${m}:${s}`;
}
