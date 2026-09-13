"use client";

import { useEffect, useRef } from "react";
import { ResidentNodeData } from "@/lib/resident-data";

interface ResidentProfileProps {
  resident: ResidentNodeData;
  onClose: () => void;
  onSelectResident: (id: string) => void;
  allResidents: ResidentNodeData[];
}

export function ResidentProfile({
  resident,
  onClose,
  onSelectResident,
  allResidents,
}: ResidentProfileProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Find connected resident objects
  const connectedResidents = allResidents.filter((r) =>
    resident.connections.includes(r.id)
  );

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="false"
      aria-label={`Diagnostic Dossier for ${resident.name}`}
      className="relative w-full max-w-md bg-[#0C0E13]/95 border border-[#00F2FE]/50 p-5 sm:p-6 font-mono text-white shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-xl animate-in fade-in zoom-in-95 duration-250"
    >
      {/* Top Telemetry Header */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4">
        <div className="flex items-center gap-2 text-[9px] tracking-[0.25em] text-[#00F2FE] uppercase">
          <span className="w-2 h-2 rounded-full bg-[#00F2FE] animate-ping" />
          <span>HUMAN NODE DIAGNOSTIC</span>
          <span className="text-white/30">•</span>
          <span className="text-white/70">2088 RESIDENT MESH</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss resident dossier"
          className="text-[9px] px-2 py-0.5 bg-black/60 border border-white/[0.1] text-[#8F99AE] hover:text-[#00F2FE] hover:border-[#00F2FE]/40 transition-colors"
        >
          DISMISS [ESC]
        </button>
      </div>

      {/* Main Resident Identifier & Status */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <div className="text-[10px] text-[#8F99AE] tracking-widest uppercase">
            NODE IDENTITY
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white uppercase mt-0.5">
            {resident.name}
          </h3>
          <div className="text-xs sm:text-sm font-semibold text-[#00F2FE] tracking-wide uppercase mt-1">
            {resident.discipline}
          </div>
        </div>

        <div className="text-right">
          <span className="inline-block text-[8px] px-2 py-1 bg-[#00F2FE]/10 border border-[#00F2FE]/30 text-[#00F2FE] font-bold tracking-widest uppercase">
            {resident.status}
          </span>
          <div className="text-[8px] text-[#8F99AE] tracking-widest mt-1.5">
            {resident.hardwareAnchor}
          </div>
        </div>
      </div>

      {/* Spatial Location & Current Activity Matrix */}
      <div className="grid grid-cols-2 gap-2.5 p-3 bg-black/50 border border-white/[0.06] mb-4 text-[10px]">
        <div>
          <span className="text-[#8F99AE] text-[8px] tracking-widest uppercase block">
            LOCATION
          </span>
          <span className="font-bold text-white tracking-wide mt-0.5 block">
            {resident.sector}
          </span>
          <span className="text-[9px] text-[#00F2FE] tracking-wider block">
            {resident.level}
          </span>
        </div>

        <div>
          <span className="text-[#8F99AE] text-[8px] tracking-widest uppercase block">
            CURRENT ACTIVITY
          </span>
          <span className="font-bold text-white tracking-wide mt-0.5 block truncate">
            {resident.activity}
          </span>
          <span className="text-[9px] text-white/50 tracking-wider block">
            {resident.bioSignal}
          </span>
        </div>
      </div>

      {/* Active Research Focus */}
      <div className="mb-4">
        <span className="text-[#8F99AE] text-[8px] tracking-widest uppercase block mb-1">
          PRIMARY RESEARCH PROTOCOL
        </span>
        <div className="p-2.5 bg-[#161A22]/50 border border-[#252C3A] text-xs text-white/90 leading-relaxed font-sans">
          {resident.research}
        </div>
      </div>

      {/* Active Collaborative Connections (Interactive) */}
      <div className="border-t border-white/[0.06] pt-3">
        <div className="flex items-center justify-between text-[9px] text-[#8F99AE] tracking-widest uppercase mb-2">
          <span>COLLABORATIVE CONNECTIONS</span>
          <span className="text-[#00F2FE] font-bold">
            0{connectedResidents.length} ACTIVE LINKS
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {connectedResidents.map((c) => (
            <button
              key={c.id}
              type="button"
              data-cursor="interactive"
              onClick={() => onSelectResident(c.id)}
              className="px-2.5 py-1 bg-black/40 border border-white/[0.08] hover:border-[#00F2FE] hover:bg-[#00F2FE]/10 transition-colors text-[9px] text-left flex items-center gap-2 group"
              aria-label={`Jump to connected node ${c.name}`}
            >
              <span className="text-[#00F2FE] font-bold group-hover:underline">
                {c.name}
              </span>
              <span className="text-white/40 text-[8px]">•</span>
              <span className="text-[#8F99AE] text-[8px] truncate max-w-[120px]">
                {c.discipline}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Corner Technical Accents */}
      <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-[#00F2FE]" />
      <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-[#00F2FE]" />
      <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-[#00F2FE]" />
      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-[#00F2FE]" />
    </div>
  );
}
