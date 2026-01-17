import React from 'react';
import { motion } from 'framer-motion';

const AnimeNetwork = () => {
    // Create a grid of 100 dots (10x10)
    const dots = Array.from({ length: 100 });

    return (
        <div
            style={{
                position: 'relative',
                width: '300px',
                height: '300px',
                display: 'grid',
                gridTemplateColumns: 'repeat(10, 1fr)',
                gridTemplateRows: 'repeat(10, 1fr)',
                gap: '4px',
                padding: '20px'
            }}
        >
            {dots.map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ scale: 0.1, opacity: 0.2 }}
                    animate={{
                        scale: [0.1, 1, 0.1],
                        opacity: [0.2, 0.8, 0.2],
                        backgroundColor: ["var(--accent-color)", "#fff", "var(--accent-color)"]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: (i % 10) * 0.1 + Math.floor(i / 10) * 0.1, // Stagger effect based on grid position
                        ease: "easeInOut"
                    }}
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        backgroundColor: 'var(--accent-color)'
                    }}
                />
            ))}
        </div>
    );
};

export default AnimeNetwork;
