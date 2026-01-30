import React, { forwardRef } from 'react';
import ReactMarkdown from 'react-markdown';

const Preview = forwardRef(({ content }, ref) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '100%',
            backgroundColor: 'var(--bg-app)',
            overflow: 'hidden'
        }}>
            <div style={{
                padding: '12px 24px',
                borderBottom: '1px solid var(--border-color)',
                borderLeft: '1px solid var(--border-color)',
                color: 'var(--text-secondary)',
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                backgroundColor: 'var(--bg-secondary)'
            }}>
                Live Preview
            </div>
            <div
                className="preview-scroll-container"
                style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '48px 24px',
                    borderLeft: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-app)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <div
                    ref={ref}
                    className="markdown-preview"
                    style={{
                        width: '100%',
                        maxWidth: '210mm',
                        backgroundColor: 'white',
                        padding: '20mm',
                        borderRadius: '4px',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                        color: '#1a1a1a',
                        marginBottom: '48px'
                    }}
                >
                    {content ? (
                        <ReactMarkdown>{content}</ReactMarkdown>
                    ) : (
                        <div style={{
                            color: '#a3a3a3',
                            textAlign: 'center',
                            marginTop: '40%',
                            fontStyle: 'italic'
                        }}>
                            Preview will appear here...
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});

Preview.displayName = 'Preview';

export default Preview;

