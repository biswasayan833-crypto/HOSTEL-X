"use client";

import { useRef, useEffect } from "react";
import { useReducedMotion } from "./useReducedMotion";
import { useIsTouchDevice } from "./useIsTouchDevice";

interface UseMagneticOptions {
  strength?: number; // 0 to 1, default 0.35
  maxDisplacement?: number; // pixels, default 10
}

export function useMagnetic<T extends HTMLElement>(options?: UseMagneticOptions) {
  const ref = useRef<T>(null);
  const isReduced = useReducedMotion();
  const isTouch = useIsTouchDevice();
  const strength = options?.strength ?? 0.35;
  const maxDist = options?.maxDisplacement ?? 10;

  useEffect(() => {
    const el = ref.current;
    if (!el || isReduced || isTouch) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      // Clamp displacement
      targetX = Math.max(-maxDist, Math.min(maxDist, deltaX));
      targetY = Math.max(-maxDist, Math.min(maxDist, deltaY));
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;

      el.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;

      animId = requestAnimationFrame(animate);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    animId = requestAnimationFrame(animate);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animId);
      el.style.transform = "";
    };
  }, [strength, maxDist, isReduced, isTouch]);

  return ref;
}
