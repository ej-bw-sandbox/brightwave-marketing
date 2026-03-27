import Image from 'next/image'
import { urlFor } from './image'
import type { PortableTextComponents } from '@portabletext/react'

/**
 * Shared PortableText components for server-rendered pages.
 * Handles image blocks so they don't trigger "Unknown block type" warnings.
 * For full rich-text rendering (headings, links, callouts, etc.),
 * use PortableTextRenderer from @/components/sections/PortableTextRenderer.
 */
export const ptComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      return (
        <Image
          src={urlFor(value).width(800).quality(85).url()}
          alt={value.alt || ''}
          width={800}
          height={450}
          loading="lazy"
          className="my-4 rounded-lg w-full"
        />
      )
    },
  },
}
