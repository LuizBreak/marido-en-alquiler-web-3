# Session handoff

Updated November 16, 2026 (America/New_York). Read this, repair-log.md and the latest release record; inspect both working trees before edits.

## Current outcome

The user confirmed **all AWS resources/data are development**, authorized fixes, per-fix commits and deployment, then accepted the next batch: credentials, supported runtime/dependencies and secure photos. **That batch is deployed and verified.** See [hardening release, evidence and rollback](releases/2026-11-16-hardening.md) and [credential record](releases/2026-11-16-credentials.md). The earlier [backend release](releases/2026-11-16-backend.md) is historical where it says Node 18, unavailable photos or unrotated credentials.

- FE: this repository, branch master; image grant/key/SDK-removal app commit a519b5e; prior auth e0474ba, payment disabling f9f284b; local AWS command fb84127.
- BE: ../marido-en-alquiler-backend, branch main; runtime libraries 059fe2d, secure images/atomic avatar bbd6f69, Node 24/deployment/app principal 0f92330, image regression checks 88a064b, integration harness 7cfdc34, compatible rollback checks 701a3e9.
- Commits are local; nothing pushed. Original user changes remain in FE 65174fc and BE 3a4ccc4. Keep fixes separate; do not rewrite history or push without a request.
- Preserve pre-existing untracked dist-build-check/, dist-build-check-2/ and ignored .deployments/. Historical snapshots may contain secrets and must remain outside Git.

## Deployed configuration and contracts

- AWS account 907823072924, region us-east-1, CLI profile default; authenticated user luiz.break.
- Website/S3 www.marido-en-alquiler.com; CloudFront EI5JEIS37I445. API https://0011dt1689.execute-api.us-east-1.amazonaws.com/dev/marido-backend; stack marido-backend-dev.
- 76 functions run Node 24 with the same artifact; stack UPDATE_COMPLETE. Change sets hardening-20261116 and hardening-final-role-20261116 completed. Invalidation IBQG3DK9KASOVNV19AI80HRI1J completed; both public hostnames serve the new index.
- RDS marido-en-alquile-prod is development despite its historical name; MySQL 8.4.10, existing database retained. No application schema migration was made. Automated backups were inventoried; a restore was not exercised.
- App DB principal marido_app_dev: SELECT/INSERT/UPDATE/DELETE only; secret marido/dev/application-database; TLS verifies the bundled RDS CA; pool limit two per execution environment. The Lambda role can read only this DB secret. A direct temporary Lambda probe verified application access and administrator-secret denial, then was removed.
- Historical upload IAM key for marido-image-bucket-user is Inactive. CLI credentials were unchanged. Administrator password was rotated in marido/dev/database; old password rejected. Ignored local cleanup/admin config was refreshed. Automatic recurring rotation is not configured.
- Cognito pool us-east-1_aClJIY05r, client 1s48008e1au3e62plvvmr6h1cn. Private endpoints verify ID-token signature/issuer/client/expiry/token use and verified email, bind subject/account identity, and enforce ownership/participants. Admin privileges require the admins group.
- API v2: Cognito registration supplies names/role; SQL account/profile provisioning follows verified login in an advisory-locked transaction. Login attaches token before /authenticate. Responses expose decoded data and serialized body compatibility. Existing accounts retain their identity/profile behavior.
- Authenticated POST /uploads: exact random owner key, 120-second signed POST, JPEG/PNG, 8 MB bound enforced by S3. Persisted changed references also pass owner/size/type/header checks. Client/contractor avatar updates synchronize account/profile transactionally. Project photos work. Public image policy was retained; private documents are outside this flow.
- Payment/milestone writes and coordinated account deletion remain unavailable (501). Provider/payment model is undecided; old PAN/CVC data was not inspected/purged. Lists default 100/max 200; full pagination remains future work.

## Validation and local commands

55 BE unit tests, TypeScript, 30 FE tests, changed-source lint and FE build passed. Actual development Cognito/MySQL/API/S3 fixtures verified both roles, retry provisioning, long email, text saves, access denial, projects/quotes/favorites/messages/read flags, contact/audit writes, and successful/unsafe image upload cases. Fixtures, uploaded objects and the permission-probe function were removed. API/component acceptance is not exhaustive browser/user acceptance.

Backend production audit findings went 36 to 8; no reported vulnerable dependency path is included in the allowlisted Lambda artifact. Unused prototype/development and FE dependency findings remain open. Framework/plugin versions were preserved. Browser AWS SDK removal reduced the raw initial entry point from roughly 6.64 MiB to 3.10 MiB; large images/bundle warnings remain.

Run FE against AWS with `npm.cmd run serve:aws` at http://127.0.0.1:8080. This overrides older ignored env values with API v2. Check port 8080 before starting a duplicate process. No process is guaranteed to survive closing the app/session.

```powershell
# FE
node --test tests/*.test.cjs
node scripts/lint-changed.cjs 65174fc

# BE
node node_modules/typescript/bin/tsc --noEmit --incremental false
node node_modules/jest/bin/jest.js --runInBand
node scripts/verify-development.cjs '<absolute FE path>/.deployments/hardening-20261116T122519Z' --development-fixtures --remote
```

The last command deliberately creates/removes test users, records and S3 objects; requires AWS access, companion FE dependencies and the refreshed ignored admin cleanup config. Never repeat/bypass the earlier rejected diagnostic PUT to an existing account. Restricted-shell checks hide AWS credentials; use the permitted elevated context before asking the user to sign in. Never print secrets.

## Rollback and next pickup

Use .deployments/hardening-20261116T122519Z/ and the latest release's compatible rollback template/artifact. A raw pre-upgrade MySQL driver failed against rotated authentication; do not deploy it. The prepared rollback restores prior accepted application source while retaining Node 24, current compatible libraries and restricted credentials. Its disposable core flows passed. Do not reactivate exposed keys or restore old passwords. An actual stack rollback was not executed.

Next priorities: browser signup/email confirmation and complete project/quote journey, atomic quote acceptance, actual email/WebSocket delivery, coordinated account deletion, pagination, orphan-image cleanup, CI/monitoring/restore checks, recurring credential rotation and legacy/prototype/build-tool dependency cleanup. The stack has **486 of 500 resources**: consolidate before expanding endpoints. Payment model/provider requires a product decision before implementation.

Asana stays deferred: 21-ticket [Markdown](asana-tickets.md) and [CSV](asana-tickets.csv) are current; no remote tickets were created. Continue authorized repairs without repeated generic permission questions and keep this handoff/log current. For the user's next task, start from this deployed state rather than redoing the completed credential/runtime/photo batch.
