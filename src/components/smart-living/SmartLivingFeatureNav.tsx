"use client";

import { SubsystemId, SMART_LIVING_SUBSYSTEMS } from "@/data/smart-living-data";

interface SmartLivingFeatureNavProps {
  activeSubsystem: SubsystemId;
  onSelectSubsystem: (id: SubsystemId) => void;
}

export function SmartLivingFeatureNav({
  activeSubsystem,
  onSelectSubsystem,
}: SmartLivingFeatureNavProps) {
  const subsystems = Object.values(SMART_LIVING_SUBSYSTEMS);

  return (
    <div className="w-full border-y border-white/[0.06] bg-[#050608]/70 backdrop-blur-md">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/[0.05]">
        {subsystems.map((subsystem) => {
          const isActive = subsystem.id === activeSubsystem;
          return (
            <button
              key={subsystem.id}
              data-subsystem={subsystem.id}
              onClick={() => onSelectSubsystem(subsystem.id)}
              className={`group relative p-3 sm:p-4 text-left transition-all duration-300 cursor-pointer overflow-hidden ${
                isActive
                  ? "bg-[#0C0E14] text-white"
                  : "bg-transparent text-[#8F99AE] hover:text-white hover:bg-white/[0.02]"
              }`}
              data-cursor="interactive"
            >
              {/* Top Accent Line on Active */}
              <div
                className={`absolute top-0 left-0 right-0 h-[2px] transition-all duration-300 ${
                  isActive ? "opacity-100" : "opacity-0 group-hover:opacity-40"
                }`}
                style={{ backgroundColor: subsystem.accentHex }}
              />

              <div className="flex items-center justify-between font-mono text-[9px] sm:text-[10px] tracking-[0.2em] mb-1.5">
                <span
                  style={{ color: isActive ? subsystem.accentHex : undefined }}
                  className="font-medium"
                >
                  {`${subsystem.index} //`}
                </span>
                <span className="text-white/40 text-[8px] sm:text-[9px]">
                  {subsystem.code}
                </span>
              </div>

              <div className="font-display text-xs sm:text-sm font-semibold tracking-tight text-white uppercase truncate">
                {subsystem.title.split(" ")[0]} {subsystem.title.split(" ")[1]}
              </div>

              <div className="font-mono text-[8.5px] sm:text-[9px] text-[#8F99AE] tracking-wider truncate mt-0.5">
                {subsystem.category}
              </div>

              {/* Active Indicator Pulse */}
              {isActive && (
                <div className="flex items-center gap-1.5 mt-2 font-mono text-[8px] tracking-[0.15em] text-[#00F2FE]">
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ backgroundColor: subsystem.accentHex }}
                  />
                  <span>ENGAGED</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
