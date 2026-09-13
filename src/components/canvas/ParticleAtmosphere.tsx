"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getScrollVelocity } from "@/lib/lenis-core";

interface ParticleAtmosphereProps {
  count?: number;
}

export function ParticleAtmosphere({ count = 180 }: ParticleAtmosphereProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const velocityFactorRef = useRef(0);

  // Generate random atmospheric coordinates across multi-depth planes
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const cyan = new THREE.Color("#00F2FE");
    const ghost = new THREE.Color("#8F99AE");

    for (let i = 0; i < count; i++) {
      // Multi-depth volumetric distribution around Citadel
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14;

      // Color mixing: predominantly ghost telemetry, periodic cyan bio-nodes
      const mixed = Math.random() > 0.82 ? cyan : ghost;
      col[i * 3] = mixed.r;
      col[i * 3 + 1] = mixed.g;
      col[i * 3 + 2] = mixed.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();

    // Fetch real-time Lenis velocity
    const currentVel = Math.abs(getScrollVelocity());
    const targetFactor = Math.min(currentVel * 0.15, 1.8);

    // Smooth lerp damping for velocity influence
    velocityFactorRef.current = THREE.MathUtils.lerp(
      velocityFactorRef.current,
      targetFactor,
      0.08
    );

    // Baseline atmospheric drift + velocity response
    const speed = 0.02 + velocityFactorRef.current * 0.04;
    pointsRef.current.rotation.y = time * speed;
    pointsRef.current.position.y =
      Math.sin(time * 0.25) * 0.15 - velocityFactorRef.current * 0.12;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.038}
        vertexColors
        transparent
        opacity={0.55}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
