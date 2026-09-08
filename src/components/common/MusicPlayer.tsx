"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { VolumeX, Music } from "lucide-react";

interface MusicPlayerProps {
  musicUrl?: string;
  musicTitle?: string;
  autoPlayTrigger?: boolean;
}

export function MusicPlayer({
  musicUrl = "/music/background.mp3",
  musicTitle = "Ambient Melody",
  autoPlayTrigger = false,
}: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthCtxRef = useRef<AudioContext | null>(null);
  const synthIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Procedural ambient lullaby generator (gentle soft piano/music box arpeggio)
  const startSynthMelody = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!synthCtxRef.current) {
        synthCtxRef.current = new AudioCtx();
      }
      const ctx = synthCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Peaceful pentatonic scale in D Major / F# Minor
      const scale = [293.66, 329.63, 369.99, 440.0, 493.88, 587.33, 659.25, 739.99]; // D4, E4, F#4, A4, B4, D5, E5, F#5
      let step = 0;

      const playNote = () => {
        if (!synthCtxRef.current || synthCtxRef.current.state !== "running") return;
        const noteIndex = [0, 2, 3, 5, 4, 2, 1, 3][step % 8];
        const freq = scale[noteIndex];
        step++;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Music-box / Rhodes-like tone
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Soft envelope
        gain.gain.setValueAtTime(0.0001, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.035, ctx.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 1.25);
      };

      // Play note every 850ms
      playNote();
      synthIntervalRef.current = setInterval(playNote, 850);
    } catch {
      // Audio context error
    }
  }, []);

  const stopSynthMelody = useCallback(() => {
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
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      stopSynthMelody();
      setIsPlaying(false);
    } else {
      if (audioRef.current && musicUrl) {
        audioRef.current.volume = 0.4;
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Audio file failed to play or not found -> fallback to synthesizer
            startSynthMelody();
            setIsPlaying(true);
          });
      } else {
        startSynthMelody();
        setIsPlaying(true);
      }
    }
  }, [isPlaying, musicUrl, startSynthMelody, stopSynthMelody]);

  // Handle autoplay trigger once user starts interacting
  useEffect(() => {
    if (autoPlayTrigger && !isPlaying) {
      togglePlay();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlayTrigger]);

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
    <div
      className="fixed top-5 right-5 z-50 flex items-center gap-2 select-none"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Hidden HTML5 Audio Element with fallback handling */}
      <audio
        ref={audioRef}
        src={musicUrl}
        loop
        preload="auto"
        onError={() => {
          // If the custom mp3 isn't available, switch to synthesizer on play
          if (isPlaying) {
            startSynthMelody();
          }
        }}
      />

      {/* Title preview pill */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          isExpanded ? "max-w-[200px] opacity-100 px-3 py-1.5" : "max-w-0 opacity-0 px-0 py-0"
        } rounded-full bg-white/90 backdrop-blur-md shadow-sm border border-bday-secondary/50 text-xs font-medium text-bday-text whitespace-nowrap`}
      >
        <div className="flex items-center gap-1.5 truncate">
          <Music className="w-3 h-3 text-bday-primary animate-pulse" />
          <span className="truncate">{musicTitle}</span>
        </div>
      </div>

      {/* Floating Toggle Button */}
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? "Mute music" : "Play background music"}
        className={`group relative flex items-center justify-center w-11 h-11 rounded-full backdrop-blur-md shadow-md transition-all duration-300 ${
          isPlaying
            ? "bg-white/95 text-bday-primary border border-bday-secondary shadow-bday-primary/20"
            : "bg-white/80 text-bday-muted hover:text-bday-text border border-white/60 hover:bg-white"
        }`}
      >
        {isPlaying ? (
          <div className="flex items-center gap-[2px]">
            {/* Animated sound wave bars */}
            <span className="w-[3px] h-3 bg-bday-primary rounded-full animate-[bounce_1s_infinite_100ms]" />
            <span className="w-[3px] h-4 bg-bday-primary rounded-full animate-[bounce_1s_infinite_300ms]" />
            <span className="w-[3px] h-2 bg-bday-primary rounded-full animate-[bounce_1s_infinite_200ms]" />
            <span className="w-[3px] h-3.5 bg-bday-primary rounded-full animate-[bounce_1s_infinite_400ms]" />
          </div>
        ) : (
          <VolumeX className="w-5 h-5 text-bday-muted group-hover:scale-110 transition-transform" />
        )}
      </button>
    </div>
  );
}
