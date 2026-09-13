"use client";

import { useEffect, useRef } from "react";
import { getGSAP, prefersReducedMotion } from "@/lib/gsap-core";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useScrollVelocity } from "@/hooks/useScrollVelocity";
import { revealMaskedText, revealTechnicalBadge } from "@/motion/typography";
import { MOTION_TIMING, MOTION_EASE } from "@/motion/motion-config";

interface HeroSectionProps {
  onEnterClick: () => void;
}

export function HeroSection({ onEnterClick }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLHeadingElement>(null);
  const titleLine2Ref = useRef<HTMLHeadingElement>(null);
  const headlineGroupRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  const { velocity, normalizedVelocity, direction } = useScrollVelocity();

  // 1. Entrance choreography
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const { gsap } = getGSAP();

    const ctx = gsap.context(() => {
      // Top technical badge reveal
      if (metaRef.current) {
        revealTechnicalBadge(metaRef.current, { delay: 0.1 });
      }

      // Monumental headline masked clip-path reveal
      if (titleLine1Ref.current && titleLine2Ref.current) {
        revealMaskedText([titleLine1Ref.current, titleLine2Ref.current], {
          delay: 0.25,
          stagger: 0.12,
          duration: MOTION_TIMING.cinematic,
          distance: 70,
        });
      }

      // Supporting manifesto and CTA staggered emergence
      gsap.fromTo(
        [subtitleRef.current, ctaRef.current, bottomBarRef.current],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: MOTION_TIMING.cinematic,
          stagger: 0.14,
          ease: MOTION_EASE.cinematicOut,
          delay: 0.55,
        }
      );

      // Multi-Planar Layered Parallax Scroll Scrubbing
      if (containerRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          },
        });

        // Layer 04: Headline moves upward at rate 0.22x
        if (headlineGroupRef.current) {
          tl.to(headlineGroupRef.current, { y: -110, ease: "none" }, 0);
        }

        // Layer 05: Manifesto moves upward at rate 0.14x
        if (subtitleRef.current) {
          tl.to(subtitleRef.current, { y: -60, ease: "none" }, 0);
        }

        // Layer 06: CTA moves upward at rate 0.10x
        if (ctaRef.current) {
          tl.to(ctaRef.current, { y: -35, ease: "none" }, 0);
        }

        // Layer 07: Telemetry HUD moves very subtly at rate 0.04x
        if (metaRef.current) {
          tl.to(metaRef.current, { y: -15, opacity: 0.4, ease: "none" }, 0);
        }
        if (bottomBarRef.current) {
          tl.to(bottomBarRef.current, { y: -10, opacity: 0.3, ease: "none" }, 0);
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // 2. Velocity-based subtle text micro-skew (maximum 1.5°)
  const skewY = prefersReducedMotion()
    ? 0
    : (-direction * normalizedVelocity * 1.2).toFixed(2);

  return (
    <section
      ref={containerRef}
      className="min-h-screen relative flex flex-col justify-between pt-28 sm:pt-36 pb-12 sm:pb-16 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pointer-events-none"
      aria-label="Hostel-X Hero Ingress"
    >
      {/* ──────────────────────────────────────────────────────────
          LAYER 07: TOP MARGIN TELEMETRY (Rate: 0.04x)
          ────────────────────────────────────────────────────────── */}
      <div
        ref={metaRef}
        className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-[#8F99AE] uppercase will-change-transform"
      >
        <div className="flex items-center gap-3">
          <span className="text-white/60">{"01 // INGRESS"}</span>
          <span className="text-[#252C3A]">/</span>
          <span className="text-[#00F2FE]">SECTOR 07</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-white/50">
          <span>{"HABITAT // 2088"}</span>
          <span className="text-[#252C3A]">/</span>
          <span className="text-white/90">SYSTEM ONLINE</span>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────
          LAYERS 04, 05, 06: HEADLINE, MANIFESTO, CTA
          ────────────────────────────────────────────────────────── */}
      <div className="my-auto py-12 sm:py-16 max-w-4xl">
        {/* Layer 04: Monumental Headline with Velocity Skew */}
        <div
          ref={headlineGroupRef}
          style={{
            transform: `skewY(${skewY}deg)`,
            transition: Math.abs(velocity) < 0.2 ? "transform 0.4s ease-out" : "none",
          }}
          className="will-change-transform"
        >
          <div className="overflow-hidden">
            <h1
              ref={titleLine1Ref}
              className="font-display text-[clamp(2.75rem,8vw,8.5rem)] font-bold tracking-[-0.04em] leading-[0.92] text-white select-none will-change-transform"
            >
              THE FUTURE OF
            </h1>
          </div>
          <div className="overflow-hidden mt-1 sm:mt-2">
            <h1
              ref={titleLine2Ref}
              className="font-display text-[clamp(2.75rem,8vw,8.5rem)] font-bold tracking-[-0.04em] leading-[0.92] text-white select-none will-change-transform"
            >
              HOSTEL LIVING<span className="text-[#00F2FE]">.</span>
            </h1>
          </div>
        </div>

        {/* Layer 05: Supporting Editorial Statement (Rate: 0.14x) */}
        <div
          ref={subtitleRef}
          className="mt-6 sm:mt-12 max-w-lg space-y-2 border-l-2 border-[#00F2FE] dark:border-[#252C3A] pl-4 sm:pl-6 bg-[#050608]/45 backdrop-blur-md py-3 px-4 sm:px-5 rounded-r-sm will-change-transform"
        >
          <p className="font-mono text-[11px] sm:text-xs tracking-[0.18em] text-[#8F99AE] uppercase leading-relaxed font-medium">
            AN AUTONOMOUS LIVING HABITAT
            <br />
            DESIGNED FOR THE NEXT GENERATION.
          </p>
          <p className="text-xs sm:text-sm text-[#8F99AE]/90 font-light leading-relaxed">
            Bio-architectural integration, robotic concierges, and frictionless community infrastructure converging in Sector 07.
          </p>
        </div>

        {/* Layer 06: Understated Primary CTA with Magnetic Physics */}
        <div ref={ctaRef} className="mt-8 sm:mt-12 pointer-events-auto will-change-transform">
          <MagneticButton
            onClick={onEnterClick}
            data-cursor="cta"
            className="group px-7 py-3.5 sm:px-8 sm:py-4 bg-[#0C0E13]/90 hover:bg-[#00F2FE]/10 border border-[#252C3A] hover:border-[#00F2FE] text-white transition-all duration-300 backdrop-blur-md"
          >
            <span className="font-mono text-xs sm:text-[13px] tracking-[0.2em] uppercase flex items-center gap-3">
              ENTER SECTOR 07
              <span className="text-sm sm:text-base text-[#00F2FE] transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </span>
          </MagneticButton>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────
          LAYER 07: BOTTOM TELEMETRY BAR & SCROLL HINT
          ────────────────────────────────────────────────────────── */}
      <div
        ref={bottomBarRef}
        className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 font-mono text-[10px] sm:text-[11px] tracking-[0.2em] text-[#8F99AE] uppercase pt-6 border-t border-white/[0.04] will-change-transform"
      >
        <div className="flex items-center gap-2 text-white/50 text-center sm:text-left">
          <span className="inline-block w-1.5 h-1.5 bg-[#00F2FE]" />
          <span>RESIDENTIAL POD MATRIX ACTIVE</span>
        </div>

        {/* Subtle Scroll Hint */}
        <div className="flex flex-col items-center gap-2 text-[9px] tracking-[0.25em] text-[#8F99AE]/70">
          <span>SCROLL TO EXPLORE</span>
          <div className="w-[1px] h-6 bg-gradient-to-b from-[#00F2FE] to-transparent animate-pulse" />
        </div>

        <div className="hidden sm:block text-white/50">
          {"ELEVATION // 340M"}
        </div>
      </div>
    </section>
  );
}
