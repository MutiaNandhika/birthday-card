"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, ArrowRight, Sparkles, BookOpen } from "lucide-react";
import { birthdayData, StoryChapter } from "@/data/birthday";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface StoryProps {
  onNext: () => void;
}

export function Story({ onNext }: StoryProps) {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const { playClick, playSparkle } = useSoundEffects();

  const chapters: StoryChapter[] = birthdayData.story;
  const currentChapter = chapters[currentChapterIndex];
  const isLastChapter = currentChapterIndex === chapters.length - 1;

  const handleNextChapter = () => {
    if (isLastChapter) {
      playClick();
      onNext();
    } else {
      playSparkle();
      setCurrentChapterIndex((prev) => prev + 1);
    }
  };

  const handlePrevChapter = () => {
    if (currentChapterIndex > 0) {
      playClick();
      setCurrentChapterIndex((prev) => prev - 1);
    }
  };

  const handleSelectChapter = (index: number) => {
    playClick();
    setCurrentChapterIndex(index);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.7 }}
      className="relative min-h-[100dvh] w-full flex flex-col justify-between px-4 sm:px-6 py-12 max-w-4xl mx-auto"
    >
      {/* Top Section Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-bday-secondary/60 text-xs font-semibold tracking-widest uppercase text-bday-muted mb-2">
          <BookOpen className="w-3.5 h-3.5 text-bday-primary" />
          <span>Our Story Timeline</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-bday-text">
          Moments That Shaped Us
        </h2>
      </div>

      {/* Chapter Navigation Pills */}
      <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8 overflow-x-auto py-1 px-2 no-scrollbar">
        {chapters.map((chapter, index) => {
          const isActive = currentChapterIndex === index;
          return (
            <button
              key={chapter.id}
              onClick={() => handleSelectChapter(index)}
              className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                isActive
                  ? "bg-bday-text text-white shadow-sm"
                  : "bg-white/80 text-bday-muted hover:text-bday-text border border-bday-secondary/50"
              }`}
            >
              {chapter.chapterNumber}
            </button>
          );
        })}
      </div>

      {/* Main Chapter Content Card */}
      <div className="relative w-full my-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentChapter.id}
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -25 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-bday-secondary/40 shadow-xl"
          >
            {/* Visual Image with Polaroid/Editorial Frame */}
            <div className="relative w-full aspect-[4/3] sm:aspect-square rounded-2xl overflow-hidden shadow-md bg-bday-subtle group">
              <Image
                src={currentChapter.image}
                alt={currentChapter.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
              {currentChapter.dateOrYear && (
                <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-bday-text text-xs font-semibold shadow-sm">
                  {currentChapter.dateOrYear}
                </span>
              )}
            </div>

            {/* Narrative Text */}
            <div className="flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 text-bday-primary font-bold text-xs tracking-widest uppercase">
                  <span>{currentChapter.chapterNumber}</span>
                  {currentChapter.accentWord && (
                    <>
                      <span>•</span>
                      <span className="text-bday-accent italic font-serif lowercase">
                        #{currentChapter.accentWord}
                      </span>
                    </>
                  )}
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-bday-text mt-1">
                  {currentChapter.title}
                </h3>

                {currentChapter.subtitle && (
                  <p className="text-xs sm:text-sm text-bday-muted font-medium mt-0.5">
                    {currentChapter.subtitle}
                  </p>
                )}

                <div className="w-12 h-[2px] bg-bday-primary/60 my-4 rounded-full" />

                <p className="text-sm sm:text-base text-bday-text/90 leading-relaxed font-normal">
                  {currentChapter.description}
                </p>
              </div>

              {/* Step counter */}
              <div className="pt-4 flex items-center justify-between border-t border-bday-secondary/30 text-xs text-bday-muted font-medium">
                <span>
                  Chapter {currentChapterIndex + 1} of {chapters.length}
                </span>
                <div className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-bday-accent" />
                  <span>Cherished memory</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Actions & Stepper Controls */}
      <div className="flex items-center justify-between mt-8 pt-4 border-t border-bday-secondary/40">
        <button
          onClick={handlePrevChapter}
          disabled={currentChapterIndex === 0}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
            currentChapterIndex === 0
              ? "opacity-30 cursor-not-allowed text-bday-muted"
              : "bg-white text-bday-text hover:bg-bday-secondary/40 border border-bday-secondary"
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <button
          onClick={handleNextChapter}
          className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-bday-text text-white text-xs sm:text-sm font-medium shadow-md hover:bg-bday-primary hover:shadow-lg transition-all transform active:scale-95"
        >
          <span>{isLastChapter ? "View Photo Gallery" : "Next Chapter"}</span>
          {isLastChapter ? (
            <ArrowRight className="w-4 h-4 text-bday-accent" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>
      </div>
    </motion.section>
  );
}
