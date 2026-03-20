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
         className="inline-flex items-center gap-2 bg-bw-yellow-500 text-bw-gray-800 px-6 py-3 rounded-md font-semibold">
        Download Resource
      </a>
    )
  }

  return (
    <form className="space-y-4 max-w-md">
      <input name="email" type="email" placeholder="Work email" required className="w-full rounded-md border border-bw-gray-200 bg-bw-gray-700 p-3 text-sm" />
      <input name="name" placeholder="Full name" required className="w-full rounded-md border border-bw-gray-200 bg-bw-gray-700 p-3 text-sm" />
      <button type="submit" className="w-full rounded-md bg-bw-yellow-500 px-4 py-3 text-sm font-medium text-bw-gray-800">
        Get Access
      </button>
    </form>
  )
}
