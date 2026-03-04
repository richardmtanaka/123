import type { PrdFormData } from '../../types/prd';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

interface TemplateSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (templateData?: Partial<PrdFormData>) => void;
}

export function TemplateSelector({ isOpen, onClose, onSelect }: TemplateSelectorProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New PRD" size="small">
      <p style={{ fontSize: '0.85rem', color: '#706e6b', marginBottom: '1.25rem' }}>
        Create a new blank PRD to get started.
      </p>
      <Button
        variant="brand"
        onClick={() => { onSelect(); onClose(); }}
        style={{ width: '100%' }}
      >
        Create Blank PRD
      </Button>
    </Modal>
  );
}
