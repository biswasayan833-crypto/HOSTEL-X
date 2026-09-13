"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { getGSAP, prefersReducedMotion } from "@/lib/gsap-core";
import { revealMaskedText, revealTechnicalBadge } from "@/motion/typography";

// Dynamically import lightweight NOVA micro-canvas with SSR disabled
const NovaCanvas = dynamic(
  () => import("@/components/concierge/NovaCanvas").then((m) => m.NovaCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center font-mono text-[8px] text-[#8F99AE]">
        SYNCHRONIZING NOVA HOLOGRAM...
      </div>
    ),
  }
);

interface CinematicFinaleProps {
  onWarpToSection?: (id: string) => void;
}

export function CinematicFinale({ onWarpToSection }: CinematicFinaleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const manifestoRef = useRef<HTMLDivElement>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(4); // Default to Final Reveal

  const sequenceSteps = [
    { num: "01", label: "ACCESS GRANTED", status: "COMPLETE" },
    { num: "02", label: "SYSTEM ONLINE", status: "ACTIVE" },
    { num: "03", label: "CITADEL AWAKENS", status: "RESONANT" },
    { num: "04", label: "CAMERA PULLBACK", status: "NOMINAL" },
    { num: "05", label: "FINAL REVEAL", status: "LOCKED" },
  ];

  const warpLinks = [
    { id: "hero", label: "01 // INGRESS & HERO", tag: "ENTRY" },
    { id: "citadel-deconstruction", label: "02 // SECTOR 07 DECONSTRUCTION", tag: "ARCHITECTURE" },
    { id: "concierge", label: "03 // NOVA CONCIERGE", tag: "AI INTERFACE" },
    { id: "smart-living", label: "04 // SMART LIVING HABITATS", tag: "BIOPODS" },
    { id: "citadel-intelligence", label: "05 // CITADEL TELEMETRY", tag: "INTELLIGENCE" },
    { id: "resident-collective", label: "06 // RESIDENT COLLECTIVE", tag: "NETWORK" },
    { id: "access-pass", label: "07 // HOLOGRAPHIC CREDENTIAL", tag: "CREDENTIAL" },
  ];

  const scrollToTarget = (id: string) => {
    if (onWarpToSection) {
      onWarpToSection(id);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: prefersReducedMotion() ? "instant" : "smooth",
      });
    }
  };

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const { ScrollTrigger } = getGSAP();
    if (!containerRef.current || !manifestoRef.current) return;

    const badge = manifestoRef.current.querySelector(".technical-badge");
    const headlineLines = manifestoRef.current.querySelectorAll(".masked-headline");
    const brandBlock = manifestoRef.current.querySelector(".masked-brand");
    const desc = manifestoRef.current.querySelector(".masked-desc");

    ScrollTrigger.create({
      trigger: manifestoRef.current,
      start: "top 75%",
      once: true,
      onEnter: () => {
        if (badge) revealTechnicalBadge(badge as HTMLElement);
        if (headlineLines.length > 0) {
          revealMaskedText(Array.from(headlineLines) as HTMLElement[], {
            duration: 1.1,
            stagger: 0.12,
          });
        }
        if (brandBlock) {
          revealMaskedText(brandBlock as HTMLElement, {
            duration: 0.9,
            delay: 0.3,
          });
        }
        if (desc) {
          revealMaskedText(desc as HTMLElement, {
            duration: 0.8,
            delay: 0.45,
          });
        }
      },
    });
  }, []);

  return (
    <section
      ref={containerRef}
      id="cinematic-finale"
      className="relative min-h-screen py-24 sm:py-36 lg:py-48 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex flex-col justify-between gap-16 sm:gap-24"
      aria-label="Cinematic Finale and Final Statement"
    >
      {/* ────────────────────────────────────────────────────────────
          01. CHAPTER TOP BAR & REVEAL EYE-BROW
          ──────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-[#8F99AE] uppercase border-b border-white/[0.08] pb-4">
        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
          <span className="text-[#00F2FE]">{"08 // CINEMATIC FINALE"}</span>
          <span className="text-[#252C3A]">/</span>
          <span className="text-white/70">SYSTEM 2088 AWAKENED</span>
        </div>
        <div className="flex items-center gap-2 text-white/50 text-[10px]">
          <span className="w-2 h-2 rounded-full bg-[#00F2FE] animate-ping" />
          <span className="text-[#00F2FE]">SECTOR 07 FULLY OPERATIONAL</span>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────────
          02. 5-STEP FINALE SEQUENCE TIMELINE TRACKER
          ──────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 p-3 sm:p-4 bg-[#0C0E13]/80 border border-white/[0.06] rounded-md backdrop-blur-md font-mono text-[8px] sm:text-[9px] tracking-[0.2em] uppercase">
        {sequenceSteps.map((step, idx) => (
          <div
            key={step.num}
            onClick={() => setActiveStepIndex(idx)}
            className={`p-2.5 rounded-sm border transition-all duration-300 cursor-pointer ${
              activeStepIndex === idx
                ? "bg-[#00F2FE]/15 border-[#00F2FE] text-white shadow-[0_0_15px_rgba(0,242,254,0.2)]"
                : "bg-black/40 border-white/[0.04] text-[#8F99AE] hover:border-white/20"
            }`}
          >
            <div className="flex items-center justify-between text-[7px] text-white/40">
              <span>{step.num}</span>
              <span className={activeStepIndex === idx ? "text-[#00F2FE]" : ""}>{step.status}</span>
            </div>
            <div className="mt-1 font-bold tracking-tight text-white/90 truncate">
              {step.label}
            </div>
          </div>
        ))}
      </div>

      {/* ────────────────────────────────────────────────────────────
          03. MONUMENTAL FINAL STATEMENT & CITADEL AWAKENING
          ──────────────────────────────────────────────────────────── */}
      <div
        ref={manifestoRef}
        className="max-w-4xl my-auto py-8 bg-[#050608]/60 sm:bg-[#050608]/40 backdrop-blur-md p-5 sm:p-8 rounded-lg border border-white/[0.05]"
      >
        <div className="technical-badge inline-flex items-center gap-2 px-3 py-1 bg-[#0C0E13] border border-[#00F2FE]/50 text-[9px] sm:text-[10px] font-mono tracking-[0.25em] text-[#00F2FE] uppercase mb-6 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE] animate-pulse" />
          <span>AUTONOMOUS HABITAT // PERSPECTIVE REVEAL</span>
          <span className="text-white/40">•</span>
          <span className="text-white/70">YEAR 2088</span>
        </div>

        {/* The Monumental Statement */}
        <h2 className="masked-headline font-display text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-extrabold tracking-tight text-white uppercase leading-[0.98]">
          &ldquo;THE FUTURE <span className="text-[#00F2FE]">IS</span><br />
          ALREADY <span className="text-[#00F2FE]">HERE.&rdquo;</span>
        </h2>

        {/* Signature Brand Lockup */}
        <div className="masked-brand mt-6 sm:mt-8 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
          <span className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white">
            HOSTEL<span className="text-[#00F2FE]">-</span>X
          </span>
          <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-[#00F2FE] uppercase font-semibold">
            AUTONOMOUS HABITAT 2088
          </span>
        </div>

        <p className="masked-desc font-body text-sm sm:text-base text-[#8F99AE] mt-4 sm:mt-6 leading-relaxed max-w-2xl font-light">
          A living habitat. 512 resident minds. An architecture that breathes, balances, and connects without friction. You are recognized. Sector 07 is awakened.
        </p>

        {/* ──────────────────────────────────────────────────────────
            NOVA COMPANION TRANSMISSION NODE (Reusing NOVA)
            ────────────────────────────────────────────────────────── */}
        <div className="mt-8 p-4 sm:p-5 bg-[#0C0E13]/90 border border-[#7928CA]/60 rounded-md backdrop-blur-lg max-w-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#7928CA] to-[#00F2FE]" />
          
          <div className="flex items-center gap-4">
            {/* Embedded Micro NOVA Visualizer */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black/60 border border-[#7928CA]/80 shrink-0 relative overflow-hidden flex items-center justify-center">
              <div className="w-full h-full scale-125">
                <NovaCanvas accentColor="#00F2FE" isActivated={true} activationProgress={1} />
              </div>
            </div>

            <div className="font-mono">
              <div className="flex items-center gap-2 text-[8px] sm:text-[9px] tracking-[0.2em] text-[#A855F7] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7] animate-ping" />
                <span>NOVA // AUTONOMOUS CONCIERGE TRANSMISSION</span>
              </div>
              <div className="text-xs sm:text-sm text-white font-medium mt-1 leading-snug">
                &ldquo;Access authorization confirmed, Resident 014. Citadel Core is awakened. Welcome home.&rdquo;
              </div>
              <div className="text-[8px] text-[#8F99AE] tracking-widest uppercase mt-1">
                SECTOR 07 • LEVEL 28 • CLEARANCE LEVEL 04
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────────
          04. INTERACTIVE CHAPTER WARP & EXPLORATION HUB
          ──────────────────────────────────────────────────────────── */}
      <div className="pt-8 border-t border-white/[0.08]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 font-mono">
          <div>
            <span className="text-[10px] text-[#00F2FE] tracking-[0.25em] uppercase block font-semibold">
              HABITAT WARP MATRIX
            </span>
            <span className="text-xs text-white/70 tracking-wider uppercase">
              TELEPORT TO ANY COMPLETED SECTOR
            </span>
          </div>
          <div className="text-[9px] text-[#8F99AE] tracking-widest uppercase">
            ALL 7 PHASES OPERATIONAL
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {warpLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToTarget(link.id)}
              className="group p-3.5 bg-[#0C0E13]/70 hover:bg-[#00F2FE]/10 border border-[#252C3A] hover:border-[#00F2FE] transition-all duration-300 rounded-sm text-left cursor-pointer overflow-hidden relative"
              data-cursor="interactive"
              aria-label={`Jump to ${link.label}`}
            >
              <div className="flex items-center justify-between font-mono text-[8px] tracking-[0.2em] text-[#8F99AE] uppercase">
                <span>{link.tag}</span>
                <span className="text-[#00F2FE] opacity-0 group-hover:opacity-100 transition-opacity">
                  WARP →
                </span>
              </div>
              <div className="font-mono text-xs text-white font-semibold mt-1 group-hover:text-[#00F2FE] transition-colors truncate">
                {link.label}
              </div>
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#00F2FE] group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
