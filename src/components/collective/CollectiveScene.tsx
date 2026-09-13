"use client";

import { useState, useMemo } from "react";
import {
  RESIDENT_NODES,
  NETWORK_CONNECTIONS,
  DivisionId,
} from "@/lib/resident-data";
import { ResidentNode } from "./ResidentNode";
import { ResidentNetwork } from "./ResidentNetwork";
import { ResidentProfile } from "./ResidentProfile";

interface CollectiveSceneProps {
  activeDivisionFilter?: DivisionId | null;
}

export function CollectiveScene({ activeDivisionFilter }: CollectiveSceneProps) {
  const [selectedResidentId, setSelectedResidentId] = useState<string | null>(null);
  const [hoveredResidentId, setHoveredResidentId] = useState<string | null>(null);
  const [localDivisionFilter, setLocalDivisionFilter] = useState<DivisionId | null>(null);

  // Combine external and local division filters
  const currentFilter = activeDivisionFilter || localDivisionFilter;

  // Selected resident data
  const selectedResident = useMemo(() => {
    return RESIDENT_NODES.find((r) => r.id === selectedResidentId) || null;
  }, [selectedResidentId]);

  // Determine connected resident IDs for active focus
  const activeFocusId = selectedResidentId || hoveredResidentId;
  const connectedIds = useMemo(() => {
    if (!activeFocusId) return new Set<string>();
    const active = RESIDENT_NODES.find((r) => r.id === activeFocusId);
    return new Set<string>(active ? active.connections : []);
  }, [activeFocusId]);

  // Handle resident selection
  const handleSelectResident = (id: string) => {
    setSelectedResidentId(selectedResidentId === id ? null : id);
  };

  return (
    <div
      className="relative w-full min-h-[580px] sm:min-h-[660px] lg:min-h-[740px] bg-[#0C0E13]/90 border border-[#252C3A]/80 p-4 sm:p-6 lg:p-8 font-mono backdrop-blur-md overflow-hidden flex flex-col justify-between"
      aria-label="Citadel Resident Network Field Stage"
    >
      {/* ────────────────────────────────────────────────────────────
          TOP TELEMETRY HEADER & DIVISION TOGGLES
          ──────────────────────────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/[0.06] pb-4 z-20 relative">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#00F2FE] animate-pulse" />
          <div>
            <div className="text-[9px] text-[#00F2FE] tracking-[0.25em] uppercase font-bold">
              HUMAN NETWORK FIELD {"//"} 2088
            </div>
            <div className="text-xs sm:text-sm font-display font-bold text-white tracking-wide uppercase">
              {selectedResident
                ? `NETWORK FOCUS // ${selectedResident.name} [${selectedResident.discipline}]`
                : "RESIDENT COGNITIVE MESH ARCHITECTURE"}
            </div>
          </div>
        </div>

        {/* Division Quick Filter Bar */}
        <div className="flex items-center gap-1.5 flex-wrap text-[8px] sm:text-[9px]">
          <button
            type="button"
            data-cursor="interactive"
            onClick={() => setLocalDivisionFilter(null)}
            className={`px-2 py-1 border transition-colors uppercase ${
              currentFilter === null
                ? "bg-[#00F2FE]/20 border-[#00F2FE] text-[#00F2FE] font-bold"
                : "bg-black/40 border-white/[0.06] text-[#8F99AE] hover:text-white"
            }`}
          >
            ALL CLUSTERS
          </button>
          {(
            [
              { id: "human_systems", label: "HUMAN SYSTEMS" },
              { id: "robotics", label: "ROBOTICS" },
              { id: "climate_arch", label: "CLIMATE" },
              { id: "computational", label: "QUANTUM" },
              { id: "bioengineering", label: "BIOENG" },
              { id: "social_intel", label: "SOCIAL" },
            ] as const
          ).map((div) => (
            <button
              key={div.id}
              type="button"
              data-cursor="interactive"
              onClick={() =>
                setLocalDivisionFilter(localDivisionFilter === div.id ? null : div.id)
              }
              className={`px-2 py-1 border transition-colors uppercase ${
                currentFilter === div.id
                  ? "bg-[#00F2FE]/20 border-[#00F2FE] text-[#00F2FE] font-bold"
                  : "bg-black/40 border-white/[0.06] text-[#8F99AE] hover:text-white"
              }`}
            >
              {div.label}
            </button>
          ))}
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────────
          CENTER SPATIAL NETWORK FIELD (CITADEL VERTICAL ELEVATION TIERS)
          ──────────────────────────────────────────────────────────── */}
      <div className="relative flex-1 w-full my-4 min-h-[440px] sm:min-h-[500px] flex items-center justify-center">
        {/* Citadel Elevation Reference Tier Lines */}
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between py-6 opacity-30">
          <div className="border-b border-dashed border-[#00F2FE]/40 pb-1 flex justify-between text-[8px] text-[#00F2FE]/70 tracking-widest uppercase">
            <span>LEVEL 48 // APEX SOLAR CANOPY & NEURAL MESH</span>
            <span>ELEVATION +420M</span>
          </div>
          <div className="border-b border-dashed border-white/20 pb-1 flex justify-between text-[8px] text-[#8F99AE] tracking-widest uppercase">
            <span>LEVEL 42 // HIGH RESIDENTIAL & CLIMATE OBSERVATORY</span>
            <span>ELEVATION +340M</span>
          </div>
          <div className="border-b border-[#00F2FE]/60 pb-1 flex justify-between text-[8px] text-[#00F2FE] tracking-widest uppercase font-bold">
            <span>LEVEL 28 // SECTOR 07 SKYBRIDGE & SYNTHESIS LABS</span>
            <span>ELEVATION +210M [PRIMARY CLUSTER]</span>
          </div>
          <div className="border-b border-dashed border-white/20 pb-1 flex justify-between text-[8px] text-[#8F99AE] tracking-widest uppercase">
            <span>LEVEL 14 // SOCIAL ATRIUM & MEZZANINE PODS</span>
            <span>ELEVATION +110M</span>
          </div>
          <div className="border-b border-dashed border-white/20 pb-1 flex justify-between text-[8px] text-[#8F99AE] tracking-widest uppercase">
            <span>LEVEL 07 // FOUNDATION CORE & KINETIC FABRICATION</span>
            <span>ELEVATION +45M</span>
          </div>
        </div>

        {/* Dynamic Vector Connections */}
        <ResidentNetwork
          connections={NETWORK_CONNECTIONS}
          residents={RESIDENT_NODES}
          selectedResidentId={selectedResidentId || undefined}
          hoveredResidentId={hoveredResidentId || undefined}
        />

        {/* Spatial Resident Nodes */}
        <div className="absolute inset-0">
          {RESIDENT_NODES.map((node) => {
            const isSelected = selectedResidentId === node.id;
            const isHovered = hoveredResidentId === node.id;
            const isConnectedToSelected = connectedIds.has(node.id);
            const isDimmed =
              currentFilter && node.divisionId !== currentFilter
                ? true
                : activeFocusId
                ? !isSelected && !isConnectedToSelected
                : false;

            return (
              <ResidentNode
                key={node.id}
                node={node}
                isSelected={isSelected}
                isHovered={isHovered}
                isDimmed={isDimmed}
                isConnectedToSelected={isConnectedToSelected}
                onClick={() => handleSelectResident(node.id)}
                onMouseEnter={() => setHoveredResidentId(node.id)}
                onMouseLeave={() => setHoveredResidentId(null)}
              />
            );
          })}
        </div>

        {/* Selected Resident Profile Overlay (Focus Mode) */}
        {selectedResident && (
          <div className="absolute z-30 right-2 sm:right-6 top-6 bottom-6 flex items-center">
            <ResidentProfile
              resident={selectedResident}
              onClose={() => setSelectedResidentId(null)}
              onSelectResident={(id) => setSelectedResidentId(id)}
              allResidents={RESIDENT_NODES}
            />
          </div>
        )}
      </div>

      {/* ────────────────────────────────────────────────────────────
          BOTTOM STATUS FOOTER & INTERACTION GUIDE
          ──────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-white/[0.06] z-20 relative text-[9px]">
        <div className="flex items-center gap-3 text-[#8F99AE]">
          <span className="text-white font-semibold">INTERACTION:</span>
          <span>CLICK NODE TO ENTER NETWORK FOCUS</span>
          <span className="text-white/30 hidden sm:inline">•</span>
          <span className="hidden sm:inline">HOVER TO TRACE SYNAPSE CONNECTIONS</span>
        </div>

        <div className="flex items-center gap-3 text-[#8F99AE]">
          <span className="text-white/40">CLUSTER DENSITY:</span>
          <span className="text-[#00F2FE] font-bold">20 ACTIVE NODES MAPPED</span>
          {selectedResidentId && (
            <button
              type="button"
              onClick={() => setSelectedResidentId(null)}
              className="text-[#00F2FE] hover:underline uppercase ml-2"
            >
              [RESET FOCUS]
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
