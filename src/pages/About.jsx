import Section from '../components/Section';
import { NavLink } from 'react-router-dom';
import TerminalBio from '../components/TerminalBio';

const About = () => {
    const skills = [
        { category: "Web Development", items: ["HTML", "CSS", "JavaScript", "React", "Vite"] },
        { category: "Backend / Database", items: ["Node.js", "Express", "PostgreSQL", "MySQL"] },
        { category: "Other", items: ["Python", "Excel Automation", "Data Analytics", "Blockchain Basics"] }
    ];

    return (
        <div className="page-transition">
            <Section>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(6, 1fr)',
                    gridAutoRows: 'minmax(150px, auto)',
                    gap: '1.5rem',
                }}>
                    {/* Intro Block */}
                    <div style={{
                        gridColumn: 'span 4',
                        gridRow: 'span 2',
                        background: 'var(--card-bg)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '2rem',
                        padding: '3rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                        <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: 1.1 }}>Building systems <br /> that <span style={{ color: 'var(--accent-color)' }}>matter.</span></h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.6', maxWidth: '600px' }}>
                            I'm Alvin Mutie, a developer dedicated to crafting digital tools that are as functional as they are secure.
                            My goal is to bridge the gap between sophisticated technology and practical utility.
                        </p>
                    </div>

                    {/* Stats/Quick Info Block */}
                    <div style={{
                        gridColumn: 'span 2',
                        background: 'var(--accent-color)',
                        borderRadius: '2rem',
                        padding: '2rem',
                        color: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '3rem', fontWeight: 800 }}>3+</div>
                        <div style={{ fontSize: '0.9rem', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Key Projects</div>
                    </div>

                    {/* Education Block */}
                    <div style={{
                        gridColumn: 'span 2',
                        background: 'var(--card-bg)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '2rem',
                        padding: '2rem',
                    }}>
                        <h3 style={{ fontSize: '0.9rem', color: 'var(--accent-color)', textTransform: 'uppercase', marginBottom: '1rem' }}>Education</h3>
                        <div style={{ fontWeight: 700 }}>JKUAT, Kenya</div>
                        <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>Diploma in IT</div>
                        <div style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: 'var(--text-muted)' }}>Class of 2025</div>
                    </div>

                    {/* Skills Bento Blocks */}
                    {skills.map((skillGroup, idx) => (
                        <div key={idx} style={{
                            gridColumn: 'span 3',
                            background: 'var(--card-bg)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '2rem',
                            padding: '2rem',
                        }}>
                            <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--accent-color)', marginBottom: '1.5rem' }}>{skillGroup.category}</h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                                {skillGroup.items.map(skill => (
                                    <span key={skill} style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '0.75rem', fontSize: '0.9rem' }}>{skill}</span>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Terminal Block */}
                    <div style={{
                        gridColumn: 'span 6',
                        height: '350px'
                    }}>
                        <TerminalBio />
                    </div>

                    {/* CTA Block */}
                    <div style={{
                        gridColumn: 'span 6',
                        background: 'linear-gradient(90deg, var(--accent-color), var(--accent-light))',
                        borderRadius: '2rem',
                        padding: '3rem',
                        color: 'white',
                        textAlign: 'center'
                    }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Ready to build something secure?</h2>
                        <NavLink to="/contact" style={{ color: 'white', fontWeight: 700, textDecoration: 'underline' }}>Let's talk →</NavLink>
                    </div>
                </div>
            </Section>
        </div>
    );
};

export default About;
