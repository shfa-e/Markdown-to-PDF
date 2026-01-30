import React, { useState, useRef, useEffect } from 'react';
import html2pdf from 'html2pdf.js';
import Toolbar from './components/Toolbar';
import Editor from './components/Editor';
import Preview from './components/Preview';

const DEFAULT_MARKDOWN = `# Welcome to Markdown to PDF

This is a **live editor**. Start typing on the left to see your changes update instantly on the right.

## Features
- ✨ Clean, modern typography
- 🚀 Instant live preview
- 📦 **Drag & Drop** file support
- 🎨 GitHub Flavored Markdown (tables, checkboxes)

### Code Example
\`\`\`javascript
function hello() {
  console.log("Hello, world!");
}
\`\`\`

### Task List
- [x] Design beautiful UI
- [x] Implement conversion logic
- [ ] Add dark mode support

---
> "Simplicity is the ultimate sophistication." — Leonardo da Vinci
`;

function App() {
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [title, setTitle] = useState('Untitled Document');
  const [splitPosition, setSplitPosition] = useState(50); // percentage
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState('input'); // 'input' or 'upload'
  const [showClearModal, setShowClearModal] = useState(false);
  const previewRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const adjustedX = e.clientX;
      const containerWidth = window.innerWidth;
      const newSplitPosition = (adjustedX / containerWidth) * 100;

      if (newSplitPosition > 10 && newSplitPosition < 90) {
        setSplitPosition(newSplitPosition);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setMarkdown(e.target.result);
        setTitle(file.name.replace(/\.[^/.]+$/, ""));
        setActiveTab('input'); // Switch back to input tab after upload
      };
      reader.readAsText(file);
    }
    // Reset file input
    event.target.value = '';
  };

  const handleDownload = () => {
    if (!previewRef.current) return;

    const element = previewRef.current;
    const opt = {
      margin: 10,
      filename: `${title}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  const handleClear = () => {
    setShowClearModal(true);
  };

  const confirmClear = () => {
    setMarkdown('');
    setShowClearModal(false);
  };

  const cancelClear = () => {
    setShowClearModal(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Toolbar
        onDownload={handleDownload}
        onClear={handleClear}
        theme={theme}
        onToggleTheme={toggleTheme}
        title={title}
        onTitleChange={setTitle}
      />

      <main style={{
        display: 'flex',
        flex: 1,
        overflow: 'hidden',
        cursor: isDragging ? 'col-resize' : 'default',
        backgroundColor: 'var(--bg-app)'
      }}>
        <div style={{ width: `${splitPosition}%`, minWidth: '10%', overflow: 'hidden' }}>
          <Editor
            value={markdown}
            onChange={setMarkdown}
            activeTab={activeTab}
            onTabSwitch={handleTabSwitch}
            onUpload={handleUpload}
            fileInputRef={fileInputRef}
          />
        </div>

        <div
          className={`resizer ${isDragging ? 'dragging' : ''}`}
          onMouseDown={handleMouseDown}
        />

        <div style={{ width: `${100 - splitPosition}%`, minWidth: '10%', overflow: 'hidden', height: '100%' }}>
          <Preview ref={previewRef} content={markdown} />
        </div>
      </main>

      {/* Custom Clear Confirmation Modal */}
      {showClearModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(4px)'
        }}>
          <div className="glass-panel" style={{
            padding: '32px',
            borderRadius: '16px',
            maxWidth: '400px',
            width: '90%',
            border: '1px solid var(--border-color)'
          }}>
            <h2 style={{
              margin: '0 0 16px 0',
              fontSize: '1.25rem',
              fontWeight: 600,
              color: 'var(--text-primary)'
            }}>Clear Editor?</h2>
            <p style={{
              margin: '0 0 24px 0',
              color: 'var(--text-secondary)',
              lineHeight: 1.6
            }}>Are you sure you want to clear all content? This action cannot be undone.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                className="button"
                onClick={cancelClear}
                style={{ minWidth: '80px' }}
              >
                Cancel
              </button>
              <button
                className="button primary"
                onClick={confirmClear}
                style={{ minWidth: '80px', backgroundColor: '#ef4444' }}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

