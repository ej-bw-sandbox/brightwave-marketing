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
            className="rounded-xl border border-bw-gray-600 bg-bw-gray-700 p-6 text-center"
          >
            <div className="text-3xl font-bold text-bw-yellow-500">{stat.value}</div>
            <div className="mt-2 text-sm text-bw-gray-200">{stat.label}</div>
            {stat.context && (
              <div className="mt-1 text-xs text-bw-gray-300">{stat.context}</div>
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
          <div className="text-4xl font-bold text-bw-yellow-500">{stat.value}</div>
          <div className="mt-1 text-sm text-bw-gray-200">{stat.label}</div>
          {stat.context && (
            <div className="mt-0.5 text-xs text-bw-gray-300">{stat.context}</div>
          )}
        </div>
      ))}
    </div>
  )
}
