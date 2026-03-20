interface Stat {
  value: string
  label: string
  context?: string
}

interface StatBarProps {
  stats: Stat[]
  variant?: 'default' | 'inline' | 'cards'
}

export function StatBar({ stats, variant = 'default' }: StatBarProps) {
  if ((stats ?? []).length === 0) return null

  if (variant === 'cards') {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {(stats ?? []).map((stat, i) => (
          <div
            key={i}
            className="rounded-lg border border-bw-gray-200 bg-white p-6 text-center"
          >
            <div className="text-3xl font-bold text-bw-yellow-600">{stat.value}</div>
            <div className="mt-2 text-sm text-bw-gray-600">{stat.label}</div>
            {stat.context && (
              <div className="mt-1 text-xs text-bw-gray-500">{stat.context}</div>
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-wrap justify-center gap-12 py-8">
      {(stats ?? []).map((stat, i) => (
        <div key={i} className="text-center">
          <div className="text-4xl font-bold text-bw-yellow-600">{stat.value}</div>
          <div className="mt-1 text-sm text-bw-gray-600">{stat.label}</div>
          {stat.context && (
            <div className="mt-0.5 text-xs text-bw-gray-500">{stat.context}</div>
          )}
        </div>
      ))}
    </div>
  )
}
