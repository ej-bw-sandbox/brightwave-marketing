import { Suspense } from 'react';
import { client } from '@/lib/sanity/client';
import { demoPersonaQuery } from '@/lib/sanity/queries/demo';
import type { DemoPersonaConfig } from '@/lib/demo-utils';
import DemoPage from '@/components/demo/DemoPage';

export const metadata = {
  title: 'Live Demo | Brightwave',
  description:
    "Experience Brightwave's AI research platform in a live personalized demo.",
  robots: { index: false, follow: false },
};

const DEFAULT_PERSONA: DemoPersonaConfig = {
  anamPersonaId: 'c1298d71-48b2-40c9-98d1-e3d7c0bf8030',
  llmModel: 'claude-3-5-sonnet-20241022',
  calendarLink: process.env.NEXT_PUBLIC_CALENDLY_WORKSHOP_URL || '',
};

interface DemoPageRouteProps {
  params: Promise<{ personaId: string }>;
}

async function fetchPersonaConfig(personaId: string): Promise<DemoPersonaConfig> {
  try {
    const doc = await client.fetch(
      demoPersonaQuery,
      { personaId },
      { next: { tags: ['demoPersona'], revalidate: 60 } },
    );

    if (!doc) {
      return DEFAULT_PERSONA;
    }

    return {
      personaId: doc.personaId || undefined,
      anamPersonaId: doc.anamPersonaId || DEFAULT_PERSONA.anamPersonaId,
      llmModel: doc.llmModel || DEFAULT_PERSONA.llmModel,
      knowledgeBase: doc.knowledgeBase || undefined,
      greeting: doc.greeting || undefined,
      calendarLink:
        doc.calendarLink ||
        process.env.NEXT_PUBLIC_CALENDLY_WORKSHOP_URL ||
        '',
    };
  } catch (err) {
    console.error('[DemoPage] Sanity fetch error:', err);
    return DEFAULT_PERSONA;
  }
}

export default async function DemoPageRoute({ params }: DemoPageRouteProps) {
  const { personaId } = await params;
  const persona = await fetchPersonaConfig(personaId);

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0a0a12] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-white/10 border-t-indigo-500 rounded-full animate-spin" />
        </div>
      }
    >
      <DemoPage persona={persona} />
    </Suspense>
  );
}
