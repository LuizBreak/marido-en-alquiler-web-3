# Restart repairs and commit ledger

## Machine restart checkpoint - November 18, 2026

Saved the precise resume instructions at the top of [HANDOFF.md](HANDOFF.md). Dependency fixes and documentation were pushed through FE `bf3db27`; BE remains `f143548`. The candidate is not deployed. Only the upgraded SDK's successful public contractor email-code confirmation remains before deployment; other recorded acceptance passed. Private test fixture/evidence and the exact candidate survive on disk, but preview/browser processes and their IDs will not survive reboot. Recreate the confirmation context, resend a code if needed, finish automatic contractor login, clean the exact fixture, publish/verify, then update and push the release record. No additional application change or deployment was made for this checkpoint.

## Frontend dependency security — November 18, 2026

November 18: [frontend dependency repairs](releases/2026-11-18-dependency-security.md) pass 94 tests, clean installation/build and real AWS profile/photo/chat/session checks. Production audit has zero findings; the full audit retains 14 high entries from one unpatched development Picomatch advisory. See the [security review](security/dependency-review-2026-11-18.md). The upgraded SDK public contractor confirmation is waiting for the user-held verification code, so this candidate has not been deployed. The live site remains the November 17 frontend; backend runtime is unchanged. Earlier FE `59bc5ec` and BE `f143548` were pushed successfully. New fixes are separate commits; no remote Asana tickets were created.

Twelve separate repair commits cover critical transitive fixes, unused dependency removal, Axios/Vue, Vue CLI/Webpack/Babel/lint, modular Amplify 6, compatible patches, development server, serialization, PostCSS, process spawning, UUID and unused external runtime injection removal. The release lists exact commits and compatibility evidence. Existing cached authentication, refresh/logout/expiry, both-role login, profile text/photo saves and live/reconnected/reloaded chat pass. Completed fixtures are removed; only the public signup confirmation fixture remains pending its real code. No backend runtime/schema/DNS change.

Pushed the twelve repairs and initial documentation through FE `5003a3b`; remote SHA verified. GitHub's post-push API still shows the old advisory snapshot, so alert closure remains unverified. Both working trees were clean; backend remains `f143548`. The current candidate is available locally at 127.0.0.1:8080 through the private static preview; live AWS frontend deployment remains gated on the pending real signup confirmation.

## Session expiry, logout and public contractor signup — November 17, 2026

[Release, commits, acceptance evidence and recovery](releases/2026-11-17-session-signup.md). Separate FE fixes await and isolate logout (`f072f09`), recover interrupted confirmation/login (`76b41a7`), remove credential-bearing development store logging (`4351c00`) and prevent cross-tab bootstrap resurrection (`5224dd5`). BE `f143548` adds the read-only identity audit, three regression tests and a reconciliation runbook; runtime handlers are unchanged. Generated build verification folders are now ignored (`7e0c2cb`); their local contents are preserved.

83 FE / 137 BE tests, TypeScript, changed-source lint and production build passed. Isolated real-AWS browser checks cover valid refresh, expired/invalid refresh, reload and two-tab logout. Public contractor signup rejected an invalid code, confirmed with the user's real email code and automatically opened /profile/info. Actual duplicate-email and subject-conflict fixtures returned 409/403; repeated provisioning created no extra profile/notice. All fixtures were removed. Read-only historical audit found no duplicate email/subject or blank/padded email records; no existing users were merged or deleted. FE checksum/index/CDN verification passed, preserving old assets and the prior index. Backend runtime/schema/Cognito/DNS remain unchanged. User also confirmed hello@ → Gmail forwarding with intact branded registration content. No Git push.

## New-client / contractor registration notifications — November 17, 2026

Implemented and deployed to the user-selected hello@ inbox; [behavior, schema, preview, verification and recovery](releases/2026-11-17-registration-notifications.md). New verified application account/profile creation commits a durable notice atomically; returning/legacy sign-ins do not notify. A scoped one-minute worker sends branded HTML/plain text with the name, email, type, account ID and owner-timezone registration time, retaining failed submissions for backoff retries. Existing application mail paths are unchanged. Separate commits: `188a788` migration/tool, `4e4e3da` feature/tests, `55fba25` infrastructure generator, `474f307` repeatable live acceptance.

134 BE tests, TypeScript, secret/artifact checks and visual preview passed. Additive table verified; main remains 486 resources / 76 functions, chat six resources / one function, mail now twelve resources / one function; all 78 active hashes and three stack updates match. IAM simulation allows hello@ and denies another recipient. Real concurrent client/contractor provisioning created one notice each, the schedule submitted both to SES on attempt one, repeated sign-in did not resend, and all disposable SQL/Cognito/queue fixtures were removed. The user supplied a Zoho Inbox screenshot confirming receipt of both client and contractor registration test notices. No frontend deployment, DNS change or Git push. Queue handling is at-least-once; ambiguous provider acknowledgements can rarely duplicate a notice. Recovery retains the table and current security boundaries.

## Dominican Republic / Colombia competitor research — November 17, 2026

Created the requested [Excel workbook](research/DR-Colombia-Home-Services-Comparison-2026-11-17.xlsx) with eight worksheets covering 10 core comparisons, six watchlist candidates, business models, 23 pricing rows, MEA pilot considerations and 33 source records. Public tariffs and evidence limitations are explicit; no country-operation assumption is made from historical pages or failed fetches. Native-currency amounts distinguish lead/proposal fees from diagnostic visits and retail labour packages. [Findings, methods and reproducible data](research/DR-Colombia-Home-Services-Comparison-2026-11-17.md) are alongside it. Workbook integrity/counts/numeric cells/source references were validated. No application/database/infrastructure changes or new business-model approval.

## Remaining notification restoration — November 16, 2026

[Release, inventory, previews, evidence and recovery](releases/2026-11-16-notification-templates.md). Restored branded Spanish HTML/plain-text message emails with saved sender/content and authenticated message links (`79a79fe` BE, `100bffb` FE). Service emails include owned project details and client contact information; corrected the form's project-as-quote ID and rendered-HTML submission (`ed97f7a` BE, `ce49595` FE). Restored contact and labeled newsletter/referral support templates, preserving fixed support delivery and manual follow-up (`c47249f` BE, `566a1bd` FE). Sender phone now comes from the current role profile (`c26d68c`); support copy clarified (`bb7aeac`). Inactive welcome/reference examples were not turned into automations.

120 backend / 60 frontend tests, TypeScript, lint/build, secret scans, desktop/mobile visual checks, all 77 deployed function hashes, all 187 asset hashes, both hostnames and completed CDN invalidation passed. Live SES submissions, browser sign-in/message/offer links, outsider denials, service ownership checks and full API regression passed; all temporary fixtures were removed. The user confirmed both restored new-message and service-request emails arrived in Gmail and look correct. No schema/DNS changes or Git push. Best-effort delivery limits and broader backlog remain.

## Branded offer email restoration — November 16, 2026

Deployed and user-confirmed; [release, preview, verification and recovery](releases/2026-11-16-offer-email.md). The generic SES quote notice unnecessarily removed useful existing content. BE `6796958` restores the original banner, project and contractor details, offer price/description, Spanish next steps and matching plain text, using escaped database values and the existing verified-recipient controls. FE `5d732e7` adds a working offer-review link, sign-in return, ownership checks and existing confirmation/version-checked acceptance. The old email Approve/Reject links both pointed to an unrelated homepage; no fictitious rejection workflow or one-click acceptance was added.

108 backend / 53 frontend tests, TypeScript, lint, production build, secret scans, visual preview, all 77 deployed hashes, all 187 frontend asset hashes, both hostnames, completed CDN invalidation and live AWS/browser regression passed. The user confirmed the restored Gmail email looks correct. Disposable SQL/Cognito/S3 fixtures were removed. No schema/DNS changes or Git push. Durable notification retries, DMARC and the broader backlog remain open; the HomeStars pilot plan remains a proposal.

## Backend CRUD consistency — November 16, 2026

Deployed and verified; [release, evidence and compatible recovery](releases/2026-11-16-crud-consistency.md). Both client-list URLs use the shared mysql2 handler directly. Unused Sequelize wrapper/models, Express app/entry point and nodemon config are removed, with corresponding direct dependencies/lockfile cleanup. Verification scripts now validate the development AWS account and read the existing administrator secret through a shared helper; ignored legacy config and private historical releases remain protected.

Separate BE commits: cbb9e2f secret-backed verification, b185c57 CRUD/prototype consolidation, 1cf5d6c dependency cleanup. 104 BE tests, TypeScript, secret scan and live AWS regression passed, including both client-list URLs' authentication/admin restrictions and fixture cleanup. All 77 Node 24 function hashes/handlers match. Artifact comparison found exactly one removed wrapper, with no other runtime/dependency changes. Roles/mail/chat configuration and resource counts are preserved. No frontend application changes, schema migration, actual rollback or Git push.

## Owned application notification email — November 16, 2026

Deployed; the user confirmed both Gmail test emails arrived. See the [notification release, evidence and recovery](releases/2026-11-16-notifications.md). SES replaces the broken external mailer. Saved projects/messages determine recipients; public support requests target hello. Browser-supplied addresses/HTML cannot control application notifications. Opt-outs, atomic duplicate/rate checks and separate persistence/delivery results are implemented. Zoho routing is preserved.

BE c719d44/675945e add SES; babb752 implements delivery/security tests; 7017d2a manages state/roles/metrics; 2081242 adds live acceptance. FE 0cacc41 removes duplicate browser sends; 5cfacc6 routes support through the owned API with accurate save feedback.

94 BE / 49 FE tests, TypeScript, lint of 76 changed source files, build, secret scan, 187 asset checksums, live mail checks and prior core AWS regression passed. Temporary users/SQL/event rows were cleaned. All 77 Node 24 functions match the artifact; REST remains 486 resources, chat six, plus a new six-resource mail stack. Both public hostnames serve the released index after CDN completion. No schema migration or Git push. Delivery remains best effort without automatic resend; DMARC and an alarm destination remain open.

Updated November 16, 2026. Both repositories have separate local commits; nothing was pushed. The whole AWS system is development. The [CRUD consistency release](releases/2026-11-16-crud-consistency.md) is current; earlier repair/release sections retain their historical evidence and validation limits.

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

## Completed follow-up: credentials, Node 24 and photo uploads

The user accepted the recommended next batch. It is deployed and verified: [hardening release and rollback](releases/2026-11-16-hardening.md), [credential retirement/rotation](releases/2026-11-16-credentials.md). This section supersedes earlier remaining-work statements about unrotated credentials, Node 18 and unavailable photos.

| Repair | Commit |
| --- | --- |
| Update runtime libraries while preserving framework/plugin versions | BE 059fe2d |
| Owner-specific signed image grants, type/size/header checks, atomic avatar updates | BE bbd6f69 |
| Node 24, DML-only app identity, upload endpoint and scoped IAM/configuration | BE 0f92330 |
| JPEG/atomic rollback checks and executable integration/rollback acceptance | BE 88a064b, 7cfdc34, 701a3e9 |
| Browser grants, generated photo keys, failure retention and AWS SDK removal | FE a519b5e |
| Record identified credential retirement and administrator rotation | FE b8f7450 |

55 BE and 30 FE tests, TypeScript, changed-source lint and build passed. Real development Cognito/MySQL/API/S3 acceptance covered successful client/contractor/project photos and rejected unsafe uploads. All fixtures were removed. A temporary Lambda directly proved the final execution role can read the app secret and cannot read the admin secret; it was removed. The old exposed upload key is inactive and the old admin password fails. Both public FE hostnames, all 76 Node 24 hashes/app identities, stack completion and CDN invalidation were verified. No Git push occurred.

Rollback uses the previous application code with current compatible runtime/MySQL and restricted credentials: directly reusing the old MySQL driver failed after authentication rotation. The compatible rollback passed disposable core flows; a stack rollback was not executed. Remaining scope is in the updated ticket ledger, including browser lifecycle acceptance, quote atomicity, delivery integrations, payments/product choice, pagination, orphan handling, CI/restore and prototype/build-tool cleanup. The stack is at 486/500 resources.


## Browser registration and project workflow — November 16, 2026

Deployed; complete evidence, commit table, limits and rollback: [journey release](releases/2026-11-16-journey.md).

FE a884f2e removes signup password/code logs; cfe6f4f/9dce372 configure Cognito before restoration; 5648bfa fixes photo display and actor-store replacement; 48b7998 adds reviewed offer acceptance/completion; 0016b31 retains failed drafts and distinguishes saved bids from failed notifications; 2d809e7 decouples chat history from socket startup and fixes synchronous participant matching; ae9a87e repairs contractor account routes/assignment lists; c68ba4e removes duplicated outgoing chat and fake delivery/read timers, and persists before broadcast.

BE fcd40ad implements project-first transactional quote acceptance and lifecycle/review guards; 2285290 tests real competing offers and stale terms; 89c6b49 adds identity-scoped own-work queries without new routes; aeebd7d verifies client/contractor isolation through API Gateway.

68 BE and 41 FE tests, TypeScript, lint (68 changed source files), build and known-secret scans passed. Real Gmail confirmation, refreshed login, profile text/photo, project creation/search, bidding, acceptance, completion and pending review passed in Chrome. Live API races have one winner and an idempotent retry; the losing/stale request gets 409. Chat persists and renders once after reload. No schema migration; 76 matching Node 24 artifacts and 486 stack resources. Both frontend hostnames serve the new index; old assets retained for rollback. No Git push.

Open findings: conch-app.com mailer DNS failure prevents bid notification email, while Cognito registration email works; WebSocket opens/presence succeeds but immediate private delivery failed. These services remain next priorities, along with moderation/lifecycle denial coverage. They were not falsely marked complete. Test inbox and plus alias were user-authorized; existing accounts were untouched and disposable SQL/Cognito/S3 fixtures cleaned up. Rollback was captured, not executed.

Published-site acceptance caught the client role getter casing after contractor navigation changes. FE cb7ef48 corrects the offers panel visibility; the corrected build was republished and the final browser check requires a visible client offers panel and no contractor acceptance controls.


## Authenticated live chat — November 16, 2026

Deployed and accepted; [chat release, evidence and secure recovery](releases/2026-11-16-chat.md). Root causes were toId/to protocol mismatch, Lambda-local connection storage and unauthenticated claimed identities. BE 89059f2 adds targeted runtime clients; ea02ead verifies handshake identity/expiry, stores durable session indexes and publishes canonical saved messages only to participants; fde4f51 generates an isolated six-resource chat stack and scoped socket/publisher roles. FE 0269a39 authenticates socket handshakes with current Cognito tokens; 418ec72 merges/deduplicates events, catches up after reconnect and isolates conversation/account changes.

81 BE/45 FE tests, TypeScript, lint, build, secret scans and live AWS/browser checks passed. Verified two recipient tabs, outsider denial, protected history, spoofing/rebinding denial, scoped presence, expiry before TTL deletion and reconnect catch-up. Real browser delivery passed without refreshing, with one sender copy and persisted history after reload. The prior account/project/quote/review/image/message regression suite passed on a fresh run after one transport-level fetch failure; its failed-run fixtures were removed too.

All 77 active functions use the verified Node 24 artifact. Main stack remains 486 resources; new chat stack has six. Eight existing WebSocket integrations target the authenticated handler. Request tracing is off; legacy anonymous Lambda is disabled (reserved concurrency 0). Both frontend hostnames and all 187 asset checksums/CDN completion were verified. No Git push or MySQL migration; temporary fixtures/session rows/profile credentials were removed. Recovery preserves authentication and does not reactivate the old anonymous service. Notification email DNS failure remains open.

A final browser inspection found missing legacy chat times rendered as Invalid DateTime. BE a8b9d54 assigns server creation time/persisted status; FE ebe023e normalizes valid time formats and renders unknown historical times as a dash. Final checks: 81 BE tests, 45 FE tests, TypeScript, lint across 68 changed source files and corrected production build.
