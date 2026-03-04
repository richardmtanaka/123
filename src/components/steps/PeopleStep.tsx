import { Input } from '../ui/Input';
import { RepeaterField } from '../ui/RepeaterField';
import { StepWrapper } from './StepWrapper';
import { usePrdContext } from '../../store/prd-context';
import { useValidation } from '../../hooks/useValidation';

export interface PeopleStepProps {
  stepIndex: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
}

export function PeopleStep({ stepIndex, totalSteps, onNext, onPrev }: PeopleStepProps) {
  const { prdDoc, dispatch } = usePrdContext();
  const { errors, touched, touch } = useValidation(stepIndex, prdDoc.data);
  const data = prdDoc.data;

  const setField = (field: string, value: string) => {
    dispatch({ type: 'SET_FIELD', field: field as keyof typeof data, value });
  };

  const reviewerRows = data.reviewers.map((r) => ({ name: r.name, role: r.role }));

  return (
    <StepWrapper
      title="People"
      stepBadge="Step 2"
      description="Identify the key people involved in this PRD."
      stepIndex={stepIndex}
      totalSteps={totalSteps}
      onNext={onNext}
      onPrev={onPrev}
    >
      <div className="slds-grid slds-gutters slds-m-bottom_medium">
        <div className="slds-col slds-size_1-of-2">
          <Input
            label="PRD Owner"
            required
            placeholder="Full name"
            value={data.prd_owner}
            onChange={(e) => setField('prd_owner', e.target.value)}
            onBlur={() => touch('prd_owner')}
            error={touched.has('prd_owner') ? errors.prd_owner : undefined}
          />
        </div>
        <div className="slds-col slds-size_1-of-2">
          <Input
            label="Designer"
            placeholder="Full name"
            value={data.designer}
            onChange={(e) => setField('designer', e.target.value)}
          />
        </div>
      </div>

      <div className="slds-grid slds-gutters slds-m-bottom_medium">
        <div className="slds-col slds-size_1-of-2">
          <Input
            label="Architect"
            placeholder="Full name"
            value={data.architect}
            onChange={(e) => setField('architect', e.target.value)}
          />
        </div>
        <div className="slds-col slds-size_1-of-2">
          <Input
            label="Engineering Manager"
            placeholder="Full name"
            value={data.em}
            onChange={(e) => setField('em', e.target.value)}
          />
        </div>
      </div>

      <div className="slds-grid slds-gutters slds-m-bottom_medium">
        <div className="slds-col slds-size_1-of-2">
          <Input
            label="TPM"
            placeholder="Full name"
            value={data.tpm}
            onChange={(e) => setField('tpm', e.target.value)}
          />
        </div>
        <div className="slds-col slds-size_1-of-2">
          <Input
            label="CX"
            placeholder="Full name"
            value={data.cx}
            onChange={(e) => setField('cx', e.target.value)}
          />
        </div>
      </div>

      <div className="slds-m-top_medium">
        <RepeaterField
          label="Reviewers"
          fields={[
            { key: 'name', placeholder: 'Reviewer name', flex: 2 },
            { key: 'role', placeholder: 'Role', flex: 1 },
          ]}
          rows={reviewerRows}
          onChange={(rowIndex, key, value) => {
            const current = data.reviewers[rowIndex];
            dispatch({
              type: 'UPDATE_REVIEWER',
              index: rowIndex,
              reviewer: { ...current, [key]: value },
            });
          }}
          onAdd={() => dispatch({ type: 'ADD_REVIEWER' })}
          onRemove={(rowIndex) => dispatch({ type: 'REMOVE_REVIEWER', index: rowIndex })}
          addLabel="Add Reviewer"
        />
      </div>
    </StepWrapper>
  );
}
