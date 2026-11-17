# Session expiry, logout and public contractor signup — November 17, 2026

Client/contractor text chat remains deployed and previously accepted for immediate delivery, persistence, reconnect catch-up and participant authorization. This batch completes the requested session/signup acceptance work; chat attachments and full read-receipt UX remain separate backlog items.

## Changes

| Commit | Repository | Change |
| --- | --- | --- |
| `f072f09` | FE | Await Cognito logout, immediately clear private caches/chat, serialize provider operations, reject late responses from an earlier session, handle expired requests/401 and tab changes, retain safe support errors |
| `76b41a7` | FE | Match the eight-character Cognito signup policy, block double submissions, support confirmation resend/resume, retry login after successful confirmation without reusing the code, route by the verified account role |
| `4351c00` | FE | Remove development Vuex state/action logging that can expose credentials and cached tokens; retain strict development checks |
| `5224dd5` | FE | Cancel a cached-session bootstrap when another tab removes credentials before the first tab finishes restoring |
| `f143548` | BE | Add read-only account identity audit, conflict/expiry regression tests and a reconciliation runbook; no runtime changes |

Logout no longer waits three seconds before starting. It clears local auth, profiles, messages, favorites, quotes and other cached user data immediately, then waits for provider sign-out. A failed provider call leaves the local session cleared. Responses started before logout/account switching cannot restore private state. An authenticated API 401 expires the current session; an older response cannot log out a newer session. Other-tab credential changes invalidate that tab's visible session without repeatedly clearing shared Cognito storage.

The existing active-session expiry policy is retained: reaching its local deadline signs the user out. On a cached-session restore, valid Cognito refresh credentials can obtain fresh tokens before loading the profile. Focus/visibility checks catch suspended-tab expiry. This does not introduce continuous background renewal, global device logout, a token revocation registry or a change to backend JWT validity rules. Previously issued JWTs are still subject to their existing signature/expiry checks.

Public signup keeps names/role in Cognito until verified sign-in provisions SQL. Duplicate-email signup directs the user to sign in or recover the password. Unconfirmed sign-in offers a confirmation/resend path. Failed confirmation retains the form; failed login after successful confirmation retries login rather than submitting a consumed code. Successful confirmation clears its password/code fields. Confirmation email is read-only, and the verified SQL role determines the profile destination.

## Validation

83 frontend tests and changed-source lint pass; production build and candidate credential-pattern scan pass. The final cross-tab bootstrap adjustment also passed the targeted lifecycle suite. 137 backend tests and TypeScript pass. Existing bundle-size/toolchain warnings remain outside this repair.

Local browser checks used isolated contexts against the actual AWS development backend. Real SRP sign-in, authenticated reload, real Cognito refresh after expiring the local SDK token cache, cross-tab logout, reload after logout, suspended-session expiry and invalid refresh credentials all passed. The SDK cache was modified only inside the disposable browser context; no Cognito client policy, server clock or existing account was changed. Unit checks additionally cover rejected/expired writes, 401 behavior, stale responses, sign-out failure, malformed timestamps and profile-load failure.

Public contractor signup sent an actual verification email to the user's Gmail test inbox. An incorrect code was rejected; the user-supplied code completed confirmation and automatic contractor login at /profile/info, with the contractor role and cleared confirmation secrets. Case-only repeat signup was rejected by Cognito. Actual API checks against a disposable account returned 409 for duplicate email and 403 for a different bound subject. After restoration, repeated provisioning retained one contractor profile and one registration notice. Logout blocked protected contractor navigation and prompted sign-in. All disposable SQL, queue, Cognito and authenticated browser-context fixtures were removed.

The read-only historical inventory found zero normalized-email duplicate groups, zero repeated Cognito subject groups, zero blank emails and zero padded emails. No historical accounts needed merging or deletion. If future conflicts occur, sign-in fails closed and support follows BE docs/identity-reconciliation.md; this batch adds no destructive deduplication or unique-index migration.

The same seven session scenarios also passed against the published production build on www.marido-en-alquiler.com, using another disposable development client. Its account/profile/registration queue/Cognito/browser fixture was removed. A final audit check found zero remaining test accounts or orphan audit rows for this batch.

## Deployment and recovery

Frontend deployed to the existing development website/S3 bucket, retaining previous assets. All 187 public assets were checksum-verified before publishing index.html; source maps were excluded. CloudFront invalidation I1H5UJJGQ7BJ2KBV8U7YBXU9JD completed. Both www.marido-en-alquiler.com and the native CloudFront hostname serve index SHA-256 **754ab3ad83bbd3af5b7f9f1f4188a076e7c9e2a306321b46bfd77d623e26819e**. Source application revision: `5224dd5`.

Backend runtime, database schema, Cognito configuration and DNS are unchanged. The 78 active backend functions retain the registration-notification artifact documented in the preceding release; no backend deployment is necessary for the new audit/tests/docs.

Private evidence: .deployments/session-signup-20261117/, including test/build logs, identity inventories, local/published acceptance receipts, candidate manifest, prior index and CDN/public verification. Retain this ignored folder privately. Rollback publishes frontend-previous/index.html from this folder to the existing bucket as index.html with no-cache headers, then invalidates CloudFront; retained old assets support that index. Individual code fixes can also be reverted and rebuilt. No rollback was executed, and no Git push occurred.

Separately confirmed earlier on November 17: a new-client notice sent only to hello@ successfully forwarded through Zoho to luiz.break@gmail.com with the branded layout intact. Registration-email delivery is not a remaining acceptance blocker.
