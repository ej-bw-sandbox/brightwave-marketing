import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Brightwave - AI Financial Research',
    template: '%s | Brightwave',
  },
  description: 'AI-powered financial research platform for investment professionals.',
  metadataBase: new URL('https://www.brightwave.io'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-bw-gray-800 text-bw-gray-50 antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
