"use client";

import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface PredictiveInfrastructureProps {
  accentColor?: string;
  activeMode?: string;
}

export function PredictiveInfrastructure({
  accentColor = "#00F2FE",
  activeMode = "energy",
}: PredictiveInfrastructureProps) {
  const groupRef = useRef<THREE.Group>(null);
  const scanGridRef = useRef<THREE.Mesh>(null);
  const nodesGroupRef = useRef<THREE.Group>(null);

  const modeColor =
    activeMode === "water"
      ? new THREE.Color("#2B7FFF")
      : activeMode === "maintenance"
      ? new THREE.Color("#FFB020")
      : new THREE.Color(accentColor);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.12;
    }

    // Vertical scanning plane sweep
    if (scanGridRef.current) {
      scanGridRef.current.position.y = Math.sin(t * 1.5) * 1.5;
    }

    // Pulse node scales
    if (nodesGroupRef.current) {
      const s = 1 + Math.sin(t * 3) * 0.12;
      nodesGroupRef.current.children.forEach((child) => {
        child.scale.set(s, s, s);
      });
    }
  });

  const nodePositions: [number, number, number][] = [
    [0.9, 1.1, 0.4], // Energy Node
    [-0.9, 0.6, -0.4], // Water Node
    [0.7, -0.2, -0.6], // Atmospheric Node
    [-0.8, -0.8, 0.5], // Maintenance Node
    [0, 1.4, 0], // Photovoltaic Apex
    [0, -1.3, 0], // Geo-Thermal Core
  ];

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* ────────────────────────────────────────────────────────
          01. MACRO CITADEL WIREFRAME MATRIX
          ──────────────────────────────────────────────────────── */}
      {/* Central Spinal Pillar */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.5, 3.4, 8]} />
        <meshStandardMaterial color="#0A0D14" roughness={0.5} metalness={0.9} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.31, 0.51, 3.41, 8]} />
        <meshBasicMaterial color="#252C3A" wireframe transparent opacity={0.5} />
      </mesh>

      {/* Layered Floor Slabs Wireframe Ghost */}
      {[-1.2, -0.6, 0, 0.6, 1.2].map((y, i) => (
        <group key={i} position={[0, y, 0]}>
          <mesh>
            <cylinderGeometry args={[1.6 - Math.abs(y) * 0.3, 1.6 - Math.abs(y) * 0.3, 0.04, 6]} />
            <meshStandardMaterial color="#0E121B" roughness={0.4} />
          </mesh>
          <mesh>
            <cylinderGeometry args={[1.62 - Math.abs(y) * 0.3, 1.62 - Math.abs(y) * 0.3, 0.05, 6]} />
            <meshBasicMaterial color={modeColor} wireframe transparent opacity={0.3} />
          </mesh>
        </group>
      ))}

      {/* ────────────────────────────────────────────────────────
          02. TOPOLOGICAL RESOURCE CONDUIT LINES
          ──────────────────────────────────────────────────────── */}
      {/* Vertical High-Capacity Bus Conduits */}
      {[0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2].map((rot, i) => (
        <group key={i} rotation={[0, rot, 0]}>
          <mesh position={[1.1, 0, 0]}>
            <boxGeometry args={[0.02, 3.2, 0.02]} />
            <meshBasicMaterial color={modeColor} transparent opacity={0.5} />
          </mesh>
        </group>
      ))}

      {/* ────────────────────────────────────────────────────────
          03. 6 SENSORY RELAY NODES (Hexagonal Indicators)
          ──────────────────────────────────────────────────────── */}
      <group ref={nodesGroupRef}>
        {nodePositions.map((pos, i) => (
          <group key={i} position={pos}>
            {/* Core glowing marker */}
            <mesh>
              <octahedronGeometry args={[0.1, 0]} />
              <meshBasicMaterial color={modeColor} />
            </mesh>
            {/* Reticle Ring */}
            <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
              <ringGeometry args={[0.14, 0.16, 16]} />
              <meshBasicMaterial color={modeColor} transparent opacity={0.75} side={THREE.DoubleSide} />
            </mesh>
            <pointLight intensity={1.2} distance={2.0} color={modeColor} />
          </group>
        ))}
      </group>

      {/* ────────────────────────────────────────────────────────
          04. VERTICAL SCANNING LASER PLANE
          ──────────────────────────────────────────────────────── */}
      <mesh ref={scanGridRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.1, 2.2, 32]} />
        <meshBasicMaterial
          color={modeColor}
          transparent
          opacity={0.18}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* ────────────────────────────────────────────────────────
          05. DATA FLUX PULSES
          ──────────────────────────────────────────────────────── */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[
              new Float32Array(
                Array.from({ length: 70 }, () => [
                  (Math.random() - 0.5) * 2.5,
                  (Math.random() - 0.5) * 3.2,
                  (Math.random() - 0.5) * 2.5,
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
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
