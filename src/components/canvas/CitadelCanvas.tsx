"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { CitadelModel } from "./CitadelModel";
import { ParticleAtmosphere } from "./ParticleAtmosphere";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";
import { useTheme } from "@/context/ThemeContext";

export interface CitadelCanvasProps {
  scrollProgress: number;
  deconstructProgress?: number;
  selectedFloor?: number | null;
  sector07Focused?: boolean;
  isFinale?: boolean;
}

// Floor elevation coordinate map
const FLOOR_Y_MAP: Record<number, number> = {
  1: -3.8,
  14: -1.4,
  28: 0.8,
  42: 3.2,
};

function CameraRig({
  scrollProgress,
  deconstructProgress = 0,
  selectedFloor = null,
  sector07Focused = false,
  isFinale = false,
}: {
  scrollProgress: number;
  deconstructProgress?: number;
  selectedFloor?: number | null;
  sector07Focused?: boolean;
  isFinale?: boolean;
}) {
  const isReduced = useReducedMotion();

  useFrame((state) => {
    if (isReduced) return;

    const isPortrait = state.viewport.aspect < 1;

    // 1. Calculate Base Camera Positions
    // Wide silhouette -> Medium Hero Ingress -> Close Architectural Deconstruction
    let targetX: number;
    let targetY: number;
    let targetZ: number;
    let lookAtY: number;

    if (isFinale) {
      // Stage: Grand Cinematic Finale — Megastructure Awakened Pullback
      targetX = isPortrait ? 0 : 0.1;
      targetY = isPortrait ? 1.8 : 1.4;
      targetZ = isPortrait ? 17.5 : 15.4;
      lookAtY = 0.5;
    } else if (deconstructProgress > 0) {
      // Stage: Pinned Architectural Deconstruction
      const deconstructFactor = THREE.MathUtils.clamp(deconstructProgress, 0, 1);
      targetX = isPortrait ? 0 : THREE.MathUtils.lerp(0.2, -0.15, deconstructFactor);
      targetY = isPortrait
        ? THREE.MathUtils.lerp(0.4, 1.2, deconstructFactor)
        : THREE.MathUtils.lerp(0.8, 1.8, deconstructFactor);
      targetZ = isPortrait
        ? THREE.MathUtils.lerp(10.5, 8.2, deconstructFactor)
        : THREE.MathUtils.lerp(8.5, 6.2, deconstructFactor);
      lookAtY = THREE.MathUtils.lerp(0.2, 0.9, deconstructFactor);
    } else {
      // Stage: Hero to Ingress — 4-Phase Cinematic Sequence
      // 0 -> 25%: Push toward Citadel
      // 25 -> 50%: Lateral orbit
      // 50 -> 75%: Approach architectural layers
      // 75 -> 100%: Align toward deconstruction
      const p = THREE.MathUtils.clamp(scrollProgress * 2.8, 0, 1);

      if (p < 0.25) {
        const subP = p / 0.25;
        targetX = isPortrait ? 0 : THREE.MathUtils.lerp(0.9, 0.6, subP);
        targetY = isPortrait ? 0.6 : THREE.MathUtils.lerp(1.3, 1.0, subP);
        targetZ = isPortrait
          ? THREE.MathUtils.lerp(13.5, 11.2, subP)
          : THREE.MathUtils.lerp(11.2, 9.4, subP);
        lookAtY = 0.2;
      } else if (p < 0.5) {
        const subP = (p - 0.25) / 0.25;
        targetX = isPortrait ? 0 : THREE.MathUtils.lerp(0.6, 0.1, subP);
        targetY = isPortrait ? 0.8 : THREE.MathUtils.lerp(1.0, 0.8, subP);
        targetZ = isPortrait
          ? THREE.MathUtils.lerp(11.2, 9.8, subP)
          : THREE.MathUtils.lerp(9.4, 8.5, subP);
        lookAtY = 0.3;
      } else if (p < 0.75) {
        const subP = (p - 0.5) / 0.25;
        targetX = isPortrait ? 0 : THREE.MathUtils.lerp(0.1, -0.2, subP);
        targetY = isPortrait ? 1.0 : THREE.MathUtils.lerp(0.8, 1.1, subP);
        targetZ = isPortrait
          ? THREE.MathUtils.lerp(9.8, 8.8, subP)
          : THREE.MathUtils.lerp(8.5, 7.6, subP);
        lookAtY = 0.5;
      } else {
        const subP = (p - 0.75) / 0.25;
        targetX = isPortrait ? 0 : THREE.MathUtils.lerp(-0.2, 0.2, subP);
        targetY = isPortrait ? 1.2 : THREE.MathUtils.lerp(1.1, 1.2, subP);
        targetZ = isPortrait
          ? THREE.MathUtils.lerp(8.8, 8.2, subP)
          : THREE.MathUtils.lerp(7.6, 7.0, subP);
        lookAtY = 0.7;
      }
    }

    // Floor Selector Target Override (only when not in finale)
    if (!isFinale) {
      if (selectedFloor !== null && FLOOR_Y_MAP[selectedFloor] !== undefined) {
        targetY = FLOOR_Y_MAP[selectedFloor] + 0.6;
        lookAtY = FLOOR_Y_MAP[selectedFloor];
        targetZ = isPortrait ? 9.2 : 7.2;
      } else if (sector07Focused) {
        targetY = 1.2;
        lookAtY = 0.8;
        targetZ = isPortrait ? 8.8 : 6.8;
      }
    }

    // Pointer Parallax (Subtle, desktop only)
    const pointerX = isPortrait ? 0 : state.pointer.x * 0.35;
    const pointerY = isPortrait ? 0 : state.pointer.y * 0.25;

    // Smooth lerp (0.04 damping prevents any camera jitter)
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      targetX + pointerX,
      0.045
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      targetY + pointerY,
      0.045
    );
    state.camera.position.z = THREE.MathUtils.lerp(
      state.camera.position.z,
      targetZ,
      0.045
    );

    // Dynamic LookAt
    const currentTarget = new THREE.Vector3(0.2, lookAtY, 0);
    state.camera.lookAt(currentTarget);
  });

  return null;
}

export function CitadelCanvas({
  scrollProgress,
  deconstructProgress = 0,
  selectedFloor = null,
  sector07Focused = false,
  isFinale = false,
}: CitadelCanvasProps) {
  const isTouch = useIsTouchDevice();
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <div
      ref={containerRef}
      data-cursor="3d"
      className="w-full h-full relative cursor-grab active:cursor-grabbing"
      aria-label="3D Citadel Architecture Visualization"
    >
      <Canvas
        camera={{ position: [0.8, 1.2, 11.5], fov: 40 }}
        dpr={isTouch ? [1, 1] : [1, 1.5]}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: true,
        }}
      >
        {/* Depth Fog for atmospheric depth */}
        <fogExp2
          attach="fog"
          args={[
            isLight ? "#F5F7FA" : "#050608",
            isFinale ? (isLight ? 0.018 : 0.025) : (isLight ? 0.028 : 0.038),
          ]}
        />

        {/* Cinematic Multi-Tier Lighting */}
        <ambientLight
          intensity={isLight ? (isFinale ? 0.85 : 0.68) : (isFinale ? 0.65 : 0.42)}
          color={isLight ? "#E2E8F0" : (isFinale ? "#0E1624" : "#080B12")}
        />

        {/* Directional Key Light (Dramatic architectural shadows) */}
        <directionalLight
          position={[7, 10, 6]}
          intensity={isLight ? (isFinale ? 2.5 : 2.0) : (isFinale ? 2.2 : 1.6)}
          color={isLight ? "#FFFFFF" : "#F2F6FC"}
        />

        {/* High-Tech Cyan Rim Light (Sharp brutalist silhouettes) */}
        <directionalLight
          position={[-7, -3, -4]}
          intensity={isLight ? (isFinale ? 4.2 : 3.2) : (isFinale ? 4.6 : 3.4)}
          color={isLight ? "#0284C7" : "#00F2FE"}
        />

        {/* Subtle Violet Negative-Space Bounce */}
        <pointLight
          position={[0, -5, 5]}
          intensity={isLight ? (isFinale ? 0.9 : 0.6) : (isFinale ? 1.2 : 0.5)}
          color={isLight ? "#7C3AED" : "#7928CA"}
          distance={18}
        />

        {/* Dynamic Camera Choreography */}
        <CameraRig
          scrollProgress={scrollProgress}
          deconstructProgress={deconstructProgress}
          selectedFloor={selectedFloor}
          sector07Focused={sector07Focused}
          isFinale={isFinale}
        />

        {/* Procedural Habitat Megastructure */}
        <CitadelModel
          scrollProgress={scrollProgress}
          deconstructProgress={deconstructProgress}
          selectedFloor={selectedFloor}
          sector07Focused={sector07Focused}
          isFinale={isFinale}
          theme={theme}
        />

        {/* Atmospheric Floating Biometric Dust Motes */}
        <ParticleAtmosphere count={isTouch ? 80 : 200} />
      </Canvas>
    </div>
  );
}
