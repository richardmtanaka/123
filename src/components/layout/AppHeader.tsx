interface AppHeaderProps {
  prdTitle?: string;
  onRefresh?: () => void;
}

export function AppHeader({ prdTitle, onRefresh }: AppHeaderProps) {
  return (
    <header className="slds-global-header_container">
      <div className="slds-global-header" style={{ display: 'flex', alignItems: 'center', padding: '0 1rem', height: '3.125rem', background: 'var(--header-bg, #032d60)', color: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" fill="#0176d3"/>
            <path d="M8 12.5l2.5 2.5 5.5-5.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{ fontWeight: 700, fontSize: '1rem' }}>PRD Builder</span>
          <span style={{ background: 'rgba(255,255,255,0.15)', padding: '0.1rem 0.5rem', borderRadius: '1rem', fontSize: '0.7rem', fontWeight: 600 }}>
            Agent Driven Setup
          </span>
        </div>

        {prdTitle && (
          <div style={{ marginLeft: '1.5rem', fontSize: '0.85rem', opacity: 0.85, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {prdTitle}
          </div>
        )}

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {onRefresh && (
            <button
              className="slds-button slds-button_icon"
              style={{ color: 'white', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
              onClick={onRefresh}
              title="Start fresh"
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 3a7 7 0 00-7 7h2.5L2 14l-2-4h2a8 8 0 1116 0h-2A6 6 0 0010 3zm0 14a7 7 0 007-7h-2.5l3.5-4 2 4h-2a8 8 0 01-16 0h2a6 6 0 006 6z"/>
              </svg>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
