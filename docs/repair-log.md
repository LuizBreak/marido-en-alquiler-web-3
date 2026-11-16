# Restart repairs and commit ledger

Updated November 16, 2026. Both repositories have local commits; nothing was pushed or deployed. Original review documents remain historical snapshots. Current ticket status is in [asana-tickets.md](asana-tickets.md), with all 21 records prepared in [asana-tickets.csv](asana-tickets.csv).

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
| Consolidate validated database configuration and isolate development | — | `850cb3f` |
| Correct domain primary keys, route parameters and log table names | `5ef6f89` | `f6f7e4b` |
| Normalize API responses and retain a serialized compatibility field | `7fc74b0` | `d960407` |
| Return actual generated IDs from successful resource creation | — | `16e846e` |
| Await persistence/uploads; propagate errors; keep forms on failure | `9ba4971` | — |
| Repair sparse-ID collection updates and current-user favorites | `35e6736` | `12aa5d3` |
| Fix session expiry units, cached-session refresh, bearer headers and route metadata | `11a17ea` | — |
| Await signup steps, remove shared ID state, stop sending/storing signup passwords | `9428969` | `43bdb7a` |
| Validate JSON/IDs, allowlist writes, parameterize chat SQL and control Lambda errors | — | `b2b03cb` |
| Clean up socket timers/listeners/reconnect and correct dialog registration | `33423f5` | — |
| Preserve inquiry text and distinguish notification failure after a saved inquiry | `7d2a8df` | — |
| Add reproducible read-only changed-source lint | `be12098` | — |
| Replace JWT log session IDs with event IDs and remove environment/store dumps | `22ba93b` | — |
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

The code repairs do not close all 21 review findings. API JWT/ownership enforcement, payment tokenization, schema migrations, undeclared endpoints, provider setup, unique upload keys, legacy booking behavior and production operations remain in the ticket ledger with explicit acceptance work.

Use `git show <commit>` to inspect a fix and `git revert <commit>` to create a reviewable reversal. Revert dependent commits in reverse order; coordinate FE/BE companion commits. Baseline checkpoints preserve pre-existing work. Reverting security fixes can reintroduce credential disclosure; Git reversal also cannot undo credential rotation or other external operations. No external changes were performed by this repair batch.
