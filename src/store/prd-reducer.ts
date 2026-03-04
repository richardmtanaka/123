import type {
  PrdDocument,
  PrdFormData,
  DraftStatus,
  Metric,
  Reviewer,
  VersionEntry,
} from '../types/prd';
import { generateId } from '../utils/id';

// ---------------------------------------------------------------------------
// Action types
// ---------------------------------------------------------------------------

export type PrdAction =
  | { type: 'SET_FIELD'; field: keyof PrdFormData; value: unknown }
  | { type: 'SET_FIELDS'; fields: Partial<PrdFormData> }
  | { type: 'ADD_REVIEWER' }
  | { type: 'REMOVE_REVIEWER'; index: number }
  | { type: 'UPDATE_REVIEWER'; index: number; reviewer: Reviewer }
  | { type: 'ADD_JTBD' }
  | { type: 'REMOVE_JTBD'; index: number }
  | { type: 'UPDATE_JTBD'; index: number; value: string }
  | { type: 'ADD_METRIC' }
  | { type: 'REMOVE_METRIC'; index: number }
  | { type: 'UPDATE_METRIC'; index: number; metric: Metric }
  | { type: 'TOGGLE_PERSONA'; persona: string }
  | { type: 'ADD_LINK'; field: 'competitive_links' | 'reference_links' | 'notes_links'; url: string }
  | { type: 'REMOVE_LINK'; field: 'competitive_links' | 'reference_links' | 'notes_links'; index: number }
  | { type: 'SET_REFERENCE'; key: string; value: string }
  | { type: 'SET_STATUS'; status: DraftStatus }
  | { type: 'LOAD_DOCUMENT'; document: PrdDocument }
  | { type: 'SNAPSHOT_VERSION'; label?: string }
  | { type: 'RESET' };

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const MAX_VERSIONS = 20;

function now(): string {
  return new Date().toISOString();
}

function withUpdated(doc: PrdDocument, data: PrdFormData): PrdDocument {
  return {
    ...doc,
    data,
    metadata: { ...doc.metadata, updatedAt: now() },
  };
}

// ---------------------------------------------------------------------------
// Default empty document factory (used by RESET)
// ---------------------------------------------------------------------------

import { DEFAULT_FORM_DATA } from '../constants/defaults';

export function createEmptyDocument(id?: string): PrdDocument {
  const ts = now();
  return {
    id: id ?? generateId(),
    metadata: {
      title: '',
      status: 'draft',
      createdAt: ts,
      updatedAt: ts,
      version: 1,
    },
    data: { ...DEFAULT_FORM_DATA, reviewers: [{ name: '', role: '' }], jtbd: ['', '', ''], metrics: [{ metric: '', defined: '', goal: '', instrumentation: '' }], references: {} },
    versions: [],
  };
}

// ---------------------------------------------------------------------------
// Reducer
// ---------------------------------------------------------------------------

export function prdReducer(state: PrdDocument, action: PrdAction): PrdDocument {
  switch (action.type) {
    // -- Scalar / generic field updates --
    case 'SET_FIELD': {
      const newData = { ...state.data, [action.field]: action.value } as PrdFormData;
      const doc = withUpdated(state, newData);
      // Keep metadata.title in sync with feature_title
      if (action.field === 'feature_title') {
        return { ...doc, metadata: { ...doc.metadata, title: action.value as string } };
      }
      return doc;
    }

    case 'SET_FIELDS': {
      const newData = { ...state.data, ...action.fields } as PrdFormData;
      const doc = withUpdated(state, newData);
      if (action.fields.feature_title !== undefined) {
        return { ...doc, metadata: { ...doc.metadata, title: action.fields.feature_title } };
      }
      return doc;
    }

    // -- Reviewers --
    case 'ADD_REVIEWER': {
      const newData = { ...state.data, reviewers: [...state.data.reviewers, { name: '', role: '' }] };
      return withUpdated(state, newData);
    }
    case 'REMOVE_REVIEWER': {
      const reviewers = state.data.reviewers.filter((_, i) => i !== action.index);
      return withUpdated(state, { ...state.data, reviewers });
    }
    case 'UPDATE_REVIEWER': {
      const reviewers = state.data.reviewers.map((r, i) => (i === action.index ? action.reviewer : r));
      return withUpdated(state, { ...state.data, reviewers });
    }

    // -- JTBD --
    case 'ADD_JTBD': {
      const jtbd = [...state.data.jtbd, ''];
      return withUpdated(state, { ...state.data, jtbd });
    }
    case 'REMOVE_JTBD': {
      const jtbd = state.data.jtbd.filter((_, i) => i !== action.index);
      return withUpdated(state, { ...state.data, jtbd });
    }
    case 'UPDATE_JTBD': {
      const jtbd = state.data.jtbd.map((j, i) => (i === action.index ? action.value : j));
      return withUpdated(state, { ...state.data, jtbd });
    }

    // -- Metrics --
    case 'ADD_METRIC': {
      const metrics = [...state.data.metrics, { metric: '', defined: '', goal: '', instrumentation: '' }];
      return withUpdated(state, { ...state.data, metrics });
    }
    case 'REMOVE_METRIC': {
      const metrics = state.data.metrics.filter((_, i) => i !== action.index);
      return withUpdated(state, { ...state.data, metrics });
    }
    case 'UPDATE_METRIC': {
      const metrics = state.data.metrics.map((m, i) => (i === action.index ? action.metric : m));
      return withUpdated(state, { ...state.data, metrics });
    }

    // -- Personas --
    case 'TOGGLE_PERSONA': {
      const personas = state.data.personas.includes(action.persona)
        ? state.data.personas.filter((p) => p !== action.persona)
        : [...state.data.personas, action.persona];
      return withUpdated(state, { ...state.data, personas });
    }

    // -- Links --
    case 'ADD_LINK': {
      const links = [...(state.data[action.field] || []), action.url];
      return withUpdated(state, { ...state.data, [action.field]: links });
    }
    case 'REMOVE_LINK': {
      const links = (state.data[action.field] || []).filter((_: string, i: number) => i !== action.index);
      return withUpdated(state, { ...state.data, [action.field]: links });
    }

    // -- References --
    case 'SET_REFERENCE': {
      const references = { ...state.data.references, [action.key]: action.value };
      // Remove key if value is empty
      if (!action.value) {
        delete references[action.key];
      }
      return withUpdated(state, { ...state.data, references });
    }

    // -- Status --
    case 'SET_STATUS': {
      return {
        ...state,
        metadata: { ...state.metadata, status: action.status, updatedAt: now() },
      };
    }

    // -- Load full document --
    case 'LOAD_DOCUMENT': {
      return action.document;
    }

    // -- Version snapshot --
    case 'SNAPSHOT_VERSION': {
      const entry: VersionEntry = {
        id: generateId(),
        timestamp: now(),
        label: action.label ?? `v${state.metadata.version}`,
        data: { ...state.data },
      };
      let versions = [...state.versions, entry];
      if (versions.length > MAX_VERSIONS) {
        versions = versions.slice(versions.length - MAX_VERSIONS);
      }
      return {
        ...state,
        metadata: {
          ...state.metadata,
          version: state.metadata.version + 1,
          updatedAt: now(),
        },
        versions,
      };
    }

    // -- Reset --
    case 'RESET': {
      return createEmptyDocument();
    }

    default:
      return state;
  }
}
