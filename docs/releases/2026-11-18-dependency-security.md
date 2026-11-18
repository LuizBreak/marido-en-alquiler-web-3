# Frontend dependency repairs — November 18, 2026

Status: code repairs committed separately; production-build acceptance and clean-install verification passed. **Not deployed yet:** the upgraded SDK's successful public contractor confirmation is waiting on the user's email verification code. The live site remains the November 17 session/signup release. Backend runtime is unchanged.

The user authorized autonomous dependency cleanup, separate reversible commits and Git pushes. AWS resources and data remain development. The earlier frontend `59bc5ec` and backend `f143548` were successfully pushed before this batch; older release records saying “no Git push” describe their state at that time.

All twelve repair commits and the review/ledger commit were pushed to `origin/master` through `5003a3b`; the remote SHA was verified. Both repository working trees were clean at that check; backend HEAD remains `f143548`. GitHub's immediately refreshed API still returned the older 127-alert snapshot (including four critical alerts), so closure of GitHub alerts is **not yet verified**. No alert was manually dismissed. The final local registry audits and inspected lockfile are the evidence for the repaired package versions.

## Changes and commits

| Commit | Repair |
| --- | --- |
| 431702c | Patch critical legacy transitive dependencies. |
| a0aa67a | Remove unused frontend dependency trees and obsolete Amplify UI registration. |
| 9134364 | Update Axios and Vue/compiler; exercise the actual HTTP client adapter. |
| 0fa7ce9 | Upgrade Vue CLI/Webpack, compatible loaders/Babel and lint integration. |
| 2125d6b | Move Cognito integration to modular Amplify 6 behind a tested compatibility adapter. |
| 63edd21 | Apply compatible transitive lockfile patches. |
| b7d3ed7 | Patch the development server/middleware and verify Host/Origin rejection. |
| 16aea9d | Patch build serialization. |
| 0834c03 | Unify PostCSS on a patched version and test legacy scoped-style compatibility. |
| 4a63311 | Patch old development process spawning and verify its actual consumer. |
| cfa001c | Patch legacy UUID resolution and verify the SockJS consumer. |
| c8ec003 | Remove unused external browser script injections and duplicate CDN resources. |

No history was rewritten. Individual commits contain their validation notes. The [security review](../security/dependency-review-2026-11-18.md) explains advisory counts, explicit overrides, compatibility checks and remaining maintenance work.

## Acceptance

- 94 frontend tests pass after a clean lockfile install; changed-source lint and production builds pass on Node 24.14.1 / npm 11.11.0.
- Production npm audit: zero findings. Complete audit: 14 high package entries attributable to one unpatched development Picomatch advisory; zero critical/moderate/low entries. Initial npm snapshot: 204 entries, including 12 critical. GitHub advisory-alert totals use different counting and are refreshed independently after a push.
- Existing Amplify 4 cached session restores under Amplify 6 with the same SQL identity. Real Cognito token refresh, reload, two-tab logout, expiry/focus handling and invalid-refresh fail-closed checks pass.
- Both roles sign in using real production-build forms. Profile text saves persist through Axios. FilePond signed photo upload persists synchronized account/profile avatars without external CDN globals.
- Immediate client/contractor delivery, a single sender copy, reconnect catch-up and saved history/timestamps after reload pass. These checks retain the previously deployed participant/identity controls; no backend chat code changed.
- Completed browser regression/session fixtures were removed, including their own SQL, Cognito, S3 and DynamoDB data. No existing user was edited.
- Public contractor signup reached confirmation and rejected an invalid code. Its successful confirmation/automatic-login check is pending the real code for the temporary `luiz.break+mea-security-mwlp7r46@gmail.com` address. The private fixture and isolated browser context remain available for that check; remove the fixture after acceptance. Do not claim this pending check passed or bypass it using administrator confirmation.

## Evidence and deployment gate

Private evidence: `.deployments/dependency-security-20261117/`. See `clean-tests.log`, `clean-lint.log`, `clean-build.log`, `npm-audit-final.json`, `npm-audit-production.json`, `auth-session-acceptance.json`, `browser-regression.json`, `dev-server-acceptance.json`, `hook-runner-acceptance.json` and `frontend-manifest.json`. Temporary browser credentials and private profiles are ignored, not committed. Source maps remain local and must not be published.

At handoff, 127.0.0.1:8080 serves the exact candidate through the private static preview (`static-server.cjs`, observed PID 18092). The regular Vue development server was stopped for the clean installation. The isolated verification browser listens on loopback port 9223; `signup-target.private.json` identifies the existing confirmation context and `signup-fixture.private.json` holds only this temporary test account. `signup-status.cjs` confirmed that its form remains available. Processes may not survive closing the session. Inspect actual command lines/ports before restarting or stopping anything; do not assume a recorded PID still belongs to this task. After acceptance, close only the task's preview/browser, clean the fixture and restart `npm.cmd run serve:aws` on port 8080 if wanted.

The tested candidate is `frontend-release/`. Run `finish-signup.cjs` with the user-supplied code, check confirmation/automatic-login/cleanup receipts, then publish only the validated candidate. If the code expired, use the form's resend action and request the new inbox code. Public signup's credential lifetime and navigation are exercised by real forms, not administrator shortcuts.

Candidate index SHA-256: `822a4ea71ac6ab7500f7f4e283e5f8bbf9a8987deb70975b84569186ac218f01`, built from application revision `c8ec003`. The artifact scan found no AWS access-key/private-key patterns; source maps contain none of the four original critical packages or Picomatch. A fresh install/rebuild with explicit production/API v2 settings has identical mapped application/dependency sources and equivalent public output after generated filename hashes are normalized. Builds in different output directories have different generated hashes; no byte-identical cross-directory claim is made. The deployment candidate remains the exact artifact used for the full browser regression.

Publishing retains old assets, verifies uploaded hashes and publishes `index.html` last with no-cache headers; invalidate CloudFront and verify both public hostnames. Record the final index hash, asset count and invalidation completion here before declaring deployment complete. AWS account must be 907823072924; bucket www.marido-en-alquiler.com; distribution EI5JEIS37I445. No `s3 sync --delete` is needed.

## Recovery

Until publication, the live frontend remains index SHA-256 `754ab3ad83bbd3af5b7f9f1f4188a076e7c9e2a306321b46bfd77d623e26819e`, with artifact/recovery details in the [November 17 session/signup release](2026-11-17-session-signup.md). Before publishing, preserve that current S3 index in this release's `frontend-previous/` folder. If recovery is needed, restore the preserved index with no-cache headers, invalidate CloudFront and verify both hosts; retain old hashed assets. Backend, Cognito configuration, schema and DNS need no rollback for this frontend-only batch. Actual rollback has not been exercised.

Source recovery uses new `git revert` commits in reverse dependency order. Avoid selectively reverting the SDK adapter, package manifest or lockfile in isolation when they depend on another upgrade; review the diff and rebuild the combined result. Do not reset shared history or delete private evidence indiscriminately.
