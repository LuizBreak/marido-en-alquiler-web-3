# Asana ticket ledger

Updated November 16, 2026. Target: [Marido en Alquiler](https://app.asana.com/1/1200400511518349/project/1201474712395202/board/1205115801994358).

No remote tickets were created. [CSV](asana-tickets.csv) contains all 21 import-ready records and original evidence; avoid duplicate imports. Latest [hardening release](releases/2026-11-16-hardening.md) and [credential record](releases/2026-11-16-credentials.md) cover deployed Node 24, restricted/rotated credentials and secure photos. All resources/data are development. Partial means explicit acceptance work remains; API/component verification is not exhaustive browser acceptance.

| Ticket | Priority | Current status | Title |
| --- | --- | --- | --- |
| [R01](#r01) | P0 | Partial; identified credentials retired | Credentials committed in application source/configuration |
| [R02](#r02) | P0 | Partial; deployed and verified | API authentication and resource ownership are not enforced in reviewed code |
| [R03](#r03) | P0 | Partial; unsafe flow disabled | Raw card and security-code persistence path |
| [R04](#r04) | P0 | Verified development guard | Local/offline backend can connect to production |
| [R05](#r05) | P0 | Partial; credential paths isolated | Passwords, tokens and private payloads can reach storage/logging/responses |
| [R06](#r06) | P1 | Code implemented; integration verification pending | Session lifetime, restoration and navigation checks disagree |
| [R07](#r07) | P1 | Deployed; API verified | Response helper changes data shape and discards results |
| [R08](#r08) | P1 | Partial | Missing promise propagation produces premature success and lost errors |
| [R09](#r09) | P1 | Partial; provisioning deployed | Signup and generated-ID handling are not reliable |
| [R10](#r10) | P1 | Deployed; principal routes verified | Primary keys, route parameters and SQL names disagree |
| [R11](#r11) | P1 | Partial; API routes deployed | FE invokes undeclared routes/actions |
| [R12](#r12) | P1 | Partial; live schema reconciled | SQL, TypeScript interfaces and payloads have drifted |
| [R13](#r13) | P1 | Code implemented; integration verification pending | FE state updates include concrete collection bugs |
| [R14](#r14) | P1 | Partial; boundary deployed | SQL input handling and Lambda error paths need consolidation |
| [R15](#r15) | P1 | Partial; API read state verified | Chat read state and connection lifecycle are inconsistent |
| [R16](#r16) | P1 | Partial; secure photos deployed | Image upload integrity and private ownership are undefined |
| [R17](#r17) | P2 | Partial; release path documented | Multiple backend execution/configuration paths obscure the source of truth |
| [R18](#r18) | P2 | Partial; runtime/package repaired | Dependency and verification baseline is weak |
| [R19](#r19) | P2 | Partial; browser SDK removed | Initial browser payload is large |
| [R20](#r20) | P2 | Partial; hardened AWS dev release verified | Deployment, external services and operational ownership are incomplete |
| [R21](#r21) | P2 | Partial | Product completion and component cleanup need explicit scope |

## R01

**[R01] — Credentials committed in application source/configuration**

Status: Partial; identified credentials retired.

Commits: FE b8f7450; BE 0f92330.

Historical image-upload IAM key is inactive; CLI access was preserved. RDS admin password rotated and old login rejected. App now uses its own DML-only secret/account; effective Lambda admin-secret denial verified. Remaining: full history/provider-secret and access-history review, recurring rotation and coordinated history cleanup; old artifacts remain private.

Dependencies: . Original evidence remains in the CSV and [review report](review-report.md).


## R02

**[R02] — API authentication and resource ownership are not enforced in reviewed code**

Status: Partial; deployed and verified.

JWT/verified-email/subject checks and resource ownership are deployed. Public contractor/account/payment projections filter sensitive fields. Disposable AWS client/contractor fixtures verify denied private and cross-account calls. Remaining: exhaustive admin/resource denial matrix, account lifecycle and moderation/business-state rules.
See docs/releases/2026-11-16-backend.md for final deployment evidence and rollback. All AWS resources/data were confirmed development by the user. No remote Asana tickets were created.

Dependencies: R01, R04. Original evidence remains in the CSV and [review report](review-report.md).


## R03

**[R03] — Raw card and security-code persistence path**

Status: Partial; unsafe flow disabled.

Raw-card UI collection is removed. API payment/milestone writes return 501 and payment reads contain only last4/expiry. Remaining: choose provider/payment model, implement provider references and decide cleanup of any legacy stored PAN/CVC; existing rows were not inspected or purged.
See docs/releases/2026-11-16-backend.md for final deployment evidence and rollback. All AWS resources/data were confirmed development by the user. No remote Asana tickets were created.

Dependencies: R02. Original evidence remains in the CSV and [review report](review-report.md).


## R04

**[R04] — Local/offline backend can connect to production**

Status: Verified development guard.

Local remote-DB guard is covered by unit tests. AWS resources were inventoried and the user confirmed the entire system is development. Explicit disposable fixture tests use that development database. Retain safe defaults and separate configuration if a real production environment is introduced.
See docs/releases/2026-11-16-backend.md for final deployment evidence and rollback. All AWS resources/data were confirmed development by the user. No remote Asana tickets were created.

Dependencies: . Original evidence remains in the CSV and [review report](review-report.md).


## R05

**[R05] — Passwords, tokens and private payloads can reach storage/logging/responses**

Status: Partial; credential paths isolated.

Commits: BE bbd6f69, 0f92330; FE a519b5e, b8f7450.

DB administrator credential is no longer available to Lambda; browser has no AWS upload key/SDK. Signed policies return temporary upload authorization only; private contractor submission logging was removed. Remaining: historical logs/data/provider-secret review and unused legacy/prototype paths.

Dependencies: R01, R02. Original evidence remains in the CSV and [review report](review-report.md).


## R06

**[R06] — Session lifetime, restoration and navigation checks disagree**

Status: Code implemented; integration verification pending.

Validate Cognito refresh/reload/expiry/logout and role-specific navigation against an isolated environment; authoritative API authorization is R02.

Dependencies: R02, R07. Original evidence remains in the CSV and [review report](review-report.md).


## R07

**[R07] — Response helper changes data shape and discards results**

Status: Deployed; API verified.

Canonical data plus serialized compatibility body is deployed and checked through actual AWS account/profile/project/quote/favorite/message workflows. Continue consumer-specific browser acceptance as features are completed.
See docs/releases/2026-11-16-backend.md for final deployment evidence and rollback. All AWS resources/data were confirmed development by the user. No remote Asana tickets were created.

Dependencies: . Original evidence remains in the CSV and [review report](review-report.md).


## R08

**[R08] — Missing promise propagation produces premature success and lost errors**

Status: Partial.

CRUD promises, profiles/projects/bids/inquiries and uploads now wait for persistence; generated IDs are retained. The later missing-form-ID client save was corrected to update the signed-in account; the user confirmed save success. Audit legacy booking/contact flows, complete server-side durable notifications and run broader browser failure/retry scenarios.

Dependencies: R07, R10. Original evidence remains in the CSV and [review report](review-report.md).


## R09

**[R09] — Signup and generated-ID handling are not reliable**

Status: Partial; provisioning deployed.

Cognito registration supplies names/role; SQL provisioning follows verified login, runs in a locked transaction and retries idempotently. Real SRP fixtures verify both profile roles and long-email compatibility. Remaining: user-driven signup/email confirmation, interruption/concurrency edge cases and duplicate historical email reconciliation.
See docs/releases/2026-11-16-backend.md for final deployment evidence and rollback. All AWS resources/data were confirmed development by the user. No remote Asana tickets were created.

Dependencies: R02, R04, R07, R12. Original evidence remains in the CSV and [review report](review-report.md).


## R10

**[R10] — Primary keys, route parameters and SQL names disagree**

Status: Deployed; principal routes verified.

Correct keys/routes are deployed; real fixture creation/update/delete and composite favorite paths are checked. Payment/milestone writes and coordinated account deletion intentionally return 501 pending completion.
See docs/releases/2026-11-16-backend.md for final deployment evidence and rollback. All AWS resources/data were confirmed development by the user. No remote Asana tickets were created.

Dependencies: . Original evidence remains in the CSV and [review report](review-report.md).


## R11

**[R11] — FE invokes undeclared routes/actions**

Status: Partial; API routes deployed.

Quote client/project and composite favorite routes are now present in AWS and source configuration. Remaining: audit legacy root action bindings and unused/screens-only consumers rather than marking every historical action path complete.
See docs/releases/2026-11-16-backend.md for final deployment evidence and rollback. All AWS resources/data were confirmed development by the user. No remote Asana tickets were created.

Dependencies: R02, R07, R10. Original evidence remains in the CSV and [review report](review-report.md).


## R12

**[R12] — SQL, TypeScript interfaces and payloads have drifted**

Status: Partial; live schema reconciled.

Schema-only inventory covered actual MySQL columns/constraints. Required defaults/casing and username limits are repaired and real disposable inserts are verified without schema migration. Remaining: ordered migrations, interface/model alignment and stronger field/business validation.
See docs/releases/2026-11-16-backend.md for final deployment evidence and rollback. All AWS resources/data were confirmed development by the user. No remote Asana tickets were created.

Dependencies: R04. Original evidence remains in the CSV and [review report](review-report.md).


## R13

**[R13] — FE state updates include concrete collection bugs**

Status: Code implemented; integration verification pending.

Identity-based collection updates and favorite owner queries are fixed. Verify profile/favorite/project refreshes and role changes in the browser.

Dependencies: R07, R10. Original evidence remains in the CSV and [review report](review-report.md).


## R14

**[R14] — SQL input handling and Lambda error paths need consolidation**

Status: Partial; boundary deployed.

JWT/ownership boundary, allowlisted writes, identifier checks, parameterized SQL and safe CORS errors are deployed and checked. Remaining: fuller length/type/state validation, endpoint-specific rate limits, contact spam controls and resource-wide denial testing.
See docs/releases/2026-11-16-backend.md for final deployment evidence and rollback. All AWS resources/data were confirmed development by the user. No remote Asana tickets were created.

Dependencies: R04, R07. Original evidence remains in the CSV and [review report](review-report.md).


## R15

**[R15] — Chat read state and connection lifecycle are inconsistent**

Status: Partial; API read state verified.

Message sender/participant ownership, newest-100 chronological conversation, unread counts and recipient read flags are deployed. Real fixtures cover unread to read transition. Remaining: end-to-end WebSocket delivery/reconnect, stale-session behavior and browser chat acceptance.
See docs/releases/2026-11-16-backend.md for final deployment evidence and rollback. All AWS resources/data were confirmed development by the user. No remote Asana tickets were created.

Dependencies: R02, R07, R14. Original evidence remains in the CSV and [review report](review-report.md).


## R16

**[R16] — Image upload integrity and private ownership are undefined**

Status: Partial; secure photos deployed.

Commits: BE bbd6f69, 0f92330, 88a064b; FE a519b5e.

Client/contractor avatars and project photos work through short-lived signed POST grants. Owner UUID keys prevent filename collisions; S3 enforces size/MIME and persisted references get ownership/object-header checks. Account/profile updates are atomic; real S3 success and unsafe cases passed. Public photo policy retained. Remaining: full browser acceptance, orphan/replacement retention and legacy shared-key migration; private documents are outside this flow.

Dependencies: R01, R02, R08. Original evidence remains in the CSV and [review report](review-report.md).


## R17

**[R17] — Multiple backend execution/configuration paths obscure the source of truth**

Status: Partial; release path documented.

A reproducible allowlisted build/native CloudFormation release path is documented and alternative client ORM route delegates to secured handlers. Remaining: retire unused Express/Sequelize/prototype execution paths and unify schema/migrations/local serving.
See docs/releases/2026-11-16-backend.md for final deployment evidence and rollback. All AWS resources/data were confirmed development by the user. No remote Asana tickets were created.

Dependencies: R04. Original evidence remains in the CSV and [review report](review-report.md).


## R18

**[R18] — Dependency and verification baseline is weak**

Status: Partial; runtime/package repaired.

Commits: BE 059fe2d, 0f92330, 88a064b, 701a3e9; FE a519b5e.

All 76 Lambdas run Node 24. Targeted MySQL/AWS and compatible prototype updates preserved framework/plugin versions. Backend production audit findings went 36 to 8; reported vulnerable paths are absent from the allowlisted Lambda package. 55 BE/30 FE tests plus real AWS/S3 and compatible rollback checks passed. Remaining: prototype/build-tool and FE dependency modernization; the whole repository is not vulnerability-free.

Dependencies: R04. Original evidence remains in the CSV and [review report](review-report.md).


## R19

**[R19] — Initial browser payload is large**

Status: Partial; browser SDK removed.

Commits: FE a519b5e.

Removing the unused browser AWS SDK reduced vendor output from about 5.74 MiB to 2.20 MiB and raw initial entry point from 6.64 MiB to 3.10 MiB. Remaining: lazy loading, image optimization and actual mobile performance measurement; build-size warnings remain.

Dependencies: R18. Original evidence remains in the CSV and [review report](review-report.md).


## R20

**[R20] — Deployment, external services and operational ownership are incomplete**

Status: Partial; hardened AWS dev release verified.

Commits: BE 0f92330, 701a3e9; FE a519b5e, b8f7450.

Credential/runtime/photo release, actual IAM boundary probe, matching artifacts/public indexes, 187 asset checks and completed CDN invalidation are recorded. Prepared compatible app rollback passed disposable core flows; no stack rollback/restore was executed. Remaining: CI/monitoring/restore exercise, recurring rotation, orphan cleanup, email/WebSocket delivery and infrastructure consolidation (486/500 stack resources).

Dependencies: R01, R02, R04, R17. Original evidence remains in the CSV and [review report](review-report.md).


## R21

**[R21] — Product completion and component cleanup need explicit scope**

Status: Partial.

Dialog registration is fixed. Modal scrolling and profile-save fixes were deployed and the user previously confirmed them. The paired backend/FE development release now also passed API acceptance; exhaustive browser/product acceptance remains. Decide launch scope, complete/hide placeholders and legacy test routes, fix remaining helper validation/booking behavior, and perform accessibility/responsive/copy checks.

Dependencies: R02, R03, R08. Original evidence remains in the CSV and [review report](review-report.md).
