import { PortableText } from '@portabletext/react'

/* Safely render a field that might be a string or Portable Text array */
export function RenderField({ value, className }: { value: any; className?: string }) {
  if (!value) return null
  if (typeof value === 'string') return <p className={className || 'c-text-3 text-bw-gray-500'}>{value}</p>
  if (Array.isArray(value)) return <div className={className || 'prose-brand'}><PortableText value={value} /></div>
  return null
}
