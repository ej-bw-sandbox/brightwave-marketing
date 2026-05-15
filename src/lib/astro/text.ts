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


export function extractDraftField(value: unknown, label: string): string {
  if (typeof value !== 'string') return ''
  const lines = value.split(/\n/)
  const lowerLabel = label.toLowerCase()
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i].trim()
    const normalized = line.replace(/\*\*/g, '').toLowerCase()
    if (normalized.startsWith(lowerLabel) && normalized.includes(':')) {
      const collected: string[] = []
      const first = line.slice(line.indexOf(':') + 1).replace(/\*\*/g, '').trim()
      if (first) collected.push(first)
      for (let j = i + 1; j < lines.length; j += 1) {
        const next = lines[j].trim()
        const plain = next.replace(/\*\*/g, '')
        if (/^[A-Z][^:]{1,80}:/.test(plain)) break
        if (next) collected.push(next)
      }
      return collected.join(' ').trim()
    }
  }
  return ''
}

export function stripDraftLabels(value: unknown): string {
  if (typeof value !== 'string') return ''
  return value
    .replace(/\n\s*\n\s*\*\*[^\n:]{1,80}:\*\*[\s\S]*$/m, '')
    .replace(/\n\s*\n\s*\*\*[^\n:]{1,80}:\*\*/g, '\n')
    .trim()
}
