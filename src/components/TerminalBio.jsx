import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const TerminalBio = () => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([
        { type: 'output', content: 'AlvinOS v3.0.0 init...' },
        { type: 'output', content: 'Type "help" to see available commands.' }
    ]);
    const containerRef = useRef(null);

    const commands = {
        help: 'Available commands: about, skills, contact, clear, projects',
        about: 'I am a Cybersecurity-focused full-stack developer based in Nairobi, Kenya.',
        skills: 'Tech Stack: React, Node.js, Flutter, MySQL, PostgreSQL, Python.',
        contact: 'Email: mutiealvin0@gmail.com | GitHub: @AlvinMutie',
        projects: 'Active: Shuleni Advantage, Attachment MGMT System, SMS.'
    };

    const handleCommand = (e) => {
        if (e.key === 'Enter') {
            const cmd = input.toLowerCase().trim();
            const newHistory = [...history, { type: 'input', content: cmd }];

            if (cmd === 'clear') {
                setHistory([]);
            } else if (commands[cmd]) {
                newHistory.push({ type: 'output', content: commands[cmd] });
                setHistory(newHistory);
            } else if (cmd !== '') {
                newHistory.push({ type: 'output', content: `Command not found: ${cmd}` });
                setHistory(newHistory);
            }

            setInput('');
        }
    };

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [history]);

    return (
        <div ref={containerRef} style={{
            background: '#0a0a0a',
            color: '#00ff41',
            fontFamily: 'monospace',
            padding: '1.5rem',
            borderRadius: '1rem',
            border: '1px solid #333',
            height: '300px',
            overflowY: 'auto',
            fontSize: '0.9rem',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
        }}>
            {history.map((line, i) => (
                <div key={i} style={{ marginBottom: '0.5rem' }}>
                    {line.type === 'input' ? <span>{'> '}</span> : null}
                    {line.content}
                </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: '0.5rem' }}>{'>'}</span>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleCommand}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#00ff41',
                        fontFamily: 'monospace',
                        fontSize: '0.9rem',
                        outline: 'none',
                        flex: 1
                    }}
                />
            </div>
        </div>
    );
};

export default TerminalBio;
