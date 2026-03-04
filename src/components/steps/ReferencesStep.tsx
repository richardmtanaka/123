import { Input } from '../ui/Input';
import { LinkList } from '../ui/LinkList';
import { StepWrapper } from './StepWrapper';
import { usePrdContext } from '../../store/prd-context';
import { REF_FIELDS } from '../../constants/steps';

export interface ReferencesStepProps {
  stepIndex: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
}

export function ReferencesStep({ stepIndex, totalSteps, onNext, onPrev }: ReferencesStepProps) {
  const { prdDoc, dispatch } = usePrdContext();
  const data = prdDoc.data;

  return (
    <StepWrapper
      title="Reference Materials"
      stepBadge="Step 9"
      description="Add links to relevant documents, dashboards, and resources."
      stepIndex={stepIndex}
      totalSteps={totalSteps}
      onNext={onNext}
      onPrev={onPrev}
    >
      {REF_FIELDS.map((field) => (
        <div key={field.key} className="slds-m-bottom_medium">
          <Input
            label={field.label}
            placeholder="Paste URL or document reference..."
            value={data.references[field.key] ?? ''}
            onChange={(e) =>
              dispatch({ type: 'SET_REFERENCE', key: field.key, value: e.target.value })
            }
          />
        </div>
      ))}
      <LinkList
        links={data.reference_links || []}
        onAdd={(url) => dispatch({ type: 'ADD_LINK', field: 'reference_links', url })}
        onRemove={(index) => dispatch({ type: 'REMOVE_LINK', field: 'reference_links', index })}
      />
    </StepWrapper>
  );
}
