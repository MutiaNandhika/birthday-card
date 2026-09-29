"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Volume2, VolumeX, Play, Music, Sparkles, X } from "lucide-react";

interface MusicPlayerProps {
  musicUrl?: string;
  musicTitle?: string;
  autoPlayTrigger?: boolean;
}

export function MusicPlayer({
  musicUrl = "/music/kita-lewati-berdua.mp3",
  musicTitle = "Kita Lewati Berdua - Overnight",
  autoPlayTrigger = false,
}: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthCtxRef = useRef<AudioContext | null>(null);
  const synthIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isSynthActiveRef = useRef<boolean>(false);

  // Procedural gentle romantic guitar/piano arpeggio in D/G Major (Kita Lewati Berdua feel)
  const startSynthMelody = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!synthCtxRef.current) {
        synthCtxRef.current = new AudioCtx();
      }
      const ctx = synthCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Romantic warm progression notes (D, F#, A, B, C#5, D5, E5)
      const scale = [293.66, 369.99, 440.0, 493.88, 554.37, 587.33, 659.25, 739.99];
      const melodySteps = [0, 2, 4, 5, 4, 2, 1, 3, 0, 3, 5, 6, 5, 3, 2, 1];
      let step = 0;

      const playNote = () => {
        if (!synthCtxRef.current || synthCtxRef.current.state !== "running" || !isSynthActiveRef.current)
          return;
        const noteIndex = melodySteps[step % melodySteps.length];
        const freq = scale[noteIndex % scale.length];
        step++;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Warm sine-triangle acoustic timbre
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const targetVolume = isMuted ? 0 : 0.038;
        gain.gain.setValueAtTime(0.0001, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(targetVolume, ctx.currentTime + 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 1.45);
      };

      isSynthActiveRef.current = true;
      playNote();
      synthIntervalRef.current = setInterval(playNote, 700);
    } catch {
      // Audio context error
    }
  }, [isMuted]);

  const stopSynthMelody = useCallback(() => {
    isSynthActiveRef.current = false;
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
    if (synthCtxRef.current && synthCtxRef.current.state === "running") {
      try {
        synthCtxRef.current.suspend();
      } catch {
        // suspend error
      }
    }
  }, []);

  const togglePlay = useCallback(() => {
    setShowHint(false);

    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      stopSynthMelody();
      setIsPlaying(false);
    } else {
      if (audioRef.current && musicUrl) {
        audioRef.current.muted = isMuted;
        audioRef.current.volume = 0.6;
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // If the audio file is blocked or missing, start the procedural acoustic melody smoothly
            startSynthMelody();
            setIsPlaying(true);
          });
      } else {
        startSynthMelody();
        setIsPlaying(true);
      }
    }
  }, [isPlaying, isMuted, musicUrl, startSynthMelody, stopSynthMelody]);

  const toggleMute = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const newMuted = !isMuted;
      setIsMuted(newMuted);
      if (audioRef.current) {
        audioRef.current.muted = newMuted;
      }
    },
    [isMuted]
  );

  // Trigger autoplay when user starts the journey (complies with browser user interaction policies)
  useEffect(() => {
    if (autoPlayTrigger && !isPlaying) {
      togglePlay();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlayTrigger]);

  // Hide the initial instruction hint after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 9000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const audioElement = audioRef.current;
    return () => {
      stopSynthMelody();
      if (audioElement) {
        audioElement.pause();
      }
    };
  }, [stopSynthMelody]);

  return (
    <div className="fixed top-4 right-4 sm:top-5 sm:right-5 z-50 flex flex-col items-end gap-2 select-none">
      {/* Initial Instruction Pill Banner */}
      {showHint && !isPlaying && (
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-bday-secondary/80 shadow-lg text-xs font-medium text-bday-text animate-bounce duration-1000">
          <Sparkles className="w-3.5 h-3.5 text-bday-accent fill-bday-accent" />
          <span>Nyalakan suaranya untuk pengalaman terbaik ✨</span>
          <button
            onClick={() => setShowHint(false)}
            aria-label="Tutup petunjuk suara"
            className="p-0.5 rounded-full hover:bg-black/5 text-bday-muted hover:text-bday-text transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Aesthetic Floating Music Controller Bar */}
      <div
        className="flex items-center gap-2 p-1.5 sm:p-2 rounded-full bg-white/90 backdrop-blur-md border border-bday-secondary/60 shadow-md hover:shadow-lg transition-all"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Track Title Info */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-out ${
            isExpanded || isPlaying
              ? "max-w-[210px] sm:max-w-[260px] opacity-100 px-2.5"
              : "max-w-0 opacity-0 px-0"
          } flex items-center gap-2 text-xs font-medium text-bday-text whitespace-nowrap`}
        >
          <Music className={`w-3.5 h-3.5 text-bday-primary ${isPlaying ? "animate-pulse" : ""}`} />
          <div className="flex flex-col truncate">
            <span className="truncate font-semibold text-[11px] text-bday-text">
              {musicTitle}
            </span>
            <span className="text-[9px] text-bday-muted uppercase tracking-wider">
              Lagu Latar Romantis
            </span>
          </div>
        </div>

        {/* Mute/Unmute Toggle Button */}
        {isPlaying && (
          <button
            onClick={toggleMute}
            aria-label={isMuted ? "Bunyikan audio" : "Bisukan audio"}
            className={`p-2 rounded-full transition-all ${
              isMuted
                ? "bg-red-50 text-red-500 hover:bg-red-100"
                : "bg-bday-secondary/30 text-bday-text hover:bg-bday-secondary/50"
            }`}
            title={isMuted ? "Suara Dibisukan" : "Bisukan Suara"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-bday-primary" />}
          </button>
        )}

        {/* Play/Pause Main Button */}
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Jeda musik latar" : "Putar lagu Kita Lewati Berdua"}
          className={`relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full transition-all duration-300 ${
            isPlaying
              ? "bg-gradient-to-r from-bday-primary to-bday-primary-hover text-white shadow-md shadow-bday-primary/30 scale-105"
              : "bg-bday-text text-white hover:bg-bday-primary hover:scale-105"
          }`}
        >
          {isPlaying ? (
            <div className="flex items-center justify-center gap-[2.5px]">
              {/* Animated sound wave bars */}
              <span className="w-[2.5px] h-3.5 bg-white rounded-full animate-[bounce_0.8s_infinite_100ms]" />
              <span className="w-[2.5px] h-5 bg-white rounded-full animate-[bounce_0.8s_infinite_300ms]" />
              <span className="w-[2.5px] h-2.5 bg-white rounded-full animate-[bounce_0.8s_infinite_200ms]" />
              <span className="w-[2.5px] h-4 bg-white rounded-full animate-[bounce_0.8s_infinite_400ms]" />
            </div>
          ) : (
            <Play className="w-4 h-4 fill-white ml-0.5" />
          )}
        </button>
      </div>

      {/* Hidden HTML5 Audio Element with fallback handling */}
      <audio
        ref={audioRef}
        src={musicUrl}
        loop
        preload="auto"
        onError={() => {
          // If custom mp3 file is not found, smoothly switch to soothing synthesizer
          if (isPlaying) {
            startSynthMelody();
          }
        }}
      />
    </div>
  );
}
