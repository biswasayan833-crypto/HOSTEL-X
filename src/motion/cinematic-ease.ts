/**
 * Mathematical easing, interpolation, and smooth damping helpers.
 * Used across 3D Three.js useFrame loops, Canvas rendering, and UI physics.
 */

/**
 * Standard linear interpolation (lerp).
 */
export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

/**
 * Frame-rate independent exponential damping.
 * Smoothly approaches target regardless of monitor refresh rate (60Hz vs 120Hz).
 */
export function damp(
  current: number,
  target: number,
  smoothing: number,
  delta: number
): number {
  return lerp(current, target, 1 - Math.exp(-smoothing * delta));
}

/**
 * Clamps a number between min and max bounds.
 */
export function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

/**
 * Maps a number from an input range to an output range with optional clamping.
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
  clampOutput = true
): number {
  const normalized = (value - inMin) / (inMax - inMin);
  const mapped = outMin + normalized * (outMax - outMin);
  if (!clampOutput) return mapped;
  const actualMin = Math.min(outMin, outMax);
  const actualMax = Math.max(outMin, outMax);
  return clamp(mapped, actualMin, actualMax);
}
