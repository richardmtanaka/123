const GEMINI_BASE = 'https://gemini.google.com/app';

export function openInGemini(prompt: string): boolean {
  const encoded = encodeURIComponent(prompt);
  const url = `${GEMINI_BASE}?q=${encoded}`;

  window.open(url, '_blank', 'noopener,noreferrer');
  return true;
}
