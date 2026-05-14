"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import { Suspense, useEffect, useRef } from "react";
import { BrassHandi } from "./BrassHandi";
import { Spices } from "./Spices";
import { GodRays } from "./GodRays";

function ToneMapping() {
  const { gl } = useThree();
  useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.15;
    gl.outputColorSpace = THREE.SRGBColorSpace;
  }, [gl]);
  return null;
}

export function HeroScene() {
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <Canvas
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.8]}
      camera={{ position: [0, 0.3, 5.6], fov: 38, near: 0.1, far: 50 }}
      style={{ position: "absolute", inset: 0 }}
    >
      <ToneMapping />
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 6, 14]} />

      <ambientLight intensity={0.18} color="#5b3a14" />
      <directionalLight
        position={[4, 6, 3]}
        intensity={2.2}
        color="#FFB347"
        castShadow
      />
      <directionalLight
        position={[-5, -2, 2]}
        intensity={0.7}
        color="#2B5F75"
      />
      <pointLight position={[0, 0, 2.5]} intensity={1.1} color="#E8A33D" />

      <Suspense fallback={null}>
        <Environment preset="warehouse" environmentIntensity={0.45} />
        <BrassHandi />
        <Spices mouseRef={mouseRef} />
        <GodRays />
      </Suspense>
    </Canvas>
  );
}
