# Session handoff

Saved November 16, 2026 (America/New_York). Read this file first when resuming work, then inspect Git status in both repositories before changing anything.

**Latest completed action: FE deployed to AWS.** The user explicitly requested frontend deployment. The release is live at `https://www.marido-en-alquiler.com/`, from application source commit `1016467`, with CloudFront invalidation completed and public-page modal/scroll checks passing. The backend, IAM, Cognito and database were not deployed or changed. Full details, verification, local backup and rollback commands are in [the frontend release record](releases/2026-11-16-frontend.md). AWS CLI `default` authentication was verified through the permitted execution context; earlier restricted-shell `NoCredentials` observations were misleading. Do not ask the user to log in again without checking that context. The user should now validate their signed-in workflows on the public site. Photo uploads remain unavailable pending secure cloud permission/configuration work.

## Where we stopped

The user resumed development after a long pause. We reviewed both repositories, documented the product/architecture, prepared 21 review findings, and implemented an authorized repair batch with separate local commits. The user then asked to run **the FE locally against the existing AWS BE** for now.

That setup is running at **http://127.0.0.1:8080/**. The handoff check received HTTP 200. The user reported that everything seemed to work so far and supplied a screenshot of the signed-in client profile at `/perfil/info`, populated with account details. This is user confirmation of the observed profile flow, not acceptance of all workflows.

**Latest follow-up: page scrolling.** The user reported that the client profile would not scroll. An isolated browser reproduced two sign-in backdrops and a lingering `body.style.overflow = "hidden"` after dismissal. The FE now uses one modular Bootstrap runtime, removes the legacy Bootstrap 3 script, restores scroll state only after modal close, and preserves locks for other open overlays. Browser checks passed for sign-in close, dismissal during the opening transition, and the save-message dialog: one backdrop while open, none after closing, and the page scrolls. HTTPS requests were blocked in that test browser; no AWS writes occurred. The user should refresh the local page and confirm the profile scrolls.

**Subsequent follow-up: client profile save.** The user confirmed scrolling works, then reported a generic save error while editing only text fields (no photo). The profile write was resending the entire database row, including timestamps/counters/account metadata, to the old AWS handler's direct `UPDATE ... SET ?`. The local FE now allowlists editable client fields, keeps the identity in the route, copies initial profile data synchronously, and reports distinct HTTP/network/storage failures without exposing server payloads. Three isolated regression checks cover the legacy success response, field filtering and form retention. A read-only AWS CORS/empty-record check passed; the agent did not submit profile writes to AWS. A user retry was requested; do not claim the exact live rejection was reproduced or fixed until that outcome is recorded.

**Confirmed save-failure path:** The first cleanup did not resolve the user's failure. Their browser Console then showed `clients/createClient` followed by **POST `/clients` → 502**, with a missing CORS header masking the error. The existing profile was mistakenly taking the creation branch because form data lacked `id`. The local screen now resolves the numeric ID from the signed-in `userId`, validates any profile ID aliases against it, and always calls `clients/updateClient` for this account-edit screen. Missing/mismatched identity prevents the request; it never falls back to client creation. Two additional regression checks cover this exact missing-form-ID case and rejection of invalid identity (22 FE tests total). The user retried and explicitly confirmed "Save succeeded" and "worked". Save after page reload has not been separately checked. One proposed zero-row diagnostic PUT was rejected by automatic approval review and was not sent; only read-only AWS checks were performed by the agent. Do not repeat that rejected diagnostic request or bypass the rejection.

The user confirmed the client text-profile save now works. No next feature request has been selected. Suggested broader checks were profile-save/reload, favorites, project creation and messaging. These have not been systematically exercised by the agent. Image uploads and signup have configuration/contract limits described below.

**Latest request: safe AWS deployment.** A local readiness assessment found no configured AWS CLI credentials (`sts get-caller-identity` returned `NoCredentials`), no declared Lambda DB environment variables in the manifest, unverified live schema and rollback, Node 18 runtime, and FE/BE contract changes needing staging. No AWS changes were performed. See [deployment-readiness.md](deployment-readiness.md) for concrete blockers and the proposed sequence. Next deployment work requires authenticating the intended account for read-only inventory, then preparing an isolated staging API/database and a reviewable release/rollback plan. Do not deploy the entire batch directly to the existing `/dev/` endpoint.

## Repositories and Git state

- **FE workspace:** `C:\Users\leste\OneDrive\Desktop\Target-Innovations\01-Active-Projects\Target - marido-en-alquiler-web-3`
- **BE companion:** `C:\Users\leste\OneDrive\Desktop\Target-Innovations\01-Active-Projects\marido-en-alquiler-backend`
- FE branch: `master`; original repair documentation checkpoint: `bd9e33f`; initial handoff: `e1f9159`. Inspect current HEAD for the subsequent scrolling-fix commit.
- BE branch at handoff: `main`; latest commit: `b2b03cb`.
- Both tracked working trees were clean before creating this handoff. FE has pre-existing untracked `dist-build-check/` and `dist-build-check-2/`; preserve them.
- Existing user edits were checkpointed first: FE `65174fc`, BE `3a4ccc4`. Detailed fix/companion commits: [repair-log.md](repair-log.md).
- **FE has now been deployed; Git commits have not been pushed. Local BE repairs are not active on AWS.** The released FE explicitly retains compatibility with the deployed legacy API; consult the release record before changing contracts.

## User instructions and preferences

- Continue collaborating until the requested work is complete; avoid repeated permission questions for already authorized routine work.
- The user explicitly authorized commits between fixes. Keep each fix independently reviewable and reversible, with the problem/change/verification recorded in its commit.
- Preserve existing work and generated directories. Do not rewrite history.
- Current setup: the FE is published on AWS and also available locally; both use the existing AWS BE. Do not switch to a local backend or deploy backend repairs merely because the next session starts.
- Asana publishing is **deferred at the user's request**. Keep tickets locally for later import. No Asana tasks were created.
- Production data changes, credential rotation, cloud configuration and deployment were not performed by this batch. Do not perform incidental live writes as part of a smoke check.

## Restarting the frontend

The dev process may stop when the application/session closes. Check port 8080 before launching another server.

```powershell
Set-Location 'C:\Users\leste\OneDrive\Desktop\Target-Innovations\01-Active-Projects\Target - marido-en-alquiler-web-3'
$env:VUE_APP_ENV = 'production'
npm.cmd run serve -- --host 127.0.0.1 --port 8080
```

Here `VUE_APP_ENV=production` selects the AWS API; Vue CLI still serves a development build locally. FE `.env` already selects that API, and generated `src/aws-exports.js` exists locally. No secrets should be printed or committed. PowerShell blocks `npm.ps1` on this machine; use `npm.cmd`.

## Known limits affecting the current setup

- AWS still runs its previous BE version. Some local FE fixes expect companion BE changes, notably the new signup creation-ID response and explicit composite favorite deletion route. Do not claim these are working against AWS until verified or deployed through an agreed process.
- Browser S3 code now uses temporary authenticated Cognito credentials. Uploads need `VUE_APP_IMAGE_BUCKET`, an appropriate identity pool and a scoped IAM role; the bucket variable was unset at the last configuration check. Uploads therefore are not confirmed working.
- The local BE is not configured to run end-to-end. Its env files were missing required values including `DB_USER`; no local MySQL setup/schema reconciliation was done. The new configuration refuses accidental non-production remote DB access. Do not bypass it to reach production.
- Hardcoded AWS credentials and public ping credential output were removed locally; exposed credentials in history/local files still require operator rotation. No rotation has happened.
- Full API JWT/ownership enforcement, payment tokenization, actual schema migrations and several feature-completion tasks remain open. See ticket statuses; the entire review is not resolved.
- “Payment redesign” was explained to the user: current code can persist raw card numbers/CVC; a future design should use provider-hosted/tokenized collection, or remove card collection if payment happens outside the platform. The user has **not chosen a payment/business model**.

## Verification already completed

- 22 FE isolated Node tests passed, including modal scroll-state, filtered client profile writes and the missing-form-ID update regression.
- 30 BE isolated Jest tests passed with DB access mocked.
- BE TypeScript no-emit check passed.
- 54 changed FE source files passed lint using the committed read-only workaround.
- Final FE production build passed, retaining bundle/image size warnings.
- Build-time public env allowlisting was added after artifact scanning caught a local secret embedded by Vue CLI. The final scan found none of the checked sensitive local env values in 8 generated JS/map files. Temporary build output was removed.
- The current local dev server compiled successfully and returned HTTP 200; user confirmed the populated client profile renders.
- A targeted browser regression check now covers modal-close scrolling (`node tests/browser/modal-scroll.cjs`, using an isolated Chrome/Edge instance on debugging port 9223). No comprehensive user-journey automation, live DB/schema inspection, AWS authorizer audit, payment, email, upload or WebSocket integration test was completed.

Commands and detailed limits are in [repair-log.md](repair-log.md). Repeat checks when new changes or evidence warrant them.

## Documents and Asana

- [Documentation index](README.md)
- [Original architecture assessment](architecture.md)
- [Original API/data assessment](api-and-data.md)
- [Original 21-finding review](review-report.md)
- [Implemented repairs, commits, configuration and rollback](repair-log.md)
- [Current ticket ledger](asana-tickets.md)
- [21 import-ready ticket records](asana-tickets.csv)

Asana target project: <https://app.asana.com/1/1200400511518349/project/1201474712395202/board/1205115801994358>. The user installed Asana and supplied a screenshot confirming an account connection, but Asana task tools were not available in the active agent session. The user then explicitly deferred Asana. Do not restart connection troubleshooting unless requested.

## Suggested resumption

1. Read this handoff and the repair log; inspect both Git working trees and current branch heads.
2. Confirm whether the FE server is still running. Restart with AWS BE only if needed.
3. Tell the user that the last confirmed state was the working client profile and ask which change/workflow they want next if they have not already specified it.
4. If continuing validation, distinguish existing AWS behavior from the un-deployed local BE fixes. Coordinate any write-based checks with the user's intended data changes.
5. Continue separate commits per fix and update this handoff/ticket ledger when the state changes.
