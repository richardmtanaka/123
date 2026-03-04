import type { StepConfig } from '../types/app';

export const STEPS: StepConfig[] = [
  { id: 'basics',      title: '1. Feature Basics',        shortTitle: 'Basics',       icon: '1' },
  { id: 'people',      title: '2. People',                shortTitle: 'People',       icon: '2' },
  { id: 'personas',    title: '3. Target Personas',       shortTitle: 'Personas',     icon: '3' },
  { id: 'problem',     title: '4. Problem & Opportunity', shortTitle: 'Problem',      icon: '4' },
  { id: 'business',    title: '5. Business Goals',        shortTitle: 'Business',     icon: '5' },
  { id: 'jtbd',        title: '6. Jobs To Be Done',       shortTitle: 'JTBD',         icon: '6' },
  { id: 'metrics',     title: '7. Success Metrics',       shortTitle: 'Metrics',      icon: '7' },
  { id: 'competitive', title: '8. Competitive Context',   shortTitle: 'Competitive',  icon: '8' },
  { id: 'references',  title: '9. Reference Materials',   shortTitle: 'References',   icon: '9' },
  { id: 'notes',       title: '10. Additional Notes',     shortTitle: 'Notes',        icon: '10' },
  { id: 'review',      title: 'Review & Export',          shortTitle: 'Review',       icon: '✓' },
];

export const PERSONAS = [
  'Marketer',
  'Marketing Admin',
  'Salesforce Admin',
  'Developer / IT Services',
  'Data Analyst / Marketing Ops',
];

export const DOMAIN_OPTIONS = [
  'Content Personalization',
  'Data Access & Graphs',
  'Messaging & Channels',
  'Scripting & Merge Fields',
  'Consent',
  'Setup & Provisioning',
];

export const EDITION_OPTIONS = [
  'All editions of MoC',
  'MC Growth / MC Advanced',
  'Starter / Pro Suite / Foundations / Freemium',
  'MC Growth / MC Advanced / MC Next',
];

export const REF_FIELDS = [
  { key: 'ref_prior_prd',    label: 'Example / Prior PRD' },
  { key: 'ref_discovery',    label: 'Discovery / Strategy Doc' },
  { key: 'ref_interviews',   label: 'User-Interview Syntheses' },
  { key: 'ref_analytics',    label: 'Analytics Dashboard' },
  { key: 'ref_competitive',  label: 'Competitive Benchmarks' },
  { key: 'ref_ideaexchange', label: 'IdeaExchange / VOC Summary' },
  { key: 'ref_trust',        label: 'Trust & Compliance Notes' },
  { key: 'ref_architecture', label: 'Architecture / TD Links' },
  { key: 'ref_other',        label: 'Other' },
];

export const TOOLTIP_CONTENT: Record<string, string> = {
  feature_title: 'A concise, action-oriented name for the feature. Example: "Content Personalization with sObject and DMO Lookups"',
  domain_area: 'The functional area this feature belongs to within Salesforce Personalization.',
  v2mom: 'The V2MOM program or theme this feature aligns to.',
  release: 'The Salesforce release number (e.g., 262, 264).',
  target_editions: 'Which Marketing Cloud editions will include this feature.',
  elevator_pitch: 'A 2-4 sentence summary of what we are building and why. This becomes the PRD objective.',
  customer_problem: 'Describe the current-state friction. Include customer names, support case volumes, and attrition signals if available.',
  out_of_scope: 'Explicitly list what we are NOT building this release to prevent scope creep.',
  jtbd: 'High-level customer goals in imperative voice. Example: "Personalize my message with related data that matches my recipient"',
  metrics: 'Define how you will measure success. Use o11y / UMA Instrumentation Standard references where possible.',
  competitive_context: 'How does this compare to MCE, Braze, HubSpot, Adobe? Write "N/A" for get-well / infra PRDs.',
};
