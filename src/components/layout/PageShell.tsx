import type { ReactNode } from 'react';
import type { PrdFormData } from '../../types/prd';
import { AppHeader } from './AppHeader';
import { Sidebar } from './Sidebar';

interface PageShellProps {
  children: ReactNode;
  currentStep: number;
  onStepClick: (step: number) => void;
  data: PrdFormData;
  prdTitle?: string;
  onRefresh?: () => void;
}

export function PageShell({
  children,
  currentStep,
  onStepClick,
  data,
  prdTitle,
  onRefresh,
}: PageShellProps) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppHeader prdTitle={prdTitle} onRefresh={onRefresh} />
      <div style={{ display: 'flex', flex: 1, marginTop: '3.125rem' }}>
        <Sidebar currentStep={currentStep} onStepClick={onStepClick} data={data} />
        <main style={{ flex: 1, padding: '2rem', maxWidth: '900px' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
