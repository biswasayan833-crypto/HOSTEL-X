"use client";

import { useEffect, useRef, useState } from "react";
import { getGSAP } from "@/lib/gsap-core";
import { CommandType, NOVA_COMMANDS } from "@/data/mock-data";
import { NovaCanvas } from "./NovaCanvas";
import { NovaTerminal } from "./NovaTerminal";
import { NovaTelemetry } from "./NovaTelemetry";

export function ConciergeSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activationProgress, setActivationProgress] = useState(0);
  const [isActivated, setIsActivated] = useState(false);
  const [activeCommandId, setActiveCommandId] = useState<CommandType>("mess");

  const currentCommand = NOVA_COMMANDS[activeCommandId];

  useEffect(() => {
    const { ScrollTrigger } = getGSAP();
    if (!containerRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 75%",
      end: "bottom 30%",
      scrub: 0.6,
      onUpdate: (self) => {
        const p = self.progress;
        setActivationProgress(p);
        setIsActivated(p > 0.15);
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="concierge-nova"
      className="relative min-h-screen py-24 sm:py-32 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex flex-col justify-between"
      aria-label="Nova Autonomous Concierge Experience"
    >
      {/* ──────────────────────────────────────────────────────────
          01. CHAPTER MARKER & TELEMETRY TOP BAR
          ────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-[#8F99AE] uppercase border-b border-white/[0.05] pb-4">
        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
          <span className="text-[#00F2FE]">{"03 // CONCIERGE"}</span>
          <span className="text-[#252C3A]">/</span>
          <span className="text-white/70">NOVA INTELLIGENCE SYSTEM</span>
        </div>
        <div className="flex items-center gap-2 text-white/50 text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE] animate-pulse" />
          <span>AUTONOMIC LIVING LIAISON // 2088</span>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────
          02. MAIN EDITORIAL TRIPTYCH (LEFT TEXT, CENTER 3D, RIGHT TERMINAL)
          ────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center my-auto py-8 sm:py-12">
        {/* Left Column: Brand Statement & Identity (4 Columns) */}
        <div className="lg:col-span-4 space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#0C0E13] border border-[#252C3A] text-[9px] font-mono tracking-[0.2em] text-[#00F2FE] uppercase">
            <span>AI CONCIERGE</span>
            <span className="text-white/40">•</span>
            <span>MODEL: NOVA-07</span>
          </div>

          <div>
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.03em] text-white leading-[0.95]">
              NOVA<span className="text-[#00F2FE]">.</span>
            </h2>
            <p className="font-mono text-xs sm:text-sm tracking-[0.2em] text-white/80 uppercase mt-2">
              AUTONOMOUS CONCIERGE
            </p>
          </div>

          <div className="border-l border-[#252C3A] pl-4 sm:pl-5 space-y-2">
            <p className="font-mono text-[11px] sm:text-xs tracking-[0.15em] text-[#00F2FE] uppercase">
              A HABITAT INTELLIGENCE SYSTEM DESIGNED TO REMOVE FRICTION FROM EVERYDAY LIVING.
            </p>
            <p className="font-body text-xs sm:text-sm text-[#8F99AE] font-light leading-relaxed">
              Synthesizing biometric nutrition, predictive environmental calibration, and automated maintenance dispatch across Sector 07.
            </p>
          </div>

          <div className="pt-2">
            <span className="text-[10px] font-mono tracking-[0.2em] text-white/40 uppercase">
              RESPONSE TIME // 0.8MS
            </span>
          </div>
        </div>

        {/* Center Column: 3D Robotic Entity Viewport (4 Columns) */}
        <div
          data-cursor="nova"
          className="lg:col-span-4 h-[340px] sm:h-[420px] lg:h-[480px] w-full relative flex items-center justify-center"
        >
          {/* Subtle Backing Halo Bloom */}
          <div
            className="absolute inset-0 m-auto w-64 h-64 rounded-full blur-[100px] pointer-events-none transition-colors duration-500"
            style={{
              backgroundColor:
                activeCommandId === "emergency"
                  ? "rgba(255, 69, 58, 0.12)"
                  : activeCommandId === "maintenance"
                  ? "rgba(43, 127, 255, 0.12)"
                  : "rgba(0, 242, 254, 0.12)",
            }}
          />

          {/* Dedicated 3D NOVA Canvas */}
          <div className="w-full h-full relative z-10">
            <NovaCanvas
              accentColor={currentCommand.accentHex}
              isActivated={isActivated}
              activationProgress={activationProgress}
            />
          </div>
        </div>

        {/* Right Column: Command Terminal Interface (4 Columns) */}
        <div className="lg:col-span-4 flex justify-center lg:justify-end">
          <NovaTerminal
            activeCommandId={activeCommandId}
            onSelectCommand={(id) => setActiveCommandId(id)}
          />
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────
          03. BOTTOM TELEMETRY BAR
          ────────────────────────────────────────────────────────── */}
      <div className="pt-4 border-t border-white/[0.05]">
        <NovaTelemetry />
      </div>
    </section>
  );
}
