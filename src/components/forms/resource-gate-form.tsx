'use client'

import { useState } from 'react'

interface ResourceGateFormProps {
  resourceId: string
  fileUrl: string
}

export function ResourceGateForm({ resourceId, fileUrl }: ResourceGateFormProps) {
  const [unlocked, setUnlocked] = useState(false)

  if (unlocked) {
    return (
      <a href={fileUrl} target="_blank" rel="noopener noreferrer"
         className="inline-flex items-center gap-2 bg-brand-400 text-black px-6 py-3 rounded-md font-semibold">
        Download Resource
      </a>
    )
  }

  return (
    <form className="space-y-4 max-w-md">
      <input name="email" type="email" placeholder="Work email" required className="w-full rounded-md border border-neutral-700 bg-surface-elevated p-3 text-sm" />
      <input name="name" placeholder="Full name" required className="w-full rounded-md border border-neutral-700 bg-surface-elevated p-3 text-sm" />
      <button type="submit" className="w-full rounded-md bg-brand-400 px-4 py-3 text-sm font-medium text-black">
        Get Access
      </button>
    </form>
  )
}
