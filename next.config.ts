import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'cdn.prod.website-files.com',
      },
    ],
  },

  async redirects() {
    return [
      { source: '/comparison/:slug', destination: '/comparisons/:slug', permanent: true },
      { source: '/comparison', destination: '/comparisons', permanent: true },
    ]
  },

  async headers() {
    return [
      {
        source: '/studio/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
          { key: 'Content-Security-Policy', value: 'frame-ancestors https://*.sanity.io https://www.sanity.io' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      {
        source: '/((?!studio).*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },

  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}

export default nextConfig
