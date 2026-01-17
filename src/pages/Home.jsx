import { motion } from 'framer-motion';
import Section from '../components/Section';
import Typewriter from '../components/Typewriter';
import { ArrowRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import AnimeNetwork from '../components/AnimeNetwork';

const Home = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
    };

    return (
        <div className="page-transition">
            <Section style={{ padding: '8rem 0 4rem', position: 'relative' }}>
                {/* Floating UI Elements */}
                <div style={{ position: 'absolute', top: '10%', right: '5%', pointerEvents: 'none', opacity: 0.6 }}>
                    <motion.div
                        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        style={{ padding: '1rem', background: 'var(--card-bg)', border: '1px solid var(--accent-color)', borderRadius: '1rem', color: 'var(--accent-color)', fontSize: '0.8rem', fontWeight: 700 }}
                    >
                        SECURE_SCAN: PASSED
                    </motion.div>
                </div>
                <div style={{ position: 'absolute', bottom: '20%', left: '0', pointerEvents: 'none', opacity: 0.4 }}>
                    <motion.div
                        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        style={{ padding: '0.75rem', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '0.75rem', fontSize: '0.7rem' }}
                    >
                        v3.0_deployment
                    </motion.div>
                </div>

                <motion.div
                    style={{ maxWidth: '800px' }}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* ... rest of existing hero ... */}
                    <motion.div variants={itemVariants}>
                        <span style={{
                            color: 'var(--accent-color)',
                            fontWeight: 600,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            fontSize: '0.875rem'
                        }}>
                            Available for full-time roles
                        </span>
                    </motion.div>

                    <motion.h1
                        variants={itemVariants}
                        style={{
                            fontSize: 'clamp(3rem, 8vw, 5rem)',
                            marginTop: '1.5rem',
                            marginBottom: '2rem',
                            letterSpacing: '-0.02em',
                            lineHeight: 1.1
                        }}
                    >
                        Hi, I'm <span style={{ color: 'var(--accent-color)' }}>Alvin Mutie</span>. <br />
                        I build <br />
                        <span style={{ color: 'var(--text-muted)' }}>
                            <Typewriter texts={["web applications", "digital solutions", "innovative systems"]} />
                        </span> <br />
                        with focus.
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        style={{
                            fontSize: '1.25rem',
                            color: 'var(--text-muted)',
                            maxWidth: '600px',
                            marginBottom: '3rem',
                            lineHeight: 1.6
                        }}
                    >
                        I am passionate about cybersecurity, web development, and building practical digital solutions.
                        I enjoy developing apps, web dashboards, and innovative systems that solve real-world problems.
                    </motion.p>
                    {/* ... CTA buttons ... */}
                    <motion.div
                        variants={itemVariants}
                        style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}
                    >
                        <NavLink to="/projects" className="btn-primary" style={{
                            backgroundColor: 'var(--accent-color)',
                            color: 'white',
                            padding: '1rem 2.5rem',
                            borderRadius: '3rem',
                            fontWeight: 600,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            transition: 'transform 0.2s ease, background-color 0.2s ease'
                        }}>
                            View Projects <ArrowRight size={20} />
                        </NavLink>
                        <NavLink to="/contact" style={{
                            padding: '1rem 2.5rem',
                            borderRadius: '3rem',
                            fontWeight: 600,
                            border: '1px solid var(--border-color)',
                            transition: 'background-color 0.2s ease'
                        }}>
                            Get in Touch
                        </NavLink>
                    </motion.div>
                </motion.div>
            </Section>

            <Section>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '4rem',
                    alignItems: 'center'
                }}>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Next-gen Thinking.</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2rem' }}>
                            I don't just write code; I design ecosystems. My work is defined by a commitment to security,
                            user experience, and efficient architecture that stays ahead of the curve.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        style={{
                            backgroundColor: 'var(--card-bg)',
                            height: '400px',
                            borderRadius: '2rem',
                            border: '1px solid var(--border-color)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--text-muted)',
                            overflow: 'hidden',
                            position: 'relative'
                        }}
                    >
                        <AnimeNetwork />
                    </motion.div>
                </div>
            </Section>
        </div>
    );
};

export default Home;
