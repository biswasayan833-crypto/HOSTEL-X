"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface NovaIrisProps {
  gaze: [number, number]; // [x, y] normalized gaze offset (-1 to 1)
  accentColor: string;
  isActivated: boolean;
}

export function NovaIris({ gaze, accentColor, isActivated }: NovaIrisProps) {
  const irisGroupRef = useRef<THREE.Group>(null);
  const pupilRef = useRef<THREE.Mesh>(null);
  const ringMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const pupilMaterialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (!irisGroupRef.current) return;
    const time = state.clock.getElapsedTime();

    // Natural constrained gaze offset (max range: 0.22 units inside visor cavity)
    const targetX = THREE.MathUtils.clamp(gaze[0] * 0.26, -0.26, 0.26);
    const targetY = THREE.MathUtils.clamp(gaze[1] * 0.22, -0.22, 0.22);

    irisGroupRef.current.position.x = THREE.MathUtils.lerp(
      irisGroupRef.current.position.x,
      targetX,
      0.08
    );
    irisGroupRef.current.position.y = THREE.MathUtils.lerp(
      irisGroupRef.current.position.y,
      targetY,
      0.08
    );

    // Subtle optical dilation / breathing
    if (pupilRef.current) {
      const dilation = 1.0 + Math.sin(time * 2.0) * 0.06;
      pupilRef.current.scale.set(dilation, dilation, 1);
    }

    // Color transition based on active command
    const targetCol = new THREE.Color(accentColor);
    if (ringMaterialRef.current && pupilMaterialRef.current) {
      ringMaterialRef.current.color.lerp(targetCol, 0.08);
      ringMaterialRef.current.emissive.lerp(targetCol, 0.08);
      pupilMaterialRef.current.color.lerp(targetCol, 0.08);
      pupilMaterialRef.current.emissive.lerp(targetCol, 0.08);

      // Activation intensity
      const baseIntensity = isActivated ? 1.8 : 0.2;
      const pulse = Math.sin(time * 1.5) * 0.2;
      pupilMaterialRef.current.emissiveIntensity = baseIntensity + pulse;
      ringMaterialRef.current.emissiveIntensity = baseIntensity * 0.6;
    }
  });

  return (
    <group ref={irisGroupRef} position={[0, 0, 0.86]}>
      {/* 01. Central Luminous Core Pupil */}
      <mesh ref={pupilRef} position={[0, 0, 0.02]}>
        <sphereGeometry args={[0.085, 24, 24]} />
        <meshStandardMaterial
          ref={pupilMaterialRef}
          color={accentColor}
          emissive={accentColor}
          emissiveIntensity={1.8}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* 02. Concentric Optical Aperture Ring */}
      <mesh position={[0, 0, 0.01]}>
        <ringGeometry args={[0.12, 0.16, 32]} />
        <meshStandardMaterial
          ref={ringMaterialRef}
          color={accentColor}
          emissive={accentColor}
          emissiveIntensity={1.2}
          roughness={0.2}
          metalness={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 03. Outer Reticle Notch Blades */}
      <mesh position={[0, 0, 0.005]}>
        <ringGeometry args={[0.19, 0.22, 4]} />
        <meshStandardMaterial
          color="#8F99AE"
          emissive="#00F2FE"
          emissiveIntensity={0.4}
          roughness={0.3}
          metalness={0.7}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 04. Soft Light Core */}
      <pointLight
        color={accentColor}
        intensity={isActivated ? 2.2 : 0.4}
        distance={2.5}
        decay={2}
      />
    </group>
  );
}
