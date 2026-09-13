"use client";

import { SubsystemData } from "@/data/smart-living-data";

interface AtriumTelemetryProps {
  data: SubsystemData;
  activeModeId: string;
  onSelectMode: (modeId: string) => void;
}

export function AtriumTelemetry({
  data,
  activeModeId,
  onSelectMode,
}: AtriumTelemetryProps) {
  const activeMode =
    data.modes.find((m) => m.id === activeModeId) || data.modes[0];

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* ────────────────────────────────────────────────────────
          01. SPATIAL MODE SELECTOR (Synergy / Silent / Garden)
          ──────────────────────────────────────────────────────── */}
      <div className="space-y-2">
        <div className="flex items-center justify-between font-mono text-[9px] tracking-[0.2em] text-[#8F99AE] uppercase">
          <span>ATRIUM CONFIGURATION</span>
          <span className="text-[#A855F7]">KINETIC RECONFIG</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {data.modes.map((mode) => {
            const isSelected = mode.id === activeModeId;
            return (
              <button
                key={mode.id}
                onClick={() => onSelectMode(mode.id)}
                className={`py-2 px-2.5 text-left border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-[#0C0F17] border-[#A855F7] shadow-[0_0_15px_rgba(168,85,247,0.12)]"
                    : "bg-[#0A0D13]/60 border-[#252C3A]/60 hover:border-white/30 text-white/60"
                }`}
                data-cursor="interactive"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="font-mono text-[9px] tracking-[0.15em] font-medium"
                    style={{ color: isSelected ? mode.accentColor : undefined }}
                  >
                    {mode.name}
                  </span>
                  {isSelected && (
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ backgroundColor: mode.accentColor }}
                    />
                  )}
                </div>
                <div className="font-mono text-[8px] tracking-[0.1em] text-[#8F99AE]/80 mt-1 truncate">
                  {mode.tag}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────
          02. LIVE ATRIUM OCCUPANCY & ACOUSTIC VITALS GRID
          ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-2.5">
        {activeMode.metrics.map((metric, i) => (
          <div
            key={i}
            className="p-3 bg-[#0C0E14]/80 border border-[#252C3A]/70 backdrop-blur-sm relative overflow-hidden group"
          >
            <div className="flex items-center justify-between font-mono text-[8.5px] tracking-[0.18em] text-[#8F99AE] uppercase">
              <span>{metric.label}</span>
              <span className="text-[7.5px] px-1 py-0.5 border border-[#252C3A] text-[#A855F7]">
                {metric.status}
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white">
                {metric.value}
              </span>
              {metric.unit && (
                <span className="font-mono text-[10px] text-[#8F99AE]">
                  {metric.unit}
                </span>
              )}
            </div>
            <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-[#A855F7]/40" />
          </div>
        ))}
      </div>

      {/* ────────────────────────────────────────────────────────
          03. ATRIUM STRUCTURAL CLEARANCE & ACTUATION SPECS
          ──────────────────────────────────────────────────────── */}
      <div className="border border-[#252C3A]/60 bg-[#0C0E13]/40 p-3 space-y-2">
        <div className="font-mono text-[9px] tracking-[0.2em] text-white/70 uppercase flex items-center gap-2">
          <span className="w-1 h-1 bg-[#A855F7]" />
          <span>ATRIUM ARCHITECTURE // LEVEL 24</span>
        </div>
        <div className="grid grid-cols-1 gap-1.5 pt-1">
          {data.specifications.slice(0, 3).map((spec, i) => (
            <div
              key={i}
              className="flex items-center justify-between font-mono text-[9px] text-[#8F99AE] border-b border-white/[0.03] pb-1"
            >
              <span className="tracking-[0.12em]">{spec.key}</span>
              <span className="text-white/90 tracking-wider font-light">
                {spec.val}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────
          04. LIVE SPATIAL STREAM
          ──────────────────────────────────────────────────────── */}
      <div className="font-mono text-[8.5px] tracking-[0.12em] text-[#8F99AE]/70 bg-black/40 px-3 py-2 border-l border-[#A855F7]">
        <div className="flex items-center gap-2 text-[#A855F7] mb-0.5">
          <span className="w-1 h-1 rounded-full bg-[#A855F7] animate-ping" />
          <span>GEOMETRIC TELEMETRY</span>
        </div>
        <p className="text-white/80">{data.telemetryStream[0]?.event}</p>
      </div>
    </div>
  );
}
