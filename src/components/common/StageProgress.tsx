"use client";

import React from "react";

interface StageProgressProps {
  currentStage: number;
  totalStages: number;
  onSelectStage?: (stageIndex: number) => void;
  visible?: boolean;
}

const STAGE_NAMES = [
  "Pembuka",
  "Ucapan Spesial",
  "Amplop Cinta",
  "Cerita 1 Tahun",
  "10 Kenangan",
  "Surat Pribadi",
  "Tiup Lilin",
  "Hadiah Spesial",
  "Pesan Abadi",
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
      aria-label="Progres cerita perjalanan"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-bday-secondary/50 shadow-md transition-all duration-500"
    >
      {Array.from({ length: totalStages }).map((_, idx) => {
        const isActive = currentStage === idx;
        const isPast = currentStage > idx;
        return (
          <button
            key={idx}
            onClick={() => onSelectStage?.(idx)}
            aria-label={`Beralih ke tahap ${idx + 1}: ${STAGE_NAMES[idx] || `Tahap ${idx + 1}`}`}
            className={`group relative h-2 transition-all duration-300 rounded-full ${
              isActive
                ? "w-7 bg-bday-primary shadow-sm shadow-bday-primary/40"
                : isPast
                ? "w-2 bg-bday-secondary hover:bg-bday-primary/70"
                : "w-2 bg-bday-subtle hover:bg-bday-secondary"
            }`}
          >
            {/* Tooltip */}
            <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-bday-text px-2.5 py-1 text-[10px] font-semibold text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100">
              {STAGE_NAMES[idx] || `Tahap ${idx + 1}`}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
