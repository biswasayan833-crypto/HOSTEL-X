"use client";

import { SubsystemData } from "@/data/smart-living-data";

interface InfrastructureNetworkProps {
  data: SubsystemData;
  activeModeId: string;
  onSelectMode: (modeId: string) => void;
}

export function InfrastructureNetwork({
  data,
  activeModeId,
  onSelectMode,
}: InfrastructureNetworkProps) {
  const activeMode =
    data.modes.find((m) => m.id === activeModeId) || data.modes[0];

  const networkNodes = [
    { label: "SOLAR HARVEST", status: "1.42 MW", state: "NOMINAL", icon: "⚡" },
    { label: "WATER RECLAIM", status: "99.4%", state: "ACTIVE", icon: "💧" },
    { label: "AIR SCRUBBERS", status: "100%", state: "OPTIMAL", icon: "🌀" },
    { label: "REPAIR DRONES", status: "14 ACTIVE", state: "STANDBY", icon: "🤖" },
    { label: "STRUCTURAL STRESS", status: "0.02%", state: "SECURE", icon: "🛡️" },
    { label: "PERIMETER SHIELD", status: "LOCKED", state: "ONLINE", icon: "🔒" },
  ];

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* ────────────────────────────────────────────────────────
          01. RESOURCE DOMAIN SELECTOR (Power / Water / Drones)
          ──────────────────────────────────────────────────────── */}
      <div className="space-y-2">
        <div className="flex items-center justify-between font-mono text-[9px] tracking-[0.2em] text-[#8F99AE] uppercase">
          <span>RESOURCE SUBSYSTEM</span>
          <span className="text-[#00F2FE]">PREDICTIVE MATRIX</span>
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
                    ? "bg-[#0C0F17] border-[#00F2FE] shadow-[0_0_15px_rgba(0,242,254,0.12)]"
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

        {/* Selected Domain Micro-Description */}
        <p className="font-mono text-[8.5px] text-[#8F99AE] tracking-wide pt-1">
          {activeMode.description}
        </p>
      </div>

      {/* ────────────────────────────────────────────────────────
          02. 6 CITADEL NERVOUS SYSTEM RELAY NODES
          ──────────────────────────────────────────────────────── */}
      <div className="p-3 bg-[#0C0E14]/80 border border-[#252C3A]/70 backdrop-blur-sm space-y-2">
        <div className="flex items-center justify-between font-mono text-[8.5px] tracking-[0.2em] text-[#8F99AE] uppercase border-b border-white/[0.04] pb-1.5">
          <span>AUTONOMIC NODES // CITADEL-WIDE</span>
          <span className="text-[#00F2FE]">6/6 SYNCHRONIZED</span>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          {networkNodes.map((node, i) => (
            <div
              key={i}
              className="p-2 bg-[#090C12] border border-[#252C3A]/50 flex items-center justify-between"
            >
              <div>
                <div className="font-mono text-[8px] tracking-wider text-[#8F99AE]">
                  {node.label}
                </div>
                <div className="font-mono text-[11px] font-semibold text-white mt-0.5">
                  {node.status}
                </div>
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE]" />
            </div>
          ))}
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────
          03. RESOURCE MATRIX SPECIFICATIONS
          ──────────────────────────────────────────────────────── */}
      <div className="border border-[#252C3A]/60 bg-[#0C0E13]/40 p-3 space-y-2">
        <div className="font-mono text-[9px] tracking-[0.2em] text-white/70 uppercase flex items-center gap-2">
          <span className="w-1 h-1 bg-[#00F2FE]" />
          <span>AUTONOMIC INTEGRITY // 2088</span>
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
          04. LIVE PREDICTIVE AUTOPILOT STREAM
          ──────────────────────────────────────────────────────── */}
      <div className="font-mono text-[8.5px] tracking-[0.12em] text-[#8F99AE]/70 bg-black/40 px-3 py-2 border-l border-[#00F2FE]">
        <div className="flex items-center gap-2 text-[#00F2FE] mb-0.5">
          <span className="w-1 h-1 rounded-full bg-[#00F2FE] animate-ping" />
          <span>PREDICTIVE MAINTENANCE ROUTE</span>
        </div>
        <p className="text-white/80">{data.telemetryStream[0]?.event}</p>
      </div>
    </div>
  );
}
