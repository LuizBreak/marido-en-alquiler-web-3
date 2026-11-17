# Asana ticket ledger

November 17: [session/signup coverage](releases/2026-11-17-session-signup.md) is deployed. Expiry/logout/reload, real refresh and tab isolation passed; public contractor confirmation used a real Gmail code. Historical identity audit is clear, conflict denials passed and all fixtures were removed. 83 FE / 137 BE tests pass. No backend runtime/schema change or remote Asana creation.

The user supplied a Zoho Inbox screenshot confirming receipt of both client and contractor registration test notices.

November 17: [registration notification feature](releases/2026-11-17-registration-notifications.md) is deployed to hello@ with an atomic SQL queue, one-minute retry worker and unique per-account event. Automatic first-attempt submissions for both roles, concurrency/repeat-sign-in checks and cleanup passed. 134 BE tests; FE unchanged at 60 tests. There are now 78 active functions; mail stack has twelve resources. General notification-outbox work remains partial because other email types still use their previous best-effort delivery path. No remote tickets were created.

The user confirmed both restored new-message and service-request emails arrived in Gmail and look correct. The contact test remains SES-accepted without separate user confirmation.

Latest acceptance: [remaining notification templates](releases/2026-11-16-notification-templates.md). Branded message/service/contact notices, labeled newsletter/referral support mail, authenticated message links and server-validated service-project context are deployed. 120 BE / 60 FE tests, all 77 deployed hashes, 187 frontend asset hashes and live SES/browser/API regression passed; disposable fixtures were removed. Existing tickets remain partial where broader acceptance is outstanding. No remote tickets were created.

Updated November 16, 2026. Target: [Marido en Alquiler](https://app.asana.com/1/1200400511518349/project/1201474712395202/board/1205115801994358).

No remote tickets were created. [CSV](asana-tickets.csv) contains all 21 import-ready records and original evidence; avoid duplicate imports. Latest [hardening release](releases/2026-11-16-hardening.md) and [credential record](releases/2026-11-16-credentials.md) cover deployed Node 24, restricted/rotated credentials and secure photos. All resources/data are development. Partial means explicit acceptance work remains; API/component verification is not exhaustive browser acceptance.

| Ticket | Priority | Current status | Title |
| --- | --- | --- | --- |
| [R01](#r01) | P0 | Partial; identified credentials retired | Credentials committed in application source/configuration |
| [R02](#r02) | P0 | Partial; live chat identity/participants verified | API authentication and resource ownership are not enforced in reviewed code |
| [R03](#r03) | P0 | Partial; unsafe flow disabled | Raw card and security-code persistence path |
| [R04](#r04) | P0 | Verified development guard | Local/offline backend can connect to production |
| [R05](#r05) | P0 | Partial; chat token paths protected | Passwords, tokens and private payloads can reach storage/logging/responses |
| [R06](#r06) | P1 | Verified reviewed expiry/logout/reload/tab flows | Session lifetime, restoration and navigation checks disagree |
| [R07](#r07) | P1 | Deployed; API verified | Response helper changes data shape and discards results |
| [R08](#r08) | P1 | Partial; durable registration notices verified | Missing promise propagation produces premature success and lost errors |
| [R09](#r09) | P1 | Partial; public signup and identity conflicts verified | Signup and generated-ID handling are not reliable |
| [R10](#r10) | P1 | Deployed; principal routes verified | Primary keys, route parameters and SQL names disagree |
| [R11](#r11) | P1 | Partial; owned notification paths verified | FE invokes undeclared routes/actions |
| [R12](#r12) | P1 | Partial; live schema reconciled | SQL, TypeScript interfaces and payloads have drifted |
| [R13](#r13) | P1 | Partial; affected browser flows verified | FE state updates include concrete collection bugs |
| [R14](#r14) | P1 | Partial; boundary deployed | SQL input handling and Lambda error paths need consolidation |
| [R15](#r15) | P1 | Partial; live delivery and authorization verified | Chat read state and connection lifecycle are inconsistent |
| [R16](#r16) | P1 | Partial; photo display browser-verified | Image upload integrity and private ownership are undefined |
| [R17](#r17) | P2 | Partial; active CRUD consolidated on mysql2 | Multiple backend execution/configuration paths obscure the source of truth |
| [R18](#r18) | P2 | Partial; 137 BE and 83 FE tests | Dependency and verification baseline is weak |
| [R19](#r19) | P2 | Partial; browser SDK removed | Initial browser payload is large |
| [R20](#r20) | P2 | Partial; registration worker deployed and verified | Deployment, external services and operational ownership are incomplete |
| [R21](#r21) | P2 | Partial; workflow and support feedback repaired | Product completion and component cleanup need explicit scope |

## Authenticated live chat acceptance

Latest [CRUD consistency release](releases/2026-11-16-crud-consistency.md): retired the unused Sequelize/Express prototype and direct dependencies, pointed `/clientes` directly at the shared mysql2 client handler, and moved verification credentials to the existing development secret with account/error guards. 104 BE tests, TypeScript, secret/artifact checks, 77 deployed hashes and live regression/cleanup passed. Frontend application code is unchanged; its prior 49-test baseline remains. R17 stays partial for other legacy mysql2 paths, migrations and infrastructure consolidation; R18 retains unrelated dependency/toolchain work.

The newer [notification release](releases/2026-11-16-notifications.md) supersedes older mailer-open statements below. SES delivery is deployed; the user confirmed both application Gmail test messages arrived. Stored recipients/fixed templates, opt-outs, event deduplication/rate limits and support-save feedback are verified. 94 BE / 49 FE checks and live AWS regression pass. The CSV appends these outcomes to the same 21 tickets; no remote tasks were created. DMARC, durable retry, alarm destinations and broader ticket acceptance remain open.

[Chat release](releases/2026-11-16-chat.md) supersedes earlier notes saying private WebSocket delivery failed. The same 21 CSV records retain history and append the current acceptance.

- **R02 — Partial; live chat identity/participants verified:** Verified Cognito handshake identity, SQL subject binding, server-derived message sender and delivery only to stored participants. Outsider message/history reads, arbitrary publishing, rebind and expired-session attempts fail. BE ea02ead.
- **R05 — Partial; chat token paths protected:** WebSocket tokens stay in handshake headers, never URLs or connection records; request tracing is off. Legacy anonymous handler is disabled and unrouted. Broader historical logging review remains.
- **R08 — Partial; chat persistence/delivery separated:** SQL save remains authoritative; live callback failures do not turn a saved message into a failed database write. Frontend deduplicates sender echoes and retains live events across history loads. FE 418ec72.
- **R11 — Partial; authenticated chat routes verified:** All eight existing WebSocket integrations target the new authenticated handler; no new REST routes/resources. Browser publishing routes reject attempts. Existing endpoint URL is retained.
- **R15 — Partial; live delivery and authorization verified:** Immediate text delivery passed in two recipient tabs and real local/published browsers. Saved history, forced reconnect catch-up, identity binding, outsider denial, scoped presence and expiry passed. Fake read timers remain removed. Timestamp display/server defaults fixed. Attachments, full read-receipt UX and broader load/outbox guarantees remain. FE 0269a39, 418ec72, ebe023e; BE ea02ead, a8b9d54.
- **R17 — Partial; managed chat stack documented:** The standalone process-local chat handler is replaced by a six-resource managed stack with durable expiring connection indexes, an authenticated handler and isolated socket/publisher roles. Main REST stack stays 486 resources. BE fde4f51.
- **R18 — Partial; 81 BE and 45 FE checks pass:** Current chat release passes 81 backend and 45 frontend tests, TypeScript, lint, build, secret scans and live AWS/browser acceptance. Active REST/socket functions use Node 24. Legacy/prototype/build-tool dependency work remains.
- **R20 — Partial; live chat deployed; mailer still open:** 77 active functions share the verified artifact; six-resource isolated chat stack, all endpoint integrations, scoped roles, tracing off and legacy quarantine verified. Public FE asset/index/CDN checks passed. Immediate WebSocket delivery/security is accepted; conch-app.com notification mailer DNS remains open.

## Latest journey acceptance

[Journey release](releases/2026-11-16-journey.md) supersedes earlier pending-browser/quote-atomicity notes below. The CSV retains the original evidence and appends the current status to the same 21 records.

- **R05 — Partial; signup credential logging removed:** Signup no longer logs passwords or confirmation codes, and no unauthenticated registration audit write is emitted. Broader historical log/secret review remains. FE a884f2e.
- **R06 — Verified reviewed expiry/logout/reload/tab flows:** Configure Cognito before restoring cached sessions; authenticated reload passed locally and on the published build. Expired-session/refresh-token and broader navigation cases remain. FE cfe6f4f, 9dce372.
- **R08 — Partial; core persistence feedback verified:** Bid/review drafts survive rejected saves; notification failure cannot turn a saved bid into a reported persistence failure. Chat persists before broadcast and no longer invents read receipts. FE 0016b31, c68ba4e.
- **R09 — Partial; real email confirmation verified:** Client signup, invalid-code feedback, Gmail code receipt, valid confirmation and automatic verified sign-in passed in Chrome. Contractor test accounts used administrator creation; their public email signup flow remains acceptance scope.
- **R11 — Partial; contractor navigation repaired:** Contractor messages/security/reviews/projects now resolve within their own layout; GET /projects?mine=true scopes assignments by verified identity without new AWS resources. FE ae9a87e; BE 89c6b49.
- **R13 — Partial; affected browser flows verified:** Project tiles resolve partner details locally instead of replacing the signed-in contractor. Acceptance uses committed server quote/project data. Broader store cleanup remains. FE 5648bfa, 48b7998.
- **R15 — Partial; persistence verified; realtime delivery open:** Saved chat renders once and survives recipient reload. WebSocket startup cannot block history; conversation matching is synchronous and fake delivered/read timers were removed. WebSocket presence opens but immediate private delivery failed; investigate the separate service/protocol and identity checks. FE 2d809e7, c68ba4e.
- **R16 — Partial; photo display browser-verified:** Profile upload/display passed in Chrome; generated project photo keys now render via safe S3 URLs. Orphan cleanup/retention and private-document storage remain. FE 5648bfa.
- **R18 — Partial; 68 BE and 41 FE checks pass:** Current release passed 68 BE tests, TypeScript, 41 FE tests, lint of 65 changed source files, production build, known-secret scans and actual API/browser checks. Older prototype/build-tool dependency findings remain.
- **R20 — Partial; workflow deployed; delivery integrations open:** 76 final Node 24 Lambda hashes and stack completion verified. FE published with all 187 asset checksums checked first, index last, old assets retained and CDN completed. Notification mailer conch-app.com fails DNS; WebSocket private delivery remains open. Cognito registration email works.
- **R21 — Partial; atomic project acceptance deployed:** Client offer review/acceptance, project completion and pending participant review passed in Chrome. Competing acceptance has one winner, stale terms get 409, retry is idempotent. Accepted terms and lifecycle transitions are guarded. Broader moderation/edit/cancellation/reassignment/product decisions remain. BE fcd40ad; FE 48b7998.

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

Status: Verified reviewed session lifecycle.

Real Cognito refresh, authenticated reload, expired/invalid refresh, expiry cleanup, logout, two-tab isolation and contractor profile navigation passed. Late responses cannot resurrect a prior session. Confirmation/login recovery has dedicated regression coverage. Global device revocation and continuous renewal were not introduced. See the November 17 session/signup release; authoritative API authorization remains R02.

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

Cognito registration supplies names/role; SQL provisioning follows verified login, runs in a locked transaction and retries idempotently. Real SRP fixtures verify both profile roles and long-email compatibility. Both public client signup (prior release) and contractor real-email confirmation are accepted. Interruption/resend, duplicate submission and confirmation-followed-by-failed-login recovery are covered by the new FE tests. The historical identity inventory is clear; future conflicts require the documented support runbook rather than automatic account merging. Broader password-reset/recovery and abuse/load coverage remain separate acceptance work.
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
