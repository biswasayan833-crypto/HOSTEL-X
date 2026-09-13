"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { NovaIris } from "./NovaIris";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface NovaRobotModelProps {
  pointer: { x: number; y: number };
  accentColor: string;
  isActivated: boolean;
  activationProgress?: number;
}

export function NovaRobotModel({
  pointer,
  accentColor,
  isActivated,
  activationProgress = 1,
}: NovaRobotModelProps) {
  const isReduced = useReducedMotion();
  const groupRef = useRef<THREE.Group>(null);
  const headGroupRef = useRef<THREE.Group>(null);
  const outerRingRef = useRef<THREE.Group>(null);
  const innerRingRef = useRef<THREE.Group>(null);

  // High-precision procedural materials
  const materials = useMemo(() => {
    return {
      matteTitanium: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#161A22"),
        roughness: 0.6,
        metalness: 0.55,
      }),
      carbonGraphite: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#0A0D12"),
        roughness: 0.75,
        metalness: 0.35,
      }),
      obsidianVisor: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#020408"),
        roughness: 0.05,
        metalness: 0.95,
        transparent: true,
        opacity: 0.92,
      }),
      hairlineSeam: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#00F2FE"),
        emissive: new THREE.Color("#00F2FE"),
        emissiveIntensity: 0.6,
        roughness: 0.2,
      }),
      ringChassis: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#1A1F2B"),
        roughness: 0.5,
        metalness: 0.6,
      }),
      thrusterGlow: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#00F2FE"),
        emissive: new THREE.Color("#00F2FE"),
        emissiveIntensity: 1.2,
      }),
    };
  }, []);

  useFrame((state) => {
    if (!groupRef.current || !headGroupRef.current) return;
    const time = state.clock.getElapsedTime();

    if (isReduced) {
      groupRef.current.position.set(0, 0, 0);
      groupRef.current.rotation.set(0, 0, 0);
      return;
    }

    // 1. Organic Idle Levitation
    const idleY = Math.sin(time * 0.75) * 0.045;
    const idleRoll = Math.cos(time * 0.5) * 0.015;

    // 2. Gaze / Pointer Tracking (Constrained to natural head turn limits)
    // Pointer is normalized (-1 to 1)
    const targetPitch = THREE.MathUtils.clamp(-pointer.y * 0.32, -0.32, 0.32);
    const targetYaw = THREE.MathUtils.clamp(pointer.x * 0.45, -0.45, 0.45);

    // Smooth spherical interpolation (lerp damping: 0.06)
    headGroupRef.current.rotation.x = THREE.MathUtils.lerp(
      headGroupRef.current.rotation.x,
      targetPitch,
      0.06
    );
    headGroupRef.current.rotation.y = THREE.MathUtils.lerp(
      headGroupRef.current.rotation.y,
      targetYaw,
      0.06
    );
    headGroupRef.current.rotation.z = THREE.MathUtils.lerp(
      headGroupRef.current.rotation.z,
      idleRoll - pointer.x * 0.08,
      0.06
    );

    // Subtle translation floating
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      idleY,
      0.06
    );

    // 3. Counter-rotating Stabilizer Rings with Pointer & Activation Response
    const ringSpeed = 0.04 + activationProgress * 0.12;
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = time * ringSpeed;
      outerRingRef.current.rotation.x = THREE.MathUtils.lerp(
        outerRingRef.current.rotation.x,
        0.35 + pointer.y * 0.18 + Math.sin(time * 0.4) * 0.04,
        0.05
      );
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z = -time * (ringSpeed * 1.4);
      innerRingRef.current.rotation.y = THREE.MathUtils.lerp(
        innerRingRef.current.rotation.y,
        0.25 + pointer.x * 0.18 + Math.cos(time * 0.4) * 0.04,
        0.05
      );
    }

    // 4. Accent Color Dynamic Update on Seams
    const col = new THREE.Color(accentColor);
    materials.hairlineSeam.color.lerp(col, 0.08);
    materials.hairlineSeam.emissive.lerp(col, 0.08);
    materials.thrusterGlow.color.lerp(col, 0.08);
    materials.thrusterGlow.emissive.lerp(col, 0.08);

    // 5. Activation Scale Morph (0.3 -> 1.0 during entrance)
    const currentScale = THREE.MathUtils.lerp(0.35, 1.0, activationProgress);
    groupRef.current.scale.set(currentScale, currentScale, currentScale);
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* ──────────────────────────────────────────────────────────
          01. MAIN ARTICULATED HEAD & VISOR ASSEMBLY
          ────────────────────────────────────────────────────────── */}
      <group ref={headGroupRef}>
        {/* Core Mechanical Sphere Chassis */}
        <mesh material={materials.matteTitanium}>
          <sphereGeometry args={[0.92, 36, 36]} />
        </mesh>

        {/* Front Obsidian Curved Visor (Curved glass shell) */}
        <mesh position={[0, 0, 0.22]} material={materials.obsidianVisor}>
          <sphereGeometry args={[0.82, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.48]} />
        </mesh>

        {/* Outer Protective Armor Shells (4 Chamfered Cowling Plates) */}
        {/* Upper Left Shell */}
        <mesh position={[-0.42, 0.42, -0.05]} material={materials.matteTitanium}>
          <boxGeometry args={[0.65, 0.65, 0.85]} />
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(0.65, 0.65, 0.85)]} />
            <lineBasicMaterial color="#252C3A" transparent opacity={0.6} />
          </lineSegments>
        </mesh>

        {/* Upper Right Shell */}
        <mesh position={[0.42, 0.42, -0.05]} material={materials.matteTitanium}>
          <boxGeometry args={[0.65, 0.65, 0.85]} />
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(0.65, 0.65, 0.85)]} />
            <lineBasicMaterial color="#252C3A" transparent opacity={0.6} />
          </lineSegments>
        </mesh>

        {/* Lower Left Shell */}
        <mesh position={[-0.42, -0.42, -0.05]} material={materials.matteTitanium}>
          <boxGeometry args={[0.65, 0.65, 0.85]} />
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(0.65, 0.65, 0.85)]} />
            <lineBasicMaterial color="#252C3A" transparent opacity={0.6} />
          </lineSegments>
        </mesh>

        {/* Lower Right Shell */}
        <mesh position={[0.42, -0.42, -0.05]} material={materials.matteTitanium}>
          <boxGeometry args={[0.65, 0.65, 0.85]} />
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(0.65, 0.65, 0.85)]} />
            <lineBasicMaterial color="#252C3A" transparent opacity={0.6} />
          </lineSegments>
        </mesh>

        {/* Precision Recessed Hairline Seams (Glowing conduits between armor) */}
        <mesh position={[0, 0, -0.1]} material={materials.hairlineSeam}>
          <boxGeometry args={[1.52, 0.02, 0.9]} />
        </mesh>
        <mesh position={[0, 0, -0.1]} material={materials.hairlineSeam}>
          <boxGeometry args={[0.02, 1.52, 0.9]} />
        </mesh>

        {/* Rear Neural Processor Pack & Antenna array */}
        <mesh position={[0, 0, -0.88]} material={materials.carbonGraphite}>
          <cylinderGeometry args={[0.32, 0.42, 0.45, 16]} />
        </mesh>
        <mesh position={[-0.24, 0.35, -0.92]} material={materials.matteTitanium}>
          <cylinderGeometry args={[0.015, 0.025, 0.55, 8]} />
        </mesh>
        <mesh position={[0.24, 0.35, -0.92]} material={materials.matteTitanium}>
          <cylinderGeometry args={[0.015, 0.025, 0.55, 8]} />
        </mesh>

        {/* ────────────────────────────────────────────────────────
            02. PROCEDURAL LUMINOUS IRIS SENSOR
            ──────────────────────────────────────────────────────── */}
        <NovaIris
          gaze={[pointer.x, pointer.y]}
          accentColor={accentColor}
          isActivated={isActivated}
        />
      </group>

      {/* ──────────────────────────────────────────────────────────
          03. DUAL GIMBAL STABILIZER RINGS & MICRO-THRUSTERS
          ────────────────────────────────────────────────────────── */}
      {/* Outer Stabilizer Gimbal Ring */}
      <group ref={outerRingRef}>
        <mesh material={materials.ringChassis}>
          <torusGeometry args={[1.58, 0.028, 16, 64]} />
        </mesh>
        {/* Micro-thruster notches around ring perimeter */}
        {[0, Math.PI * 0.5, Math.PI, Math.PI * 1.5].map((angle, idx) => (
          <group key={idx} rotation={[0, 0, angle]}>
            <mesh position={[1.58, 0, 0]} material={materials.carbonGraphite}>
              <boxGeometry args={[0.08, 0.12, 0.06]} />
            </mesh>
            <mesh position={[1.59, 0, 0]} material={materials.thrusterGlow}>
              <sphereGeometry args={[0.02, 8, 8]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Inner Stabilizer Gimbal Ring */}
      <group ref={innerRingRef}>
        <mesh material={materials.ringChassis}>
          <torusGeometry args={[1.36, 0.02, 16, 64]} />
        </mesh>
        {/* Telemetry nodes */}
        {[Math.PI * 0.25, Math.PI * 0.75, Math.PI * 1.25, Math.PI * 1.75].map(
          (angle, idx) => (
            <mesh
              key={idx}
              position={[Math.cos(angle) * 1.36, Math.sin(angle) * 1.36, 0]}
              material={materials.hairlineSeam}
            >
              <sphereGeometry args={[0.025, 8, 8]} />
            </mesh>
          )
        )}
      </group>
    </group>
  );
}
