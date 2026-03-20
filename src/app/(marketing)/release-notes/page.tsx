import { ContentPostIndex } from '@/components/sections/ContentPostIndex'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Release Notes',
  description: 'The latest product updates and improvements to Brightwave.',
}

export default function ReleaseNotesIndexPage() {
  return (
    <ContentPostIndex
      category="release-notes"
      basePath="/release-notes"
      headline="Release Notes"
      subheadline="The latest product updates and improvements to Brightwave."
      emptyMessage="No release notes found."
    />
  )
}
