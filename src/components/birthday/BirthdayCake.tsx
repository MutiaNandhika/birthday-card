"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Mic, Wind, ArrowRight, RefreshCw, Heart } from "lucide-react";
import { birthdayData } from "@/data/birthday";
import { useMicBlow } from "@/hooks/useMicBlow";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { triggerCelebrationConfetti, triggerStarBurst } from "@/components/common/ConfettiEffect";

interface BirthdayCakeProps {
  onNext: () => void;
}

export function BirthdayCake({ onNext }: BirthdayCakeProps) {
  const [isCandleBlown, setIsCandleBlown] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [stepIndex, setStepIndex] = useState(0); // 0: Close eyes, 1: Think of wish, 2: Blow

  const holdIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const { playClick, playCandleBlow } = useSoundEffects();

  const handleExtinguishCandles = () => {
    if (isCandleBlown) return;
    setIsCandleBlown(true);
    playCandleBlow();
    triggerCelebrationConfetti();
    triggerStarBurst();
  };

  const {
    isListening,
    micPermission,
    currentVolume,
    startListening,
  } = useMicBlow({
    onBlowDetected: handleExtinguishCandles,
    threshold: 24,
    durationRequiredMs: 300,
  });

  // Hold-to-blow mouse/touch interaction fallback
  const startHolding = () => {
    if (isCandleBlown) return;
    setIsHolding(true);
    let progress = 0;
    holdIntervalRef.current = setInterval(() => {
      progress += 5;
      setHoldProgress(progress);
      if (progress >= 100) {
        if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
        setIsHolding(false);
        setHoldProgress(100);
        handleExtinguishCandles();
      }
    }, 45); // ~900ms to blow by holding
  };

  const stopHolding = () => {
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
    }
    setIsHolding(false);
    if (!isCandleBlown) {
      setHoldProgress(0);
    }
  };

  const resetCandles = () => {
    playClick();
    setIsCandleBlown(false);
    setHoldProgress(0);
  };

  useEffect(() => {
    return () => {
      if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    };
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-[100dvh] w-full flex flex-col justify-between items-center px-4 sm:px-6 py-10 max-w-2xl mx-auto select-none text-center"
    >
      {/* Header Prompt */}
      <div className="mb-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/85 border border-bday-secondary/70 text-xs font-semibold tracking-widest uppercase text-bday-muted mb-2 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-bday-accent" />
          <span>{birthdayData.cake.heading}</span>
        </div>

        <AnimatePresence mode="wait">
          {!isCandleBlown ? (
            <motion.div
              key="wish-prompts"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-1.5"
            >
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-bday-text">
                {stepIndex === 0
                  ? birthdayData.cake.step1
                  : stepIndex === 1
                  ? birthdayData.cake.step2
                  : birthdayData.cake.step3}
              </h2>
              <p className="text-xs sm:text-sm text-bday-muted">
                {stepIndex < 2
                  ? "Ambil nafas dan resapi momen ini..."
                  : "Tiup ke arah mic atau tekan dan tahan tombol di bawah"}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="wish-sent"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-1.5"
            >
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-bday-primary flex items-center justify-center gap-2">
                <Heart className="w-6 h-6 fill-bday-primary text-bday-primary animate-pulse" />
                <span>{birthdayData.cake.candleBlownMessage}</span>
              </h2>
              <p className="text-xs sm:text-sm text-bday-muted max-w-md mx-auto">
                {birthdayData.cake.candleBlownSubtext}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Handcrafted Animated SVG Birthday Cake */}
      <div className="relative my-auto w-full max-w-[320px] sm:max-w-[380px] aspect-[4/3] flex items-center justify-center">
        <svg
          viewBox="0 0 400 320"
          className="w-full h-full drop-shadow-xl overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Cake Stand Plate */}
          <ellipse cx="200" cy="290" rx="170" ry="20" fill="#FFFFFF" stroke="#FFC2D1" strokeWidth="4" />
          <ellipse cx="200" cy="290" rx="145" ry="12" fill="#FFE5EC" opacity="0.6" />
          <path d="M170 295 L160 315 L240 315 L230 295 Z" fill="#FFFFFF" stroke="#FFC2D1" strokeWidth="3" />

          {/* Bottom Cake Layer */}
          <rect x="70" y="205" width="260" height="75" rx="14" fill="#FFFFFF" stroke="#FFC2D1" strokeWidth="3" />
          {/* Frosting Swirls Bottom Layer */}
          <path
            d="M70 230 Q 90 245 110 230 Q 130 245 150 230 Q 170 245 190 230 Q 210 245 230 230 Q 250 245 270 230 Q 290 245 310 230 Q 330 245 330 230 L 330 205 L 70 205 Z"
            fill="#FF8FAB"
            opacity="0.9"
          />
          {/* Sprinkles Bottom Layer */}
          <circle cx="110" cy="260" r="3.5" fill="#FFD166" />
          <circle cx="160" cy="270" r="3.5" fill="#FF8FAB" />
          <circle cx="210" cy="255" r="3.5" fill="#FFD166" />
          <circle cx="260" cy="265" r="3.5" fill="#FFC2D1" />
          <circle cx="295" cy="255" r="3.5" fill="#FF8FAB" />

          {/* Top Cake Layer */}
          <rect x="115" y="145" width="170" height="65" rx="12" fill="#FFFFFF" stroke="#FFC2D1" strokeWidth="3" />
          {/* Frosting Swirls Top Layer */}
          <path
            d="M115 168 Q 135 180 155 168 Q 175 180 195 168 Q 215 180 235 168 Q 255 180 275 168 Q 285 175 285 168 L 285 145 L 115 145 Z"
            fill="#FFC2D1"
          />
          {/* Sprinkles Top Layer */}
          <circle cx="145" cy="190" r="3" fill="#FFD166" />
          <circle cx="180" cy="195" r="3" fill="#FF8FAB" />
          <circle cx="220" cy="190" r="3" fill="#FFD166" />
          <circle cx="255" cy="195" r="3" fill="#FF8FAB" />

          {/* 3 Candles */}
          {/* Candle 1 (Left) */}
          <rect x="150" y="95" width="10" height="50" rx="4" fill="#FFD166" stroke="#2B2730" strokeWidth="1" />
          <path d="M155 95 L155 85" stroke="#2B2730" strokeWidth="2" strokeLinecap="round" />

          {/* Candle 2 (Center - Main) */}
          <rect x="195" y="85" width="10" height="60" rx="4" fill="#FF8FAB" stroke="#2B2730" strokeWidth="1" />
          <path d="M200 85 L200 75" stroke="#2B2730" strokeWidth="2" strokeLinecap="round" />

          {/* Candle 3 (Right) */}
          <rect x="240" y="95" width="10" height="50" rx="4" fill="#FFD166" stroke="#2B2730" strokeWidth="1" />
          <path d="M245 95 L245 85" stroke="#2B2730" strokeWidth="2" strokeLinecap="round" />

          {/* Candle Flames */}
          {!isCandleBlown ? (
            <g className="flame-glow">
              {/* Flame 1 */}
              <g className="animate-flicker">
                <ellipse cx="155" cy="73" rx="6" ry="12" fill="#FFD166" />
                <ellipse cx="155" cy="74" rx="3.5" ry="7" fill="#FF8FAB" />
                <ellipse cx="155" cy="75" rx="1.5" ry="4" fill="#FFFFFF" />
              </g>
              {/* Flame 2 (Center) */}
              <g className="animate-flicker [animation-delay:200ms]">
                <ellipse cx="200" cy="63" rx="7" ry="14" fill="#FFD166" />
                <ellipse cx="200" cy="64" rx="4" ry="8" fill="#FF8FAB" />
                <ellipse cx="200" cy="65" rx="2" ry="4.5" fill="#FFFFFF" />
              </g>
              {/* Flame 3 */}
              <g className="animate-flicker [animation-delay:400ms]">
                <ellipse cx="245" cy="73" rx="6" ry="12" fill="#FFD166" />
                <ellipse cx="245" cy="74" rx="3.5" ry="7" fill="#FF8FAB" />
                <ellipse cx="245" cy="75" rx="1.5" ry="4" fill="#FFFFFF" />
              </g>
            </g>
          ) : (
            /* Smoke Puffs */
            <g opacity="0.65">
              <path
                d="M155 80 Q145 65 158 50 T150 35"
                fill="none"
                stroke="#8A7F86"
                strokeWidth="3"
                strokeLinecap="round"
                className="animate-pulse"
              />
              <path
                d="M200 70 Q215 50 195 35 T205 15"
                fill="none"
                stroke="#8A7F86"
                strokeWidth="3.5"
                strokeLinecap="round"
                className="animate-pulse"
              />
              <path
                d="M245 80 Q255 65 240 50 T250 35"
                fill="none"
                stroke="#8A7F86"
                strokeWidth="3"
                strokeLinecap="round"
                className="animate-pulse"
              />
            </g>
          )}
        </svg>
      </div>

      {/* Interactive Controls Area */}
      <div className="w-full flex flex-col items-center gap-4 mt-2">
        {!isCandleBlown ? (
          <div className="flex flex-col items-center gap-3 w-full max-w-md">
            {stepIndex < 2 ? (
              <button
                onClick={() => {
                  playClick();
                  setStepIndex((prev) => prev + 1);
                }}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-bday-text text-white text-sm sm:text-base font-semibold shadow-md hover:bg-bday-primary transition-all"
              >
                <span>
                  {stepIndex === 0
                    ? "Sudah Kupejamkan Mataku 😌"
                    : "Sudah Siap Memanjatkan Doa ✨"}
                </span>
                <ArrowRight className="w-4 h-4 text-bday-accent" />
              </button>
            ) : (
              <div className="flex flex-col items-center gap-3 w-full">
                {/* Hold to blow button */}
                <button
                  onMouseDown={startHolding}
                  onMouseUp={stopHolding}
                  onMouseLeave={stopHolding}
                  onTouchStart={startHolding}
                  onTouchEnd={stopHolding}
                  className={`group relative w-full sm:w-80 py-4 px-6 rounded-2xl bg-white border-2 border-bday-secondary shadow-md hover:shadow-lg transition-all text-bday-text font-semibold text-sm sm:text-base flex items-center justify-center gap-3 overflow-hidden ${
                    isHolding ? "scale-95 border-bday-primary bg-bday-subtle" : ""
                  }`}
                >
                  {/* Progress Fill Layer */}
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-bday-secondary/50 to-bday-primary/40 transition-all duration-75 pointer-events-none"
                    style={{ width: `${holdProgress}%` }}
                  />

                  <Wind className={`w-5 h-5 text-bday-primary ${isHolding ? "animate-spin" : ""}`} />
                  <span className="relative z-10">
                    {isHolding
                      ? `Sedang meniup lilin... ${holdProgress}%`
                      : birthdayData.cake.blowPromptTouch}
                  </span>
                </button>

                {/* Microphone Detection Option */}
                {micPermission !== "denied" && micPermission !== "unsupported" && (
                  <div className="flex items-center gap-2 text-xs text-bday-muted">
                    {!isListening ? (
                      <button
                        onClick={startListening}
                        className="inline-flex items-center gap-1.5 hover:text-bday-text underline transition-colors"
                      >
                        <Mic className="w-3.5 h-3.5 text-bday-primary" />
                        <span>Aktifkan tiup lewat mikrofon</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-bday-secondary">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bday-primary opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-bday-primary"></span>
                        </span>
                        <span>Mikrofon Aktif: Tiup ke arah perangkat! (Level: {currentVolume}%)</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          /* When Blown Out: Celebration actions */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-center gap-3"
          >
            <button
              onClick={resetCandles}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-medium text-bday-muted hover:text-bday-text border border-bday-secondary bg-white shadow-sm transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Nyalakan Lilin Lagi</span>
            </button>

            <button
              onClick={() => {
                playClick();
                onNext();
              }}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-bday-text text-white text-sm sm:text-base font-semibold shadow-lg hover:bg-bday-primary hover:shadow-xl transition-all transform active:scale-95"
            >
              <span>Buka Hadiah Spesial 🎁</span>
              <ArrowRight className="w-4 h-4 text-bday-accent" />
            </button>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
