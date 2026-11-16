# Santo Domingo Pilot Project Plan

Align Marido en Alquiler with a HomeStars-style introductions model

Planning draft • Prepared for Target Innovations • 16 November 2026

### 1. Objective and recommended approach

Use the existing application to validate a trusted home-services marketplace in one Santo Domingo service zone. Keep homeowner access free. Professionals express interest; the homeowner selects a small shortlist; contact and chat access follow a mutually accepted introduction. Retain quote and completion records after connection.

Recommendation: launch a free, assisted pilot first, demonstrate that introductions create useful work, then introduce modest professional connection fees. This document estimates and scopes that transition; it does not authorize implementation, prices, payment-provider selection or a launch date.

| Pilot option | Planning effort including contingency | Calendar equivalent |
| --- | --- | --- |
| Core free / assisted pilot | 20–30 developer days | 4–6 weeks |
| Paid-introduction pilot, total | 30–45 developer days | 6–9 weeks |

### Engineering estimate behind those ranges

| Workstream | Base developer days |
| --- | --- |
| Pilot journey, Santo Domingo areas/categories and simple matching | 3–5 |
| Interest, shortlist, three-pro cap and backend contact/chat permissions | 5–8 |
| Pilot administration, manual vetting and complaint handling | 4–6 |
| Testing, mobile usability, metrics, migrations and rollout | 4–6 |
| Core pilot subtotal before contingency | 16–25 |
| Hosted payment / purchase-access ledger / receipts / refunds | 8–12 additional |

Approximately 20% contingency rounds the core to 20–30 days and the paid increment to 10–15 days. One developer day means approximately eight focused hours. Calendar ranges assume five full development days per week; they are estimates, not delivery commitments.

Assumptions: one experienced full-time developer with AI assistance, prompt product decisions, roughly 20 manually vetted professionals, one small zone, three initial service categories, simple matching and no custom mobile apps. Recruitment, payment-provider approval and policy review can extend elapsed time independently of engineering.

## 2. Scope: preserve the foundation, change the connection model

| Treatment | Existing capability / proposed action |
| --- | --- |
| Reuse | Cognito registration/sign-in, profiles, photos, project posting, quotes, live chat, email notifications, ownership checks and existing AWS deployment patterns. |
| Park behind pilot mode | Keep the broader project/payment/milestone experience and existing data/code recoverable. Make the pilot journey the primary experience. Retain optional quote/completion tools after an introduction; do not rewrite the application. |
| Build / adapt | Local service areas and matching, interest/shortlist/consent states, controlled introductions, usable operator screens, qualification/complaint records and pilot metrics. Add hosted professional-fee collection only for the paid phase. |

### Target customer journey

Post a request → suitable professionals express interest → homeowner shortlists up to three → professional confirms the introduction → contact/chat access opens → parties arrange work → record outcome and invite an eligible review. During the free pilot the introduction price is zero; paid access requires confirmed payment in the later phase.

### Detailed delivery requirements

Pilot posting and matching: capture service type, sector/service zone, timing, photos and useful scope/budget details. Match by category, area and availability. Show coarse location publicly; reveal precise address/contact details only with appropriate consent.

Shortlisting and consent: define explicit states and expiry/cancellation behavior; prevent duplicate introductions; enforce the three-pro cap on the server, including simultaneous requests. Keep an auditable record of who accepted what.

Contact permissions: protect structured phone/email fields, client-by-project contact access and message creation/history rules. Current public profiles and unrestricted direct chat can bypass a paid-introduction gate. Enforce access in the API, not merely by hiding buttons. Preserve existing conversations; do not charge retroactively.

Operator tools: approve professionals and requests, record manual identity/reference/trade checks, review complaints and moderate reviews. State exactly what verification means. Keep identity documents out of the existing public-photo bucket; automated identity checks are outside the initial scope.

Paid phase: use hosted checkout for professional platform fees, never the disabled legacy raw-card path. Add a purchase/access ledger, signed and idempotent payment callbacks, receipts, spending controls and refund/access-state handling. Grant paid contact access only after verified payment confirmation.

### Deliberately deferred

Mandatory subscriptions, prepaid credit packages, collection of full job payments, commissions, escrow, funded workmanship guarantees, automated vetting, nationwide expansion, native mobile apps and a broad visual redesign. Payment/milestone writes currently disabled remain blocked unless separately redesigned and approved.

## 3. Delivery sequence and acceptance gates

Weeks are relative to an agreed start and available developer capacity. Activities overlap; the schedule is not an additional estimate on top of the person-day table.

| Relative window | Deliverable and exit gate |
| --- | --- |
| Weeks 1–2 | Confirm pilot decisions; map the old and new journeys; add versioned schema changes and pilot mode; adapt local posting and deterministic matching. Exit: a request reaches the correct service/area cohort. |
| Weeks 2–3 | Deliver interest, shortlisting, consent and consistent contact/chat entitlements. Exit: concurrent, unauthorized and cross-account attempts cannot exceed limits or expose protected contact information. |
| Weeks 3–4 | Deliver operator approvals, manual verification records, complaints and basic funnel reporting; adapt notification templates. Exit: an operator can manage the small pilot without developer database edits. |
| Weeks 4–6 | Complete mobile/failure regression, deployment checks and operator acceptance. Use contingency where needed. Exit: core pilot launch criteria met and cohort/operations ready. |
| After core approval: +2–3 weeks | If merchant access and product decisions are ready, add hosted platform-fee payments, ledger, receipts and refunds. Exit: paid launch tests pass. Total engineering range remains approximately 6–9 weeks from project start. |

### Core pilot launch acceptance

A homeowner can submit a suitable local request; a vetted professional can express interest; the homeowner can select up to three; consent opens the correct conversation/contact access.

Anonymous users, unrelated accounts, unselected professionals and concurrent requests cannot bypass contact permissions or shortlist limits. Owners retain necessary access to their own records.

An operator can approve/reject requests and professionals, record verification decisions and handle a complaint. Profile credentials and paid status are not presented as a guarantee of workmanship.

Existing account/profile/photo/chat functionality and historical conversations still work. Errors retain user input and distinguish saved records from notification failures.

Operator can read request, response, shortlist, connection and outcome metrics. Deployments have rollback instructions, meaningful failure visibility and cleaned test fixtures.

### Additional paid-pilot launch acceptance

The professional sees the exact fee and terms before accepting. Failed/canceled payments grant no paid access; successful confirmed payment grants access once.

Duplicate/replayed callbacks, concurrent purchases and refunds do not create duplicate charges or conflicting entitlements. Operators can reconcile provider transactions to ledger entries and receipts.

Invalid-lead/refund rules, pricing/tax presentation, payment-provider onboarding and operational ownership are approved before real professional charges begin.

## 4. Dependencies, controls and decisions

| Risk / dependency | Practical response |
| --- | --- |
| Public contact-data leakage | Audit all profile, project-contact and messaging APIs. Moderate obvious contact-sharing in public content. Do not claim technical controls can prevent every outside connection. |
| AWS stack capacity | The REST stack currently has 486 resources against the documented 500-resource template limit. Put new pilot resources in a small separate stack, reusing security/database patterns and preserving current mail/chat services. Included in the planning allowance. [1] |
| Weak local demand / thin contractor coverage | Recruit the small cohort and manually qualify early requests. Learn from a free pilot before relying on professional subscription or lead-fee revenue. |
| External payment onboarding | Choose one hosted provider and obtain merchant access early. Treat approval timelines and provider fees as external dependencies; avoid full job-payment custody at launch. |
| Scope expansion or slow decisions | Agree the zone, categories, access rules and operator policy first. Re-estimate automated vetting, subscriptions, escrow, native apps or additional regions separately. |

### Decisions needed before development starts

1. Free-first or paid-from-day-one pilot.  2. Initial Santo Domingo zone and three categories.  3. Professional/request vetting owner and criteria.  4. What shortlist/consent unlocks and how old conversations are treated.  5. If paid: fee structure, provider, refund rules and tax/receipt presentation. Proposed RD$ amounts in the earlier research brief remain experiments, not approved prices.

### Pilot measurement and operational ownership

Track qualified requests, time to first response, shortlist-to-contact conversion, contact-to-hire outcomes, invalid-lead complaints, professional repeat use and acquisition/support costs. The business owner or named operator owns recruitment, manual qualification, support and policy decisions; engineering owns implementation, tests, instrumentation and release. Commercial viability is a pilot result, not a development acceptance guarantee.

### Reversible implementation and cost boundary

Use separate fix/feature commits, versioned migrations, server-enforced pilot mode, captured deployment artifacts and documented recovery. Preserve the current model and data. No destructive cleanup or retrospective charging is implied. Development cost can be budgeted as planned person-days × the agreed daily rate; AWS usage, merchant fees, recruitment, support staffing and professional policy review are additional costs, not included financial quotations.

### Evidence and status

Estimate based on the current repository/deployment review and the HomeStars comparison brief dated 16 November 2026. Reusable capabilities and current gaps are recorded in docs/HANDOFF.md and the release records. This is a planning draft, not an approved implementation backlog. No application code, pricing, infrastructure or account permissions were changed by preparing this document.

[[1] AWS — CloudFormation resource quota and splitting templates](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cloudformation-limits.html)

Related brief: docs/research/HomeStars-vs-Marido-en-Alquiler-Dominican-Republic-2026-11-16.docx. Current technical evidence: docs/releases/2026-11-16-crud-consistency.md and docs/releases/2026-11-16-notifications.md.
