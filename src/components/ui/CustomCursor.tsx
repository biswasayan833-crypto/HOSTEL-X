"use client";

import { useEffect, useRef, useState } from "react";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";

export type CursorState = "default" | "interactive" | "3d" | "nova" | "cta" | "inspect" | "resident" | "pass";

export function CustomCursor() {
  const isTouch = useIsTouchDevice();
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = useState<CursorState>("default");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isTouch) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Inspect target element for cursor mode
      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (target.closest("[data-cursor='pass']")) {
        setCursorState("pass");
      } else if (target.closest("[data-cursor='resident']")) {
        setCursorState("resident");
      } else if (target.closest("[data-cursor='inspect']")) {
        setCursorState("inspect");
      } else if (target.closest("[data-cursor='nova']")) {
        setCursorState("nova");
      } else if (target.closest("[data-cursor='cta']")) {
        setCursorState("cta");
      } else if (target.closest("[data-cursor='3d']")) {
        setCursorState("3d");
      } else if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[data-cursor='interactive']")
      ) {
        setCursorState("interactive");
      } else {
        setCursorState("default");
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    const render = () => {
      // Smooth lerp for outer ring
      ringX += (mouseX - ringX) * 0.2;
      ringY += (mouseY - ringY) * 0.2;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      animFrameId = requestAnimationFrame(render);
    };

    animFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(animFrameId);
    };
  }, [isTouch, isVisible]);

  if (isTouch) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* Center sharp micro-dot */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 -ml-[3px] -mt-[3px] w-[6px] h-[6px] rounded-full will-change-transform transition-colors duration-200 ${
          cursorState === "nova"
            ? "bg-[#A855F7] shadow-[0_0_10px_rgba(168,85,247,0.9)]"
            : cursorState === "cta"
            ? "bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)] scale-125"
            : "bg-[#00F2FE] shadow-[0_0_8px_rgba(0,242,254,0.8)]"
        }`}
      />

      {/* Lagging outer contextual ring / reticle */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border transition-all duration-300 ease-out will-change-transform flex items-center justify-center ${
          cursorState === "default"
            ? "-ml-3 -mt-3 w-6 h-6 border-white/20"
            : cursorState === "interactive"
            ? "-ml-5 -mt-5 w-10 h-10 border-[#00F2FE]/50 bg-[#00F2FE]/5"
            : cursorState === "cta"
            ? "-ml-6 -mt-6 w-12 h-12 border-white/60 bg-white/5 scale-105"
            : cursorState === "pass"
            ? "-ml-7 -mt-7 w-14 h-14 border-[#00F2FE]/90 border-dashed animate-[spin_4s_linear_infinite] bg-[#7928CA]/15"
            : cursorState === "resident"
            ? "-ml-7 -mt-7 w-14 h-14 border-[#00F2FE]/90 border-dashed animate-[spin_5s_linear_infinite] bg-[#00F2FE]/10"
            : cursorState === "inspect"
            ? "-ml-7 -mt-7 w-14 h-14 border-[#00F2FE]/80 border-dashed animate-[spin_6s_linear_infinite] bg-[#00F2FE]/5"
            : cursorState === "nova"
            ? "-ml-7 -mt-7 w-14 h-14 border-[#A855F7]/60 border-dashed animate-[spin_8s_linear_infinite]"
            : "-ml-6 -mt-6 w-12 h-12 border-[#00F2FE]/60 border-dashed bg-transparent animate-[spin_12s_linear_infinite]"
        }`}
      >
        {cursorState === "3d" && (
          <span className="font-mono text-[7px] text-[#00F2FE] tracking-tighter opacity-80 uppercase">
            3D
          </span>
        )}
        {cursorState === "pass" && (
          <span className="font-mono text-[6px] text-[#00F2FE] tracking-widest uppercase font-bold">
            AUTH
          </span>
        )}
        {cursorState === "resident" && (
          <span className="font-mono text-[6px] text-[#00F2FE] tracking-widest uppercase font-bold">
            NODE
          </span>
        )}
        {cursorState === "inspect" && (
          <span className="font-mono text-[6px] text-[#00F2FE] tracking-widest uppercase font-bold">
            SCAN
          </span>
        )}
        {cursorState === "nova" && (
          <span className="font-mono text-[6px] text-[#A855F7] tracking-widest uppercase font-bold">
            NOVA
          </span>
        )}
        {cursorState === "cta" && (
          <span className="font-mono text-[6px] text-white tracking-widest uppercase">
            LOCK
          </span>
        )}
      </div>
    </div>
  );
}
