"use client";

import { ECOSYSTEM_SUMMARY_POINTS } from "@/data/smart-living-data";

export function EcosystemSummary() {
  return (
    <div className="w-full mt-16 sm:mt-24 pt-12 sm:pt-16 border-t border-white/[0.06]">
      {/* Climax Statement */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0C0E14] border border-[#252C3A] font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-[#00F2FE] uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE] animate-pulse" />
          <span>SYNTHESIS ARCHITECTURE // 2088</span>
        </div>

        <h3 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white uppercase leading-[1.05]">
          ONE HABITAT<span className="text-[#00F2FE]">.</span> FOUR INTELLIGENT SYSTEMS<span className="text-[#7928CA]">.</span> ZERO FRICTION<span className="text-[#00F2FE]">.</span>
        </h3>

        <p className="font-body text-xs sm:text-sm text-[#8F99AE] font-light max-w-xl mx-auto leading-relaxed">
          HOSTEL-X is not accommodation. It is an ambient biological operating system designed to elevate the human mind to its highest productive horizon.
        </p>
      </div>

      {/* 4 Architectural Convergence Pillar Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {ECOSYSTEM_SUMMARY_POINTS.map((pt) => (
          <div
            key={pt.number}
            className="group p-5 bg-[#0C0E14]/70 border border-[#252C3A]/70 hover:border-[#00F2FE]/50 backdrop-blur-md transition-all duration-300 relative overflow-hidden"
            data-cursor="interactive"
          >
            <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-[#8F99AE]">
              <span className="text-[#00F2FE]">{`${pt.number} //`}</span>
              <span className="text-white/30">CONVERGED</span>
            </div>

            <h4 className="font-display text-sm sm:text-base font-semibold text-white mt-3 tracking-tight group-hover:text-[#00F2FE] transition-colors duration-200">
              {pt.title}
            </h4>

            <p className="font-body text-xs text-[#8F99AE] mt-2 font-light leading-relaxed">
              {pt.desc}
            </p>

            {/* Hover Bottom Hairline Glow */}
            <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gradient-to-r from-[#00F2FE] to-[#7928CA] transition-all duration-300 group-hover:w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
