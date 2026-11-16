# Session handoff

Updated November 16, 2026 (America/New_York). Read this and `repair-log.md`, then inspect Git status in both repositories.

## Current state

The user explicitly confirmed **the entire system, including AWS and its database, is development** and authorized backend repairs, deployment and separate commits. Routine development validation may use newly created disposable fixtures, with cleanup. Do not recreate an expensive separate staging database merely because older documentation proposed one. The payment business model is still undecided.

The backend security/compatibility release and paired frontend are deployed and verified in AWS account `907823072924`, region `us-east-1`, profile `default`. See [the backend release record](releases/2026-11-16-backend.md) for final deployment/verification status and rollback. The existing API and database are retained. No schema migration was needed.

- FE: this repository, branch `master`; paired app fixes `e0474ba` (verified-token login/registration), `f9f284b` (remove raw-card form), local command `fb84127`.
- BE: `../marido-en-alquiler-backend`, branch `main`; schema `8a40dff`, dependencies `4832219`, authorization/provisioning `39106f9`, DB secrets/TLS `de696e1`, deployment/routes `40f9782`, integration checks `67fb927`, contact `4ef1331`, username length `4dd8f90`, health CORS `fde6af4`, Lambda-loadable health rename/config `f14cb8b`/`e6cb890`, operational docs `aab9e41`.
- Fixes are local commits; nothing was pushed to Git remotes. Original user edits remain in FE `65174fc` and BE `3a4ccc4`.
- Preserve pre-existing untracked `dist-build-check/` and `dist-build-check-2/` and ignored `.deployments/`. Old artifacts can contain secrets; never commit them.

## AWS and released contracts

- Website: https://www.marido-en-alquiler.com; S3 `www.marido-en-alquiler.com`; CloudFront `EI5JEIS37I445`.
- API: https://0011dt1689.execute-api.us-east-1.amazonaws.com/dev/marido-backend; stack `marido-backend-dev`; 75 existing Lambdas.
- Database: RDS `marido-en-alquile-prod`, MySQL 8.4.10. Despite its historical name it is development, as confirmed by the user. Schema-only inventory and seven-day automated backup configuration were checked; no restore was performed.
- Database password is in Secrets Manager `marido/dev/database`. Lambda role gets only that secret; password is loaded once per execution environment. TLS verifies the official RDS CA. Password/key rotation remains open.
- JWT verification checks Cognito signature, issuer, app client, expiry, ID-token use and verified email. Pool `us-east-1_aClJIY05r`, client `1s48008e1au3e62plvvmr6h1cn`. Admin privileges require the Cognito `admins` group.
- `/authenticate` derives email from the token. It creates/reconciles SQL account/profile in a locked transaction, binds the Cognito subject and returns safe account fields. Existing email-only login lookup is gone.
- FE must use `VUE_APP_API_CONTRACT=v2`. Cognito registration carries names and client/contractor role; SQL provisioning happens after verified login. Login attaches the bearer header before `/authenticate`.
- Private reads/writes enforce ownership/participants. Public contractor responses exclude banking/license/private address data. Lists default to 100, maximum 200; full pagination remains future work.
- Raw payment-method/milestone creation and updates return 501. Payment listing exposes only last four digits and expiry; owner deletion works. Account deletion returns 501 pending coordinated Cognito/profile cleanup.
- Quote client/project routes and composite favorite deletion are declared. Message history returns the newest 100 in chronological order; unread counts and recipient-controlled read flags are checked.

## Local development and verification

Run FE locally against AWS with **`npm.cmd run serve:aws`**, then open http://127.0.0.1:8080. This explicitly sets API v2 and overrides an older ignored `.env` value. Do not assume a process survives closing the app/session. `NODE_ENV=production` in Lambda is a configuration selector, not a claim that these resources are production.

AWS CLI already works in the permitted elevated execution context. Restricted-shell checks hide the user's credentials. Verify that context before asking for a new login; never print credential values.

Checks: 45 BE unit tests and TypeScript, 25 FE tests, changed-source lint and FE build passed. Real Cognito SRP/MySQL fixture journeys passed before deployment and against AWS, including extended route/contact/read-state acceptance. The final health-only artifact was proven equivalent for every other packaged file and passed public health verification. CloudFormation is UPDATE_COMPLETE and CloudFront invalidation I6PKSWK3O1KYUKC86YWPU9GVRJ completed. Tests create unique development users/records and delete those fixtures. They do not edit existing application records.

BE commands:

```powershell
node node_modules/typescript/bin/tsc --noEmit --incremental false
node node_modules/jest/bin/jest.js --runInBand
node scripts/verify-development.cjs '<absolute FE path>/.deployments/be-20261116T080605Z' --development-fixtures --remote
```

The last command requires connected AWS access, companion FE dependencies and the ignored local DB configuration. It intentionally creates/removes test fixtures. Never repeat or indirectly bypass the previously rejected diagnostic PUT to an existing account.

## Remaining work and next pickup

1. Read the final release status and ask the user to refresh/sign in and confirm their own workflow. Do not claim every screen or admin workflow has browser acceptance.
2. Finish secure photo uploads: existing Cognito authenticated role lacks `s3:PutObject`; do not restore long-lived keys or grant unrestricted bucket writes. Design identity-scoped object keys/permissions together.
3. Choose the payment model/provider before implementing payments/payouts; raw entry is disabled. Existing stored PAN/CVC rows were neither inspected nor purged.
4. Rotate previously exposed AWS/DB credentials. Moving the old password to Secrets Manager did not rotate it or scrub old artifacts/history.
5. Upgrade deprecated Node 18 and audit runtime dependencies separately. The broad framework/plugin upgrade was rejected by automatic approval review; this release retained the existing framework/plugins/runtime and used an allowlisted package with native CloudFormation. Do not silently force dependency upgrades. API integrations invoke unqualified functions; historical published-version outputs were preserved, not republished.
6. Complete robust pagination, field length/business-state validation, atomic quote acceptance, review moderation, coordinated account deletion, and schema migrations rather than relying on snapshot SQL. External email/WebSocket delivery, admin browser flows, image storage and provider/payment flows remain unverified.
7. Investigate DB connection concurrency/RDS Proxy, alarms, CI and the near-limit CloudFormation resource count before expanding infrastructure.

Asana stays deferred. [asana-tickets.md](asana-tickets.md) and [asana-tickets.csv](asana-tickets.csv) are the ticket source; no remote tickets were created. Update this handoff and the repair log when work changes. Continue authorized repairs without repeated generic permission requests; surface concrete product decisions and actual blockers.
