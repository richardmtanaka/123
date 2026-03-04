import { useEffect } from "react";

export interface ToastProps {
  message: string;
  variant?: "success" | "error" | "warning" | "info";
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

const variantThemeMap: Record<string, string> = {
  success: "slds-theme_success",
  error: "slds-theme_error",
  warning: "slds-theme_warning",
  info: "slds-theme_info",
};

const variantIconMap: Record<string, string> = {
  success: "\u2713",
  error: "\u2717",
  warning: "\u26A0",
  info: "\u2139",
};

export function Toast({
  message,
  variant = "info",
  isVisible,
  onClose,
  duration = 5000,
}: ToastProps) {
  useEffect(() => {
    if (!isVisible || duration <= 0) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [isVisible, duration, onClose]);

  return (
    <div
      className="slds-notify_container"
      style={{
        position: "fixed",
        bottom: "1rem",
        right: "1rem",
        top: "auto",
        left: "auto",
        zIndex: 10000,
        transform: isVisible ? "translateY(0)" : "translateY(100%)",
        opacity: isVisible ? 1 : 0,
        transition: "transform 0.3s ease, opacity 0.3s ease",
        pointerEvents: isVisible ? "auto" : "none",
      }}
    >
      <div
        className={`slds-notify slds-notify_toast ${variantThemeMap[variant] ?? ""}`}
        role="status"
      >
        <span className="slds-assistive-text">{variant}</span>
        <span
          className="slds-m-right_small"
          aria-hidden="true"
          style={{ fontSize: "1.25rem" }}
        >
          {variantIconMap[variant]}
        </span>
        <div className="slds-notify__content">
          <h2 className="slds-text-heading_small">{message}</h2>
        </div>
        <div className="slds-notify__close">
          <button
            type="button"
            className="slds-button slds-button_icon slds-button_icon-inverse"
            title="Close"
            onClick={onClose}
          >
            <svg
              className="slds-button__icon slds-button__icon_large"
              viewBox="0 0 12 12"
              width="14"
              height="14"
              aria-hidden="true"
            >
              <path
                d="M7.4 6l4.3-4.3c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0L6 4.6 1.7.3C1.3-.1.7-.1.3.3c-.4.4-.4 1 0 1.4L4.6 6 .3 10.3c-.4.4-.4 1 0 1.4.2.2.4.3.7.3.3 0 .5-.1.7-.3L6 7.4l4.3 4.3c.2.2.5.3.7.3.2 0 .5-.1.7-.3.4-.4.4-1 0-1.4L7.4 6z"
                fill="currentColor"
              />
            </svg>
            <span className="slds-assistive-text">Close</span>
          </button>
        </div>
      </div>
    </div>
  );
}
