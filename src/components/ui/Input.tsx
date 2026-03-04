import { type InputHTMLAttributes, useId } from "react";
import { FormGroup } from "./FormGroup";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  tooltip?: string;
}

export function Input({
  label,
  required,
  hint,
  error,
  tooltip,
  id: idProp,
  ...rest
}: InputProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;

  return (
    <FormGroup
      label={label}
      htmlFor={id}
      required={required}
      hint={hint}
      error={error}
      tooltip={tooltip}
    >
      <input
        id={id}
        className="slds-input"
        required={required}
        aria-describedby={
          error ? `${id}-error` : hint ? `${id}-hint` : undefined
        }
        aria-invalid={!!error}
        {...rest}
      />
    </FormGroup>
  );
}
