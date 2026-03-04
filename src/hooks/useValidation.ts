import { useCallback, useMemo, useState } from 'react';
import type { PrdFormData } from '../types/prd';
import { STEP_VALIDATORS } from '../constants/validation';

// ---------------------------------------------------------------------------
// Return type
// ---------------------------------------------------------------------------

interface UseValidationReturn {
  errors: Record<string, string>;
  validate: () => boolean;
  touched: Set<string>;
  touch: (field: string) => void;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useValidation(stepIndex: number, data: PrdFormData): UseValidationReturn {
  const [touched, setTouched] = useState<Set<string>>(new Set());

  const errors = useMemo<Record<string, string>>(() => {
    const validator = STEP_VALIDATORS[stepIndex];
    if (!validator) return {};
    return validator(data);
  }, [stepIndex, data]);

  const validate = useCallback((): boolean => {
    const validator = STEP_VALIDATORS[stepIndex];
    if (!validator) return true;
    const result = validator(data);
    // Mark all error fields as touched so UI shows them
    if (Object.keys(result).length > 0) {
      setTouched((prev) => {
        const next = new Set(prev);
        for (const key of Object.keys(result)) {
          next.add(key);
        }
        return next;
      });
    }
    return Object.keys(result).length === 0;
  }, [stepIndex, data]);

  const touch = useCallback((field: string) => {
    setTouched((prev) => {
      if (prev.has(field)) return prev;
      const next = new Set(prev);
      next.add(field);
      return next;
    });
  }, []);

  return { errors, validate, touched, touch };
}
