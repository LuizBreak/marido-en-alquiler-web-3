# Session handoff

Updated November 16, 2026 (America/New_York). Read this, repair-log.md and the latest release record; inspect both working trees before edits.

## Current outcome

The user confirmed all AWS resources/data are development and authorized repairs, separate local commits and deployment. The credentials/runtime/photos batch and the subsequent registration/project workflow batch are deployed. Read the latest [journey release, evidence and rollback](releases/2026-11-16-journey.md), [hardening release](releases/2026-11-16-hardening.md) and [credential record](releases/2026-11-16-credentials.md).

- FE branch master: signup logging a884f2e; session bootstrap cfe6f4f/9dce372; tile image/actor fix 5648bfa; offer acceptance/completion 48b7998; form feedback 0016b31; chat availability 2d809e7; contractor navigation ae9a87e; single chat persistence/honest feedback c68ba4e; corrected client offers visibility cb7ef48.
- BE sibling ../marido-en-alquiler-backend, branch main: atomic quote/project/review lifecycle fcd40ad; race acceptance checks 2285290; own-project scope 89c6b49; live isolation checks aeebd7d. Prior runtime/credential/image fixes remain in place.
- No Git push. Preserve original user changes in FE 65174fc and BE 3a4ccc4. Keep fixes separate and do not rewrite history.
- Preserve pre-existing untracked dist-build-check/ and dist-build-check-2/. Keep ignored .deployments/ private: historical snapshots/browser profiles may contain secrets.

## Browser acceptance and remaining integrations

Real Gmail registration-code delivery, valid confirmation/automatic login, invalid-code feedback, refreshed authenticated pages, profile text/photo save/display, project creation/search, contractor bid, client acceptance, project completion and pending review passed. Contractor fixture accounts were administrator-created with email suppressed. Client and contractor production-build account navigation/project scope are checked with isolated browser sessions. Reviews stay pending moderation.

Quote acceptance uses the existing PUT /quotes/{id} with clientConfirmation=true and expectedVersion from the quote read. The server locks project before quote and commits price/acceptance/assignment together. A second winner or stale terms gets 409; retrying the winner is idempotent. Completion and participant/duplicate review guards are enforced. GET /projects?mine=true derives client ownership or contractor assignment from the verified identity. No schema migration or AWS route expansion.

Saved chat messages render once and persist across recipient reload; failures are explicit and no timer fabricates read receipts. Two confirmed remaining integrations: the configured conch-app.com notification mailer fails DNS resolution (Cognito registration email is separate and works); WebSocket connections/presence open but immediate private delivery failed the browser check. Do not mark either notification delivery or realtime chat complete. Investigate the separately hosted services/protocol/identity checks next.

## Deployed configuration and contracts

- AWS account 907823072924, region us-east-1, CLI profile default; authenticated user luiz.break.
- Website/S3 www.marido-en-alquiler.com; CloudFront EI5JEIS37I445. API https://0011dt1689.execute-api.us-east-1.amazonaws.com/dev/marido-backend; stack marido-backend-dev.
- 76 functions run Node 24 with the same final backend-v2 artifact; stack UPDATE_COMPLETE. Latest change sets journey-20261116 and journey-owned-projects-20261116 are code-only. FE invalidation I5Z7VQP71A05C5CH4TPQZERJ3B completed; both public hostnames serve the exact released index. Latest private evidence: .deployments/journey-20261116/.
- RDS marido-en-alquile-prod is development despite its historical name; MySQL 8.4.10, existing database retained. No application schema migration was made. Automated backups were inventoried; a restore was not exercised.
- App DB principal marido_app_dev: SELECT/INSERT/UPDATE/DELETE only; secret marido/dev/application-database; TLS verifies the bundled RDS CA; pool limit two per execution environment. The Lambda role can read only this DB secret. A direct temporary Lambda probe verified application access and administrator-secret denial, then was removed.
- Historical upload IAM key for marido-image-bucket-user is Inactive. CLI credentials were unchanged. Administrator password was rotated in marido/dev/database; old password rejected. Ignored local cleanup/admin config was refreshed. Automatic recurring rotation is not configured.
- Cognito pool us-east-1_aClJIY05r, client 1s48008e1au3e62plvvmr6h1cn. Private endpoints verify ID-token signature/issuer/client/expiry/token use and verified email, bind subject/account identity, and enforce ownership/participants. Admin privileges require the admins group.
- API v2: Cognito registration supplies names/role; SQL account/profile provisioning follows verified login in an advisory-locked transaction. Login attaches token before /authenticate. Responses expose decoded data and serialized body compatibility. Existing accounts retain their identity/profile behavior.
- Authenticated POST /uploads: exact random owner key, 120-second signed POST, JPEG/PNG, 8 MB bound enforced by S3. Persisted changed references also pass owner/size/type/header checks. Client/contractor avatar updates synchronize account/profile transactionally. Project photos work. Public image policy was retained; private documents are outside this flow.
- Payment/milestone writes and coordinated account deletion remain unavailable (501). Provider/payment model is undecided; old PAN/CVC data was not inspected/purged. Lists default 100/max 200; full pagination remains future work.

## Validation and local commands

68 BE tests, TypeScript, 41 FE tests, lint across 65 changed source files, production build and known-secret scans passed. Real development API/Cognito/MySQL/S3 tests verify both roles, concurrency/stale terms/idempotency, lifecycle/participant checks, own-work isolation and prior identity/profile/image/message contracts. Core browser acceptance is described above; remaining services are explicitly unaccepted. Disposable fixtures and uploads are removed after verification; receipt in the release directory.

Backend production audit findings went 36 to 8; no reported vulnerable dependency path is included in the allowlisted Lambda artifact. Unused prototype/development and FE dependency findings remain open. Framework/plugin versions were preserved. Browser AWS SDK removal reduced the raw initial entry point from roughly 6.64 MiB to 3.10 MiB; large images/bundle warnings remain.

Run FE against AWS with `npm.cmd run serve:aws` at http://127.0.0.1:8080. This overrides older ignored env values with API v2. Check port 8080 before starting a duplicate process. No process is guaranteed to survive closing the app/session.

```powershell
# FE
node --test tests/*.test.cjs
node scripts/lint-changed.cjs 65174fc

# BE
node node_modules/typescript/bin/tsc --noEmit --incremental false
node node_modules/jest/bin/jest.js --runInBand
node scripts/verify-development.cjs '<absolute FE path>/.deployments/journey-20261116' --development-fixtures --remote
```

The last command deliberately creates/removes test users, records and S3 objects; requires AWS access, companion FE dependencies and the refreshed ignored admin cleanup config. Never repeat/bypass the earlier rejected diagnostic PUT to an existing account. Restricted-shell checks hide AWS credentials; use the permitted elevated context before asking the user to sign in. Never print secrets.

## Rollback and next pickup

Current evidence/rollback: .deployments/journey-20261116/. The previous template/artifact restore the accepted hardening release with Node 24, compatible MySQL libraries and restricted credentials. Restore frontend-previous/index.html and invalidate CloudFront after a reviewed backend rollback. No schema migration was made; existing workflow rows are not automatically undone. No actual rollback was executed. Never reactivate exposed keys or restore old passwords/drivers.

Next priorities, in order:

1. Restore the notification mailer using an owned service/domain; verify delivery only to a user-authorized inbox. luiz.break@gmail.com was authorized for registration/notification tests; use a fresh temporary plus alias and keep the existing account untouched.
2. Repair and verify WebSocket private delivery and its identity/participant checks. Persistence/reload works; connection/presence alone does not establish correct delivery or security.
3. Finish business-state/admin denial coverage and moderation, coordinated account deletion, pagination and orphan-photo cleanup. Cancellation/reassignment and the payment model/provider need product decisions; unsafe payment/milestone writes stay disabled.
4. CI, monitoring, restore drills, recurring credential rotation, infrastructure consolidation and legacy/prototype/build-tool dependencies. The stack remains 486/500 resources.

Asana remains deferred: the 21-ticket Markdown/CSV ledger is updated and no remote tickets were created. Continue authorized work without generic permission questions; maintain per-fix commits, this handoff and repair-log.md. Run local FE against AWS with npm.cmd run serve:aws; check port 8080 before starting another process. The local dev server may not survive closing this session.
