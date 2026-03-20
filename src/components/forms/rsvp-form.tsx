'use client'

export function RsvpForm({ eventId }: { eventId?: string }) {
  return (
    <form className="space-y-4 max-w-md">
      <input name="email" type="email" placeholder="Work email" required className="w-full rounded-md border border-bw-gray-600 bg-bw-gray-700 p-3 text-sm" />
      <input name="name" placeholder="Full name" required className="w-full rounded-md border border-bw-gray-600 bg-bw-gray-700 p-3 text-sm" />
      <button type="submit" className="w-full rounded-md bg-bw-yellow-500 px-4 py-3 text-sm font-medium text-bw-gray-800">
        Register
      </button>
    </form>
  )
}
