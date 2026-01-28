import React from 'react';
import { Download, Upload, Trash2, FileText } from 'lucide-react';

const Toolbar = ({ onUpload, onDownload, onClear }) => {
  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 24px',
      borderBottom: '1px solid var(--border-color)',
      backgroundColor: 'var(--bg-primary)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          backgroundColor: 'var(--accent-color)',
          padding: '8px',
          borderRadius: '8px',
          display: 'flex'
        }}>
          <FileText color="white" size={24} />
        </div>
        <div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            Markdown to PDF
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Convert your markdown files instantly
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <button className="button" onClick={onClear}>
          <Trash2 size={16} />
          Clear
        </button>
        <button className="button" onClick={() => document.getElementById('file-upload').click()}>
          <Upload size={16} />
          Import MD
        </button>
        <input 
          type="file" 
          id="file-upload" 
          accept=".md,.txt" 
          style={{ display: 'none' }} 
          onChange={onUpload}
        />
        <button className="button primary" onClick={onDownload}>
          <Download size={16} />
          Download PDF
        </button>
      </div>
    </header>
  );
};

export default Toolbar;
