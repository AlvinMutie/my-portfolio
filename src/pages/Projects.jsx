import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '../components/Section';
import ProjectCard from '../components/ProjectCard';
import SquigglyLoader from '../components/SquigglyLoader';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const response = await fetch('https://api.github.com/users/AlvinMutie/repos?sort=updated&per_page=100');
                if (!response.ok) throw new Error('Failed to fetch projects');
                const data = await response.json();

                const skipRepos = ['my-portfolio', 'AlvinMutie', 'portfolio'];

                const customData = {
                    'Shuleni-Advantage': {
                        desc: 'A specialized mobile application for student management and academic tracking.',
                        img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800'
                    },
                    'Attachment-Management-Reporting': {
                        desc: 'A professional dashboard for managing student internships and attendance monitoring.',
                        img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800'
                    },
                    'Student-Management-System': {
                        desc: 'A robust platform for institutional data handling and comprehensive academic records.',
                        img: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=800'
                    },
                    'edvantage': {
                        desc: 'An innovative educational platform designed to enhance student learning experiences through interactive tools.',
                        img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800'
                    },
                    'Edvantage': {
                        desc: 'An innovative educational platform designed to enhance student learning experiences through interactive tools.',
                        img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800'
                    }
                };

                const filteredRepos = data.filter(repo => !repo.fork && !skipRepos.includes(repo.name));

                const projectsWithLanguages = await Promise.all(filteredRepos.map(async (repo) => {
                    const langResponse = await fetch(repo.languages_url);
                    const languages = langResponse.ok ? await langResponse.json() : {};
                    const techStack = Object.keys(languages);

                    const custom = customData[repo.name];
                    let desc = repo.description || 'A software project focused on delivering clean solutions and efficient performance.';
                    if (desc === 'No description available.') desc = 'A specialized development project focusing on efficient implementation and clean code.';

                    const title = repo.name.replace(/-/g, ' ').replace(/_/g, ' ');
                    const language = repo.language || 'Software';

                    return {
                        id: repo.id,
                        title: title,
                        description: custom?.desc || desc,
                        tech: techStack.length > 0 ? techStack : [language],
                        category: language === 'JavaScript' ? 'Web Development' : language,
                        image: custom?.img || `https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800`,
                        link: repo.html_url
                    };
                }));

                setProjects(projectsWithLanguages);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchRepos();
    }, []);

    const categories = ['All', ...new Set(projects.map(p => p.category))];

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(p => p.category === filter);

    if (loading) {
        return (
            <div className="page-transition">
                <Section>
                    <div style={{ height: '50vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
                        <SquigglyLoader size={56} thickness={4} />
                        <h2 style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 500, opacity: 0.6 }}>Fetching Projects...</h2>
                    </div>
                </Section>
            </div>
        );
    }

    if (error) {
        return (
            <div className="page-transition">
                <Section>
                    <div style={{ padding: '4rem 0', textAlign: 'center' }}>
                        <h2 style={{ color: 'var(--accent-color)' }}>Error: {error}</h2>
                        <p>Please try again later or check back soon.</p>
                    </div>
                </Section>
            </div>
        );
    }

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
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                            >
                                <ProjectCard project={project} index={index} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </Section>
        </div>
    );
};

export default Projects;
