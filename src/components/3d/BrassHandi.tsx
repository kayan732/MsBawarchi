"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Procedural brass handi built with a LatheGeometry profile. The curve
 * approximates the silhouette of a hand-hammered Indian cooking pot:
 * a wide belly, narrow neck, rolled rim, with two small handle nubs.
 * Surface is given a hand-hammered patina by sampling a noise function
 * onto vertex displacement.
 */
export function BrassHandi({
  groupRef,
}: {
  groupRef?: React.MutableRefObject<THREE.Group | null>;
}) {
  const localRef = useRef<THREE.Group>(null);
  const ref = groupRef ?? localRef;
  const steamRef = useRef<THREE.Group>(null);

  const profile = useMemo(() => {
    const points: THREE.Vector2[] = [];
    // bottom -> belly -> shoulder -> neck -> rim
    points.push(new THREE.Vector2(0.0, -0.95));
    points.push(new THREE.Vector2(0.55, -0.9));
    points.push(new THREE.Vector2(0.95, -0.55));
    points.push(new THREE.Vector2(1.1, -0.15));
    points.push(new THREE.Vector2(1.05, 0.25));
    points.push(new THREE.Vector2(0.9, 0.5));
    points.push(new THREE.Vector2(0.85, 0.6));
    points.push(new THREE.Vector2(0.95, 0.7));
    points.push(new THREE.Vector2(0.95, 0.78));
    points.push(new THREE.Vector2(0.85, 0.78));
    points.push(new THREE.Vector2(0.85, 0.65));
    return points;
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.LatheGeometry(profile, 96);
    geo.computeVertexNormals();
    // Hand-hammered patina: subtle radial bumps
    const pos = geo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      const angle = Math.atan2(z, x);
      const radius = Math.hypot(x, z);
      const ripple =
        Math.sin(angle * 18 + y * 12) * 0.006 +
        Math.cos(angle * 7 - y * 9) * 0.004;
      const newRadius = radius + ripple;
      pos.setX(i, Math.cos(angle) * newRadius);
      pos.setZ(i, Math.sin(angle) * newRadius);
    }
    geo.computeVertexNormals();
    return geo;
  }, [profile]);

  // Soft idle bob + Y-axis rotation
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.18;
    ref.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.6) * 0.04 - 0.05;
    if (steamRef.current) {
      steamRef.current.children.forEach((puff, i) => {
        const t = state.clock.elapsedTime * 0.7 + i * 1.7;
        puff.position.y = 1.0 + ((t * 0.4) % 1.6);
        const opacity = 1 - ((t * 0.4) % 1.6) / 1.6;
        const mat = (puff as THREE.Mesh).material as THREE.MeshBasicMaterial;
        mat.opacity = 0.18 * opacity;
        puff.scale.setScalar(0.5 + ((t * 0.4) % 1.6) * 0.6);
      });
    }
  });

  return (
    <group ref={ref} position={[0, 0, 0]}>
      {/* Main handi body */}
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshPhysicalMaterial
          color={"#C58A2E"}
          metalness={1}
          roughness={0.32}
          clearcoat={0.4}
          clearcoatRoughness={0.6}
          envMapIntensity={1.2}
          reflectivity={0.9}
        />
      </mesh>

      {/* Inner darkness — interior cup so you can sense the steam volume */}
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.78, 0.78, 0.05, 64, 1, true]} />
        <meshStandardMaterial color="#1a0e04" side={THREE.DoubleSide} />
      </mesh>

      {/* Handles — small brass nubs at 9 and 3 o'clock */}
      {[Math.PI / 2, -Math.PI / 2].map((a, i) => (
        <mesh
          key={i}
          rotation={[0, a, 0]}
          position={[Math.cos(a) * 1.0, 0.3, Math.sin(a) * 1.0]}
        >
          <torusGeometry args={[0.12, 0.035, 16, 32]} />
          <meshPhysicalMaterial
            color="#B8862F"
            metalness={1}
            roughness={0.45}
          />
        </mesh>
      ))}

      {/* Steam puffs rising from the open top */}
      <group ref={steamRef}>
        {Array.from({ length: 5 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              (Math.random() - 0.5) * 0.4,
              0.9 + i * 0.25,
              (Math.random() - 0.5) * 0.4,
            ]}
          >
            <sphereGeometry args={[0.22, 16, 12]} />
            <meshBasicMaterial
              color="#F5EDD9"
              transparent
              opacity={0.12}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
