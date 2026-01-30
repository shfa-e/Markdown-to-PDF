import React, { useState, useEffect } from 'react';
import { Download, Trash2, Sun, Moon, Coffee } from 'lucide-react';

const Toolbar = ({ onDownload, onClear, theme, onToggleTheme, title, onTitleChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localTitle, setLocalTitle] = useState(title);

  useEffect(() => {
    setLocalTitle(title);
  }, [title]);

  const handleTitleSubmit = () => {
    setIsEditing(false);
    onTitleChange(localTitle);
  };

  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 24px',
      height: '64px',
      borderBottom: '1px solid var(--border-color)',
      backgroundColor: 'var(--bg-primary)',
      backdropFilter: 'blur(8px)',
      transition: 'all var(--transition-base)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
        {isEditing ? (
          <input
            autoFocus
            className="title-input"
            value={localTitle}
            onChange={(e) => setLocalTitle(e.target.value)}
            onBlur={handleTitleSubmit}
            onFocus={(e) => e.target.select()}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleTitleSubmit();
              if (e.key === 'Escape') {
                setLocalTitle(title);
                setIsEditing(false);
              }
            }}
            style={{
              fontSize: '1rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--accent-color)',
              borderRadius: '4px',
              padding: '4px 8px',
              outline: 'none',
              width: localTitle.length + 'ch',
              minWidth: '200px'
            }}
          />
        ) : (
          <h1
            onDoubleClick={() => setIsEditing(true)}
            style={{
              fontSize: '1rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: '4px',
              transition: 'background 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'var(--bg-tertiary)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
            title="Double click to rename"
          >
            {title}
            <span style={{ fontSize: '0.75rem', opacity: 0.5, fontWeight: 400 }} className="hide-mobile">
              (Double click to rename)
            </span>
          </h1>
        )}
      </div>

      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <a
          href="https://www.buymeacoffee.com/shfae"
          target="_blank"
          rel="noopener noreferrer"
          className="button"
          title="Buy Me a Coffee"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            textDecoration: 'none',
            backgroundColor: '#FFDD00',
            color: '#000000',
            border: 'none'
          }}
        >
          <Coffee size={18} />
          <span className="hide-mobile">Support</span>
        </a>

        <div style={{ width: '1px', height: '20px', background: 'var(--border-color)', margin: '0 8px' }} />

        <button
          className="button"
          onClick={onToggleTheme}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          style={{ padding: '8px' }}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div style={{ width: '1px', height: '20px', background: 'var(--border-color)', margin: '0 8px' }} />

        <button className="button" onClick={onClear} title="Clear Editor">
          <Trash2 size={18} />
          <span className="hide-mobile">Clear</span>
        </button>

        <button className="button primary" onClick={onDownload} title="Export as PDF">
          <Download size={18} />
          <span>Download PDF</span>
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hide-mobile { display: none; }
        }
      `}</style>
    </header>
  );
};

export default Toolbar;

