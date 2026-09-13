"use client";

import { AIR_DATA } from "@/lib/intelligence-data";
import { MetricCounter } from "./MetricCounter";
import { LivePulseGraph } from "./LivePulseGraph";

export function AirTelemetry() {
  return (
    <div
      className="bg-[#0C0E13]/90 border border-[#252C3A]/80 p-5 sm:p-6 font-mono backdrop-blur-md relative overflow-hidden"
      aria-label="Atmospheric Intelligence Telemetry"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-[9px] tracking-[0.25em] text-[#00F2FE] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE] animate-pulse" />
            <span>SUB-TIER 02 {"//"} ATMOSPHERIC INTELLIGENCE</span>
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white mt-1 uppercase">
            ATMOSPHERIC <span className="text-[#00F2FE]">{"//"}</span> BIO-RESONANCE
          </h3>
        </div>

        <div className="flex items-center gap-2 text-[9px] tracking-widest text-[#8F99AE] bg-black/40 px-3 py-1.5 border border-white/[0.06] self-start sm:self-auto">
          <span>CATALYTIC RECIRCULATION:</span>
          <span className="text-[#00F2FE] font-bold">14,200 M³/H ACTIVE</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
        <div className="p-3 bg-black/40 border border-white/[0.05]">
          <div className="text-[8px] sm:text-[9px] text-[#8F99AE] tracking-widest uppercase">
            {AIR_DATA.purity.label}
          </div>
          <div className="text-xl sm:text-2xl font-bold text-[#00F2FE] mt-0.5">
            <MetricCounter value={AIR_DATA.purity.value} decimals={1} suffix="%" />
          </div>
          <div className="text-[8px] text-white/40 mt-1 tracking-wider">PM2.5: 0.00 µg/m³</div>
        </div>

        <div className="p-3 bg-black/40 border border-white/[0.05]">
          <div className="text-[8px] sm:text-[9px] text-[#8F99AE] tracking-widest uppercase">
            {AIR_DATA.co2.label}
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white mt-0.5">
            <MetricCounter value={AIR_DATA.co2.value} decimals={0} suffix=" PPM" />
          </div>
          <div className="text-[8px] text-white/40 mt-1 tracking-wider">BASE AMBIENT TARGET</div>
        </div>

        <div className="p-3 bg-black/40 border border-white/[0.05]">
          <div className="text-[8px] sm:text-[9px] text-[#8F99AE] tracking-widest uppercase">
            {AIR_DATA.oxygen.label}
          </div>
          <div className="text-xl sm:text-2xl font-bold text-[#00F2FE] mt-0.5">
            <MetricCounter value={AIR_DATA.oxygen.value} decimals={1} suffix="%" />
          </div>
          <div className="text-[8px] text-white/40 mt-1 tracking-wider">HOMEOSTATIC BALANCE</div>
        </div>

        <div className="p-3 bg-black/40 border border-white/[0.05]">
          <div className="text-[8px] sm:text-[9px] text-[#8F99AE] tracking-widest uppercase">
            {AIR_DATA.filtration.label}
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white mt-0.5">
            {AIR_DATA.filtration.value}
          </div>
          <div className="text-[8px] text-white/40 mt-1 tracking-wider">CATALYTIC GRAPHENE</div>
        </div>

        <div className="p-3 bg-black/40 border border-white/[0.05] col-span-2 sm:col-span-1">
          <div className="text-[8px] sm:text-[9px] text-[#8F99AE] tracking-widest uppercase">
            {AIR_DATA.acoustic.label}
          </div>
          <div className="text-xl sm:text-2xl font-bold text-[#00F2FE] mt-0.5">
            <MetricCounter value={AIR_DATA.acoustic.value} decimals={0} suffix=" DB" />
          </div>
          <div className="text-[8px] text-white/40 mt-1 tracking-wider">ACTIVE NOISE CANCEL</div>
        </div>
      </div>

      {/* Embedded Live Pulse Graph */}
      <div className="mb-6">
        <LivePulseGraph
          label="ATMOSPHERIC PURITY HARMONIC WAVEFORM"
          unit="%"
          currentVal="99.4"
          minVal="98.8"
          maxVal="99.6"
          points={AIR_DATA.historyPoints}
          height={100}
        />
      </div>

      {/* Bio-Scrubber Arrays */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {AIR_DATA.bioScrubbers.map((scrubber) => (
          <div
            key={scrubber.id}
            className="p-2.5 bg-black/40 border border-white/[0.04] flex flex-col justify-between hover:border-[#00F2FE]/30 transition-colors"
          >
            <div className="flex items-center justify-between text-[8px] text-[#8F99AE] tracking-wider mb-1">
              <span>{scrubber.id}</span>
              <span className="text-[#00F2FE]">{scrubber.status}</span>
            </div>
            <div className="text-[10px] text-white font-semibold truncate mb-1">
              {scrubber.sector}
            </div>
            <div className="text-[8px] text-[#8F99AE]">EFFICIENCY: {scrubber.efficiency}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
