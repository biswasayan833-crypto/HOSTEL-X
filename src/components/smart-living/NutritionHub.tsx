"use client";

import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface NutritionHubProps {
  accentColor?: string;
  activeMode?: string;
}

export function NutritionHub({
  accentColor = "#00F5A0",
  activeMode = "breakfast",
}: NutritionHubProps) {
  const groupRef = useRef<THREE.Group>(null);
  const outerRingRef = useRef<THREE.Group>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);
  const pulseRaysRef = useRef<THREE.Group>(null);

  const modeColor =
    activeMode === "dinner"
      ? new THREE.Color("#7928CA")
      : activeMode === "lunch"
      ? new THREE.Color("#00D9F5")
      : new THREE.Color(accentColor);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 1.0) * 0.05;
      groupRef.current.rotation.y = t * 0.15;
    }

    if (outerRingRef.current) {
      outerRingRef.current.rotation.y = -t * 0.25;
    }

    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.y = t * 0.4;
      const s = 1 + Math.sin(t * 2.5) * 0.04;
      innerCoreRef.current.scale.set(s, 1, s);
    }

    if (pulseRaysRef.current) {
      pulseRaysRef.current.rotation.y = t * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {/* ────────────────────────────────────────────────────────
          01. BASE PLINTH & ROTATIONAL DECK
          ──────────────────────────────────────────────────────── */}
      {/* Heavy Brutalist Center Platform */}
      <mesh position={[0, -0.9, 0]}>
        <cylinderGeometry args={[2.4, 2.6, 0.3, 32]} />
        <meshStandardMaterial color="#0C0E14" roughness={0.5} metalness={0.8} />
      </mesh>
      {/* Platform Hairline Edge */}
      <mesh position={[0, -0.74, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.38, 2.42, 64]} />
        <meshBasicMaterial color="#252C3A" />
      </mesh>

      {/* ────────────────────────────────────────────────────────
          02. CONCENTRIC ROTATING SYNTHESIS RINGS
          ──────────────────────────────────────────────────────── */}
      <group ref={outerRingRef} position={[0, -0.4, 0]}>
        {/* Outer Ring Guide Rail */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.0, 0.05, 16, 64]} />
          <meshStandardMaterial color="#161A24" roughness={0.3} metalness={0.9} />
        </mesh>

        {/* 6 Peripheral Dispensation Pods mounted on Outer Ring */}
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i * Math.PI * 2) / 6;
          const x = Math.cos(angle) * 2.0;
          const z = Math.sin(angle) * 2.0;
          return (
            <group key={i} position={[x, 0.15, z]}>
              <mesh>
                <cylinderGeometry args={[0.18, 0.22, 0.5, 16]} />
                <meshStandardMaterial color="#11151F" roughness={0.4} metalness={0.8} />
              </mesh>
              {/* Nutrient Level Indicator Strip */}
              <mesh position={[0, 0, 0.2]}>
                <boxGeometry args={[0.04, 0.3, 0.02]} />
                <meshBasicMaterial color={modeColor} />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* Intermediate Telemetry Ring */}
      <mesh position={[0, -0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.3, 1.34, 48]} />
        <meshBasicMaterial color={modeColor} transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>

      {/* ────────────────────────────────────────────────────────
          03. CENTRAL MOLECULAR SYNTHESIS REACTOR
          ──────────────────────────────────────────────────────── */}
      <group position={[0, 0.1, 0]}>
        {/* Reactor Core Cylinder */}
        <mesh ref={innerCoreRef}>
          <cylinderGeometry args={[0.55, 0.55, 1.4, 24]} />
          <meshPhysicalMaterial
            color="#001815"
            roughness={0.15}
            metalness={0.2}
            transmission={0.85}
            thickness={0.8}
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* Inner Glowing Plasma Column */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 1.3, 16]} />
          <meshBasicMaterial color={modeColor} />
        </mesh>
        <pointLight intensity={3.0} distance={5.0} color={modeColor} />

        {/* Structural Core Top & Bottom Caps */}
        <mesh position={[0, 0.72, 0]}>
          <cylinderGeometry args={[0.65, 0.6, 0.12, 24]} />
          <meshStandardMaterial color="#1A1F2B" roughness={0.3} metalness={0.9} />
        </mesh>
        <mesh position={[0, -0.72, 0]}>
          <cylinderGeometry args={[0.6, 0.65, 0.12, 24]} />
          <meshStandardMaterial color="#1A1F2B" roughness={0.3} metalness={0.9} />
        </mesh>
      </group>

      {/* ────────────────────────────────────────────────────────
          04. RADIATING MAG-LEV SERVING RAILS (Conduits to Pods)
          ──────────────────────────────────────────────────────── */}
      <group ref={pulseRaysRef} position={[0, -0.55, 0]}>
        {[0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2].map((rot, idx) => (
          <group key={idx} rotation={[0, rot, 0]}>
            {/* Rail Beam */}
            <mesh position={[1.4, 0, 0]}>
              <boxGeometry args={[1.5, 0.04, 0.08]} />
              <meshStandardMaterial color="#1C212D" roughness={0.3} metalness={0.9} />
            </mesh>
            {/* Glowing Linear Vector */}
            <mesh position={[1.4, 0.03, 0]}>
              <boxGeometry args={[1.4, 0.015, 0.02]} />
              <meshBasicMaterial color={modeColor} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ────────────────────────────────────────────────────────
          05. NUTRIENT STREAM PARTICLES (Upward Convection)
          ──────────────────────────────────────────────────────── */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[
              new Float32Array(
                Array.from({ length: 80 }, () => [
                  (Math.random() - 0.5) * 3,
                  Math.random() * 2 - 0.5,
                  (Math.random() - 0.5) * 3,
                ]).flat()
              ),
              3,
            ]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color={modeColor}
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
