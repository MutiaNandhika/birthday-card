"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, ArrowRight } from "lucide-react";
import { birthdayData } from "@/data/birthday";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface EnvelopeProps {
  onNext: () => void;
}

export function Envelope({ onNext }: EnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { playClick, playSparkle } = useSoundEffects();

  const handleOpenEnvelope = () => {
    if (isOpen) return;
    setIsOpen(true);
    playClick();
    setTimeout(() => {
      playSparkle();
    }, 450);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.7 }}
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center px-4 py-12 select-none"
    >
      <div className="w-full max-w-lg mx-auto flex flex-col items-center text-center">
        {/* Intro header text */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-8"
        >
          <span className="text-xs font-bold tracking-widest uppercase text-bday-primary bg-white/80 px-3.5 py-1 rounded-full border border-bday-secondary/60">
            {birthdayData.envelope.frontBadge}
          </span>
          <h2 className="mt-3 font-serif text-2xl sm:text-3xl font-bold text-bday-text">
            {birthdayData.envelope.promptText}
          </h2>
        </motion.div>

        {/* 3D Envelope Container */}
        <div className="relative w-full max-w-[340px] sm:max-w-[420px] h-[270px] sm:h-[300px] flex items-center justify-center perspective-1000">
          {/* Main Envelope Body */}
          <motion.div
            onClick={handleOpenEnvelope}
            className={`relative w-full h-[230px] sm:h-[260px] rounded-2xl bg-[#F5ECE5] border border-[#E8DDD4] shadow-envelope cursor-pointer transition-all duration-500 overflow-visible ${
              isOpen ? "cursor-default" : "hover:-translate-y-1.5 hover:shadow-2xl"
            }`}
          >
            {/* Envelope Back Cutout */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#EFE5DC] to-[#E5D7CC] overflow-hidden" />

            {/* Letter Card (Slides up when envelope opens) */}
            <motion.div
              initial={false}
              animate={{
                y: isOpen ? -120 : 0,
                scale: isOpen ? 1.05 : 0.95,
                opacity: isOpen ? 1 : 0.35,
              }}
              transition={{
                duration: 0.85,
                delay: isOpen ? 0.35 : 0,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`absolute left-3 right-3 sm:left-4 sm:right-4 bottom-3 sm:bottom-4 rounded-xl bg-white p-5 sm:p-6 shadow-md border border-bday-secondary/40 text-center transition-all ${
                isOpen ? "z-30 shadow-2xl" : "z-0"
              }`}
            >
              {/* Card Content */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-bday-secondary/30 flex items-center justify-center mb-2.5">
                  <Heart className="w-4 h-4 text-bday-primary fill-bday-primary" />
                </div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-bday-text leading-snug">
                  {birthdayData.envelope.cardHeading}
                </h3>
                <p className="mt-0.5 text-xs text-bday-muted font-normal">
                  {birthdayData.envelope.cardSubheading}
                </p>
                <div className="my-2.5 w-12 h-[1.5px] bg-bday-secondary rounded-full" />
                <p className="font-serif italic text-sm sm:text-base text-bday-text font-semibold leading-relaxed">
                  &ldquo;{birthdayData.envelope.cardMessage}&rdquo;
                </p>
              </div>
            </motion.div>

            {/* Envelope Front Left & Right Pockets */}
            <div
              className="absolute inset-x-0 bottom-0 h-[230px] sm:h-[260px] z-20 pointer-events-none rounded-b-2xl overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #F8F0E8 0%, #EBDDCF 100%)",
                clipPath: "polygon(0 0, 50% 52%, 100% 0, 100% 100%, 0 100%)",
              }}
            />

            {/* Envelope Top Flap (Rotates open) */}
            <motion.div
              initial={false}
              animate={{
                rotateX: isOpen ? 180 : 0,
                zIndex: isOpen ? 0 : 25,
              }}
              transition={{
                duration: 0.6,
                ease: "easeInOut",
              }}
              style={{
                transformOrigin: "top center",
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              }}
              className="absolute inset-x-0 top-0 h-[125px] sm:h-[145px] bg-[#EBDDCF] border-t border-[#DFD0C2] rounded-t-2xl shadow-sm transform-style-3d"
            />

            {/* Wax Seal Button (Front Center) */}
            <AnimatePresence>
              {!isOpen && (
                <motion.div
                  initial={{ scale: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center"
                >
                  <button
                    onClick={handleOpenEnvelope}
                    aria-label="Buka amplop"
                    className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-bday-primary to-bday-primary-hover text-white shadow-xl border-2 border-white/80 hover:scale-110 active:scale-95 transition-all"
                  >
                    <span className="text-xl sm:text-2xl">{birthdayData.envelope.sealInitials}</span>
                    <span className="absolute -inset-1 rounded-full border border-bday-primary/40 animate-ping pointer-events-none" />
                  </button>
                  <span className="mt-3 text-xs font-semibold text-bday-text bg-white/95 px-3 py-1 rounded-full shadow-sm border border-bday-secondary/40">
                    Sentuh untuk membuka 💌
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Continuation Trigger */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-14 sm:mt-16 flex flex-col items-center gap-3 z-30"
            >
              <button
                onClick={() => {
                  playClick();
                  onNext();
                }}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-bday-text text-white font-medium text-sm sm:text-base shadow-md hover:bg-bday-primary hover:shadow-lg transition-all transform active:scale-95"
              >
                <span>Lihat Jejak Cerita Kita</span>
                <ArrowRight className="w-4 h-4 text-bday-accent" />
              </button>
              <div className="flex items-center gap-1.5 text-xs text-bday-muted font-medium">
                <Sparkles className="w-3.5 h-3.5 text-bday-accent" />
                <span>{birthdayData.envelope.cardFooter}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
