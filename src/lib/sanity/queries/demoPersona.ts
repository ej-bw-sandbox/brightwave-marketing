export const DEMO_PERSONA_QUERY = `*[_type == "demoPersona" && personaId == $personaId && isActive == true][0]{
  personaId,
  anamPersonaId,
  llmModel,
  systemPromptOverride,
  knowledgeBaseOverride,
  greeting,
  calendarLink,
  qualificationThreshold
}`
