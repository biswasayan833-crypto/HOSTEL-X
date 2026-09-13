"use client";

import { COLLECTIVE_SPACES } from "@/lib/resident-data";

export function CollectiveSpaces() {
  return (
    <div
      className="bg-[#0C0E13]/90 border border-[#252C3A]/80 p-5 sm:p-8 font-mono backdrop-blur-md relative overflow-hidden"
      aria-label="Collective Shared Spaces Telemetry"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-[9px] tracking-[0.25em] text-[#00F2FE] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE] animate-pulse" />
            <span>COLLECTIVE ENVIRONMENTS {"//"} RESIDENT SPACES</span>
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white mt-1 uppercase">
            HABITAT <span className="text-[#00F2FE]">{"//"}</span> SHARED COMMONS
          </h3>
        </div>

        <div className="flex items-center gap-2 text-[9px] tracking-widest text-[#8F99AE] bg-black/40 px-3 py-1.5 border border-white/[0.06] self-start sm:self-auto">
          <span>COMMUNAL DENSITY:</span>
          <span className="text-[#00F2FE] font-bold">152 ACTIVE OCCUPANTS</span>
        </div>
      </div>

      {/* Grid of Shared Spaces */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {COLLECTIVE_SPACES.map((space) => {
          const occupancyPercent = Math.round((space.activeResidents / space.capacity) * 100);

          return (
            <div
              key={space.id}
              className="p-4 bg-black/40 border border-white/[0.05] hover:border-[#00F2FE]/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[8px] text-[#8F99AE] tracking-widest uppercase mb-2 border-b border-white/[0.04] pb-1.5">
                  <span className="text-[#00F2FE]">{space.sector}</span>
                  <span>{space.level}</span>
                </div>

                <h4 className="font-display text-sm sm:text-base font-bold text-white uppercase tracking-tight mb-2">
                  {space.name}
                </h4>

                <p className="text-[10px] text-[#8F99AE] font-sans leading-relaxed font-light mb-3">
                  {space.purpose}
                </p>
              </div>

              <div>
                {/* Occupancy bar */}
                <div className="mb-2">
                  <div className="flex items-center justify-between text-[8px] text-[#8F99AE] mb-1">
                    <span>OCCUPANCY</span>
                    <span className="text-white font-bold">
                      {space.activeResidents} / {space.capacity} [{occupancyPercent}%]
                    </span>
                  </div>
                  <div className="w-full h-1 bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-[#00F2FE] transition-all duration-500"
                      style={{ width: `${occupancyPercent}%` }}
                    />
                  </div>
                </div>

                {/* Microclimate Telemetry Readout */}
                <div className="text-[8px] text-white/50 tracking-wider pt-1.5 border-t border-white/[0.04] truncate">
                  {space.currentAtmosphere}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
