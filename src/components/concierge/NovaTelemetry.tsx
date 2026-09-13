"use client";

export function NovaTelemetry({ className = "" }: { className?: string }) {
  return (
    <div
      className={`font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-[#8F99AE] flex flex-wrap items-center gap-x-6 gap-y-2 select-none ${className}`}
      aria-label="Nova Autonomous Concierge Telemetry"
    >
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE] animate-pulse" />
        <span className="text-white/80">NOVA CORE v8.4</span>
        <span className="text-[#252C3A]">/</span>
        <span className="text-[#00F2FE]">SYNAPSE ONLINE</span>
      </div>

      <div className="flex items-center gap-2 text-white/50">
        <span>LATENCY:</span>
        <span className="text-white font-semibold">0.8 MS</span>
      </div>

      <div className="flex items-center gap-2 text-white/50">
        <span>COGNITIVE LOAD:</span>
        <span className="text-[#00F2FE] font-semibold">14.2%</span>
      </div>

      <div className="flex items-center gap-2 text-white/50">
        <span>SECURITY LEVEL:</span>
        <span className="text-white font-semibold">ALPHA-07</span>
      </div>
    </div>
  );
}
