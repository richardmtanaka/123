import { DataTable } from '../ui/DataTable';
import { StepWrapper } from './StepWrapper';
import { usePrdContext } from '../../store/prd-context';
import { useValidation } from '../../hooks/useValidation';
import { TOOLTIP_CONTENT } from '../../constants/steps';

export interface MetricsStepProps {
  stepIndex: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
}

const METRIC_COLUMNS = [
  { key: 'metric', label: 'Metric', width: '25%' },
  { key: 'defined', label: 'Defined As', width: '25%' },
  { key: 'goal', label: 'Goal', width: '25%' },
  { key: 'instrumentation', label: 'Instrumentation', width: '25%' },
];

export function MetricsStep({ stepIndex, totalSteps, onNext, onPrev }: MetricsStepProps) {
  const { prdDoc, dispatch } = usePrdContext();
  const { errors, touched } = useValidation(stepIndex, prdDoc.data);
  const data = prdDoc.data;

  return (
    <StepWrapper
      title="Success Metrics"
      stepBadge="Step 7"
      description={TOOLTIP_CONTENT.metrics}
      stepIndex={stepIndex}
      totalSteps={totalSteps}
      onNext={onNext}
      onPrev={onPrev}
    >
      <DataTable
        columns={METRIC_COLUMNS}
        rows={data.metrics as unknown as Record<string, string>[]}
        onChange={(rowIndex, key, value) => {
          const current = data.metrics[rowIndex];
          dispatch({
            type: 'UPDATE_METRIC',
            index: rowIndex,
            metric: { ...current, [key]: value },
          });
        }}
        onRemove={(rowIndex) => dispatch({ type: 'REMOVE_METRIC', index: rowIndex })}
        onAdd={() => dispatch({ type: 'ADD_METRIC' })}
      />
      {touched.has('metrics') && errors.metrics && (
        <div
          className="slds-form-element__help slds-m-top_x-small"
          style={{ color: 'var(--slds-g-color-error-base-40, #c23934)' }}
        >
          {errors.metrics}
        </div>
      )}
    </StepWrapper>
  );
}
