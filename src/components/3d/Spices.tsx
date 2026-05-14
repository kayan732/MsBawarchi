"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type Particle = {
  radius: number;
  height: number;
  angle: number;
  speed: number;
  tilt: number;
  scale: number;
  kind: "chili" | "anise" | "cardamom" | "leaf" | "seed" | "turmeric";
};

const PALETTE: Record<Particle["kind"], string> = {
  chili: "#C84B31",
  anise: "#8B6420",
  cardamom: "#4A7C3A",
  leaf: "#4A7C3A",
  seed: "#E8A33D",
  turmeric: "#FFB347",
};

function makeParticles(count: number): Particle[] {
  const kinds: Particle["kind"][] = [
    "chili",
    "anise",
    "cardamom",
    "leaf",
    "seed",
    "turmeric",
  ];
  return Array.from({ length: count }).map((_, i) => ({
    radius: 1.7 + Math.random() * 1.6,
    height: (Math.random() - 0.5) * 2.6,
    angle: Math.random() * Math.PI * 2,
    speed: 0.05 + Math.random() * 0.12,
    tilt: Math.random() * Math.PI,
    scale: 0.6 + Math.random() * 0.9,
    kind: kinds[i % kinds.length],
  }));
}

/**
 * Orbiting spices around the brass handi. Each kind has a small,
 * recognisable primitive: chilies as elongated cones, anise as flat
 * stars, cardamom as ribbed ovoids, curry leaves as flat planes,
 * mustard seeds as tiny spheres, turmeric clouds as soft sprites.
 */
export function Spices({
  count = 28,
  mouseRef,
}: {
  count?: number;
  mouseRef?: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const particles = useMemo(() => makeParticles(count), [count]);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const mx = mouseRef?.current.x ?? 0;
    const my = mouseRef?.current.y ?? 0;
    groupRef.current.rotation.y += delta * 0.06;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      my * 0.15,
      0.04,
    );
    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      mx * 0.25,
      0.04,
    );

    groupRef.current.children.forEach((child, i) => {
      const p = particles[i];
      if (!p) return;
      p.angle += delta * p.speed;
      const x = Math.cos(p.angle) * p.radius;
      const z = Math.sin(p.angle) * p.radius;
      const y =
        p.height + Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.12;
      child.position.set(x, y, z);
      child.rotation.x += delta * 0.4;
      child.rotation.y += delta * 0.3;
    });
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <Spice key={i} particle={p} />
      ))}
    </group>
  );
}

function Spice({ particle: p }: { particle: Particle }) {
  const color = PALETTE[p.kind];

  switch (p.kind) {
    case "chili":
      return (
        <mesh scale={p.scale * 0.7}>
          <coneGeometry args={[0.07, 0.4, 12]} />
          <meshStandardMaterial
            color={color}
            roughness={0.5}
            metalness={0.05}
            emissive={"#3a0e08"}
            emissiveIntensity={0.25}
          />
        </mesh>
      );
    case "anise":
      return (
        <mesh scale={p.scale * 0.45}>
          <dodecahedronGeometry args={[0.16]} />
          <meshStandardMaterial
            color={color}
            roughness={0.6}
            metalness={0.2}
          />
        </mesh>
      );
    case "cardamom":
      return (
        <mesh scale={[p.scale * 0.18, p.scale * 0.3, p.scale * 0.18]}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial color={color} roughness={0.7} />
        </mesh>
      );
    case "leaf":
      return (
        <mesh scale={p.scale * 0.55} rotation={[0, 0, p.tilt]}>
          <planeGeometry args={[0.3, 0.12]} />
          <meshStandardMaterial
            color={color}
            side={THREE.DoubleSide}
            roughness={0.85}
          />
        </mesh>
      );
    case "seed":
      return (
        <mesh scale={p.scale * 0.18}>
          <sphereGeometry args={[0.2, 10, 8]} />
          <meshStandardMaterial
            color={color}
            metalness={0.3}
            roughness={0.45}
          />
        </mesh>
      );
    case "turmeric":
      return (
        <mesh scale={p.scale * 1.1}>
          <sphereGeometry args={[0.18, 16, 12]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.22}
            depthWrite={false}
          />
        </mesh>
      );
  }
}
