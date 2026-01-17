import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '../components/Section';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const form = useRef();
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.message) {
            setStatus({ type: 'error', message: 'Please fill in all fields.' });
            return;
        }

        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        try {
            await emailjs.sendForm(
                'service_wy0iqr9',
                'template_fi1ygbq',
                form.current,
                '9LLwjBULRKf4teFCy'
            );

            setStatus({ type: 'success', message: 'Message sent! I\'ll get back to you soon.' });
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('EmailJS Error:', error);
            setStatus({ type: 'error', message: 'Something went wrong. Please try again later.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '1.25rem',
        borderRadius: '1rem',
        border: '1px solid var(--border-color)',
        backgroundColor: 'var(--card-bg)',
        color: 'var(--text-color)',
        fontSize: '1rem',
        outline: 'none',
        transition: 'all 0.2s ease',
        marginBottom: '1.5rem'
    };

    return (
        <div className="page-transition">
            <Section>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '6rem' }}>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Let's talk.</h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                            Have a project in mind or just want to say hi? <br />
                            Reach out and I'll get back to you as soon as possible.
                        </p>
                        <div style={{
                            padding: '1.5rem',
                            borderRadius: '1rem',
                            border: '1px solid var(--border-color)',
                            backgroundColor: 'var(--card-bg)'
                        }}>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>GET IN TOUCH</div>
                            <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--accent-color)', marginBottom: '1rem' }}>
                                mutiealvin0@gmail.com
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>GITHUB</div>
                            <a
                                href="https://github.com/AlvinMutie"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-color)', textDecoration: 'none' }}
                            >
                                @AlvinMutie
                            </a>
                        </div>
                    </motion.div>

                    <motion.form
                        ref={form}
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{ display: 'flex', flexDirection: 'column' }}
                    >
                        <div style={{ position: 'relative' }}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                style={inputStyle}
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                onFocus={(e) => e.target.style.borderColor = 'var(--accent-color)'}
                                onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                            />
                        </div>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="email"
                                name="email" // Changed from user_email to match std patterns or template
                                placeholder="Email Address"
                                style={inputStyle}
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                onFocus={(e) => e.target.style.borderColor = 'var(--accent-color)'}
                                onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                            />
                        </div>
                        <div style={{ position: 'relative' }}>
                            <textarea
                                name="message"
                                placeholder="How can I help?"
                                rows="5"
                                style={{ ...inputStyle, resize: 'none' }}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                onFocus={(e) => e.target.style.borderColor = 'var(--accent-color)'}
                                onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                            />
                        </div>

                        {/* Hidden input for timestamp if needed, though template param is better */}
                        <input type="hidden" name="time" value={new Date().toLocaleString()} />

                        <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                                backgroundColor: 'var(--text-color)',
                                color: 'var(--bg-color)',
                                padding: '1.25rem',
                                borderRadius: '3rem',
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.75rem',
                                border: 'none',
                                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                transition: 'opacity 0.2s ease',
                                opacity: isSubmitting ? 0.7 : 1
                            }}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                            {!isSubmitting && <Send size={18} />}
                        </motion.button>

                        <AnimatePresence>
                            {status.message && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    style={{
                                        marginTop: '1.5rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                        color: status.type === 'success' ? '#22c55e' : '#ef4444',
                                        fontWeight: 500,
                                        padding: '1rem',
                                        borderRadius: '0.75rem',
                                        backgroundColor: status.type === 'success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)'
                                    }}
                                >
                                    {status.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                                    {status.message}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.form>
                </div>
            </Section>
        </div>
    );
};

export default Contact;
