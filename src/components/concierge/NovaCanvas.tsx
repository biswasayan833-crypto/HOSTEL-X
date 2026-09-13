"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { NovaRobotModel } from "./NovaRobotModel";
import { ParticleAtmosphere } from "@/components/canvas/ParticleAtmosphere";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTheme } from "@/context/ThemeContext";

interface NovaCanvasProps {
  accentColor?: string;
  isActivated?: boolean;
  activationProgress?: number;
  className?: string;
}

function NovaCameraRig() {
  const isReduced = useReducedMotion();

  useFrame((state) => {
    if (isReduced) return;
    const isPortrait = state.viewport.aspect < 1;
    const targetZ = isPortrait ? 5.2 : 4.4;

    // Subtle pointer parallax on camera
    const pointerX = isPortrait ? 0 : state.pointer.x * 0.15;
    const pointerY = isPortrait ? 0 : state.pointer.y * 0.12;

    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      pointerX,
      0.05
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      pointerY,
      0.05
    );
    state.camera.position.z = THREE.MathUtils.lerp(
      state.camera.position.z,
      targetZ,
      0.05
    );
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

export function NovaCanvas({
  accentColor = "#00F2FE",
  isActivated = true,
  activationProgress = 1,
  className = "",
}: NovaCanvasProps) {
  const isTouch = useIsTouchDevice();
  const containerRef = useRef<HTMLDivElement>(null);
  const [pointer, setPointer] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const { theme } = useTheme();
  const isLight = theme === "light";

  useEffect(() => {
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Normalize cursor relative to center of canvas container
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      // Clamp to natural gaze range
      setPointer({
        x: Math.max(-1, Math.min(1, x)),
        y: Math.max(-1, Math.min(1, y)),
      });
    };

    const handleMouseLeave = () => {
      // Return smoothly to resting center
      setPointer({ x: 0, y: 0 });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isTouch]);

  return (
    <div
      ref={containerRef}
      data-cursor="3d"
      className={`w-full h-full relative cursor-crosshair select-none ${className}`}
      aria-label="3D Interactive Autonomous Concierge NOVA"
    >
      <Canvas
        camera={{ position: [0, 0, 4.4], fov: 38 }}
        dpr={isTouch ? [1, 1] : [1, 1.5]}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: true,
        }}
      >
        {/* Soft Ambient Shadow Fill */}
        <ambientLight
          intensity={isLight ? 0.72 : 0.48}
          color={isLight ? "#E2E8F0" : "#080B12"}
        />

        {/* Directional Key Light */}
        <directionalLight
          position={[4, 5, 5]}
          intensity={isLight ? 1.8 : 1.5}
          color="#FFFFFF"
        />

        {/* Cyan Edge / Rim Light */}
        <directionalLight
          position={[-4, -3, -2]}
          intensity={isLight ? 2.2 : 2.6}
          color={isLight ? "#0284C7" : "#00F2FE"}
        />

        {/* Accent Color Focal Light */}
        <pointLight position={[0, -2, 3]} intensity={0.8} color={accentColor} distance={8} />

        {/* Camera Parallax Rig */}
        <NovaCameraRig />

        {/* The 3D NOVA Robotic Entity */}
        <NovaRobotModel
          pointer={pointer}
          accentColor={accentColor}
          isActivated={isActivated}
          activationProgress={activationProgress}
        />

        {/* Sparse Orbital Telemetry Particles */}
        <ParticleAtmosphere count={isTouch ? 35 : 75} />
      </Canvas>
    </div>
  );
}
