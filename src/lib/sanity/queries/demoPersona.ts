export const DEMO_PERSONA_QUERY = `*[_type == "demoPersona" && personaId == $personaId && isActive == true][0]{
  personaId,
  anamPersonaId,
  anamAvatarId,
  anamVoiceId,
  anamPersonaName,
  llmModel,
  systemPromptOverride,
  knowledgeBaseOverride,
  greeting,
  calendarLink,
  qualificationThreshold
}`

/**
 * Aliased GROQ query for the page-level server component.
 * Maps knowledgeBaseOverride -> knowledgeBase to match the DemoPersonaConfig interface.
 */
export const demoPersonaQuery = `
  *[_type == "demoPersona" && personaId == $personaId && isActive == true][0]{
    personaId,
    anamPersonaId,
    anamAvatarId,
    anamVoiceId,
    anamPersonaName,
    llmModel,
    "knowledgeBase": knowledgeBaseOverride,
    systemPromptOverride,
    greeting,
    calendarLink,
    qualificationThreshold
  }
`;
