import React from 'react'
import { CheckCircle2, XCircle, MinusCircle, Star } from 'lucide-react'

interface ComparisonRow {
  feature: string
  category?: string
  brightwaveValue?: string
  competitorValue?: string
  note?: string
}

interface ComparisonTableProps {
  competitorName: string
  rows: ComparisonRow[]
}

function ValueIcon({ value }: { value?: string }) {
  switch (value) {
    case 'yes':
    case 'superior':
      return <CheckCircle2 className={`h-5 w-5 ${value === 'superior' ? 'text-brand-400' : 'text-success'}`} />
    case 'no':
      return <XCircle className="h-5 w-5 text-error" />
    case 'partial':
    case 'limited':
      return <MinusCircle className="h-5 w-5 text-warning" />
    default:
      return <span className="text-text-muted text-sm">{value || '-'}</span>
  }
}

export function ComparisonTable({ competitorName, rows }: ComparisonTableProps) {
  if (rows.length === 0) return null

  // Group by category
  const grouped = rows.reduce<Record<string, ComparisonRow[]>>((acc, row) => {
    const cat = row.category || 'General'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(row)
    return acc
  }, {})

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border">
            <th className="py-4 px-4 text-left text-sm font-semibold text-text-primary">Feature</th>
            <th className="py-4 px-4 text-center text-sm font-semibold text-brand-400 w-36">
              <div className="flex items-center justify-center gap-1">
                <Star className="h-4 w-4" />
                Brightwave
              </div>
            </th>
            <th className="py-4 px-4 text-center text-sm font-semibold text-text-secondary w-36">
              {competitorName}
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(grouped).map(([category, catRows]) => (
            <React.Fragment key={category}>
              {Object.keys(grouped).length > 1 && (
                <tr>
                  <td
                    colSpan={3}
                    className="pt-6 pb-2 px-4 text-xs font-semibold uppercase tracking-wider text-text-muted"
                  >
                    {category}
                  </td>
                </tr>
              )}
              {catRows.map((row, i) => (
                <tr key={i} className="border-b border-border-subtle hover:bg-surface-elevated/50 transition-colors">
                  <td className="py-3 px-4 text-sm text-text-secondary">
                    {row.feature}
                    {row.note && (
                      <span className="block text-xs text-text-muted mt-0.5">{row.note}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex justify-center">
                      <ValueIcon value={row.brightwaveValue} />
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex justify-center">
                      <ValueIcon value={row.competitorValue} />
                    </div>
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}
