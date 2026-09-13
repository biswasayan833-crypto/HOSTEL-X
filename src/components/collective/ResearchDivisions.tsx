"use client";

import { RESEARCH_DIVISIONS, DivisionId } from "@/lib/resident-data";

interface ResearchDivisionsProps {
  activeDivision: DivisionId | null;
  onSelectDivision: (id: DivisionId | null) => void;
}

export function ResearchDivisions({
  activeDivision,
  onSelectDivision,
}: ResearchDivisionsProps) {
  return (
    <div
      className="bg-[#0C0E13]/90 border border-[#252C3A]/80 p-5 sm:p-8 font-mono backdrop-blur-md relative overflow-hidden"
      aria-label="Research and Community Divisions"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-[9px] tracking-[0.25em] text-[#00F2FE] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE] animate-pulse" />
            <span>COLLECTIVE ARCHITECTURE {"//"} KNOWLEDGE DIVISIONS</span>
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white mt-1 uppercase">
            RESEARCH <span className="text-[#00F2FE]">{"//"}</span> COMMUNITY MATRICES
          </h3>
        </div>

        <div className="flex items-center gap-2 text-[9px] tracking-widest text-[#8F99AE] bg-black/40 px-3 py-1.5 border border-white/[0.06] self-start sm:self-auto">
          <span>ACTIVE DIVISIONS:</span>
          <span className="text-[#00F2FE] font-bold">06 STRATEGIC CLUSTERS</span>
        </div>
      </div>

      {/* Editorial Strips List */}
      <div className="space-y-3">
        {RESEARCH_DIVISIONS.map((division) => {
          const isSelected = activeDivision === division.id;

          return (
            <div
              key={division.id}
              role="button"
              tabIndex={0}
              data-cursor="interactive"
              aria-pressed={isSelected}
              onClick={() => onSelectDivision(isSelected ? null : division.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectDivision(isSelected ? null : division.id);
                }
              }}
              className={`p-4 sm:p-5 border transition-all duration-300 text-left relative overflow-hidden group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F2FE] ${
                isSelected
                  ? "bg-[#161A22] border-[#00F2FE] shadow-[0_0_20px_rgba(0,242,254,0.15)]"
                  : "bg-black/40 border-white/[0.05] hover:border-[#00F2FE]/40 hover:bg-[#0C0E13]"
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Left: Code & Title */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[9px] tracking-widest text-[#8F99AE] uppercase">
                    <span className="text-[#00F2FE] font-bold">{division.code}</span>
                    <span className="text-white/30">•</span>
                    <span>SECTOR DISTRIBUTION: {division.sectors}</span>
                  </div>
                  <h4 className="font-display text-base sm:text-xl font-bold tracking-tight text-white uppercase group-hover:text-[#00F2FE] transition-colors">
                    {division.name}
                  </h4>
                  <p className="text-xs text-[#8F99AE] font-sans leading-relaxed max-w-2xl font-light">
                    {division.description}
                  </p>
                </div>

                {/* Right: Metrics & Lead Disciplines */}
                <div className="flex flex-wrap lg:flex-col items-start lg:items-end gap-2 shrink-0 border-t lg:border-t-0 border-white/[0.04] pt-3 lg:pt-0">
                  <div className="flex items-center gap-3 text-[10px] tracking-wider">
                    <span className="text-white font-bold">{division.nodeCount} ACTIVE NODES</span>
                    <span className="text-white/30">•</span>
                    <span className="text-[#00F2FE]">{division.collaborativeProjects} PROJECTS</span>
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap">
                    {division.leadDisciplines.map((d) => (
                      <span
                        key={d}
                        className="text-[8px] px-2 py-0.5 bg-black/60 border border-white/[0.06] text-white/70 uppercase tracking-wider"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Accent Left Edge Bar */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-[2.5px] transition-colors ${
                  isSelected ? "bg-[#00F2FE]" : "bg-transparent group-hover:bg-[#00F2FE]/50"
                }`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
