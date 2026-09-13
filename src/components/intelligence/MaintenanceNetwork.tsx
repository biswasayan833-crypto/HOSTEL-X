"use client";

import { MAINTENANCE_DATA } from "@/lib/intelligence-data";
import { MetricCounter } from "./MetricCounter";

export function MaintenanceNetwork() {
  const { totalDrones, breakdown, activeRoute, drones } = MAINTENANCE_DATA;

  return (
    <div
      className="bg-[#0C0E13]/90 border border-[#252C3A]/80 p-5 sm:p-6 font-mono backdrop-blur-md relative overflow-hidden"
      aria-label="Autonomous Maintenance Network Telemetry"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-[9px] tracking-[0.25em] text-[#00F2FE] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE] animate-pulse" />
            <span>SUB-TIER 04 {"//"} AUTONOMOUS ROBOTICS</span>
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white mt-1 uppercase">
            MAINTENANCE <span className="text-[#00F2FE]">{"//"}</span> AUTONOMOUS FLEET
          </h3>
        </div>

        <div className="flex items-center gap-2 text-[9px] tracking-widest text-[#8F99AE] bg-black/40 px-3 py-1.5 border border-white/[0.06] self-start sm:self-auto">
          <span>FLEET READINESS:</span>
          <span className="text-[#00F2FE] font-bold">100% OPERATIONAL</span>
        </div>
      </div>

      {/* Primary Drone Fleet Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        <div className="p-3 bg-black/40 border border-white/[0.05] col-span-2 sm:col-span-1">
          <div className="text-[8px] sm:text-[9px] text-[#8F99AE] tracking-widest uppercase">
            ACTIVE DRONES
          </div>
          <div className="text-xl sm:text-2xl font-bold text-[#00F2FE] mt-0.5">
            <MetricCounter value={totalDrones} decimals={0} />
          </div>
          <div className="text-[8px] text-white/40 mt-1 tracking-wider">TOTAL IN DEPLOYMENT</div>
        </div>

        <div className="p-3 bg-black/40 border border-white/[0.05]">
          <div className="text-[8px] sm:text-[9px] text-[#8F99AE] tracking-widest uppercase">
            INSPECTION
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white mt-0.5">
            0<MetricCounter value={breakdown.inspection} decimals={0} />
          </div>
          <div className="text-[8px] text-[#00F2FE] mt-1 tracking-wider">OPTICAL SCANNING</div>
        </div>

        <div className="p-3 bg-black/40 border border-white/[0.05]">
          <div className="text-[8px] sm:text-[9px] text-[#8F99AE] tracking-widest uppercase">
            REPAIR
          </div>
          <div className="text-xl sm:text-2xl font-bold text-[#00F2FE] mt-0.5">
            0<MetricCounter value={breakdown.repair} decimals={0} />
          </div>
          <div className="text-[8px] text-white/40 mt-1 tracking-wider">STRUCTURAL WELDING</div>
        </div>

        <div className="p-3 bg-black/40 border border-white/[0.05]">
          <div className="text-[8px] sm:text-[9px] text-[#8F99AE] tracking-widest uppercase">
            CLEANING
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white mt-0.5">
            0<MetricCounter value={breakdown.cleaning} decimals={0} />
          </div>
          <div className="text-[8px] text-white/40 mt-1 tracking-wider">FACADE SANITIZE</div>
        </div>

        <div className="p-3 bg-black/40 border border-white/[0.05]">
          <div className="text-[8px] sm:text-[9px] text-[#8F99AE] tracking-widest uppercase">
            EMERGENCY
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white mt-0.5">
            0<MetricCounter value={breakdown.emergency} decimals={0} />
          </div>
          <div className="text-[8px] text-white/40 mt-1 tracking-wider">RAPID RESPONSE</div>
        </div>
      </div>

      {/* Signature Active Route Card toward Sector 07 Level 28 */}
      <div className="bg-black/60 border border-[#00F2FE]/40 p-4 sm:p-5 mb-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-white/[0.06] pb-3 mb-3">
          <div className="flex items-center gap-2 text-[10px] tracking-widest text-[#00F2FE] uppercase">
            <span className="w-2 h-2 rounded-full bg-[#00F2FE] animate-ping" />
            <span className="font-bold">PRIORITY DISPATCH ROUTE // IN FLIGHT</span>
          </div>
          <div className="text-[9px] text-[#8F99AE] tracking-widest">
            TARGET: <span className="text-white font-semibold">{activeRoute.destinationSector}</span> •{" "}
            <span className="text-[#00F2FE] font-semibold">{activeRoute.destinationLevel}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[10px]">
          <div>
            <div className="text-[#8F99AE] text-[8px] uppercase tracking-wider">UNIT ASSIGNED</div>
            <div className="text-white font-bold tracking-wide mt-0.5">{activeRoute.assignedDrone}</div>
            <div className="text-[8px] text-white/40 mt-0.5">{activeRoute.origin}</div>
          </div>
          <div>
            <div className="text-[#8F99AE] text-[8px] uppercase tracking-wider">MISSION PROFILE</div>
            <div className="text-[#00F2FE] font-semibold tracking-wide mt-0.5">{activeRoute.mission}</div>
            <div className="text-[8px] text-white/40 mt-0.5">{activeRoute.integrityStatus}</div>
          </div>
          <div>
            <div className="text-[#8F99AE] text-[8px] uppercase tracking-wider">ESTIMATED ARRIVAL</div>
            <div className="text-xl font-bold text-white tracking-tight mt-0.5">
              {activeRoute.etaSeconds}s <span className="text-[9px] font-normal text-[#8F99AE]">REMAINING</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sample Fleet Status Grid (8 Selected Drones) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {drones.slice(0, 8).map((drone) => (
          <div
            key={drone.id}
            className="p-2 bg-black/40 border border-white/[0.04] text-[9px] flex flex-col justify-between hover:border-[#00F2FE]/30 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-white">{drone.id}</span>
              <span
                className={`text-[8px] uppercase font-semibold ${
                  drone.status === "en_route"
                    ? "text-[#00F2FE]"
                    : drone.status === "operating"
                    ? "text-white"
                    : "text-[#8F99AE]"
                }`}
              >
                {drone.status.replace("_", " ")}
              </span>
            </div>
            <div className="text-[#8F99AE] text-[8px] mt-1">
              {drone.targetSector} • {drone.targetLevel}
            </div>
            <div className="flex items-center justify-between text-[8px] mt-1.5 pt-1 border-t border-white/[0.04]">
              <span className="text-white/40">{drone.type.toUpperCase()}</span>
              <span className="text-[#00F2FE]">{drone.battery}% PWR</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
