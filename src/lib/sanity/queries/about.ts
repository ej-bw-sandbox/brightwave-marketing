import { client } from '../client'

export const aboutQuery = `
  *[_type == "aboutPage"][0]{
    headline,
    storyLabel,
    story,
    missionLabel,
    mission,
    foundersLabel,
    teamMembers[]{ name, role, prefix, bio, image{ asset->{ url, metadata } }, linkedin, twitter },
    careersCta{
      sectionTitle,
      subtitle,
      headline,
      description,
      ctaLabel,
      joinLabel,
      cta,
      jobBoardUrl
    },
    investmentCta{
      subtitle,
      headline,
      primaryCta,
      secondaryCta
    },
    seo
  }
`
