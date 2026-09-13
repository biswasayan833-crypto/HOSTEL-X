"use client";

import { useEffect, useState } from "react";

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    // Fast, elegant telemetry counter (total ~1.1s)
    const startTime = performance.now();
    const duration = 900; // 900ms fast telemetry progression

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (elapsed < duration) {
        requestAnimationFrame(updateProgress);
      } else {
        // Complete initialization
        setIsFading(true);
        setTimeout(() => {
          setIsRemoved(true);
          onComplete();
        }, 450);
      }
    };

    const animFrame = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animFrame);
  }, [onComplete]);

  if (isRemoved) return null;

  return (
    <aside
      aria-label="System Initializer"
      className={`fixed inset-0 z-50 flex flex-col justify-between p-6 sm:p-12 bg-[#050608] text-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isFading ? "opacity-0 -translate-y-4 pointer-events-none" : "opacity-100 translate-y-0"
      }`}
    >
      {/* Top Telemetry */}
      <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.2em] text-[#8F99AE] uppercase">
        <span className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00F2FE] animate-pulse" />
          {"SYS_SYNC // PROTOCOL 2088"}
        </span>
        <span>LAT 12.9716° N / LON 77.5946° E</span>
      </div>

      {/* Center Cinematic Typography */}
      <div className="flex flex-col items-center justify-center text-center space-y-4 my-auto">
        <div className="overflow-hidden">
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-[-0.03em] text-white">
            HOSTEL<span className="text-[#00F2FE]">-</span>X
          </h1>
        </div>
        <p className="font-mono text-xs sm:text-sm tracking-[0.25em] text-[#8F99AE] uppercase">
          AUTONOMOUS HABITAT 2088
        </p>

        {/* Minimal Progress Bar */}
        <div className="w-48 sm:w-64 h-[1px] bg-[#252C3A] mt-6 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-[#00F2FE] transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="font-mono text-[10px] tracking-[0.2em] text-[#8F99AE] mt-2">
          INITIALIZING... <span className="text-[#00F2FE]">{progress}%</span>
        </div>
      </div>

      {/* Bottom Telemetry Status */}
      <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.15em] text-[#8F99AE]">
        <span>{"CORE ARCHITECTURE // SECTOR 07"}</span>
        <span>{"STATUS // STANDBY"}</span>
      </div>
    </aside>
  );
}
