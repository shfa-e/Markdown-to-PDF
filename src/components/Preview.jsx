import React, { forwardRef } from 'react';
import ReactMarkdown from 'react-markdown';

const Preview = forwardRef(({ content }, ref) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '100%',
            backgroundColor: 'var(--bg-tertiary)',
            overflowY: 'auto'
        }}>
            <div style={{
                padding: '12px 24px',
                borderBottom: '1px solid var(--border-color)',
                color: 'var(--text-secondary)',
                fontSize: '0.875rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                backgroundColor: 'var(--bg-secondary)', // Sticky header match
                position: 'sticky',
                top: 0,
                zIndex: 10
            }}>
                Preview
            </div>

            <div style={{
                padding: '40px',
                display: 'flex',
                justifyContent: 'center',
                minHeight: 'calc(100% - 45px)'
            }}>
                <div
                    ref={ref}
                    className="markdown-preview"
                    style={{
                        width: '210mm', // A4 width
                        minHeight: '297mm', // A4 height
                        backgroundColor: 'white',
                        padding: '20mm', // Standard margins
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                        color: 'black' // Enforcement
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
