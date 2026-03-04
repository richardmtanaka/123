const PREFIX = 'prd_builder_';

export function getItem<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setItem(key: string, value: unknown): void {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.error('localStorage write failed:', e);
  }
}

export function removeItem(key: string): void {
  localStorage.removeItem(PREFIX + key);
}

export function getAllDocKeys(): string[] {
  const keys: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k?.startsWith(PREFIX + 'doc_')) {
      keys.push(k.replace(PREFIX, ''));
    }
  }
  return keys;
}
