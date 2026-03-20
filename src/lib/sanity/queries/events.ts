import { client } from '../client'

export const eventsIndexQuery = `{
  "upcoming": *[_type == "virtualEvent" && startDate > now()] | order(startDate asc) {
    title, slug, startDate, endDate, city, venue, isVirtual, format, thumbnailImage, description
  },
  "past": *[_type == "virtualEvent" && startDate <= now()] | order(startDate desc) [0..11] {
    title, slug, startDate, city, isVirtual, format, thumbnailImage, recordingUrl
  }
}`

export const eventQuery = `
  *[_type == "virtualEvent" && slug.current == $slug][0]{
    ..., speakers
  }
`

export const eventSlugsQuery = `*[_type == "virtualEvent" && defined(slug.current)]{ "slug": slug.current }`
