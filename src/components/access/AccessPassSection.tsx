"use client";

import { useEffect, useRef, useState } from "react";
import { getGSAP, prefersReducedMotion } from "@/lib/gsap-core";
import { revealMaskedText, revealTechnicalBadge } from "@/motion/typography";
import { ScanStatus } from "@/lib/access-data";
import { HolographicPass } from "./HolographicPass";
import { AccessScanner } from "./AccessScanner";
import { AccessCTA } from "./AccessCTA";

export function AccessPassSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [scanStatus, setScanStatus] = useState<ScanStatus>("idle");
  const [scanProgress, setScanProgress] = useState<number>(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const { ScrollTrigger } = getGSAP();
    if (!containerRef.current) return;

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
      id="access-pass"
      className="relative min-h-screen py-20 sm:py-28 lg:py-36 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex flex-col gap-12 sm:gap-16"
      aria-label="Holographic Access Pass and Resident Credential"
    >
      {/* ────────────────────────────────────────────────────────────
          01. CHAPTER TOP BAR & REVEAL EYE-BROW
          ──────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-[#8F99AE] uppercase border-b border-white/[0.05] pb-4">
        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
          <span className="text-[#00F2FE]">{"07 // ACCESS PROTOCOL"}</span>
          <span className="text-[#252C3A]">/</span>
          <span className="text-white/70">HOLOGRAPHIC CREDENTIAL 2088</span>
        </div>
        <div className="flex items-center gap-2 text-white/50 text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE] animate-pulse" />
          <span>SECTOR 07 // RESIDENT IDENTIFICATION READY</span>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────────
          02. NARRATIVE PROGRESSION TRACKER
          ──────────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-[#0C0E13]/60 border border-white/[0.04] rounded-sm font-mono text-[8px] sm:text-[9px] tracking-[0.18em] uppercase text-[#8F99AE]">
        <div className="flex items-center gap-2">
          <span className="text-white/40">[01]</span>
          <span>RESIDENT NETWORK</span>
        </div>
        <span className="text-[#252C3A]">→</span>
        <div className="flex items-center gap-2">
          <span className="text-white/40">[02]</span>
          <span>NODE SELECTION</span>
        </div>
        <span className="text-[#252C3A]">→</span>
        <div className="flex items-center gap-2 text-white">
          <span className="text-[#00F2FE]">[03]</span>
          <span>SYSTEM IDENTIFICATION</span>
        </div>
        <span className="text-[#252C3A]">→</span>
        <div className="flex items-center gap-2 text-[#00F2FE]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE] animate-pulse" />
          <span>[04] HOLOGRAPHIC PASS REVEALED</span>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────────
          03. CHAPTER HEADER & MASKED EDITORIAL MANIFESTO
          ──────────────────────────────────────────────────────────── */}
      <div ref={headerRef} className="max-w-3xl">
        <div className="technical-badge inline-flex items-center gap-2 px-2.5 py-1 bg-[#0C0E13] border border-[#252C3A] text-[9px] sm:text-[10px] font-mono tracking-[0.25em] text-[#00F2FE] uppercase mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE] animate-pulse" />
          <span>YOU ARE PART OF THE SYSTEM</span>
          <span className="text-white/40">•</span>
          <span className="text-white/70">CREDENTIAL HX-2088-014</span>
        </div>

        <h2 className="masked-headline font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.02] uppercase">
          THE NETWORK <span className="text-[#00F2FE]">KNOWS</span><br />
          ITS NODES<span className="text-[#00F2FE]">.</span>
        </h2>

        <p className="masked-headline font-display text-2xl sm:text-4xl text-[#00F2FE] uppercase tracking-wide font-semibold mt-2">
          NOW IT RECOGNIZES YOU<span className="text-white">.</span>
        </p>

        <p className="masked-desc font-body text-xs sm:text-sm text-[#8F99AE] mt-4 sm:mt-5 leading-relaxed max-w-2xl font-light">
          You are no longer an outside observer of the habitat. Inside Sector 07, your presence is indexed by the living architecture. Pod 28-B, circadian microclimate, and collaborative research channels are awaiting your activation.
        </p>

        {/* Verification Highlight Banner */}
        <div className="mt-6 inline-flex items-center gap-3 px-3 py-1.5 bg-black/50 border border-[#00F2FE]/40 rounded-sm font-mono text-[10px] tracking-[0.2em] uppercase">
          <span className="text-white/60">CLEARANCE:</span>
          <span className="text-[#00F2FE] font-bold">RESIDENT ACCESS // VERIFIED</span>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────────
          04. CENTRAL HOLOGRAPHIC STAGE & SCANNER TERMINAL
          ──────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
        {/* Left Column: 3D Holographic Card Viewport (7 cols) */}
        <div className="lg:col-span-7 flex justify-center w-full">
          <HolographicPass
            scanStatus={scanStatus}
            scanProgress={scanProgress}
          />
        </div>

        {/* Right Column: Interactive Diagnostic Scanner Terminal (5 cols) */}
        <div className="lg:col-span-5 w-full">
          <AccessScanner
            scanStatus={scanStatus}
            onScanStatusChange={setScanStatus}
            scanProgress={scanProgress}
            onScanProgressChange={setScanProgress}
          />
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────────
          05. EDITORIAL INTERLUDE: SYSTEM CONVERGENCE
          ──────────────────────────────────────────────────────────── */}
      <div className="border-y border-white/[0.06] py-6 sm:py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono">
        <div className="text-xs sm:text-sm text-white/90 tracking-wider uppercase font-semibold">
          &ldquo;THE HABITAT IS NO LONGER A BUILDING. IT IS AN EXTENSION OF YOUR BIOMETRICS.&rdquo;
        </div>
        <div className="text-[10px] text-[#00F2FE] tracking-[0.2em] uppercase shrink-0">
          STATUS // IDENTITY VERIFIED
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────────
          06. FINAL CINEMATIC CALL TO ACTION GATEWAY
          ──────────────────────────────────────────────────────────── */}
      <AccessCTA />
    </section>
  );
}
