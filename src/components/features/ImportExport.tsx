import { useRef } from 'react';
import type { PrdDocument } from '../../types/prd';
import { Button } from '../ui/Button';

interface ImportExportProps {
  prdDoc: PrdDocument;
  onImport: (doc: PrdDocument) => void;
}

export function ImportExport({ prdDoc, onImport }: ImportExportProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(prdDoc, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `PRD-${(prdDoc.data.feature_title || 'untitled').replace(/\s+/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const doc = JSON.parse(reader.result as string) as PrdDocument;
        if (doc.data && doc.metadata) {
          onImport(doc);
        }
      } catch {
        alert('Invalid PRD JSON file.');
      }
    };
    reader.readAsText(file);
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <Button variant="neutral" onClick={handleExportJson} size="small">
        Export JSON
      </Button>
      <Button variant="neutral" onClick={() => fileRef.current?.click()} size="small">
        Import JSON
      </Button>
      <input
        ref={fileRef}
        type="file"
        accept=".json"
        style={{ display: 'none' }}
        onChange={handleImportJson}
      />
    </div>
  );
}
