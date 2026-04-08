'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Camera, Mic, MicOff, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ProspectContext } from '@/lib/demo-utils';
import { getFirstName } from '@/lib/demo-utils';

interface PreCallLobbyProps {
  prospect: ProspectContext;
  onStart: () => void;
}

type PermissionState = 'pending' | 'granted' | 'denied' | 'error';

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
    // Stop the preview stream -- the session will start its own
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      setStream(null);
    }
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    onStart();
  };

  return (
    <div className="min-h-screen bg-[#0a0a12] flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <div className="mb-8">
        <svg
          width="180"
          height="36"
          viewBox="0 0 180 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white"
        >
          <text
            x="0"
            y="28"
            fill="currentColor"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontSize="24"
            fontWeight="700"
            letterSpacing="-0.02em"
          >
            Brightwave
          </text>
        </svg>
      </div>

      {/* Greeting */}
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 text-center">
        {firstName ? `Welcome, ${firstName}!` : 'Welcome to your demo!'}
      </h1>
      <p className="text-white/60 text-sm sm:text-base mb-8 text-center max-w-md">
        You&apos;re about to meet your AI-powered Brightwave guide.
        {prospect.company ? ` We've prepared a personalized experience for ${prospect.company}.` : ''}
      </p>

      {/* Camera Preview */}
      <div className="relative w-full max-w-md aspect-video rounded-2xl overflow-hidden bg-[#1a1a2e] border border-white/10 mb-6">
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
            <Loader2 className="w-8 h-8 text-white/40 animate-spin" />
            <p className="text-white/50 text-sm">Requesting camera and microphone access...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-3 px-6">
            <AlertCircle className="w-8 h-8 text-red-400" />
            <p className="text-white/70 text-sm text-center">
              {permissionState === 'denied'
                ? 'Camera and microphone access was denied. Please allow access in your browser settings.'
                : 'Unable to access camera or microphone. Please check your device settings.'}
            </p>
            <button
              onClick={requestPermissions}
              className="text-sm text-indigo-400 hover:text-indigo-300 underline underline-offset-2"
            >
              Try again
            </button>
          </div>
        )}

        {/* Camera/Mic status badges */}
        {permissionState === 'granted' && (
          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-sm rounded-full px-2.5 py-1">
              <Camera className="w-3.5 h-3.5 text-green-400" />
              <span className="text-[11px] text-white/80">Camera ready</span>
            </div>
            <div
              className={cn(
                'flex items-center gap-1.5 bg-black/60 backdrop-blur-sm rounded-full px-2.5 py-1',
              )}
            >
              {isMicTest ? (
                <Mic className="w-3.5 h-3.5 text-green-400" />
              ) : (
                <MicOff className="w-3.5 h-3.5 text-red-400" />
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
              {isMicTest ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
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
      <button
        onClick={handleStart}
        disabled={permissionState === 'pending'}
        className={cn(
          'px-8 py-3.5 rounded-xl font-semibold text-base transition-all',
          'bg-indigo-600 hover:bg-indigo-500 text-white',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40',
        )}
      >
        Start Demo
      </button>

      {permissionState === 'denied' && (
        <p className="text-white/40 text-xs mt-3 text-center">
          You can still start the demo -- you&apos;ll be able to chat via text.
        </p>
      )}
    </div>
  );
}
