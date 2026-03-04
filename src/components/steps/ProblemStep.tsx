import { Textarea } from '../ui/Textarea';
import { StepWrapper } from './StepWrapper';
import { usePrdContext } from '../../store/prd-context';
import { useValidation } from '../../hooks/useValidation';
import { TOOLTIP_CONTENT } from '../../constants/steps';

export interface ProblemStepProps {
  stepIndex: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
}

export function ProblemStep({ stepIndex, totalSteps, onNext, onPrev }: ProblemStepProps) {
  const { prdDoc, dispatch } = usePrdContext();
  const { errors, touched, touch } = useValidation(stepIndex, prdDoc.data);
  const data = prdDoc.data;

  const setField = (field: string, value: string) => {
    dispatch({ type: 'SET_FIELD', field: field as keyof typeof data, value });
  };

  return (
    <StepWrapper
      title="Problem & Opportunity"
      stepBadge="Step 4"
      description="Describe the problem you are solving and the opportunity it represents."
      stepIndex={stepIndex}
      totalSteps={totalSteps}
      onNext={onNext}
      onPrev={onPrev}
    >
      <div className="slds-m-bottom_medium">
        <Textarea
          label="Elevator Pitch"
          required
          placeholder="A 2-4 sentence summary of what we are building and why..."
          value={data.elevator_pitch}
          onChange={(e) => setField('elevator_pitch', e.target.value)}
          onBlur={() => touch('elevator_pitch')}
          error={touched.has('elevator_pitch') ? errors.elevator_pitch : undefined}
          tooltip={TOOLTIP_CONTENT.elevator_pitch}
          rows={4}
        />
      </div>

      <div className="slds-m-bottom_medium">
        <Textarea
          label="Customer Problem"
          required
          placeholder="Describe the current-state friction, including customer names and support case volumes if available..."
          value={data.customer_problem}
          onChange={(e) => setField('customer_problem', e.target.value)}
          onBlur={() => touch('customer_problem')}
          error={touched.has('customer_problem') ? errors.customer_problem : undefined}
          tooltip={TOOLTIP_CONTENT.customer_problem}
          rows={6}
        />
      </div>

      <div className="slds-m-bottom_medium">
        <Textarea
          label="Out of Scope"
          placeholder="Explicitly list what we are NOT building this release..."
          value={data.out_of_scope}
          onChange={(e) => setField('out_of_scope', e.target.value)}
          tooltip={TOOLTIP_CONTENT.out_of_scope}
          rows={4}
        />
      </div>
    </StepWrapper>
  );
}
