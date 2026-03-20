import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },

  async redirects() {
    return [
      { source: '/comparison/:slug', destination: '/vs/:slug', permanent: true },
      { source: '/firm-types/:slug', destination: '/solutions/:slug', permanent: true },
      { source: '/i-am-a/:slug', destination: '/for/:slug', permanent: true },
      { source: '/comparison', destination: '/vs', permanent: true },
      { source: '/firm-types', destination: '/solutions', permanent: true },
      { source: '/i-am-a', destination: '/for', permanent: true },
    ]
  },

  async headers() {
    return [
      {
        source: '/studio/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
        ],
      },
      {
        source: '/(.*)',
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
