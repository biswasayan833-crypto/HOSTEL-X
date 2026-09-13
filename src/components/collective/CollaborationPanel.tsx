"use client";

import { useState } from "react";
import { ACTIVE_COLLABORATIONS } from "@/lib/resident-data";

export function CollaborationPanel() {
  const [selectedCollabId, setSelectedCollabId] = useState<string>(
    ACTIVE_COLLABORATIONS[0].id
  );

  return (
    <div
      className="bg-[#0C0E13]/90 border border-[#252C3A]/80 p-5 sm:p-8 font-mono backdrop-blur-md relative overflow-hidden"
      aria-label="Active Cross-Disciplinary Collaborations"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-[9px] tracking-[0.25em] text-[#00F2FE] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE] animate-pulse" />
            <span>CROSS-DISCIPLINARY SYNERGY {"//"} SYSTEM PROJECTS</span>
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white mt-1 uppercase">
            ACTIVE <span className="text-[#00F2FE]">{"//"}</span> COLLABORATION MATRICES
          </h3>
        </div>

        <div className="flex items-center gap-2 text-[9px] tracking-widest text-[#8F99AE] bg-black/40 px-3 py-1.5 border border-white/[0.06] self-start sm:self-auto">
          <span>INTER-NODE BANDWIDTH:</span>
          <span className="text-[#00F2FE] font-bold">44.6 GB/S COMBINED</span>
        </div>
      </div>

      {/* Grid of Featured Collaborations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {ACTIVE_COLLABORATIONS.map((collab) => {
          const isSelected = selectedCollabId === collab.id;

          return (
            <div
              key={collab.id}
              role="button"
              tabIndex={0}
              data-cursor="interactive"
              aria-pressed={isSelected}
              onClick={() => setSelectedCollabId(collab.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedCollabId(collab.id);
                }
              }}
              className={`p-5 border transition-all duration-300 flex flex-col justify-between relative text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F2FE] cursor-pointer ${
                isSelected
                  ? "bg-[#161A22] border-[#00F2FE] shadow-[0_0_20px_rgba(0,242,254,0.15)]"
                  : "bg-black/40 border-white/[0.05] hover:border-[#00F2FE]/40"
              }`}
            >
              {/* Top Pair Node Identifiers */}
              <div>
                <div className="flex items-center justify-between text-[9px] tracking-widest text-[#8F99AE] uppercase mb-3 border-b border-white/[0.04] pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[#00F2FE] font-bold">{collab.primaryResidentId}</span>
                    <span className="text-white/40">↔</span>
                    <span className="text-[#7928CA] font-bold">{collab.partnerResidentId}</span>
                  </div>
                  <span className="text-[8px] px-1.5 py-0.5 bg-[#00F2FE]/10 border border-[#00F2FE]/30 text-[#00F2FE] font-semibold tracking-wider">
                    {collab.status}
                  </span>
                </div>

                {/* Project Title */}
                <h4 className="font-display text-base font-bold tracking-tight text-white uppercase mb-2">
                  {collab.projectName}
                </h4>

                {/* Disciplines */}
                <div className="flex items-center gap-1.5 text-[8px] text-[#00F2FE] tracking-wider uppercase mb-3">
                  <span>{collab.disciplines[0]}</span>
                  <span className="text-white/30">+</span>
                  <span>{collab.disciplines[1]}</span>
                </div>

                {/* Project Summary */}
                <p className="text-xs text-[#8F99AE] font-sans leading-relaxed font-light mb-4">
                  {collab.summary}
                </p>
              </div>

              {/* Footer Location & Bandwidth */}
              <div className="border-t border-white/[0.04] pt-3 flex flex-col gap-1 text-[9px] text-[#8F99AE]">
                <div className="flex items-center justify-between">
                  <span className="text-white/40 text-[8px] uppercase">LOCATION:</span>
                  <span className="text-white font-semibold truncate">{collab.location}</span>
                </div>
                <div className="flex items-center justify-between text-[#00F2FE]">
                  <span className="text-white/40 text-[8px] uppercase">SYNCHRONY:</span>
                  <span className="font-bold">{collab.bandwidth}</span>
                </div>
              </div>

              {/* Subtle top corner tech bracket */}
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00F2FE]/40" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
