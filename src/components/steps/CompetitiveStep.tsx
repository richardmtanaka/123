import { Textarea } from '../ui/Textarea';
import { LinkList } from '../ui/LinkList';
import { StepWrapper } from './StepWrapper';
import { usePrdContext } from '../../store/prd-context';
import { TOOLTIP_CONTENT } from '../../constants/steps';

export interface CompetitiveStepProps {
  stepIndex: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
}

export function CompetitiveStep({ stepIndex, totalSteps, onNext, onPrev }: CompetitiveStepProps) {
  const { prdDoc, dispatch } = usePrdContext();
  const data = prdDoc.data;

  return (
    <StepWrapper
      title="Competitive Context"
      stepBadge="Step 8"
      description="How does this compare to competing products?"
      stepIndex={stepIndex}
      totalSteps={totalSteps}
      onNext={onNext}
      onPrev={onPrev}
    >
      <Textarea
        label="Competitive Context"
        placeholder="Compare to MCE, Braze, HubSpot, Adobe. Write 'N/A' for get-well / infra PRDs..."
        value={data.competitive_context}
        onChange={(e) =>
          dispatch({ type: 'SET_FIELD', field: 'competitive_context', value: e.target.value })
        }
        tooltip={TOOLTIP_CONTENT.competitive_context}
        rows={8}
      />
      <LinkList
        links={data.competitive_links || []}
        onAdd={(url) => dispatch({ type: 'ADD_LINK', field: 'competitive_links', url })}
        onRemove={(index) => dispatch({ type: 'REMOVE_LINK', field: 'competitive_links', index })}
      />
    </StepWrapper>
  );
}
