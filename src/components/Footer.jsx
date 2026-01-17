const Footer = () => {
    return (
        <footer style={{
            padding: '4rem 0 2rem',
            borderTop: '1px solid var(--border-color)',
            marginTop: 'auto'
        }}>
            <div className="container" style={{ textAlign: 'center' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    © {new Date().getFullYear()} Portfolio. Built with React & Vite.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
