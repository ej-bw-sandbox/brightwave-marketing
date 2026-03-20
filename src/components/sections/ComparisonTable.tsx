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
      return <CheckCircle2 className={`h-5 w-5 ${value === 'superior' ? 'text-bw-yellow-500' : 'text-success'}`} />
    case 'no':
      return <XCircle className="h-5 w-5 text-error" />
    case 'partial':
    case 'limited':
      return <MinusCircle className="h-5 w-5 text-warning" />
    default:
      return <span className="text-bw-gray-300 text-sm">{value || '-'}</span>
  }
}

export function ComparisonTable({ competitorName, rows }: ComparisonTableProps) {
  if ((rows ?? []).length === 0) return null

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
          <tr className="border-b border-bw-gray-200">
            <th className="py-4 px-4 text-left text-sm font-semibold text-bw-gray-800">Feature</th>
            <th className="py-4 px-4 text-center text-sm font-semibold text-bw-yellow-500 w-36">
              <div className="flex items-center justify-center gap-1">
                <Star className="h-4 w-4" />
                Brightwave
              </div>
            </th>
            <th className="py-4 px-4 text-center text-sm font-semibold text-bw-gray-200 w-36">
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
                    className="pt-6 pb-2 px-4 text-xs font-semibold uppercase tracking-wider text-bw-gray-300"
                  >
                    {category}
                  </td>
                </tr>
              )}
              {catRows.map((row, i) => (
                <tr key={i} className="border-b border-bw-gray-700 hover:bg-white transition-colors">
                  <td className="py-3 px-4 text-sm text-bw-gray-200">
                    {row.feature}
                    {row.note && (
                      <span className="block text-xs text-bw-gray-300 mt-0.5">{row.note}</span>
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
