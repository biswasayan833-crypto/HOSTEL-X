"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export interface CitadelModelProps {
  scrollProgress: number;
  deconstructProgress?: number;
  selectedFloor?: number | null;
  sector07Focused?: boolean;
  isFinale?: boolean;
  theme?: "dark" | "light";
}

interface PodDefinition {
  id: string;
  level: number;
  basePos: [number, number, number];
  size: [number, number, number];
  normal: [number, number]; // [nx, nz] vector for deconstruction expansion
  isSector07?: boolean;
}

export function CitadelModel({
  scrollProgress,
  deconstructProgress = 0,
  selectedFloor = null,
  sector07Focused = false,
  isFinale = false,
  theme = "dark",
}: CitadelModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const beaconLightRef = useRef<THREE.PointLight>(null);
  const sector07LightRef = useRef<THREE.PointLight>(null);
  const floorPlatesRef = useRef<Array<THREE.Group | null>>([]);
  const podsRef = useRef<Array<THREE.Group | null>>([]);
  const pylonsRef = useRef<Array<THREE.Mesh | null>>([]);

  const isLight = theme === "light";

  // Controlled, premium material palette (supports Dark and Architectural Light Mode)
  const materials = useMemo(() => {
    if (isLight) {
      return {
        darkCarbon: new THREE.MeshStandardMaterial({
          color: new THREE.Color("#E2E8F0"),
          roughness: 0.9,
          metalness: 0.1,
        }),
        coreSpine: new THREE.MeshStandardMaterial({
          color: new THREE.Color("#CBD5E1"),
          roughness: 0.75,
          metalness: 0.3,
        }),
        structuralPylon: new THREE.MeshStandardMaterial({
          color: new THREE.Color("#CBD5E1"),
          roughness: 0.7,
          metalness: 0.3,
        }),
        floorPlate: new THREE.MeshStandardMaterial({
          color: new THREE.Color("#F8FAFC"),
          roughness: 0.8,
          metalness: 0.15,
        }),
        floorPlateActive: new THREE.MeshStandardMaterial({
          color: new THREE.Color("#E2E8F0"),
          roughness: 0.5,
          metalness: 0.4,
        }),
        recessedCyan: new THREE.MeshStandardMaterial({
          color: new THREE.Color("#0284C7"),
          emissive: new THREE.Color("#0284C7"),
          emissiveIntensity: 0.45,
          roughness: 0.25,
        }),
        recessedCyanActive: new THREE.MeshStandardMaterial({
          color: new THREE.Color("#0284C7"),
          emissive: new THREE.Color("#0284C7"),
          emissiveIntensity: 1.2,
          roughness: 0.15,
        }),
        glassPane: new THREE.MeshStandardMaterial({
          color: new THREE.Color("#E0F2FE"),
          roughness: 0.15,
          metalness: 0.7,
          transparent: true,
          opacity: 0.55,
        }),
        sector07Glass: new THREE.MeshStandardMaterial({
          color: new THREE.Color("#0284C7"),
          emissive: new THREE.Color("#0284C7"),
          emissiveIntensity: 0.4,
          roughness: 0.15,
          metalness: 0.8,
          transparent: true,
          opacity: 0.7,
        }),
        edgeLine: new THREE.LineBasicMaterial({
          color: new THREE.Color("#64748B"),
          transparent: true,
          opacity: 0.35,
        }),
        edgeLineActive: new THREE.LineBasicMaterial({
          color: new THREE.Color("#0284C7"),
          transparent: true,
          opacity: 0.75,
        }),
      };
    }

    return {
      darkCarbon: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#080A0E"),
        roughness: 0.85,
        metalness: 0.25,
      }),
      coreSpine: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#0B0E14"),
        roughness: 0.7,
        metalness: 0.4,
      }),
      structuralPylon: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#161A24"),
        roughness: 0.6,
        metalness: 0.5,
      }),
      floorPlate: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#10141D"),
        roughness: 0.65,
        metalness: 0.35,
      }),
      floorPlateActive: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#1A2433"),
        roughness: 0.4,
        metalness: 0.7,
      }),
      recessedCyan: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#00F2FE"),
        emissive: new THREE.Color("#00F2FE"),
        emissiveIntensity: 0.8,
        roughness: 0.2,
      }),
      recessedCyanActive: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#00F2FE"),
        emissive: new THREE.Color("#00F2FE"),
        emissiveIntensity: 2.4,
        roughness: 0.1,
      }),
      glassPane: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#03141F"),
        roughness: 0.1,
        metalness: 0.95,
        transparent: true,
        opacity: 0.8,
      }),
      sector07Glass: new THREE.MeshStandardMaterial({
        color: new THREE.Color("#00F2FE"),
        emissive: new THREE.Color("#00F2FE"),
        emissiveIntensity: 0.4,
        roughness: 0.1,
        metalness: 0.9,
        transparent: true,
        opacity: 0.85,
      }),
      edgeLine: new THREE.LineBasicMaterial({
        color: new THREE.Color("#252C3A"),
        transparent: true,
        opacity: 0.6,
      }),
      edgeLineActive: new THREE.LineBasicMaterial({
        color: new THREE.Color("#00F2FE"),
        transparent: true,
        opacity: 0.9,
      }),
    };
  }, [isLight]);

  // 12 Defined Architectural Floor Plates (Level 01 to Level 48)
  const floorLevels = useMemo(() => {
    return [
      { level: 1, y: -4.0, width: 4.8, depth: 4.8, label: "LEVEL 01 // INGRESS" },
      { level: 5, y: -3.2, width: 4.4, depth: 4.4, label: "LEVEL 05" },
      { level: 9, y: -2.4, width: 4.0, depth: 4.2, label: "LEVEL 09" },
      { level: 14, y: -1.6, width: 4.4, depth: 4.6, label: "LEVEL 14 // MESS HUB" },
      { level: 18, y: -0.8, width: 3.8, depth: 3.8, label: "LEVEL 18" },
      { level: 23, y: 0.0, width: 4.2, depth: 4.0, label: "LEVEL 23" },
      { level: 28, y: 0.8, width: 4.6, depth: 4.4, label: "LEVEL 28 // SECTOR 07" },
      { level: 32, y: 1.6, width: 4.0, depth: 4.2, label: "LEVEL 32" },
      { level: 37, y: 2.4, width: 3.6, depth: 3.6, label: "LEVEL 37" },
      { level: 42, y: 3.2, width: 4.4, depth: 4.2, label: "LEVEL 42 // SKY ATRIUM" },
      { level: 45, y: 4.0, width: 3.4, depth: 3.4, label: "LEVEL 45" },
      { level: 48, y: 4.8, width: 3.0, depth: 3.0, label: "LEVEL 48 // APEX" },
    ];
  }, []);

  // 16 Detailed Living Pod Modules across different quadrants & heights
  const pods: PodDefinition[] = useMemo(() => {
    return [
      // Base Tier Living Modules (Levels 05 - 12)
      { id: "pod-1", level: 5, basePos: [1.3, -3.2, 0.4], size: [1.2, 0.7, 1.2], normal: [1, 0] },
      { id: "pod-2", level: 5, basePos: [-1.4, -3.2, -0.3], size: [1.3, 0.7, 1.1], normal: [-1, 0] },
      { id: "pod-3", level: 9, basePos: [0.3, -2.4, 1.4], size: [1.1, 0.65, 1.3], normal: [0, 1] },
      { id: "pod-4", level: 9, basePos: [-0.4, -2.4, -1.3], size: [1.2, 0.65, 1.2], normal: [0, -1] },

      // Mid Tier Cantilevers & Mess Zone (Levels 14 - 23)
      { id: "pod-5", level: 14, basePos: [1.5, -1.6, 0.5], size: [1.5, 0.65, 1.3], normal: [1, 0.3] },
      { id: "pod-6", level: 14, basePos: [-1.6, -1.6, -0.4], size: [1.4, 0.65, 1.4], normal: [-1, -0.3] },
      { id: "pod-7", level: 18, basePos: [0.4, -0.8, -1.5], size: [1.2, 0.6, 1.3], normal: [0.2, -1] },
      { id: "pod-8", level: 23, basePos: [-1.5, 0.0, 0.6], size: [1.4, 0.6, 1.2], normal: [-1, 0.3] },

      // SECTOR 07 Primary Habitation Cluster (Levels 28 - 32)
      { id: "pod-9", level: 28, basePos: [1.6, 0.8, 0.2], size: [1.7, 0.75, 1.4], normal: [1, 0], isSector07: true },
      { id: "pod-10", level: 28, basePos: [-1.5, 0.8, -0.5], size: [1.5, 0.75, 1.3], normal: [-1, -0.2], isSector07: true },
      { id: "pod-11", level: 28, basePos: [0.2, 0.8, 1.6], size: [1.3, 0.75, 1.5], normal: [0, 1], isSector07: true },
      { id: "pod-12", level: 32, basePos: [1.4, 1.6, -0.6], size: [1.3, 0.65, 1.2], normal: [1, -0.4] },

      // Upper Sky Observation Modules (Levels 37 - 45)
      { id: "pod-13", level: 37, basePos: [-1.3, 2.4, 0.3], size: [1.2, 0.55, 1.1], normal: [-1, 0] },
      { id: "pod-14", level: 37, basePos: [0.5, 2.4, -1.3], size: [1.1, 0.55, 1.2], normal: [0, -1] },
      { id: "pod-15", level: 42, basePos: [1.2, 3.2, 0.4], size: [1.3, 0.6, 1.2], normal: [1, 0.2] },
      { id: "pod-16", level: 45, basePos: [-1.0, 4.0, -0.2], size: [1.0, 0.5, 1.0], normal: [-1, 0] },
    ];
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    // Idle organic float and subtle yaw
    const idleY = Math.sin(time * 0.45) * 0.05;
    const idleRotY = time * 0.025;

    // Scroll progress driven rotation & tilt
    const targetRotY = idleRotY + scrollProgress * 0.95;
    const targetRotX = -0.03 + scrollProgress * 0.12;
    const targetY = -0.15 + idleY + scrollProgress * 0.25;

    // Smooth lerp for main group
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.06);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.06);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.06);

    // Architectural Deconstruction Animators:
    // 1. Vertical Floor Plate Separation (Stages 3 & 4)
    floorLevels.forEach((plate, i) => {
      const plateGroup = floorPlatesRef.current[i];
      if (!plateGroup) return;
      // Expand along Y proportional to base Y
      const verticalExpansion = plate.y * (1 + deconstructProgress * 0.35);
      plateGroup.position.y = THREE.MathUtils.lerp(plateGroup.position.y, verticalExpansion, 0.08);
    });

    // 2. Pod Modular Horizontal Ejection (Stage 4 & 5)
    pods.forEach((pod, i) => {
      const podGroup = podsRef.current[i];
      if (!podGroup) return;
      const ejectFactor = deconstructProgress * 1.5;
      const targetX = pod.basePos[0] + pod.normal[0] * ejectFactor;
      const targetZ = pod.basePos[2] + pod.normal[1] * ejectFactor;
      const targetY = pod.basePos[1] * (1 + deconstructProgress * 0.35);

      podGroup.position.x = THREE.MathUtils.lerp(podGroup.position.x, targetX, 0.08);
      podGroup.position.y = THREE.MathUtils.lerp(podGroup.position.y, targetY, 0.08);
      podGroup.position.z = THREE.MathUtils.lerp(podGroup.position.z, targetZ, 0.08);
    });

    // 3. Structural Perimeter Pylons Slide Outward (Stage 2)
    pylonsRef.current.forEach((pylon, i) => {
      if (!pylon) return;
      const pylonNormals = [
        [-0.95, -0.95],
        [0.95, -0.95],
        [-0.95, 0.95],
        [0.95, 0.95],
      ];
      const pNorm = pylonNormals[i];
      const pylonEject = deconstructProgress * 0.5;
      pylon.position.x = THREE.MathUtils.lerp(pylon.position.x, pNorm[0] * (1 + pylonEject), 0.08);
      pylon.position.z = THREE.MathUtils.lerp(pylon.position.z, pNorm[1] * (1 + pylonEject), 0.08);
    });

    // 4. Pulsing Beacon
    if (beaconLightRef.current) {
      beaconLightRef.current.intensity = isFinale
        ? 3.2 + Math.sin(time * 4.0) * 1.5
        : 1.0 + Math.sin(time * 3.0) * 0.8;
    }

    // 5. Sector 07 Focal Light
    if (sector07LightRef.current) {
      const isTargeted = sector07Focused || deconstructProgress > 0.65 || isFinale;
      const targetIntensity = isFinale ? 4.8 : isTargeted ? 3.5 : 1.2;
      sector07LightRef.current.intensity = THREE.MathUtils.lerp(
        sector07LightRef.current.intensity,
        targetIntensity,
        0.05
      );
    }

    // 6. Scroll-Aware & Finale Conduit Edge Lighting
    const scrollVel = typeof window !== "undefined" ? Math.abs((window as any).__HOSTEL_VELOCITY__ || 0) : 0;
    const velocityGlow = Math.min(scrollVel * 0.2, 0.9);
    const targetGlow = isFinale ? 2.2 + Math.sin(time * 2.0) * 0.4 : 0.8 + velocityGlow;
    materials.recessedCyan.emissiveIntensity = THREE.MathUtils.lerp(
      materials.recessedCyan.emissiveIntensity,
      targetGlow,
      0.08
    );
  });

  return (
    <group ref={groupRef} position={[0.5, -0.15, 0]}>
      {/* ──────────────────────────────────────────────────────────
          01. CENTRAL STRUCTURAL SPINE & MECHANICAL SHAFTS
          ────────────────────────────────────────────────────────── */}
      {/* Core load-bearing pillar */}
      <mesh position={[0, 0.4, 0]} material={materials.coreSpine}>
        <boxGeometry args={[1.7, 10.8, 1.7]} />
      </mesh>

      {/* Recessed vertical conduit channels (Cyan glowing seams) */}
      <mesh position={[0, 0.4, 0.86]} material={materials.recessedCyan}>
        <boxGeometry args={[0.08, 10.4, 0.02]} />
      </mesh>
      <mesh position={[0, 0.4, -0.86]} material={materials.recessedCyan}>
        <boxGeometry args={[0.08, 10.4, 0.02]} />
      </mesh>
      <mesh position={[0.86, 0.4, 0]} material={materials.recessedCyan}>
        <boxGeometry args={[0.02, 10.4, 0.08]} />
      </mesh>
      <mesh position={[-0.86, 0.4, 0]} material={materials.recessedCyan}>
        <boxGeometry args={[0.02, 10.4, 0.08]} />
      </mesh>

      {/* 4 Heavy Outer Structural Pylons (Separating in Stage 2) */}
      {[
        [-0.95, -0.95],
        [0.95, -0.95],
        [-0.95, 0.95],
        [0.95, 0.95],
      ].map(([px, pz], idx) => (
        <mesh
          key={idx}
          ref={(el) => {
            pylonsRef.current[idx] = el;
          }}
          position={[px, 0.4, pz]}
          material={materials.structuralPylon}
        >
          <boxGeometry args={[0.26, 11.2, 0.26]} />
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(0.26, 11.2, 0.26)]} />
            <primitive object={materials.edgeLine} />
          </lineSegments>
        </mesh>
      ))}

      {/* ──────────────────────────────────────────────────────────
          02. 12 ARCHITECTURAL FLOOR PLATES (Vertical deconstruction)
          ────────────────────────────────────────────────────────── */}
      {floorLevels.map((plate, i) => {
        const isSelected = selectedFloor === plate.level;
        return (
          <group
            key={plate.level}
            ref={(el) => {
              floorPlatesRef.current[i] = el;
            }}
            position={[0, plate.y, 0]}
          >
            {/* Primary Cantilevered Concrete/Carbon Slab */}
            <mesh material={isSelected ? materials.floorPlateActive : materials.floorPlate}>
              <boxGeometry args={[plate.width, 0.1, plate.depth]} />
            </mesh>

            {/* Recessed Lighting Perimeter Strip on Underside */}
            <mesh
              position={[0, -0.055, 0]}
              material={isSelected ? materials.recessedCyanActive : materials.recessedCyan}
            >
              <boxGeometry args={[plate.width * 0.96, 0.015, plate.depth * 0.96]} />
            </mesh>

            {/* Precision Structural Edge Trims */}
            <lineSegments>
              <edgesGeometry args={[new THREE.BoxGeometry(plate.width, 0.1, plate.depth)]} />
              <primitive object={isSelected ? materials.edgeLineActive : materials.edgeLine} />
            </lineSegments>
          </group>
        );
      })}

      {/* ──────────────────────────────────────────────────────────
          03. DETAILED LIVING POD MODULES (Horizontal ejection)
          ────────────────────────────────────────────────────────── */}
      {pods.map((pod, i) => {
        const isSector07 = pod.isSector07;
        return (
          <group
            key={pod.id}
            ref={(el) => {
              podsRef.current[i] = el;
            }}
            position={pod.basePos}
          >
            {/* Pod Exoskeleton Chassis */}
            <mesh material={materials.darkCarbon}>
              <boxGeometry args={pod.size} />
            </mesh>

            {/* Recessed Balcony / Opening Void */}
            <mesh
              position={[
                pod.normal[0] * (pod.size[0] * 0.25),
                0,
                pod.normal[1] * (pod.size[2] * 0.25),
              ]}
              material={materials.coreSpine}
            >
              <boxGeometry
                args={[
                  pod.size[0] * (pod.normal[0] !== 0 ? 0.45 : 0.75),
                  pod.size[1] * 0.65,
                  pod.size[2] * (pod.normal[1] !== 0 ? 0.45 : 0.75),
                ]}
              />
            </mesh>

            {/* Smart Glass Panoramic Window */}
            <mesh
              position={[
                pod.normal[0] * (pod.size[0] * 0.5 + 0.01),
                0.05,
                pod.normal[1] * (pod.size[2] * 0.5 + 0.01),
              ]}
              material={isSector07 ? materials.sector07Glass : materials.glassPane}
            >
              <boxGeometry
                args={[
                  pod.normal[0] !== 0 ? 0.02 : pod.size[0] * 0.7,
                  pod.size[1] * 0.5,
                  pod.normal[1] !== 0 ? 0.02 : pod.size[2] * 0.7,
                ]}
              />
            </mesh>

            {/* Thin Glowing Biometric Status Strip */}
            <mesh
              position={[
                pod.normal[0] * (pod.size[0] * 0.5 + 0.015),
                -pod.size[1] * 0.32,
                pod.normal[1] * (pod.size[2] * 0.5 + 0.015),
              ]}
              material={materials.recessedCyan}
            >
              <boxGeometry
                args={[
                  pod.normal[0] !== 0 ? 0.02 : pod.size[0] * 0.6,
                  0.03,
                  pod.normal[1] !== 0 ? 0.02 : pod.size[2] * 0.6,
                ]}
              />
            </mesh>

            {/* Structural Edge Outlines */}
            <lineSegments>
              <edgesGeometry args={[new THREE.BoxGeometry(...pod.size)]} />
              <primitive
                object={
                  isSector07 && sector07Focused
                    ? materials.edgeLineActive
                    : materials.edgeLine
                }
              />
            </lineSegments>
          </group>
        );
      })}

      {/* ──────────────────────────────────────────────────────────
          04. SECTOR 07 // SUSPENDED SKYBRIDGE & ATRIUM (Level 28)
          ────────────────────────────────────────────────────────── */}
      <group position={[0.3, 0.8, 0.6]}>
        {/* Double-Height Glass Atrium Body */}
        <mesh material={materials.sector07Glass}>
          <boxGeometry args={[2.2, 1.1, 1.2]} />
        </mesh>

        {/* Structural Space-frame Trusses */}
        <mesh position={[0, -0.52, 0]} material={materials.structuralPylon}>
          <boxGeometry args={[2.4, 0.08, 1.4]} />
        </mesh>
        <mesh position={[0, 0.52, 0]} material={materials.structuralPylon}>
          <boxGeometry args={[2.4, 0.08, 1.4]} />
        </mesh>

        {/* Diagonal Structural Tension Cables */}
        <mesh position={[-1.0, 0, 0.65]} rotation={[0, 0, 0.5]} material={materials.structuralPylon}>
          <cylinderGeometry args={[0.02, 0.02, 1.3, 8]} />
        </mesh>
        <mesh position={[1.0, 0, 0.65]} rotation={[0, 0, -0.5]} material={materials.structuralPylon}>
          <cylinderGeometry args={[0.02, 0.02, 1.3, 8]} />
        </mesh>

        {/* Interior Core Emitter */}
        <pointLight
          ref={sector07LightRef}
          position={[0, 0, 0]}
          color="#00F2FE"
          intensity={1.8}
          distance={5.0}
        />
      </group>

      {/* ──────────────────────────────────────────────────────────
          05. APEX TRANSMISSION MAST & COMMUNICATIONS BEACON
          ────────────────────────────────────────────────────────── */}
      <group position={[0, 5.0, 0]}>
        {/* Tiered structural base */}
        <mesh position={[0, 0.2, 0]} material={materials.structuralPylon}>
          <cylinderGeometry args={[0.2, 0.4, 0.5, 8]} />
        </mesh>
        {/* Stepped lattice spire */}
        <mesh position={[0, 0.8, 0]} material={materials.coreSpine}>
          <cylinderGeometry args={[0.06, 0.16, 1.2, 8]} />
        </mesh>
        {/* High-frequency transmitter needle */}
        <mesh position={[0, 1.6, 0]} material={materials.structuralPylon}>
          <cylinderGeometry args={[0.015, 0.04, 0.8, 8]} />
        </mesh>
        {/* Glowing Beacon Sphere */}
        <mesh position={[0, 2.05, 0]} material={materials.recessedCyanActive}>
          <sphereGeometry args={[0.07, 16, 16]} />
        </mesh>
        {/* Beacon Point Light */}
        <pointLight
          ref={beaconLightRef}
          position={[0, 2.05, 0]}
          color="#00F2FE"
          intensity={1.5}
          distance={4.0}
        />
      </group>

      {/* ──────────────────────────────────────────────────────────
          06. SUBTERRANEAN INGRESS PODIUM & LIGHT TROUGHS (Level 01)
          ────────────────────────────────────────────────────────── */}
      <group position={[0, -4.6, 0]}>
        {/* Level 01 Plaza Plinth */}
        <mesh material={materials.coreSpine}>
          <boxGeometry args={[5.8, 0.4, 5.8]} />
        </mesh>
        {/* Sub-surface foundation plinth */}
        <mesh position={[0, -0.3, 0]} material={materials.darkCarbon}>
          <boxGeometry args={[7.2, 0.3, 7.2]} />
        </mesh>
        {/* Perimeter glowing light trough */}
        <mesh position={[0, 0.21, 0]} material={materials.recessedCyan}>
          <boxGeometry args={[5.6, 0.02, 5.6]} />
        </mesh>
      </group>
    </group>
  );
}
