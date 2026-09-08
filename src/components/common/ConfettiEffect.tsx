"use client";

import confetti from "canvas-confetti";

export const triggerGentleConfetti = () => {
  if (typeof window === "undefined") return;
  confetti({
    particleCount: 40,
    spread: 60,
    origin: { y: 0.75 },
    colors: ["#FF8FAB", "#FFC2D1", "#FFD166", "#FFF0F5"],
    ticks: 200,
    gravity: 0.8,
    scalar: 0.9,
    shapes: ["circle"],
  });
};

export const triggerCelebrationConfetti = () => {
  if (typeof window === "undefined") return;

  const count = 120;
  const defaults = {
    origin: { y: 0.65 },
    colors: ["#FF8FAB", "#FFC2D1", "#FFD166", "#FA7296", "#FFE5EC"],
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 45,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 40,
  });
};

export const triggerStarBurst = () => {
  if (typeof window === "undefined") return;

  confetti({
    particleCount: 50,
    spread: 80,
    origin: { y: 0.6 },
    colors: ["#FFD166", "#FFC2D1", "#FFFFFF"],
    shapes: ["star"],
    scalar: 1.2,
    ticks: 180,
  });
};
