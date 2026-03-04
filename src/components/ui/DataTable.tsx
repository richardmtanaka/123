import { IconButton } from "./IconButton";
import { Button } from "./Button";

export interface DataTableColumn {
  key: string;
  label: string;
  width?: string;
}

export interface DataTableProps {
  columns: DataTableColumn[];
  rows: Record<string, string>[];
  onChange: (rowIndex: number, key: string, value: string) => void;
  onRemove: (rowIndex: number) => void;
  onAdd: () => void;
}

export function DataTable({
  columns,
  rows,
  onChange,
  onRemove,
  onAdd,
}: DataTableProps) {
  return (
    <div>
      <table className="slds-table slds-table_bordered slds-table_cell-buffer">
        <thead>
          <tr className="slds-line-height_reset">
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                style={col.width ? { width: col.width } : undefined}
              >
                <div className="slds-truncate" title={col.label}>
                  {col.label}
                </div>
              </th>
            ))}
            <th scope="col" style={{ width: "3rem" }}>
              <span className="slds-assistive-text">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col) => (
                <td key={col.key} data-label={col.label}>
                  <input
                    className="slds-input"
                    value={row[col.key] ?? ""}
                    onChange={(e) =>
                      onChange(rowIndex, col.key, e.target.value)
                    }
                    aria-label={`${col.label} row ${rowIndex + 1}`}
                  />
                </td>
              ))}
              <td>
                <IconButton
                  icon="delete"
                  title={`Remove row ${rowIndex + 1}`}
                  variant="bare"
                  size="small"
                  onClick={() => onRemove(rowIndex)}
                />
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td
                colSpan={columns.length + 1}
                style={{ textAlign: "center" }}
                className="slds-p-around_medium slds-text-color_weak"
              >
                No rows yet. Add one below.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="slds-m-top_small">
        <Button variant="neutral" onClick={onAdd}>
          Add Row
        </Button>
      </div>
    </div>
  );
}
