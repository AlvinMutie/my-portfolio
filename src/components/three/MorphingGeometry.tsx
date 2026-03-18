"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MeshDistortMaterial } from "@react-three/drei";
import { useStore } from "@/lib/store";

export function MorphingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const progress = useStore((state) => state.progress);
  const currentSection = useStore((state) => state.currentSection);
  const mouse = useStore((state) => state.mouse);

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Idling movement + Cursor tracking (Using store mouse)
    const targetRotX = -mouse.y * 0.4 + Math.sin(time * 0.2) * 0.1;
    const targetRotY = mouse.x * 0.4 + Math.cos(time * 0.3) * 0.1;
    
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, 0.05);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, 0.05);

    // Subtle position follow
    const targetPosX = mouse.x * 0.5;
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetPosX, 0.05);

    // React to scroll progress
    // Map 0 -> 1 to 0 -> -3.5 (Bottom rest)
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, -progress * 3.5 - (mouse.y * 0.2), 0.05);
    meshRef.current.rotation.z = progress * Math.PI * 2;
    
    // Morph distortion based on section
    const targetDistort = currentSection === 1 ? 0.8 : 0.4;
    const targetSpeed = currentSection === 1 ? 5 : 2;
    
    materialRef.current.distort = THREE.MathUtils.lerp(materialRef.current.distort, targetDistort, 0.05);
    materialRef.current.speed = THREE.MathUtils.lerp(materialRef.current.speed, targetSpeed, 0.05);
    
    // Pulse on activity
    const pulse = Math.sin(time * 10) * 0.02 * progress;
    meshRef.current.scale.setScalar(1.5 + pulse);
  });

  return (
    <mesh ref={meshRef} scale={1.5}>
      <icosahedronGeometry args={[1, 15]} />
      <MeshDistortMaterial
        ref={materialRef}
        color="#AEC6FF"
        speed={2}
        distort={0.4}
        radius={1}
        emissive="#12448F"
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}
