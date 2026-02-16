import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    padding: '2rem',
                    color: '#fff',
                    backgroundColor: '#111',
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    fontFamily: 'monospace'
                }}>
                    <h1 style={{ color: '#ef4444', marginBottom: '1rem' }}>Something went wrong.</h1>
                    <p>Please report this error to the developer.</p>
                    <div style={{
                        marginTop: '2rem',
                        padding: '1rem',
                        backgroundColor: '#222',
                        borderRadius: '0.5rem',
                        textAlign: 'left',
                        maxWidth: '800px',
                        overflow: 'auto',
                        border: '1px solid #333'
                    }}>
                        <pre style={{ color: '#ef4444' }}>
                            {this.state.error && this.state.error.toString()}
                        </pre>
                        <pre style={{ color: '#888', fontSize: '0.8rem' }}>
                            {this.state.errorInfo && this.state.errorInfo.componentStack}
                        </pre>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
