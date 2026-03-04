import { useId } from "react";
import { FormGroup } from "./FormGroup";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  label: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  hint?: string;
  error?: string;
  tooltip?: string;
  placeholder?: string;
  disabled?: boolean;
}

export function Select({
  label,
  options,
  value,
  onChange,
  required,
  hint,
  error,
  tooltip,
  placeholder,
  disabled,
}: SelectProps) {
  const id = useId();

  return (
    <FormGroup
      label={label}
      htmlFor={id}
      required={required}
      hint={hint}
      error={error}
      tooltip={tooltip}
    >
      <select
        id={id}
        className="slds-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
        aria-describedby={
          error ? `${id}-error` : hint ? `${id}-hint` : undefined
        }
        aria-invalid={!!error}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </FormGroup>
  );
}
