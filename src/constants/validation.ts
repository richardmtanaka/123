import type { PrdFormData } from '../types/prd';

type Validator = (data: PrdFormData) => Record<string, string>;

const required = (val: string, label: string): string | null =>
  val.trim() ? null : `${label} is required`;

export const STEP_VALIDATORS: Validator[] = [
  // Step 0: Feature Basics
  (d) => ({
    ...(required(d.feature_title, 'Feature Title') ? { feature_title: required(d.feature_title, 'Feature Title')! } : {}),
    ...(required(d.domain_area, 'Domain Area') ? { domain_area: required(d.domain_area, 'Domain Area')! } : {}),
  }),
  // Step 1: People
  (d) => ({
    ...(required(d.prd_owner, 'PRD Owner') ? { prd_owner: required(d.prd_owner, 'PRD Owner')! } : {}),
  }),
  // Step 2: Personas
  (d) => ({
    ...(d.personas.length === 0 && !d.persona_other.trim() ? { personas: 'Select at least one persona' } : {}),
  }),
  // Step 3: Problem & Opportunity
  (d) => ({
    ...(required(d.elevator_pitch, 'Elevator Pitch') ? { elevator_pitch: required(d.elevator_pitch, 'Elevator Pitch')! } : {}),
    ...(required(d.customer_problem, 'Customer Problem') ? { customer_problem: required(d.customer_problem, 'Customer Problem')! } : {}),
  }),
  // Step 4: JTBD
  (d) => ({
    ...(d.jtbd.every(j => !j.trim()) ? { jtbd: 'Enter at least one Job To Be Done' } : {}),
  }),
  // Step 5: Metrics
  (d) => ({
    ...(d.metrics.every(m => !m.metric.trim()) ? { metrics: 'Enter at least one metric' } : {}),
  }),
  // Step 6: Competitive — optional
  () => ({}),
  // Step 7: References — optional
  () => ({}),
  // Step 8: Notes — optional
  () => ({}),
  // Step 9: Review — no validation
  () => ({}),
];
