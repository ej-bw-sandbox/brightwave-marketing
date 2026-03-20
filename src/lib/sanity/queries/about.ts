import { client } from '../client'

export const aboutQuery = `
  *[_type == "aboutPage"][0]{
    headline, story, mission,
    teamMembers[]{ name, role, prefix, bio, image{ asset->{ url, metadata } }, linkedin, twitter },
    careersCta, seo
  }
`
