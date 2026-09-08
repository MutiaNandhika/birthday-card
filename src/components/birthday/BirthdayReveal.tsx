"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Stars, ArrowDown } from "lucide-react";
import { birthdayData } from "@/data/birthday";
import { triggerGentleConfetti } from "@/components/common/ConfettiEffect";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface BirthdayRevealProps {
  onNext: () => void;
}

export function BirthdayReveal({ onNext }: BirthdayRevealProps) {
  const { playClick, playSparkle } = useSoundEffects();

  useEffect(() => {
    // Fire gentle celebratory confetti on reveal entry
    const timer = setTimeout(() => {
      triggerGentleConfetti();
      playSparkle();
    }, 1400);

    return () => clearTimeout(timer);
  }, [playSparkle]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
      transition={{ duration: 0.8 }}
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center px-6 py-16 text-center select-none"
    >
      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        {/* Subtle date badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-bday-secondary/30 border border-bday-secondary text-bday-text text-xs sm:text-sm font-semibold tracking-wider uppercase"
        >
          <Stars className="w-4 h-4 text-bday-primary" />
          <span>{birthdayData.birthdayDate}</span>
          <Stars className="w-4 h-4 text-bday-primary" />
        </motion.div>

        {/* Staggered Line 1 */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-2xl text-bday-muted font-normal tracking-wide"
        >
          {birthdayData.reveal.line1}
        </motion.p>

        {/* Staggered Line 2 */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-3 text-lg sm:text-2xl text-bday-muted font-normal tracking-wide"
        >
          {birthdayData.reveal.line2}
        </motion.p>

        {/* Grand Dramatic Birthday Heading */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 mb-4 relative"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-bday-primary/20 via-bday-accent/25 to-bday-secondary/30 rounded-3xl blur-xl opacity-70 animate-pulse-glow" />
          <h1 className="relative font-serif text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-bday-text leading-tight">
            <span className="text-gradient-rose">{birthdayData.reveal.celebrationText}</span>
          </h1>
        </motion.div>

        {/* Age / Sub-celebration highlight */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.1 }}
          className="mt-4 font-serif italic text-xl sm:text-2xl text-bday-text/90 max-w-lg leading-relaxed"
        >
          &ldquo;{birthdayData.reveal.subCelebration}&rdquo;
        </motion.p>

        {/* Decorative sparkles */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 0.6 }}
          className="flex items-center justify-center gap-3 my-8 text-bday-accent"
        >
          <Sparkles className="w-5 h-5 animate-bounce" />
          <span className="w-12 h-[1px] bg-bday-secondary" />
          <Sparkles className="w-5 h-5 animate-bounce [animation-delay:200ms]" />
          <span className="w-12 h-[1px] bg-bday-secondary" />
          <Sparkles className="w-5 h-5 animate-bounce [animation-delay:400ms]" />
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.6 }}
          className="mt-2"
        >
          <button
            onClick={() => {
              playClick();
              onNext();
            }}
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white text-bday-text font-medium text-sm sm:text-base border border-bday-secondary/80 shadow-md hover:shadow-lg hover:border-bday-primary transition-all duration-300 transform active:scale-95"
          >
            <span>Continue the journey</span>
            <ArrowDown className="w-4 h-4 text-bday-primary group-hover:translate-y-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
}
