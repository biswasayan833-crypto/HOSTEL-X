"use client";

interface ArchitecturalHUDProps {
  visible: boolean;
  stageName?: string;
  isSector07Focused: boolean;
  className?: string;
}

export function ArchitecturalHUD({
  visible,
  isSector07Focused,
  className = "",
}: ArchitecturalHUDProps) {
  if (!visible) return null;

  return (
    <div
      className={`pointer-events-none transition-opacity duration-500 font-mono select-none ${
        visible ? "opacity-100" : "opacity-0"
      } ${className}`}
      aria-hidden="true"
    >
      {/* Top Right: Real-time Megastructure Vitals (Hidden on mobile to avoid overcrowding) */}
      <div className="hidden sm:flex absolute top-20 sm:top-24 right-4 sm:right-8 lg:right-12 flex-col items-end gap-1.5 text-[9px] sm:text-[10px] tracking-[0.2em] text-[#8F99AE] z-20">
        <div className="flex items-center gap-2">
          <span>STRUCTURAL INTEGRITY</span>
          <span className="text-white font-semibold">99.4%</span>
        </div>
        <div className="flex items-center gap-2">
          <span>POD DENSITY</span>
          <span className="text-[#00F2FE] font-semibold">87% (445/512)</span>
        </div>
        <div className="flex items-center gap-2">
          <span>ENERGY LOAD</span>
          <span className="text-white font-semibold">64.2 MW</span>
        </div>
        <div className="flex items-center gap-2">
          <span>AIR PURITY</span>
          <span className="text-[#00F2FE] font-semibold">98.8%</span>
        </div>
      </div>

      {/* Center-Right: Sector 07 Spatial Highlight Reticle (Desktop/Tablet only) */}
      <div
        className={`hidden md:block absolute top-1/2 right-8 lg:right-24 -translate-y-1/2 transition-all duration-700 ${
          isSector07Focused
            ? "opacity-100 translate-x-0"
            : "opacity-40 translate-x-4"
        }`}
      >
        <div className="relative p-4 sm:p-5 bg-[#0C0E13]/90 backdrop-blur-md border border-[#00F2FE]/50 max-w-xs shadow-[0_0_24px_rgba(0,242,254,0.15)]">
          {/* Corner Crosshairs */}
          <span className="absolute -top-1.5 -left-1.5 text-[10px] text-[#00F2FE] font-bold">+</span>
          <span className="absolute -top-1.5 -right-1.5 text-[10px] text-[#00F2FE] font-bold">+</span>
          <span className="absolute -bottom-1.5 -left-1.5 text-[10px] text-[#00F2FE] font-bold">+</span>
          <span className="absolute -bottom-1.5 -right-1.5 text-[10px] text-[#00F2FE] font-bold">+</span>

          {/* Telemetry Header */}
          <div className="flex items-center justify-between text-[9px] tracking-[0.25em] text-[#00F2FE] pb-2 border-b border-[#252C3A]">
            <span>SECTOR 07 FOCUS</span>
            <span className="animate-pulse">● LIVE</span>
          </div>

          <div className="mt-3 space-y-1">
            <h4 className="font-display text-sm sm:text-base font-bold text-white tracking-tight">
              RESIDENTIAL HABITAT
            </h4>
            <p className="text-[10px] text-[#8F99AE] tracking-[0.15em] uppercase">
              LEVEL 28 // LIVING POD MATRIX
            </p>
          </div>

          <div className="mt-3 pt-2 border-t border-[#252C3A]/60 flex items-center justify-between text-[8px] sm:text-[9px] text-white/50 tracking-widest">
            <span>ELEVATION: +240M</span>
            <span className="text-[#00F2FE]">PODS: SYNCED</span>
          </div>
        </div>
      </div>
    </div>
  );
}
