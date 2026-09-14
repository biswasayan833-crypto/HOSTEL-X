"use client";

import { ResidentNodeData } from "@/lib/resident-data";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ResidentNodeProps {
  node: ResidentNodeData;
  isSelected: boolean;
  isHovered: boolean;
  isDimmed: boolean;
  isConnectedToSelected: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function ResidentNode({
  node,
  isSelected,
  isHovered,
  isDimmed,
  isConnectedToSelected,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: ResidentNodeProps) {
  const isReduced = useReducedMotion();

  // Activity colors
  const isVioletAccent = node.activityType === "COLLABORATION" || node.activityType === "FOCUS";
  const coreColor = isVioletAccent ? "#7928CA" : "#00F2FE";

  return (
    <div
      className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 pointer-events-auto ${
        isDimmed && !isSelected && !isConnectedToSelected
          ? "opacity-25 scale-90"
          : "opacity-100 scale-100"
      }`}
      style={{
        left: `${node.xPercent}%`,
        top: `${node.yPercent}%`,
      }}
    >
      <button
        type="button"
        data-cursor="resident"
        aria-label={`Resident ${node.name}, ${node.discipline}, ${node.sector}, ${node.level}, Status: ${node.status}`}
        aria-pressed={isSelected}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="group relative flex items-center justify-center p-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F2FE] rounded-full"
      >
        {/* Outer Orbital Ring */}
        <div
          className={`rounded-full border transition-all duration-300 flex items-center justify-center ${
            isSelected
              ? "w-10 h-10 border-[#00F2FE] bg-[#00F2FE]/15 shadow-[0_0_16px_rgba(0,242,254,0.6)]"
              : isConnectedToSelected
              ? "w-8 h-8 border-[#7928CA] bg-[#7928CA]/10 shadow-[0_0_12px_rgba(121,40,202,0.5)]"
              : isHovered
              ? "w-8 h-8 border-[#00F2FE]/80 bg-[#00F2FE]/10 scale-110"
              : "w-6 h-6 border-white/20 resident-node-reticle group-hover:border-[#00F2FE]/60"
          }`}
        >
          {/* Subtle spinning dashed reticle */}
          {!isReduced && (
            <div
              className={`rounded-full border border-dashed transition-all duration-300 ${
                isSelected
                  ? "w-8 h-8 border-[#00F2FE]/70 animate-[spin_8s_linear_infinite]"
                  : "w-5 h-5 border-white/30 resident-node-reticle animate-[spin_16s_linear_infinite]"
              }`}
            />
          )}
        </div>

        {/* Central Luminous Core */}
        <div
          className="absolute w-2 h-2 rounded-full transition-transform duration-200"
          style={{
            backgroundColor: isSelected ? "#00F2FE" : coreColor,
            boxShadow: `0 0 8px ${isSelected ? "#00F2FE" : coreColor}`,
            transform: isHovered || isSelected ? "scale(1.4)" : "scale(1)",
          }}
        />

        {/* Floating Telemetry Tag (Visible on hover, selection, or connected status) */}
        <div
          className={`absolute left-8 top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none transition-all duration-200 font-mono text-[8px] tracking-widest uppercase ${
            isHovered || isSelected || isConnectedToSelected
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-1 hidden sm:block"
          }`}
        >
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#0C0E13]/90 border border-[#252C3A] backdrop-blur-md shadow-lg">
            <span
              className="font-bold"
              style={{ color: isSelected ? "#00F2FE" : coreColor }}
            >
              {node.name}
            </span>
            <span className="text-white/40">•</span>
            <span className="text-[#8F99AE]">{node.sector}</span>
          </div>
        </div>
      </button>
    </div>
  );
}
