# Restart repairs and commit ledger

Updated November 16, 2026. Both repositories have separate local commits; nothing was pushed. The user confirmed the whole AWS system is development and authorized backend repairs/deployment. See [the backend release record](releases/2026-11-16-backend.md) for the authoritative current deployment/acceptance status and rollback.

## Backend release repairs

| Repair | Commit |
| --- | --- |
| Reconcile required fields/casing with actual MySQL schema | BE `8a40dff` |
| Add Cognito JWT and Secrets Manager runtime clients | BE `4832219` |
| Verify identity, scope resource access, filter private fields, provision transactionally | BE `39106f9` |
| Retrieve DB secret at runtime; require verified RDS TLS; reduce pool size | BE `de696e1` |
| Declare dev environment and missing routes; add allowlisted packaging/native release preparation | BE `40f9782` |
| Add disposable Cognito/MySQL route, contact and messaging verification | BE `67fb927` |
| Preserve required public inquiry defaults | BE `4ef1331` |
| Use Cognito subject within legacy username length | BE `4dd8f90` |
| Permit browser access to health response | BE `fde6af4` |
| Replace the Lambda-incompatible dot-prefixed health filename; isolate compiler output | BE `f14cb8b`, `e6cb890` |
| Accept valid reflected CORS origins; document executable fixture workflow | BE `1e40f9e`, `aab9e41` |
| Attach verified bearer token before SQL login; defer new SQL accounts until verified login | FE `e0474ba` |
| Remove raw card entry; show only masked stored-card metadata and owner deletion | FE `f9f284b` |
| Explicit local FE/AWS API v2 development command | FE `fb84127` |

Validation: 45 BE unit checks, TypeScript, 25 FE tests, changed-source lint and build passed. Real SRP/Cognito/MySQL disposable fixtures passed locally and against AWS, including extended routes, contacts and message read state. The final health-only package preserves every other accepted file; its real public endpoint passed. Both API and paired FE are deployed, all 75 Lambda hashes matched, 187 FE assets were checked and CDN invalidation completed. Details are in the release file. No schema migration was required. Secrets moved out of the artifact, but were not rotated. Node 18/toolchain upgrades, provider payments, photo permissions and remaining product/operations work stay open in the ticket ledger. Legacy payment/milestone writes and coordinated account deletion intentionally return 501.

Run FE locally with `npm.cmd run serve:aws`. Keep `.deployments/be-20261116T080605Z/` and the earlier FE snapshot outside Git. The sections below are historical repair records; references there to an undeployed backend, unknown AWS access or a potentially production database are superseded by this release and the user's explicit development clarification.
## Checkpoints

| Repository | Commit | Contents |
| --- | --- | --- |
| FE | `65174fc` | Preserved existing tracked edits and the architecture/review documentation |
| BE | `3a4ccc4` | Preserved existing account lookup edits; the pre-existing lockfile difference normalized without a substantive committed change |

Existing untracked `dist-build-check/` and `dist-build-check-2/` directories were excluded and preserved. The review's temporary `.repair-build/` directory was removed after recording validation.

## Individual repairs

Each implementation commit records the defect, change, verification and material limits. Cross-repository work has companion commits listed together here; neither repository's history was rewritten.

| Repair | FE commits | BE commits |
| --- | --- | --- |
| Remove long-lived browser AWS credentials; sanitize ping; stop tracking local secrets | `69b1b07` | `12c420c` |
| Consolidate validated database configuration and isolate development | â€” | `850cb3f` |
| Correct domain primary keys, route parameters and log table names | `5ef6f89` | `f6f7e4b` |
| Normalize API responses and retain a serialized compatibility field | `7fc74b0` | `d960407` |
| Return actual generated IDs from successful resource creation | â€” | `16e846e` |
| Await persistence/uploads; propagate errors; keep forms on failure | `9ba4971` | â€” |
| Repair sparse-ID collection updates and current-user favorites | `35e6736` | `12aa5d3` |
| Fix session expiry units, cached-session refresh, bearer headers and route metadata | `11a17ea` | â€” |
| Await signup steps, remove shared ID state, stop sending/storing signup passwords | `9428969` | `43bdb7a` |
| Validate JSON/IDs, allowlist writes, parameterize chat SQL and control Lambda errors | â€” | `b2b03cb` |
| Clean up socket timers/listeners/reconnect and correct dialog registration | `33423f5` | â€” |
| Preserve inquiry text and distinguish notification failure after a saved inquiry | `7d2a8df` | â€” |
| Add reproducible read-only changed-source lint | `be12098` | â€” |
| Replace JWT log session IDs with event IDs and remove environment/store dumps | `22ba93b` | â€” |
| Allowlist public browser variables to exclude secrets embedded by build tooling | `c2facd0` | - |

## Verification

- **FE:** 14 isolated Node tests passed, covering response compatibility, resource IDs, state updates, delayed/failed saves, signup ordering, password exclusion, JWT expiry units, log redaction, build-time secret exclusion and socket timer/listener cleanup.
- **FE source lint:** 45 changed source files passed through the original ESLint configuration using explicit text input. The original broad CLI file reader had failed on this host; the workaround is committed and reproducible.
- **BE:** 30 isolated Jest tests passed. Database access is mocked; coverage includes configuration isolation, route/SQL identifiers, response shapes, generated IDs, password exclusion, composite favorite deletion, invalid JSON/injection input, writable fields and redacted failures.
- **BE:** TypeScript `--noEmit --incremental false` passed.
- **FE:** Production build passed with existing bundle/image size warnings. Browser-data and sass-loader maintenance notices remain.
- **Not exercised:** live database, Cognito signup/session integration, email/WebSocket/S3 infrastructure, payment processing, browser journeys, deployment or credential rotation.

Run the checks from the corresponding repository:

```powershell
# FE
node --test tests/*.test.cjs
node scripts/lint-changed.cjs 65174fc
npm.cmd run build

# BE
node node_modules/typescript/bin/tsc --noEmit --incremental false
node node_modules/jest/bin/jest.js --runInBand
```

## Configuration changes to account for

1. Existing local env/config files were retained on disk and removed from Git tracking. Fresh checkouts must use the sanitized `.env.example` files. Secrets in old commits, generated directories or local files were not erased, and exposed credentials still need rotation.
2. Backend connections no longer read the production JSON configuration. Development loads `.env.development`; `DB_NAME`, `DB_USER` and an explicitly present `DB_PASSWORD` are required. Loopback is the default. A non-production remote host requires explicit `ALLOW_REMOTE_DB=true`; use that only for an isolated environment. Production credentials must come from runtime environment values.
3. Browser image uploads require `VUE_APP_IMAGE_BUCKET`, the intended region, an authenticated Cognito identity pool and a restricted temporary-credential role. Uploads fail closed without those settings. No role, bucket policy or identity pool was created.
4. The backend supplies canonical decoded `data` plus a serialized `body` compatibility alias. The FE accepts both old and new envelopes, but the new generated-ID signup contract and composite favorite deletion route require the companion backend changes. Coordinate versions in an isolated environment before deployment.
5. Vue CLI browser variables are now explicitly allowlisted in `scripts/public-environment.cjs`. Adding a new public setting requires updating that list; secrets must never be added. A final build scan checks that sensitive values from the current local env file are absent from generated JavaScript/maps.
6. New accounts retain an empty placeholder in the legacy SQL password column; no existing rows or live schema were modified. Required-column/default drift, atomic SQL provisioning and idempotent Cognito recovery remain open.

## Remaining work and rollback

### Follow-up: scrolling after closing dialogs

An isolated browser reproduced duplicate sign-in backdrops and a remaining inline `overflow: hidden` after dismissal. The scrolling-fix commit replaces the separate Bootstrap bundle with shared modular plugins, removes the old Bootstrap 3 CDN script, centralizes scrollbar/backdrop cleanup, and waits for the actual hidden event instead of a 250 ms timeout. Sign-in/signup and message dialogs use the same cleanup, which preserves another visible overlay's lock.

Validation after this follow-up: **17 FE tests**, **50 changed source files linted**, a passing production build (existing size warnings), and three real browser scenarios passed (sign-in close, close during opening transition, save-message close). The browser check verifies actual scroll position after dismissal and blocks HTTPS requests to avoid AWS operations. The local FE still targets the existing AWS BE; no deployment occurred.

The code repairs do not close all 21 review findings. API JWT/ownership enforcement, payment tokenization, schema migrations, undeclared endpoints, provider setup, unique upload keys, legacy booking behavior and production operations remain in the ticket ledger with explicit acceptance work.

### Follow-up: client text-profile saves against the old AWS API

After confirming the scroll fix, the user reported a generic error saving text-only client profile changes. Inspection showed that the FE resubmitted the complete database row to the legacy direct-SQL update, including server timestamps/counters/account metadata. The client module now prepares an explicit editable-field payload, while the URL retains the existing client ID and local state keeps its metadata. Initial profile copying is synchronous; failures retain input and distinguish HTTP, network and missing-storage errors without echoing server payloads.

Three new isolated checks passed (20 FE tests total): filtered request/legacy success compatibility, no upload on text-only submission with retained input on failure, and safe error classification. Changed-source lint passed for 53 files; the production build passed with existing size warnings. Read-only AWS checks confirmed the PUT preflight permits authorization/content-type and the nonexistent-client GET returns the legacy message-only envelope. The exact failed live request has not been captured, and no agent profile writes were sent to AWS. User retry confirmation is pending.

The user's subsequent Console screenshot identified the actual route failure: `clients/createClient` issued **POST `/clients`**, which returned **502** without a CORS header. A missing `id` in the editing form incorrectly selected creation for an existing signed-in client. The follow-up binds updates to the active account's numeric `userId`, checks any profile ID aliases for consistency and removes client creation from the profile-edit screen. Tests reproduce an existing account with no ID in its form and verify that exactly one update (no creation) is dispatched; invalid/mismatched identity issues no write. The suite now has 22 passing FE tests; lint passed for 54 changed source files and the production build passed with existing size warnings. The user explicitly confirmed "Save succeeded" and "worked" after retrying. No agent profile writes were made to AWS; persistence after a subsequent page reload has not been separately checked. This follow-up is FE-only; the local BE remains at b2b03cb and no AWS deployment occurred.

Use `git show <commit>` to inspect a fix and `git revert <commit>` to create a reviewable reversal. Revert dependent commits in reverse order; coordinate FE/BE companion commits. Baseline checkpoints preserve pre-existing work. Reverting security fixes can reintroduce credential disclosure; Git reversal also cannot undo credential rotation or other external operations. No external changes were performed by this repair batch.
