"use client";

import { useEffect, useRef, useState } from "react";
import { getGSAP } from "@/lib/gsap-core";
import { FloorSelector } from "./FloorSelector";
import { ArchitecturalHUD } from "./ArchitecturalHUD";

interface CitadelDeconstructionSectionProps {
  onDeconstructProgressChange: (progress: number) => void;
  activeFloor: number | null;
  onSelectFloor: (floor: number | null) => void;
}

const STAGES = [
  {
    range: [0.0, 0.18],
    tag: "01 // MONOLITH",
    title: "THE CITADEL",
    subtitle: "A MONOLITHIC AUTONOMOUS ECOSYSTEM",
    desc: "340 meters of continuous bio-architectural engineering designed to host the next generation.",
  },
  {
    range: [0.18, 0.38],
    tag: "02 // EXOSKELETON",
    title: "STRUCTURAL PYLONS",
    subtitle: "EXTERIOR SHEAR WALLS SEPARATING",
    desc: "Perimeter carbon pylons slide outward, exposing mechanical shafts and power conduits.",
  },
  {
    range: [0.38, 0.58],
    tag: "03 // FLOOR PLATES",
    title: "VERTICAL EXPANSION",
    subtitle: "12 ARCHITECTURAL HORIZONS",
    desc: "Interstitial floor slabs expand vertically to reveal integrated acoustic dampening layers.",
  },
  {
    range: [0.58, 0.78],
    tag: "04 // LIVING PODS",
    title: "CANTILEVERED HABITATS",
    subtitle: "512 MODULAR LIVING UNITS",
    desc: "Individual residential pods decouple slightly from the core spine for maintenance vectors.",
  },
  {
    range: [0.78, 1.0],
    tag: "05 // SECTOR 07",
    title: "SECTOR 07 ATRIUM",
    subtitle: "A PLACE TO LIVE. A SYSTEM DESIGNED TO ADAPT.",
    desc: "Level 28 skybridge atrium illuminated. Complete convergence of living space and cognition.",
  },
];

export function CitadelDeconstructionSection({
  onDeconstructProgressChange,
  activeFloor,
  onSelectFloor,
}: CitadelDeconstructionSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const { ScrollTrigger } = getGSAP();
    if (!containerRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.6,
      onUpdate: (self) => {
        const p = self.progress;
        setProgress(p);
        onDeconstructProgressChange(p);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [onDeconstructProgressChange]);

  // Determine current active stage
  const currentStage =
    STAGES.find((s) => progress >= s.range[0] && progress <= s.range[1]) ||
    STAGES[STAGES.length - 1];

  const isSector07Focused = progress >= 0.75 || activeFloor === 28;

  return (
    <section
      ref={containerRef}
      id="citadel-deconstruction"
      className="relative min-h-[350vh] z-20 pointer-events-none"
      aria-label="Citadel Architectural Deconstruction Sequence"
    >
      {/* Sticky Fullscreen HUD & Typography Layer */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between pt-20 sm:pt-24 pb-6 sm:pb-8 px-4 sm:px-8 lg:px-12">
        {/* Floating Telemetry HUD */}
        <ArchitecturalHUD
          visible={progress > 0.05}
          stageName={currentStage.tag}
          isSector07Focused={isSector07Focused}
        />

        {/* Dynamic Storytelling Typography (Left Aligned, Single Unified Vertical Hierarchy) */}
        <div className="my-auto max-w-lg pointer-events-auto z-10 flex flex-col justify-center bg-[#050608]/75 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none p-4 sm:p-0 rounded-md border border-white/[0.05] sm:border-none">
          {/* 1. Eyebrow: DECONSTRUCTION TELEMETRY */}
          <div className="flex items-center gap-2.5 font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-[#00F2FE] uppercase mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE] animate-pulse shrink-0" />
            <span className="text-[#8F99AE]">DECONSTRUCTION TELEMETRY</span>
          </div>

          {/* 2. Stage Chapter Marker */}
          <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs tracking-[0.25em] text-[#00F2FE] uppercase transition-all duration-300 mb-2">
            <span className="w-2 h-[1px] bg-[#00F2FE]" />
            <span className="font-semibold">{currentStage.tag}</span>
          </div>

          {/* 3. Monumental Headline */}
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.05] transition-all duration-300">
            {currentStage.title}
          </h2>

          {/* 4. Subtitle Statement */}
          <p className="font-mono text-[11px] sm:text-xs tracking-[0.2em] text-white/80 uppercase mt-2.5 sm:mt-3 transition-all duration-300">
            {currentStage.subtitle}
          </p>

          {/* 5. Descriptive Copy with frosted architectural panel insulating text from 3D geometry */}
          <div
            data-story-desc="true"
            className="mt-4 max-w-md bg-[#050608]/60 sm:bg-[#050608]/60 backdrop-blur-md border-l-2 border-[#00F2FE]/40 p-3 sm:p-4 rounded-r-sm"
          >
            <p className="font-body text-xs sm:text-sm text-[#8F99AE] font-light leading-relaxed">
              {currentStage.desc}
            </p>
          </div>

          {/* 6. Deconstruction Progress Metric Bar */}
          <div className="mt-5 sm:mt-6 flex items-center gap-4 font-mono text-[10px] tracking-[0.2em] text-[#8F99AE]">
            <div className="w-32 h-[2px] bg-[#252C3A] relative overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-[#00F2FE] transition-all duration-100 ease-out"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>
            <span>{Math.round(progress * 100)}% DECONSTRUCT</span>
          </div>
        </div>

        {/* Bottom Bar: Floor Selector & Navigation Hint */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pt-4 border-t border-white/[0.05]">
          {/* Interactive Floor Selector */}
          <FloorSelector
            activeFloor={activeFloor}
            onSelectFloor={onSelectFloor}
            className="w-full sm:w-auto"
          />

          {/* Scroll Guidance Indicator */}
          <div className="flex items-center gap-3 font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-[#8F99AE] uppercase bg-[#050608]/70 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none px-3 py-1.5 sm:p-0 rounded-sm border border-white/[0.04] sm:border-none">
            <span>SCROLL TO DECONSTRUCT</span>
            <span className="text-[#00F2FE]">↓</span>
          </div>
        </div>
      </div>
    </section>
  );
}
