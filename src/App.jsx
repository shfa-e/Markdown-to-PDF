import React, { useState, useRef, useEffect } from 'react';
import html2pdf from 'html2pdf.js';
import Toolbar from './components/Toolbar';
import Editor from './components/Editor';
import Preview from './components/Preview';

const DEFAULT_MARKDOWN = `# Welcome to Markdown to PDF

This is a simple tool to convert your markdown text into professional PDF documents.

## Features
- **Live Preview**: See your changes instantly.
- **Easy Export**: One-click PDF download.
- **Privacy Focus**: Everything runs in your browser.

## How to use
1. Type or paste your markdown on the left.
2. View the preview on the right.
3. Click "Download PDF" when ready.
`;

function App() {
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [splitPosition, setSplitPosition] = useState(50); // percentage
  const [isDragging, setIsDragging] = useState(false);
  const previewRef = useRef(null);

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

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const newSplitPosition = (e.clientX / window.innerWidth) * 100;
      if (newSplitPosition > 20 && newSplitPosition < 80) {
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
      };
      reader.readAsText(file);
    }
  };

  const handleDownload = () => {
    if (!previewRef.current) return;

    const element = previewRef.current;
    const opt = {
      margin: 0,
      filename: 'document.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  const handleClear = () => {
    if (confirm('Are you sure you want to clear the editor?')) {
      setMarkdown('');
    }
  };

  return (
    <>
      <Toolbar
        onUpload={handleUpload}
        onDownload={handleDownload}
        onClear={handleClear}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <main style={{
        display: 'flex',
        flex: 1,
        overflow: 'hidden',
        cursor: isDragging ? 'col-resize' : 'default'
      }}>
        <div style={{ width: `${splitPosition}%`, overflow: 'hidden' }}>
          <Editor value={markdown} onChange={setMarkdown} />
        </div>
        <div
          className={`resizer ${isDragging ? 'dragging' : ''}`}
          onMouseDown={handleMouseDown}
        />
        <div style={{ width: `${100 - splitPosition}%`, overflow: 'hidden' }}>
          <Preview ref={previewRef} content={markdown} />
        </div>
      </main>
    </>
  );
}

export default App;
