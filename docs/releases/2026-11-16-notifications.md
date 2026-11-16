# Application notification email — November 16, 2026

Deployed. AWS SES replaces the unavailable conch-app.com mailer. The user confirmed that both live application test emails arrived in Gmail. Zoho continues hosting the separate hello and notifications inboxes; Zoho's MX/SPF/DKIM checks are green and the user confirmed the mailbox setup works.

## Behavior

- New quotes trigger fixed Spanish notices to the saved project's owner. Non-chat messages notify the saved recipient. The backend chooses addresses from bound Cognito accounts; browser recipient addresses, sender identities, subjects and HTML do not control these emails.
- Public contacts are saved first, then sent only to hello@marido-en-alquiler.com, with a validated visitor reply-to. Booking/referral forms use the same owned contact endpoint. Newsletter requests are stored support requests, not automatic mailing-list enrollment.
- Sender: notifications@marido-en-alquiler.com. Normal reply-to/support: hello@marido-en-alquiler.com. Lambda roles authorize SES; no SMTP/Zoho password or provider key enters the browser.
- ImmediateNotification=0 suppresses quote/direct-message email. Chat messages do not send email. Existing direct-contact permissions remain unchanged.
- DynamoDB atomically reserves each event and limits attempts to 10 per actor and 5 per recipient per 15-minute bucket. A quote and its legacy saved notification-message share one event key. Event reservations expire after seven days; hashed counters after an hour. Failed SES submissions release reservations, while counters remain consumed.
- SQL saves succeed independently of mail/state-service failures; notificationFailed reports the separate failure. Deduplication is best effort, not an outbox or exactly-once delivery. There is no automatic resend worker. Crashes, ambiguous SES timeouts and failed ledger updates remain operational limitations.
- Quote acceptance/completion emails, newsletter automation, DMARC, application bounce/complaint workflows and durable retries are not implemented here. Payment writes remain disabled. No SQL migration.

## AWS configuration

Account 907823072924, us-east-1, all development. REST stack marido-backend-dev retains 486 resources / 76 functions; chat retains six resources / one function. New marido-mail-dev has six resources: retained TTL state table, scoped mail role, three failure metric filters and a CloudWatch alarm. The alarm has no notification destination.

Only addQuote, addMessage and createContactUsMsg receive notification configuration/permissions. Quote/contact use a dedicated role scoped to their logs, app DB secret, state table and SES domain/from address. The existing message publisher role gains mail permissions; the socket role does not.

SES domain identity is verified, with 2048-bit Easy DKIM and verified custom MAIL FROM bounce-app.marido-en-alquiler.com; sends reject if that MX verification fails. Route 53 change C0442879G70N1MUMVXWR adds three SES CNAMEs and bounce-app MX/SPF. All existing Zoho, website, NS and certificate records were preserved exactly. No ZeptoMail or DMARC records were added.

Artifact: repairs/notifications-20261116/backend.zip, SHA-256 5f0ff4369e8628a63eeaffd290ac67c3473712bd42986282dc8e9f13ef047382. All 77 active functions match and use Node 24. The old anonymous chat Lambda stays disabled. Chat change set notifications-20261116 and REST notifications-20261116-rest completed. Additional method/permission entries were dynamic ARN dependencies; their definitions and function names were unchanged.

All 187 frontend asset checksums passed before index publication. Old assets were retained, source maps excluded, CloudFront invalidation completed, and both www/native hostnames serve index SHA-256 ee6b1b78a76150c231f88cc6468e5dc0a52e49dcdc983499b38088be390a2539.

## Verification and commits

94 backend tests, TypeScript, 49 frontend tests, lint of 76 changed source files, production build and packaged known-secret scan passed. Existing size/dependency findings remain open.

Live isolated accounts verified saved-quote email, direct-message email, quote/message deduplication, recipient opt-out, server-derived sender, anonymous rejection and fixed-destination public contacts. SES accepted two emails to authorized Gmail plus aliases and one to hello. The user confirmed both Gmail messages arrived; receipt of the separate support message in hello was not independently confirmed. SES acceptance alone does not prove inbox placement.

The existing remote regression passed provisioning/ownership, profiles/photos, projects/quotes/favorites/messages, concurrent acceptance, completion/reviews and public projections. Regression profiles explicitly opt out of email. Temporary SQL rows, Cognito users and notification event rows were removed; shared hashed rate counters expire normally rather than deleting counters possibly used by legitimate traffic.

| Change | Commit |
| --- | --- |
| SES runtime client and matching lockfiles | BE c719d44, 675945e |
| Persisted-event mail, fixed recipients, preferences, limits and tests | BE babb752 |
| Managed mail stack and scoped release templates | BE 7017d2a |
| Repeatable live notification acceptance/cleanup | BE 2081242 |
| Backend results without duplicate browser mail | FE 0cacc41 |
| Owned support API and accurate save feedback | FE 5cfacc6 |

scripts/prepare-notification-release.cjs is migration-specific for this release and uses captured pre-mail REST/chat templates; do not replay it against the current deployed stack. Future code releases should preserve current templates/roles and change artifact references deliberately. scripts/build-release.cjs allowlists the SES client. Repeatable scripts/verify-notifications.cjs requires a release directory, --development-fixtures and --inbox luiz.break@gmail.com; it intentionally sends test messages and cleans up its fixtures. Never print ignored administrator configuration or tokens.

## Evidence and recovery

Private evidence: .deployments/notifications-20261116/ (previous templates/index, changesets, artifacts/manifests, notification-acceptance.json, deployed-audit.json, asset-verification.json and public-verification.json). DNS evidence/rollback: .deployments/mail-20261116/. No credentials, tokens or private artifacts were committed; no Git push.

Restore the captured previous REST/chat templates and their artifact references to undo application sending while retaining authenticated chat and restricted DB credentials. Restore the previous frontend index and invalidate CloudFront; the earlier frontend's email integration will again be unavailable. This recovery was captured, not executed.

Do not delete the mail stack while REST imports its role/table. State has Retain policies; do not wipe event/rate metadata during rollback. SES DNS has a separate exact-record rollback batch, rollback-ses-dns.json; application rollback normally does not require removing it or touching working Zoho inboxes.

Next: moderation/business-state denial coverage, coordinated account deletion, pagination/orphan photos, alert destinations and durable retry if required. Cancellation/reassignment and payments still need product decisions.
