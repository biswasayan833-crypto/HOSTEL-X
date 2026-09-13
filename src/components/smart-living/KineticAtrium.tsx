"use client";

import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface KineticAtriumProps {
  accentColor?: string;
  activeMode?: string;
}

export function KineticAtrium({
  accentColor = "#A855F7",
  activeMode = "collaborative",
}: KineticAtriumProps) {
  const groupRef = useRef<THREE.Group>(null);
  const platform1Ref = useRef<THREE.Group>(null);
  const platform2Ref = useRef<THREE.Group>(null);
  const platform3Ref = useRef<THREE.Group>(null);

  const modeColor =
    activeMode === "silent"
      ? new THREE.Color("#00F2FE")
      : activeMode === "biophilic"
      ? new THREE.Color("#00F5A0")
      : new THREE.Color(accentColor);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = -0.4 + Math.sin(t * 0.25) * 0.08;
    }

    // Individual kinetic oscillation for suspended study platforms
    if (platform1Ref.current) {
      platform1Ref.current.position.y = 0.5 + Math.sin(t * 0.8) * 0.06;
      platform1Ref.current.rotation.y = Math.sin(t * 0.3) * 0.05;
    }
    if (platform2Ref.current) {
      platform2Ref.current.position.y = -0.2 + Math.cos(t * 0.7) * 0.07;
      platform2Ref.current.rotation.y = -Math.sin(t * 0.35) * 0.04;
    }
    if (platform3Ref.current) {
      platform3Ref.current.position.y = -0.8 + Math.sin(t * 0.9 + 1) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* ────────────────────────────────────────────────────────
          01. PERIMETER STRUCTURAL PYLONS (Vertical Brutalist Frame)
          ──────────────────────────────────────────────────────── */}
      {/* 4 Corner Columns bounding the 40m Atrium Void */}
      {[
        [-1.6, -1.6],
        [1.6, -1.6],
        [-1.6, 1.6],
        [1.6, 1.6],
      ].map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh>
            <boxGeometry args={[0.2, 3.4, 0.2]} />
            <meshStandardMaterial color="#0E121B" roughness={0.4} metalness={0.8} />
          </mesh>
          {/* Vertical Glowing Hairline Conduit */}
          <mesh position={[0, 0, 0.11]}>
            <boxGeometry args={[0.03, 3.3, 0.01]} />
            <meshBasicMaterial color={modeColor} transparent opacity={0.6} />
          </mesh>
        </group>
      ))}

      {/* Top & Bottom Structural Perimeter Rings */}
      <mesh position={[0, 1.6, 0]}>
        <boxGeometry args={[3.4, 0.1, 3.4]} />
        <meshBasicMaterial color="#252C3A" wireframe />
      </mesh>
      <mesh position={[0, -1.6, 0]}>
        <boxGeometry args={[3.4, 0.1, 3.4]} />
        <meshStandardMaterial color="#080A0E" roughness={0.6} />
      </mesh>

      {/* ────────────────────────────────────────────────────────
          02. VERTICAL CORE LIGHT SHAFTS (Convective Energy)
          ──────────────────────────────────────────────────────── */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 3.2, 16]} />
        <meshBasicMaterial color={modeColor} transparent opacity={0.85} />
      </mesh>
      <pointLight intensity={2.4} distance={4.5} color={modeColor} />

      {/* ────────────────────────────────────────────────────────
          03. KINETIC SUSPENDED PLATFORMS (Study Clusters)
          ──────────────────────────────────────────────────────── */}
      {/* Platform 1: Upper Cantilever Platform (Level 26) */}
      <group ref={platform1Ref} position={[-0.6, 0.5, -0.4]}>
        {/* Floor Slab */}
        <mesh>
          <boxGeometry args={[1.5, 0.08, 1.1]} />
          <meshStandardMaterial color="#141823" roughness={0.4} metalness={0.7} />
        </mesh>
        {/* Glass Railing */}
        <mesh position={[0, 0.22, 0.5]}>
          <boxGeometry args={[1.5, 0.36, 0.02]} />
          <meshPhysicalMaterial
            color="#001826"
            roughness={0.1}
            transmission={0.8}
            transparent
            opacity={0.6}
          />
        </mesh>
        {/* Suspension Cables */}
        <mesh position={[-0.7, 0.55, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 1.0, 8]} />
          <meshBasicMaterial color="#252C3A" />
        </mesh>
        <mesh position={[0.7, 0.55, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 1.0, 8]} />
          <meshBasicMaterial color="#252C3A" />
        </mesh>
        {/* Floor Edge Glow */}
        <mesh position={[0, -0.04, 0.56]}>
          <boxGeometry args={[1.4, 0.02, 0.02]} />
          <meshBasicMaterial color={modeColor} />
        </mesh>
      </group>

      {/* Platform 2: Mid-Level Skybridge Crossway (Level 24) */}
      <group ref={platform2Ref} position={[0.5, -0.2, 0.3]}>
        <mesh>
          <boxGeometry args={[1.6, 0.08, 0.9]} />
          <meshStandardMaterial color="#141823" roughness={0.4} metalness={0.7} />
        </mesh>
        <mesh position={[0, 0.22, -0.4]}>
          <boxGeometry args={[1.6, 0.36, 0.02]} />
          <meshPhysicalMaterial
            color="#001826"
            roughness={0.1}
            transmission={0.8}
            transparent
            opacity={0.6}
          />
        </mesh>
        <mesh position={[0, -0.04, -0.46]}>
          <boxGeometry args={[1.5, 0.02, 0.02]} />
          <meshBasicMaterial color={modeColor} />
        </mesh>
      </group>

      {/* Platform 3: Lower Pod Alcove (Level 22) */}
      <group ref={platform3Ref} position={[-0.4, -0.8, 0.5]}>
        <mesh>
          <boxGeometry args={[1.2, 0.08, 0.8]} />
          <meshStandardMaterial color="#141823" roughness={0.4} metalness={0.7} />
        </mesh>
      </group>

      {/* ────────────────────────────────────────────────────────
          04. INTERCONNECTING SKYBRIDGES
          ──────────────────────────────────────────────────────── */}
      <group position={[0, 0.15, 0]} rotation={[0, 0.8, 0]}>
        <mesh>
          <boxGeometry args={[2.8, 0.05, 0.35]} />
          <meshStandardMaterial color="#10141D" roughness={0.3} metalness={0.9} />
        </mesh>
        <mesh position={[0, 0.03, 0]}>
          <boxGeometry args={[2.7, 0.015, 0.04]} />
          <meshBasicMaterial color={modeColor} />
        </mesh>
      </group>

      {/* ────────────────────────────────────────────────────────
          05. BIOPHILIC RISING CONVECTIVE PARTICLES
          ──────────────────────────────────────────────────────── */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[
              new Float32Array(
                Array.from({ length: 90 }, () => [
                  (Math.random() - 0.5) * 2.8,
                  (Math.random() - 0.5) * 3.0,
                  (Math.random() - 0.5) * 2.8,
                ]).flat()
              ),
              3,
            ]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color={modeColor}
          transparent
          opacity={0.55}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
