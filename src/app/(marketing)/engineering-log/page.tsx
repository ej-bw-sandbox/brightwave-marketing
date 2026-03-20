import { ContentPostIndex } from '@/components/sections/ContentPostIndex'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Engineering Log',
  description: 'Behind the scenes of building Brightwave.',
}

export default function EngineeringLogIndexPage() {
  return (
    <ContentPostIndex
      category="engineering-log"
      basePath="/engineering-log"
      headline="Engineering Log"
      subheadline="Behind the scenes of building Brightwave."
      emptyMessage="No engineering log posts found."
    />
  )
}
