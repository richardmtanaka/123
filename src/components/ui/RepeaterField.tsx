import { IconButton } from "./IconButton";
import { Button } from "./Button";

export interface RepeaterFieldDefinition {
  key: string;
  placeholder: string;
  flex?: number;
}

export interface RepeaterFieldProps {
  label: string;
  fields: RepeaterFieldDefinition[];
  rows: Record<string, string>[];
  onChange: (rowIndex: number, key: string, value: string) => void;
  onAdd: () => void;
  onRemove: (rowIndex: number) => void;
  addLabel?: string;
}

export function RepeaterField({
  label,
  fields,
  rows,
  onChange,
  onAdd,
  onRemove,
  addLabel = "Add Row",
}: RepeaterFieldProps) {
  return (
    <div className="slds-form-element">
      <span className="slds-form-element__label">{label}</span>
      <div className="slds-form-element__control">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="slds-grid slds-gutters_x-small slds-m-bottom_x-small"
            style={{ alignItems: "center" }}
          >
            {fields.map((field) => (
              <div
                key={field.key}
                className="slds-col"
                style={{ flex: field.flex ?? 1 }}
              >
                <input
                  className="slds-input"
                  placeholder={field.placeholder}
                  value={row[field.key] ?? ""}
                  onChange={(e) =>
                    onChange(rowIndex, field.key, e.target.value)
                  }
                  aria-label={`${field.placeholder} row ${rowIndex + 1}`}
                />
              </div>
            ))}
            <div className="slds-col slds-grow-none">
              <IconButton
                icon="delete"
                title={`Remove row ${rowIndex + 1}`}
                variant="bare"
                size="small"
                onClick={() => onRemove(rowIndex)}
              />
            </div>
          </div>
        ))}
        <div className="slds-m-top_small">
          <Button variant="neutral" onClick={onAdd}>
            {addLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
