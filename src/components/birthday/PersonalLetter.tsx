"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, ArrowRight, BookMarked, CheckCircle2 } from "lucide-react";
import { birthdayData } from "@/data/birthday";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface PersonalLetterProps {
  onNext: () => void;
}

export function PersonalLetter({ onNext }: PersonalLetterProps) {
  const [revealedIndex, setRevealedIndex] = useState(0);
  const { playClick, playSparkle } = useSoundEffects();

  const letter = birthdayData.letter;
  const paragraphs = letter.paragraphs;
  const isFullyRevealed = revealedIndex >= paragraphs.length - 1;

  const handleRevealNext = () => {
    if (isFullyRevealed) {
      playClick();
      onNext();
    } else {
      playSparkle();
      setRevealedIndex((prev) => prev + 1);
    }
  };

  const handleRevealAll = () => {
    playSparkle();
    setRevealedIndex(paragraphs.length - 1);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-[100dvh] w-full flex flex-col justify-between px-4 sm:px-6 py-12 max-w-3xl mx-auto select-none"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-bday-secondary/60 text-xs font-semibold tracking-widest uppercase text-bday-muted mb-3 shadow-sm"
        >
          <BookMarked className="w-3.5 h-3.5 text-bday-primary" />
          <span>A Personal Letter</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="font-serif italic text-2xl sm:text-3xl font-bold text-bday-text"
        >
          &ldquo;{letter.leadText}&rdquo;
        </motion.h2>
      </div>

      {/* Main Letter Card */}
      <div className="relative my-auto w-full bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-bday-secondary/50 shadow-2xl space-y-6">
        {/* Decorative Top Accent */}
        <div className="flex items-center justify-center gap-2 text-bday-secondary mb-2">
          <span className="w-12 h-[1px] bg-bday-secondary/60" />
          <Heart className="w-4 h-4 text-bday-primary fill-bday-primary" />
          <span className="w-12 h-[1px] bg-bday-secondary/60" />
        </div>

        {/* Progressive Paragraphs */}
        <div className="space-y-5 text-bday-text/90 font-serif leading-relaxed text-base sm:text-lg md:text-xl">
          {paragraphs.slice(0, revealedIndex + 1).map((para, index) => {
            const isLatest = index === revealedIndex;

            return (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className={`transition-all ${
                  isLatest ? "text-bday-text font-medium" : "text-bday-text/80"
                }`}
              >
                {para}
              </motion.p>
            );
          })}
        </div>

        {/* Signature (Shown once letter is complete) */}
        <AnimatePresence>
          {isFullyRevealed && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="pt-6 border-t border-bday-secondary/40 text-right space-y-1"
            >
              <p className="font-handwriting text-2xl sm:text-3xl text-bday-primary font-bold">
                {letter.signature}
              </p>
              <p className="text-xs text-bday-muted font-sans uppercase tracking-widest">
                Always &amp; Forever
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Interactive Progressive Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-4 border-t border-bday-secondary/40">
        <div className="flex items-center gap-2 text-xs text-bday-muted font-medium">
          <Sparkles className="w-4 h-4 text-bday-accent" />
          <span>
            {isFullyRevealed
              ? "Letter completed ✨"
              : `Reading ${revealedIndex + 1} of ${paragraphs.length} thoughts`}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {!isFullyRevealed && (
            <button
              onClick={handleRevealAll}
              className="px-4 py-2 text-xs text-bday-muted hover:text-bday-text transition-colors"
            >
              Read full letter
            </button>
          )}

          <button
            onClick={handleRevealNext}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-bday-text text-white text-sm sm:text-base font-medium shadow-md hover:bg-bday-primary hover:shadow-lg transition-all transform active:scale-95"
          >
            <span>{isFullyRevealed ? "Time for the Cake 🎂" : "Read Next Thought"}</span>
            {isFullyRevealed ? (
              <ArrowRight className="w-4 h-4 text-bday-accent" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-bday-accent" />
            )}
          </button>
        </div>
      </div>
    </motion.section>
  );
}
