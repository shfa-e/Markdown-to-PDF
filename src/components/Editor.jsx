import React, { useState } from 'react';
import { Upload } from 'lucide-react';

const Editor = ({ value, onChange, activeTab, onTabSwitch, onUpload, fileInputRef }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            const file = files[0];
            if (file.name.endsWith('.md') || file.name.endsWith('.txt')) {
                // Create a synthetic event to match the file input onChange signature
                const syntheticEvent = {
                    target: {
                        files: [file]
                    }
                };
                onUpload(syntheticEvent);
            }
        }
    };

    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '100%',
            backgroundColor: 'var(--bg-primary)',
            position: 'relative',
        }}>
            {/* Tab Navigation */}
            <div style={{
                display: 'flex',
                borderBottom: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-secondary)',
                padding: '0 24px'
            }}>
                <button
                    onClick={() => onTabSwitch('input')}
                    style={{
                        padding: '12px 20px',
                        border: 'none',
                        background: activeTab === 'input' ? 'var(--bg-primary)' : 'transparent',
                        color: activeTab === 'input' ? 'var(--text-primary)' : 'var(--text-secondary)',
                        fontSize: '0.875rem',
                        fontWeight: activeTab === 'input' ? 600 : 400,
                        cursor: 'pointer',
                        borderBottom: activeTab === 'input' ? '2px solid var(--accent-color)' : '2px solid transparent',
                        transition: 'all 0.2s',
                        fontFamily: 'var(--font-sans)'
                    }}
                >
                    Markdown Input
                </button>
                <button
                    onClick={() => onTabSwitch('upload')}
                    style={{
                        padding: '12px 20px',
                        border: 'none',
                        background: activeTab === 'upload' ? 'var(--bg-primary)' : 'transparent',
                        color: activeTab === 'upload' ? 'var(--text-primary)' : 'var(--text-secondary)',
                        fontSize: '0.875rem',
                        fontWeight: activeTab === 'upload' ? 600 : 400,
                        cursor: 'pointer',
                        borderBottom: activeTab === 'upload' ? '2px solid var(--accent-color)' : '2px solid transparent',
                        transition: 'all 0.2s',
                        fontFamily: 'var(--font-sans)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                    }}
                >
                    <Upload size={16} />
                    Upload File
                </button>
            </div>

            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept=".md,.txt"
                style={{ display: 'none' }}
                onChange={onUpload}
            />

            {/* Editor Header */}
            <div style={{
                padding: '12px 24px',
                borderBottom: '1px solid var(--border-color)',
                color: 'var(--text-secondary)',
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'var(--bg-secondary)'
            }}>
                <span>{activeTab === 'input' ? 'Editor' : 'Upload'}</span>
                {activeTab === 'input' && (
                    <span style={{ opacity: 0.5 }}>{value.length} characters</span>
                )}
            </div>

            {/* Content Area */}
            {activeTab === 'input' ? (
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="# Start typing your markdown here..."
                    className="editor-textarea"
                    style={{
                        flex: 1,
                        width: '100%',
                        resize: 'none',
                        border: 'none',
                        outline: 'none',
                        padding: '32px',
                        backgroundColor: 'transparent',
                        color: 'var(--text-primary)',
                        fontSize: '1rem',
                        fontFamily: 'var(--font-mono)',
                        lineHeight: '1.7',
                        tabSize: 4
                    }}
                    spellCheck={false}
                />
            ) : (
                <div
                    onDragEnter={handleDragEnter}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '48px',
                        backgroundColor: isDragging ? 'var(--bg-tertiary)' : 'transparent',
                        border: isDragging ? '2px dashed var(--accent-color)' : '2px dashed var(--border-color)',
                        borderRadius: '12px',
                        margin: '24px',
                        transition: 'all 0.2s',
                        cursor: 'pointer'
                    }}
                    onClick={handleUploadClick}
                >
                    <Upload size={48} color="var(--text-secondary)" style={{ marginBottom: '16px', opacity: 0.5 }} />
                    <h3 style={{
                        fontSize: '1.125rem',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        marginBottom: '8px'
                    }}>
                        Upload Markdown File
                    </h3>
                    <p style={{
                        fontSize: '0.875rem',
                        color: 'var(--text-secondary)',
                        textAlign: 'center',
                        lineHeight: 1.6,
                        maxWidth: '300px'
                    }}>
                        Click to browse or drag and drop your .md or .txt file here
                    </p>
                </div>
            )}

            <style>{`
                .editor-textarea::placeholder {
                    color: var(--text-secondary);
                    opacity: 0.3;
                }
            `}</style>
        </div>
    );
};

export default Editor;
