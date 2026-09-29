"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Heart, BookOpen, Camera } from "lucide-react";
import { birthdayData } from "@/data/birthday";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { SweetPrayersModal } from "@/components/common/SweetPrayersModal";

interface OpeningProps {
  onStart: () => void;
}

export function Opening({ onStart }: OpeningProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [modalTab, setModalTab] = useState<"letter" | "prayers" | "gallery" | null>(null);
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

  const openQuickModal = (tab: "letter" | "prayers" | "gallery") => {
    playClick();
    setModalTab(tab);
  };

  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpening ? 0 : 1, scale: isOpening ? 1.04 : 1 }}
        exit={{ opacity: 0, scale: 1.08, filter: "blur(12px)" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center px-4 sm:px-6 py-12 text-center select-none"
      >
        {/* Decorative subtle ambient backdrop glow */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
          <div className="h-[380px] w-[380px] sm:h-[550px] sm:w-[550px] rounded-full bg-gradient-to-tr from-bday-secondary/35 via-bday-primary/20 to-bday-accent/25 blur-3xl animate-pulse-glow" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          {/* Decorative heart badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-bday-secondary/70 shadow-sm"
          >
            <Heart className="w-3.5 h-3.5 text-bday-primary fill-bday-primary animate-pulse" />
            <span className="text-xs font-semibold tracking-wider uppercase text-bday-muted">
              Ulang Tahun &amp; 1st Anniversary Spesial
            </span>
            <Sparkles className="w-3.5 h-3.5 text-bday-accent" />
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-bday-text leading-[1.2]"
          >
            {birthdayData.opening.greeting}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.65 }}
            className="mt-5 text-base sm:text-xl text-bday-muted font-normal max-w-lg leading-relaxed"
          >
            {birthdayData.opening.subGreeting}
          </motion.p>

          {/* Primary Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85 }}
            className="mt-8 sm:mt-10 flex flex-col items-center gap-3 w-full"
          >
            <button
              onClick={handleOpenClick}
              disabled={isOpening}
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 sm:px-10 sm:py-4.5 rounded-full bg-bday-text text-white font-medium text-base sm:text-lg shadow-xl hover:shadow-2xl hover:bg-bday-primary transition-all duration-300 transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-bday-primary/30"
            >
              <span>{birthdayData.opening.buttonText}</span>
              <ArrowRight className="w-5 h-5 text-bday-accent group-hover:translate-x-1.5 transition-transform duration-300" />
              <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </button>

            {/* Audio instruction subtext */}
            <span className="text-xs sm:text-sm text-bday-muted/90 tracking-wide mt-2 font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-bday-accent" />
              <span>{birthdayData.opening.subText}</span>
            </span>
          </motion.div>

          {/* Interactive Modal Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1 }}
            className="mt-8 pt-6 border-t border-bday-secondary/30 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3"
          >
            <button
              onClick={() => openQuickModal("letter")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 hover:bg-white text-bday-text text-xs sm:text-sm font-semibold border border-bday-secondary/60 shadow-sm hover:shadow transition-all transform active:scale-95"
            >
              <BookOpen className="w-4 h-4 text-bday-primary" />
              <span>Buka Surat Cinta</span>
            </button>

            <button
              onClick={() => openQuickModal("gallery")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 hover:bg-white text-bday-text text-xs sm:text-sm font-semibold border border-bday-secondary/60 shadow-sm hover:shadow transition-all transform active:scale-95"
            >
              <Camera className="w-4 h-4 text-bday-primary" />
              <span>Lihat Kenangan Kita</span>
            </button>

            <button
              onClick={() => openQuickModal("prayers")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 hover:bg-white text-bday-text text-xs sm:text-sm font-semibold border border-bday-secondary/60 shadow-sm hover:shadow transition-all transform active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-bday-accent" />
              <span>Kumpulan Doa Manis</span>
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* Pop-up Modal */}
      <SweetPrayersModal
        isOpen={modalTab !== null}
        defaultTab={modalTab || "prayers"}
        onClose={() => setModalTab(null)}
      />
    </>
  );
}
