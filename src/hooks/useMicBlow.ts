"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface UseMicBlowOptions {
  onBlowDetected?: () => void;
  threshold?: number; // Volume threshold (0 - 100)
  durationRequiredMs?: number; // How long user must blow
}

export function useMicBlow({
  onBlowDetected,
  threshold = 28,
  durationRequiredMs = 350,
}: UseMicBlowOptions = {}) {
  const [isListening, setIsListening] = useState(false);
  const [micPermission, setMicPermission] = useState<"idle" | "granted" | "denied" | "unsupported">("idle");
  const [currentVolume, setCurrentVolume] = useState(0);
  const [isBlowing, setIsBlowing] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const blowStartTimeRef = useRef<number | null>(null);
  const hasTriggeredRef = useRef(false);

  const stopListening = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      try {
        audioContextRef.current.close();
      } catch {
        // audio context close error
      }
      audioContextRef.current = null;
    }
    setIsListening(false);
    setIsBlowing(false);
    setCurrentVolume(0);
  }, []);

  const startListening = useCallback(async () => {
    if (typeof window === "undefined" || !navigator?.mediaDevices?.getUserMedia) {
      setMicPermission("unsupported");
      return;
    }

    try {
      hasTriggeredRef.current = false;
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
      });

      streamRef.current = stream;
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;

      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.3;
      source.connect(analyser);
      analyserRef.current = analyser;

      setMicPermission("granted");
      setIsListening(true);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const analyzeAudio = () => {
        if (!analyserRef.current || hasTriggeredRef.current) return;

        analyserRef.current.getByteFrequencyData(dataArray);

        // Calculate average energy in low frequencies (50Hz - 600Hz) characteristic of breath/blow
        let sum = 0;
        const lowBins = Math.min(30, bufferLength);
        for (let i = 1; i < lowBins; i++) {
          sum += dataArray[i];
        }
        const avg = sum / (lowBins - 1);
        const normalizedVolume = Math.min(100, Math.round((avg / 255) * 100 * 1.8));

        setCurrentVolume(normalizedVolume);

        if (normalizedVolume >= threshold) {
          setIsBlowing(true);
          const now = Date.now();
          if (!blowStartTimeRef.current) {
            blowStartTimeRef.current = now;
          } else if (now - blowStartTimeRef.current >= durationRequiredMs) {
            // Threshold sustained long enough -> blow detected!
            hasTriggeredRef.current = true;
            setIsBlowing(false);
            if (onBlowDetected) {
              onBlowDetected();
            }
            stopListening();
            return;
          }
        } else {
          blowStartTimeRef.current = null;
          setIsBlowing(false);
        }

        animationFrameRef.current = requestAnimationFrame(analyzeAudio);
      };

      animationFrameRef.current = requestAnimationFrame(analyzeAudio);
    } catch (error) {
      console.warn("Microphone access not available or denied:", error);
      setMicPermission("denied");
      setIsListening(false);
    }
  }, [durationRequiredMs, onBlowDetected, stopListening, threshold]);

  useEffect(() => {
    return () => {
      stopListening();
    };
  }, [stopListening]);

  return {
    isListening,
    micPermission,
    currentVolume,
    isBlowing,
    startListening,
    stopListening,
  };
}
