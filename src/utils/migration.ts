import type { PrdDocument, PrdDocumentSummary, PrdFormData } from '../types/prd';
import { DEFAULT_FORM_DATA } from '../constants/defaults';

// ---------------------------------------------------------------------------
// Legacy migration
//
// The previous version of the app stored data under the raw key 'sf_prd_data'
// (no prefix). This function checks for that key, wraps the data in the new
// PrdDocument structure, persists it using the new key conventions, and sets a
// flag so the migration only runs once.
// ---------------------------------------------------------------------------

const LEGACY_KEY = 'sf_prd_data';
const MIGRATED_FLAG = 'prd_builder_v1_migrated';
const PREFIX = 'prd_builder_';

function generateMigrationId(): string {
  // Simple fallback id generation (no uuid dependency at init time)
  return `migrated_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export function runMigration(): void {
  try {
    // Already migrated?
    if (localStorage.getItem(MIGRATED_FLAG)) return;

    const raw = localStorage.getItem(LEGACY_KEY);
    if (!raw) {
      // Nothing to migrate — set flag anyway so we don't check again
      localStorage.setItem(MIGRATED_FLAG, '1');
      return;
    }

    const legacyData = JSON.parse(raw) as Partial<PrdFormData>;
    const id = generateMigrationId();
    const ts = new Date().toISOString();

    const data: PrdFormData = {
      ...DEFAULT_FORM_DATA,
      reviewers: [{ name: '', role: '' }],
      jtbd: ['', '', ''],
      metrics: [{ metric: '', defined: '', goal: '', instrumentation: '' }],
      references: {},
      ...legacyData,
    };

    const doc: PrdDocument = {
      id,
      metadata: {
        title: data.feature_title || 'Migrated PRD',
        status: 'draft',
        createdAt: ts,
        updatedAt: ts,
        version: 1,
      },
      data,
      versions: [],
    };

    const summary: PrdDocumentSummary = {
      id,
      title: doc.metadata.title,
      status: 'draft',
      updatedAt: ts,
      domainArea: data.domain_area,
      release: data.release,
    };

    // Write document
    localStorage.setItem(`${PREFIX}doc_${id}`, JSON.stringify(doc));

    // Write / merge summaries list
    const existingSummaries: PrdDocumentSummary[] = (() => {
      try {
        const r = localStorage.getItem(`${PREFIX}library_summaries`);
        return r ? JSON.parse(r) : [];
      } catch {
        return [];
      }
    })();
    existingSummaries.unshift(summary);
    localStorage.setItem(`${PREFIX}library_summaries`, JSON.stringify(existingSummaries));

    // Set migrated flag
    localStorage.setItem(MIGRATED_FLAG, '1');
  } catch (e) {
    console.error('Migration failed:', e);
    // Set flag to avoid retrying a broken migration repeatedly
    localStorage.setItem(MIGRATED_FLAG, '1');
  }
}
