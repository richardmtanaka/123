import { Modal } from "./Modal";
import { Button } from "./Button";

export interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "destructive" | "default";
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      title={title}
      size="small"
      footer={
        <div className="slds-grid slds-grid_align-end slds-gutters_x-small">
          <div className="slds-col slds-grow-none">
            <Button variant="neutral" onClick={onCancel}>
              {cancelLabel}
            </Button>
          </div>
          <div className="slds-col slds-grow-none">
            <Button
              variant={variant === "destructive" ? "destructive" : "brand"}
              onClick={onConfirm}
            >
              {confirmLabel}
            </Button>
          </div>
        </div>
      }
    >
      <p>{message}</p>
    </Modal>
  );
}
