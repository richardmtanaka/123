import { Textarea } from '../ui/Textarea';
import { StepWrapper } from './StepWrapper';
import { usePrdContext } from '../../store/prd-context';

export interface BusinessStepProps {
  stepIndex: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
}

export function BusinessStep({ stepIndex, totalSteps, onNext, onPrev }: BusinessStepProps) {
  const { prdDoc, dispatch } = usePrdContext();
  const data = prdDoc.data;

  const setField = (field: string, value: string) => {
    dispatch({ type: 'SET_FIELD', field: field as keyof typeof data, value });
  };

  return (
    <StepWrapper
      title="Business Goals"
      stepBadge="Step 5"
      description="Describe the business context — customers requesting this, goals, and revenue impact."
      stepIndex={stepIndex}
      totalSteps={totalSteps}
      onNext={onNext}
      onPrev={onPrev}
    >
      <div className="slds-m-bottom_medium">
        <Textarea
          label="Customers Requesting This"
          placeholder="List specific customers or segments requesting this feature, including deal sizes and urgency..."
          value={data.business_customers}
          onChange={(e) => setField('business_customers', e.target.value)}
          rows={4}
        />
      </div>

      <div className="slds-m-bottom_medium">
        <Textarea
          label="Business Goals"
          placeholder="What business outcomes does this feature drive? E.g., increase adoption, reduce churn, unlock new market segment..."
          value={data.business_goals}
          onChange={(e) => setField('business_goals', e.target.value)}
          rows={4}
        />
      </div>

      <div className="slds-m-bottom_medium">
        <Textarea
          label="Revenue Impact"
          placeholder="Estimated revenue impact, deal pipeline influenced, or cost savings..."
          value={data.business_revenue_impact}
          onChange={(e) => setField('business_revenue_impact', e.target.value)}
          rows={3}
        />
      </div>
    </StepWrapper>
  );
}
