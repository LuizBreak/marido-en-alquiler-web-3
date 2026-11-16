# Session handoff

Updated November 16, 2026 (America/New_York). Read this, repair-log.md and the latest release record; inspect both working trees before edits.

## Current outcome

Latest release: [backend CRUD consistency](releases/2026-11-16-crud-consistency.md). `/clientes` directly uses the shared mysql2 client controller, with unchanged admin-only access/URLs. The unused Sequelize/Express prototype/direct dependencies are removed. Verification credentials now come from the existing development administrator secret after an AWS-account check, not the old Sequelize config. BE cbb9e2f/b185c57/1cf5d6c. 104 BE tests, TypeScript, packaged-secret/artifact checks, all 77 deployed hashes/handlers and full remote regression/fixture cleanup passed. Frontend application code is unchanged.

The [application notification email](releases/2026-11-16-notifications.md) behavior remains deployed. SES sends fixed backend notices after quotes, non-chat messages and support requests are saved. The user confirmed both live Gmail test emails arrived. Zoho inbox setup is confirmed; its DNS records remain unchanged. FE 0cacc41/5cfacc6; BE c719d44/675945e/babb752/7017d2a/2081242. Read that release for delivery limits and opt-outs; use the newer consistency release for current artifacts/recovery.

The user confirmed all AWS resources/data are development and authorized repairs, separate local commits and deployment. The credentials/runtime/photos, project workflow and authenticated live-chat batches are deployed. Read the latest [chat release, evidence and secure recovery](releases/2026-11-16-chat.md), [journey release, evidence and rollback](releases/2026-11-16-journey.md), [hardening release](releases/2026-11-16-hardening.md) and [credential record](releases/2026-11-16-credentials.md).

- FE branch master: signup logging a884f2e; session bootstrap cfe6f4f/9dce372; tile image/actor fix 5648bfa; offer acceptance/completion 48b7998; form feedback 0016b31; chat availability 2d809e7; contractor navigation ae9a87e; single chat persistence/honest feedback c68ba4e; corrected client offers visibility cb7ef48.
- BE sibling ../marido-en-alquiler-backend, branch main: atomic quote/project/review lifecycle fcd40ad; race acceptance checks 2285290; own-project scope 89c6b49; live isolation checks aeebd7d. Prior runtime/credential/image fixes remain in place.
- Latest chat code: FE 0269a39 (verified socket handshake), 418ec72 (message merging/reconnect/account isolation); BE 89059f2 (runtime clients), ea02ead (authenticated sessions/server publishing), fde4f51 (managed isolated chat stack), a8b9d54 (server message time); FE ebe023e (legacy timestamp rendering).
- No Git push. Preserve original user changes in FE 65174fc and BE 3a4ccc4. Keep fixes separate and do not rewrite history.
- Preserve pre-existing untracked dist-build-check/ and dist-build-check-2/. Keep ignored .deployments/ private: historical snapshots/browser profiles may contain secrets.

## Browser acceptance and remaining integrations

Real Gmail registration-code delivery, valid confirmation/automatic login, invalid-code feedback, refreshed authenticated pages, profile text/photo save/display, project creation/search, contractor bid, client acceptance, project completion and pending review passed. Contractor fixture accounts were administrator-created with email suppressed. Client and contractor production-build account navigation/project scope are checked with isolated browser sessions. Reviews stay pending moderation.

Quote acceptance uses the existing PUT /quotes/{id} with clientConfirmation=true and expectedVersion from the quote read. The server locks project before quote and commits price/acceptance/assignment together. A second winner or stale terms gets 409; retrying the winner is idempotent. Completion and participant/duplicate review guards are enforced. GET /projects?mine=true derives client ownership or contractor assignment from the verified identity. No schema migration or AWS route expansion.

Live chat is now deployed and accepted locally and on the published site: immediate delivery, two recipient tabs, no duplicates, reload persistence and forced-disconnect catch-up. Cognito identity is verified at the WebSocket handshake; durable DynamoDB sessions expire with the JWT. REST publishes only saved message rows to their participants. Missing/invalid credentials, outsider history/message access, impersonation, arbitrary socket publishing and expired sessions are denied. Presence is scoped to contacts. Direct contact between registered accounts retains existing product behavior; no project prerequisite was added.

The old anonymous handler is disabled (reserved concurrency 0) and unrouted. Token headers are not logged; tokens never enter URLs or DynamoDB connection records. Push is best effort after SQL persistence, with history catch-up; do not claim exactly-once or transactional-outbox delivery. Attachments/read-receipt UX and list limits remain broader work.

The conch-app.com mailer has been replaced by backend-owned SES delivery. Cognito registration email remains independent. Zoho hosts the inboxes; unused ZeptoMail warnings do not block SES. Contacts are stored and sent to hello; newsletter requests do not automatically enroll subscribers in a mailing list.

## Deployed configuration and contracts

- AWS account 907823072924, region us-east-1, CLI profile default; authenticated user luiz.break.
- Website/S3 www.marido-en-alquiler.com; CloudFront EI5JEIS37I445. API https://0011dt1689.execute-api.us-east-1.amazonaws.com/dev/marido-backend; stack marido-backend-dev.
- REST retains 76 Node 24 functions and 486 resources. Chat and mail each retain six resources. All 77 active functions match repairs/consistency-20261116/backend.zip, SHA-256 868e168913107151b4dabbf23d43846bc12dc8e784d12c5a0084924338b4ff28. Both consistency-20261116 change sets completed, with roles/environment/mail configuration preserved and the compatibility handler direct. Current backend evidence: .deployments/consistency-20261116/. Frontend remains the published notification release, with prior asset/index/CDN evidence in .deployments/notifications-20261116/.
- WebSocket API 0ord21fqk7 keeps its historical production stage/URL (all data remains development); all eight integrations target marido-chat-dev-handler, deployment 2az9g7. Table marido-chat-dev-connections stores metadata only, with TTL and expiry filtering; API tracing off, throttle 20/second and burst 40. Legacy marido-chat-api-handler remains disabled.
- RDS marido-en-alquile-prod is development despite its historical name; MySQL 8.4.10, existing database retained. No application schema migration was made. Automated backups were inventoried; a restore was not exercised.
- App DB principal marido_app_dev: SELECT/INSERT/UPDATE/DELETE only; secret marido/dev/application-database; TLS verifies the bundled RDS CA; pool limit two per execution environment. The Lambda role can read only this DB secret. A direct temporary Lambda probe verified application access and administrator-secret denial, then was removed.
- Historical upload IAM key for marido-image-bucket-user is Inactive. CLI credentials were unchanged. Administrator password was rotated in marido/dev/database; old password rejected. Ignored local cleanup/admin config was refreshed. Automatic recurring rotation is not configured.
- Cognito pool us-east-1_aClJIY05r, client 1s48008e1au3e62plvvmr6h1cn. Private endpoints verify ID-token signature/issuer/client/expiry/token use and verified email, bind subject/account identity, and enforce ownership/participants. Admin privileges require the admins group.
- API v2: Cognito registration supplies names/role; SQL account/profile provisioning follows verified login in an advisory-locked transaction. Login attaches token before /authenticate. Responses expose decoded data and serialized body compatibility. Existing accounts retain their identity/profile behavior.
- Authenticated POST /uploads: exact random owner key, 120-second signed POST, JPEG/PNG, 8 MB bound enforced by S3. Persisted changed references also pass owner/size/type/header checks. Client/contractor avatar updates synchronize account/profile transactionally. Project photos work. Public image policy was retained; private documents are outside this flow.
- Payment/milestone writes and coordinated account deletion remain unavailable (501). Provider/payment model is undecided; old PAN/CVC data was not inspected/purged. Lists default 100/max 200; full pagination remains future work.

## Validation and local commands

104 BE tests, TypeScript, packaged-secret/artifact-diff checks and live AWS regression passed for the consistency release. Both list URLs retain 401/403 restrictions, and shared-handler admin success/limits are tested. FE application code did not change; its prior 49 tests, 76-file lint, production build and public asset/index checks remain the baseline. Prior mail acceptance verified stored recipients, deduplication, opt-outs and fixed support delivery, with user-confirmed Gmail receipt. Temporary SQL/Cognito/S3 fixtures were cleaned. Hashed shared rate counters expire normally via TTL.

Backend production audit findings went 36 to 8; no reported vulnerable dependency path is included in the allowlisted Lambda artifact. Unused prototype/development and FE dependency findings remain open. Framework/plugin versions were preserved. Browser AWS SDK removal reduced the raw initial entry point from roughly 6.64 MiB to 3.10 MiB; large images/bundle warnings remain.

Run FE against AWS with `npm.cmd run serve:aws` at http://127.0.0.1:8080. This overrides older ignored env values with API v2. Check port 8080 before starting a duplicate process. No process is guaranteed to survive closing the app/session.

```powershell
# FE
node --test tests/*.test.cjs
node scripts/lint-changed.cjs 65174fc

# BE
node node_modules/typescript/bin/tsc --noEmit --incremental false
node node_modules/jest/bin/jest.js --runInBand
node scripts/verify-development.cjs '<absolute FE path>/.deployments/consistency-20261116' --development-fixtures --remote
```

The last command deliberately creates/removes test users, records and S3 objects; requires AWS access, companion FE dependencies and the refreshed ignored admin cleanup config. Never repeat/bypass the earlier rejected diagnostic PUT to an existing account. Restricted-shell checks hide AWS credentials; use the permitted elevated context before asking the user to sign in. Never print secrets.

## Rollback and next pickup

Current backend evidence: .deployments/consistency-20261116/. Use rollback-rest-template.json and the captured previous chat template to restore the prior artifact while retaining the direct client handler (present in both artifacts), current roles and credentials. No frontend rollback is needed for this backend-only release. Keep authenticated chat and the disabled anonymous handler; remove imports before deleting chat/mail stacks. Keep working SES/Zoho DNS. Recovery was captured, not executed. No MySQL migration or Git push.

Next priorities:

1. Finish moderation/business-state denial coverage. Notification delivery is deployed and user-confirmed; DMARC, durable retries and alarm destinations remain separate improvements.
2. Implement coordinated account deletion, pagination and orphan-photo cleanup. Cancellation/reassignment and the payment model/provider need product decisions. Unsafe payment/milestone writes stay disabled.
3. Chat attachment/read-receipt UX, durable-outbox/retry guarantees if required, monitoring/alerts, CI, restore drills, recurring credential rotation and legacy toolchain cleanup. Live delivery/identity/participant acceptance is complete for this release.

Asana remains deferred: the same 21-ticket Markdown/CSV ledger is updated, and no remote tickets were created. Continue authorized work with separate commits and current handoff/log. Run the local FE against AWS with npm.cmd run serve:aws; check port 8080 before starting another process. The current dev server may not survive closing the session. Temporary browser/API fixtures, DynamoDB connection records, uploads and local credential/profile files were cleaned up; cleanup receipts are in the release directory.

Business-model research: [HomeStars / Dominican Republic Word brief](research/HomeStars-vs-Marido-en-Alquiler-Dominican-Republic-2026-11-16.docx), with editable Markdown and source notes alongside it. Current HomeStars lead-fee mechanics are distinguished from proposed RD$ experiments and the project's undecided monetization. Lead-first billing, contact gating, subscription credits and pilot targets are recommendations only; the user has not approved them as implementation requirements. This research changed no application code, pricing or deployment.
