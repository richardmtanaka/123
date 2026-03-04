import { type ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  footer?: ReactNode;
  size?: "small" | "medium" | "large";
  children: ReactNode;
}

const sizeClassMap: Record<string, string> = {
  small: "slds-modal_small",
  medium: "slds-modal_medium",
  large: "slds-modal_large",
};

export function Modal({
  isOpen,
  onClose,
  title,
  footer,
  size = "medium",
  children,
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <>
      <section
        role="dialog"
        tabIndex={-1}
        aria-modal="true"
        aria-label={title}
        className={`slds-modal slds-fade-in-open ${sizeClassMap[size] ?? ""}`}
      >
        <div className="slds-modal__container">
          <header className="slds-modal__header">
            <button
              type="button"
              className="slds-button slds-button_icon slds-modal__close slds-button_icon-inverse"
              title="Close"
              onClick={onClose}
            >
              <svg
                className="slds-button__icon slds-button__icon_large"
                viewBox="0 0 12 12"
                width="16"
                height="16"
                aria-hidden="true"
              >
                <path
                  d="M7.4 6l4.3-4.3c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0L6 4.6 1.7.3C1.3-.1.7-.1.3.3c-.4.4-.4 1 0 1.4L4.6 6 .3 10.3c-.4.4-.4 1 0 1.4.2.2.4.3.7.3.3 0 .5-.1.7-.3L6 7.4l4.3 4.3c.2.2.5.3.7.3.2 0 .5-.1.7-.3.4-.4.4-1 0-1.4L7.4 6z"
                  fill="currentColor"
                />
              </svg>
              <span className="slds-assistive-text">Close</span>
            </button>
            <h2 className="slds-modal__title slds-hyphenate">{title}</h2>
          </header>
          <div className="slds-modal__content slds-p-around_medium">
            {children}
          </div>
          {footer && (
            <footer className="slds-modal__footer">{footer}</footer>
          )}
        </div>
      </section>
      <div
        className="slds-backdrop slds-backdrop_open"
        onClick={onClose}
      />
    </>,
    document.body,
  );
}
