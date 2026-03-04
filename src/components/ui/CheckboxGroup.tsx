import { useId } from "react";

export interface CheckboxGroupProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  columns?: number;
  error?: string;
}

export function CheckboxGroup({
  label,
  options,
  selected,
  onChange,
  columns = 2,
  error,
}: CheckboxGroupProps) {
  const groupId = useId();

  const handleToggle = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((s) => s !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <fieldset
      className={`slds-form-element${error ? " slds-has-error" : ""}`}
    >
      <legend className="slds-form-element__legend slds-form-element__label">
        {label}
      </legend>
      <div
        className="slds-form-element__control"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: "0.5rem",
        }}
      >
        {options.map((option) => {
          const cbId = `${groupId}-${option}`;
          return (
            <div className="slds-checkbox" key={option}>
              <input
                type="checkbox"
                id={cbId}
                checked={selected.includes(option)}
                onChange={() => handleToggle(option)}
              />
              <label className="slds-checkbox__label" htmlFor={cbId}>
                <span className="slds-checkbox_faux" />
                <span className="slds-form-element__label">{option}</span>
              </label>
            </div>
          );
        })}
      </div>
      {error && (
        <div
          className="slds-form-element__help"
          style={{ color: "var(--slds-g-color-error-base-40, #c23934)" }}
        >
          {error}
        </div>
      )}
    </fieldset>
  );
}
