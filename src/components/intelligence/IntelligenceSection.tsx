"use client";

import { useEffect, useRef, useState } from "react";
import { getGSAP, prefersReducedMotion } from "@/lib/gsap-core";
import { revealMaskedText, revealTechnicalBadge } from "@/motion/typography";
import { IntelligenceHUD } from "./IntelligenceHUD";
import { IntelligenceScene } from "./IntelligenceScene";
import { IntelligenceMetrics } from "./IntelligenceMetrics";
import { EnergyMatrix } from "./EnergyMatrix";
import { AirTelemetry } from "./AirTelemetry";
import { WaterTelemetry } from "./WaterTelemetry";
import { MaintenanceNetwork } from "./MaintenanceNetwork";
import { StructuralTelemetry } from "./StructuralTelemetry";
import { IntelligenceConvergence } from "./IntelligenceConvergence";

type ActiveTelemetryTab = "all" | "energy" | "atmosphere" | "water" | "maintenance" | "structure";

export function IntelligenceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<ActiveTelemetryTab>("all");

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
      id="citadel-intelligence"
      className="relative min-h-screen py-20 sm:py-28 lg:py-36 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex flex-col gap-12 sm:gap-16"
      aria-label="Citadel Intelligence Autonomous Habitat Telemetry"
    >
      {/* ────────────────────────────────────────────────────────────
          01. SYSTEM STATUS RAIL (TOP TELEMETRY DOCK)
          ──────────────────────────────────────────────────────────── */}
      <IntelligenceHUD />

      {/* ────────────────────────────────────────────────────────────
          02. CHAPTER HEADER & MONUMENTAL NARRATIVE
          ──────────────────────────────────────────────────────────── */}
      <div ref={headerRef} className="max-w-3xl">
        <div className="technical-badge inline-flex items-center gap-2 px-2.5 py-1 bg-[#0C0E13] border border-[#252C3A] text-[9px] sm:text-[10px] font-mono tracking-[0.25em] text-[#00F2FE] uppercase mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE] animate-pulse" />
          <span>{"05 // CITADEL INTELLIGENCE"}</span>
          <span className="text-white/40">•</span>
          <span className="text-white/70">NERVOUS SYSTEM 2088</span>
        </div>

        <h2 className="masked-headline font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.05] uppercase">
          CITADEL <span className="text-[#00F2FE]">THINKS.</span><br />
          UNDERSTANDS<span className="text-[#00F2FE]">.</span><br />
          ADAPTS<span className="text-[#00F2FE]">.</span>
        </h2>

        <p className="masked-desc font-body text-xs sm:text-sm text-[#8F99AE] mt-4 sm:mt-5 leading-relaxed max-w-2xl font-light">
          The architecture is the dashboard. In 2088, HOSTEL-X operates as a self-regulating super-organism—continuously harvesting energy, purifying air, reclaiming greywater, deploying autonomous maintenance drones, and logging micro-structural stress.
        </p>
      </div>

      {/* ────────────────────────────────────────────────────────────
          03. PRIMARY SYSTEM METRICS (4 MONUMENTAL SCRUBBERS)
          ──────────────────────────────────────────────────────────── */}
      <IntelligenceMetrics />

      {/* ────────────────────────────────────────────────────────────
          04. CENTRAL ARCHITECTURAL INTELLIGENCE SCENE
          ──────────────────────────────────────────────────────────── */}
      <IntelligenceScene />

      {/* ────────────────────────────────────────────────────────────
          05. SUBSYSTEM TELEMETRY FILTER TABS (DESKTOP & MOBILE)
          ──────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
        <div className="font-mono text-[10px] tracking-[0.25em] text-[#8F99AE] uppercase flex items-center gap-2">
          <span className="text-[#00F2FE]">{"//"}</span>
          <span>SPECIALIZED TELEMETRY MATRICES</span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap font-mono text-[9px]">
          {(
            [
              { id: "all", label: "ALL SYSTEMS" },
              { id: "energy", label: "ENERGY" },
              { id: "atmosphere", label: "AIR PURITY" },
              { id: "water", label: "HYDRO LOOP" },
              { id: "maintenance", label: "DRONE FLEET" },
              { id: "structure", label: "STRUCTURE" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              data-cursor="interactive"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 border transition-all uppercase ${
                activeTab === tab.id
                  ? "bg-[#00F2FE]/20 border-[#00F2FE] text-[#00F2FE] font-bold"
                  : "bg-black/40 border-white/[0.06] text-[#8F99AE] hover:text-white hover:border-[#00F2FE]/30"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────────
          06. SUBSYSTEM MATRICES (ACCORDING TO ACTIVE FILTER)
          ──────────────────────────────────────────────────────────── */}
      <div className="space-y-8 sm:space-y-12">
        {(activeTab === "all" || activeTab === "energy") && <EnergyMatrix />}

        {(activeTab === "all" || activeTab === "atmosphere") && <AirTelemetry />}

        {(activeTab === "all" || activeTab === "water") && <WaterTelemetry />}

        {(activeTab === "all" || activeTab === "maintenance") && <MaintenanceNetwork />}

        {(activeTab === "all" || activeTab === "structure") && <StructuralTelemetry />}
      </div>

      {/* ────────────────────────────────────────────────────────────
          07. CLIMAX: ONE HABITAT. ONE INTELLIGENCE. ZERO FRICTION.
          ──────────────────────────────────────────────────────────── */}
      <IntelligenceConvergence />
    </section>
  );
}
