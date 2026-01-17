import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 250 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e) => {
            if (e.target.closest('a, button, [role="button"]')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [cursorX, cursorY]);

    return (
        <>
            <motion.div
                style={{
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    width: isHovering ? 60 : 20,
                    height: isHovering ? 60 : 20,
                    border: '1px solid var(--accent-color)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                    backgroundColor: isHovering ? 'rgba(124, 58, 237, 0.1)' : 'transparent',
                    transition: 'width 0.2s, height 0.2s, background-color 0.2s'
                }}
            />
            <motion.div
                style={{
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    width: 4,
                    height: 4,
                    backgroundColor: 'var(--accent-color)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 10000,
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            />
            <style>{`
                * { cursor: none !important; }
                @media (max-width: 768px) {
                    * { cursor: auto !important; }
                    div { display: none !important; }
                }
            `}</style>
        </>
    );
};

export default CustomCursor;
