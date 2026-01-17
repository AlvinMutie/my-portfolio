import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Typewriter = ({ texts, speed = 100, delay = 2000 }) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const fullText = texts[currentTextIndex];

            if (!isDeleting) {
                setCurrentText(fullText.substring(0, currentText.length + 1));

                if (currentText === fullText) {
                    setTimeout(() => setIsDeleting(true), delay);
                }
            } else {
                setCurrentText(fullText.substring(0, currentText.length - 1));

                if (currentText === '') {
                    setIsDeleting(false);
                    setCurrentTextIndex((prev) => (prev + 1) % texts.length);
                }
            }
        }, isDeleting ? speed / 2 : speed);

        return () => clearTimeout(timeout);
    }, [currentText, isDeleting, currentTextIndex, texts, speed, delay]);

    return (
        <span style={{ borderRight: '2px solid var(--accent-color)', paddingRight: '4px' }}>
            {currentText}
        </span>
    );
};

export default Typewriter;
