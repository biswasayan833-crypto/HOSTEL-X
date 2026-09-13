"use client";

import { useEffect, useRef, useState } from "react";
import { getGSAP, prefersReducedMotion } from "@/lib/gsap-core";
import { revealMaskedText, revealTechnicalBadge } from "@/motion/typography";
import { DivisionId } from "@/lib/resident-data";
import { CollectiveMetrics } from "./CollectiveMetrics";
import { CollectiveScene } from "./CollectiveScene";
import { ResearchDivisions } from "./ResearchDivisions";
import { CollaborationPanel } from "./CollaborationPanel";
import { CollectiveSpaces } from "./CollectiveSpaces";
import { CollectiveConvergence } from "./CollectiveConvergence";

export function CollectiveSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [selectedDivision, setSelectedDivision] = useState<DivisionId | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const { ScrollTrigger } = getGSAP();
    if (!containerRef.current) return;

    // Header reveal animation on scroll entry
    if (headerRef.current) {
      const badge = headerRef.current.querySelector(".technical-badge");
      const titleLines = headerRef.current.querySelectorAll(".masked-headline");
      const desc = headerRef.current.querySelector(".masked-desc");

      ScrollTrigger.create({
        trigger: headerRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          if (badge) revealTechnicalBadge(badge as HTMLElement);
          if (titleLines.length > 0) {
            revealMaskedText(Array.from(titleLines) as HTMLElement[], {
              duration: 1.0,
              stagger: 0.1,
            });
          }
          if (desc) {
            revealMaskedText(desc as HTMLElement, {
              duration: 0.8,
              delay: 0.25,
            });
          }
        },
      });
    }
  }, []);

  return (
    <section
      ref={containerRef}
      id="resident-collective"
      className="relative min-h-screen py-20 sm:py-28 lg:py-36 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex flex-col gap-12 sm:gap-16"
      aria-label="The Resident Collective Human Network of 2088"
    >
      {/* ────────────────────────────────────────────────────────────
          01. CHAPTER TOP BAR & TRANSITION EYE-BROW
          ──────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-[#8F99AE] uppercase border-b border-white/[0.05] pb-4">
        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
          <span className="text-[#00F2FE]">{"06 // RESIDENT COLLECTIVE"}</span>
          <span className="text-[#252C3A]">/</span>
          <span className="text-white/70">HUMAN NETWORK 2088</span>
        </div>
        <div className="flex items-center gap-2 text-white/50 text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE] animate-pulse" />
          <span>512 CONNECTED RESIDENT NODES // MESH ACTIVE</span>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────────
          02. CHAPTER HEADER & EDITORIAL MANIFESTO
          ──────────────────────────────────────────────────────────── */}
      <div ref={headerRef} className="max-w-3xl">
        <div className="technical-badge inline-flex items-center gap-2 px-2.5 py-1 bg-[#0C0E13] border border-[#252C3A] text-[9px] sm:text-[10px] font-mono tracking-[0.25em] text-[#00F2FE] uppercase mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE] animate-pulse" />
          <span>HUMAN COGNITIVE TOPOLOGY</span>
          <span className="text-white/40">•</span>
          <span className="text-white/70">SECTOR 01–28</span>
        </div>

        <h2 className="masked-headline font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.02] uppercase">
          HUMANS <span className="text-[#00F2FE]">ARE</span><br />
          THE <span className="text-[#00F2FE]">NETWORK.</span>
        </h2>

        <p className="masked-desc font-body text-xs sm:text-sm text-[#8F99AE] mt-4 sm:mt-5 leading-relaxed max-w-2xl font-light">
          HOSTEL-X does not simply house residents. It connects minds, disciplines, ideas, and movement inside a living architectural system. Knowledge does not move through hallways anymore—it moves through people.
        </p>
      </div>

      {/* ────────────────────────────────────────────────────────────
          03. PRIMARY COLLECTIVE METRICS
          ──────────────────────────────────────────────────────────── */}
      <CollectiveMetrics />

      {/* ────────────────────────────────────────────────────────────
          04. EDITORIAL INTERLUDE: NODES & POSSIBILITIES
          ──────────────────────────────────────────────────────────── */}
      <div className="border-y border-white/[0.06] py-6 sm:py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono">
        <div className="text-xs sm:text-sm text-white/90 tracking-wider uppercase font-semibold">
          &ldquo;KNOWLEDGE DOES NOT MOVE THROUGH HALLWAYS ANYMORE. IT MOVES THROUGH PEOPLE.&rdquo;
        </div>
        <div className="text-[10px] text-[#00F2FE] tracking-[0.2em] uppercase shrink-0">
          512 NODES • 12 RESEARCH MATRICES
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────────
          05. CENTRAL 3D / SPATIAL RESIDENT NETWORK FIELD
          ──────────────────────────────────────────────────────────── */}
      <CollectiveScene activeDivisionFilter={selectedDivision} />

      {/* ────────────────────────────────────────────────────────────
          06. RESEARCH & COMMUNITY DIVISIONS (EDITORIAL STRIPS)
          ──────────────────────────────────────────────────────────── */}
      <ResearchDivisions
        activeDivision={selectedDivision}
        onSelectDivision={setSelectedDivision}
      />

      {/* ────────────────────────────────────────────────────────────
          07. ACTIVE CROSS-DISCIPLINARY COLLABORATIONS
          ──────────────────────────────────────────────────────────── */}
      <CollaborationPanel />

      {/* ────────────────────────────────────────────────────────────
          08. COLLECTIVE SHARED COMMONS
          ──────────────────────────────────────────────────────────── */}
      <CollectiveSpaces />

      {/* ────────────────────────────────────────────────────────────
          09. CONVERGENCE CLIMAX & INGRESS TO PHASE 7
          ──────────────────────────────────────────────────────────── */}
      <CollectiveConvergence />
    </section>
  );
}
