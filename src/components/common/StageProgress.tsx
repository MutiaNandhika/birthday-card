"use client";

import React from "react";

interface StageProgressProps {
  currentStage: number;
  totalStages: number;
  onSelectStage?: (stageIndex: number) => void;
  visible?: boolean;
}

const STAGE_NAMES = [
  "Opening",
  "Reveal",
  "Envelope",
  "Our Story",
  "Memories",
  "Letter",
  "Make a Wish",
  "Surprise Gift",
  "Final Message",
];

export function StageProgress({
  currentStage,
  totalStages = 9,
  onSelectStage,
  visible = true,
}: StageProgressProps) {
  if (!visible || currentStage === 0) return null;

  return (
    <nav
      aria-label="Story progress"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/70 backdrop-blur-md border border-bday-secondary/40 shadow-sm transition-all duration-500"
    >
      {Array.from({ length: totalStages }).map((_, idx) => {
        const isActive = currentStage === idx;
        const isPast = currentStage > idx;
        return (
          <button
            key={idx}
            onClick={() => onSelectStage?.(idx)}
            aria-label={`Go to stage ${idx + 1}: ${STAGE_NAMES[idx] || `Step ${idx + 1}`}`}
            className={`group relative h-2 transition-all duration-300 rounded-full ${
              isActive
                ? "w-7 bg-bday-primary shadow-sm shadow-bday-primary/40"
                : isPast
                ? "w-2 bg-bday-secondary hover:bg-bday-primary/70"
                : "w-2 bg-bday-subtle hover:bg-bday-secondary"
            }`}
          >
            {/* Tooltip */}
            <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-bday-text px-2 py-0.5 text-[10px] font-medium text-white opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
              {STAGE_NAMES[idx] || `Stage ${idx + 1}`}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
