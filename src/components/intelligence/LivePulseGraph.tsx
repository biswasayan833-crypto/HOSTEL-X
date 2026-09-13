"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface LivePulseGraphProps {
  label?: string;
  unit?: string;
  currentVal?: number | string;
  minVal?: number | string;
  maxVal?: number | string;
  color?: string; // hex accent
  points?: number[];
  height?: number;
  showScanline?: boolean;
}

export function LivePulseGraph({
  label = "SYSTEM FREQUENCY",
  unit = "HZ",
  currentVal = "99.4",
  minVal = "98.2",
  maxVal = "99.8",
  color = "#00F2FE",
  points = [98.5, 98.8, 99.1, 99.0, 99.4, 99.2, 99.5, 99.3, 99.4, 99.6, 99.4],
  height = 90,
  showScanline = true,
}: LivePulseGraphProps) {
  const isReduced = useReducedMotion();
  const [phase, setPhase] = useState(0);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    if (isReduced) return;

    const startTime = performance.now();
    const loop = (now: number) => {
      const elapsed = (now - startTime) * 0.002;
      setPhase(elapsed);
      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isReduced]);

  // Generate smooth SVG polyline coordinates based on input points + subtle dynamic wave
  const width = 360;
  const numPoints = points.length;
  const stepX = width / (numPoints - 1);

  const coords = points.map((val, idx) => {
    const x = idx * stepX;
    // Base normal within [0, 1] mapped to [minVal, maxVal]
    const baseOffset = isReduced ? 0 : Math.sin(phase * 2 + idx * 0.8) * 3;
    // Map val roughly around 98-100 to y
    const normalized = (val - 98) / 2; // [0, 1]
    const y = Math.max(10, Math.min(height - 10, height - (normalized * (height - 24) + 12) + baseOffset));
    return { x, y };
  });

  const pathD = coords.reduce(
    (acc, curr, i) => (i === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`),
    ""
  );

  const areaD = `${pathD} L ${width} ${height} L 0 ${height} Z`;

  return (
    <div className="w-full bg-[#0C0E13]/80 border border-[#252C3A]/60 p-3 sm:p-4 font-mono relative overflow-hidden backdrop-blur-sm">
      {/* Top Header info */}
      <div className="flex items-center justify-between text-[9px] tracking-[0.2em] text-[#8F99AE] uppercase mb-2 border-b border-white/[0.04] pb-1.5">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
          <span>{label}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white font-semibold">
            {currentVal}
            <span className="text-[#8F99AE] text-[8px] ml-0.5">{unit}</span>
          </span>
          <span className="text-[8px] text-[#00F2FE]/70 tracking-widest px-1 py-0.5 bg-[#00F2FE]/10 border border-[#00F2FE]/20">
            LIVE
          </span>
        </div>
      </div>

      {/* SVG Waveform Visualizer */}
      <div className="relative w-full" style={{ height: `${height}px` }}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
          className="w-full h-full overflow-visible"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={`gradient-${label.replace(/\s+/g, "")}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.25" />
              <stop offset="100%" stopColor={color} stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="scanlineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={color} stopOpacity="0" />
              <stop offset="50%" stopColor={color} stopOpacity="0.8" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Scientific Grid lines */}
          <line x1="0" y1={height * 0.25} x2={width} y2={height * 0.25} stroke="#252C3A" strokeWidth="0.5" strokeDasharray="3 3" />
          <line x1="0" y1={height * 0.5} x2={width} y2={height * 0.5} stroke="#252C3A" strokeWidth="0.5" strokeDasharray="3 3" />
          <line x1="0" y1={height * 0.75} x2={width} y2={height * 0.75} stroke="#252C3A" strokeWidth="0.5" strokeDasharray="3 3" />

          {/* Area under curve */}
          <path d={areaD} fill={`url(#gradient-${label.replace(/\s+/g, "")})`} />

          {/* Primary Stroke */}
          <path d={pathD} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />

          {/* Current tip pulse */}
          {coords.length > 0 && (
            <g>
              <circle
                cx={coords[coords.length - 1].x}
                cy={coords[coords.length - 1].y}
                r="3"
                fill={color}
              />
              {!isReduced && (
                <circle
                  cx={coords[coords.length - 1].x}
                  cy={coords[coords.length - 1].y}
                  r="6"
                  fill="none"
                  stroke={color}
                  strokeWidth="0.8"
                  className="animate-ping opacity-60"
                />
              )}
            </g>
          )}

          {/* Scanning vertical sweep line */}
          {showScanline && !isReduced && (
            <line
              x1={(phase * 80) % width}
              y1="0"
              x2={(phase * 80) % width}
              y2={height}
              stroke="url(#scanlineGrad)"
              strokeWidth="1.5"
              opacity="0.6"
            />
          )}
        </svg>

        {/* Min/Max indicators */}
        <div className="absolute left-1 top-1 text-[7px] text-[#8F99AE]/50 tracking-tighter">
          MAX: {maxVal}
        </div>
        <div className="absolute left-1 bottom-1 text-[7px] text-[#8F99AE]/50 tracking-tighter">
          MIN: {minVal}
        </div>
      </div>

      {/* Ticker footer */}
      <div className="flex items-center justify-between text-[8px] text-[#8F99AE]/70 tracking-widest mt-2 pt-1 border-t border-white/[0.04]">
        <span>CALIBRATION // NOMINAL</span>
        <span>RESOLUTION // 0.01%</span>
      </div>
    </div>
  );
}
