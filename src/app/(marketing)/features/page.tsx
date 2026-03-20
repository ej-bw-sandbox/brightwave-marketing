import { client } from '@/lib/sanity/client'
import { FeatureBlock } from '@/components/sections/FeatureBlock'
import { Hero } from '@/components/sections/Hero'
import { CtaSection } from '@/components/sections/CtaSection'
import type { Metadata } from 'next'

const featuresQuery = `*[_type == "platformFeature"] | order(title asc) {
  title, "slug": slug.current, tagline, heroH1, heroImage, stats, tags
}`

export const metadata: Metadata = {
  title: 'Platform Features',
  description: 'Explore the AI-powered capabilities of the Brightwave financial research platform.',
}

export default async function FeaturesPage() {
  let features: any[] = []
  try {
    features = await client.fetch(featuresQuery, {}, { next: { tags: ['platformFeature'] } }) ?? []
  } catch {
    features = []
  }

  return (
    <>
      <Hero
        headline="Platform Features"
        subheadline="Purpose-built AI capabilities for investment research and due diligence."
        size="default"
        gradient={false}
      />

      <FeatureBlock features={features} columns={3} />

      <CtaSection
        headline="Experience the full platform"
        subheadline="See how these features work together to accelerate your research."
        ctas={[
          { label: 'Schedule a Demo', url: '/contact', style: 'primary' },
          { label: 'View Case Studies', url: '/case-studies', style: 'secondary' },
        ]}
        variant="brand"
      />
    </>
  )
}
