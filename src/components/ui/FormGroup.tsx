import { type ReactNode, useId, useState } from "react";

export interface FormGroupProps {
  label: string;
  htmlFor?: string;
  required?: boolean;
  hint?: string;
  error?: string;
  tooltip?: string;
  children: ReactNode;
}

export function FormGroup({
  label,
  htmlFor,
  required,
  hint,
  error,
  tooltip,
  children,
}: FormGroupProps) {
  const generatedId = useId();
  const id = htmlFor ?? generatedId;
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className={`slds-form-element${error ? " slds-has-error" : ""}`}
    >
      <label className="slds-form-element__label" htmlFor={id}>
        {required && (
          <abbr className="slds-required" title="required">
            *
          </abbr>
        )}
        {label}
        {tooltip && (
          <span style={{ position: "relative", marginLeft: "0.25rem" }}>
            <button
              type="button"
              className="slds-button slds-button_icon"
              aria-describedby={`${id}-tooltip`}
              onClick={() => setShowTooltip((v) => !v)}
              onBlur={() => setShowTooltip(false)}
            >
              <svg
                className="slds-button__icon"
                viewBox="0 0 16 16"
                width="16"
                height="16"
                aria-hidden="true"
              >
                <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.2" />
                <text
                  x="8"
                  y="12"
                  textAnchor="middle"
                  fontSize="11"
                  fill="currentColor"
                  fontWeight="bold"
                >
                  i
                </text>
              </svg>
              <span className="slds-assistive-text">Help</span>
            </button>
            {showTooltip && (
              <div
                id={`${id}-tooltip`}
                className="slds-popover slds-popover_tooltip slds-nubbin_bottom-left"
                role="tooltip"
                style={{
                  position: "absolute",
                  bottom: "100%",
                  left: 0,
                  zIndex: 10,
                  width: "16rem",
                  marginBottom: "0.5rem",
                }}
              >
                <div className="slds-popover__body">{tooltip}</div>
              </div>
            )}
          </span>
        )}
      </label>
      <div className="slds-form-element__control">{children}</div>
      {hint && !error && (
        <div className="slds-form-element__help" id={`${id}-hint`}>
          {hint}
        </div>
      )}
      {error && (
        <div
          className="slds-form-element__help"
          id={`${id}-error`}
          style={{ color: "var(--slds-g-color-error-base-40, #c23934)" }}
        >
          {error}
        </div>
      )}
    </div>
  );
}
