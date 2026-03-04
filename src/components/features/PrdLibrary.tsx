import { useState } from 'react';
import { useLibrary } from '../../store/library-context';
import { LibraryCard } from './LibraryCard';
import { TemplateSelector } from './TemplateSelector';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import { Button } from '../ui/Button';
import type { PrdFormData } from '../../types/prd';

interface PrdLibraryProps {
  onOpenPrd: (id: string) => void;
}

export function PrdLibrary({ onOpenPrd }: PrdLibraryProps) {
  const { documents, createDocument, duplicateDocument, deleteDocument } = useLibrary();
  const [showTemplates, setShowTemplates] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const filtered = documents.filter((d) =>
    d.title.toLowerCase().includes(search.toLowerCase()) ||
    d.domainArea.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = (templateData?: Partial<PrdFormData>) => {
    const id = createDocument(templateData);
    onOpenPrd(id);
  };

  const handleDuplicate = (id: string) => {
    const newId = duplicateDocument(id);
    onOpenPrd(newId);
  };

  const handleDelete = () => {
    if (deleteTarget) {
      deleteDocument(deleteTarget);
      setDeleteTarget(null);
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 className="slds-text-heading_large" style={{ fontSize: '1.5rem', fontWeight: 700, color: '#032d60' }}>
            PRD Library
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#706e6b', marginTop: '0.25rem' }}>
            {documents.length} document{documents.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button variant="brand" onClick={() => setShowTemplates(true)}>
          + New PRD
        </Button>
      </div>

      {documents.length > 3 && (
        <div style={{ marginBottom: '1rem' }}>
          <input
            className="slds-input"
            placeholder="Search PRDs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ maxWidth: '320px' }}
          />
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="slds-card" style={{ textAlign: 'center', padding: '3rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📋</div>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#032d60' }}>
            {documents.length === 0 ? 'No PRDs yet' : 'No results'}
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#706e6b', marginBottom: '1rem' }}>
            {documents.length === 0
              ? 'Create your first PRD to get started.'
              : 'Try a different search term.'}
          </p>
          {documents.length === 0 && (
            <Button variant="brand" onClick={() => setShowTemplates(true)}>
              Create PRD
            </Button>
          )}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
          {filtered.map((doc) => (
            <LibraryCard
              key={doc.id}
              doc={doc}
              onOpen={() => onOpenPrd(doc.id)}
              onDuplicate={() => handleDuplicate(doc.id)}
              onDelete={() => setDeleteTarget(doc.id)}
            />
          ))}
        </div>
      )}

      <TemplateSelector
        isOpen={showTemplates}
        onClose={() => setShowTemplates(false)}
        onSelect={handleCreate}
      />

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete PRD"
        message="Are you sure you want to delete this PRD? This action cannot be undone."
        variant="destructive"
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
