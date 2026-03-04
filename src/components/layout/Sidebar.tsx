import { STEPS } from '../../constants/steps';
import type { PrdFormData } from '../../types/prd';

interface SidebarProps {
  currentStep: number;
  onStepClick: (step: number) => void;
  data: PrdFormData;
}

function isStepComplete(i: number, d: PrdFormData): boolean {
  switch (i) {
    case 0: return !!d.feature_title && !!d.domain_area;
    case 1: return !!d.prd_owner;
    case 2: return d.personas.length > 0 || !!d.persona_other;
    case 3: return !!d.elevator_pitch && !!d.customer_problem;
    case 4: return !!d.business_customers || !!d.business_goals;
    case 5: return d.jtbd.some(j => j.trim() !== '');
    case 6: return d.metrics.some(m => m.metric.trim() !== '');
    case 7: return !!d.competitive_context;
    case 8: return Object.values(d.references || {}).some(v => v?.trim());
    case 9: return !!d.additional_notes;
    default: return false;
  }
}

export function Sidebar({ currentStep, onStepClick, data }: SidebarProps) {
  const completedCount = STEPS.filter((_, i) => i < STEPS.length - 1 && isStepComplete(i, data)).length;
  const pct = Math.round((completedCount / (STEPS.length - 1)) * 100);

  return (
    <div className="slds-nav-vertical" style={{
      width: '280px',
      background: 'var(--sidebar-bg, #fff)',
      borderRight: '1px solid var(--border-color, #e5e5e5)',
      position: 'sticky',
      top: '3.125rem',
      height: 'calc(100vh - 3.125rem)',
      overflowY: 'auto',
      flexShrink: 0,
    }}>
      <div style={{ padding: '1rem 1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#706e6b', marginBottom: '0.4rem', fontWeight: 600 }}>
          <span>Step {currentStep + 1} of {STEPS.length}</span>
          <span>{pct}%</span>
        </div>
        <div className="slds-progress-bar" style={{ height: '6px' }}>
          <span className="slds-progress-bar__value" style={{
            width: `${pct}%`,
            background: 'linear-gradient(90deg, #0176d3, #9050e9)',
            transition: 'width 0.4s ease',
          }} />
        </div>
      </div>

      <div className="slds-nav-vertical__section">
        <h2 className="slds-nav-vertical__title slds-text-title_caps" style={{ padding: '0 1.25rem', fontSize: '0.65rem' }}>
          PRD Sections
        </h2>
        <ul>
          {STEPS.map((step, i) => {
            const isActive = i === currentStep;
            const isComplete = i < STEPS.length - 1 && isStepComplete(i, data);
            return (
              <li key={step.id} className={`slds-nav-vertical__item ${isActive ? 'slds-is-active' : ''}`}>
                <a
                  href="#"
                  className="slds-nav-vertical__action"
                  onClick={(e) => { e.preventDefault(); onStepClick(i); }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.55rem 1.25rem',
                    fontSize: '0.85rem',
                    color: isActive ? '#0176d3' : isComplete ? '#2e844a' : undefined,
                    fontWeight: isActive ? 600 : undefined,
                    borderLeft: isActive ? '3px solid #0176d3' : '3px solid transparent',
                  }}
                >
                  <span style={{
                    width: '1.5rem',
                    height: '1.5rem',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    flexShrink: 0,
                    background: isActive ? '#0176d3' : isComplete ? '#2e844a' : '#e5e5e5',
                    color: isActive || isComplete ? 'white' : '#444',
                  }}>
                    {isComplete && !isActive ? '✓' : step.icon}
                  </span>
                  {step.title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
