import { useCallback, useSyncExternalStore } from 'react';
import type { Route } from '../types/app';

// ---------------------------------------------------------------------------
// Parsing
// ---------------------------------------------------------------------------

function parseHash(hash: string): Route {
  // Remove leading '#'
  const raw = hash.startsWith('#') ? hash.slice(1) : hash;

  // Edit route: /edit/{prdId}?step={n}
  const editMatch = raw.match(/^\/edit\/([^?]+)(?:\?step=(\d+))?$/);
  if (editMatch) {
    const prdId = decodeURIComponent(editMatch[1]);
    const step = editMatch[2] !== undefined ? parseInt(editMatch[2], 10) : 0;
    return { view: 'edit', prdId, step };
  }

  // Default: library
  return { view: 'library' };
}

// ---------------------------------------------------------------------------
// Serialisation
// ---------------------------------------------------------------------------

function routeToHash(route: Route): string {
  if (route.view === 'edit') {
    return `#/edit/${encodeURIComponent(route.prdId)}?step=${route.step}`;
  }
  return '#/library';
}

// ---------------------------------------------------------------------------
// External store for hash (avoids stale closures)
// ---------------------------------------------------------------------------

function subscribeToHash(callback: () => void): () => void {
  window.addEventListener('hashchange', callback);
  return () => window.removeEventListener('hashchange', callback);
}

function getHashSnapshot(): string {
  return window.location.hash;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useHashRouter() {
  const hash = useSyncExternalStore(subscribeToHash, getHashSnapshot);
  const route = parseHash(hash);

  const navigate = useCallback((next: Route) => {
    window.location.hash = routeToHash(next);
  }, []);

  return { route, navigate } as const;
}
