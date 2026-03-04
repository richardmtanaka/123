import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type {
  PrdDocument,
  PrdDocumentSummary,
  PrdFormData,
} from '../types/prd';
import { generateId } from '../utils/id';
import { getItem, setItem, removeItem } from '../utils/storage';
import { DEFAULT_FORM_DATA } from '../constants/defaults';

// ---------------------------------------------------------------------------
// Storage key conventions (all go through utils/storage which adds prefix)
// ---------------------------------------------------------------------------

const SUMMARIES_KEY = 'library_summaries';
const DOC_KEY = (id: string) => `doc_${id}`;

// ---------------------------------------------------------------------------
// Context shape
// ---------------------------------------------------------------------------

interface LibraryContextValue {
  documents: PrdDocumentSummary[];
  activeDocumentId: string | null;
  createDocument: (templateData?: Partial<PrdFormData>) => string;
  duplicateDocument: (id: string) => string;
  deleteDocument: (id: string) => void;
  loadDocument: (id: string) => PrdDocument | null;
  saveDocument: (doc: PrdDocument) => void;
  updateSummary: (id: string, updates: Partial<PrdDocumentSummary>) => void;
}

const LibraryContext = createContext<LibraryContextValue | null>(null);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function readSummaries(): PrdDocumentSummary[] {
  return getItem<PrdDocumentSummary[]>(SUMMARIES_KEY) ?? [];
}

function writeSummaries(summaries: PrdDocumentSummary[]): void {
  setItem(SUMMARIES_KEY, summaries);
}

function buildSummary(doc: PrdDocument): PrdDocumentSummary {
  return {
    id: doc.id,
    title: doc.metadata.title || doc.data.feature_title || 'Untitled PRD',
    status: doc.metadata.status,
    updatedAt: doc.metadata.updatedAt,
    domainArea: doc.data.domain_area,
    release: doc.data.release,
  };
}

function createNewDocument(id: string, data: PrdFormData): PrdDocument {
  const ts = new Date().toISOString();
  return {
    id,
    metadata: {
      title: data.feature_title,
      status: 'draft',
      createdAt: ts,
      updatedAt: ts,
      version: 1,
    },
    data,
    versions: [],
  };
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

interface LibraryProviderProps {
  children: ReactNode;
}

export function LibraryProvider({ children }: LibraryProviderProps) {
  const [documents, setDocuments] = useState<PrdDocumentSummary[]>(readSummaries);
  const [activeDocumentId, setActiveDocumentId] = useState<string | null>(null);

  // -- Create --
  const createDocument = useCallback(
    (templateData?: Partial<PrdFormData>): string => {
      const id = generateId();
      const data: PrdFormData = {
        ...DEFAULT_FORM_DATA,
        reviewers: [{ name: '', role: '' }],
        jtbd: ['', '', ''],
        metrics: [{ metric: '', defined: '', goal: '', instrumentation: '' }],
        references: {},
        ...templateData,
      };
      const doc = createNewDocument(id, data);
      setItem(DOC_KEY(id), doc);

      const summary = buildSummary(doc);
      setDocuments((prev) => {
        const next = [summary, ...prev];
        writeSummaries(next);
        return next;
      });
      setActiveDocumentId(id);
      return id;
    },
    [],
  );

  // -- Duplicate --
  const duplicateDocument = useCallback(
    (id: string): string => {
      const original = getItem<PrdDocument>(DOC_KEY(id));
      if (!original) {
        throw new Error(`Document ${id} not found`);
      }
      const newId = generateId();
      const ts = new Date().toISOString();
      const doc: PrdDocument = {
        ...original,
        id: newId,
        metadata: {
          ...original.metadata,
          title: `${original.metadata.title || original.data.feature_title} (Copy)`,
          createdAt: ts,
          updatedAt: ts,
          version: 1,
        },
        versions: [],
      };
      doc.data = { ...original.data, feature_title: doc.metadata.title };
      setItem(DOC_KEY(newId), doc);

      const summary = buildSummary(doc);
      setDocuments((prev) => {
        const next = [summary, ...prev];
        writeSummaries(next);
        return next;
      });
      return newId;
    },
    [],
  );

  // -- Delete --
  const deleteDocument = useCallback(
    (id: string): void => {
      removeItem(DOC_KEY(id));
      setDocuments((prev) => {
        const next = prev.filter((d) => d.id !== id);
        writeSummaries(next);
        return next;
      });
      setActiveDocumentId((prev) => (prev === id ? null : prev));
    },
    [],
  );

  // -- Load --
  const loadDocument = useCallback(
    (id: string): PrdDocument | null => {
      const doc = getItem<PrdDocument>(DOC_KEY(id));
      if (doc) {
        setActiveDocumentId(id);
      }
      return doc;
    },
    [],
  );

  // -- Save --
  const saveDocument = useCallback(
    (doc: PrdDocument): void => {
      setItem(DOC_KEY(doc.id), doc);
      const summary = buildSummary(doc);
      setDocuments((prev) => {
        const next = prev.map((d) => (d.id === doc.id ? summary : d));
        // If summary wasn't found, prepend it (edge case)
        const exists = next.some((d) => d.id === doc.id);
        const final = exists ? next : [summary, ...next];
        writeSummaries(final);
        return final;
      });
    },
    [],
  );

  // -- Update summary only --
  const updateSummary = useCallback(
    (id: string, updates: Partial<PrdDocumentSummary>): void => {
      setDocuments((prev) => {
        const next = prev.map((d) => (d.id === id ? { ...d, ...updates } : d));
        writeSummaries(next);
        return next;
      });
    },
    [],
  );

  const value = useMemo<LibraryContextValue>(
    () => ({
      documents,
      activeDocumentId,
      createDocument,
      duplicateDocument,
      deleteDocument,
      loadDocument,
      saveDocument,
      updateSummary,
    }),
    [documents, activeDocumentId, createDocument, duplicateDocument, deleteDocument, loadDocument, saveDocument, updateSummary],
  );

  return (
    <LibraryContext.Provider value={value}>
      {children}
    </LibraryContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useLibrary(): LibraryContextValue {
  const ctx = useContext(LibraryContext);
  if (!ctx) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return ctx;
}
