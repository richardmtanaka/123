import { RepeaterField } from '../ui/RepeaterField';
import { StepWrapper } from './StepWrapper';
import { usePrdContext } from '../../store/prd-context';
import { useValidation } from '../../hooks/useValidation';
import { TOOLTIP_CONTENT } from '../../constants/steps';

export interface JtbdStepProps {
  stepIndex: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
}

export function JtbdStep({ stepIndex, totalSteps, onNext, onPrev }: JtbdStepProps) {
  const { prdDoc, dispatch } = usePrdContext();
  const { errors, touched } = useValidation(stepIndex, prdDoc.data);
  const data = prdDoc.data;

  // Map string[] to Record<string,string>[] for RepeaterField
  const rows = data.jtbd.map((value) => ({ value }));

  return (
    <StepWrapper
      title="Jobs To Be Done"
      stepBadge="Step 6"
      description={TOOLTIP_CONTENT.jtbd}
      stepIndex={stepIndex}
      totalSteps={totalSteps}
      onNext={onNext}
      onPrev={onPrev}
    >
      <RepeaterField
        label="JTBD Statements"
        fields={[{ key: 'value', placeholder: 'e.g., Personalize my message with related data...', flex: 1 }]}
        rows={rows}
        onChange={(rowIndex, _key, value) => {
          dispatch({ type: 'UPDATE_JTBD', index: rowIndex, value });
        }}
        onAdd={() => dispatch({ type: 'ADD_JTBD' })}
        onRemove={(rowIndex) => dispatch({ type: 'REMOVE_JTBD', index: rowIndex })}
        addLabel="Add JTBD"
      />
      {touched.has('jtbd') && errors.jtbd && (
        <div
          className="slds-form-element__help slds-m-top_x-small"
          style={{ color: 'var(--slds-g-color-error-base-40, #c23934)' }}
        >
          {errors.jtbd}
        </div>
      )}
    </StepWrapper>
  );
}
