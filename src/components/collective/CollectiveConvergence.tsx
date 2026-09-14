"use client";

export function CollectiveConvergence() {
  return (
    <div
      className="surface-cinematic relative my-16 sm:my-24 p-8 sm:p-12 lg:p-16 bg-gradient-to-b from-[#0C0E13] to-[#050608] border border-[#252C3A] text-center overflow-hidden font-mono"
      data-surface="cinematic"
      aria-label="Resident Collective Convergence Climax"
    >
      {/* Background ambient radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,242,254,0.06)_0%,rgba(121,40,202,0.04)_50%,transparent_70%)] pointer-events-none" />

      {/* Top chapter tag */}
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/60 border border-[#00F2FE]/30 text-[9px] sm:text-[10px] tracking-[0.25em] text-[#00F2FE] uppercase mb-6">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE] animate-ping" />
        <span>06 {"//"} THE RESIDENT CONSTELLATION</span>
      </div>

      {/* Monumental Climax Headline */}
      <div className="max-w-4xl mx-auto mb-6">
        <h3 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.08] uppercase mb-4">
          EVERY NODE IS A PERSON<span className="text-[#00F2FE]">.</span><br />
          EVERY CONNECTION IS A POSSIBILITY<span className="text-[#00F2FE]">.</span>
        </h3>
        <p className="font-display text-lg sm:text-2xl text-[#00F2FE] uppercase tracking-wider font-semibold">
          THE HABITAT IS INTELLIGENT<span className="text-white">.</span> THE NETWORK IS HUMAN<span className="text-white">.</span>
        </p>
        <p className="font-body text-xs sm:text-sm text-[#8F99AE] mt-4 max-w-xl mx-auto font-light leading-relaxed">
          512 resident minds connected within one living architectural system. Knowledge, disciplines, and movement converging into collective civilization.
        </p>
      </div>

      {/* Collective Telemetry Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mt-8 pt-6 border-t border-white/[0.06] text-left">
        <div className="p-2.5 bg-black/40 border border-white/[0.04]">
          <div className="text-[8px] text-[#8F99AE] uppercase tracking-wider">RESIDENT NODES</div>
          <div className="text-sm sm:text-base font-bold text-[#00F2FE] mt-0.5">512 SYNCHRONIZED</div>
        </div>
        <div className="p-2.5 bg-black/40 border border-white/[0.04]">
          <div className="text-[8px] text-[#8F99AE] uppercase tracking-wider">RESEARCH DIVISIONS</div>
          <div className="text-sm sm:text-base font-bold text-white mt-0.5">12 ACTIVE MATRICES</div>
        </div>
        <div className="p-2.5 bg-black/40 border border-white/[0.04]">
          <div className="text-[8px] text-[#8F99AE] uppercase tracking-wider">ACTIVE SYNERGIES</div>
          <div className="text-sm sm:text-base font-bold text-[#00F2FE] mt-0.5">87 COLLABORATIONS</div>
        </div>
        <div className="p-2.5 bg-black/40 border border-white/[0.04]">
          <div className="text-[8px] text-[#8F99AE] uppercase tracking-wider">NETWORK TOPOLOGY</div>
          <div className="text-sm sm:text-base font-bold text-white mt-0.5">ZERO FRICTION</div>
        </div>
      </div>

      {/* Intentional Handoff to Phase 7 */}
      <div className="mt-10 pt-4 flex flex-col sm:flex-row items-center justify-between text-[9px] text-white/40 tracking-[0.2em] uppercase max-w-2xl mx-auto border-t border-white/[0.04]">
        <span>RESIDENT IDENTITIES VERIFIED</span>
        <span className="text-[#00F2FE]/80 mt-1 sm:mt-0 font-semibold">
          PREPARING ACCESS PROTOCOL {"//"} RESIDENT CREDENTIAL INGRESS READY
        </span>
      </div>

      {/* Corner Tech Brackets */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00F2FE]/50" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00F2FE]/50" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00F2FE]/50" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00F2FE]/50" />
    </div>
  );
}
