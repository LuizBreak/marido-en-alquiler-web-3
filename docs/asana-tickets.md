# Asana ticket ledger

Updated November 16, 2026. Target project: [Marido en Alquiler](https://app.asana.com/1/1200400511518349/project/1201474712395202/board/1205115801994358).

Asana creation is deferred at your request. **No tickets have been created remotely.** Import-ready records are in [asana-tickets.csv](asana-tickets.csv); each Notes field includes the original evidence/recommendation, current status, remaining work, dependencies and commit references. No owners or deadlines were invented. Map the CSV columns to your project's fields when importing; do not import it twice without checking for matching R IDs.

The original review is a historical snapshot. This ledger and [the repair log](repair-log.md) describe subsequent changes. ?Code implemented; integration verification pending? means isolated checks passed, not a deployed or browser-accepted fix. ?Partial? means explicit work remains. All R tickets should remain uncompleted until their remaining acceptance work is satisfied. Dependencies describe prerequisites for closing the broader ticket; they do not prevent isolated code repairs.

| Ticket | Priority | Current status | Title |
| --- | --- | --- | --- |
| [R01](#r01) | P0 | Partial | — Credentials committed in application source/configuration |
| [R02](#r02) | P0 | Open | — API authentication and resource ownership are not enforced in reviewed code |
| [R03](#r03) | P0 | Open | — Raw card and security-code persistence path |
| [R04](#r04) | P0 | Code implemented; integration verification pending | — Local/offline backend can connect to production |
| [R05](#r05) | P0 | Partial | — Passwords, tokens and private payloads can reach storage/logging/responses |
| [R06](#r06) | P1 | Code implemented; integration verification pending | — Session lifetime, restoration and navigation checks disagree |
| [R07](#r07) | P1 | Code implemented; integration verification pending | — Response helper changes data shape and discards results |
| [R08](#r08) | P1 | Partial | — Missing promise propagation produces premature success and lost errors |
| [R09](#r09) | P1 | Partial | — Signup and generated-ID handling are not reliable |
| [R10](#r10) | P1 | Code implemented; integration verification pending | — Primary keys, route parameters and SQL names disagree |
| [R11](#r11) | P1 | Open | — FE invokes undeclared routes/actions |
| [R12](#r12) | P1 | Partial | — SQL, TypeScript interfaces and payloads have drifted |
| [R13](#r13) | P1 | Code implemented; integration verification pending | — FE state updates include concrete collection bugs |
| [R14](#r14) | P1 | Partial | — SQL input handling and Lambda error paths need consolidation |
| [R15](#r15) | P1 | Partial | — Chat read state and connection lifecycle are inconsistent |
| [R16](#r16) | P1 | Partial | — Image upload integrity and private ownership are undefined |
| [R17](#r17) | P2 | Open | — Multiple backend execution/configuration paths obscure the source of truth |
| [R18](#r18) | P2 | Partial | — Dependency and verification baseline is weak |
| [R19](#r19) | P2 | Open | — Initial browser payload is large |
| [R20](#r20) | P2 | Partial | — Deployment, external services and operational ownership are incomplete |
| [R21](#r21) | P2 | Partial | — Product completion and component cleanup need explicit scope |

## R01

**— Credentials committed in application source/configuration** ? P0; Partial.

**Implementation commits:** FE 69b1b07, 22ba93b, c2facd0; BE 12c420c, 850cb3f.

**Remaining acceptance work:** Revoke/rotate exposed AWS/database credentials, review access history and coordinate history cleanup. Configure an authenticated Cognito identity pool, scoped S3 role and VUE_APP_IMAGE_BUCKET; uploads now fail closed without them. Existing ignored local files/history may still contain secrets.

**Dependencies for closure:** None.

Full original evidence and recommendation: [review report](review-report.md#r01---credentials-committed-in-application-sourceconfiguration).

## R02

**— API authentication and resource ownership are not enforced in reviewed code** ? P0; Open.

**Implementation commits:** None.

**Remaining acceptance work:** Implement verified Cognito subject mapping, API JWT validation, role/ownership enforcement and public/private DTO separation. No production gateway was inspected.

**Dependencies for closure:** R01, R04.

Full original evidence and recommendation: [review report](review-report.md#r02---api-authentication-and-resource-ownership-are-not-enforced-in-reviewed-code).

## R03

**— Raw card and security-code persistence path** ? P0; Open.

**Implementation commits:** None.

**Remaining acceptance work:** Disable raw card/CVC collection and persistence before real use; select a tokenized provider flow and plan existing-data cleanup. No payment provider or production data changed.

**Dependencies for closure:** R02.

Full original evidence and recommendation: [review report](review-report.md#r03---raw-card-and-security-code-persistence-path).

## R04

**— Local/offline backend can connect to production** ? P0; Code implemented; integration verification pending.

**Implementation commits:** BE 850cb3f.

**Remaining acceptance work:** Configure an isolated local database, reconcile migrations and exercise offline handlers. Local remote hosts are rejected unless ALLOW_REMOTE_DB=true; production requires explicit environment values.

**Dependencies for closure:** None.

Full original evidence and recommendation: [review report](review-report.md#r04---localoffline-backend-can-connect-to-production).

## R05

**— Passwords, tokens and private payloads can reach storage/logging/responses** ? P0; Partial.

**Implementation commits:** BE 12c420c, d960407, 43bdb7a, b2b03cb; FE 9428969, 22ba93b.

**Remaining acceptance work:** Public ping and payload echoes are sanitized; new SQL signup passwords are blank. Activity-log JWT session IDs and environment dumps are now removed. Restrict sensitive account reads and clean existing stored passwords/tokens.

**Dependencies for closure:** R01, R02.

Full original evidence and recommendation: [review report](review-report.md#r05---passwords-tokens-and-private-payloads-can-reach-storageloggingresponses).

## R06

**— Session lifetime, restoration and navigation checks disagree** ? P1; Code implemented; integration verification pending.

**Implementation commits:** FE 11a17ea.

**Remaining acceptance work:** Validate Cognito refresh/reload/expiry/logout and role-specific navigation against an isolated environment; authoritative API authorization is R02.

**Dependencies for closure:** R02, R07.

Full original evidence and recommendation: [review report](review-report.md#r06---session-lifetime-restoration-and-navigation-checks-disagree).

## R07

**— Response helper changes data shape and discards results** ? P1; Code implemented; integration verification pending.

**Implementation commits:** BE d960407; FE 7fc74b0.

**Remaining acceptance work:** Exercise every active FE/BE path with zero/one/multiple records. The decoded data field is canonical; serialized body remains for compatibility. Missing items currently return null with HTTP 200; complete 404/error semantics remain a follow-up.

**Dependencies for closure:** None.

Full original evidence and recommendation: [review report](review-report.md#r07---response-helper-changes-data-shape-and-discards-results).

## R08

**— Missing promise propagation produces premature success and lost errors** ? P1; Partial.

**Implementation commits:** BE 16e846e; FE 9ba4971, 7d2a8df.

**Remaining acceptance work:** CRUD promises, profiles/projects/bids/inquiries and uploads now wait for persistence; generated IDs are retained. Audit legacy booking/contact flows, complete server-side durable notifications and run browser failure/retry scenarios.

**Dependencies for closure:** R07, R10.

Full original evidence and recommendation: [review report](review-report.md#r08---missing-promise-propagation-produces-premature-success-and-lost-errors).

## R09

**— Signup and generated-ID handling are not reliable** ? P1; Partial.

**Implementation commits:** BE 43bdb7a; FE 9428969.

**Remaining acceptance work:** Insert IDs and sequential awaited signup are fixed. Add atomic SQL account/profile provisioning, a unique verified Cognito-sub mapping, idempotent retries and partial-account recovery. Confirm live schema requirements in isolation.

**Dependencies for closure:** R02, R04, R07, R12.

Full original evidence and recommendation: [review report](review-report.md#r09---signup-and-generated-id-handling-are-not-reliable).

## R10

**— Primary keys, route parameters and SQL names disagree** ? P1; Code implemented; integration verification pending.

**Implementation commits:** BE f6f7e4b, 12aa5d3; FE 5ef6f89, 35e6736.

**Remaining acceptance work:** Verify actual database primary keys/table case and paired FE/BE deployment. Favorites now have an explicit composite deletion route.

**Dependencies for closure:** None.

Full original evidence and recommendation: [review report](review-report.md#r10---primary-keys-route-parameters-and-sql-names-disagree).

## R11

**— FE invokes undeclared routes/actions** ? P1; Open.

**Implementation commits:** None.

**Remaining acceptance work:** Reconcile undeclared quote/message filtered routes and missing getByProjectId actions; retire unused OAuth/interceptor paths after call-site checks.

**Dependencies for closure:** R02, R07, R10.

Full original evidence and recommendation: [review report](review-report.md#r11---fe-invokes-undeclared-routesactions).

## R12

**— SQL, TypeScript interfaces and payloads have drifted** ? P1; Partial.

**Implementation commits:** FE 9ba4971; BE b2b03cb.

**Remaining acceptance work:** Project creation uses null contractor and valid service JSON; write allowlists are based on snapshots. Reconcile actual schema, account/contact required fields, interfaces and ordered migrations.

**Dependencies for closure:** R04.

Full original evidence and recommendation: [review report](review-report.md#r12---sql-typescript-interfaces-and-payloads-have-drifted).

## R13

**— FE state updates include concrete collection bugs** ? P1; Code implemented; integration verification pending.

**Implementation commits:** FE 35e6736; BE 12aa5d3.

**Remaining acceptance work:** Identity-based collection updates and favorite owner queries are fixed. Verify profile/favorite/project refreshes and role changes in the browser.

**Dependencies for closure:** R07, R10.

Full original evidence and recommendation: [review report](review-report.md#r13---fe-state-updates-include-concrete-collection-bugs).

## R14

**— SQL input handling and Lambda error paths need consolidation** ? P1; Partial.

**Implementation commits:** BE 850cb3f, b2b03cb.

**Remaining acceptance work:** Primary Lambda handlers validate JSON/IDs, filter writable fields, bind chat values and control errors. Add complete required-field/type/business schemas, legacy Express/Sequelize parity if retained, and ownership enforcement (R02).

**Dependencies for closure:** R04, R07.

Full original evidence and recommendation: [review report](review-report.md#r14---sql-input-handling-and-lambda-error-paths-need-consolidation).

## R15

**— Chat read state and connection lifecycle are inconsistent** ? P1; Partial.

**Implementation commits:** FE 33423f5; BE b2b03cb.

**Remaining acceptance work:** Socket timers/listeners/reconnect and numeric unread comparisons are fixed. Verify external WebSocket authentication, ordered cursor history, duplicate/delivery semantics and reconnect behavior against its real service.

**Dependencies for closure:** R02, R07, R14.

Full original evidence and recommendation: [review report](review-report.md#r15---chat-read-state-and-connection-lifecycle-are-inconsistent).

## R16

**— Image upload integrity and private ownership are undefined** ? P1; Partial.

**Implementation commits:** FE 69b1b07, 9ba4971.

**Remaining acceptance work:** Uploads use temporary identity credentials and saves await completion. Configure scoped roles, use unique account-scoped keys, validate files and establish delete/orphan policies; original filenames are still used.

**Dependencies for closure:** R01, R02, R08.

Full original evidence and recommendation: [review report](review-report.md#r16---image-upload-integrity-and-private-ownership-are-undefined).

## R17

**— Multiple backend execution/configuration paths obscure the source of truth** ? P2; Open.

**Implementation commits:** None.

**Remaining acceptance work:** Choose the supported backend execution/deployment path, consolidate/archive prototypes and correct metadata.

**Dependencies for closure:** R04.

Full original evidence and recommendation: [review report](review-report.md#r17---multiple-backend-executionconfiguration-paths-obscure-the-source-of-truth).

## R18

**— Dependency and verification baseline is weak** ? P2; Partial.

**Implementation commits:** FE tests/*.test.cjs, be12098; BE tests/*.test.js.

**Remaining acceptance work:** Added 14 frontend and 30 backend isolated checks plus changed-source lint. Establish CI, supported runtime/package manager, dependency advisory inventory and safe incremental upgrades.

**Dependencies for closure:** R04.

Full original evidence and recommendation: [review report](review-report.md#r18---dependency-and-verification-baseline-is-weak).

## R19

**— Initial browser payload is large** ? P2; Open.

**Implementation commits:** None.

**Remaining acceptance work:** Reduce the large initial bundle and images, lazy-load screens and measure mobile performance. Final build still reports size warnings.

**Dependencies for closure:** R18.

Full original evidence and recommendation: [review report](review-report.md#r19---initial-browser-payload-is-large).

## R20

**— Deployment, external services and operational ownership are incomplete** ? P2; Partial.

**Implementation commits:** BE 850cb3f; FE be12098.

**Remaining acceptance work:** Local secrets excluded from backend packaging; reproducible lint added. Inventory services, hosting/deep links, environment promotion, backups, monitoring, deployment and rollback.

**Dependencies for closure:** R01, R02, R04, R17.

Full original evidence and recommendation: [review report](review-report.md#r20---deployment-external-services-and-operational-ownership-are-incomplete).

## R21

**— Product completion and component cleanup need explicit scope** ? P2; Partial.

**Implementation commits:** FE 33423f5.

**Remaining acceptance work:** Dialog registration is fixed. Decide launch scope, complete/hide placeholders and legacy test routes, fix remaining helper validation/booking behavior, and perform accessibility/responsive/copy checks.

**Dependencies for closure:** R02, R03, R08.

Full original evidence and recommendation: [review report](review-report.md#r21---product-completion-and-component-cleanup-need-explicit-scope).
