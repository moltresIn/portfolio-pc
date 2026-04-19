import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          background: '#000d1a',
          color: '#00d4ff',
          fontFamily: "'VT323', monospace",
          fontSize: '20px',
          padding: '24px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}>
          <div style={{ fontSize: '24px', color: '#ff4466' }}>⚠ Application Error</div>
          <div>{this.state.error?.message || 'An unexpected error occurred.'}</div>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              marginTop: '12px',
              padding: '8px 20px',
              background: 'transparent',
              border: '2px solid #0055aa',
              color: '#a0d8ef',
              fontFamily: "'VT323', monospace",
              fontSize: '20px',
              cursor: 'pointer',
              width: 'fit-content',
            }}
          >
            Dismiss
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
