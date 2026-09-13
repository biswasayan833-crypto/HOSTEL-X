"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { getGSAP } from "@/lib/gsap-core";
import {
  SubsystemId,
  SMART_LIVING_SUBSYSTEMS,
} from "@/data/smart-living-data";
import { SmartLivingFeatureNav } from "./SmartLivingFeatureNav";
import { BiometricTelemetry } from "./BiometricTelemetry";
import { NutritionTelemetry } from "./NutritionTelemetry";
import { AtriumTelemetry } from "./AtriumTelemetry";
import { InfrastructureNetwork } from "./InfrastructureNetwork";
import { EcosystemSummary } from "./EcosystemSummary";

// Dynamic import for SmartLivingScene 3D Canvas
const SmartLivingScene = dynamic(
  () => import("./SmartLivingScene").then((m) => m.SmartLivingScene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center font-mono text-[10px] text-[#8F99AE] tracking-[0.2em]">
        SYNCHRONIZING HABITAT 3D TWIN...
      </div>
    ),
  }
);

export function SmartLivingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSubsystemId, setActiveSubsystemId] = useState<SubsystemId>("pod");
  const [activeModeId, setActiveModeId] = useState<string>("focus");

  const currentSubsystem = SMART_LIVING_SUBSYSTEMS[activeSubsystemId];

  // When subsystem changes, reset activeModeId to first mode of that subsystem
  const handleSelectSubsystem = (id: SubsystemId) => {
    setActiveSubsystemId(id);
    const sub = SMART_LIVING_SUBSYSTEMS[id];
    if (sub && sub.modes.length > 0) {
      setActiveModeId(sub.modes[0].id);
    }
  };

  useEffect(() => {
    const { ScrollTrigger } = getGSAP();
    if (!containerRef.current) return;

    // Subtle entrance trigger
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 80%",
      end: "bottom 20%",
      scrub: 0.5,
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="smart-living"
      className="relative min-h-screen py-24 sm:py-32 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex flex-col justify-between"
      aria-label="Smart Living Habitat Ecosystem"
    >
      {/* ──────────────────────────────────────────────────────────
          01. CHAPTER MARKER & TELEMETRY TOP BAR
          ────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-[#8F99AE] uppercase border-b border-white/[0.05] pb-4 mb-8">
        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
          <span className="text-[#00F2FE]">{"04 // SMART LIVING"}</span>
          <span className="text-[#252C3A]">/</span>
          <span className="text-white/70">HABITAT ECOSYSTEM 2088</span>
        </div>
        <div className="flex items-center gap-2 text-white/50 text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE] animate-pulse" />
          <span>AUTONOMIC BIO-INFRASTRUCTURE // LIVE</span>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────
          02. EDITORIAL CHAPTER OVERVIEW & QUESTION HOOK
          ────────────────────────────────────────────────────────── */}
      <div className="max-w-2xl mb-6 sm:mb-8">
        <span className="font-mono text-[10px] tracking-[0.25em] text-[#00F2FE] uppercase">
          THE LIVING HABITAT
        </span>
        <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mt-2 leading-[1.04]">
          WHAT DOES HOSTEL<span className="text-[#00F2FE]">-</span>X ACTUALLY PROVIDE<span className="text-[#00F2FE]">?</span>
        </h2>
        <p className="font-body text-xs sm:text-sm text-[#8F99AE] mt-3 sm:mt-4 leading-relaxed font-light">
          A living habitat that intelligently adapts to human biology, cognitive workload, and community life. Four autonomous subsystems engineered to eliminate daily friction.
        </p>
      </div>

      {/* ──────────────────────────────────────────────────────────
          03. 4-SUBSYSTEM HUD NAVIGATION BAR
          ────────────────────────────────────────────────────────── */}
      <div className="mb-8 sm:mb-10">
        <SmartLivingFeatureNav
          activeSubsystem={activeSubsystemId}
          onSelectSubsystem={handleSelectSubsystem}
        />
      </div>

      {/* ──────────────────────────────────────────────────────────
          04. MAIN TRIPTYCH: LEFT EDITORIAL, CENTER 3D, RIGHT TELEMETRY
          ────────────────────────────────────────────────────────── */}
      <div id="smart-living-triptych" className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
        {/* Left Column: Subsystem Identity & Architectural Narrative (4 Cols) */}
        <div className="lg:col-span-4 space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#0C0E13] border border-[#252C3A] text-[9px] font-mono tracking-[0.2em] text-[#00F2FE] uppercase">
            <span>{currentSubsystem.code}</span>
            <span className="text-white/40">•</span>
            <span>{currentSubsystem.category}</span>
          </div>

          <div>
            <div className="font-mono text-xs tracking-[0.2em] text-[#00F2FE] uppercase mb-1">
              {`${currentSubsystem.index} //`} {currentSubsystem.tagline}
            </div>
            <h3 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              {currentSubsystem.title}
            </h3>
            <p className="font-mono text-[10px] tracking-[0.15em] text-white/60 uppercase mt-1">
              {currentSubsystem.architecturalLayer}
            </p>
          </div>

          <div className="border-l border-[#252C3A] pl-4 sm:pl-5 space-y-2">
            <p className="font-mono text-[11px] sm:text-xs tracking-[0.12em] text-white/90 uppercase font-medium">
              {currentSubsystem.subtitle}
            </p>
            <p className="font-body text-xs sm:text-sm text-[#8F99AE] font-light leading-relaxed">
              {currentSubsystem.description}
            </p>
          </div>

          {/* Core Benefit Callout */}
          <div className="p-3 bg-[#0C0E14] border border-[#252C3A]/70">
            <span className="font-mono text-[8.5px] tracking-[0.2em] text-[#00F2FE] uppercase block mb-1">
              CORE RESIDENTIAL IMPACT
            </span>
            <p className="font-body text-xs text-white/90 font-light">
              {currentSubsystem.coreBenefit}
            </p>
          </div>
        </div>

        {/* Center Column: Dedicated Procedural 3D Subsystem Viewport (4 Cols) */}
        <div className="lg:col-span-4 h-[360px] sm:h-[440px] lg:h-[500px] w-full relative flex items-center justify-center">
          {/* Subtle Ambient Halo Bloom */}
          <div
            className="absolute inset-0 m-auto w-64 h-64 rounded-full blur-[100px] pointer-events-none transition-colors duration-500"
            style={{
              backgroundColor: `${currentSubsystem.accentHex}1A`,
            }}
          />

          {/* Dedicated 3D Smart Living Scene */}
          <div className="w-full h-full relative z-10">
            <SmartLivingScene
              activeSubsystem={activeSubsystemId}
              activeMode={activeModeId}
              accentColor={currentSubsystem.accentHex}
            />
          </div>

          {/* Subtle 3D Interaction Watermark */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[8px] tracking-[0.2em] text-white/30 uppercase pointer-events-none">
            DRAG TO INSPECT 3D TWIN
          </div>
        </div>

        {/* Right Column: Real-time Telemetry & Mode Controls (4 Cols) */}
        <div className="lg:col-span-4 flex justify-center lg:justify-end">
          {activeSubsystemId === "pod" && (
            <BiometricTelemetry
              data={currentSubsystem}
              activeModeId={activeModeId}
              onSelectMode={setActiveModeId}
            />
          )}
          {activeSubsystemId === "nutrition" && (
            <NutritionTelemetry
              data={currentSubsystem}
              activeModeId={activeModeId}
              onSelectMode={setActiveModeId}
            />
          )}
          {activeSubsystemId === "atrium" && (
            <AtriumTelemetry
              data={currentSubsystem}
              activeModeId={activeModeId}
              onSelectMode={setActiveModeId}
            />
          )}
          {activeSubsystemId === "infrastructure" && (
            <InfrastructureNetwork
              data={currentSubsystem}
              activeModeId={activeModeId}
              onSelectMode={setActiveModeId}
            />
          )}
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────
          05. CONVERGENCE CLIMAX: ONE HABITAT. FOUR INTELLIGENT SYSTEMS.
          ────────────────────────────────────────────────────────── */}
      <EcosystemSummary />
    </section>
  );
}
