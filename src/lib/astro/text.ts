export function slugValue(value: any): string {
  if (!value) return ''
  if (typeof value === 'string') return value
  return value.current || ''
}

export function stripHtml(value: unknown): string {
  if (typeof value !== 'string') return ''
  return value.replace(/<[^>]*>/g, '').trim()
}

export function textFromPortable(value: any, fallback = ''): string {
  if (!value) return fallback
  if (typeof value === 'string') return stripHtml(value) || fallback
  if (!Array.isArray(value)) return fallback
  const text = value
    .map((block) => block?.children?.map((child: any) => child?.text || '').join('') || '')
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
  return text || fallback
}

export function formatDate(value?: string): string {
  if (!value) return ''
  try {
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value))
  } catch {
    return ''
  }
}
