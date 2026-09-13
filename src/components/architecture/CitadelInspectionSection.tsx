"use client";

export function CitadelInspectionSection() {
  const specs = [
    {
      index: "01",
      title: "MONOLITHIC CARBON SPINE",
      desc: "Centralized structural core housing vertical mag-lev transport, high-capacity power distribution, and bio-atmospheric scrubbers.",
      metric: "340M VERTICAL",
    },
    {
      index: "02",
      title: "CANTILEVERED HABITAT PODS",
      desc: "512 independent living modules with sound-isolated composite shells, kinetic acoustic dampening, and circadian lighting systems.",
      metric: "512 UNITS",
    },
    {
      index: "03",
      title: "SUSPENDED SKY ATRIUMS",
      desc: "Interconnected multi-level social zones designed for cross-disciplinary collaboration, autonomous study, and kinetic relaxation.",
      metric: "LEVEL 24 // SKYBRIDGE",
    },
  ];

  return (
    <section
      id="citadel-preview"
      className="min-h-screen relative flex flex-col justify-between py-24 sm:py-32 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pointer-events-none"
      aria-label="Citadel Architectural Inspection"
    >
      {/* Chapter Marker */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-[#8F99AE] uppercase border-b border-white/[0.05] pb-4">
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <span className="text-[#00F2FE]">{"02 // ARCHITECTURE"}</span>
          <span className="text-[#252C3A]">/</span>
          <span className="text-white/60">SECTOR 07 STRUCTURAL MATRIX</span>
        </div>
        <div className="font-mono text-white/50 text-[10px]">
          SPECIFICATION V4.2
        </div>
      </div>

      {/* Section Title & Editorial Overview */}
      <div className="max-w-xl my-8 sm:my-12 pointer-events-auto bg-[#050608]/50 backdrop-blur-md border-l-2 border-[#00F2FE]/40 p-4 rounded-r-sm">
        <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-[#00F2FE] uppercase">
          STRUCTURAL OVERVIEW
        </span>
        <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mt-2 leading-[1.08]">
          ENGINEERED FOR THE ZERO-FRICTION MIND.
        </h2>
        <p className="font-body text-xs sm:text-sm text-[#8F99AE] mt-3 sm:mt-4 leading-relaxed font-light">
          Sector 07 redefines campus living. By blending brutalist architectural massing with cyber-physical robotics, the building functions as an autonomous living organism.
        </p>
      </div>

      {/* 3 Editorial Architecture Spec Cards (Hairline styling) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-auto pointer-events-auto">
        {specs.map((item) => (
          <div
            key={item.index}
            className="group relative p-6 bg-[#0C0E13]/70 backdrop-blur-md border border-[#252C3A]/70 hover:border-[#00F2FE]/50 transition-all duration-300"
            data-cursor="interactive"
          >
            <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-[#8F99AE]">
              <span className="text-[#00F2FE]">{`${item.index} //`}</span>
              <span className="text-white/40">{item.metric}</span>
            </div>

            <h3 className="font-display text-base sm:text-lg font-semibold text-white mt-4 tracking-tight group-hover:text-[#00F2FE] transition-colors duration-200">
              {item.title}
            </h3>

            <p className="font-body text-xs text-[#8F99AE] mt-2 leading-relaxed font-light">
              {item.desc}
            </p>

            {/* Subtle decorative bottom hairline highlight */}
            <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#00F2FE] transition-all duration-300 group-hover:w-full" />
          </div>
        ))}
      </div>
    </section>
  );
}
