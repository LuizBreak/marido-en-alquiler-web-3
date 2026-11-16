# Session handoff

Updated November 16, 2026 (America/New_York). Read this file and the repair log before resuming; inspect Git status in both repositories before changing anything.

## Current outcome and next authorized objective

**The frontend is deployed and the user reports that everything seems to be working.** The user then explicitly requested updates to this handoff and the repair log so work can proceed on the necessary backend changes and deployment. Backend preparation, repairs, testing and deployment are the next authorized objective. The backend has not yet been deployed from the local repaired source.

Continue that objective without asking the user to reauthorize routine fixes, per-fix commits, read-only AWS inventory or the already requested deployment. First establish live configuration/schema compatibility, isolated validation and rollback. Resolve material product decisions or destructive data changes with a concrete plan when needed; this authorization does not decide the payment business model or justify speculative live-data writes. Do not replace the working backend with the unverified local batch.

## Repositories and checkpoints

- FE workspace: C:/Users/leste/OneDrive/Desktop/Target-Innovations/01-Active-Projects/Target - marido-en-alquiler-web-3
- BE companion: C:/Users/leste/OneDrive/Desktop/Target-Innovations/01-Active-Projects/marido-en-alquiler-backend
- FE branch: master. Latest checkpoint before this documentation update: 7ef12dd. Released application source: 1016467.
- BE branch: main. Local repaired candidate: b2b03cb; no subsequent backend edits or deployment occurred during the FE release.
- Original user edits were preserved in FE 65174fc and BE 3a4ccc4. Keep fixes in separate, documented, reversible commits; do not rewrite history or push Git changes without a request.
- Tracked working trees were clean before this update. Preserve pre-existing untracked dist-build-check/ and dist-build-check-2/.
- The ignored .deployments/ directory contains the FE build and rollback snapshot; preserve it. Old artifacts can contain exposed secrets and must remain outside Git.

## Verified AWS access and live frontend

- AWS account: 907823072924; CLI profile: default; verified IAM identity: luiz.break.
- Region: us-east-1 for the production FE and current API.
- AWS CLI is already authenticated. Restricted commands ran as CodexSandboxOffline and misleadingly returned no profiles/credentials. The permitted elevated execution context successfully used the existing default profile. Check that context before asking the user to sign in again. Never display or commit credential values.
- Live FE: https://www.marido-en-alquiler.com/
- S3: www.marido-en-alquiler.com; CloudFront: EI5JEIS37I445.
- Release: fe-20261116T074953Z; invalidation IAJLGTCJ4TZYPAQVQ6QMTRJYU1 completed.
- Release record and rollback: [releases/2026-11-16-frontend.md](releases/2026-11-16-frontend.md).
- Existing API used by both released/local FE: https://0011dt1689.execute-api.us-east-1.amazonaws.com/dev/marido-backend
- The /dev/ stage name is not evidence that its database or users are disposable. Treat it as live until positively identified.
- No Lambda/API Gateway, Cognito, IAM, database or DNS change occurred in the FE release. The user has now confirmed the released FE seems to work; that is user acceptance of observed behavior, not exhaustive workflow testing.

## Important FE behavior to preserve during backend work

- Text-profile saving works. Its actual failure was missing form identity causing POST /clients for an existing account, returning 502 without CORS headers. Commit 3f36a0a binds updates to the signed-in userId and prevents accidental creation. Commit fd92f97 filters editable fields. The user confirmed successful saves.
- Scrolling works. Commit 8fa38e5 removed duplicate Bootstrap runtimes and fixed post-modal overflow cleanup; three browser scenarios passed.
- The released FE explicitly uses the legacy API contract. Commit 1016467 accepts both account ID result formats, supplies blank legacy required fields without sending Cognito passwords, and retains the legacy composite favorite-delete request until the revised BE is active. Coordinate any switch to VUE_APP_API_CONTRACT=v2 with a separately tested FE release.
- Photo uploads remain unavailable. The existing authenticated Cognito role amplify-marido-dev-111757-authRole evaluated as implicitDeny for s3:PutObject in marido-image-bucket. The browser now requires temporary credentials and explicit storage configuration; do not restore long-lived access keys. No IAM repair has been made.
- Payment handling remains a product/security decision: raw card/CVC persistence exists in the old flow. The user has not selected off-platform payment, provider checkout or marketplace payouts. Do not invent that model or treat payment redesign as completed.

## Backend work: start here

1. Read [deployment-readiness.md](deployment-readiness.md), [review-report.md](review-report.md), [api-and-data.md](api-and-data.md) and current BE source. Those assessments contain historical observations; verify live facts rather than assuming cached artifacts match AWS.
2. With the verified default profile, inventory the actual API, Lambda integrations/versions/configuration, CloudFormation stack, logs and database networking. Compare the current endpoint with the local service definition. Use read-only inspection first and redact secrets.
3. Capture a known-good backend code/configuration/deployment reference and establish executable rollback. Verify database backup/restore before schema changes. The FE backup is not a backend or database backup.
4. Reconcile the live schema using safe schema-only access. The snapshots are not migrations. Accounts have legacy NOT NULL columns, profile fields/casing differ, and mocked SQL tests have not validated inserts against real MySQL.
5. Prepare explicit stage/account/region settings, a supported Lambda runtime, secret-backed DB settings and verified packaging. Current serverless.yml declares nodejs18.x and no Lambda DB environment variables, while the new DB helper requires DB_HOST, DB_NAME, DB_USER, DB_PASSWORD and appropriate NODE_ENV. Do not deploy without resolving this mismatch.
6. Finish required contract, authentication/ownership, validation, provisioning and error/CORS repairs in separate commits. Preserve currently working FE behavior and explicitly track incomplete features. Current local helpers are a starting point, not a fully accepted backend.
7. Validate on an isolated staging API and isolated database with sanitized data. A second Lambda stage connected to the live DB is not isolation. Test registration, login/reload, profiles, projects/quotes, favorites, messages/read state and failure behavior, including existing FE compatibility.
8. Produce the concrete artifact/target/change summary, passing checks and rollback procedure, then execute the authorized backend release when ready. Verify public behavior and record the deployment, remaining limits and rollback references. Stop for a real unresolved risk or missing decision; do not repeatedly ask generic permission for the agreed work.

One proposed zero-row diagnostic PUT to AWS was rejected by automatic approval review and was not sent. Do not repeat or indirectly bypass that request. Existing error logs, read-only inspection and isolated tests are the appropriate diagnostic paths. During prior repair work, all successful live application saves were performed by the user.

## Checks already completed

- Released FE: 24 isolated tests; lint passed for 55 changed source files; production build passed with existing bundle/image size warnings.
- Release artifacts: entry-point references verified; checked local secret values absent; all 187 uploaded asset checksums matched before index publication. The public hostname and CloudFront hostname served the exact new index.
- Three production-build and public-page browser checks passed: sign-in close, close during opening transition and save-message close, each confirming page scrolling and no leftover backdrop/lock. Test browser blocked application API/Cognito calls.
- Local BE candidate: 30 isolated Jest tests with DB mocked and TypeScript no-emit passed previously. No full staging/live-schema acceptance or backend deployment has happened.
- Exposed credentials in old files/history still require rotation. No rotation or schema/data migration has occurred.

## Local FE and operational preferences

The local FE was left on http://127.0.0.1:8080/ using AWS BE; the process may stop when the app/session closes. Check before restarting. In the FE folder:

~~~powershell
$env:VUE_APP_ENV = 'production'
npm.cmd run serve -- --host 127.0.0.1 --port 8080
~~~

Here VUE_APP_ENV selects the remote API; Vue CLI still runs a local development server. Use npm.cmd because this machine blocks npm.ps1. Keep local env/generated Amplify files untracked. Windows companion-repository edits and Git/cloud operations may require the permitted elevated tool context.

Asana remains deferred. No remote tickets were created. Keep [asana-tickets.md](asana-tickets.md) and [asana-tickets.csv](asana-tickets.csv) updated as backend findings close. Do not restart Asana connection troubleshooting unless requested.

## Resuming the next session

Read this handoff and [repair-log.md](repair-log.md), check both repositories and the existing AWS identity, then begin the backend inventory and deployment-readiness work above. The user has already selected the next objective; do not ask which feature to work on next. Keep communicating findings and update the handoff/repair log after substantive changes or deployments.
