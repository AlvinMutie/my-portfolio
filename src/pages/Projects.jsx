import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '../components/Section';
import ProjectCard from '../components/ProjectCard';
import { projectsData } from '../assets/projectsData';

const Projects = () => {
    const [filter, setFilter] = useState('All');
    const categories = ['All', ...new Set(projectsData.map(p => p.category))];

    const filteredProjects = filter === 'All'
        ? projectsData
        : projectsData.filter(p => p.category === filter);

    return (
        <div className="page-transition">
            <Section>
                <div style={{ marginBottom: '4rem' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Selected Work.</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', marginBottom: '2.5rem' }}>
                        A collection of projects I've worked on that showcase my commitment to quality and performance.
                    </p>

                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                style={{
                                    padding: '0.6rem 1.5rem',
                                    borderRadius: '2rem',
                                    border: '1px solid var(--border-color)',
                                    backgroundColor: filter === cat ? 'var(--accent-color)' : 'transparent',
                                    color: filter === cat ? 'white' : 'var(--text-color)',
                                    cursor: 'pointer',
                                    fontWeight: 500,
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <motion.div
                    layout
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '2.5rem'
                    }}
                >
                    <AnimatePresence>
                        {filteredProjects.map(project => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                            >
                                <ProjectCard project={project} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </Section>
        </div>
    );
};

export default Projects;
