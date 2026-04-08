export const demoPersonaQuery = `
  *[_type == "demoPersona" && personaId == $personaId][0]{
    personaId,
    anamPersonaId,
    llmModel,
    knowledgeBase,
    greeting,
    calendarLink
  }
`;
