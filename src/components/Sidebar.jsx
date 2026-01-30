import React from 'react';
import { Plus, Layout, Settings, Github } from 'lucide-react';

const Sidebar = ({ onNewDocument }) => {
    return (
        <aside className="glass-panel" style={{
            width: '70px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '24px 0',
            gap: '24px',
            borderRight: '1px solid var(--border-color)',
            zIndex: 10
        }}>
            <div style={{
                width: '40px',
                height: '40px',
                backgroundColor: 'var(--accent-color)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '20px',
                marginBottom: '12px',
                boxShadow: '0 4px 12px var(--accent-glow)'
            }}>
                M
            </div>

            <button
                className="button icon-only primary"
                onClick={onNewDocument}
                title="New Document"
                style={{ borderRadius: '16px' }}
            >
                <Plus size={24} />
            </button>

            <div style={{ flex: 1 }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <a
                    href="https://github.com/shfa-e/Markdown-to-PDF"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button icon-only"
                    title="GitHub Repository"
                    style={{ border: 'none', background: 'transparent', display: 'flex' }}
                >
                    <Github size={22} color="var(--text-secondary)" />
                </a>
            </div>
        </aside>
    );
};

export default Sidebar;
