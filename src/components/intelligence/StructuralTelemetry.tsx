"use client";

import { STRUCTURAL_DATA } from "@/lib/intelligence-data";
import { MetricCounter } from "./MetricCounter";

export function StructuralTelemetry() {
  return (
    <div
      className="bg-[#0C0E13]/90 border border-[#252C3A]/80 p-5 sm:p-6 font-mono backdrop-blur-md relative overflow-hidden"
      aria-label="Structural Integrity Telemetry"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-[9px] tracking-[0.25em] text-[#00F2FE] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE] animate-pulse" />
            <span>SUB-TIER 05 {"//"} STRUCTURAL DIAGNOSTICS</span>
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white mt-1 uppercase">
            STRUCTURAL <span className="text-[#00F2FE]">{"//"}</span> EXOSKELETON TELEMETRY
          </h3>
        </div>

        <div className="flex items-center gap-2 text-[9px] tracking-widest text-[#8F99AE] bg-black/40 px-3 py-1.5 border border-white/[0.06] self-start sm:self-auto">
          <span>SEISMIC HARMONIC DAMPING:</span>
          <span className="text-[#00F2FE] font-bold">100% NOMINAL</span>
        </div>
      </div>

      {/* 5 Structural Key Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
        <div className="p-3 bg-black/40 border border-white/[0.05]">
          <div className="text-[8px] sm:text-[9px] text-[#8F99AE] tracking-widest uppercase">
            {STRUCTURAL_DATA.coreLoad.label}
          </div>
          <div className="text-xl sm:text-2xl font-bold text-[#00F2FE] mt-0.5">
            <MetricCounter value={STRUCTURAL_DATA.coreLoad.value} decimals={2} suffix="%" />
          </div>
          <div className="text-[8px] text-white/40 mt-1 tracking-wider">CARBON PYLON CORE</div>
        </div>

        <div className="p-3 bg-black/40 border border-white/[0.05]">
          <div className="text-[8px] sm:text-[9px] text-[#8F99AE] tracking-widest uppercase">
            {STRUCTURAL_DATA.exoskeleton.label}
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white mt-0.5">
            {STRUCTURAL_DATA.exoskeleton.value}
          </div>
          <div className="text-[8px] text-white/40 mt-1 tracking-wider">TITANIUM COMPOSITE</div>
        </div>

        <div className="p-3 bg-black/40 border border-white/[0.05]">
          <div className="text-[8px] sm:text-[9px] text-[#8F99AE] tracking-widest uppercase">
            {STRUCTURAL_DATA.floorStress.label}
          </div>
          <div className="text-xl sm:text-2xl font-bold text-[#00F2FE] mt-0.5">
            <MetricCounter value={STRUCTURAL_DATA.floorStress.value} decimals={2} suffix="%" />
          </div>
          <div className="text-[8px] text-white/40 mt-1 tracking-wider">ALL 48 FLOOR PLateS</div>
        </div>

        <div className="p-3 bg-black/40 border border-white/[0.05]">
          <div className="text-[8px] sm:text-[9px] text-[#8F99AE] tracking-widest uppercase">
            {STRUCTURAL_DATA.podAnchors.label}
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white mt-0.5">
            <MetricCounter value={STRUCTURAL_DATA.podAnchors.value} decimals={0} suffix="%" />
          </div>
          <div className="text-[8px] text-white/40 mt-1 tracking-wider">512 LIVING PODS LOCKED</div>
        </div>

        <div className="p-3 bg-black/40 border border-white/[0.05] col-span-2 sm:col-span-1">
          <div className="text-[8px] sm:text-[9px] text-[#8F99AE] tracking-widest uppercase">
            {STRUCTURAL_DATA.skybridge.label}
          </div>
          <div className="text-xl sm:text-2xl font-bold text-[#00F2FE] mt-0.5">
            {STRUCTURAL_DATA.skybridge.value}
          </div>
          <div className="text-[8px] text-white/40 mt-1 tracking-wider">ACTIVE GYRO COUNTER</div>
        </div>
      </div>

      {/* Structural Sensor Array Diagram */}
      <div className="relative bg-black/60 border border-white/[0.04] p-4 sm:p-5 mb-6">
        <div className="flex items-center justify-between text-[9px] text-[#8F99AE] tracking-[0.2em] uppercase mb-3">
          <span>FIBER-OPTIC STRAIN GAUGE NETWORK</span>
          <span className="text-[#00F2FE] text-[8px]">SCAN STATUS: NOMINAL</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {STRUCTURAL_DATA.points.map((point) => (
            <div
              key={point.id}
              className="p-3 bg-black/50 border border-white/[0.06] flex flex-col justify-between hover:border-[#00F2FE]/40 transition-colors"
            >
              <div className="flex items-center justify-between text-[8px] text-[#8F99AE] tracking-wider mb-2">
                <span className="text-[#00F2FE] font-bold">{point.id}</span>
                <span className="text-white/40">TOL: {point.tolerance}</span>
              </div>
              <div className="text-[10px] font-bold text-white uppercase mb-1">
                {point.zone}
              </div>
              <div className="mt-2 pt-2 border-t border-white/[0.04] flex items-center justify-between text-[9px]">
                <span className="text-[#8F99AE] text-[8px]">MEASURED LOAD:</span>
                <span className="text-[#00F2FE] font-bold">{point.stressFactor}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
