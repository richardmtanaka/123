import type { PrdDocumentSummary, DraftStatus } from '../../types/prd';

interface LibraryCardProps {
  doc: PrdDocumentSummary;
  onOpen: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

const STATUS_CONFIG: Record<DraftStatus, { label: string; className: string }> = {
  draft: { label: 'Draft', className: 'slds-theme_warning' },
  in_review: { label: 'In Review', className: 'slds-theme_info' },
  complete: { label: 'Complete', className: 'slds-theme_success' },
};

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

export function LibraryCard({ doc, onOpen, onDuplicate, onDelete }: LibraryCardProps) {
  const status = STATUS_CONFIG[doc.status] || STATUS_CONFIG.draft;

  return (
    <article className="slds-card" style={{ cursor: 'pointer', transition: 'box-shadow 0.2s' }} onClick={onOpen}>
      <div className="slds-card__header slds-grid">
        <header className="slds-media slds-media_center slds-has-flexi-truncate" style={{ flex: 1 }}>
          <div className="slds-media__body">
            <h2 className="slds-card__header-title" style={{ fontSize: '0.95rem' }}>
              {doc.title || 'Untitled PRD'}
            </h2>
          </div>
        </header>
        <div className="slds-no-flex">
          <span className={`slds-badge ${status.className}`} style={{ fontSize: '0.7rem' }}>
            {status.label}
          </span>
        </div>
      </div>
      <div className="slds-card__body slds-card__body_inner">
        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: '#706e6b' }}>
          {doc.domainArea && <span>{doc.domainArea}</span>}
          {doc.release && <span>Release {doc.release}</span>}
        </div>
        <div style={{ fontSize: '0.75rem', color: '#939393', marginTop: '0.5rem' }}>
          Last edited: {formatDate(doc.updatedAt)}
        </div>
      </div>
      <div className="slds-card__footer" onClick={(e) => e.stopPropagation()}>
        <button className="slds-button slds-button_neutral slds-button_small" onClick={onDuplicate}>
          Duplicate
        </button>
        <button className="slds-button slds-button_destructive slds-button_small" onClick={onDelete} style={{ marginLeft: '0.5rem' }}>
          Delete
        </button>
      </div>
    </article>
  );
}
