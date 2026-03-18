"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Physics, RigidBody, CuboidCollider, RapierRigidBody, InstancedRigidBodies } from "@react-three/rapier";
import * as THREE from "three";
import { Float } from "@react-three/drei";

// Glowing Geometry Component
const count = 40;
function Objects() {
  const api = useRef<any>(null);
  
  // Randomize initial positions, rotations, colors, scales
  const instances = useMemo(() => {
    const list = [];
    for (let i = 0; i < count; i++) {
        list.push({
            key: "obj_" + i,
            position: [Math.random() * 8 - 4, Math.random() * 6 - 3, Math.random() * 2 - 1] as [number, number, number],
            rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [number, number, number],
            scale: [0.3 + Math.random() * 0.5, 0.3 + Math.random() * 0.5, 0.3 + Math.random() * 0.5] as [number, number, number],
            color: Math.random() > 0.5 ? '#AEC6FF' : '#DBC0E5',
            form: Math.random() > 0.5 ? 'box' : 'sphere',
        });
    }
    return list;
  }, []);

  return (
    <group>
        {instances.map((prop, i) => (
             <RigidBody 
               key={prop.key}
               colliders={prop.form === 'box' ? "cuboid" : "ball"} 
               position={prop.position} 
               rotation={prop.rotation} 
               restitution={1.2} 
               friction={0.1}
               gravityScale={0.1}
             >
                <mesh scale={prop.scale}>
                     {prop.form === 'box' ? <boxGeometry /> : <icosahedronGeometry args={[1, 1]} />}
                     <meshStandardMaterial 
                       color={prop.color} 
                       emissive={prop.color} 
                       emissiveIntensity={0.5} 
                       transparent 
                       opacity={0.8}
                       wireframe={Math.random() > 0.7}
                     />
                </mesh>
             </RigidBody>
        ))}
    </group>
  );
}

// Bounding box to keep objects inside the view
function Boundaries() {
    const { viewport } = useThree();
    const w = viewport.width;
    const h = viewport.height;
    const t = 1; // thickness

    return (
        <>
            {/* Floor */}
            <RigidBody type="fixed" position={[0, -h/2 - t/2, 0]}>
                <CuboidCollider args={[w/2, t/2, 2]} />
            </RigidBody>
            {/* Ceiling */}
            <RigidBody type="fixed" position={[0, h/2 + t/2, 0]}>
                <CuboidCollider args={[w/2, t/2, 2]} />
            </RigidBody>
            {/* Left Wall */}
            <RigidBody type="fixed" position={[-w/2 - t/2, 0, 0]}>
                <CuboidCollider args={[t/2, h/2, 2]} />
            </RigidBody>
            {/* Right Wall */}
            <RigidBody type="fixed" position={[w/2 + t/2, 0, 0]}>
                <CuboidCollider args={[t/2, h/2, 2]} />
            </RigidBody>
            {/* Front Wall (Glass) */}
            <RigidBody type="fixed" position={[0, 0, 1.5]}>
                <CuboidCollider args={[w/2, h/2, t/2]} />
            </RigidBody>
             {/* Back Wall */}
             <RigidBody type="fixed" position={[0, 0, -1.5]}>
                <CuboidCollider args={[w/2, h/2, t/2]} />
            </RigidBody>
        </>
    )
}

// Invisible Kinematic pointer that pushes objects
function Pointer() {
    const ref = useRef<RapierRigidBody>(null);
    const { viewport, mouse } = useThree();

    useFrame(({ mouse, viewport }) => {
        if (!ref.current) return;
        const x = (mouse.x * viewport.width) / 2;
        const y = (mouse.y * viewport.height) / 2;
        // Move the kinematic body to the mouse coordinates
        ref.current.setNextKinematicTranslation({ x, y, z: 0 });
    });

    return (
        <RigidBody type="kinematicPosition" ref={ref} colliders="ball" position={[0,0,0]}>
           <mesh>
               <sphereGeometry args={[1, 16, 16]} />
               <meshBasicMaterial color="white" transparent opacity={0.0} /> 
               {/* Keep opacity 0 to make it an invisible repulsor */}
           </mesh>
        </RigidBody>
    )
}


export default function PhysicsSandbox() {
    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div 
           className="relative w-full h-[60vh] md:h-[80vh] border-y border-white/5 bg-zinc-950/50 backdrop-blur-md overflow-hidden group cursor-crosshair"
           onPointerEnter={() => setIsHovered(true)}
           onPointerLeave={() => setIsHovered(false)}
        >
            {/* Game UI Overlay */}
            <div className="absolute inset-0 pointer-events-none z-10 flex flex-col items-center justify-center transition-opacity duration-500 max-w-2xl mx-auto px-6 text-center">
                <div className={`transition-all duration-700 ${isHovered ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}`}>
                    <h2 className="text-sm font-black uppercase tracking-[0.4em] text-primary mb-4"> / Playground </h2>
                    <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6 drop-shadow-2xl">
                        Shatter The <br/><span className="text-white/40">Simulation</span>
                    </h3>
                    <p className="text-sm md:text-base font-medium text-zinc-400 uppercase tracking-widest border border-white/10 bg-black/40 px-6 py-3 rounded-full backdrop-blur-md inline-block">
                        {isMobile ? "Tap and drag to interact" : "Hover and glide to interact"}
                    </p>
                </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent z-0"/>

            {/* Physics Canvas */}
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 10]} intensity={1.5} color="#AEC6FF" />
                <Physics gravity={[0, 0, 0]}>
                    <Boundaries />
                    <Objects />
                    <Pointer />
                </Physics>
            </Canvas>
        </div>
    )
}
