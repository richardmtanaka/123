import type { PrdFormData } from '../types/prd';
import { PERSONAS, REF_FIELDS } from '../constants/steps';

export function generatePrompt(d: PrdFormData): string {
  const personaChecks = PERSONAS.map(
    (p) => `- [${d.personas.includes(p) ? 'x' : ' '}] ${p}`
  ).join('\n');
  const otherPersona = d.persona_other
    ? `- [x] Other: ${d.persona_other}`
    : '';

  const reviewerLines =
    (d.reviewers || [])
      .filter((r) => r.name)
      .map((r) => `- ${r.name}${r.role ? ', ' + r.role : ''}`)
      .join('\n') || '- <Name, Role>';

  const jtbdLines = d.jtbd.map((j, i) => `${i + 1}. ${j || ''}`).join('\n');

  const metricTable =
    `| Metric | Defined As | Goal | Instrumentation (if known) |\n|--------|-----------|------|---------------------------|\n` +
    d.metrics
      .filter((m) => m.metric.trim())
      .map(
        (m) =>
          `| ${m.metric} | ${m.defined} | ${m.goal} | ${m.instrumentation} |`
      )
      .join('\n');

  const formatLinks = (links: string[] | undefined): string => {
    if (!links || links.length === 0) return '';
    return '\n\nATTACHED LINKS (open these for additional context):\n' +
      links.map((url) => `• ${url}`).join('\n');
  };

  const refLines =
    REF_FIELDS.map((r) => {
      const v = (d.references || {})[r.key];
      return v ? `\u2022 ${r.label}: ${v}` : '';
    })
      .filter(Boolean)
      .join('\n') || '\u2022 (none provided)';

  return `\u2554${'═'.repeat(70)}\u2557
║  SECTION A — PM INPUTS  (Salesforce Personalization PMs: fill in   ║
║  everything here, then submit)                                      ║
\u255A${'═'.repeat(70)}\u255D

── 1. FEATURE BASICS ──────────────────────────────────────────────

FEATURE TITLE: ${d.feature_title || '<Concise, action-oriented name>'}

DOMAIN AREA: ${d.domain_area || '<e.g., Content Personalization, Data Access & Graphs>'}
V2MOM ALIGNMENT: ${d.v2mom || '<Program/theme>'}
RELEASE: ${d.release || '<e.g., 262, 264>'}

── 2. PEOPLE ──────────────────────────────────────────────────────

PRD OWNER: ${d.prd_owner || '<Your name>'}
DESIGNER: ${d.designer || '<Name or TBD>'}
ARCHITECT: ${d.architect || '<Name or TBD>'}
EM: ${d.em || '<Name or TBD>'}
TPM: ${d.tpm || '<Name or N/A>'}
CX: ${d.cx || '<Name or N/A>'}

REVIEWERS (will populate approvals table):
${reviewerLines}

── 3. TARGET PERSONAS ─────────────────────────────────────────────
(pick all that apply from the SF JTBD Persona Framework)

${personaChecks}
${otherPersona}

── 4. PROBLEM & OPPORTUNITY ───────────────────────────────────────

ELEVATOR PITCH (2-4 sentences — what are we building and why):
${d.elevator_pitch || '<write here>'}

CUSTOMER PROBLEM — WHY & WHY NOW (current-state friction, evidence):
${d.customer_problem || '<write here>'}

OUT-OF-SCOPE (what we are NOT building this release):
${d.out_of_scope || '<write here>'}

── 5. BUSINESS GOALS ────────────────────────────────────────────

CUSTOMERS REQUESTING THIS:
${d.business_customers || '<List specific customers or segments>'}

BUSINESS GOALS:
${d.business_goals || '<Business outcomes this feature drives>'}

REVENUE IMPACT:
${d.business_revenue_impact || '<Estimated revenue impact or cost savings>'}

── 6. JOBS TO BE DONE ─────────────────────────────────────────────
(3-5 high-level customer goals in imperative voice)

${jtbdLines}

── 7. SUCCESS METRICS ─────────────────────────────────────────────

${metricTable}

── 8. COMPETITIVE CONTEXT ─────────────────────────────────────────

${d.competitive_context || '<Brief notes on competitors or "N/A — this is a get-well / infra PRD">'}${formatLinks(d.competitive_links)}

── 9. REFERENCE MATERIALS ─────────────────────────────────────────

${refLines}${formatLinks(d.reference_links)}

── 10. ADDITIONAL NOTES / CONTEXT ─────────────────────────────────

${d.additional_notes || '<Anything else the AI should know>'}${formatLinks(d.notes_links)}


\u2554${'═'.repeat(66)}\u2557
║  SECTION B — AI INSTRUCTIONS  (do not edit below this line)     ║
\u255A${'═'.repeat(66)}\u255D

ROLE
You are a senior Product Manager at Salesforce on the Salesforce
Personalization team (part of Marketing Cloud on Core / MoC). You write
PRDs using the MC Advance Planning PRD Template — a two-part format
(Part 1: One-Pager, Part 2: Use Cases & Requirements).

────────────────────────────────────────
PRODUCT CONTEXT — SALESFORCE PERSONALIZATION
────────────────────────────────────────

Salesforce Personalization (SP) is the personalization engine within
Marketing Cloud on Core (MoC). It enables marketers to deliver
individualized, data-driven content across email, SMS, WhatsApp, push,
and web channels — all natively on the Salesforce Platform (Core).

Key capabilities and architecture:
• CONTENT PERSONALIZATION — Dynamic content blocks, scripting (AMPscript-
  equivalent on Core), and merge fields that resolve recipient-specific
  data at send time (late-binding).
• DATA ACCESS LAYER — Data Graphs, sObject Lookups, and DMO Lookups
  serve as the primary data providers, pulling recipient and relational
  data from CRM objects, Harmonized Salesforce Objects (HSOs), and
  Data Cloud DMOs for use in content and messaging.
• MESSAGING & CHANNELS — API-triggered and flow-triggered outbound
  messaging across Email, SMS, WhatsApp, and Mobile Push via MoC's
  sending pipeline. Transactional messaging uses On-Demand Flows with
  Apex Class data providers for low-latency, dynamic personalization.
• DATA CLOUD INTEGRATION — MoC relies on Data Cloud for unified
  profiles, segmentation, and data kit deployment. Data kits (currently
  transitioning from 1GP packaged to file-based via the Singularity
  initiative) package the metadata that powers SP features.
• SETUP & PROVISIONING — UMA Provisioning Service handles data kit
  installation for Freemium/Starter/Pro Suite/Foundations editions.
  The Data Stream Update (DSU) utility ("one-click install") handles
  MC Growth/MC Advanced. Both are evolving to support file-based kits.
• CONSENT & COMPLIANCE — Consent checks integrated into the send
  pipeline; transactional message types (OTP, alerts) can bypass
  marketing consent per channel-specific rules.
• EDITIONS — Freemium, Starter, Pro Suite, Foundations, MC Growth,
  MC Advanced. Features vary by edition; PRDs must specify edition
  scope and consider upgrade paths between editions.
• ORG SHAPES — Non-default data space, Business Units, Data Cloud One /
  Remote Data Cloud, Sandbox, and GovCloud (FedRAMP) are all supported
  configurations that PRDs must account for when relevant.

Key teams in the SP ecosystem: Experience Wizards, OMM/Messaging,
Content, Flow (C360 Data Cloud Integration), Consent (E360 Shaolin),
Email/SMS/WhatsApp/Push Messaging (E360), Marketing Setup (Triton),
ASYNC, Martech Data Analytics, Pardot (Derweze), Commerce.

When writing PRDs, always frame features in terms of how they advance
SP's ability to deliver the right content, to the right person, on
the right channel, at the right time — using data natively available
on the Salesforce Platform and Data Cloud.

────────────────────────────────────────
BEFORE YOU DRAFT
────────────────────────────────────────

Review all PM inputs in Section A above. IF any essential context is
missing to write a complete PRD:
• Ask up to 7 clarifying questions first and WAIT for answers before drafting.
• Focus questions on: customer problem clarity, success metric targets,
  edition scoping, key dependencies, out-of-scope boundaries, and
  Agentforce applicability.

────────────────────────────────────────
TASK
────────────────────────────────────────

Using the PM inputs above and any attached reference materials, draft a
complete PRD with the following two parts and exact section structure:

## PART 1 — ONE-PAGER

### 1. Document Header
- PRD title (format: [<Release> PRD] <Feature Title>)
- File Location reminder: "Save all PRDs in the Marketing Cloud Release
  Planning Artifacts Shared Drive → <Release> → <Release> PRDs"
- V2MOM Alignment
- Points of Contact table (PRD Owner, Designer, Architect, TPM, CX)
- PRD Change History table (Date | Change | Status=Draft)

### 2. Product Goals
Objective — "elevator pitch" (3–5 sentences max). State what we are
building and how it maps to the broader content/data/messaging strategy.

Context / Customer Problem — Answer "why" and "why now." Describe the
current-state friction, what exists today, and what constraints we
operate within. Include customer evidence.

Out-of-Scope — Explicitly list what we are NOT building this release.

### 3. Background and Strategic Fit
- Jobs to Be Done — 3–5 high-level customer goals (imperative voice).
- Competitive Analysis — Brief comparison to MCE, Braze, HubSpot,
  Adobe Journey Optimizer, or note "N/A" if this is a get-well / infra
  PRD. Use a table when comparing multiple competitors.
- Target Edition — Which editions and why.
- Agentforce Opportunity — Use the format: "As an Agentforce user, when
  I {action}, the agent {response}." Write "N/A" if not applicable.

### 4. Success Metrics
Table: Metric | Defined As | Goal | Instrumentation Details
Include at least one metric.

### 5. Design
- Targeted Personas — From the SF JTBD persona framework.
- Mockups and Designs — Key screens or "TBD" with note on expected UI
  changes. Link to Figma. Designs should be Kondo compliant.
- Consumption and Limits — Table: Limit Name | Description | Limit
  Value | Limit Type (Absolute).

### 6. Engineering Basics
- Teams Required — List owning scrum teams and dependent teams.
- Known Dependencies — Include TD links where available.
- Data Storage and Modeling — New objects? Approved by Data Modelers?
- Environment Readiness — GovCloud (Assessment Checklist), BU support,
  DC1, Sandbox, Data Cloud One / Remote Data Cloud.
- Supplemental Resources — Links to strategy docs, HLDs, related PRDs.

---

## PART 2 — USE CASES & REQUIREMENTS

### 7. Use Cases Table
Columns: Persona | Use Case | B2B/B2C/B2B2C | How Feature Helps |
Other Required Features | Fully Delivered This Release? | Priority | Notes
Include at least 3 use cases. Reference real customer names where possible.

### 8. Requirements Table
Columns: Persona | JTBD | Draft Epic | Task / Requirement | Details /
Acceptance Criteria | Dependent Teams | Priority | Notes

Rules for this table:
- Map each requirement back to a JTBD from Section 3.
- Write acceptance criteria that translate directly into GUS Epics.
- Always include these standing requirements (even as placeholders):
  1. "As a user, if I delete this feature's data, the system ensures
     referential integrity."
  2. "As a PM, I can track the key metrics defined above so I can
     evaluate success."
  3. "As an Admin, I know what entitlements this feature consumes, when
     it's hitting its limit, and how to purchase more."
- Consider and note: Accessibility (screen reader + keyboard nav),
  Sandbox functionality, GovCloud VAT checklist, P0/P1 usability issues.

### 9. Reviewers & Approvals
- Stakeholder Approvals table: Name | Status | Role | Comments
  (Status values: Review Requested, Under Review, Signed Off)
- "Signed off" = "I believe all MVP scenarios have been thought through
  and this is ready to be scoped by teams."

### 10. Questions and Decisions
Table: Status | Question | Outcome
Pre-populate with open questions from the PM inputs. Mark status as
Open, Closed, or Blocked.

────────────────────────────────────────
CONSTRAINTS
────────────────────────────────────────

• Length: ≤ 200 words per major section. Tables can be longer.
• Voice: Salesforce voice guidelines — clear, customer-first, Trust-focused.
• Format: Markdown with exact H2/H3 headings per section list above.
  Use tables wherever structured data appears.
• Citations: Embed inline citations / hyperlinks for all data points.
• TBD Marker: Prefix all TBD / incomplete items with 🔍 for easy search.
• Standing Sections: Never omit the 3 standing requirements — include
  them even as placeholders.
• Priority Labels: Use P0 / P1 / P2 consistently.
• GUS-Ready: Write requirements so they migrate directly into GUS Epics.
• Org Shapes: When relevant, address: edition upgrades, non-default data
  space, business units, Data Cloud One / Remote DC, Sandbox, GovCloud.

────────────────────────────────────────
AFTER DRAFTING
────────────────────────────────────────

Append a "PRD Health Check" section that scores the draft (✅ / ⚠️ / ❌):
1. Every JTBD maps to at least one requirement
2. Success metrics are measurable with defined instrumentation
3. Out-of-Scope is explicitly stated
4. Standing requirements are present
5. All 🔍 TBD items are surfaced
6. GovCloud / Sandbox / BU / org-shape considerations addressed
7. Competitive context provided (or marked N/A with rationale)
8. Acceptance criteria are GUS-Epic ready`;
}
