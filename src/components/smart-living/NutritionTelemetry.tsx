"use client";

import { SubsystemData } from "@/data/smart-living-data";

interface NutritionTelemetryProps {
  data: SubsystemData;
  activeModeId: string;
  onSelectMode: (modeId: string) => void;
}

export function NutritionTelemetry({
  data,
  activeModeId,
  onSelectMode,
}: NutritionTelemetryProps) {
  const activeMode =
    data.modes.find((m) => m.id === activeModeId) || data.modes[0];

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* ────────────────────────────────────────────────────────
          01. MEAL CYCLE SELECTOR (Breakfast / Lunch / Dinner)
          ──────────────────────────────────────────────────────── */}
      <div className="space-y-2">
        <div className="flex items-center justify-between font-mono text-[9px] tracking-[0.2em] text-[#8F99AE] uppercase">
          <span>DAILY NUTRITION CYCLE</span>
          <span className="text-[#00F5A0]">AUTONOMOUS DISPENSE</span>
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
                    ? "bg-[#0C0F17] border-[#00F5A0] shadow-[0_0_15px_rgba(0,245,160,0.12)]"
                    : "bg-[#0A0D13]/60 border-[#252C3A]/60 hover:border-white/30 text-white/60"
                }`}
                data-cursor="interactive"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="font-mono text-[9px] tracking-[0.15em] font-medium"
                    style={{ color: isSelected ? mode.accentColor : undefined }}
                  >
                    {mode.name.split(" ")[1] || mode.name}
                  </span>
                  {isSelected && (
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ backgroundColor: mode.accentColor }}
                    />
                  )}
                </div>
                <div className="font-mono text-[8px] tracking-[0.1em] text-[#8F99AE]/80 mt-1">
                  {mode.name.split(" ")[0]}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────
          02. MACRONUTRIENT INSTRUMENTATION BARS
          ──────────────────────────────────────────────────────── */}
      <div className="p-3.5 bg-[#0C0E14]/80 border border-[#252C3A]/70 backdrop-blur-sm space-y-3">
        <div className="flex items-center justify-between font-mono text-[8.5px] tracking-[0.2em] text-[#8F99AE] uppercase">
          <span>MACRONUTRIENT BALANCE</span>
          <span className="text-[#00F5A0]">TARGET: 100% MET</span>
        </div>

        {activeMode.metrics.slice(0, 3).map((metric, i) => {
          const valNum = parseFloat(metric.value) || 50;
          const maxVal = i === 0 ? 50 : i === 1 ? 80 : 30;
          const pct = Math.min(Math.round((valNum / maxVal) * 100), 100);

          return (
            <div key={i} className="space-y-1">
              <div className="flex items-center justify-between font-mono text-[9px] text-white">
                <span className="tracking-wider text-[#8F99AE]">{metric.label}</span>
                <span className="font-medium">
                  {metric.value}
                  {metric.unit}
                </span>
              </div>
              <div className="w-full h-1 bg-[#1A1F2B] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#00F5A0] to-[#00D9F5] transition-all duration-500 ease-out"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}

        {/* Caloric Load Summary */}
        <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between font-mono text-[9px]">
          <span className="text-[#8F99AE] tracking-wider">TOTAL CALORIC LOAD</span>
          <span className="text-[#00F5A0] font-semibold tracking-widest">
            {activeMode.metrics[3]?.value} {activeMode.metrics[3]?.unit}
          </span>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────
          03. MESS SPECIFICATIONS & DISPENSATION TELEMETRY
          ──────────────────────────────────────────────────────── */}
      <div className="border border-[#252C3A]/60 bg-[#0C0E13]/40 p-3 space-y-2">
        <div className="font-mono text-[9px] tracking-[0.2em] text-white/70 uppercase flex items-center gap-2">
          <span className="w-1 h-1 bg-[#00F5A0]" />
          <span>REFECTION MATRIX // LEVEL 14</span>
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
          04. LIVE FOOD REFECTION STATUS
          ──────────────────────────────────────────────────────── */}
      <div className="font-mono text-[8.5px] tracking-[0.12em] text-[#8F99AE]/70 bg-black/40 px-3 py-2 border-l border-[#00F5A0]">
        <div className="flex items-center gap-2 text-[#00F5A0] mb-0.5">
          <span className="w-1 h-1 rounded-full bg-[#00F5A0] animate-ping" />
          <span>AUTONOMOUS DISPENSATION</span>
        </div>
        <p className="text-white/80">{data.telemetryStream[0]?.event}</p>
      </div>
    </div>
  );
}
