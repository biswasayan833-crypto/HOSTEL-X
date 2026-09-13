"use client";

import { SYSTEM_STATUS_RAIL } from "@/lib/intelligence-data";

export function IntelligenceHUD() {
  return (
    <div
      className="w-full bg-[#0C0E13]/90 border border-[#252C3A]/80 backdrop-blur-md px-3 py-2.5 sm:px-4 sm:py-3 font-mono"
      aria-label="System Status Telemetry Rail"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
        {/* Rail Title */}
        <div className="flex items-center gap-2 text-[10px] tracking-[0.25em] text-[#8F99AE] uppercase shrink-0 border-b lg:border-b-0 lg:border-r border-white/[0.06] pb-2 lg:pb-0 lg:pr-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE] animate-pulse" />
          <span className="text-white font-semibold">CITADEL OS</span>
          <span className="text-white/40">{"//"}</span>
          <span className="text-[#00F2FE]">SYSTEM STATUS</span>
        </div>

        {/* Status Indicators Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 sm:gap-3 flex-1">
          {SYSTEM_STATUS_RAIL.map((item) => {
            const isActiveOrOptimal = item.state === "active" || item.state === "optimal";
            const isNominal = item.state === "nominal";

            return (
              <div
                key={item.id}
                className="flex flex-col gap-0.5 px-2 py-1 bg-black/40 border border-white/[0.04] transition-colors hover:border-[#00F2FE]/30"
              >
                <div className="flex items-center justify-between text-[8px] text-[#8F99AE] tracking-wider">
                  <span>{item.label}</span>
                  <span className="text-white/30 text-[7px]">{item.code}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`w-1 h-1 rounded-full ${
                      isActiveOrOptimal
                        ? "bg-[#00F2FE] shadow-[0_0_6px_#00F2FE]"
                        : isNominal
                        ? "bg-white/80"
                        : "bg-[#8F99AE]/50"
                    }`}
                  />
                  <span
                    className={`text-[9px] sm:text-[10px] tracking-widest font-semibold ${
                      isActiveOrOptimal
                        ? "text-[#00F2FE]"
                        : isNominal
                        ? "text-white"
                        : "text-[#8F99AE]"
                    }`}
                  >
                    {item.value}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Latency & Heartbeat Indicator */}
        <div className="hidden xl:flex items-center gap-3 text-[9px] tracking-widest text-[#8F99AE] shrink-0 border-l border-white/[0.06] pl-4">
          <div className="flex items-center gap-1.5">
            <span className="text-white/40">LATENCY:</span>
            <span className="text-white">0.4ms</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-white/40">BANDWIDTH:</span>
            <span className="text-[#00F2FE]">40 TB/S</span>
          </div>
        </div>
      </div>
    </div>
  );
}
