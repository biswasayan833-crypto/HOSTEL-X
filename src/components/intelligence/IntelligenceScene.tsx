"use client";

import { useState, useEffect, useRef } from "react";
import { SPATIAL_NODES } from "@/lib/intelligence-data";
import { TelemetryNode } from "./TelemetryNode";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function IntelligenceScene() {
  const isReduced = useReducedMotion();
  const [activeNodeId, setActiveNodeId] = useState<string>("");
  const [scanProgress, setScanProgress] = useState(0);
  const animRef = useRef<number | null>(null);

  // Scanning laser loop
  useEffect(() => {
    if (isReduced) {
      setScanProgress(0.5);
      return;
    }

    const startTime = performance.now();
    const loop = (now: number) => {
      // 12 second cycle
      const cycle = ((now - startTime) % 12000) / 12000;
      // Triangle wave 0 -> 1 -> 0
      const progress = cycle < 0.5 ? cycle * 2 : (1 - cycle) * 2;
      setScanProgress(progress);
      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isReduced]);

  // Current scan level calculation based on scanProgress
  let currentScanLevel = "LEVEL 01 [FOUNDATION]";
  if (scanProgress > 0.85) currentScanLevel = "APEX [SOLAR CANOPY]";
  else if (scanProgress > 0.65) currentScanLevel = "LEVEL 42 [HIGH LIVING]";
  else if (scanProgress > 0.4) currentScanLevel = "LEVEL 28 [SECTOR 07 SKYBRIDGE]";
  else if (scanProgress > 0.2) currentScanLevel = "LEVEL 14 [HYDRO RECLAMATION]";

  return (
    <div
      className="relative w-full min-h-[520px] sm:min-h-[600px] lg:min-h-[680px] bg-[#0C0E13]/90 border border-[#252C3A]/80 p-4 sm:p-6 lg:p-8 font-mono backdrop-blur-md overflow-hidden flex flex-col justify-between"
      aria-label="Citadel Architectural Intelligence Stage"
    >
      {/* ────────────────────────────────────────────────────────────
          TOP OVERLAY HUD: SCANNER TELEMETRY & SYSTEM PULSE
          ──────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-4 z-20 relative">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#00F2FE] animate-pulse" />
          <div>
            <div className="text-[9px] text-[#00F2FE] tracking-[0.25em] uppercase font-bold">
              CITADEL NERVOUS SYSTEM {"//"} ACTIVE
            </div>
            <div className="text-xs sm:text-sm font-display font-bold text-white tracking-wide uppercase">
              ARCHITECTURAL TELEMETRY TWIN
            </div>
          </div>
        </div>

        {/* Dynamic Scanner Readout */}
        <div className="flex items-center gap-3 bg-black/60 px-3 py-1.5 border border-[#00F2FE]/30 text-[9px] tracking-widest text-[#8F99AE]">
          <span className="text-white/40">LASER SCAN:</span>
          <span className="text-[#00F2FE] font-bold">{currentScanLevel}</span>
          <span className="text-white/40">•</span>
          <span className="text-white">INTEGRITY 99.4%</span>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────────
          CENTER ARCHITECTURAL STAGE: CITADEL SILHOUETTE & DATA CONDUITS
          ──────────────────────────────────────────────────────────── */}
      <div className="relative flex-1 w-full my-4 flex items-center justify-center min-h-[380px] sm:min-h-[460px]">
        {/* Background Architectural Grid Lines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(to right, #252C3A 1px, transparent 1px), linear-gradient(to bottom, #252C3A 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* SVG Architectural Megastructure Silhouette & Conduits */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <svg
            viewBox="0 0 1000 700"
            preserveAspectRatio="xMidYMid meet"
            className="w-full h-full opacity-90"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="scanPlaneGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00F2FE" stopOpacity="0" />
                <stop offset="50%" stopColor="#00F2FE" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#00F2FE" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="citadelFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#161A22" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#080B12" stopOpacity="0.95" />
              </linearGradient>
            </defs>

            {/* Central Vertical Spine Tower */}
            <rect x="420" y="80" width="160" height="540" fill="url(#citadelFill)" stroke="#252C3A" strokeWidth="1.5" />

            {/* Cantilever Atrium Wings (Sector 07 Skybridge at Level 28, Y ~ 320) */}
            <path
              d="M 180 300 L 420 300 L 420 370 L 220 370 Z"
              fill="#0E121A"
              stroke="#00F2FE"
              strokeWidth="1.5"
              strokeOpacity="0.8"
            />
            <text x="240" y="340" fill="#00F2FE" fontSize="10" fontFamily="monospace" letterSpacing="2">
              SECTOR 07 SKYBRIDGE
            </text>

            {/* Eastern Living Tier (Level 14 to 42) */}
            <path
              d="M 580 180 L 820 180 L 780 480 L 580 480 Z"
              fill="#0E121A"
              stroke="#252C3A"
              strokeWidth="1.5"
            />

            {/* Apex Solar Canopy (Level 48) */}
            <polygon
              points="380,80 500,20 620,80"
              fill="#161A22"
              stroke="#00F2FE"
              strokeWidth="1.8"
            />

            {/* Foundation Pylons */}
            <line x1="360" y1="620" x2="360" y2="680" stroke="#252C3A" strokeWidth="6" />
            <line x1="500" y1="620" x2="500" y2="680" stroke="#00F2FE" strokeWidth="6" strokeOpacity="0.8" />
            <line x1="640" y1="620" x2="640" y2="680" stroke="#252C3A" strokeWidth="6" />

            {/* Internal Floor Lines (Level 01, 14, 28, 42) */}
            <line x1="420" y1="520" x2="580" y2="520" stroke="#252C3A" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="420" y1="410" x2="580" y2="410" stroke="#252C3A" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="420" y1="290" x2="580" y2="290" stroke="#00F2FE" strokeWidth="1.2" strokeDasharray="4 4" strokeOpacity="0.6" />
            <line x1="420" y1="170" x2="580" y2="170" stroke="#252C3A" strokeWidth="1" strokeDasharray="4 4" />

            {/* Animated Flowing Cyan Data/Energy Conduits between systems */}
            {/* Conduit 1: Solar Apex to Core */}
            <path
              d="M 780 126 L 500 240 L 500 480"
              fill="none"
              stroke="#00F2FE"
              strokeWidth="1.5"
              strokeDasharray={isReduced ? "none" : "8 6"}
              className={isReduced ? "" : "animate-[dash_8s_linear_infinite]"}
              opacity="0.8"
            />
            {/* Conduit 2: Sector 07 Skybridge to Core */}
            <path
              d="M 240 308 L 420 335 L 500 335"
              fill="none"
              stroke="#00F2FE"
              strokeWidth="1.5"
              strokeDasharray={isReduced ? "none" : "6 4"}
              className={isReduced ? "" : "animate-[dash_10s_linear_infinite]"}
              opacity="0.8"
            />
            {/* Conduit 3: Water Core to Base */}
            <path
              d="M 720 434 L 540 434 L 500 574"
              fill="none"
              stroke="#7928CA"
              strokeWidth="1.5"
              strokeDasharray={isReduced ? "none" : "6 6"}
              className={isReduced ? "" : "animate-[dash_12s_linear_infinite]"}
              opacity="0.7"
            />

            {/* Active Vertical Laser Scan Plane */}
            {!isReduced && (
              <g>
                <line
                  x1="120"
                  y1={40 + scanProgress * 580}
                  x2="880"
                  y2={40 + scanProgress * 580}
                  stroke="url(#scanPlaneGrad)"
                  strokeWidth="3"
                />
                <circle
                  cx="500"
                  cy={40 + scanProgress * 580}
                  r="4"
                  fill="#00F2FE"
                  className="animate-ping"
                />
              </g>
            )}
          </svg>
        </div>

        {/* ────────────────────────────────────────────────────────────
            INTERACTIVE SPATIAL TELEMETRY HOTSPOTS (POWER, AIR, WATER, FLEET, STRUCTURE)
            ──────────────────────────────────────────────────────────── */}
        <div className="absolute inset-0 pointer-events-auto">
          {SPATIAL_NODES.map((node) => (
            <TelemetryNode
              key={node.id}
              node={node}
              isActive={activeNodeId === node.id}
              onToggle={(id) => setActiveNodeId(activeNodeId === id ? "" : id)}
            />
          ))}
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────────
          BOTTOM OVERLAY FOOTER: ACTIVE SUBSYSTEM FILTER / SELECTOR
          ──────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-white/[0.06] z-20 relative text-[9px]">
        <div className="flex items-center gap-2 text-[#8F99AE]">
          <span>SELECT SYSTEM NODE:</span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {SPATIAL_NODES.map((n) => (
              <button
                key={n.id}
                type="button"
                data-cursor="interactive"
                onClick={() => setActiveNodeId(activeNodeId === n.id ? "" : n.id)}
                className={`px-2 py-1 border transition-colors uppercase font-mono ${
                  activeNodeId === n.id
                    ? "bg-[#00F2FE]/20 border-[#00F2FE] text-[#00F2FE]"
                    : "bg-black/40 border-white/[0.06] text-[#8F99AE] hover:text-white hover:border-[#00F2FE]/40"
                }`}
              >
                {n.id}
              </button>
            ))}
          </div>
        </div>

        <div className="text-[#8F99AE]/70 tracking-widest hidden md:block">
          TAP OR HOVER SPATIAL NODES TO COMMENCE HIGH-RESOLUTION DIAGNOSTIC
        </div>
      </div>
    </div>
  );
}
