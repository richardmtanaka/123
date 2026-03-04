import { type TextareaHTMLAttributes, useId } from "react";
import { FormGroup } from "./FormGroup";

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  tooltip?: string;
}

export function Textarea({
  label,
  required,
  hint,
  error,
  tooltip,
  id: idProp,
  ...rest
}: TextareaProps) {
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
      <textarea
        id={id}
        className="slds-textarea"
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
