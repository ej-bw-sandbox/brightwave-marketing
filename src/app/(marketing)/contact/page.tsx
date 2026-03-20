import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact | Brightwave',
  description: 'Get in touch with the Brightwave team. Schedule a demo or start a free trial.',
}

export default function ContactPage() {
  return (
    <>
      <section className="c-section cc-hero">
        <div className="c-container">
          <div className="flex justify-between items-end gap-10 border-b border-bw-gray-200 pb-10">
            <h1 className="c-title-3 text-bw-gray-800">Get in Touch</h1>
          </div>
          <p className="c-text-3 text-bw-gray-500 mt-10 max-w-text">
            Interested in Brightwave? Schedule a demo, start a free trial, or ask us anything.
          </p>
        </div>
      </section>

      <section className="pb-24 max-w-3xl mx-auto px-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <a
            href="mailto:sales@brightwave.io"
            className="group rounded-lg border border-bw-gray-200 bg-white p-6 text-center transition-all hover:border-bw-gray-800 hover:bg-bw-gray-700"
          >
            <h3 className="text-lg font-semibold text-bw-gray-800 group-hover:text-white transition-colors">Sales</h3>
            <p className="mt-2 text-sm text-bw-gray-500 group-hover:text-bw-gray-600 transition-colors">sales@brightwave.io</p>
          </a>
          <a
            href="mailto:support@brightwave.io"
            className="group rounded-lg border border-bw-gray-200 bg-white p-6 text-center transition-all hover:border-bw-gray-800 hover:bg-bw-gray-700"
          >
            <h3 className="text-lg font-semibold text-bw-gray-800 group-hover:text-white transition-colors">Support</h3>
            <p className="mt-2 text-sm text-bw-gray-500 group-hover:text-bw-gray-600 transition-colors">support@brightwave.io</p>
          </a>
        </div>
      </section>
    </>
  )
}
