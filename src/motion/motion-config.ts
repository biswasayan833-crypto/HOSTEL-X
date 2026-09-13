/**
 * HOSTEL-X — Motion Design Tokens & Configuration
 * Standardized timing, easing curves, velocity thresholds, and spatial parallax depths.
 */

export const MOTION_TIMING = {
  micro: 0.2, // Button hovers, small icon shifts, reticle snaps
  ui: 0.35, // Card state transitions, mode switchers, badge shifts
  cinematic: 0.9, // Typography reveals, stage crossfades, camera movements
  majorScene: 1.4, // Section transitions, deconstruction ingress, NOVA entrance
} as const;

export const MOTION_EASE = {
  // Smooth deceleration for cinematic entrances
  cinematicOut: "power3.out",
  // Sharp precision for technical readouts and HUD updates
  precisionOut: "expo.out",
  // Symmetrical ease for camera travels and section glides
  cinematicInOut: "power4.inOut",
  // Subtle organic elastic for magnetic button recovery
  elasticOut: "elastic.out(1, 0.4)",
  // Mechanical / linear for continuous loops and rotational drives
  linear: "none",
} as const;

export const VELOCITY_CONFIG = {
  // Damping factor for smooth settling
  damping: 0.12,
  // Maximum typography skew in degrees during rapid scrolling
  maxSkewDegrees: 1.5,
  // Maximum particle acceleration multiplier
  maxParticleSpeedMultiplier: 2.2,
  // Threshold to trigger high-velocity state
  highVelocityThreshold: 2.5,
} as const;

export const PARALLAX_DEPTHS = {
  background: 0.08, // Slowest layer: deep void, atmospheric grid
  citadelSilhouette: 0.35, // Procedural 3D Citadel macro structure
  architecturePlates: 0.65, // Cantilevered floor slabs and pylons
  headline: 0.22, // Monumental title typography
  manifesto: 0.14, // Secondary editorial copy
  cta: 0.1, // Action buttons
  hud: 0.04, // Edge telemetry / margin coordinates (almost fixed)
  particles: 1.25, // Fastest layer: volumetric dust motes
} as const;
