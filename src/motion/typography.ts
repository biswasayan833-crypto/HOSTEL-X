import { getGSAP, prefersReducedMotion } from "@/lib/gsap-core";
import { MOTION_TIMING, MOTION_EASE } from "./motion-config";

/**
 * Creates a cinematic masked clip-path typography reveal on elements.
 * Words or lines slide up from an invisible clipping mask with subtle tracking expansion.
 */
export function revealMaskedText(
  targets: HTMLElement | HTMLElement[] | string,
  options?: {
    delay?: number;
    stagger?: number;
    duration?: number;
    distance?: number;
  }
) {
  if (prefersReducedMotion()) return;

  const { gsap } = getGSAP();
  const duration = options?.duration ?? MOTION_TIMING.cinematic;
  const stagger = options?.stagger ?? 0.04;
  const delay = options?.delay ?? 0;
  const distance = options?.distance ?? 40;

  return gsap.fromTo(
    targets,
    {
      y: distance,
      opacity: 0,
      clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 0%)",
    },
    {
      y: 0,
      opacity: 1,
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      duration,
      stagger,
      delay,
      ease: MOTION_EASE.cinematicOut,
    }
  );
}

/**
 * Sharp, technical badge reveal for chapter numbers and telemetry markers.
 * Expands horizontally from a hairline rule.
 */
export function revealTechnicalBadge(
  target: HTMLElement | string,
  options?: { delay?: number }
) {
  if (prefersReducedMotion()) return;

  const { gsap } = getGSAP();
  const delay = options?.delay ?? 0;

  return gsap.fromTo(
    target,
    {
      opacity: 0,
      x: -12,
      letterSpacing: "0.4em",
    },
    {
      opacity: 1,
      x: 0,
      letterSpacing: "0.25em",
      duration: MOTION_TIMING.ui,
      delay,
      ease: MOTION_EASE.precisionOut,
    }
  );
}
