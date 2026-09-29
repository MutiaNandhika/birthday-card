"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, RotateCcw, Share2, Check, BookOpen } from "lucide-react";
import { birthdayData } from "@/data/birthday";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { SweetPrayersModal } from "@/components/common/SweetPrayersModal";

interface FinalMessageProps {
  onReplay: () => void;
}

export function FinalMessage({ onReplay }: FinalMessageProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { playClick, playSparkle } = useSoundEffects();

  const final = birthdayData.finalMessage;

  const handleShare = () => {
    playSparkle();
    if (navigator?.clipboard && typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.9 }}
        className="relative min-h-[100dvh] w-full flex flex-col justify-between items-center px-4 sm:px-6 py-14 max-w-2xl mx-auto select-none text-center"
      >
        {/* Decorative ambient backdrop */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
          <div className="h-[450px] w-[450px] rounded-full bg-gradient-to-tr from-bday-primary/20 via-bday-secondary/30 to-bday-accent/25 blur-3xl animate-pulse-glow" />
        </div>

        {/* Top Wishing Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-bday-secondary/70 text-xs font-semibold tracking-wider text-bday-muted shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-bday-accent" />
          <span>{final.wishingTag}</span>
          <Sparkles className="w-3.5 h-3.5 text-bday-accent" />
        </motion.div>

        {/* Center Emotional Culmination */}
        <div className="my-auto space-y-6 max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg sm:text-2xl text-bday-muted font-normal tracking-wide"
          >
            {final.openingQuote}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-bday-text font-bold leading-relaxed px-2"
          >
            &ldquo;{final.leadQuote}&rdquo;
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="pt-4"
          >
            <div className="inline-block p-1 rounded-3xl bg-gradient-to-r from-bday-secondary/40 via-bday-primary/30 to-bday-accent/40 shadow-xl">
              <div className="bg-white/95 px-6 sm:px-8 py-6 rounded-[22px] backdrop-blur-md">
                <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-extrabold text-bday-text">
                  <span className="text-gradient-rose">{final.mainCelebration}</span>
                </h1>
                <p className="mt-2.5 text-sm sm:text-base text-bday-muted font-medium">
                  {final.closingLine}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7, duration: 0.7 }}
            className="pt-2 flex items-center justify-center gap-2 text-bday-primary font-handwriting text-2xl sm:text-3xl"
          >
            <Heart className="w-5 h-5 fill-bday-primary" />
            <span>{final.authorSignature}</span>
            <Heart className="w-5 h-5 fill-bday-primary" />
          </motion.div>
        </div>

        {/* Action Buttons: Replay, Share, and Open Prayers Modal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 pt-4 border-t border-bday-secondary/40 w-full"
        >
          <button
            onClick={() => {
              playClick();
              setIsModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-bday-primary text-white font-semibold text-xs sm:text-sm shadow-md hover:bg-bday-primary-hover transition-all transform active:scale-95"
          >
            <BookOpen className="w-4 h-4 text-white" />
            <span>Kumpulan Doa &amp; Surat</span>
          </button>

          <button
            onClick={() => {
              playClick();
              onReplay();
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-bday-text font-semibold text-xs sm:text-sm border border-bday-secondary shadow-sm hover:shadow hover:bg-bday-secondary/30 transition-all transform active:scale-95"
          >
            <RotateCcw className="w-4 h-4 text-bday-primary" />
            <span>Ulangi Perjalanan</span>
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-bday-text text-white font-semibold text-xs sm:text-sm shadow-md hover:bg-bday-primary transition-all transform active:scale-95"
          >
            {copiedLink ? (
              <>
                <Check className="w-4 h-4 text-bday-accent" />
                <span>Tautan Tersalin!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-bday-accent" />
                <span>Salin Tautan</span>
              </>
            )}
          </button>
        </motion.div>
      </motion.section>

      {/* Pop-up Modal for Sweet Prayers */}
      <SweetPrayersModal
        isOpen={isModalOpen}
        defaultTab="prayers"
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
