"use client";

import { COLLECTIVE_METRICS } from "@/lib/resident-data";
import { MetricCounter } from "@/components/intelligence/MetricCounter";

export function CollectiveMetrics() {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 font-mono"
      aria-label="Resident Collective Primary Metrics"
    >
      {COLLECTIVE_METRICS.map((metric, idx) => {
        return (
          <div
            key={metric.id}
            className="relative bg-[#0C0E13]/85 border border-[#252C3A]/70 p-4 sm:p-5 flex flex-col justify-between overflow-hidden group hover:border-[#00F2FE]/40 transition-colors backdrop-blur-sm"
          >
            {/* Top Corner Technical Index */}
            <div className="flex items-center justify-between text-[9px] tracking-[0.2em] text-[#8F99AE] uppercase mb-3 border-b border-white/[0.04] pb-2">
              <div className="flex items-center gap-1.5">
                <span className="text-[#00F2FE]">0{idx + 1}</span>
                <span className="text-white/30">{"//"}</span>
                <span>COLLECTIVE METRIC</span>
              </div>
              <span className="text-[8px] text-[#00F2FE]/80 tracking-widest px-1 py-0.5 bg-[#00F2FE]/5 border border-[#00F2FE]/20">
                ACTIVE
              </span>
            </div>

            {/* Monumental Number Scrubber */}
            <div className="my-2">
              <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white flex items-baseline gap-1">
                <MetricCounter
                  value={metric.value}
                  decimals={metric.decimals}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                  duration={1.5 + idx * 0.15}
                />
              </div>
              <div className="text-xs sm:text-sm font-semibold tracking-wider text-[#00F2FE] uppercase mt-1">
                {metric.sublabel}
              </div>
            </div>

            {/* Metric Label & Narrative Status */}
            <div className="mt-3 pt-2.5 border-t border-white/[0.04] flex flex-col gap-1">
              <div className="text-[10px] text-white/80 tracking-widest uppercase">
                {metric.label}
              </div>
              <div className="text-[8px] text-[#8F99AE]/70 tracking-wider">
                {metric.changeRate}
              </div>
            </div>

            {/* Architectural corner tick accents */}
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00F2FE]/30" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00F2FE]/30" />
          </div>
        );
      })}
    </div>
  );
}
