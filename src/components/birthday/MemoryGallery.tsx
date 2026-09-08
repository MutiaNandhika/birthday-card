"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Sparkles, ArrowRight, RotateCw, MapPin, Calendar, X } from "lucide-react";
import { birthdayData, MemoryItem } from "@/data/birthday";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface MemoryGalleryProps {
  onNext: () => void;
}

export function MemoryGallery({ onNext }: MemoryGalleryProps) {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [activeModalMemory, setActiveModalMemory] = useState<MemoryItem | null>(null);
  const { playClick, playSparkle } = useSoundEffects();

  const memories: MemoryItem[] = birthdayData.memories;

  const toggleFlip = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    playClick();
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCardClick = (memory: MemoryItem) => {
    playSparkle();
    setActiveModalMemory(memory);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.7 }}
      className="relative min-h-[100dvh] w-full flex flex-col justify-between px-4 sm:px-6 py-12 max-w-5xl mx-auto select-none"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-bday-secondary/60 text-xs font-semibold tracking-widest uppercase text-bday-muted mb-2">
          <Camera className="w-3.5 h-3.5 text-bday-primary" />
          <span>Memory Keepsakes</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-bday-text">
          Snapshots of Beautiful Times
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-bday-muted">
          Tap any Polaroid photo to view closely or flip for a secret note ✨
        </p>
      </div>

      {/* Polaroid Gallery Grid / Mobile Carousel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-center justify-center my-auto py-4">
        {memories.map((mem, index) => {
          const isFlipped = !!flippedCards[mem.id];
          const rotationDegree = mem.rotation || (index % 2 === 0 ? -2.5 : 2.5);

          return (
            <motion.div
              key={mem.id}
              initial={{ opacity: 0, y: 30, rotate: 0 }}
              animate={{ opacity: 1, y: 0, rotate: rotationDegree }}
              whileHover={{ scale: 1.04, rotate: 0, zIndex: 20 }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="relative perspective-1000 mx-auto w-full max-w-[280px] sm:max-w-none cursor-pointer"
              onClick={() => handleCardClick(mem)}
            >
              {/* Decorative Washi Tape Accent at Top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-[#FFE3E8]/80 backdrop-blur-sm border border-bday-secondary/50 rotate-[-4deg] z-20 shadow-sm" />

              {/* 3D Flip Card Container */}
              <div
                className={`relative w-full rounded-xl bg-white p-3.5 sm:p-4 shadow-polaroid hover:shadow-polaroid-hover transition-all duration-500 transform-style-3d ${
                  isFlipped ? "[transform:rotateY(180deg)]" : ""
                }`}
              >
                {/* Front: Polaroid Photo */}
                <div className="backface-hidden">
                  <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-bday-subtle">
                    <Image
                      src={mem.image}
                      alt={mem.caption}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                    {/* Subtle Polaroid vintage vignette sheen */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 pointer-events-none" />
                  </div>

                  {/* Polaroid Handwritten Caption Area */}
                  <div className="pt-3 pb-1 flex flex-col justify-between">
                    <p className="font-handwriting text-lg sm:text-xl font-bold text-bday-text truncate">
                      {mem.caption}
                    </p>
                    <div className="flex items-center justify-between mt-1 text-[11px] text-bday-muted">
                      <span>{mem.date || "Special Memory"}</span>
                      <button
                        onClick={(e) => toggleFlip(mem.id, e)}
                        aria-label="Flip card for note"
                        className="p-1 rounded hover:bg-bday-secondary/30 text-bday-primary transition-colors"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Back: Secret Note */}
                <div className="absolute inset-0 p-5 rounded-xl bg-gradient-to-br from-[#FFF9F5] to-[#FFE8EE] border border-bday-secondary/40 flex flex-col justify-between [transform:rotateY(180deg)] backface-hidden">
                  <div>
                    <div className="flex items-center justify-between text-bday-primary text-xs font-bold mb-2">
                      <span className="tracking-widest uppercase">Secret Note</span>
                      <button
                        onClick={(e) => toggleFlip(mem.id, e)}
                        aria-label="Flip back"
                        className="p-1 hover:bg-white/60 rounded"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="font-handwriting text-base sm:text-lg text-bday-text leading-relaxed mt-2">
                      &ldquo;{mem.note || mem.caption}&rdquo;
                    </p>
                  </div>
                  <div className="text-[11px] text-bday-muted border-t border-bday-secondary/40 pt-2 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-bday-primary" />
                    <span>{mem.location || "Somewhere special"}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Modal Zoom Lightbox View */}
      <AnimatePresence>
        {activeModalMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModalMemory(null)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-white rounded-3xl p-5 sm:p-7 shadow-2xl border border-white/60 overflow-hidden"
            >
              <button
                onClick={() => setActiveModalMemory(null)}
                aria-label="Close memory preview"
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-bday-text"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-bday-subtle shadow-inner">
                <Image
                  src={activeModalMemory.image}
                  alt={activeModalMemory.caption}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="mt-5 space-y-2 text-center">
                <h3 className="font-serif text-2xl font-bold text-bday-text">
                  {activeModalMemory.caption}
                </h3>
                {activeModalMemory.note && (
                  <p className="font-handwriting text-xl text-bday-primary italic">
                    &ldquo;{activeModalMemory.note}&rdquo;
                  </p>
                )}
                <div className="pt-3 flex items-center justify-center gap-4 text-xs text-bday-muted font-medium border-t border-bday-secondary/30 mt-3">
                  {activeModalMemory.date && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-bday-primary" />
                      {activeModalMemory.date}
                    </span>
                  )}
                  {activeModalMemory.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-bday-primary" />
                      {activeModalMemory.location}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Continuation Button */}
      <div className="flex flex-col items-center gap-3 mt-8 pt-4 border-t border-bday-secondary/40 text-center">
        <button
          onClick={() => {
            playClick();
            onNext();
          }}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-bday-text text-white text-sm sm:text-base font-medium shadow-md hover:bg-bday-primary hover:shadow-lg transition-all transform active:scale-95"
        >
          <span>Read My Letter to You</span>
          <ArrowRight className="w-4 h-4 text-bday-accent" />
        </button>
        <div className="flex items-center gap-1 text-xs text-bday-muted">
          <Sparkles className="w-3 h-3 text-bday-accent" />
          <span>Next: An intimate birthday letter</span>
        </div>
      </div>
    </motion.section>
  );
}
