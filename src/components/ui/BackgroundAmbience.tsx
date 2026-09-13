"use client";

export function BackgroundAmbience() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Deep atmospheric radial glow */}
      <div className="absolute top-1/4 right-1/4 w-[650px] h-[650px] bg-[#00F2FE]/[0.025] rounded-full blur-[140px]" />
      <div className="absolute bottom-1/3 left-1/5 w-[500px] h-[500px] bg-[#7928CA]/[0.02] rounded-full blur-[160px]" />

      {/* Subtle technical hairline grid rules */}
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-8 lg:px-12 relative">
        <div className="absolute top-0 bottom-0 left-4 sm:left-8 lg:left-12 w-[1px] bg-white/[0.025]" />
        <div className="absolute top-0 bottom-0 right-4 sm:right-8 lg:right-12 w-[1px] bg-white/[0.025]" />
      </div>

      {/* Architectural Crosshair Coordinates */}
      <div className="absolute top-28 left-6 sm:left-12 font-mono text-[9px] text-white/10 select-none hidden sm:block">
        {"+ 00 // 88"}
      </div>
      <div className="absolute top-28 right-6 sm:right-12 font-mono text-[9px] text-white/10 select-none hidden sm:block">
        {"SEC_07 // +"}
      </div>
      <div className="absolute bottom-12 left-6 sm:left-12 font-mono text-[9px] text-white/10 select-none hidden sm:block">
        + CITADEL_CORE
      </div>
    </div>
  );
}
