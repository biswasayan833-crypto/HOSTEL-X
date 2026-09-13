"use client";

import { SubsystemData } from "@/data/smart-living-data";

interface BiometricTelemetryProps {
  data: SubsystemData;
  activeModeId: string;
  onSelectMode: (modeId: string) => void;
}

export function BiometricTelemetry({
  data,
  activeModeId,
  onSelectMode,
}: BiometricTelemetryProps) {
  const activeMode =
    data.modes.find((m) => m.id === activeModeId) || data.modes[0];

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* ────────────────────────────────────────────────────────
          01. CIRCADIAN MODE SELECTOR (Focus / Recovery / Sleep)
          ──────────────────────────────────────────────────────── */}
      <div className="space-y-2">
        <div className="flex items-center justify-between font-mono text-[9px] tracking-[0.2em] text-[#8F99AE] uppercase">
          <span>CIRCADIAN CALIBRATION</span>
          <span className="text-[#00F2FE]">LIVE TUNING</span>
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
      </div>

      {/* ────────────────────────────────────────────────────────
          02. LIVE ENVIRONMENTAL VITALS GRID (Temp, Air, Acoustics, CO2)
          ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-2.5">
        {activeMode.metrics.map((metric, i) => (
          <div
            key={i}
            className="p-3 bg-[#0C0E14]/80 border border-[#252C3A]/70 backdrop-blur-sm relative overflow-hidden group"
          >
            <div className="flex items-center justify-between font-mono text-[8.5px] tracking-[0.18em] text-[#8F99AE] uppercase">
              <span>{metric.label}</span>
              <span className="text-[7.5px] px-1 py-0.5 border border-[#252C3A] text-[#00F2FE]">
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
            {/* Subtle corner indicator */}
            <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-[#00F2FE]/40" />
          </div>
        ))}
      </div>

      {/* ────────────────────────────────────────────────────────
          03. ARCHITECTURAL ISOLATION SPECIFICATIONS
          ──────────────────────────────────────────────────────── */}
      <div className="border border-[#252C3A]/60 bg-[#0C0E13]/40 p-3 space-y-2">
        <div className="font-mono text-[9px] tracking-[0.2em] text-white/70 uppercase flex items-center gap-2">
          <span className="w-1 h-1 bg-[#00F2FE]" />
          <span>POD SPECIFICATIONS // LEVEL 28-A</span>
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
          04. LIVE TELEMETRY FEED
          ──────────────────────────────────────────────────────── */}
      <div className="font-mono text-[8.5px] tracking-[0.12em] text-[#8F99AE]/70 bg-black/40 px-3 py-2 border-l border-[#00F2FE]">
        <div className="flex items-center gap-2 text-[#00F2FE] mb-0.5">
          <span className="w-1 h-1 rounded-full bg-[#00F2FE] animate-ping" />
          <span>LATEST BIO-TELEMETRY</span>
        </div>
        <p className="text-white/80">{data.telemetryStream[0]?.event}</p>
      </div>
    </div>
  );
}
