import { useState } from 'react';

interface LinkListProps {
  links: string[];
  onAdd: (url: string) => void;
  onRemove: (index: number) => void;
}

function getLinkIcon(url: string): { icon: string; label: string } {
  if (url.includes('docs.google.com/document')) return { icon: '📄', label: 'Google Doc' };
  if (url.includes('docs.google.com/spreadsheets')) return { icon: '📊', label: 'Google Sheet' };
  if (url.includes('docs.google.com/presentation')) return { icon: '📽️', label: 'Google Slides' };
  if (url.includes('drive.google.com')) return { icon: '📁', label: 'Google Drive' };
  if (url.includes('figma.com')) return { icon: '🎨', label: 'Figma' };
  if (url.includes('quip.com')) return { icon: '📝', label: 'Quip' };
  return { icon: '🔗', label: 'Link' };
}

function truncateUrl(url: string, max = 60): string {
  if (url.length <= max) return url;
  return url.slice(0, max - 3) + '...';
}

export function LinkList({ links, onAdd, onRemove }: LinkListProps) {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData('text').trim();
    if (pasted && (pasted.startsWith('http://') || pasted.startsWith('https://'))) {
      e.preventDefault();
      onAdd(pasted);
      setInputValue('');
    }
  };

  return (
    <div className="slds-m-top_medium">
      <label className="slds-form-element__label" style={{ fontSize: '0.75rem', color: '#706e6b' }}>
        Links (Google Docs, Sheets, Figma, etc.)
      </label>

      {links.length > 0 && (
        <ul className="slds-m-bottom_small" style={{ listStyle: 'none', padding: 0, margin: '0.5rem 0' }}>
          {links.map((url, i) => {
            const { icon, label } = getLinkIcon(url);
            return (
              <li
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.4rem 0.5rem',
                  background: '#f3f3f3',
                  borderRadius: '0.25rem',
                  marginBottom: '0.35rem',
                  fontSize: '0.85rem',
                }}
              >
                <span title={label}>{icon}</span>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#0176d3' }}
                  title={url}
                >
                  {truncateUrl(url)}
                </a>
                <button
                  type="button"
                  className="slds-button slds-button_icon slds-button_icon-bare"
                  title="Remove link"
                  onClick={() => onRemove(i)}
                  style={{ flexShrink: 0, color: '#706e6b' }}
                >
                  <svg width="14" height="14" viewBox="0 0 12 12" aria-hidden="true">
                    <path d="M7.4 6l4.3-4.3c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0L6 4.6 1.7.3C1.3-.1.7-.1.3.3c-.4.4-.4 1 0 1.4L4.6 6 .3 10.3c-.4.4-.4 1 0 1.4.2.2.4.3.7.3.3 0 .5-.1.7-.3L6 7.4l4.3 4.3c.2.2.5.3.7.3.2 0 .5-.1.7-.3.4-.4.4-1 0-1.4L7.4 6z" fill="currentColor"/>
                  </svg>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <div className="slds-form-element" style={{ flex: 1, marginBottom: 0 }}>
          <div className="slds-form-element__control">
            <input
              className="slds-input"
              type="url"
              placeholder="Paste a link and press Enter..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              style={{ fontSize: '0.85rem' }}
            />
          </div>
        </div>
        <button
          type="button"
          className="slds-button slds-button_neutral"
          onClick={handleAdd}
          disabled={!inputValue.trim()}
          style={{ whiteSpace: 'nowrap' }}
        >
          Add Link
        </button>
      </div>
      <p style={{ fontSize: '0.75rem', color: '#706e6b', marginTop: '0.35rem' }}>
        Paste links to Google Docs, Sheets, Slides, Figma, or any URL. These will be included in your AI prompt.
      </p>
    </div>
  );
}
