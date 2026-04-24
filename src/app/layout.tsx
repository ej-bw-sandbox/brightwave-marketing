import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Agentation } from 'agentation'
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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Webflow CSS - loaded verbatim from the export */}
        <link href="/webflow-css/normalize.css" rel="stylesheet" type="text/css" />
        <link href="/webflow-css/components.css" rel="stylesheet" type="text/css" />
        <link href="/webflow-css/brightwave.css" rel="stylesheet" type="text/css" />
        <link href="/webflow-css/inline-overrides.css" rel="stylesheet" type="text/css" />
        {/* Prevent FOUC: apply dark mode before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme:dark)').matches;if(d){document.documentElement.setAttribute('theme','dark');document.documentElement.classList.add('u-dark-mode')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="bg-white text-bw-gray-800 antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
        {process.env.NODE_ENV === 'development' && <Agentation />}
      </body>
    </html>
  )
}
