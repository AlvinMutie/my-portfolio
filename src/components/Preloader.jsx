import { motion } from 'framer-motion';
import SquigglyLoader from './SquigglyLoader';

const Preloader = () => {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'var(--bg-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
            }}
        >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
                <SquigglyLoader size={64} thickness={4} />
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    style={{
                        fontSize: '1rem',
                        fontWeight: 600,
                        letterSpacing: '0.2em',
                        color: 'var(--text-muted)',
                        textTransform: 'uppercase'
                    }}
                >
                    ALVIN MUTIE
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Preloader;
