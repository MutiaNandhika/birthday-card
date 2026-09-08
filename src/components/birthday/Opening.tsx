"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Heart } from "lucide-react";
import { birthdayData } from "@/data/birthday";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface OpeningProps {
  onStart: () => void;
}

export function Opening({ onStart }: OpeningProps) {
  const [isOpening, setIsOpening] = useState(false);
  const { playClick, playSparkle } = useSoundEffects();

  const handleOpenClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    playClick();
    playSparkle();
    setTimeout(() => {
      onStart();
    }, 700);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpening ? 0 : 1, scale: isOpening ? 1.04 : 1 }}
      exit={{ opacity: 0, scale: 1.08, filter: "blur(12px)" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center px-6 py-12 text-center select-none"
    >
      {/* Decorative subtle ambient backdrop glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="h-[400px] w-[400px] sm:h-[550px] sm:w-[550px] rounded-full bg-gradient-to-tr from-bday-secondary/35 via-bday-primary/20 to-bday-accent/25 blur-3xl animate-pulse-glow" />
      </div>

      <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
        {/* Subtle decorative heart badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-bday-secondary/60 shadow-sm"
        >
          <Heart className="w-3.5 h-3.5 text-bday-primary fill-bday-primary animate-pulse" />
          <span className="text-xs font-medium tracking-widest uppercase text-bday-muted">
            A Special Day
          </span>
          <Sparkles className="w-3.5 h-3.5 text-bday-accent" />
        </motion.div>

        {/* Personalized Greeting */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-bday-text leading-[1.15]"
        >
          {birthdayData.opening.greeting}
        </motion.h1>

        {/* Sub-greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65 }}
          className="mt-6 text-lg sm:text-2xl text-bday-muted font-normal max-w-md leading-relaxed"
        >
          {birthdayData.opening.subGreeting}
        </motion.p>

        {/* Primary Interactive Open Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9 }}
          className="mt-10 sm:mt-12 flex flex-col items-center gap-3"
        >
          <button
            onClick={handleOpenClick}
            disabled={isOpening}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 sm:px-10 sm:py-4.5 rounded-full bg-bday-text text-white font-medium text-base sm:text-lg shadow-lg hover:shadow-xl hover:bg-bday-primary transition-all duration-300 transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-bday-primary/30"
          >
            <span>{birthdayData.opening.buttonText}</span>
            <ArrowRight className="w-5 h-5 text-bday-accent group-hover:translate-x-1.5 transition-transform duration-300" />
            <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </button>

          {birthdayData.opening.subText && (
            <span className="text-xs text-bday-muted/80 tracking-wide mt-2 font-medium">
              {birthdayData.opening.subText}
            </span>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}
