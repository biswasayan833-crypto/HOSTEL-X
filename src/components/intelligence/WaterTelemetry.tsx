"use client";

import { WATER_DATA } from "@/lib/intelligence-data";
import { MetricCounter } from "./MetricCounter";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function WaterTelemetry() {
  const isReduced = useReducedMotion();

  return (
    <div
      className="bg-[#0C0E13]/90 border border-[#252C3A]/80 p-5 sm:p-6 font-mono backdrop-blur-md relative overflow-hidden"
      aria-label="Hydro Loop Closed Cycle Telemetry"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-[9px] tracking-[0.25em] text-[#00F2FE] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE] animate-pulse" />
            <span>SUB-TIER 03 {"//"} HYDRO RECLAMATION</span>
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white mt-1 uppercase">
            HYDRO LOOP <span className="text-[#00F2FE]">{"//"}</span> CLOSED CYCLE
          </h3>
        </div>

        <div className="flex items-center gap-2 text-[9px] tracking-widest text-[#8F99AE] bg-black/40 px-3 py-1.5 border border-white/[0.06] self-start sm:self-auto">
          <span>ZERO EFFLUENT DISCHARGE:</span>
          <span className="text-[#00F2FE] font-bold">100% CLOSED</span>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <div className="p-3 bg-black/40 border border-white/[0.05]">
          <div className="text-[8px] sm:text-[9px] text-[#8F99AE] tracking-widest uppercase">
            {WATER_DATA.reclamation.label}
          </div>
          <div className="text-xl sm:text-2xl font-bold text-[#00F2FE] mt-0.5">
            <MetricCounter value={WATER_DATA.reclamation.value} decimals={1} suffix="%" />
          </div>
          <div className="text-[8px] text-white/40 mt-1 tracking-wider">ALL LIVING BLOCKS</div>
        </div>

        <div className="p-3 bg-black/40 border border-white/[0.05]">
          <div className="text-[8px] sm:text-[9px] text-[#8F99AE] tracking-widest uppercase">
            {WATER_DATA.purification.label}
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white mt-0.5">
            {WATER_DATA.purification.value}
          </div>
          <div className="text-[8px] text-white/40 mt-1 tracking-wider">GRAPHENE NANOTUBE</div>
        </div>

        <div className="p-3 bg-black/40 border border-white/[0.05]">
          <div className="text-[8px] sm:text-[9px] text-[#8F99AE] tracking-widest uppercase">
            {WATER_DATA.reservoir.label}
          </div>
          <div className="text-xl sm:text-2xl font-bold text-[#00F2FE] mt-0.5">
            <MetricCounter value={WATER_DATA.reservoir.value} decimals={0} suffix="%" />
          </div>
          <div className="text-[8px] text-white/40 mt-1 tracking-wider">62,000 L SUBTERRANEAN</div>
        </div>

        <div className="p-3 bg-black/40 border border-white/[0.05]">
          <div className="text-[8px] sm:text-[9px] text-[#8F99AE] tracking-widest uppercase">
            {WATER_DATA.cycleStatus.label}
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white mt-0.5">
            {WATER_DATA.cycleStatus.value}
          </div>
          <div className="text-[8px] text-white/40 mt-1 tracking-wider">PRESSURE BALANCED</div>
        </div>
      </div>

      {/* Closed Loop 5-Stage Diagram */}
      <div className="relative bg-black/50 border border-white/[0.04] p-4 sm:p-5">
        <div className="flex items-center justify-between text-[9px] text-[#8F99AE] tracking-[0.2em] uppercase mb-4">
          <span>5-STAGE RECIRCULATION TOPOLOGY</span>
          <span className="text-[#00F2FE] text-[8px] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE] animate-pulse" />
            FLOW VECTOR: CONTINUOUS
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {WATER_DATA.stages.map((stage, idx) => (
            <div
              key={stage.id}
              className="relative p-3 bg-black/60 border border-white/[0.06] flex flex-col justify-between group hover:border-[#00F2FE]/40 transition-colors"
            >
              {/* Step indicator */}
              <div className="flex items-center justify-between text-[8px] tracking-widest text-[#8F99AE] mb-2 border-b border-white/[0.04] pb-1">
                <span className="text-[#00F2FE] font-bold">STAGE 0{stage.step}</span>
                <span className="text-white/40">{stage.flowRate}</span>
              </div>

              {/* Title & Description */}
              <div className="my-1">
                <h4 className="text-xs sm:text-sm font-bold text-white tracking-wider uppercase">
                  {stage.name}
                </h4>
                <p className="text-[9px] text-[#8F99AE] leading-relaxed mt-1 line-clamp-2">
                  {stage.desc}
                </p>
              </div>

              {/* Status pill & Direction indicator */}
              <div className="mt-2 pt-2 border-t border-white/[0.04] flex items-center justify-between text-[8px]">
                <span className="text-[#00F2FE] tracking-widest uppercase">{stage.status}</span>
                {idx < 4 && (
                  <span
                    className={`text-[#00F2FE] ${
                      isReduced ? "" : "animate-[pulse_1.5s_ease-in-out_infinite]"
                    }`}
                  >
                    →
                  </span>
                )}
                {idx === 4 && (
                  <span className="text-[#00F2FE] tracking-widest text-[7px]">↺ LOOP</span>
                )}
              </div>

              {/* Active flow accent bar */}
              <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#00F2FE]/30 group-hover:bg-[#00F2FE] transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
