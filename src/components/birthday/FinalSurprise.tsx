"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Sparkles, ArrowRight, Award, Copy, Check } from "lucide-react";
import { birthdayData } from "@/data/birthday";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { triggerCelebrationConfetti, triggerStarBurst } from "@/components/common/ConfettiEffect";

interface FinalSurpriseProps {
  onNext: () => void;
}

export function FinalSurprise({ onNext }: FinalSurpriseProps) {
  const [stagePhase, setStagePhase] = useState<"false-ending" | "revealing-box" | "gift-opened">("false-ending");
  const [copiedVoucher, setCopiedVoucher] = useState(false);
  const { playClick, playGiftOpen, playSparkle } = useSoundEffects();

  const gift = birthdayData.gift;

  const handleRevealBox = () => {
    playClick();
    setStagePhase("revealing-box");
  };

  const handleOpenGift = () => {
    playGiftOpen();
    triggerCelebrationConfetti();
    triggerStarBurst();
    setStagePhase("gift-opened");
  };

  const copyCode = (code: string) => {
    playSparkle();
    navigator?.clipboard?.writeText(code);
    setCopiedVoucher(true);
    setTimeout(() => setCopiedVoucher(false), 2000);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-[100dvh] w-full flex flex-col justify-between items-center px-4 sm:px-6 py-12 max-w-2xl mx-auto select-none text-center"
    >
      {/* PHASE 1: FALSE ENDING */}
      <AnimatePresence mode="wait">
        {stagePhase === "false-ending" && (
          <motion.div
            key="phase-1"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.7 }}
            className="my-auto flex flex-col items-center max-w-md"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-bday-muted mb-3">
              One more thing...
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-bday-text leading-tight">
              &ldquo;And that is the end of the journey...&rdquo;
            </h2>
            <p className="mt-4 text-sm sm:text-base text-bday-muted font-normal">
              Or at least, that&apos;s what you thought. 😉
            </p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-8"
            >
              <button
                onClick={handleRevealBox}
                className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-bday-primary text-white font-semibold text-base shadow-lg hover:bg-bday-primary-hover hover:shadow-xl transition-all transform active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-bday-accent animate-spin" />
                <span>Wait, what is this? 👀</span>
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* PHASE 2: GIFT BOX (READY TO OPEN) */}
        {stagePhase === "revealing-box" && (
          <motion.div
            key="phase-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="my-auto flex flex-col items-center max-w-md w-full"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-bday-secondary/60 text-xs font-semibold tracking-widest uppercase text-bday-muted mb-3">
              <Gift className="w-3.5 h-3.5 text-bday-primary" />
              <span>{gift.giftTag}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-bday-text">
              {gift.title}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-bday-muted">
              {gift.subtitle}
            </p>

            {/* Interactive 3D Gift Box Illustration */}
            <div
              onClick={handleOpenGift}
              className="group relative my-8 w-48 h-48 sm:w-56 sm:h-56 cursor-pointer flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-bday-accent/20 rounded-full blur-2xl animate-pulse-glow" />

              <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl overflow-visible transition-transform duration-300 group-hover:scale-105">
                {/* Box Base */}
                <rect x="35" y="80" width="130" height="95" rx="12" fill="#FF8FAB" stroke="#FA7296" stroke-width="2" />
                {/* Vertical Ribbon */}
                <rect x="88" y="80" width="24" height="95" fill="#FFD166" />
                
                {/* Box Lid */}
                <g className="transition-transform duration-300 group-hover:-translate-y-2">
                  <rect x="25" y="55" width="150" height="30" rx="8" fill="#FFC2D1" stroke="#FF8FAB" stroke-width="2" />
                  <rect x="88" y="55" width="24" height="30" fill="#FFD166" />
                  {/* Ribbon Bow Left */}
                  <path d="M 90 55 C 60 20, 60 50, 90 55" fill="#FFD166" stroke="#FA7296" stroke-width="1.5" />
                  {/* Ribbon Bow Right */}
                  <path d="M 110 55 C 140 20, 140 50, 110 55" fill="#FFD166" stroke="#FA7296" stroke-width="1.5" />
                  <circle cx="100" cy="55" r="7" fill="#FF8FAB" />
                </g>
              </svg>

              <span className="absolute -bottom-2 px-4 py-1.5 rounded-full bg-white font-semibold text-xs text-bday-text shadow-md border border-bday-secondary">
                Tap to unwrap 🎁
              </span>
            </div>

            <button
              onClick={handleOpenGift}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-bday-text text-white font-semibold text-sm sm:text-base shadow-lg hover:bg-bday-primary transition-all transform active:scale-95"
            >
              <span>Open Surprise Gift</span>
              <Gift className="w-4 h-4 text-bday-accent" />
            </button>
          </motion.div>
        )}

        {/* PHASE 3: GIFT REVEALED */}
        {stagePhase === "gift-opened" && (
          <motion.div
            key="phase-3"
            initial={{ opacity: 0, scale: 0.85, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="my-auto w-full max-w-lg bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-bday-secondary/60 shadow-2xl space-y-6 text-center"
          >
            <div className="w-12 h-12 rounded-full bg-bday-accent/30 text-bday-text flex items-center justify-center mx-auto">
              <Award className="w-6 h-6 text-bday-primary" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-bday-primary">
                VIP Keepsake Unlocked
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-bday-text mt-1">
                {gift.revealedTitle}
              </h3>
              <p className="mt-3 text-sm sm:text-base text-bday-text/90 leading-relaxed">
                {gift.revealedMessage}
              </p>
            </div>

            {/* Revealed Graphic / Certificate Card */}
            {gift.revealedImage && (
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-bday-secondary/50 shadow-inner bg-bday-subtle">
                <Image
                  src={gift.revealedImage}
                  alt={gift.revealedTitle}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Special Voucher Pass Info */}
            {gift.specialVoucher && (
              <div className="p-4 rounded-2xl bg-bday-subtle/70 border border-bday-secondary/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
                <div>
                  <p className="text-xs font-semibold text-bday-muted uppercase tracking-wider">
                    Voucher Pass
                  </p>
                  <p className="font-mono text-xs sm:text-sm font-bold text-bday-text">
                    {gift.specialVoucher.code}
                  </p>
                  <p className="text-[11px] text-bday-muted">
                    {gift.specialVoucher.description}
                  </p>
                </div>
                <button
                  onClick={() => copyCode(gift.specialVoucher?.code || "")}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-bday-secondary text-xs font-medium text-bday-text hover:bg-bday-secondary/30 transition-all"
                >
                  {copiedVoucher ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-600" />
                      <span className="text-green-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-bday-primary" />
                      <span>Copy Pass</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Final Stage Progression Button */}
            <div className="pt-2">
              <button
                onClick={() => {
                  playClick();
                  onNext();
                }}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-bday-text text-white font-medium text-sm sm:text-base shadow-lg hover:bg-bday-primary transition-all transform active:scale-95"
              >
                <span>Final Birthday Message</span>
                <ArrowRight className="w-4 h-4 text-bday-accent" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
