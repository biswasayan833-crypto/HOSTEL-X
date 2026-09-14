"use client";

import { useMemo } from "react";
import { NetworkConnection, ResidentNodeData } from "@/lib/resident-data";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ResidentNetworkProps {
  connections: NetworkConnection[];
  residents: ResidentNodeData[];
  selectedResidentId?: string;
  hoveredResidentId?: string;
}

export function ResidentNetwork({
  connections,
  residents,
  selectedResidentId,
  hoveredResidentId,
}: ResidentNetworkProps) {
  const isReduced = useReducedMotion();

  // Create a fast lookup map for residents by id
  const residentMap = useMemo(() => {
    const map = new Map<string, ResidentNodeData>();
    residents.forEach((r) => map.set(r.id, r));
    return map;
  }, [residents]);

  const activeFocusId = selectedResidentId || hoveredResidentId;

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden">
      <svg
        className="w-full h-full resident-network"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="connCyan" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00F2FE" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#7928CA" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="connDim" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#252C3A" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#252C3A" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {connections.map((conn) => {
          const source = residentMap.get(conn.sourceId);
          const target = residentMap.get(conn.targetId);
          if (!source || !target) return null;

          const isConnectedToActive =
            activeFocusId === conn.sourceId || activeFocusId === conn.targetId;
          const isDimmed = activeFocusId && !isConnectedToActive;

          // Quadratic bezier curve midpoint for organic architectural routing
          const midX = (source.xPercent + target.xPercent) / 2;
          const midY = (source.yPercent + target.yPercent) / 2 + (source.xPercent > target.xPercent ? 2 : -2);
          const pathD = `M ${source.xPercent} ${source.yPercent} Q ${midX} ${midY} ${target.xPercent} ${target.yPercent}`;

          return (
            <g key={conn.id} className="transition-opacity duration-300">
              {/* Main Vector Path */}
              <path
                d={pathD}
                fill="none"
                stroke={
                  isConnectedToActive
                    ? "url(#connCyan)"
                    : isDimmed
                    ? "url(#connDim)"
                    : "#252C3A"
                }
                strokeWidth={isConnectedToActive ? 0.35 : 0.15}
                strokeDasharray={
                  isReduced
                    ? "none"
                    : isConnectedToActive
                    ? "1 0.6"
                    : "0.8 0.8"
                }
                opacity={isDimmed ? 0.2 : isConnectedToActive ? 0.95 : 0.45}
              />

              {/* Traveling Information Particle on active or featured lines */}
              {!isReduced && isConnectedToActive && (
                <circle r="0.4" fill="#00F2FE" opacity="0.9">
                  <animateMotion
                    path={pathD}
                    dur="4s"
                    repeatCount="indefinite"
                    keyPoints="0;1"
                    keyTimes="0;1"
                  />
                </circle>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
