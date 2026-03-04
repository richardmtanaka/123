import { Textarea } from '../ui/Textarea';
import { LinkList } from '../ui/LinkList';
import { StepWrapper } from './StepWrapper';
import { usePrdContext } from '../../store/prd-context';

export interface NotesStepProps {
  stepIndex: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
}

export function NotesStep({ stepIndex, totalSteps, onNext, onPrev }: NotesStepProps) {
  const { prdDoc, dispatch } = usePrdContext();
  const data = prdDoc.data;

  return (
    <StepWrapper
      title="Additional Notes"
      stepBadge="Step 10"
      description="Add any additional context, open questions, or notes for reviewers."
      stepIndex={stepIndex}
      totalSteps={totalSteps}
      onNext={onNext}
      onPrev={onPrev}
    >
      <Textarea
        label="Additional Notes"
        placeholder="Any other context, open questions, or notes..."
        value={data.additional_notes}
        onChange={(e) =>
          dispatch({ type: 'SET_FIELD', field: 'additional_notes', value: e.target.value })
        }
        rows={10}
      />
      <LinkList
        links={data.notes_links || []}
        onAdd={(url) => dispatch({ type: 'ADD_LINK', field: 'notes_links', url })}
        onRemove={(index) => dispatch({ type: 'REMOVE_LINK', field: 'notes_links', index })}
      />
    </StepWrapper>
  );
}
