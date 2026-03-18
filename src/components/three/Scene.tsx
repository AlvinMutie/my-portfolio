"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { MorphingGeometry } from "./MorphingGeometry";
import { Environment, Float } from "@react-three/drei";

export default function Scene() {
  return (
    <div className="fixed inset-0 -z-20 h-screen w-full bg-[#0B0D0F]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#AEC6FF" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#DBC0E5" />
          
          <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <MorphingGeometry />
          </Float>

          <Environment preset="city" />
        </Suspense>
      </Canvas>
      {/* Cinematic Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.5)_100%)] pointer-events-none" />
    </div>
  );
}
