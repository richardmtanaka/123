export interface ProgressBarProps {
  value: number;
  label?: string;
}

export function ProgressBar({ value, label }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className="slds-form-element">
      {label && (
        <div
          className="slds-grid slds-grid_align-spread slds-m-bottom_x-small"
        >
          <span className="slds-form-element__label">{label}</span>
          <span className="slds-text-body_small">{clamped}%</span>
        </div>
      )}
      <div
        className="slds-progress-bar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={clamped}
        role="progressbar"
      >
        <span
          className="slds-progress-bar__value"
          style={{ width: `${clamped}%` }}
        >
          <span className="slds-assistive-text">
            Progress: {clamped}%
          </span>
        </span>
      </div>
    </div>
  );
}
