"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useStore } from "@/lib/store";
import { MeshDistortMaterial, Float } from "@react-three/drei";

export default function TechOrb() {
  const meshRef = useRef<THREE.Points>(null);
  const auraRef = useRef<THREE.Mesh>(null);
  const mouse = useStore((state) => state.mouse);
  const currentSection = useStore((state) => state.currentSection);

  // Generate particles
  const particlesCount = 2000;
  const positions = new Float32Array(particlesCount * 3);
  for (let i = 0; i < particlesCount; i++) {
    const phi = Math.acos(-1 + (2 * i) / particlesCount);
    const theta = Math.sqrt(particlesCount * Math.PI) * phi;
    positions[i * 3] = Math.cos(theta) * Math.sin(phi) * 1.5;
    positions[i * 3 + 1] = Math.sin(theta) * Math.sin(phi) * 1.5;
    positions[i * 3 + 2] = Math.cos(phi) * 1.5;
  }

  useFrame((state) => {
    if (!meshRef.current || !auraRef.current) return;
    const time = state.clock.getElapsedTime();

    meshRef.current.rotation.y = time * 0.1;
    auraRef.current.rotation.y = -time * 0.05;
    
    // Scale tracking - Increased base scale and widened active scale
    const isExperience = currentSection === 2;
    const targetScale = isExperience ? 2.5 : 1.2;
    const lerpFactor = isExperience ? 0.03 : 0.01; // Slower return to normal
    
    const s = THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, lerpFactor);
    meshRef.current.scale.set(s, s, s);
    auraRef.current.scale.set(s * 1.1, s * 1.1, s * 1.1);

    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -mouse.y * 0.5, 0.05);
    meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, mouse.x * 0.5, 0.05);

    // Dynamic visibility
    const mat = meshRef.current.material as THREE.PointsMaterial;
    mat.opacity = THREE.MathUtils.lerp(mat.opacity, isExperience ? 1.0 : 0.3, 0.05);
    
    const auraMat = auraRef.current.material as any;
    auraMat.opacity = THREE.MathUtils.lerp(auraMat.opacity, currentSection === 2 ? 0.15 : 0.05, 0.05);
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <points ref={meshRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[positions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.02}
            color="#AEC6FF"
            transparent
            opacity={0.4}
            sizeAttenuation
            blending={THREE.AdditiveBlending}
          />
        </points>
        
        <mesh ref={auraRef}>
          <sphereGeometry args={[1.5, 32, 32]} />
          <MeshDistortMaterial
            color="#AEC6FF"
            speed={2}
            distort={0.4}
            transparent
            opacity={0.1}
            wireframe
          />
        </mesh>
      </Float>
      
      <pointLight position={[5, 5, 5]} intensity={1} color="#AEC6FF" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#4A90E2" />
    </group>
  );
}
