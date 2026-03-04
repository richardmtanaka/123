import { createContext, useContext, useReducer, type Dispatch, type ReactNode } from 'react';
import type { PrdDocument } from '../types/prd';
import { prdReducer, createEmptyDocument, type PrdAction } from './prd-reducer';

// ---------------------------------------------------------------------------
// Context shape
// ---------------------------------------------------------------------------

interface PrdContextValue {
  prdDoc: PrdDocument;
  dispatch: Dispatch<PrdAction>;
}

const PrdContext = createContext<PrdContextValue | null>(null);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

interface PrdProviderProps {
  children: ReactNode;
  initialDocument?: PrdDocument;
}

export function PrdProvider({ children, initialDocument }: PrdProviderProps) {
  const [prdDoc, dispatch] = useReducer(prdReducer, initialDocument ?? createEmptyDocument());

  return (
    <PrdContext.Provider value={{ prdDoc, dispatch }}>
      {children}
    </PrdContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function usePrdContext(): PrdContextValue {
  const ctx = useContext(PrdContext);
  if (!ctx) {
    throw new Error('usePrdContext must be used within a PrdProvider');
  }
  return ctx;
}
