"use client";

import { ENERGY_DATA } from "@/lib/intelligence-data";
import { MetricCounter } from "./MetricCounter";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function EnergyMatrix() {
  const isReduced = useReducedMotion();

  return (
    <div
      className="bg-[#0C0E13]/90 border border-[#252C3A]/80 p-5 sm:p-6 font-mono backdrop-blur-md relative overflow-hidden"
      aria-label="Energy Harvest Matrix"
    >
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-[9px] tracking-[0.25em] text-[#00F2FE] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE] animate-pulse" />
            <span>SUB-TIER 01 {"//"} ENERGY TELEMETRY</span>
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white mt-1 uppercase">
            ENERGY <span className="text-[#00F2FE]">{"//"}</span> HARVEST MATRIX
          </h3>
        </div>

        {/* Status Pill */}
        <div className="flex items-center gap-2 text-[9px] tracking-widest text-[#8F99AE] bg-black/40 px-3 py-1.5 border border-white/[0.06] self-start sm:self-auto">
          <span>SURPLUS GENERATION:</span>
          <span className="text-[#00F2FE] font-bold">+0.56 MW BUFFER</span>
        </div>
      </div>

      {/* 4 Core Energy Meters */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <div className="p-3 bg-black/40 border border-white/[0.05]">
          <div className="text-[8px] sm:text-[9px] text-[#8F99AE] tracking-widest uppercase">
            {ENERGY_DATA.solarHarvest.label}
          </div>
          <div className="text-xl sm:text-2xl font-bold text-[#00F2FE] mt-0.5">
            <MetricCounter value={ENERGY_DATA.solarHarvest.value} decimals={2} suffix=" MW" />
          </div>
          <div className="text-[8px] text-white/40 mt-1 tracking-wider">HARVEST EFFICIENCY 95.8%</div>
        </div>

        <div className="p-3 bg-black/40 border border-white/[0.05]">
          <div className="text-[8px] sm:text-[9px] text-[#8F99AE] tracking-widest uppercase">
            {ENERGY_DATA.gridLoad.label}
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white mt-0.5">
            <MetricCounter value={ENERGY_DATA.gridLoad.value} decimals={2} suffix=" MW" />
          </div>
          <div className="text-[8px] text-white/40 mt-1 tracking-wider">8 RESIDENT SECTORS</div>
        </div>

        <div className="p-3 bg-black/40 border border-white/[0.05]">
          <div className="text-[8px] sm:text-[9px] text-[#8F99AE] tracking-widest uppercase">
            {ENERGY_DATA.storage.label}
          </div>
          <div className="text-xl sm:text-2xl font-bold text-[#00F2FE] mt-0.5">
            <MetricCounter value={ENERGY_DATA.storage.value} decimals={0} suffix="%" />
          </div>
          <div className="text-[8px] text-white/40 mt-1 tracking-wider">SOLID-STATE CORE BUFFER</div>
        </div>

        <div className="p-3 bg-black/40 border border-white/[0.05]">
          <div className="text-[8px] sm:text-[9px] text-[#8F99AE] tracking-widest uppercase">
            {ENERGY_DATA.distribution.label}
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white mt-0.5">
            <MetricCounter value={ENERGY_DATA.distribution.value} decimals={1} suffix="%" />
          </div>
          <div className="text-[8px] text-white/40 mt-1 tracking-wider">SUPERCONDUCTIVE CONDUITS</div>
        </div>
      </div>

      {/* Visual Energy Flow Schematic (SVG Animated Transmission Diagram) */}
      <div className="relative w-full bg-black/60 border border-white/[0.04] p-4 sm:p-6 mb-6">
        <div className="text-[9px] text-[#8F99AE] tracking-[0.2em] uppercase mb-3 flex items-center justify-between">
          <span>TRANSMISSION CONDUIT SCHEMATIC</span>
          <span className="text-[#00F2FE] text-[8px]">SUPERCONDUCTING LOOP // 4 KELVIN</span>
        </div>

        <div className="w-full h-44 sm:h-52 relative">
          <svg
            viewBox="0 0 800 240"
            preserveAspectRatio="xMidYMid meet"
            className="w-full h-full"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="energyGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#00F2FE" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#7928CA" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#00F2FE" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Grid background rules */}
            <line x1="100" y1="30" x2="700" y2="30" stroke="#252C3A" strokeWidth="0.5" strokeDasharray="4 4" />
            <line x1="100" y1="120" x2="700" y2="120" stroke="#252C3A" strokeWidth="0.5" strokeDasharray="4 4" />
            <line x1="100" y1="210" x2="700" y2="210" stroke="#252C3A" strokeWidth="0.5" strokeDasharray="4 4" />

            {/* Flow Paths from Solar (top) to Core (center) to Blocks (bottom) */}
            {/* Array 01 to Core */}
            <path
              d="M 160 40 L 400 120"
              stroke="#00F2FE"
              strokeWidth="1.5"
              strokeDasharray={isReduced ? "none" : "6 4"}
              className={isReduced ? "" : "animate-[dash_12s_linear_infinite]"}
              opacity="0.6"
            />
            {/* Array 02 to Core */}
            <path
              d="M 320 40 L 400 120"
              stroke="#00F2FE"
              strokeWidth="1.5"
              strokeDasharray={isReduced ? "none" : "6 4"}
              className={isReduced ? "" : "animate-[dash_12s_linear_infinite]"}
              opacity="0.6"
            />
            {/* Array 03 to Core */}
            <path
              d="M 480 40 L 400 120"
              stroke="#00F2FE"
              strokeWidth="1.5"
              strokeDasharray={isReduced ? "none" : "6 4"}
              className={isReduced ? "" : "animate-[dash_12s_linear_infinite]"}
              opacity="0.6"
            />
            {/* Array 04 to Core */}
            <path
              d="M 640 40 L 400 120"
              stroke="#00F2FE"
              strokeWidth="1.5"
              strokeDasharray={isReduced ? "none" : "6 4"}
              className={isReduced ? "" : "animate-[dash_12s_linear_infinite]"}
              opacity="0.6"
            />

            {/* Core to Habitat Block A */}
            <path
              d="M 400 120 L 220 200"
              stroke="#7928CA"
              strokeWidth="1.8"
              strokeDasharray={isReduced ? "none" : "8 4"}
              className={isReduced ? "" : "animate-[dash_10s_linear_infinite]"}
              opacity="0.7"
            />
            {/* Core to Habitat Block B */}
            <path
              d="M 400 120 L 400 200"
              stroke="#00F2FE"
              strokeWidth="2"
              strokeDasharray={isReduced ? "none" : "8 4"}
              className={isReduced ? "" : "animate-[dash_10s_linear_infinite]"}
              opacity="0.9"
            />
            {/* Core to Habitat Block C */}
            <path
              d="M 400 120 L 580 200"
              stroke="#7928CA"
              strokeWidth="1.8"
              strokeDasharray={isReduced ? "none" : "8 4"}
              className={isReduced ? "" : "animate-[dash_10s_linear_infinite]"}
              opacity="0.7"
            />

            {/* Solar Nodes */}
            <g>
              <circle cx="160" cy="40" r="14" fill="#0C0E13" stroke="#00F2FE" strokeWidth="1.5" />
              <text x="160" y="43" fill="#00F2FE" fontSize="8" fontFamily="monospace" textAnchor="middle">SOL-1</text>

              <circle cx="320" cy="40" r="14" fill="#0C0E13" stroke="#00F2FE" strokeWidth="1.5" />
              <text x="320" y="43" fill="#00F2FE" fontSize="8" fontFamily="monospace" textAnchor="middle">SOL-2</text>

              <circle cx="480" cy="40" r="14" fill="#0C0E13" stroke="#00F2FE" strokeWidth="1.5" />
              <text x="480" y="43" fill="#00F2FE" fontSize="8" fontFamily="monospace" textAnchor="middle">SOL-3</text>

              <circle cx="640" cy="40" r="14" fill="#0C0E13" stroke="#00F2FE" strokeWidth="1.5" />
              <text x="640" y="43" fill="#00F2FE" fontSize="8" fontFamily="monospace" textAnchor="middle">SOL-4</text>
            </g>

            {/* Central Energy Core */}
            <g>
              <circle cx="400" cy="120" r="28" fill="#0C0E13" stroke="#00F2FE" strokeWidth="2" />
              <circle cx="400" cy="120" r="34" fill="none" stroke="#7928CA" strokeWidth="1" strokeDasharray="4 4" />
              <text x="400" y="118" fill="#FFFFFF" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">CORE</text>
              <text x="400" y="129" fill="#00F2FE" fontSize="7" fontFamily="monospace" textAnchor="middle">1.42 MW</text>
            </g>

            {/* Living Habitat Blocks Output */}
            <g>
              <rect x="170" y="186" width="100" height="28" fill="#0C0E13" stroke="#252C3A" strokeWidth="1" />
              <text x="220" y="203" fill="#8F99AE" fontSize="8" fontFamily="monospace" textAnchor="middle">SECTORS 01-03</text>

              <rect x="350" y="186" width="100" height="28" fill="#0C0E13" stroke="#00F2FE" strokeWidth="1.5" />
              <text x="400" y="203" fill="#00F2FE" fontSize="8" fontFamily="monospace" textAnchor="middle">SECTOR 07 [SKYBRIDGE]</text>

              <rect x="530" y="186" width="100" height="28" fill="#0C0E13" stroke="#252C3A" strokeWidth="1" />
              <text x="580" y="203" fill="#8F99AE" fontSize="8" fontFamily="monospace" textAnchor="middle">SECTORS 04-08</text>
            </g>
          </svg>
        </div>
      </div>

      {/* Solar Collector Arrays Grid Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {ENERGY_DATA.nodes.map((node) => (
          <div
            key={node.id}
            className="p-2.5 bg-black/40 border border-white/[0.04] flex flex-col justify-between hover:border-[#00F2FE]/30 transition-colors"
          >
            <div className="flex items-center justify-between text-[8px] text-[#8F99AE] tracking-wider mb-1">
              <span>{node.name}</span>
              <span className="text-[#00F2FE]">{node.status.toUpperCase()}</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-bold text-white tracking-tight">{node.output}</span>
              <span className="text-[9px] text-[#00F2FE]">EFF: {node.efficiency}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
