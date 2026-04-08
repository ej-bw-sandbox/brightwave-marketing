'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import type { ProspectContext } from '@/lib/demo-utils';
import { getFirstName } from '@/lib/demo-utils';

type QualificationResult = 'qualified' | 'unqualified' | 'pending' | 'error';

interface PostCallScreenProps {
  prospect: ProspectContext;
  sessionId: string | null;
  calendarLink: string;
}

export default function PostCallScreen({
  prospect,
  sessionId,
  calendarLink,
}: PostCallScreenProps) {
  const [qualification, setQualification] = useState<QualificationResult>('pending');
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const firstName = getFirstName(prospect);

  const resolvedCalendarLink =
    calendarLink || process.env.NEXT_PUBLIC_CALENDLY_WORKSHOP_URL || '#';
  const trialLink = 'https://app.brightwave.io/register';

  // Poll for qualification result
  const pollQualification = useCallback(async () => {
    if (!sessionId) {
      setQualification('unqualified');
      return;
    }

    try {
      const res = await fetch(
        `/api/demo/qualification?sessionId=${encodeURIComponent(sessionId)}`,
      );
      if (!res.ok) {
        if (res.status === 404) return; // Not ready yet, keep polling
        throw new Error(`Qualification API returned ${res.status}`);
      }
      const data = await res.json();
      if (data.result === 'qualified' || data.result === 'unqualified') {
        setQualification(data.result);
        if (pollRef.current) {
          clearInterval(pollRef.current);
          pollRef.current = null;
        }
      }
    } catch {
      // Keep polling on transient errors
    }
  }, [sessionId]);

  useEffect(() => {
    // Poll every 5 seconds
    pollQualification();
    pollRef.current = setInterval(pollQualification, 5000);

    // Also listen for custom window event from Agent C
    const handleQualification = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.result === 'qualified' || detail?.result === 'unqualified') {
        setQualification(detail.result);
        if (pollRef.current) {
          clearInterval(pollRef.current);
          pollRef.current = null;
        }
      }
    };
    window.addEventListener('demo:qualification', handleQualification);

    // Timeout after 30s -- default to unqualified
    const timeout = setTimeout(() => {
      setQualification((prev) => (prev === 'pending' ? 'unqualified' : prev));
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
    }, 30000);

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
      window.removeEventListener('demo:qualification', handleQualification);
      clearTimeout(timeout);
    };
  }, [pollQualification]);

  return (
    <div className="min-h-screen bg-[#0a0a12] flex flex-col items-center justify-center px-4">
      {/* Loading state */}
      {qualification === 'pending' && (
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-indigo-400 animate-spin" />
          <p className="text-white/60 text-sm">Preparing your results...</p>
        </div>
      )}

      {/* Qualified */}
      {qualification === 'qualified' && (
        <div className="flex flex-col items-center gap-6 max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Great news{firstName ? `, ${firstName}` : ''}! You&apos;re a great fit.
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Based on our conversation, Brightwave can deliver significant value for
              {prospect.company ? ` ${prospect.company}` : ' your team'}. Let&apos;s set up a
              hands-on workflow workshop tailored to your use cases.
            </p>
          </div>
          <Button asChild size="lg" className="text-base font-semibold shadow-lg">
            <a
              href={resolvedCalendarLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              Book Your Workflow Workshop
              <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
        </div>
      )}

      {/* Unqualified / Declined / Error */}
      {(qualification === 'unqualified' || qualification === 'error') && (
        <div className="flex flex-col items-center gap-6 max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Thanks for connecting{firstName ? `, ${firstName}` : ''}!
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              Explore Brightwave on your own and see how research can transform
              your workflow.
            </p>
          </div>
          <Button asChild size="lg" className="text-base font-semibold shadow-lg">
            <a
              href={trialLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              Start Your Free Trial
              <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
        </div>
      )}

      {/* Brightwave branding */}
      <div className="absolute bottom-8 flex items-center gap-2 text-white/20 text-xs">
        <span>Powered by</span>
        <span className="font-semibold">Brightwave</span>
      </div>
    </div>
  );
}
