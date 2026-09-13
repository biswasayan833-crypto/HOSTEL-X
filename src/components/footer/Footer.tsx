"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/gsap-core";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Footer() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toISOString().replace("T", " ").substring(0, 19) + " UTC"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({
        behavior: prefersReducedMotion() ? "instant" : "smooth",
      });
    }
  };

  const navColumns = [
    {
      title: "01 // ARCHITECTURE",
      links: [
        { label: "Ingress & Silhouette", id: "hero" },
        { label: "Sector 07 Deconstruction", id: "citadel-deconstruction" },
        { label: "Structural Specification", id: "citadel-preview" },
      ],
    },
    {
      title: "02 // AUTONOMOUS ECOSYSTEM",
      links: [
        { label: "NOVA Robotic Concierge", id: "concierge" },
        { label: "Smart Living Habitats", id: "smart-living" },
        { label: "Citadel Telemetry Twin", id: "citadel-intelligence" },
      ],
    },
    {
      title: "03 // RESIDENT NETWORK",
      links: [
        { label: "The Resident Collective", id: "resident-collective" },
        { label: "Holographic Access Pass", id: "access-pass" },
        { label: "Cinematic Finale", id: "cinematic-finale" },
      ],
    },
  ];

  const techCredits = [
    "Next.js 15 (App Router)",
    "Three.js // React Three Fiber",
    "GSAP // ScrollTrigger",
    "Tailwind CSS",
    "Lenis Smooth Scroll",
  ];

  return (
    <footer
      id="footer"
      role="contentinfo"
      className="border-t border-[#252C3A] bg-[#050608] pt-16 sm:pt-24 pb-12 relative z-30 font-mono"
      aria-label="Editorial Architectural Footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* ────────────────────────────────────────────────────────────
            TOP ROW: BRAND MANIFESTO & LIVE STATUS
            ──────────────────────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 pb-12 border-b border-white/[0.06]">
          <div className="max-w-md">
            <div className="flex items-center gap-3">
              <span className="font-display text-2xl font-bold tracking-tight text-white">
                HOSTEL<span className="text-[#00F2FE]">-</span>X
              </span>
              <span className="text-[#252C3A]">/</span>
              <span className="font-mono text-xs tracking-[0.25em] text-[#00F2FE] uppercase">
                2088
              </span>
            </div>

            <p className="font-body text-xs sm:text-sm text-[#8F99AE] mt-3 leading-relaxed font-light">
              An experimental, frontend-only digital experience for an autonomous campus habitat. Synthesizing brutalist architecture, cyber-physical robotics, and friction-free community living.
            </p>

            {/* External Links */}
            <div className="flex items-center gap-4 mt-6 text-xs text-white/80">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 hover:text-[#00F2FE] transition-colors"
                data-cursor="interactive"
                aria-label="Visit GitHub Profile"
              >
                <span>GITHUB</span>
                <span className="text-[#00F2FE] group-hover:translate-x-0.5 transition-transform">↗</span>
              </a>
              <span className="text-[#252C3A]">•</span>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 hover:text-[#00F2FE] transition-colors"
                data-cursor="interactive"
                aria-label="Visit LinkedIn Profile"
              >
                <span>LINKEDIN</span>
                <span className="text-[#00F2FE] group-hover:translate-x-0.5 transition-transform">↗</span>
              </a>
            </div>
          </div>

          {/* System Telemetry Badges + Footer Theme Toggle */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 bg-[#0C0E13] p-4 sm:p-5 border border-[#252C3A] rounded-sm">
            <div className="space-y-1">
              <div className="text-[8px] text-[#8F99AE] uppercase tracking-wider">SYSTEM STATUS</div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#00F2FE]">
                <span className="w-2 h-2 rounded-full bg-[#00F2FE] animate-pulse" />
                ONLINE // 512 NODES ACTIVE
              </div>
            </div>

            <div className="hidden sm:block w-[1px] h-8 bg-white/10" />

            <div className="space-y-1">
              <div className="text-[8px] text-[#8F99AE] uppercase tracking-wider">TELEMETRY TIME</div>
              <div className="text-xs font-semibold text-white/90">
                {time || "SYNCHRONIZING..."}
              </div>
            </div>

            <div className="hidden sm:block w-[1px] h-8 bg-white/10" />

            <div className="space-y-1">
              <div className="text-[8px] text-[#8F99AE] uppercase tracking-wider">HABITAT LOCATION</div>
              <div className="text-xs text-white/70">
                LAT 12.9716° N / LON 77.5946° E
              </div>
            </div>

            <div className="hidden sm:block w-[1px] h-8 bg-white/10" />

            {/* Theme Toggle in Footer */}
            <div className="space-y-1">
              <div className="text-[8px] text-[#8F99AE] uppercase tracking-wider">ILLUMINATION</div>
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* ────────────────────────────────────────────────────────────
            MIDDLE ROW: 3 ARCHITECTURAL NAVIGATION COLUMNS & TECH CREDITS
            ──────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12 border-b border-white/[0.06]">
          {navColumns.map((col, idx) => (
            <div key={idx} className="space-y-4">
              <h3 className="text-[10px] text-[#00F2FE] tracking-[0.25em] uppercase font-semibold">
                {col.title}
              </h3>
              <ul className="space-y-2.5 text-xs text-[#8F99AE]">
                {col.links.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="hover:text-white transition-colors cursor-pointer text-left block"
                      data-cursor="interactive"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Technology Credits Column */}
          <div className="space-y-4">
            <h3 className="text-[10px] text-[#00F2FE] tracking-[0.25em] uppercase font-semibold">
              04 // TECHNOLOGY CREDITS
            </h3>
            <ul className="space-y-2 text-[11px] text-white/70">
              {techCredits.map((tech, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-[#252C3A]">›</span>
                  <span>{tech}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ────────────────────────────────────────────────────────────
            ARCHITECTURAL CREATOR SIGNATURE BLOCK
            ──────────────────────────────────────────────────────────── */}
        <div className="py-8 border-b border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-sm border border-[#252C3A] bg-[#0C0E13] flex items-center justify-center font-display text-sm font-bold text-[#00F2FE] tracking-tight">
              AB
            </div>
            <div className="space-y-0.5">
              <div className="text-[8px] sm:text-[9px] tracking-[0.25em] text-[#8F99AE] uppercase font-mono">
                DESIGNED & DEVELOPED BY
              </div>
              <div className="flex items-center gap-2.5">
                <span className="font-display text-sm sm:text-base font-bold tracking-tight text-white">
                  AYAN BISWAS
                </span>
                <span className="text-[#252C3A] font-mono text-xs">•</span>
                <span className="font-mono text-[10px] sm:text-xs text-[#00F2FE] tracking-[0.2em] font-semibold">
                  B.E. CSE
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[9px] sm:text-[10px] font-mono tracking-[0.22em] text-[#8F99AE] uppercase">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00F2FE] animate-pulse" />
            <span className="text-white/80">CREATIVE ENGINEERING & ARCHITECTURE 2088</span>
          </div>
        </div>

        {/* ────────────────────────────────────────────────────────────
            BOTTOM ROW: COPYRIGHT & PRODUCTION RUNTIME
            ──────────────────────────────────────────────────────────── */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[9px] sm:text-[10px] text-white/40 tracking-[0.18em] uppercase">
          <div>
            © 2088 HOSTEL-X HABITAT INITIATIVE. CRAFTED AS AN EXPERIMENTAL ARCHITECTURAL EXPERIENCE.
          </div>
          <div className="flex items-center gap-3">
            <span>SECTOR 07</span>
            <span className="text-[#252C3A]">•</span>
            <span className="text-[#00F2FE]">ALL 8 PHASES COMPLETE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
