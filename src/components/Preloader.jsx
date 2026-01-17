import { motion } from 'framer-motion';

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
            <div style={{ position: 'relative', width: '200px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '0.1em' }}
                >
                    LOADING
                </motion.div>
                <motion.div
                    animate={{ width: ['0%', '100%', '0%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                        position: 'absolute',
                        bottom: '20px',
                        height: '2px',
                        backgroundColor: 'var(--accent-color)',
                    }}
                />
            </div>
        </motion.div>
    );
};

export default Preloader;
