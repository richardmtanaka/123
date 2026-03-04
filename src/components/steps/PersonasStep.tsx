import { CheckboxGroup } from '../ui/CheckboxGroup';
import { Input } from '../ui/Input';
import { StepWrapper } from './StepWrapper';
import { usePrdContext } from '../../store/prd-context';
import { useValidation } from '../../hooks/useValidation';
import { PERSONAS } from '../../constants/steps';

export interface PersonasStepProps {
  stepIndex: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
}

export function PersonasStep({ stepIndex, totalSteps, onNext, onPrev }: PersonasStepProps) {
  const { prdDoc, dispatch } = usePrdContext();
  const { errors, touched } = useValidation(stepIndex, prdDoc.data);
  const data = prdDoc.data;

  const handlePersonaToggle = (selected: string[]) => {
    // Determine which persona was toggled by comparing with current
    const added = selected.find((s) => !data.personas.includes(s));
    const removed = data.personas.find((p) => !selected.includes(p));
    const toggled = added ?? removed;
    if (toggled) {
      dispatch({ type: 'TOGGLE_PERSONA', persona: toggled });
    }
  };

  return (
    <StepWrapper
      title="Target Personas"
      stepBadge="Step 3"
      description="Select the personas this feature targets."
      stepIndex={stepIndex}
      totalSteps={totalSteps}
      onNext={onNext}
      onPrev={onPrev}
    >
      <div className="slds-m-bottom_medium">
        <CheckboxGroup
          label="Personas"
          options={PERSONAS}
          selected={data.personas}
          onChange={handlePersonaToggle}
          columns={2}
          error={touched.has('personas') ? errors.personas : undefined}
        />
      </div>

      <div className="slds-m-top_medium">
        <Input
          label="Other Persona"
          placeholder="Describe another persona not listed above..."
          value={data.persona_other}
          onChange={(e) =>
            dispatch({ type: 'SET_FIELD', field: 'persona_other', value: e.target.value })
          }
        />
      </div>
    </StepWrapper>
  );
}
