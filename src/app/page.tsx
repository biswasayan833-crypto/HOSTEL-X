"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useLenis } from "@/hooks/useLenis";
import { getGSAP } from "@/lib/gsap-core";
import { Preloader } from "@/components/ui/Preloader";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { BackgroundAmbience } from "@/components/ui/BackgroundAmbience";
import { Navigation } from "@/components/navigation/Navigation";
import { HeroSection } from "@/components/hero/HeroSection";
import { CitadelDeconstructionSection } from "@/components/architecture/CitadelDeconstructionSection";
import { ConciergeSection } from "@/components/concierge/ConciergeSection";
import { SmartLivingSection } from "@/components/smart-living/SmartLivingSection";
import { IntelligenceSection } from "@/components/intelligence/IntelligenceSection";
import { CollectiveSection } from "@/components/collective/CollectiveSection";
import { AccessPassSection } from "@/components/access/AccessPassSection";
import { CitadelInspectionSection } from "@/components/architecture/CitadelInspectionSection";
import { CinematicFinale } from "@/components/finale/CinematicFinale";
import { Footer } from "@/components/footer/Footer";
import { MotionProvider } from "@/motion/motion-context";
import { useTheme } from "@/context/ThemeContext";

// Dynamically import 3D Canvas with ssr disabled
const CitadelCanvas = dynamic(
  () => import("@/components/canvas/CitadelCanvas").then((m) => m.CitadelCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center font-mono text-[10px] text-[#8F99AE] tracking-[0.2em]">
        SYNCHRONIZING 3D SPATIAL ENGINE...
      </div>
    ),
  }
);

export default function Home() {
  // Initialize Lenis smooth scroll
  useLenis();

  const [scrollProgress, setScrollProgress] = useState(0);
  const [deconstructProgress, setDeconstructProgress] = useState(0);
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null);
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [inConciergeZone, setInConciergeZone] = useState(false);
  const [isFinale, setIsFinale] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isLight = theme === "light";

  useEffect(() => {
    const { ScrollTrigger } = getGSAP();

    if (!mainRef.current) return;

    // Create GSAP ScrollTrigger to scrub progress smoothly across page
    const pageTrigger = ScrollTrigger.create({
      trigger: mainRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      },
    });

    // Detect when user enters NOVA Concierge, Smart Living, Citadel Intelligence, or Resident Collective to darken background Citadel
    const conciergeEl = document.getElementById("concierge-nova");
    const smartLivingEl = document.getElementById("smart-living");
    const intelligenceEl = document.getElementById("citadel-intelligence");
    const collectiveEl = document.getElementById("resident-collective");
    const accessPassEl = document.getElementById("access-pass");
    const finaleEl = document.getElementById("cinematic-finale");

    let conciergeTrigger: any = null;
    let smartLivingTrigger: any = null;
    let intelligenceTrigger: any = null;
    let collectiveTrigger: any = null;
    let accessPassTrigger: any = null;
    let finaleTrigger: any = null;

    if (conciergeEl) {
      conciergeTrigger = ScrollTrigger.create({
        trigger: conciergeEl,
        start: "top 70%",
        end: "bottom 30%",
        onEnter: () => setInConciergeZone(true),
        onLeave: () => setInConciergeZone(false),
        onEnterBack: () => setInConciergeZone(true),
        onLeaveBack: () => setInConciergeZone(false),
      });
    }

    if (smartLivingEl) {
      smartLivingTrigger = ScrollTrigger.create({
        trigger: smartLivingEl,
        start: "top 70%",
        end: "bottom 30%",
        onEnter: () => setInConciergeZone(true),
        onLeave: () => setInConciergeZone(false),
        onEnterBack: () => setInConciergeZone(true),
        onLeaveBack: () => setInConciergeZone(false),
      });
    }

    if (intelligenceEl) {
      intelligenceTrigger = ScrollTrigger.create({
        trigger: intelligenceEl,
        start: "top 70%",
        end: "bottom 30%",
        onEnter: () => setInConciergeZone(true),
        onLeave: () => setInConciergeZone(false),
        onEnterBack: () => setInConciergeZone(true),
        onLeaveBack: () => setInConciergeZone(false),
      });
    }

    if (collectiveEl) {
      collectiveTrigger = ScrollTrigger.create({
        trigger: collectiveEl,
        start: "top 70%",
        end: "bottom 30%",
        onEnter: () => setInConciergeZone(true),
        onLeave: () => setInConciergeZone(false),
        onEnterBack: () => setInConciergeZone(true),
        onLeaveBack: () => setInConciergeZone(false),
      });
    }

    if (accessPassEl) {
      accessPassTrigger = ScrollTrigger.create({
        trigger: accessPassEl,
        start: "top 70%",
        end: "bottom 30%",
        onEnter: () => setInConciergeZone(true),
        onLeave: () => setInConciergeZone(false),
        onEnterBack: () => setInConciergeZone(true),
        onLeaveBack: () => setInConciergeZone(false),
      });
    }

    if (finaleEl) {
      finaleTrigger = ScrollTrigger.create({
        trigger: finaleEl,
        start: "top 65%",
        end: "bottom 15%",
        onEnter: () => {
          setIsFinale(true);
          setInConciergeZone(false);
        },
        onLeave: () => {
          // Keep awakened for footer view
        },
        onEnterBack: () => {
          setIsFinale(true);
          setInConciergeZone(false);
        },
        onLeaveBack: () => {
          setIsFinale(false);
        },
      });
    }

    return () => {
      pageTrigger.kill();
      if (conciergeTrigger) conciergeTrigger.kill();
      if (smartLivingTrigger) smartLivingTrigger.kill();
      if (intelligenceTrigger) intelligenceTrigger.kill();
      if (collectiveTrigger) collectiveTrigger.kill();
      if (accessPassTrigger) accessPassTrigger.kill();
      if (finaleTrigger) finaleTrigger.kill();
    };
  }, []);

  const handleEnterSector = () => {
    const target = document.getElementById("citadel-deconstruction");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isSector07Focused = selectedFloor === 28 || deconstructProgress > 0.75;

  return (
    <MotionProvider>
      {/* Cinematic Fast Preloader */}
      <Preloader onComplete={() => setPreloaderDone(true)} />

      {/* Subtle Desktop Custom Cursor */}
      <CustomCursor />

      {/* Main Experience Container */}
      <div
        ref={mainRef}
        className={`relative min-h-screen bg-[#050608] text-white selection:bg-[#00F2FE]/20 transition-opacity duration-700 ${
          preloaderDone ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Background Ambience & Hairline Rules */}
        <BackgroundAmbience />

        {/* Fixed Navigation Bar */}
        <Navigation />

        {/* Fixed 3D Citadel Background Viewport */}
        <div
          className={`fixed inset-0 z-0 pointer-events-auto transition-opacity duration-700 ease-out ${
            inConciergeZone
              ? isLight
                ? "opacity-[0.03] pointer-events-none"
                : "opacity-[0.08] pointer-events-none"
              : isLight
              ? isFinale
                ? "opacity-[0.75]"
                : "opacity-[0.4] sm:opacity-[0.5]"
              : "opacity-100"
          }`}
          aria-hidden="true"
        >
          <div className="w-full h-full relative">
            <CitadelCanvas
              scrollProgress={scrollProgress}
              deconstructProgress={deconstructProgress}
              selectedFloor={selectedFloor}
              sector07Focused={isSector07Focused}
              isFinale={isFinale}
            />
          </div>
        </div>

        {/* Foreground Content Flow */}
        <main className="relative z-10">
          <HeroSection onEnterClick={handleEnterSector} />
          <CitadelDeconstructionSection
            onDeconstructProgressChange={setDeconstructProgress}
            activeFloor={selectedFloor}
            onSelectFloor={setSelectedFloor}
          />
          <ConciergeSection />
          <SmartLivingSection />
          <IntelligenceSection />
          <CollectiveSection />
          <AccessPassSection />
          <CitadelInspectionSection />
          <CinematicFinale />
        </main>

        {/* Minimal Editorial Footer */}
        <Footer />
      </div>
    </MotionProvider>
  );
}
