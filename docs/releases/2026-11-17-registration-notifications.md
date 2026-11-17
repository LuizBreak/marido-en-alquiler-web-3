# New-registration notifications — November 17, 2026

Recipient explicitly selected by the user: **hello@marido-en-alquiler.com**.

Every newly created application client or contractor account now creates an internal registration notice. It is recorded in the same MySQL transaction as the account and role profile, then submitted by a scheduled worker. Registration does not call the email provider directly.

## Behavior

- Notification starts after verified Cognito sign-in creates the new SQL account and profile. An unconfirmed signup attempt is not a completed application registration.
- Subjects distinguish **nuevo cliente registrado** and **nuevo contratista registrado**. The branded Spanish email includes the name, email, account type, account ID and registration time in the owner's America/New_York timezone. Plain text is included; names and other values are escaped in HTML. [Fictional preview](../previews/registration-email-2026-11-17.png).
- Recipient and sender are deployment configuration, not browser input. Sender is notifications@marido-en-alquiler.com; Reply-To is the new account's verified email, allowing the owner to respond directly.
- Existing sign-ins, historical-account binding and repair of a missing role profile do not create a new-registration notice. Old accounts are not backfilled. This is an internal notice, not the dormant customer welcome automation.
- The notice is inserted before the account/profile transaction commits. Failed profile creation rolls back the registration and notice together. A unique account key prevents duplicate queue rows under retries/concurrency.

## Delivery and limits

The internal schedule runs every minute, normally producing a notice within about a minute after registration. Each invocation processes at most ten due notices, for up to 45 seconds of work, with reserved concurrency one. Larger bursts wait in the queue rather than hitting the existing shared-inbox limit used by other notification types.

On submission failure the notice remains pending with exponential backoff, starting at one minute and capped at six hours between attempts. Leases last five minutes and can be reclaimed after an interrupted worker. Claim tokens prevent stale workers from acknowledging another claim. Normal repeat login does not resend an accepted notice.

The queue provides durable, at-least-once submission, not mathematically exactly-once delivery: a provider timeout or crash after SES accepts but before the database acknowledgement can cause a duplicate on retry. `status=sent` means SES accepted the email, not proof of inbox placement. Failures emit safe event-ID logs and feed the existing mail-failure metric/alarm; that alarm still has no notification destination. Queue retention/account-deletion handling remains part of lifecycle operations. Other application email paths remain best effort and are not migrated to this queue.

## Schema and infrastructure

Additive migration: BE migrations/20261117-registration-notifications.sql. It creates the InnoDB registration_notifications table with one row per account, a due-work index, bounded snapshot fields, lease/attempt state and provider acknowledgement. It does not alter existing account/profile tables or populate historical accounts. The guarded migration script validates the development AWS account and table shape/index/engine through the existing administrator-secret helper. App/worker database access uses the existing DML-only application secret.

The mail stack grows from six to twelve resources: a scheduled Lambda, execution role, log group, schedule, invoke permission and failure metric filter. Its IAM policy restricts SES sender to notifications@ and recipients to hello@; database-secret access is restricted to the application secret. It has no HTTP endpoint. Main REST remains 486 resources / 76 functions and authenticated chat remains six resources / one function. There are now **78 active Node 24 functions** sharing the release artifact. Existing roles and mail/chat flows are preserved. No frontend build or DNS change is required.

## Separate commits and validation

| Backend commit | Change |
| --- | --- |
| `188a788` | Additive queue migration and guarded migration tool |
| `4e4e3da` | Transactional notice, worker, branded template, tests and disposable-fixture cleanup |
| `55fba25` | Scoped registration-worker release generator |
| `474f307` | Repeatable automatic-delivery/concurrency acceptance script |

134 backend tests and TypeScript passed. New cases cover both account types, trusted claim data, transaction order, profile/queue failure rollback, ordinary/legacy sign-in, disabled feature, escaped email content, fixed recipient, bursts, retries and ambiguous acknowledgements. The preview was rendered and visually inspected. Existing frontend application code is unchanged; its 60-test baseline remains applicable.

The additive schema was applied and verified. All three stack updates completed; all 78 active runtime hashes/handlers/configuration values match. IAM simulation allowed hello@ delivery and denied an unrelated recipient. Runtime package comparison finds only new registrationNotificationsController.js/registration-outbox.js and changed accountsController.js/notification-templates.js; dependencies and the other notification implementations are unchanged. Known-secret scans passed.

Live acceptance passed with disposable verified client and contractor accounts. Concurrent first provisioning produced one account, role profile and queue row per role despite conflicting browser-supplied recipient/role fields. The real one-minute schedule submitted both emails to SES on their first attempt, without a manual worker invocation. Later sign-in left queue counts, attempts and provider IDs unchanged. All fixture accounts, profiles, queue rows and Cognito users were removed. The user supplied a Zoho Inbox screenshot confirming receipt of both client and contractor registration test notices. The screenshot shows both subjects in the Inbox; message-body appearance was not separately reviewed by the user.

## Evidence and recovery

Artifact: repairs/registration-notices-20261117/backend.zip, SHA-256 **0ffcaf7456eed1409255be758feef15a039bddbf6e51892263a7d6effd3f5094**. Private evidence: FE .deployments/registration-notices-20261117/, with previous REST/chat/mail templates, generated templates, change-set reviews, migration/schema evidence, tests, package/audit results and live acceptance receipt. Do not commit the private directory.

For delivery problems, retaining account enqueueing preserves notices while the worker is repaired. The schedule can be paused without deleting queued events, then re-enabled to process due notices. Disabling REGISTRATION_NOTIFICATIONS_ENABLED stops creating notices for registrations during that period and should be an explicit recovery choice.

Full recovery uses the previous captured REST/chat/mail templates and prior notification-template artifact. Restore the prior account trigger, remove/disable the new scheduled worker before configuring code that lacks its handler, and keep the queue table/data for later recovery. The retained registration log group may require resource import if the stack resource is later recreated. Do not drop the queue as part of a routine code rollback, weaken credentials, or re-enable anonymous chat. Recovery is documented, not executed. No Git push.

Repeat live verification from the backend with scripts/verify-registration-notifications.cjs <absolute release directory> --development-fixtures. It creates two disposable verified Cognito/application accounts, checks concurrent provisioning and subsequent sign-in, waits for the real schedule, records SES provider IDs and removes its own SQL/Cognito fixtures. It intentionally sends two notices to the authorized hello@ inbox.
