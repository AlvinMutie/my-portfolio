import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useState } from 'react';

const ProjectCard = ({ project, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ y: -5 }}
            style={{
                position: 'relative',
                borderRadius: '1.5rem',
                background: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                transition: 'background-color 0.3s ease, border-color 0.3s ease',
            }}
        >
            {/* Border Beam Animation */}
            {isHovered && (
                <motion.div
                    initial={{ left: '-100%' }}
                    animate={{ left: '100%' }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '50%',
                        height: '2px',
                        background: 'linear-gradient(90deg, transparent, var(--accent-color), transparent)',
                        zIndex: 10
                    }}
                />
            )}

            <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                <motion.img
                    animate={{ scale: isHovered ? 1.1 : 1 }}
                    transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                    src={project.image}
                    alt={project.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    padding: '0.4rem 0.8rem',
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(4px)',
                    borderRadius: '2rem',
                    color: 'white',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    zIndex: 2
                }}>
                    {project.category}
                </div>
            </div>

            <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ marginBottom: '0.75rem', fontSize: '1.25rem', textTransform: 'capitalize' }}>{project.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', flex: 1 }}>
                    {project.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem', maxHeight: '60px', overflow: 'hidden' }}>
                    {project.tech.map(t => (
                        <span key={t} style={{
                            fontSize: '0.75rem',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '2rem',
                            backgroundColor: 'var(--selection-bg)',
                            color: 'var(--accent-color)',
                            fontWeight: 500
                        }}>
                            {t}
                        </span>
                    ))}
                </div>

                <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--selection-bg)',
                        color: 'var(--accent-color)',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--accent-color)';
                        e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--selection-bg)';
                        e.currentTarget.style.color = 'var(--accent-color)';
                    }}
                    title="View Project"
                >
                    <ExternalLink size={18} />
                </a>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
