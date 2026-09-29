"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Volume2,
  VolumeX,
  Play,
  Music,
  Sparkles,
  X,
  Upload,
  Link as LinkIcon,
  Settings2,
  Check,
} from "lucide-react";

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
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [customAudioUrl, setCustomAudioUrl] = useState<string | null>(null);
  const [customTrackName, setCustomTrackName] = useState<string>(musicTitle);
  const [inputUrl, setInputUrl] = useState("");
  const [isLoadedFromFile, setIsLoadedFromFile] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthCtxRef = useRef<AudioContext | null>(null);
  const synthIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isSynthActiveRef = useRef<boolean>(false);

  const activeMusicSource = customAudioUrl || musicUrl;

  // Procedural gentle romantic guitar/piano arpeggio fallback
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
      if (audioRef.current && activeMusicSource) {
        audioRef.current.muted = isMuted;
        audioRef.current.volume = 0.65;
        audioRef.current
          .play()
          .then(() => {
            stopSynthMelody();
            setIsPlaying(true);
          })
          .catch(() => {
            // If audio file doesn't exist yet, fallback to synthesizer
            startSynthMelody();
            setIsPlaying(true);
          });
      } else {
        startSynthMelody();
        setIsPlaying(true);
      }
    }
  }, [isPlaying, isMuted, activeMusicSource, startSynthMelody, stopSynthMelody]);

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

  // File upload handler to select MP3 directly from user's machine
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setCustomAudioUrl(objectUrl);
      setCustomTrackName(file.name.replace(/\.[^/.]+$/, ""));
      setIsLoadedFromFile(true);
      setIsSettingsOpen(false);

      if (audioRef.current) {
        audioRef.current.src = objectUrl;
        audioRef.current.load();
        audioRef.current
          .play()
          .then(() => {
            stopSynthMelody();
            setIsPlaying(true);
          })
          .catch(() => {});
      }
    }
  };

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;
    setCustomAudioUrl(inputUrl.trim());
    setIsSettingsOpen(false);

    if (audioRef.current) {
      audioRef.current.src = inputUrl.trim();
      audioRef.current.load();
      audioRef.current
        .play()
        .then(() => {
          stopSynthMelody();
          setIsPlaying(true);
        })
        .catch(() => {});
    }
  };

  useEffect(() => {
    if (autoPlayTrigger && !isPlaying) {
      togglePlay();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlayTrigger]);

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
    <>
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

        {/* Main Floating Music Controller Bar */}
        <div
          className="flex items-center gap-1.5 p-1.5 sm:p-2 rounded-full bg-white/90 backdrop-blur-md border border-bday-secondary/60 shadow-md hover:shadow-lg transition-all"
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
                {customTrackName}
              </span>
              <span className="text-[9px] text-bday-muted uppercase tracking-wider">
                {isLoadedFromFile ? "File MP3 Aktif" : "Lagu Latar Romantis"}
              </span>
            </div>
          </div>

          {/* Settings / Choose Music Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsSettingsOpen(true);
            }}
            aria-label="Pengaturan lagu"
            className="p-2 rounded-full hover:bg-bday-secondary/30 text-bday-muted hover:text-bday-text transition-colors"
            title="Ganti / Masukkan File Lagu MP3"
          >
            <Settings2 className="w-4 h-4 text-bday-primary" />
          </button>

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
            aria-label={isPlaying ? "Jeda musik" : "Putar lagu"}
            className={`relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full transition-all duration-300 ${
              isPlaying
                ? "bg-gradient-to-r from-bday-primary to-bday-primary-hover text-white shadow-md shadow-bday-primary/30 scale-105"
                : "bg-bday-text text-white hover:bg-bday-primary hover:scale-105"
            }`}
          >
            {isPlaying ? (
              <div className="flex items-center justify-center gap-[2.5px]">
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
          src={activeMusicSource}
          loop
          preload="auto"
          onError={() => {
            if (isPlaying && !customAudioUrl) {
              startSynthMelody();
            }
          }}
        />

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="audio/mp3,audio/*"
          className="hidden"
          onChange={handleFileUpload}
        />
      </div>

      {/* Audio Settings / Music Source Modal */}
      {isSettingsOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsSettingsOpen(false)}
        >
          <div
            className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-bday-secondary/60 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-bday-secondary/30">
              <div className="flex items-center gap-2">
                <Music className="w-5 h-5 text-bday-primary" />
                <h4 className="font-serif font-bold text-lg text-bday-text">
                  Pengaturan Musik Latar
                </h4>
              </div>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="p-1 rounded-full hover:bg-black/5 text-bday-muted"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-bday-text">
              <div className="p-3.5 rounded-2xl bg-bday-subtle/50 border border-bday-secondary/40 space-y-1">
                <p className="font-semibold text-bday-text">Lagu yang Dipilih:</p>
                <p className="text-bday-primary font-bold text-sm">
                  {customTrackName}
                </p>
                <p className="text-[11px] text-bday-muted">
                  Lagu: &ldquo;Kita Lewati Berdua - Overnight&rdquo;
                </p>
              </div>

              {/* Option 1: Pick / Upload file directly from computer */}
              <div className="space-y-2">
                <p className="font-semibold text-bday-text text-xs uppercase tracking-wider text-bday-muted">
                  Opsi 1: Pilih File MP3 dari Laptop / HP
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-3 px-4 rounded-xl bg-bday-primary text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-bday-primary-hover transition-all shadow-md active:scale-95"
                >
                  <Upload className="w-4 h-4" />
                  <span>Pilih File MP3 dari Perangkat Ini</span>
                </button>
                {isLoadedFromFile && (
                  <p className="text-[11px] text-green-600 font-medium flex items-center gap-1 justify-center">
                    <Check className="w-3.5 h-3.5" />
                    <span>File audio berhasil dimuat dan siap diputar!</span>
                  </p>
                )}
              </div>

              {/* Option 2: Direct URL */}
              <form onSubmit={handleApplyUrl} className="space-y-2 pt-2 border-t border-bday-secondary/30">
                <p className="font-semibold text-bday-text text-xs uppercase tracking-wider text-bday-muted">
                  Opsi 2: Masukkan URL Audio Langsung (.mp3)
                </p>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://example.com/lagu.mp3"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-bday-secondary/80 focus:outline-none focus:ring-2 focus:ring-bday-primary/30"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-bday-text text-white text-xs font-semibold hover:bg-bday-primary transition-all flex items-center gap-1"
                  >
                    <LinkIcon className="w-3.5 h-3.5" />
                    <span>Pasang</span>
                  </button>
                </div>
              </form>

              {/* Permanent Folder Instruction */}
              <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/60 text-[11px] text-amber-900 space-y-1">
                <p className="font-bold flex items-center gap-1 text-amber-800">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  <span>Tips Penyimpanan Permanen:</span>
                </p>
                <p>
                  Untuk membuat lagu otomatis terpasang selamanya di website ini, cukup salin/masukkan file lagu MP3 Anda ke dalam folder proyek:
                </p>
                <code className="block bg-white px-2 py-1 rounded border border-amber-200 text-[10px] font-mono font-bold text-amber-950 break-all select-all">
                  public/music/kita-lewati-berdua.mp3
                </code>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="px-5 py-2 rounded-full bg-bday-text text-white text-xs font-semibold hover:bg-bday-primary transition-all"
              >
                Selesai
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
