'use client'

import { useActionState } from 'react'

type FormState = {
  success: boolean
  message?: string
}

async function submitContactForm(_prev: FormState, formData: FormData): Promise<FormState> {
  // Server action will be implemented to POST to HubSpot API
  return { success: true, message: 'Thank you! We will be in touch shortly.' }
}

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, { success: false })

  if (state.success) {
    return (
      <div className="text-center py-12">
        <h3 className="text-2xl font-bold text-bw-yellow-500">Thank you!</h3>
        <p className="text-bw-gray-200 mt-2">{state.message}</p>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <input name="firstName" placeholder="First Name" required className="rounded-md border border-bw-gray-200 bg-bw-gray-700 p-3 text-sm" />
        <input name="lastName" placeholder="Last Name" required className="rounded-md border border-bw-gray-200 bg-bw-gray-700 p-3 text-sm" />
      </div>
      <input name="email" type="email" placeholder="Work Email" required className="w-full rounded-md border border-bw-gray-200 bg-bw-gray-700 p-3 text-sm" />
      <input name="company" placeholder="Company" required className="w-full rounded-md border border-bw-gray-200 bg-bw-gray-700 p-3 text-sm" />
      <button type="submit" disabled={isPending} className="w-full rounded-md bg-bw-yellow-500 px-4 py-3 text-sm font-medium text-bw-gray-800 hover:bg-bw-yellow-550">
        {isPending ? 'Submitting...' : 'Request a Demo'}
      </button>
    </form>
  )
}
