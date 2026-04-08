'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import type { ProspectContext } from '@/lib/demo-utils';
import { getFirstName } from '@/lib/demo-utils';
import { BrightwaveLogo } from '@/components/layout/logo';

type QualificationResult = 'qualified' | 'unqualified' | 'pending' | 'error';

interface PostCallScreenProps {
  prospect: ProspectContext;
  sessionId: string | null;
  calendarLink: string;
}

/**
 * Post-call screen with qualification polling.
 * Matches sales-avatar's post-call visual style:
 * dark bg, centered content, accent CTAs.
 * Retains brightwave-marketing's qualification polling logic.
 */
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
        if (res.status === 404) return;
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
    pollQualification();
    pollRef.current = setInterval(pollQualification, 5000);

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

    const timeout = setTimeout(() => {
      setQualification((prev) => (prev === 'pending' ? 'unqualified' : prev));
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
    }, 3000);

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
      window.removeEventListener('demo:qualification', handleQualification);
      clearTimeout(timeout);
    };
  }, [pollQualification]);

  const isQualified = qualification === 'qualified';
  const ctaLabel = isQualified ? 'Book Your Workflow Workshop' : 'Start Your Free Trial';
  const ctaHref = isQualified ? resolvedCalendarLink : trialLink;

  return (
    <div className="min-h-screen bg-bw-gray-800 flex flex-col items-center justify-center px-4">
      {/* Loading spinner while pending */}
      {qualification === 'pending' && (
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-bw-yellow-550 animate-spin" />
          <p className="text-white/60 text-sm">Preparing your results...</p>
        </div>
      )}

      {/* Resolved content */}
      {qualification !== 'pending' && (
        <div className="flex flex-col items-center gap-6 max-w-md text-center">
          <div
            className={cn(
              'w-16 h-16 rounded-full flex items-center justify-center',
              isQualified ? 'bg-green-500/10' : 'bg-bw-yellow-550/10',
            )}
          >
            <svg
              className={cn('w-8 h-8', isQualified ? 'text-green-400' : 'text-bw-yellow-550')}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {isQualified
                ? `Great news${firstName ? `, ${firstName}` : ''}! You're a great fit.`
                : `Thanks for connecting${firstName ? `, ${firstName}` : ''}!`}
            </h1>
            <p className="text-white/60 text-sm sm:text-base">
              {isQualified
                ? `Based on our conversation, Brightwave can deliver significant value for${prospect.company ? ` ${prospect.company}` : ' your team'}. Let's set up a hands-on workflow workshop tailored to your use cases.`
                : 'Explore Brightwave on your own and see how research can transform your workflow.'}
            </p>
          </div>
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-bw-yellow-550 text-bw-gray-800 hover:bg-bw-yellow-400 font-semibold px-8 py-3 rounded-full text-base inline-flex items-center gap-2"
          >
            {ctaLabel}
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </a>
        </div>
      )}

      {/* Brightwave branding */}
      <div className="absolute bottom-8 flex items-center gap-2 text-white/20">
        <span className="text-xs">Powered by</span>
        <BrightwaveLogo className="text-white/20 h-4 w-auto" />
      </div>
    </div>
  );
}
