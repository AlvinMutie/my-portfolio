import { NavLink } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ theme, toggleTheme }) => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Projects', path: '/projects' },
        { name: 'Contact', path: '/contact' },
    ];

    const navVariants = {
        open: { opacity: 1, y: 0, display: 'block' },
        closed: { opacity: 0, y: -20, transitionEnd: { display: 'none' } },
    };

    return (
        <nav className="glass sticky-nav" style={{
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            padding: '1rem 0'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <NavLink to="/" className="logo" style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.05em' }}>
                    PORTFOLIO<span style={{ color: 'var(--accent-color)' }}>.</span>
                </NavLink>

                {/* Desktop Nav */}
                <div className="desktop-links" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            style={({ isActive }) => ({
                                color: isActive ? 'var(--accent-color)' : 'var(--text-color)',
                                fontWeight: isActive ? 600 : 400,
                                fontSize: '0.95rem',
                                transition: 'color 0.2s ease',
                            })}
                        >
                            {link.name}
                        </NavLink>
                    ))}
                    <button
                        onClick={toggleTheme}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'var(--text-color)',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="mobile-toggle" style={{ display: 'none' }}>
                    <button onClick={() => setIsOpen(!isOpen)} style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-color)',
                        cursor: 'pointer'
                    }}>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            backgroundColor: 'var(--bg-color)',
                            borderBottom: '1px solid var(--border-color)',
                            overflow: 'hidden'
                        }}
                    >
                        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '2rem 1.5rem' }}>
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    style={({ isActive }) => ({
                                        color: isActive ? 'var(--accent-color)' : 'var(--text-color)',
                                        fontWeight: isActive ? 600 : 400,
                                        fontSize: '1.2rem',
                                    })}
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                            <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Switch Theme</span>
                                <button
                                    onClick={() => { toggleTheme(); setIsOpen(false); }}
                                    style={{
                                        background: 'var(--card-bg)',
                                        border: '1px solid var(--border-color)',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '2rem',
                                        cursor: 'pointer',
                                        color: 'var(--text-color)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}
                                >
                                    {theme === 'light' ? <><Moon size={18} /> Dark</> : <><Sun size={18} /> Light</>}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
        @media (max-width: 768px) {
          .desktop-links { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
        </nav>
    );
};

export default Navbar;
