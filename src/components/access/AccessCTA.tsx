"use client";

import { useState } from "react";
import { prefersReducedMotion } from "@/lib/gsap-core";

export function AccessCTA() {
  const [isInitializing, setIsInitializing] = useState(false);

  const handleInitialize = () => {
    setIsInitializing(true);

    setTimeout(() => {
      const target = document.getElementById("citadel-deconstruction") || document.getElementById("hero");
      if (target) {
        target.scrollIntoView({ behavior: prefersReducedMotion() ? "instant" : "smooth" });
      }
      setTimeout(() => setIsInitializing(false), 1200);
    }, 450);
  };

  return (
    <div
      className="relative my-16 sm:my-24 p-8 sm:p-14 lg:p-20 bg-gradient-to-b from-[#0C0E13] via-[#080A0E] to-[#050608] border border-[#252C3A] text-center overflow-hidden rounded-lg"
      aria-label="Final Cinematic Gateway Call to Action"
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,242,254,0.08)_0%,rgba(121,40,202,0.06)_50%,transparent_75%)] pointer-events-none" />

      {/* Cybernetic grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      {/* Chapter Marker */}
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/60 border border-[#00F2FE]/40 text-[9px] sm:text-[10px] font-mono tracking-[0.25em] text-[#00F2FE] uppercase mb-6 rounded-full">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE] animate-ping" />
        <span>GATEWAY // 2088 ACCESS PORTAL</span>
      </div>

      {/* Monumental Headline */}
      <div className="max-w-3xl mx-auto mb-6">
        <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white uppercase leading-[1.02]">
          ENTER <span className="text-[#00F2FE]">HOSTEL-X</span>
        </h2>

        <p className="font-display text-base sm:text-xl md:text-2xl text-white/90 font-medium tracking-wide uppercase mt-4">
          &ldquo;THE FUTURE OF HOSTEL LIVING IS ALREADY ONLINE.&rdquo;
        </p>

        <p className="font-body text-xs sm:text-sm text-[#8F99AE] mt-4 max-w-xl mx-auto font-light leading-relaxed">
          512 autonomous habitat pods. A self-regulating structural intelligence. An interconnected collective of resident minds. You are recognized.
        </p>
      </div>

      {/* Main Action Button */}
      <div className="mt-8 sm:mt-10 flex flex-col items-center justify-center gap-4 relative z-10">
        <button
          onClick={handleInitialize}
          disabled={isInitializing}
          className="group relative px-8 sm:px-12 py-4 sm:py-5 bg-[#00F2FE] text-black hover:bg-white font-mono text-xs sm:text-sm tracking-[0.25em] uppercase font-bold transition-all duration-300 shadow-[0_0_30px_rgba(0,242,254,0.35)] hover:shadow-[0_0_45px_rgba(255,255,255,0.5)] cursor-pointer overflow-hidden rounded-sm active:scale-95"
          data-cursor="cta"
          aria-label="Initialize Hostel-X Experience"
        >
          {/* Subtle scanning highlight sweep */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

          <span className="relative z-10 flex items-center gap-3">
            {isInitializing ? (
              <>
                <span className="w-2 h-2 rounded-full bg-black animate-ping" />
                <span>SYNCHRONIZING SECTOR 07...</span>
              </>
            ) : (
              <>
                <span>INITIALIZE EXPERIENCE</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1.5">
                  →
                </span>
              </>
            )}
          </span>
        </button>

        {/* Secondary Small Text */}
        <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-[#8F99AE] uppercase mt-2 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE]" />
          <span>SECTOR 07 // ACCESS READY</span>
          <span className="text-white/30">•</span>
          <span className="text-white/60">CLEARANCE LEVEL 04</span>
        </div>
      </div>

      {/* Technical Corner Brackets */}
      <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#00F2FE]/40 pointer-events-none" />
      <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#00F2FE]/40 pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-[#00F2FE]/40 pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[#00F2FE]/40 pointer-events-none" />
    </div>
  );
}
