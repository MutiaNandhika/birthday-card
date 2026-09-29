"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Sparkles, ArrowRight, RotateCw, MapPin, Calendar, X, Heart } from "lucide-react";
import { birthdayData, MemoryItem } from "@/data/birthday";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface MemoryGalleryProps {
  onNext: () => void;
}

export function MemoryGallery({ onNext }: MemoryGalleryProps) {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [activeModalMemory, setActiveModalMemory] = useState<MemoryItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("Semua");
  const { playClick, playSparkle } = useSoundEffects();

  const allMemories: MemoryItem[] = birthdayData.memories;

  const categories = ["Semua", "Momen Manis", "Doa & Harapan", "1st Anniversary"];

  const filteredMemories =
    activeCategory === "Semua"
      ? allMemories
      : allMemories.filter((m) => m.category === activeCategory);

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

  const handleCategorySelect = (cat: string) => {
    playClick();
    setActiveCategory(cat);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.7 }}
      className="relative min-h-[100dvh] w-full flex flex-col justify-between px-3 sm:px-6 py-10 max-w-6xl mx-auto select-none"
    >
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/85 border border-bday-secondary/70 text-xs font-semibold tracking-widest uppercase text-bday-muted mb-2 shadow-sm">
          <Camera className="w-3.5 h-3.5 text-bday-primary" />
          <span>10 Galeri Kenangan Pilihan</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-bday-text">
          Jejak Manis yang Kita Lewati Berdua
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-bday-muted max-w-lg mx-auto">
          Sentuh foto Polaroid untuk memperbesar atau putar kartu untuk membaca pesan rahasia di baliknya ✨
        </p>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-bday-primary text-white shadow-sm"
                  : "bg-white/80 text-bday-muted hover:text-bday-text border border-bday-secondary/50"
              }`}
            >
              {cat === "Semua" ? `Semua (10 Foto)` : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Polaroid Gallery Grid */}
      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-5 items-stretch justify-center my-auto py-2"
      >
        <AnimatePresence>
          {filteredMemories.map((mem, index) => {
            const isFlipped = !!flippedCards[mem.id];
            const rotationDegree = mem.rotation || (index % 2 === 0 ? -1.5 : 1.5);

            return (
              <motion.div
                key={mem.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1, rotate: rotationDegree }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.04, rotate: 0, zIndex: 20 }}
                transition={{ duration: 0.4 }}
                className="relative perspective-1000 w-full cursor-pointer flex"
                onClick={() => handleCardClick(mem)}
              >
                {/* Decorative Washi Tape Accent at Top */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-4 bg-[#FFE3E8]/90 backdrop-blur-sm border border-bday-secondary/60 rotate-[-3deg] z-20 shadow-sm rounded-sm pointer-events-none" />

                {/* 3D Flip Card Container */}
                <div
                  className={`relative w-full rounded-2xl bg-white p-2.5 sm:p-3 shadow-polaroid hover:shadow-polaroid-hover transition-all duration-500 transform-style-3d flex flex-col justify-between border border-bday-secondary/30 ${
                    isFlipped ? "[transform:rotateY(180deg)]" : ""
                  }`}
                >
                  {/* Front: Polaroid Photo */}
                  <div className="backface-hidden flex flex-col justify-between h-full">
                    <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-bday-subtle">
                      <Image
                        src={mem.image}
                        alt={mem.caption}
                        fill
                        sizes="(max-width: 768px) 50vw, 20vw"
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                      {/* Badge Number */}
                      <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md bg-black/50 text-white text-[10px] font-semibold backdrop-blur-sm">
                        #{allMemories.findIndex((m) => m.id === mem.id) + 1}
                      </span>
                    </div>

                    {/* Polaroid Handwritten Caption Area */}
                    <div className="pt-2 pb-0.5 flex flex-col justify-between">
                      <p className="font-serif font-bold text-xs sm:text-sm text-bday-text truncate">
                        {mem.caption}
                      </p>
                      <div className="flex items-center justify-between mt-1 text-[10px] text-bday-muted">
                        <span className="truncate">{mem.date || "Momen Indah"}</span>
                        <button
                          onClick={(e) => toggleFlip(mem.id, e)}
                          aria-label="Putar kartu"
                          className="p-1 rounded hover:bg-bday-secondary/30 text-bday-primary transition-colors flex-shrink-0"
                          title="Buka Catatan"
                        >
                          <RotateCw className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Back: Secret Note */}
                  <div className="absolute inset-0 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-[#FFF9F5] to-[#FFE8EE] border border-bday-secondary/50 flex flex-col justify-between [transform:rotateY(180deg)] backface-hidden">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-bday-primary text-[11px] font-bold">
                        <span className="tracking-wider uppercase flex items-center gap-1">
                          <Heart className="w-3 h-3 fill-bday-primary" />
                          <span>Catatan Cinta</span>
                        </span>
                        <button
                          onClick={(e) => toggleFlip(mem.id, e)}
                          aria-label="Putar kembali"
                          className="p-1 hover:bg-white/60 rounded text-bday-muted"
                        >
                          <RotateCw className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="font-handwriting text-sm sm:text-base text-bday-text leading-snug pt-1">
                        &ldquo;{mem.note || mem.caption}&rdquo;
                      </p>
                    </div>
                    <div className="text-[10px] text-bday-muted border-t border-bday-secondary/30 pt-1.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-bday-primary flex-shrink-0" />
                      <span className="truncate">{mem.location || "Tempat Bersejarah Kita"}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Modal Zoom Lightbox View */}
      <AnimatePresence>
        {activeModalMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModalMemory(null)}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
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
                aria-label="Tutup preview kenangan"
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center text-bday-text transition-colors"
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
                <span className="text-xs font-bold uppercase tracking-widest text-bday-primary">
                  {activeModalMemory.category || "Memori Spesial"}
                </span>
                <h3 className="font-serif text-2xl font-bold text-bday-text">
                  {activeModalMemory.caption}
                </h3>
                {activeModalMemory.note && (
                  <p className="font-handwriting text-xl text-bday-primary italic leading-relaxed pt-1">
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
      <div className="flex flex-col items-center gap-2 mt-6 pt-4 border-t border-bday-secondary/40 text-center">
        <button
          onClick={() => {
            playClick();
            onNext();
          }}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-bday-text text-white text-sm sm:text-base font-semibold shadow-md hover:bg-bday-primary hover:shadow-lg transition-all transform active:scale-95"
        >
          <span>Baca Surat Cinta untuk Ibrahim</span>
          <ArrowRight className="w-4 h-4 text-bday-accent" />
        </button>
        <div className="flex items-center gap-1 text-xs text-bday-muted">
          <Sparkles className="w-3 h-3 text-bday-accent" />
          <span>Selanjutnya: Ungkapan rasa syukur dan doa yang tulus</span>
        </div>
      </div>
    </motion.section>
  );
}
