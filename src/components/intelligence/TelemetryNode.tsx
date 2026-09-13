"use client";

import { useState, useRef, useEffect } from "react";
import { SpatialNodeData } from "@/lib/intelligence-data";

interface TelemetryNodeProps {
  node: SpatialNodeData;
  isActive?: boolean;
  onToggle?: (id: string) => void;
  className?: string;
  renderMode?: "absolute" | "relative";
}

export function TelemetryNode({
  node,
  isActive: externalIsActive,
  onToggle,
  className = "",
  renderMode = "absolute",
}: TelemetryNodeProps) {
  const [internalActive, setInternalActive] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);

  const isActive = externalIsActive !== undefined ? externalIsActive : internalActive;

  const handleToggle = () => {
    if (onToggle) {
      onToggle(node.id);
    } else {
      setInternalActive((prev) => !prev);
    }
  };

  // Close on Escape or click outside
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (onToggle) onToggle(node.id);
        else setInternalActive(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (nodeRef.current && !nodeRef.current.contains(e.target as Node)) {
        if (onToggle) onToggle("");
        else setInternalActive(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isActive, node.id, onToggle]);

  return (
    <div
      ref={nodeRef}
      className={`${
        renderMode === "absolute" ? "absolute z-20" : "relative"
      } ${className}`}
      style={
        renderMode === "absolute"
          ? {
              left: `${node.xPercent}%`,
              top: `${node.yPercent}%`,
              transform: "translate(-50%, -50%)",
            }
          : undefined
      }
    >
      {/* Interactive Trigger Button */}
      <button
        type="button"
        data-cursor="inspect"
        aria-label={`Inspect ${node.name}`}
        aria-expanded={isActive}
        onClick={handleToggle}
        onMouseEnter={() => {
          if (externalIsActive === undefined) setInternalActive(true);
        }}
        className="group relative flex items-center justify-center p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F2FE] rounded-full transition-transform duration-300 hover:scale-110"
      >
        {/* Outer targeting pulse ring */}
        <div
          className={`w-8 h-8 rounded-full border border-[#00F2FE]/40 transition-all duration-300 flex items-center justify-center ${
            isActive
              ? "scale-125 border-[#00F2FE] bg-[#00F2FE]/10"
              : "group-hover:border-[#00F2FE] group-hover:bg-[#00F2FE]/5"
          }`}
        >
          {/* Rotating dashed reticle ring */}
          <div className="w-6 h-6 rounded-full border border-dashed border-[#00F2FE]/60 animate-[spin_10s_linear_infinite]" />
        </div>

        {/* Center core emitter dot */}
        <div className="absolute w-2 h-2 rounded-full bg-[#00F2FE] shadow-[0_0_8px_#00F2FE]" />

        {/* Floating Telemetry Tag */}
        <div className="absolute left-9 top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none hidden sm:flex items-center gap-1.5 px-2 py-0.5 bg-[#0C0E13]/90 border border-white/[0.08] backdrop-blur-sm text-[8px] font-mono tracking-widest text-[#8F99AE] uppercase">
          <span className="text-[#00F2FE] font-bold">{node.id.toUpperCase()}</span>
          <span className="text-white/40">•</span>
          <span className="text-white">{node.primaryMetric}</span>
        </div>
      </button>

      {/* Flyout Telemetry Card */}
      {isActive && (
        <div
          role="region"
          aria-label={`${node.name} Details`}
          className="absolute z-30 left-1/2 -translate-x-1/2 mt-2 w-72 sm:w-80 bg-[#0C0E13]/95 border border-[#00F2FE]/50 p-4 shadow-[0_12px_30px_rgba(0,0,0,0.8)] backdrop-blur-md font-mono text-left animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-2 mb-3">
            <div className="flex items-center gap-2 text-[9px] tracking-[0.2em] text-[#00F2FE] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE] animate-pulse" />
              <span>{node.subsystem}</span>
            </div>
            <span className="text-[8px] px-1.5 py-0.5 bg-[#00F2FE]/10 border border-[#00F2FE]/30 text-[#00F2FE] tracking-widest font-semibold">
              {node.status}
            </span>
          </div>

          {/* Node Title & Floor */}
          <div className="mb-3">
            <h4 className="text-xs sm:text-sm font-semibold tracking-wide text-white uppercase">
              {node.name}
            </h4>
            <div className="text-[9px] text-[#8F99AE] tracking-widest mt-0.5">
              {node.floorLevel}
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-2 p-2 bg-black/50 border border-white/[0.04] mb-3">
            <div>
              <div className="text-[8px] text-[#8F99AE] tracking-wider">PRIMARY OUTPUT</div>
              <div className="text-xs sm:text-sm font-bold text-[#00F2FE] tracking-tight">
                {node.primaryMetric}
              </div>
            </div>
            <div>
              <div className="text-[8px] text-[#8F99AE] tracking-wider">EFFICIENCY</div>
              <div className="text-xs sm:text-sm font-bold text-white tracking-tight">
                {node.efficiency}
              </div>
            </div>
          </div>

          {/* Architectural role description */}
          <p className="text-[10px] text-[#8F99AE] leading-relaxed mb-3">
            {node.description}
          </p>

          {/* Card Footer Ticker */}
          <div className="flex items-center justify-between text-[8px] text-white/40 tracking-widest border-t border-white/[0.06] pt-2">
            <span>NODE ID: {node.id.toUpperCase()}-088</span>
            <button
              type="button"
              onClick={() => {
                if (onToggle) onToggle(node.id);
                else setInternalActive(false);
              }}
              className="text-[#00F2FE] hover:underline"
            >
              DISMISS [ESC]
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
