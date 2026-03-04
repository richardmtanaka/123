import type { ReactNode } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { usePrdContext } from '../../store/prd-context';
import { useValidation } from '../../hooks/useValidation';

export interface StepWrapperProps {
  title: string;
  stepBadge: string;
  description?: string;
  stepIndex: number;
  totalSteps: number;
  onNext?: () => void;
  onPrev?: () => void;
  extraFooter?: ReactNode;
  children: ReactNode;
}

export function StepWrapper({
  title,
  stepBadge,
  description,
  stepIndex,
  totalSteps,
  onNext,
  onPrev,
  extraFooter,
  children,
}: StepWrapperProps) {
  const { prdDoc } = usePrdContext();
  const { validate } = useValidation(stepIndex, prdDoc.data);

  const handleNext = () => {
    if (!onNext) return;
    const isValid = validate();
    if (isValid) {
      onNext();
    }
  };

  const footer = (
    <div className="slds-grid slds-grid_align-spread" style={{ width: '100%' }}>
      <div>
        {onPrev && (
          <Button variant="neutral" onClick={onPrev}>
            Previous
          </Button>
        )}
      </div>
      <div className="slds-grid slds-grid_align-end slds-gutters_x-small">
        {extraFooter}
        {onNext && (
          <Button variant="brand" onClick={handleNext}>
            {stepIndex === totalSteps - 2 ? 'Review' : 'Next'}
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <Card title={title} stepBadge={stepBadge} footer={footer}>
      {description && (
        <p className="slds-text-body_regular slds-text-color_weak slds-m-bottom_medium">
          {description}
        </p>
      )}
      {children}
    </Card>
  );
}
