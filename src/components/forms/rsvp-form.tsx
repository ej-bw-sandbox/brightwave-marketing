'use client'

export function RsvpForm({ eventId }: { eventId?: string }) {
  return (
    <form className="space-y-4 max-w-md">
      <input name="email" type="email" placeholder="Work email" required className="w-full rounded-md border border-neutral-700 bg-surface-elevated p-3 text-sm" />
      <input name="name" placeholder="Full name" required className="w-full rounded-md border border-neutral-700 bg-surface-elevated p-3 text-sm" />
      <button type="submit" className="w-full rounded-md bg-brand-400 px-4 py-3 text-sm font-medium text-black">
        Register
      </button>
    </form>
  )
}
