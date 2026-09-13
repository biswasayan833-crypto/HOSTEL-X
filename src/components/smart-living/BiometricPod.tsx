"use client";

import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface BiometricPodProps {
  accentColor?: string;
  activeMode?: string;
}

export function BiometricPod({
  accentColor = "#00F2FE",
  activeMode = "focus",
}: BiometricPodProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Derive light tint based on active mode
  const modeColor =
    activeMode === "circadian"
      ? new THREE.Color("#7928CA")
      : activeMode === "recovery"
      ? new THREE.Color("#FFB020")
      : new THREE.Color(accentColor);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Gentle levitation and subtle 3D rotational breathing
      groupRef.current.position.y = Math.sin(t * 1.2) * 0.06;
      groupRef.current.rotation.y = -0.42 + Math.sin(t * 0.4) * 0.05;
      groupRef.current.rotation.x = 0.14 + Math.cos(t * 0.35) * 0.02;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.25;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.1, 0]}>
      {/* ────────────────────────────────────────────────────────
          01. ARCHITECTURAL POD SHELL (Cutaway Isometric Perspective)
          ──────────────────────────────────────────────────────── */}
      {/* Back Wall */}
      <mesh position={[0, 0, -1.0]}>
        <boxGeometry args={[3.2, 1.8, 0.12]} />
        <meshStandardMaterial color="#0D111A" roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Back Wall Wireframe Accent */}
      <mesh position={[0, 0, -0.93]}>
        <planeGeometry args={[3.0, 1.6]} />
        <meshBasicMaterial color="#252C3A" wireframe transparent opacity={0.4} />
      </mesh>

      {/* Floor Deck Platform */}
      <mesh position={[0, -0.9, 0]}>
        <boxGeometry args={[3.2, 0.14, 2.1]} />
        <meshStandardMaterial color="#121622" roughness={0.4} metalness={0.9} />
      </mesh>
      {/* Floor Edge Hairline Glow */}
      <mesh position={[0, -0.82, 1.04]}>
        <boxGeometry args={[3.1, 0.02, 0.02]} />
        <meshBasicMaterial color={modeColor} />
      </mesh>

      {/* Ceiling Slab */}
      <mesh position={[0, 0.9, 0]}>
        <boxGeometry args={[3.2, 0.14, 2.1]} />
        <meshStandardMaterial color="#0E121B" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Left Outer Wall */}
      <mesh position={[-1.55, 0, 0]}>
        <boxGeometry args={[0.12, 1.8, 2.1]} />
        <meshStandardMaterial color="#10141F" roughness={0.4} metalness={0.8} />
      </mesh>

      {/* Right Cantilever Wing Panel */}
      <mesh position={[1.55, 0, -0.2]}>
        <boxGeometry args={[0.12, 1.8, 1.7]} />
        <meshStandardMaterial color="#10141F" roughness={0.4} metalness={0.8} />
      </mesh>

      {/* ────────────────────────────────────────────────────────
          02. FRONT ARCHITECTURAL BEVEL FRAME & SMART GLASS
          ──────────────────────────────────────────────────────── */}
      {/* Structural Perimeter Struts */}
      <mesh position={[0, 0.96, 1.04]}>
        <boxGeometry args={[3.26, 0.08, 0.12]} />
        <meshStandardMaterial color="#1A202D" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[-1.58, 0, 1.04]}>
        <boxGeometry args={[0.08, 1.84, 0.12]} />
        <meshStandardMaterial color="#1A202D" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[1.58, 0, 1.04]}>
        <boxGeometry args={[0.08, 1.84, 0.12]} />
        <meshStandardMaterial color="#1A202D" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Ultra-Clear High-Tech Smart Glass Edge */}
      <mesh position={[0.4, 0, 1.0]}>
        <planeGeometry args={[2.3, 1.7]} />
        <meshPhysicalMaterial
          color="#001826"
          roughness={0.05}
          metalness={0.1}
          transmission={0.92}
          thickness={0.3}
          transparent={true}
          opacity={0.35}
        />
      </mesh>

      {/* Smart Glass Technical HUD Target Reticle */}
      <mesh position={[0.8, 0.2, 1.02]}>
        <ringGeometry args={[0.09, 0.1, 24]} />
        <meshBasicMaterial color={modeColor} transparent opacity={0.85} />
      </mesh>

      {/* ────────────────────────────────────────────────────────
          03. INTERIOR ARCHITECTURE (Ergonomic Bed & Workstation)
          ──────────────────────────────────────────────────────── */}
      {/* Minimalist Bio-Ergonomic Bed Platform (Left) */}
      <mesh position={[-0.8, -0.65, -0.1]}>
        <boxGeometry args={[1.25, 0.24, 1.6]} />
        <meshStandardMaterial color="#181D29" roughness={0.6} metalness={0.3} />
      </mesh>
      {/* Contoured Pillow / Headrest */}
      <mesh position={[-0.8, -0.48, -0.7]}>
        <boxGeometry args={[1.0, 0.1, 0.32]} />
        <meshStandardMaterial color="#252C3A" roughness={0.7} />
      </mesh>
      {/* Bed Base Edge Glow */}
      <mesh position={[-0.8, -0.52, 0.71]}>
        <boxGeometry args={[1.2, 0.015, 0.02]} />
        <meshBasicMaterial color={modeColor} />
      </mesh>

      {/* Floating Workstation Desk (Right) */}
      <mesh position={[0.75, -0.3, 0.1]}>
        <boxGeometry args={[1.1, 0.06, 1.3]} />
        <meshStandardMaterial color="#151A24" roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Console Display Base */}
      <mesh position={[0.75, -0.24, 0.1]}>
        <cylinderGeometry args={[0.18, 0.2, 0.04, 24]} />
        <meshStandardMaterial color="#252C3A" metalness={0.8} />
      </mesh>
      {/* Holographic Console Projection Plane */}
      <mesh position={[0.75, 0.05, 0.1]} rotation={[-0.2, 0, 0]}>
        <planeGeometry args={[0.45, 0.3]} />
        <meshBasicMaterial color={modeColor} transparent opacity={0.75} side={THREE.DoubleSide} />
      </mesh>

      {/* ────────────────────────────────────────────────────────
          04. CIRCADIAN PHOTONIC CEILING RIBBON
          ──────────────────────────────────────────────────────── */}
      <mesh position={[0, 0.82, 0]}>
        <boxGeometry args={[2.8, 0.03, 0.3]} />
        <meshBasicMaterial color={modeColor} />
      </mesh>
      {/* Concentrated Downlight on Interior */}
      <pointLight
        position={[0, 0.65, 0]}
        intensity={3.2}
        distance={4.5}
        color={modeColor}
      />

      {/* ────────────────────────────────────────────────────────
          05. EXTERIOR CANTILEVER SPINE DOCK (Connecting to Core)
          ──────────────────────────────────────────────────────── */}
      <mesh position={[0, 0, -1.35]}>
        <boxGeometry args={[1.8, 1.2, 0.5]} />
        <meshStandardMaterial color="#0A0C12" roughness={0.5} metalness={0.9} />
      </mesh>
      {/* Tension Cables */}
      <mesh position={[-1.2, 0.4, -1.25]} rotation={[0.2, 0.4, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 1.2, 8]} />
        <meshBasicMaterial color="#252C3A" />
      </mesh>
      <mesh position={[1.2, 0.4, -1.25]} rotation={[0.2, -0.4, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 1.2, 8]} />
        <meshBasicMaterial color="#252C3A" />
      </mesh>

      {/* ────────────────────────────────────────────────────────
          06. TELEMETRY SCANNING RING & SENSOR NODES
          ──────────────────────────────────────────────────────── */}
      {/* Scanning Ring Orbiting the Pod */}
      <mesh ref={ringRef} position={[0, 0, 0]} rotation={[Math.PI / 2.3, 0.2, 0]}>
        <ringGeometry args={[2.3, 2.32, 64]} />
        <meshBasicMaterial
          color={modeColor}
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Sensor Node (Intake Vent) */}
      <group position={[1.4, 0.7, 1.08]}>
        <mesh>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color={modeColor} />
        </mesh>
        <pointLight intensity={0.8} distance={1.5} color={modeColor} />
      </group>

      {/* ────────────────────────────────────────────────────────
          07. AMBIENT BIOMETRIC IONIZED PARTICLES
          ──────────────────────────────────────────────────────── */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[
              new Float32Array(
                Array.from({ length: 70 }, () => [
                  (Math.random() - 0.5) * 4.5,
                  (Math.random() - 0.5) * 3.2,
                  (Math.random() - 0.5) * 3.5,
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
          opacity={0.65}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
