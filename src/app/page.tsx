"use client";

import React, { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { birthdayData } from "@/data/birthday";
import { AmbientParticles } from "@/components/common/AmbientParticles";
import { MusicPlayer } from "@/components/common/MusicPlayer";
import { StageProgress } from "@/components/common/StageProgress";

import { Opening } from "@/components/birthday/Opening";
import { BirthdayReveal } from "@/components/birthday/BirthdayReveal";
import { Envelope } from "@/components/birthday/Envelope";
import { Story } from "@/components/birthday/Story";
import { MemoryGallery } from "@/components/birthday/MemoryGallery";
import { PersonalLetter } from "@/components/birthday/PersonalLetter";
import { BirthdayCake } from "@/components/birthday/BirthdayCake";
import { FinalSurprise } from "@/components/birthday/FinalSurprise";
import { FinalMessage } from "@/components/birthday/FinalMessage";

export default function BirthdayJourneyPage() {
  const [currentStage, setCurrentStage] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const totalStages = 9;

  const goToNextStage = useCallback(() => {
    setCurrentStage((prev) => Math.min(prev + 1, totalStages - 1));
  }, [totalStages]);

  const handleStartJourney = () => {
    setHasStarted(true);
    goToNextStage();
  };

  const handleReplay = () => {
    setCurrentStage(0);
    setHasStarted(false);
  };

  // Keyboard navigation support for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && currentStage > 0 && currentStage < totalStages - 1) {
        goToNextStage();
      } else if (e.key === "ArrowLeft" && currentStage > 1) {
        setCurrentStage((prev) => Math.max(1, prev - 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentStage, goToNextStage, totalStages]);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-bday-bg text-bday-text flex flex-col justify-center items-center font-sans antialiased selection:bg-bday-secondary selection:text-bday-text">
      {/* Ambient Floating Dust & Bokeh Particles */}
      <AmbientParticles />

      {/* Floating Audio Controller */}
      <MusicPlayer
        musicUrl={birthdayData.musicUrl}
        musicTitle={birthdayData.musicTitle}
        autoPlayTrigger={hasStarted}
      />

      {/* Main Interactive Stage Container */}
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {currentStage === 0 && (
            <Opening key="stage-0" onStart={handleStartJourney} />
          )}

          {currentStage === 1 && (
            <BirthdayReveal key="stage-1" onNext={goToNextStage} />
          )}

          {currentStage === 2 && (
            <Envelope key="stage-2" onNext={goToNextStage} />
          )}

          {currentStage === 3 && (
            <Story key="stage-3" onNext={goToNextStage} />
          )}

          {currentStage === 4 && (
            <MemoryGallery key="stage-4" onNext={goToNextStage} />
          )}

          {currentStage === 5 && (
            <PersonalLetter key="stage-5" onNext={goToNextStage} />
          )}

          {currentStage === 6 && (
            <BirthdayCake key="stage-6" onNext={goToNextStage} />
          )}

          {currentStage === 7 && (
            <FinalSurprise key="stage-7" onNext={goToNextStage} />
          )}

          {currentStage === 8 && (
            <FinalMessage key="stage-8" onReplay={handleReplay} />
          )}
        </AnimatePresence>
      </div>

      {/* Subtle Progress Indicator */}
      <StageProgress
        currentStage={currentStage}
        totalStages={totalStages}
        onSelectStage={(idx) => setCurrentStage(idx)}
        visible={currentStage > 0}
      />
    </main>
  );
}
