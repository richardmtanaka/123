export interface Reviewer {
  name: string;
  role: string;
}

export interface Metric {
  metric: string;
  defined: string;
  goal: string;
  instrumentation: string;
}

export interface PrdFormData {
  feature_title: string;
  domain_area: string;
  v2mom: string;
  release: string;
  target_editions: string;
  prd_owner: string;
  designer: string;
  architect: string;
  em: string;
  tpm: string;
  cx: string;
  reviewers: Reviewer[];
  personas: string[];
  persona_other: string;
  elevator_pitch: string;
  customer_problem: string;
  out_of_scope: string;
  business_customers: string;
  business_goals: string;
  business_revenue_impact: string;
  jtbd: string[];
  metrics: Metric[];
  competitive_context: string;
  competitive_links: string[];
  references: Record<string, string>;
  reference_links: string[];
  additional_notes: string;
  notes_links: string[];
}

export type DraftStatus = 'draft' | 'in_review' | 'complete';

export interface PrdMetadata {
  title: string;
  status: DraftStatus;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export interface VersionEntry {
  id: string;
  timestamp: string;
  label: string;
  data: PrdFormData;
}

export interface PrdDocument {
  id: string;
  metadata: PrdMetadata;
  data: PrdFormData;
  versions: VersionEntry[];
}

export interface PrdDocumentSummary {
  id: string;
  title: string;
  status: DraftStatus;
  updatedAt: string;
  domainArea: string;
  release: string;
}
