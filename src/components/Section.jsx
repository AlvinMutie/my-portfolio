import { motion } from 'framer-motion';

const Section = ({ children, className = '', id = '' }) => {
    return (
        <motion.section
            id={id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`container ${className}`}
            style={{ padding: '6rem 0' }}
        >
            {children}
        </motion.section>
    );
};

export default Section;
