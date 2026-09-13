"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToHero = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#050608]/85 backdrop-blur-md border-b border-[#252C3A]/60 py-3 sm:py-4"
          : "bg-transparent border-b border-white/[0.04] py-5 sm:py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand - Left */}
        <a
          href="#"
          onClick={scrollToHero}
          className="group flex items-center gap-3 text-white focus-visible:ring-1 focus-visible:ring-[#00F2FE]"
          aria-label="Hostel-X Home"
        >
          <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-[#00F2FE] transition-colors duration-200">
            HOSTEL<span className="text-[#00F2FE]">-</span>X
          </span>
          <span className="hidden md:inline-block font-mono text-[9px] tracking-[0.25em] text-[#8F99AE] uppercase pl-2 border-l border-[#252C3A]">
            HABITAT 2088
          </span>
        </a>

        {/* Telemetry Status, Theme Toggle & Understated CTA - Right */}
        <nav
          aria-label="Primary Navigation"
          className="flex items-center gap-3 sm:gap-6 font-mono text-[11px] tracking-[0.15em] text-[#8F99AE]"
        >
          {/* System metadata readouts (Desktop) */}
          <div className="hidden lg:flex items-center gap-6 text-[10px] tracking-[0.2em] text-[#8F99AE]/80 uppercase">
            <span className="hover:text-white transition-colors duration-200">SYSTEM 2088</span>
            <span className="text-[#252C3A]">•</span>
            <span className="hover:text-white transition-colors duration-200">SECTOR 07</span>
            <span className="text-[#252C3A]">•</span>
            <span className="flex items-center gap-1.5 text-white/90">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE] animate-pulse" />
              ONLINE
            </span>
          </div>

          {/* Architectural Theme Mode Switch */}
          <ThemeToggle />

          {/* Understated CTA */}
          <button
            onClick={() => scrollToSection("citadel-deconstruction")}
            className="group relative px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-[11px] font-mono tracking-[0.2em] text-white uppercase border border-[#252C3A] hover:border-[#00F2FE] bg-[#0C0E13]/60 hover:bg-[#00F2FE]/10 transition-all duration-300 cursor-pointer overflow-hidden"
            data-cursor="interactive"
          >
            <span className="relative z-10 flex items-center gap-2 group-hover:text-[#00F2FE] transition-colors duration-200">
              EXPLORE
              <span className="text-xs transition-transform duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
}
