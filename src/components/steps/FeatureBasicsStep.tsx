import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { StepWrapper } from './StepWrapper';
import { usePrdContext } from '../../store/prd-context';
import { useValidation } from '../../hooks/useValidation';
import { TOOLTIP_CONTENT } from '../../constants/steps';

export interface FeatureBasicsStepProps {
  stepIndex: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
}

const RELEASE_OPTIONS = [
  { value: '262', label: '262' },
  { value: '264', label: '264' },
  { value: '266', label: '266' },
  { value: 'Future', label: 'Future' },
];

export function FeatureBasicsStep({ stepIndex, totalSteps, onNext, onPrev }: FeatureBasicsStepProps) {
  const { prdDoc, dispatch } = usePrdContext();
  const { errors, touched, touch } = useValidation(stepIndex, prdDoc.data);
  const data = prdDoc.data;

  const setField = (field: string, value: string) => {
    dispatch({ type: 'SET_FIELD', field: field as keyof typeof data, value });
  };

  return (
    <StepWrapper
      title="Feature Basics"
      stepBadge="Step 1"
      description="Provide the basic details about this feature."
      stepIndex={stepIndex}
      totalSteps={totalSteps}
      onNext={onNext}
      onPrev={onPrev}
    >
      <div className="slds-m-bottom_medium">
        <Input
          label="Feature Title"
          required
          placeholder="e.g., Content Personalization with sObject Lookups"
          value={data.feature_title}
          onChange={(e) => setField('feature_title', e.target.value)}
          onBlur={() => touch('feature_title')}
          error={touched.has('feature_title') ? errors.feature_title : undefined}
          tooltip={TOOLTIP_CONTENT.feature_title}
        />
      </div>

      <div className="slds-grid slds-gutters slds-m-bottom_medium">
        <div className="slds-col slds-size_1-of-2">
          <Input
            label="Domain Area"
            required
            placeholder="e.g., Content Personalization, Data Access & Graphs"
            value={data.domain_area}
            onChange={(e) => setField('domain_area', e.target.value)}
            onBlur={() => touch('domain_area')}
            error={touched.has('domain_area') ? errors.domain_area : undefined}
            tooltip={TOOLTIP_CONTENT.domain_area}
          />
        </div>
        <div className="slds-col slds-size_1-of-2">
          <Input
            label="V2MOM"
            placeholder="e.g., Personalization V2MOM"
            value={data.v2mom}
            onChange={(e) => setField('v2mom', e.target.value)}
            tooltip={TOOLTIP_CONTENT.v2mom}
          />
        </div>
      </div>

      <div className="slds-m-bottom_medium">
        <Select
          label="Release"
          options={RELEASE_OPTIONS}
          value={data.release}
          onChange={(value) => setField('release', value)}
          placeholder="Select release..."
          tooltip={TOOLTIP_CONTENT.release}
        />
      </div>
    </StepWrapper>
  );
}
