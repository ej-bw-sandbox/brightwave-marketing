import { createImageUrlBuilder } from '@sanity/image-url'
import { client } from './client'

const builder = createImageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

export function imageUrl(source: any, width = 1200, height?: number, quality = 85) {
  if (!source) return ''
  let img = urlFor(source).width(width).quality(quality).auto('format')
  if (height) img = img.height(height).fit('crop')
  return img.url()
}

export function assetUrl(image: any, fallback = ''): string {
  return image?.asset?.url || (image ? imageUrl(image) : fallback)
}
