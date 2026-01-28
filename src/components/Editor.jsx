import React from 'react';

const Editor = ({ value, onChange }) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '100%',
            backgroundColor: 'var(--bg-secondary)'
        }}>
            <div style={{
                padding: '12px 24px',
                borderBottom: '1px solid var(--border-color)',
                color: 'var(--text-secondary)',
                fontSize: '0.875rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
            }}>
                Input
            </div>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="# Start typing your markdown here..."
                style={{
                    flex: 1,
                    width: '100%',
                    resize: 'none',
                    border: 'none',
                    outline: 'none',
                    padding: '24px',
                    backgroundColor: 'transparent',
                    color: 'var(--text-primary)',
                    fontSize: '1rem',
                    fontFamily: 'monospace',
                    lineHeight: '1.6'
                }}
                spellCheck={false}
            />
        </div>
    );
};

export default Editor;
