'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { BrightwaveLogo } from '@/components/layout/logo';
import type { ProspectContext } from '@/lib/demo-utils';
import { getFirstName } from '@/lib/demo-utils';

interface PreCallLobbyProps {
  prospect: ProspectContext;
  onStart: () => void;
}

type PermissionState = 'pending' | 'granted' | 'denied' | 'error';

/**
 * Pre-call lobby with camera preview and mic test.
 * Layout matches sales-avatar's centered, dark approach but retains
 * brightwave-marketing's richer camera/mic UX.
 * Colors: bg-bw-gray-800, bw-gray-700 surfaces, bw-yellow-550 accents.
 */
export default function PreCallLobby({ prospect, onStart }: PreCallLobbyProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [permissionState, setPermissionState] = useState<PermissionState>('pending');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isMicTest, setIsMicTest] = useState(true);
  const [micLevel, setMicLevel] = useState(0);
  const animFrameRef = useRef<number | null>(null);

  const firstName = getFirstName(prospect);

  const requestPermissions = useCallback(async () => {
    setPermissionState('pending');
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: 'user' },
        audio: true,
      });
      setStream(mediaStream);
      setPermissionState('granted');

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      // Mic level monitoring
      const audioCtx = new AudioContext();
      const source = audioCtx.createMediaStreamSource(mediaStream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const tick = () => {
        analyser.getByteFrequencyData(dataArray);
        const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
        setMicLevel(Math.min(1, avg / 128));
        animFrameRef.current = requestAnimationFrame(tick);
      };
      tick();
    } catch (err) {
      console.error('[PreCallLobby] Permission error:', err);
      if (err instanceof DOMException && err.name === 'NotAllowedError') {
        setPermissionState('denied');
      } else {
        setPermissionState('error');
      }
    }
  }, []);

  useEffect(() => {
    requestPermissions();
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const handleStart = () => {
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      setStream(null);
    }
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    onStart();
  };

  return (
    <div className="min-h-screen bg-bw-gray-800 flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <div className="mb-8">
        <BrightwaveLogo className="text-white" />
      </div>

      {/* Greeting */}
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 text-center">
        {firstName ? `Welcome, ${firstName}!` : 'Welcome to your demo!'}
      </h1>
      <p className="text-white/60 text-sm sm:text-base mb-8 text-center max-w-md">
        You&apos;re about to meet your Brightwave guide.
        {prospect.company ? ` We've prepared a personalized experience for ${prospect.company}.` : ''}
      </p>

      {/* Camera Preview */}
      <div className="relative w-full max-w-md aspect-video rounded-2xl overflow-hidden bg-bw-gray-700 border border-white/10 mb-6">
        {permissionState === 'granted' ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
            style={{ transform: 'scaleX(-1)' }}
          />
        ) : permissionState === 'pending' ? (
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-white/10 border-t-bw-yellow-550 animate-spin" />
            <p className="text-white/50 text-sm">Requesting camera and microphone access...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-3 px-6">
            <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <p className="text-white/70 text-sm text-center">
              {permissionState === 'denied'
                ? 'Camera and microphone access was denied. Please allow access in your browser settings.'
                : 'Unable to access camera or microphone. Please check your device settings.'}
            </p>
            <button
              onClick={requestPermissions}
              className="text-sm text-bw-yellow-550 hover:text-bw-yellow-400 underline underline-offset-2"
            >
              Try again
            </button>
          </div>
        )}

        {/* Camera/Mic status badges */}
        {permissionState === 'granted' && (
          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-sm rounded-full px-2.5 py-1">
              <svg className="w-3.5 h-3.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9.75a2.25 2.25 0 002.25-2.25V7.5a2.25 2.25 0 00-2.25-2.25H4.5A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
              </svg>
              <span className="text-[11px] text-white/80">Camera ready</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-sm rounded-full px-2.5 py-1">
              {isMicTest ? (
                <svg className="w-3.5 h-3.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 19L5 5m7-2a3 3 0 00-3 3v4a3 3 0 006 0V6a3 3 0 00-3-3zM17 11a5 5 0 01-7.586 4.243M3.515 15.243A5 5 0 018 17m4 0v4m-4 0h8" />
                </svg>
              )}
              <span className="text-[11px] text-white/80">
                {isMicTest ? 'Mic ready' : 'Mic off'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Mic Level Indicator */}
      {permissionState === 'granted' && (
        <div className="w-full max-w-md mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMicTest(!isMicTest)}
              className={cn(
                'p-2 rounded-lg transition-colors',
                isMicTest
                  ? 'bg-white/10 text-white hover:bg-white/15'
                  : 'bg-red-600/20 text-red-400 hover:bg-red-600/30',
              )}
            >
              {isMicTest ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 19L5 5m7-2a3 3 0 00-3 3v4a3 3 0 006 0V6a3 3 0 00-3-3zM17 11a5 5 0 01-7.586 4.243M3.515 15.243A5 5 0 018 17m4 0v4m-4 0h8" />
                </svg>
              )}
            </button>
            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full transition-all duration-75"
                style={{ width: `${isMicTest ? micLevel * 100 : 0}%` }}
              />
            </div>
          </div>
          <p className="text-white/40 text-xs mt-2">
            {isMicTest ? 'Speak to test your microphone' : 'Microphone is muted'}
          </p>
        </div>
      )}

      {/* Start Button */}
      <Button
        onClick={handleStart}
        disabled={permissionState === 'pending'}
        size="lg"
        className="text-base font-semibold shadow-lg"
      >
        Start Demo
      </Button>

      {permissionState === 'denied' && (
        <p className="text-white/40 text-xs mt-3 text-center">
          You can still start the demo &mdash; you&apos;ll be able to chat via text.
        </p>
      )}
    </div>
  );
}
