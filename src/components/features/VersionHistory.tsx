import { useState } from 'react';
import type { VersionEntry } from '../../types/prd';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { ConfirmDialog } from '../ui/ConfirmDialog';

interface VersionHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  versions: VersionEntry[];
  onRestore: (version: VersionEntry) => void;
}

function formatTimestamp(iso: string): string {
  try {
    return new Date(iso).toLocaleString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

export function VersionHistory({ isOpen, onClose, versions, onRestore }: VersionHistoryProps) {
  const [restoreTarget, setRestoreTarget] = useState<VersionEntry | null>(null);

  const handleRestore = () => {
    if (restoreTarget) {
      onRestore(restoreTarget);
      setRestoreTarget(null);
      onClose();
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Version History" size="medium">
        {versions.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#706e6b' }}>
            <p style={{ fontSize: '0.9rem' }}>No versions saved yet.</p>
            <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
              Versions are created automatically when you visit the Review step, or you can save one manually.
            </p>
          </div>
        ) : (
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {[...versions].reverse().map((v, i) => (
              <div
                key={v.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  borderBottom: '1px solid #e5e5e5',
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>
                    {v.label || `Version ${versions.length - i}`}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#706e6b' }}>
                    {formatTimestamp(v.timestamp)}
                  </div>
                </div>
                <Button variant="neutral" size="small" onClick={() => setRestoreTarget(v)}>
                  Restore
                </Button>
              </div>
            ))}
          </div>
        )}
      </Modal>

      <ConfirmDialog
        isOpen={!!restoreTarget}
        title="Restore Version"
        message="This will replace all current data with this version. Continue?"
        confirmLabel="Restore"
        onConfirm={handleRestore}
        onCancel={() => setRestoreTarget(null)}
      />
    </>
  );
}
