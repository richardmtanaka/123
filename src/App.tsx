import { useState, useEffect } from 'react';
import { PrdProvider, usePrdContext } from './store/prd-context';
import { PageShell } from './components/layout/PageShell';
import { ExportModal } from './components/features/ExportModal';
import { WelcomeModal } from './components/features/WelcomeModal';
import { ConfirmDialog } from './components/ui/ConfirmDialog';
import { Toast } from './components/ui/Toast';
import { STEPS } from './constants/steps';
import { generatePrompt } from './utils/markdown-generator';
import { setItem, getItem } from './utils/storage';

import { FeatureBasicsStep } from './components/steps/FeatureBasicsStep';
import { PeopleStep } from './components/steps/PeopleStep';
import { PersonasStep } from './components/steps/PersonasStep';
import { ProblemStep } from './components/steps/ProblemStep';
import { BusinessStep } from './components/steps/BusinessStep';
import { JtbdStep } from './components/steps/JtbdStep';
import { MetricsStep } from './components/steps/MetricsStep';
import { CompetitiveStep } from './components/steps/CompetitiveStep';
import { ReferencesStep } from './components/steps/ReferencesStep';
import { NotesStep } from './components/steps/NotesStep';
import { ReviewStep } from './components/steps/ReviewStep';

function PrdEditor() {
  const { prdDoc, dispatch } = usePrdContext();
  const [step, setStep] = useState(0);
  const [exportOpen, setExportOpen] = useState(false);
  const [welcomeOpen, setWelcomeOpen] = useState(() => !getItem<boolean>('welcome_dismissed'));
  const [resetConfirm, setResetConfirm] = useState(false);
  const [toast, setToast] = useState<{ msg: string; variant: 'success' | 'warning' | 'info' } | null>(null);

  // Auto-save to localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      setItem('current_prd', prdDoc);
    }, 500);
    return () => clearTimeout(timer);
  }, [prdDoc]);

  // Auto-snapshot when entering review
  useEffect(() => {
    if (step === STEPS.length - 1 && prdDoc.data.feature_title) {
      dispatch({ type: 'SNAPSHOT_VERSION' });
    }
  }, [step]);

  const onNext = () => { if (step < STEPS.length - 1) setStep(step + 1); };
  const onPrev = () => { if (step > 0) setStep(step - 1); };

  const handleRefresh = () => {
    setResetConfirm(true);
  };

  const handleExport = () => setExportOpen(true);

  const handleReset = () => {
    dispatch({ type: 'RESET' });
    setResetConfirm(false);
    setToast({ msg: 'All inputs have been reset.', variant: 'info' });
    setStep(0);
    setWelcomeOpen(true);
  };

  const stepProps = { stepIndex: step, totalSteps: STEPS.length, onNext, onPrev };

  const renderStep = () => {
    switch (step) {
      case 0: return <FeatureBasicsStep {...stepProps} />;
      case 1: return <PeopleStep {...stepProps} />;
      case 2: return <PersonasStep {...stepProps} />;
      case 3: return <ProblemStep {...stepProps} />;
      case 4: return <BusinessStep {...stepProps} />;
      case 5: return <JtbdStep {...stepProps} />;
      case 6: return <MetricsStep {...stepProps} />;
      case 7: return <CompetitiveStep {...stepProps} />;
      case 8: return <ReferencesStep {...stepProps} />;
      case 9: return <NotesStep {...stepProps} />;
      case 10: return (
        <ReviewStep
          {...stepProps}
          onStepClick={setStep}
          onExport={handleExport}
          onReset={() => setResetConfirm(true)}
        />
      );
      default: return null;
    }
  };

  return (
    <PageShell
      currentStep={step}
      onStepClick={setStep}
      data={prdDoc.data}
      prdTitle={prdDoc.data.feature_title || 'Untitled PRD'}
      onRefresh={handleRefresh}
    >
      {renderStep()}

      <WelcomeModal isOpen={welcomeOpen} onClose={() => { setWelcomeOpen(false); setItem('welcome_dismissed', true); }} />
      <ExportModal
        isOpen={exportOpen}
        onClose={() => setExportOpen(false)}
        content={generatePrompt(prdDoc.data)}
        featureTitle={prdDoc.data.feature_title}
      />
      <ConfirmDialog
        isOpen={resetConfirm}
        title="Start Fresh"
        message="Are you sure you want to clear all fields and start a new blank PRD?"
        variant="destructive"
        confirmLabel="Start Fresh"
        onConfirm={handleReset}
        onCancel={() => setResetConfirm(false)}
      />
      {toast && (
        <Toast
          message={toast.msg}
          variant={toast.variant}
          isVisible={!!toast}
          onClose={() => setToast(null)}
        />
      )}
    </PageShell>
  );
}

export default function App() {
  // Load saved PRD from localStorage on mount
  const savedDoc = getItem<import('./types/prd').PrdDocument>('current_prd');

  return (
    <PrdProvider initialDocument={savedDoc ?? undefined}>
      <PrdEditor />
    </PrdProvider>
  );
}
