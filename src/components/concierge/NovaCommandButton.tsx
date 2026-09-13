"use client";

import { CommandData } from "@/data/mock-data";

interface NovaCommandButtonProps {
  command: CommandData;
  isActive: boolean;
  onSelect: (id: CommandData["id"]) => void;
}

export function NovaCommandButton({
  command,
  isActive,
  onSelect,
}: NovaCommandButtonProps) {
  const isEmergency = command.id === "emergency";

  return (
    <button
      type="button"
      onClick={() => onSelect(command.id)}
      data-cursor="interactive"
      aria-pressed={isActive}
      className={`group relative w-full text-left p-3.5 sm:p-4 border transition-all duration-300 backdrop-blur-sm select-none ${
        isActive
          ? isEmergency
            ? "bg-[#FF453A]/15 border-[#FF453A] text-white shadow-[0_0_16px_rgba(255,69,58,0.25)]"
            : "bg-[#00F2FE]/15 border-[#00F2FE] text-white shadow-[0_0_16px_rgba(0,242,254,0.2)]"
          : "bg-[#0C0E13]/85 border-[#252C3A]/70 text-[#8F99AE] hover:border-[#00F2FE]/50 hover:text-white"
      }`}
    >
      <div className="flex items-center justify-between font-mono text-[11px] sm:text-xs tracking-[0.2em]">
        <span
          className={`font-semibold transition-colors duration-200 ${
            isActive
              ? isEmergency
                ? "text-[#FF453A]"
                : "text-[#00F2FE]"
              : "text-[#8F99AE] group-hover:text-[#00F2FE]"
          }`}
        >
          {command.code}
        </span>
        <span className="flex items-center gap-1.5 text-[9px] tracking-widest text-white/50">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isActive
                ? isEmergency
                  ? "bg-[#FF453A] animate-pulse"
                  : "bg-[#00F2FE] animate-pulse"
                : "bg-[#252C3A] group-hover:bg-[#00F2FE]/50"
            }`}
          />
          {isActive ? "ACTIVE" : "READY"}
        </span>
      </div>

      <div className="mt-1.5">
        <h4 className="font-display text-sm sm:text-base font-semibold tracking-tight text-white group-hover:text-[#00F2FE] transition-colors duration-200">
          {command.title}
        </h4>
        <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.15em] text-[#8F99AE]/80 mt-0.5 uppercase">
          {command.subtitle}
        </p>
      </div>

      {/* Active Indicator Accent Line */}
      <div
        className={`absolute bottom-0 left-0 h-[2px] transition-all duration-300 ${
          isActive
            ? isEmergency
              ? "w-full bg-[#FF453A]"
              : "w-full bg-[#00F2FE]"
            : "w-0 bg-[#00F2FE] group-hover:w-12"
        }`}
      />
    </button>
  );
}
