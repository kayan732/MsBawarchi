"use client";

import { useMemo } from "react";
import * as THREE from "three";

/**
 * Volumetric god-rays approximated as a stack of soft, additive cones.
 * Two casts: warm amber from upper-right (3200K), cool teal from
 * lower-left (5600K). Cheap, no post-processing pipeline required.
 */
export function GodRays() {
  const conesAmber = useMemo(
    () =>
      Array.from({ length: 5 }).map((_, i) => ({
        scale: 1 + i * 0.18,
        opacity: 0.07 - i * 0.012,
        offset: i * 0.05,
      })),
    [],
  );
  const conesTeal = useMemo(
    () =>
      Array.from({ length: 4 }).map((_, i) => ({
        scale: 1 + i * 0.22,
        opacity: 0.06 - i * 0.012,
        offset: i * 0.05,
      })),
    [],
  );

  return (
    <>
      {/* Amber cast from upper-right */}
      <group position={[4.5, 3.5, -2]} rotation={[Math.PI * 0.65, 0.3, -0.3]}>
        {conesAmber.map((c, i) => (
          <mesh key={i} position={[0, c.offset, 0]} scale={c.scale}>
            <coneGeometry args={[2.5, 8, 24, 1, true]} />
            <meshBasicMaterial
              color="#FFB347"
              transparent
              opacity={c.opacity}
              side={THREE.DoubleSide}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        ))}
      </group>
      {/* Teal rim from lower-left */}
      <group position={[-4, -3.5, -2]} rotation={[-Math.PI * 0.55, -0.3, 0.4]}>
        {conesTeal.map((c, i) => (
          <mesh key={i} position={[0, c.offset, 0]} scale={c.scale}>
            <coneGeometry args={[2, 6, 24, 1, true]} />
            <meshBasicMaterial
              color="#2B5F75"
              transparent
              opacity={c.opacity}
              side={THREE.DoubleSide}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        ))}
      </group>
    </>
  );
}
