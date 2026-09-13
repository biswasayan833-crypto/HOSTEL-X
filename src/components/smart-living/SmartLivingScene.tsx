"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { SubsystemId } from "@/data/smart-living-data";
import { BiometricPod } from "./BiometricPod";
import { NutritionHub } from "./NutritionHub";
import { KineticAtrium } from "./KineticAtrium";
import { PredictiveInfrastructure } from "./PredictiveInfrastructure";

interface SmartLivingSceneProps {
  activeSubsystem: SubsystemId;
  activeMode?: string;
  accentColor?: string;
}

// Camera choreography controller smoothly interpolating perspective per subsystem
function CameraController({ activeSubsystem }: { activeSubsystem: SubsystemId }) {
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });

  // Camera preset coordinates for each subsystem
  const targetPositions: Record<SubsystemId, THREE.Vector3> = {
    pod: new THREE.Vector3(0, 0.35, 4.0),
    nutrition: new THREE.Vector3(0.3, 1.4, 4.4),
    atrium: new THREE.Vector3(-0.2, 0.1, 4.8),
    infrastructure: new THREE.Vector3(0, 0.5, 4.6),
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      };
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    const target = targetPositions[activeSubsystem] || targetPositions.pod;
    const targetX = target.x + mouseRef.current.x * 0.3;
    const targetY = target.y + mouseRef.current.y * 0.2;
    const targetZ = target.z;

    // Smooth cinematic camera travel (damping: 0.05 ~0.8s transition)
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);

    camera.lookAt(0, 0, 0);
  });

  return null;
}

// Smooth transition wrapper preventing abrupt model popping
function TransitionWrapper({
  active,
  children,
}: {
  active: boolean;
  children: React.ReactNode;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    const targetScale = active ? 1 : 0.001;
    const targetY = active ? 0 : -0.4;

    groupRef.current.scale.x = THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.08);
    groupRef.current.scale.y = THREE.MathUtils.lerp(groupRef.current.scale.y, targetScale, 0.08);
    groupRef.current.scale.z = THREE.MathUtils.lerp(groupRef.current.scale.z, targetScale, 0.08);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.08);

    groupRef.current.visible = groupRef.current.scale.x > 0.01;
  });

  return (
    <group ref={groupRef} scale={[active ? 1 : 0.001, active ? 1 : 0.001, active ? 1 : 0.001]}>
      {children}
    </group>
  );
}

export function SmartLivingScene({
  activeSubsystem,
  activeMode,
  accentColor = "#00F2FE",
}: SmartLivingSceneProps) {
  return (
    <div
      data-cursor="3d"
      className="w-full h-full relative cursor-grab active:cursor-grabbing"
    >
      <Canvas
        camera={{ position: [0, 0.35, 4.2], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <CameraController activeSubsystem={activeSubsystem} />

        {/* Surgical Architectural Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 6, 4]} intensity={1.8} color="#FFFFFF" />
        <directionalLight position={[-5, -4, -3]} intensity={0.7} color={accentColor} />
        <pointLight position={[0, 3, 2]} intensity={0.8} color="#FFFFFF" />

        {/* Smooth Environmental Transitions between Subsystems */}
        <group>
          <TransitionWrapper active={activeSubsystem === "pod"}>
            <BiometricPod accentColor={accentColor} activeMode={activeMode} />
          </TransitionWrapper>

          <TransitionWrapper active={activeSubsystem === "nutrition"}>
            <NutritionHub accentColor={accentColor} activeMode={activeMode} />
          </TransitionWrapper>

          <TransitionWrapper active={activeSubsystem === "atrium"}>
            <KineticAtrium accentColor={accentColor} activeMode={activeMode} />
          </TransitionWrapper>

          <TransitionWrapper active={activeSubsystem === "infrastructure"}>
            <PredictiveInfrastructure accentColor={accentColor} activeMode={activeMode} />
          </TransitionWrapper>
        </group>
      </Canvas>
    </div>
  );
}
