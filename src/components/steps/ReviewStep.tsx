import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { usePrdContext } from '../../store/prd-context';
import { REF_FIELDS } from '../../constants/steps';

export interface ReviewStepProps {
  stepIndex: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  onStepClick: (step: number) => void;
  onExport: () => void;
  onReset: () => void;
}

function SectionHeader({
  label,
  stepNumber,
  onStepClick,
}: {
  label: string;
  stepNumber: number;
  onStepClick: (step: number) => void;
}) {
  return (
    <h3
      className="slds-text-heading_small slds-m-top_large slds-m-bottom_small"
      style={{ cursor: 'pointer', color: 'var(--slds-g-color-brand-base-50, #0176d3)' }}
      onClick={() => onStepClick(stepNumber)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onStepClick(stepNumber);
        }
      }}
    >
      {label}
    </h3>
  );
}

function FieldValue({ label, value }: { label: string; value: string }) {
  return (
    <div className="slds-m-bottom_x-small">
      <span className="slds-text-title_caps slds-text-color_weak">{label}: </span>
      {value ? (
        <span>{value}</span>
      ) : (
        <span className="slds-text-color_weak" style={{ fontStyle: 'italic' }}>
          Not provided
        </span>
      )}
    </div>
  );
}

export function ReviewStep({
  onPrev,
  onStepClick,
  onExport,
  onReset,
}: ReviewStepProps) {
  const { prdDoc } = usePrdContext();
  const data = prdDoc.data;

  const reviewersText =
    data.reviewers
      .filter((r) => r.name.trim())
      .map((r) => (r.role ? `${r.name} (${r.role})` : r.name))
      .join(', ') || '';

  const personasText = data.personas.length > 0 ? data.personas.join(', ') : '';

  const footer = (
    <div className="slds-grid slds-grid_align-spread" style={{ width: '100%' }}>
      <div className="slds-grid slds-gutters_x-small">
        <Button variant="neutral" onClick={onPrev}>
          Previous
        </Button>
        <Button variant="neutral" onClick={onReset}>
          Reset All
        </Button>
      </div>
      <div className="slds-grid slds-gutters_x-small">
        <Button variant="success" onClick={onExport}>
          Export as AI Prompt
        </Button>
      </div>
    </div>
  );

  return (
    <Card title="Review & Export" stepBadge="Review" footer={footer}>
      <p className="slds-text-body_regular slds-text-color_weak slds-m-bottom_medium">
        Review your PRD details below. Click any section header to jump back and edit.
      </p>

      {/* Step 1: Feature Basics */}
      <SectionHeader label="1. Feature Basics" stepNumber={0} onStepClick={onStepClick} />
      <FieldValue label="Feature Title" value={data.feature_title} />
      <FieldValue label="Domain Area" value={data.domain_area} />
      <FieldValue label="V2MOM" value={data.v2mom} />
      <FieldValue label="Release" value={data.release} />

      {/* Step 2: People */}
      <SectionHeader label="2. People" stepNumber={1} onStepClick={onStepClick} />
      <FieldValue label="PRD Owner" value={data.prd_owner} />
      <FieldValue label="Designer" value={data.designer} />
      <FieldValue label="Architect" value={data.architect} />
      <FieldValue label="Engineering Manager" value={data.em} />
      <FieldValue label="TPM" value={data.tpm} />
      <FieldValue label="CX" value={data.cx} />
      <FieldValue label="Reviewers" value={reviewersText} />

      {/* Step 3: Target Personas */}
      <SectionHeader label="3. Target Personas" stepNumber={2} onStepClick={onStepClick} />
      <FieldValue label="Personas" value={personasText} />
      <FieldValue label="Other Persona" value={data.persona_other} />

      {/* Step 4: Problem & Opportunity */}
      <SectionHeader label="4. Problem & Opportunity" stepNumber={3} onStepClick={onStepClick} />
      <FieldValue label="Elevator Pitch" value={data.elevator_pitch} />
      <FieldValue label="Customer Problem" value={data.customer_problem} />
      <FieldValue label="Out of Scope" value={data.out_of_scope} />

      {/* Step 5: Business Goals */}
      <SectionHeader label="5. Business Goals" stepNumber={4} onStepClick={onStepClick} />
      <FieldValue label="Customers Requesting This" value={data.business_customers} />
      <FieldValue label="Business Goals" value={data.business_goals} />
      <FieldValue label="Revenue Impact" value={data.business_revenue_impact} />

      {/* Step 6: Jobs To Be Done */}
      <SectionHeader label="6. Jobs To Be Done" stepNumber={5} onStepClick={onStepClick} />
      {data.jtbd.filter((j) => j.trim()).length > 0 ? (
        <ol className="slds-list_ordered slds-m-left_medium">
          {data.jtbd
            .filter((j) => j.trim())
            .map((job, i) => (
              <li key={i} className="slds-m-bottom_xx-small">
                {job}
              </li>
            ))}
        </ol>
      ) : (
        <p className="slds-text-color_weak" style={{ fontStyle: 'italic' }}>
          Not provided
        </p>
      )}

      {/* Step 7: Success Metrics */}
      <SectionHeader label="7. Success Metrics" stepNumber={6} onStepClick={onStepClick} />
      {data.metrics.filter((m) => m.metric.trim()).length > 0 ? (
        <table className="slds-table slds-table_bordered slds-table_cell-buffer slds-m-bottom_small">
          <thead>
            <tr className="slds-line-height_reset">
              <th scope="col">
                <div className="slds-truncate">Metric</div>
              </th>
              <th scope="col">
                <div className="slds-truncate">Defined As</div>
              </th>
              <th scope="col">
                <div className="slds-truncate">Goal</div>
              </th>
              <th scope="col">
                <div className="slds-truncate">Instrumentation</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.metrics
              .filter((m) => m.metric.trim())
              .map((m, i) => (
                <tr key={i}>
                  <td>{m.metric}</td>
                  <td>{m.defined}</td>
                  <td>{m.goal}</td>
                  <td>{m.instrumentation}</td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <p className="slds-text-color_weak" style={{ fontStyle: 'italic' }}>
          Not provided
        </p>
      )}

      {/* Step 8: Competitive Context */}
      <SectionHeader label="8. Competitive Context" stepNumber={7} onStepClick={onStepClick} />
      <FieldValue label="Competitive Context" value={data.competitive_context} />

      {/* Step 9: Reference Materials */}
      <SectionHeader label="9. Reference Materials" stepNumber={8} onStepClick={onStepClick} />
      {REF_FIELDS.some((f) => data.references[f.key]?.trim()) ? (
        REF_FIELDS.filter((f) => data.references[f.key]?.trim()).map((field) => (
          <FieldValue
            key={field.key}
            label={field.label}
            value={data.references[field.key]}
          />
        ))
      ) : (
        <p className="slds-text-color_weak" style={{ fontStyle: 'italic' }}>
          Not provided
        </p>
      )}

      {/* Step 10: Additional Notes */}
      <SectionHeader label="10. Additional Notes" stepNumber={9} onStepClick={onStepClick} />
      <FieldValue label="Notes" value={data.additional_notes} />
    </Card>
  );
}
