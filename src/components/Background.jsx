import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';

const Background = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const dx = useSpring(mouseX, springConfig);
    const dy = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            overflow: 'hidden',
            backgroundColor: 'var(--bg-color)'
        }}>
            {/* Interactive Grid */}
            <motion.div
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `radial-gradient(circle at center, var(--accent-color) 0.5px, transparent 0.5px)`,
                    backgroundSize: '32px 32px',
                    opacity: 0.1,
                    maskImage: useTransform(
                        [dx, dy],
                        ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, black, transparent)`
                    )
                }}
            />

            {/* Cyber Drift Elements */}
            <div style={{ position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none' }}>
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: -100, x: Math.random() * 100 + '%' }}
                        animate={{
                            y: '110vh',
                            transition: {
                                duration: 10 + Math.random() * 20,
                                repeat: Infinity,
                                ease: 'linear',
                                delay: Math.random() * 10
                            }
                        }}
                        style={{
                            position: 'absolute',
                            fontSize: '0.75rem',
                            fontFamily: 'monospace',
                            color: 'var(--accent-color)'
                        }}
                    >
                        {Math.random() > 0.5 ? '0x' + Math.floor(Math.random() * 255).toString(16) : Math.floor(Math.random() * 2)}
                    </motion.div>
                ))}
            </div>

            {/* Ambient Glows */}
            <motion.div
                animate={{
                    x: [0, 50, 0],
                    y: [0, 30, 0],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{
                    position: 'absolute',
                    top: '10%',
                    right: '10%',
                    width: '40vw',
                    height: '40vw',
                    background: 'radial-gradient(circle, var(--accent-light) 0%, transparent 70%)',
                    opacity: 0.15,
                    filter: 'blur(80px)',
                }}
            />
            <motion.div
                animate={{
                    x: [0, -40, 0],
                    y: [0, 60, 0],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                style={{
                    position: 'absolute',
                    bottom: '10%',
                    left: '5%',
                    width: '35vw',
                    height: '35vw',
                    background: 'radial-gradient(circle, var(--accent-color) 0%, transparent 70%)',
                    opacity: 0.1,
                    filter: 'blur(100px)',
                }}
            />
        </div>
    );
};

export default Background;
