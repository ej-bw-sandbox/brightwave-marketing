/**
 * Brightwave Sales Knowledge Base
 *
 * Product facts, features, pricing tiers, and demo scripts for the
 * digital salesperson avatar. This module is the single source of truth
 * for all Brightwave product information used in avatar conversations.
 */

export const COMPANY_OVERVIEW = {
  name: 'Brightwave',
  tagline: 'AI-powered research for private equity and financial services',
  description:
    'Brightwave is an agentic AI research platform purpose-built for private equity ' +
    'and financial services professionals. It automates the most time-intensive parts ' +
    'of investment research by deploying multi-agent AI systems that reason over ' +
    'documents, synthesize findings, and generate institutional-grade analysis.',
  founded: 2023,
  headquarters: 'New York, NY',
  website: 'https://brightwave.io',
} as const;

export const KEY_FEATURES = [
  {
    name: 'Multi-Agent Research',
    description:
      'Deploy teams of specialized AI agents that work in parallel to research ' +
      'companies, industries, and investment themes. Each agent handles a specific ' +
      'research workstream — financial analysis, market sizing, competitive landscape, ' +
      'risk assessment — then findings are synthesized into a unified report.',
  },
  {
    name: 'Document Analysis',
    description:
      'Upload and analyze any financial document — 10-Ks, CIMs, credit agreements, ' +
      'pitch decks, earnings transcripts. Brightwave extracts key data points, ' +
      'identifies risks, and cross-references across your entire document library.',
  },
  {
    name: 'Financial Document Search',
    description:
      'Semantic search across your uploaded documents and public filings. Ask ' +
      'questions in natural language and get precise answers with source citations. ' +
      'Search understands financial terminology, entity relationships, and temporal context.',
  },
  {
    name: 'Report Generation',
    description:
      'Generate investment memos, industry overviews, competitive analyses, and ' +
      'due diligence reports. Output is formatted for institutional consumption ' +
      'with proper sourcing, data tables, and executive summaries.',
  },
  {
    name: 'Automated Workflows',
    description:
      'Set up recurring research workflows that run on schedule or trigger on events. ' +
      'Monitor portfolio companies, track industry developments, and get alerts ' +
      'when material changes occur in your coverage universe.',
  },
  {
    name: 'Knowledge Graph',
    description:
      'Brightwave builds a persistent knowledge graph from every document and ' +
      'research session. Entity relationships, financial metrics, and qualitative ' +
      'insights accumulate over time, making each subsequent query smarter.',
  },
] as const;

export const TARGET_CUSTOMERS = [
  {
    segment: 'Private Equity Firms',
    description:
      'Mid-market to mega-cap PE firms running deal sourcing, due diligence, ' +
      'and portfolio monitoring. Primary users are associates and VPs who spend ' +
      '60%+ of their time on research and analysis.',
    useCases: [
      'CIM screening and triage',
      'Industry and market research',
      'Due diligence acceleration',
      'Portfolio company monitoring',
      'Investment committee memo preparation',
    ],
  },
  {
    segment: 'Hedge Funds',
    description:
      'Fundamental equity and credit hedge funds that need rapid, deep research ' +
      'on public and private companies. Analysts use Brightwave to accelerate ' +
      'idea generation and thesis validation.',
    useCases: [
      'Earnings analysis and monitoring',
      'Thematic research',
      'Company deep dives',
      'SEC filing analysis',
      'Competitive intelligence',
    ],
  },
  {
    segment: 'Investment Banks',
    description:
      'M&A advisory and capital markets teams that need fast, accurate research ' +
      'for pitch books, fairness opinions, and deal execution.',
    useCases: [
      'Comparable company analysis',
      'Industry landscape mapping',
      'Precedent transaction research',
      'Pitch book content generation',
      'Client briefing preparation',
    ],
  },
  {
    segment: 'Credit Funds',
    description:
      'Direct lending, distressed debt, and structured credit funds that analyze ' +
      'credit agreements, financial covenants, and borrower performance.',
    useCases: [
      'Credit agreement analysis',
      'Covenant monitoring',
      'Borrower financial tracking',
      'Sector credit risk assessment',
      'Restructuring research',
    ],
  },
] as const;

export const VALUE_PROPOSITIONS = [
  {
    claim: '10x Faster Research',
    description:
      'What takes an analyst 8-10 hours of manual research, Brightwave completes ' +
      'in under an hour. Multi-agent parallelism means you get comprehensive ' +
      'coverage without the time investment.',
    proof:
      'Early customers report reducing initial deal screening from 2 days to ' +
      '2 hours, and due diligence research prep from 2 weeks to 2 days.',
  },
  {
    claim: 'Institutional-Grade Sourcing',
    description:
      'Every insight is traceable to a specific source document, page, and passage. ' +
      'Brightwave never hallucinates financial data — it only reports what it can ' +
      'cite from your uploaded documents and verified public sources.',
    proof:
      'All outputs include inline citations with document references, page numbers, ' +
      'and direct quotes. Audit trails are maintained for compliance review.',
  },
  {
    claim: 'AI That Reasons Over Documents',
    description:
      'Unlike generic chatbots that summarize text, Brightwave agents perform ' +
      'multi-step reasoning — comparing metrics across time periods, identifying ' +
      'contradictions between sources, and drawing conclusions that require ' +
      'synthesizing information from multiple documents.',
    proof:
      'The platform handles cross-document analysis (e.g., comparing a CIM\'s ' +
      'projections against historical financials and industry benchmarks) in a ' +
      'single workflow.',
  },
] as const;

export const PRICING = {
  model: 'Enterprise subscription',
  tiers: [
    {
      name: 'Growth',
      description:
        'For small teams getting started with AI-powered research. Includes ' +
        'core document analysis, search, and report generation.',
      pricing: 'Contact for pricing',
      features: [
        'Up to 5 seats',
        'Document analysis and search',
        'Basic report generation',
        'Email support',
      ],
    },
    {
      name: 'Professional',
      description:
        'For established teams that need multi-agent research workflows, ' +
        'automated monitoring, and advanced analytics.',
      pricing: 'Contact for pricing',
      features: [
        'Up to 25 seats',
        'Multi-agent research workflows',
        'Automated portfolio monitoring',
        'Custom report templates',
        'Knowledge graph',
        'Priority support',
        'SSO / SAML',
      ],
    },
    {
      name: 'Enterprise',
      description:
        'For large organizations requiring dedicated infrastructure, custom ' +
        'integrations, and white-glove onboarding.',
      pricing: 'Contact for pricing',
      features: [
        'Unlimited seats',
        'Dedicated infrastructure',
        'Custom model fine-tuning',
        'API access',
        'Custom integrations (Salesforce, Bloomberg, etc.)',
        'Dedicated customer success manager',
        'SLA guarantee',
        'On-premise deployment option',
      ],
    },
  ],
  cta: 'Contact sales@brightwave.io or visit brightwave.io/demo to schedule a demo.',
} as const;

export const COMPETITIVE_DIFFERENTIATION = [
  {
    competitor: 'ChatGPT / Generic LLMs',
    brightwaveAdvantage:
      'ChatGPT is a general-purpose assistant. Brightwave is purpose-built for ' +
      'financial research with domain-specific agents, document processing pipelines, ' +
      'and institutional-grade citation. ChatGPT cannot reason across a library of ' +
      'uploaded financial documents or generate compliant investment memos.',
  },
  {
    competitor: 'Notion AI / Workspace AI',
    brightwaveAdvantage:
      'Notion AI helps with note-taking and text generation within a workspace. ' +
      'Brightwave is a dedicated research platform that understands financial ' +
      'documents, builds knowledge graphs, and runs multi-agent research workflows. ' +
      'The depth of financial domain expertise is incomparable.',
  },
  {
    competitor: 'Bloomberg Terminal AI',
    brightwaveAdvantage:
      'Bloomberg provides market data and news. Brightwave focuses on deep document ' +
      'analysis and research synthesis. They are complementary — Brightwave can ' +
      'ingest Bloomberg data as an input source. Brightwave excels at analyzing ' +
      'private documents (CIMs, credit agreements) that Bloomberg does not cover.',
  },
  {
    competitor: 'AlphaSense / Tegus',
    brightwaveAdvantage:
      'AlphaSense and Tegus provide search and expert transcripts. Brightwave ' +
      'goes beyond search — it performs multi-step reasoning, generates full ' +
      'research reports, and automates recurring workflows. Brightwave is an ' +
      'AI analyst, not just a search engine.',
  },
] as const;

export const DEMO_SCRIPTS = {
  quickDemo: {
    name: 'Quick Product Overview (2 minutes)',
    script: [
      'Hello! I\'m the Brightwave AI assistant. Let me show you how Brightwave ' +
      'is transforming investment research.',
      'Brightwave is an agentic AI research platform built specifically for ' +
      'private equity and financial services. Think of it as having a team of ' +
      'AI analysts that can research companies, analyze documents, and generate ' +
      'reports in a fraction of the time.',
      'Our customers — PE firms, hedge funds, and investment banks — typically ' +
      'see a 10x improvement in research speed. What used to take days now ' +
      'takes hours.',
      'What makes us different from ChatGPT or generic AI tools is that we\'re ' +
      'purpose-built for finance. Every output is sourced, cited, and formatted ' +
      'for institutional use. We never hallucinate financial data.',
      'Would you like me to walk through a specific use case, or do you have ' +
      'questions about how Brightwave could fit into your workflow?',
    ],
  },
  deepDive: {
    name: 'Deep Dive Demo (10 minutes)',
    script: [
      'Welcome to Brightwave. I\'d like to walk you through the full platform ' +
      'and show you how it handles real-world investment research workflows.',
      'Let\'s start with document analysis. You can upload any financial document ' +
      '— 10-Ks, CIMs, credit agreements, pitch decks. Brightwave reads the entire ' +
      'document, extracts key data points, and adds it to your knowledge graph.',
      'Now let\'s look at multi-agent research. When you ask a complex question, ' +
      'Brightwave deploys multiple specialized agents that work in parallel. One ' +
      'agent handles financial analysis, another does competitive research, a third ' +
      'assesses market size — then findings are synthesized into one coherent report.',
      'Every claim in the output is backed by a source citation. Click any citation ' +
      'to see the exact passage in the original document. This is critical for ' +
      'institutional use — your IC memo needs to be auditable.',
      'For ongoing coverage, you can set up automated monitoring workflows. Track ' +
      'portfolio companies, watch for material events, and get alerts when something ' +
      'needs your attention.',
      'Let\'s talk about integration. Brightwave fits into your existing workflow. ' +
      'Export to Word, PowerPoint, or PDF. API access for custom integrations. SSO ' +
      'for enterprise security requirements.',
      'Our pricing is based on team size and usage. We offer Growth, Professional, ' +
      'and Enterprise tiers. I\'d recommend scheduling a call with our sales team ' +
      'to discuss which tier fits your needs.',
      'Do you have any questions about what you\'ve seen?',
    ],
  },
} as const;

/**
 * Builds a single text block from all KB sections for injection into system prompts.
 * Used as the default knowledge base when no `knowledgeBaseOverride` is provided.
 */
export function buildFullKBText(): string {
  const sections: string[] = [];

  // Company overview
  sections.push(
    `## About ${COMPANY_OVERVIEW.name}\n` +
      `${COMPANY_OVERVIEW.description}\n` +
      `Tagline: ${COMPANY_OVERVIEW.tagline}\n` +
      `Founded: ${COMPANY_OVERVIEW.founded} | HQ: ${COMPANY_OVERVIEW.headquarters}\n` +
      `Website: ${COMPANY_OVERVIEW.website}`,
  );

  // Key features
  sections.push(
    `## Key Features\n` +
      KEY_FEATURES.map((f) => `- **${f.name}:** ${f.description}`).join('\n'),
  );

  // Target customers
  sections.push(
    `## Target Customers\n` +
      TARGET_CUSTOMERS.map(
        (c) =>
          `### ${c.segment}\n${c.description}\nUse cases: ${c.useCases.join(', ')}`,
      ).join('\n\n'),
  );

  // Value propositions
  sections.push(
    `## Value Propositions\n` +
      VALUE_PROPOSITIONS.map(
        (v) =>
          `### ${v.claim}\n${v.description}\nProof: ${v.proof}`,
      ).join('\n\n'),
  );

  // Pricing
  sections.push(
    `## Pricing\nModel: ${PRICING.model}\n` +
      PRICING.tiers
        .map(
          (t) =>
            `### ${t.name}\n${t.description}\nPricing: ${t.pricing}\nFeatures: ${t.features.join(', ')}`,
        )
        .join('\n\n') +
      `\n\n${PRICING.cta}`,
  );

  // Competitive differentiation
  sections.push(
    `## Competitive Differentiation\n` +
      COMPETITIVE_DIFFERENTIATION.map(
        (c) => `### vs. ${c.competitor}\n${c.brightwaveAdvantage}`,
      ).join('\n\n'),
  );

  return sections.join('\n\n');
}

/**
 * Builds the default system prompt for the sales avatar.
 * Includes the full KB, conversation guidelines, and qualification instructions.
 */
export function buildDefaultSystemPrompt(prospect?: {
  name?: string;
  email?: string;
  company?: string;
  role?: string;
  aum?: string;
  firmType?: string;
}): string {
  const kb = buildFullKBText();

  const personalization = prospect
    ? `\n## Current Prospect\nYou are speaking with ${prospect.name || 'a prospect'}` +
      `${prospect.company ? ` from ${prospect.company}` : ''}` +
      `${prospect.role ? `, a ${prospect.role}` : ''}` +
      `${prospect.firmType ? ` at a ${prospect.firmType} firm` : ''}` +
      `${prospect.aum ? ` with ${prospect.aum} AUM` : ''}.` +
      `${prospect.email ? ` Email: ${prospect.email}` : ''}\n`
    : '';

  return `You are Max, Brightwave's AI sales guide. You are a knowledgeable, professional, and consultative salesperson who helps prospects understand how Brightwave can transform their investment research workflow.

${personalization}

## Knowledge Base
${kb}

## Conversation Guidelines
- Keep responses concise — under 60 words when possible.
- Address the prospect by first name when known.
- Drive the conversation forward: always end with a question that advances the sale.
- Be consultative, not pushy. Understand their workflow before pitching features.
- Never make up features or capabilities not listed in the knowledge base.
- Never mention competitors by name unless the prospect brings them up first.
- If asked about pricing, encourage scheduling a call for a tailored quote.

## Conversation Playbook
1. OPEN: Warm greeting, establish rapport, ask about their role and current workflow.
2. QUALIFY: Understand their firm type, team size, AUM, current research process, and pain points.
3. PITCH: Map their pain points to specific Brightwave features and value propositions.
4. HANDLE OBJECTIONS: Address concerns with proof points and customer evidence.
5. CLOSE: Suggest scheduling a deeper demo or workshop with the team.

## Qualification Scoring
Internally track a qualification score from 0-100 based on these signals. Do NOT share the score with the prospect.

### Fit Signals (up to 50 points)
- AUM $500M+: +15 points
- Firm type is PE, credit, growth equity, or hedge fund: +15 points
- Team size 5+: +10 points
- Currently doing manual research: +10 points

### Intent Signals (up to 50 points)
- Mentions specific pain points: +15 points
- Asks about pricing or packaging: +10 points
- Mentions timeline or urgency: +10 points
- Asks about integration or security: +10 points
- Requests a follow-up meeting: +5 points

When the conversation ends naturally (the user says goodbye, thanks you, or the session is wrapping up), include a JSON qualification block at the end of your final message in exactly this format:

{"qualification":{"score":<number>,"qualified":<boolean>,"reason":"<one-line summary>","fitSignals":["<signal1>","<signal2>"],"intentSignals":["<signal1>","<signal2>"]}}`;
}
