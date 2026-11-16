# Asana ticket ledger

Updated November 16, 2026. Target: [Marido en Alquiler](https://app.asana.com/1/1200400511518349/project/1201474712395202/board/1205115801994358).

No remote Asana tickets were created. Import-ready records are in [asana-tickets.csv](asana-tickets.csv); avoid duplicate imports. The original assessment is historical. The user confirmed all AWS resources/data are development. See [the backend release](releases/2026-11-16-backend.md) for final status, checks, artifacts and rollback. Deployed/verified refers to the tested API journeys, not exhaustive acceptance of every screen. Partial tickets retain explicit work.

| Ticket | Priority | Current status | Title |
| --- | --- | --- | --- |
| [R01](#r01) | P0 | Partial | Credentials committed in application source/configuration |
| [R02](#r02) | P0 | Partial; deployed and verified | API authentication and resource ownership are not enforced in reviewed code |
| [R03](#r03) | P0 | Partial; unsafe flow disabled | Raw card and security-code persistence path |
| [R04](#r04) | P0 | Verified development guard | Local/offline backend can connect to production |
| [R05](#r05) | P0 | Partial; sensitive paths repaired | Passwords, tokens and private payloads can reach storage/logging/responses |
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
| [R16](#r16) | P1 | Partial | Image upload integrity and private ownership are undefined |
| [R17](#r17) | P2 | Partial; release path documented | Multiple backend execution/configuration paths obscure the source of truth |
| [R18](#r18) | P2 | Partial; integration baseline added | Dependency and verification baseline is weak |
| [R19](#r19) | P2 | Open | Initial browser payload is large |
| [R20](#r20) | P2 | Partial; AWS dev release verified | Deployment, external services and operational ownership are incomplete |
| [R21](#r21) | P2 | Partial | Product completion and component cleanup need explicit scope |

## R01

**[R01] — Credentials committed in application source/configuration**

Status: Partial.

Revoke/rotate exposed AWS/database credentials, review access history and coordinate history cleanup. Configure an authenticated Cognito identity pool, scoped S3 role and VUE_APP_IMAGE_BUCKET; uploads now fail closed without them. Existing ignored local files/history may still contain secrets.

Dependencies: . Original evidence/recommendations remain in the CSV and [review report](review-report.md).


## R02

**[R02] — API authentication and resource ownership are not enforced in reviewed code**

Status: Partial; deployed and verified.

Commits: BE 39106f9; FE e0474ba.

JWT/verified-email/subject checks and resource ownership are deployed. Public contractor/account/payment projections filter sensitive fields. Disposable AWS client/contractor fixtures verify denied private and cross-account calls. Remaining: exhaustive admin/resource denial matrix, account lifecycle and moderation/business-state rules.

Dependencies: R01, R04. Original evidence/recommendations remain in the CSV and [review report](review-report.md).


## R03

**[R03] — Raw card and security-code persistence path**

Status: Partial; unsafe flow disabled.

Commits: BE 39106f9; FE f9f284b.

Raw-card UI collection is removed. API payment/milestone writes return 501 and payment reads contain only last4/expiry. Remaining: choose provider/payment model, implement provider references and decide cleanup of any legacy stored PAN/CVC; existing rows were not inspected or purged.

Dependencies: R02. Original evidence/recommendations remain in the CSV and [review report](review-report.md).


## R04

**[R04] — Local/offline backend can connect to production**

Status: Verified development guard.

Commits: BE 850cb3f, de696e1.

Local remote-DB guard is covered by unit tests. AWS resources were inventoried and the user confirmed the entire system is development. Explicit disposable fixture tests use that development database. Retain safe defaults and separate configuration if a real production environment is introduced.

Dependencies: . Original evidence/recommendations remain in the CSV and [review report](review-report.md).


## R05

**[R05] — Passwords, tokens and private payloads can reach storage/logging/responses**

Status: Partial; sensitive paths repaired.

Commits: BE 39106f9, de696e1; FE e0474ba, f9f284b.

Deployed account/private response filtering, owner-scoped endpoints, credential-free packaging, verified-login empty legacy password placeholder, random activity IDs and redacted Lambda errors. Remaining: credential rotation and review/cleanup of historical stored values, logs and artifacts; existing sensitive rows were not broadly inspected.

Dependencies: R01, R02. Original evidence/recommendations remain in the CSV and [review report](review-report.md).


## R06

**[R06] — Session lifetime, restoration and navigation checks disagree**

Status: Code implemented; integration verification pending.

Validate Cognito refresh/reload/expiry/logout and role-specific navigation against an isolated environment; authoritative API authorization is R02.

Dependencies: R02, R07. Original evidence/recommendations remain in the CSV and [review report](review-report.md).


## R07

**[R07] — Response helper changes data shape and discards results**

Status: Deployed; API verified.

Commits: BE d960407, 39106f9; FE 7fc74b0.

Canonical data plus serialized compatibility body is deployed and checked through actual AWS account/profile/project/quote/favorite/message workflows. Continue consumer-specific browser acceptance as features are completed.

Dependencies: . Original evidence/recommendations remain in the CSV and [review report](review-report.md).


## R08

**[R08] — Missing promise propagation produces premature success and lost errors**

Status: Partial.

CRUD promises, profiles/projects/bids/inquiries and uploads now wait for persistence; generated IDs are retained. The later missing-form-ID client save was corrected to update the signed-in account; the user confirmed save success. Audit legacy booking/contact flows, complete server-side durable notifications and run broader browser failure/retry scenarios.

Dependencies: R07, R10. Original evidence/recommendations remain in the CSV and [review report](review-report.md).


## R09

**[R09] — Signup and generated-ID handling are not reliable**

Status: Partial; provisioning deployed.

Commits: BE 39106f9, 4dd8f90; FE e0474ba.

Cognito registration supplies names/role; SQL provisioning follows verified login, runs in a locked transaction and retries idempotently. Real SRP fixtures verify both profile roles and long-email compatibility. Remaining: user-driven signup/email confirmation, interruption/concurrency edge cases and duplicate historical email reconciliation.

Dependencies: R02, R04, R07, R12. Original evidence/recommendations remain in the CSV and [review report](review-report.md).


## R10

**[R10] — Primary keys, route parameters and SQL names disagree**

Status: Deployed; principal routes verified.

Commits: BE f6f7e4b, 39106f9, 40f9782.

Correct keys/routes are deployed; real fixture creation/update/delete and composite favorite paths are checked. Payment/milestone writes and coordinated account deletion intentionally return 501 pending completion.

Dependencies: . Original evidence/recommendations remain in the CSV and [review report](review-report.md).


## R11

**[R11] — FE invokes undeclared routes/actions**

Status: Partial; API routes deployed.

Commits: BE 40f9782.

Quote client/project and composite favorite routes are now present in AWS and source configuration. Remaining: audit legacy root action bindings and unused/screens-only consumers rather than marking every historical action path complete.

Dependencies: R02, R07, R10. Original evidence/recommendations remain in the CSV and [review report](review-report.md).


## R12

**[R12] — SQL, TypeScript interfaces and payloads have drifted**

Status: Partial; live schema reconciled.

Commits: BE 8a40dff, 4ef1331, 4dd8f90.

Schema-only inventory covered actual MySQL columns/constraints. Required defaults/casing and username limits are repaired and real disposable inserts are verified without schema migration. Remaining: ordered migrations, interface/model alignment and stronger field/business validation.

Dependencies: R04. Original evidence/recommendations remain in the CSV and [review report](review-report.md).


## R13

**[R13] — FE state updates include concrete collection bugs**

Status: Code implemented; integration verification pending.

Identity-based collection updates and favorite owner queries are fixed. Verify profile/favorite/project refreshes and role changes in the browser.

Dependencies: R07, R10. Original evidence/recommendations remain in the CSV and [review report](review-report.md).


## R14

**[R14] — SQL input handling and Lambda error paths need consolidation**

Status: Partial; boundary deployed.

Commits: BE b2b03cb, 39106f9.

JWT/ownership boundary, allowlisted writes, identifier checks, parameterized SQL and safe CORS errors are deployed and checked. Remaining: fuller length/type/state validation, endpoint-specific rate limits, contact spam controls and resource-wide denial testing.

Dependencies: R04, R07. Original evidence/recommendations remain in the CSV and [review report](review-report.md).


## R15

**[R15] — Chat read state and connection lifecycle are inconsistent**

Status: Partial; API read state verified.

Commits: BE 39106f9; FE 33423f5.

Message sender/participant ownership, newest-100 chronological conversation, unread counts and recipient read flags are deployed. Real fixtures cover unread to read transition. Remaining: end-to-end WebSocket delivery/reconnect, stale-session behavior and browser chat acceptance.

Dependencies: R02, R07, R14. Original evidence/recommendations remain in the CSV and [review report](review-report.md).


## R16

**[R16] — Image upload integrity and private ownership are undefined**

Status: Partial.

Uploads use temporary identity credentials and saves await completion. Configure scoped roles, use unique account-scoped keys, validate files and establish delete/orphan policies; original filenames are still used.

Dependencies: R01, R02, R08. Original evidence/recommendations remain in the CSV and [review report](review-report.md).


## R17

**[R17] — Multiple backend execution/configuration paths obscure the source of truth**

Status: Partial; release path documented.

Commits: BE 40f9782, 67fb927.

A reproducible allowlisted build/native CloudFormation release path is documented and alternative client ORM route delegates to secured handlers. Remaining: retire unused Express/Sequelize/prototype execution paths and unify schema/migrations/local serving.

Dependencies: R04. Original evidence/recommendations remain in the CSV and [review report](review-report.md).


## R18

**[R18] — Dependency and verification baseline is weak**

Status: Partial; integration baseline added.

Commits: BE 4832219, 67fb927; FE fb84127.

45 BE unit tests, TypeScript, 25 FE tests, lint/build, credential scans and actual development Cognito/MySQL/API fixture checks passed. Existing Node 18/framework and dependency audit findings remain; broad toolchain upgrade was rejected by automatic review and was deferred. Plan targeted supported-runtime/dependency upgrades separately.

Dependencies: R04. Original evidence/recommendations remain in the CSV and [review report](review-report.md).


## R19

**[R19] — Initial browser payload is large**

Status: Open.

Reduce the large initial bundle and images, lazy-load screens and measure mobile performance. Final build still reports size warnings.

Dependencies: R18. Original evidence/recommendations remain in the CSV and [review report](review-report.md).


## R20

**[R20] — Deployment, external services and operational ownership are incomplete**

Status: Partial; AWS dev release verified.

Commits: BE de696e1, 40f9782, fde6af4; FE e0474ba, f9f284b.

AWS identity/stack/schema, existing code/config snapshots, RDS backup settings, secret-backed TLS and reviewed deployment were established. Paired release uses API v2. Remaining: actual restore exercise, alarms/CI/environment promotion, photo storage, external email/WebSocket integrations and runtime/version strategy.

Dependencies: R01, R02, R04, R17. Original evidence/recommendations remain in the CSV and [review report](review-report.md).


## R21

**[R21] — Product completion and component cleanup need explicit scope**

Status: Partial.

Dialog registration is fixed. Modal scrolling and profile-save fixes were deployed and the user previously confirmed them. The paired backend/FE development release now also passed API acceptance; exhaustive browser/product acceptance remains. Decide launch scope, complete/hide placeholders and legacy test routes, fix remaining helper validation/booking behavior, and perform accessibility/responsive/copy checks.

Dependencies: R02, R03, R08. Original evidence/recommendations remain in the CSV and [review report](review-report.md).
