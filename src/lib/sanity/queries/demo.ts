/**
 * GROQ queries for the demo persona document type.
 *
 * The canonical query lives in ./demoPersona.ts (DEMO_PERSONA_QUERY).
 * This module provides a friendlier alias used by the page-level server
 * component at /demo/[personaId]/page.tsx.  Field names are aliased to
 * match the DemoPersonaConfig interface in @/lib/demo-utils.
 */

export { DEMO_PERSONA_QUERY } from './demoPersona'

export const demoPersonaQuery = `
  *[_type == "demoPersona" && personaId == $personaId && isActive == true][0]{
    personaId,
    anamPersonaId,
    llmModel,
    "knowledgeBase": knowledgeBaseOverride,
    systemPromptOverride,
    greeting,
    calendarLink,
    qualificationThreshold
  }
`;
