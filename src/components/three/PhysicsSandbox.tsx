"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Physics, RigidBody, CuboidCollider, RapierRigidBody } from "@react-three/rapier";
import * as THREE from "three";

const count = 50;

function Objects() {
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
        {instances.map((prop) => (
             <RigidBody 
               key={prop.key}
               colliders={prop.form === 'box' ? "cuboid" : "ball"} 
               position={prop.position} 
               rotation={prop.rotation} 
               restitution={1.2} 
               friction={0.1}
               gravityScale={1}
             >
                <mesh scale={prop.scale}>
                     {prop.form === 'box' ? <boxGeometry /> : <icosahedronGeometry args={[1, 1]} />}
                     <meshStandardMaterial color={prop.color} emissive={prop.color} emissiveIntensity={0.5} transparent opacity={0.8} wireframe={Math.random() > 0.7} />
                </mesh>
             </RigidBody>
        ))}
    </group>
  );
}

function Boundaries({ isShattered }: { isShattered: boolean }) {
    const { viewport } = useThree();
    const w = viewport.width;
    const h = viewport.height;
    const t = 1; // thickness

    if (isShattered) return null; // Remove boundaries to let objects fly away!

    return (
        <>
            <RigidBody type="fixed" position={[0, -h/2 - t/2, 0]}><CuboidCollider args={[w/2, t/2, 2]} /></RigidBody>
            <RigidBody type="fixed" position={[0, h/2 + t/2, 0]}><CuboidCollider args={[w/2, t/2, 2]} /></RigidBody>
            <RigidBody type="fixed" position={[-w/2 - t/2, 0, 0]}><CuboidCollider args={[t/2, h/2, 2]} /></RigidBody>
            <RigidBody type="fixed" position={[w/2 + t/2, 0, 0]}><CuboidCollider args={[t/2, h/2, 2]} /></RigidBody>
            <RigidBody type="fixed" position={[0, 0, 1.5]}><CuboidCollider args={[w/2, h/2, t/2]} /></RigidBody>
            <RigidBody type="fixed" position={[0, 0, -2.5]}><CuboidCollider args={[w/2, h/2, t/2]} /></RigidBody>
        </>
    )
}

function Pointer() {
    const ref = useRef<RapierRigidBody>(null);
    useFrame(({ mouse, viewport }) => {
        if (!ref.current) return;
        const x = (mouse.x * viewport.width) / 2;
        const y = (mouse.y * viewport.height) / 2;
        ref.current.setNextKinematicTranslation({ x, y, z: 0 });
    });

    return (
        <RigidBody type="kinematicPosition" ref={ref} colliders="ball" position={[0,0,0]}>
           <mesh><sphereGeometry args={[1.5, 16, 16]} /><meshBasicMaterial transparent opacity={0} /></mesh>
        </RigidBody>
    )
}

export default function PhysicsSandbox() {
    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [gravity, setGravity] = useState<[number, number, number]>([0, 0, 0]);
    const [isShattered, setIsShattered] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Simple passive score increment when interacting
        let interval: NodeJS.Timeout;
        if (isHovered && !isShattered) {
            interval = setInterval(() => setScore(s => s + 15), 100);
        }
        return () => clearInterval(interval);
    }, [isHovered, isShattered]);

    const toggleGravity = () => setGravity(g => g[1] === 0 ? [0, -5, 0] : g[1] === -5 ? [0, 5, 0] : [0, 0, 0]);

    return (
        <div 
           className="relative w-full h-[70vh] md:h-[90vh] border-y border-white/5 bg-zinc-950/50 backdrop-blur-md overflow-hidden group cursor-crosshair"
           onPointerEnter={() => setIsHovered(true)}
           onPointerLeave={() => setIsHovered(false)}
        >
            {/* Game UI Overlay */}
            <div className={`absolute inset-0 pointer-events-none z-10 flex flex-col items-center justify-center transition-all duration-700 ${isHovered && !isShattered ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}`}>
                {isShattered ? (
                    <h3 className="text-5xl md:text-8xl font-black text-red-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 tracking-[0.2em] animate-pulse drop-shadow-[0_0_50px_rgba(239,68,68,0.5)] z-0 text-center">
                        SIMULATION<br/>DESTROYED
                    </h3>
                ) : (
                    <div className="text-center z-10">
                        <h2 className="text-sm font-black uppercase tracking-[0.4em] text-primary mb-4 hidden md:block"> / Level 1 </h2>
                        <h3 className="text-4xl md:text-7xl font-black tracking-tighter uppercase mb-6 drop-shadow-[0_10px_30px_rgba(174,198,255,0.2)]">
                            Shatter The <br/><span className="text-white/40">Simulation</span>
                        </h3>
                        <p className="text-xs md:text-sm font-medium text-zinc-400 uppercase tracking-widest border border-white/10 bg-black/40 px-6 py-3 rounded-full backdrop-blur-md inline-block">
                            {isMobile ? "Tap and drag to interact" : "Hover and glide to interact"}
                        </p>
                    </div>
                )}
            </div>

            {/* Interactive HUD - pointer-events-auto allows clicking buttons */}
            <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-20 pointer-events-none">
                <div className="bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg pointer-events-auto">
                    <p className="text-[10px] text-white/50 uppercase tracking-widest font-black mb-1">Score</p>
                    <p className="text-2xl text-primary font-mono">{score.toString().padStart(5, '0')}</p>
                </div>

                <div className="flex flex-col gap-2 pointer-events-auto">
                    <button onClick={toggleGravity} className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-3 rounded-lg backdrop-blur-md transition-all active:scale-95">
                        {gravity[1] === 0 ? "Enable Gravity" : gravity[1] < 0 ? "Invert Gravity" : "Zero Gravity"}
                    </button>
                    {score > 500 && !isShattered && (
                        <button onClick={() => setIsShattered(true)} className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] bg-red-500/20 hover:bg-red-500/40 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg backdrop-blur-md transition-all active:scale-95 animate-pulse">
                            Overload Bounds
                        </button>
                    )}
                </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent z-0"/>

            <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 10]} intensity={1.5} color="#AEC6FF" />
                <Physics gravity={gravity}>
                    <Boundaries isShattered={isShattered} />
                    <Objects />
                    {/* Only use the pointer if bounds exist, otherwise they fly anyway */}
                    {!isShattered && <Pointer />} 
                </Physics>
            </Canvas>
        </div>
    )
}
