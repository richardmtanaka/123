import { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Toast } from '../ui/Toast';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  featureTitle: string;
}

export function ExportModal({ isOpen, onClose, content }: ExportModalProps) {
  const [toast, setToast] = useState<{ msg: string; variant: 'success' | 'warning' } | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setToast({ msg: 'Copied to clipboard!', variant: 'success' });
    } catch {
      setToast({ msg: 'Failed to copy', variant: 'warning' });
    }
  };

  const handleCopyAndOpenGemini = async () => {
    try {
      await navigator.clipboard.writeText(content);
      window.open('https://gemini.google.com/app', '_blank', 'noopener,noreferrer');
      setToast({ msg: 'Copied to clipboard & opened Gemini!', variant: 'success' });
    } catch {
      window.open('https://gemini.google.com/app', '_blank', 'noopener,noreferrer');
      setToast({ msg: 'Opened Gemini (clipboard copy failed)', variant: 'warning' });
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Export PRD as AI Prompt"
        size="large"
        footer={
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', width: '100%' }}>
            <Button variant="neutral" onClick={onClose}>Close</Button>
            <Button variant="neutral" onClick={handleCopy}>Copy to Clipboard</Button>
            <Button
              variant="brand"
              onClick={handleCopyAndOpenGemini}
              style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="#4285f4"/>
              </svg>
              Copy & Open in Gemini
            </Button>
          </div>
        }
      >
        <pre style={{
          background: '#f3f3f3',
          border: '1px solid #e5e5e5',
          borderRadius: '0.25rem',
          padding: '1rem',
          fontSize: '0.78rem',
          fontFamily: "'SF Mono', 'Fira Code', monospace",
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          maxHeight: '60vh',
          overflowY: 'auto',
          lineHeight: 1.5,
        }}>
          {content}
        </pre>
      </Modal>
      {toast && (
        <Toast
          message={toast.msg}
          variant={toast.variant}
          isVisible={!!toast}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}
