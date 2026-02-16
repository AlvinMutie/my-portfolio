import { motion } from 'framer-motion';

const SquigglyLoader = ({ size = 48, color = 'var(--accent-color)', thickness = 4 }) => {
    return (
        <div style={{
            width: size,
            height: size,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <motion.svg
                viewBox="0 0 48 48"
                style={{
                    width: '100%',
                    height: '100%',
                }}
                animate={{ rotate: 360 }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                <motion.circle
                    cx="24"
                    cy="24"
                    r="18"
                    fill="none"
                    stroke={color}
                    strokeWidth={thickness}
                    strokeLinecap="round"
                    animate={{
                        strokeDasharray: [
                            "1, 150",
                            "100, 150",
                            "1, 150"
                        ],
                        strokeDashoffset: [
                            0,
                            -25,
                            -124
                        ],
                        rotate: [0, 0, 120, 270, 360]
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: [0.4, 0, 0.2, 1], // M3 Standard Easing
                        times: [0, 0.4, 0.7, 0.9, 1]
                    }}
                />
            </motion.svg>
        </div>
    );
};

export default SquigglyLoader;
