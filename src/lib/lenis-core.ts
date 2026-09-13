import Lenis from "lenis";
import { getGSAP } from "./gsap-core";

let lenisInstance: Lenis | null = null;
let rafCallback: ((time: number) => void) | null = null;

export function initLenis(): Lenis | null {
  if (typeof window === "undefined") return null;
  if (lenisInstance) return lenisInstance;

  const { gsap, ScrollTrigger } = getGSAP();

  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
  });

  // Synchronize Lenis with GSAP ScrollTrigger and velocity listeners
  lenisInstance.on("scroll", (e: any) => {
    ScrollTrigger.update();
    const vel = e.velocity || 0;
    currentVelocity = vel;
    if (typeof window !== "undefined") {
      (window as any).__HOSTEL_VELOCITY__ = vel;
    }
    const norm = Math.min(Math.abs(vel) / 5, 1);
    const dir = e.direction || 0;
    velocityListeners.forEach((fn) => fn({ velocity: vel, normalizedVelocity: norm, direction: dir }));
  });

  rafCallback = (time: number) => {
    lenisInstance?.raf(time * 1000);
  };

  gsap.ticker.add(rafCallback);
  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
}

let currentVelocity = 0;
const velocityListeners = new Set<(data: { velocity: number; normalizedVelocity: number; direction: number }) => void>();

export function getScrollVelocity(): number {
  return currentVelocity;
}

export function subscribeScrollVelocity(
  fn: (data: { velocity: number; normalizedVelocity: number; direction: number }) => void
): () => void {
  velocityListeners.add(fn);
  return () => {
    velocityListeners.delete(fn);
  };
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function destroyLenis() {
  if (typeof window === "undefined") return;
  const { gsap } = getGSAP();

  if (rafCallback) {
    gsap.ticker.remove(rafCallback);
    rafCallback = null;
  }

  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
}
