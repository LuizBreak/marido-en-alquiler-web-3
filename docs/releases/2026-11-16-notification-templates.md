# Remaining notification templates — November 16, 2026

This release restores the useful branding and content of the remaining active application emails after the earlier offer-email restoration. The original banner, orange detail tables, readable Spanish text, plain-text alternatives and useful links are retained. Browser-supplied HTML is not used as an email template.

## Notification inventory

| Notification | Current behavior |
| --- | --- |
| New offer | Previously restored; unchanged by this release. Saved quote/project/contractor details and authenticated offer-review link. |
| New message | Restored banner, recipient greeting, sender name/current profile phone/account email, subject, saved message text and **Ver mensaje** link. |
| Service request | Restored project title/description/start date, client contact details, request text and **Ver solicitud** link. Subject identifies a new service request. |
| Contact inquiry | Restored banner and saved visitor name, email, phone, category, message and additional comments. Delivered to hello; Reply-To is the validated provided email. |
| Newsletter request | Branded, explicitly labeled support notification with the submitted address and request. Still requires follow-up; it does not claim automatic enrollment. |
| Referral request | Branded, explicitly labeled support notification preserving the submitted name/contact and follow-up request. It does not automatically email the referred person. |
| Welcome | The old welcome.vue template is dormant and was not replaced by the SES migration. It remains archived; no welcome automation is added. Cognito verification-code email remains unchanged. |
| emailHelper.vue | A static collection of reference examples, not an active notification path. It is not published as an email. |

The archived Vue email files remain available as historical references. Public contact/newsletter/referral forms still create saved support requests with a fixed destination. This release does not introduce visitor autoresponders, marketing lists, third-party invitations or email for live chat messages.

Previews with fictional sample data: [message](../previews/message-email-2026-11-16.png), [service request](../previews/service-request-email-2026-11-16.png), [contact](../previews/contact-email-2026-11-16.png), [newsletter support notice](../previews/subscription-support-email-2026-11-16.png), [referral support notice](../previews/referral-support-email-2026-11-16.png).

## Corrected data flow

The contractor-contact form previously submitted an entire rendered HTML email as messageBody and put a project ID into quoteId. New service requests save the actual request text, `msgType=service_request`, `quoteId=null` and a small JSON reference in the existing msgAsset column (`kind=service_request`, projectId). The server canonicalizes the reference, requires a client account, verifies an owned open project and requires a contractor recipient before saving. The notifier reads the owned project and sender's saved profile details. No database migration was necessary; actual column types were checked before deployment. Chat attachment metadata is unaffected.

Message links use `/mensaje/{messageId}`. Signed-out visitors see a sign-in prompt without private content; sign-in returns to the exact message. The server and page restrict access to message participants. The read-only page displays escaped text and links to the account's messages screen for a reply. Opening the link does not send a reply or update read status. Notification bodies are bounded and HTML-escaped, including stored input; malformed service references cannot send misleading project information. Old HTML message rows are not migrated or resent.

Sender and recipient identities remain server-derived. The verified-account requirement, opt-outs, event deduplication, rate limits, fixed application sender/support inbox and truthful save-versus-email failure feedback remain in place. Related quote messages still share the quote email event key. Support subjects come from fixed categories, not arbitrary browser subjects.

## Separate commits

| Repository | Commit | Fix |
| --- | --- | --- |
| BE | `79a79fe` | Branded message template and saved sender/content |
| FE | `100bffb` | Authenticated saved-message links and sign-in return |
| BE | `ed97f7a` | Validated service-project references and complete service email |
| FE | `ce49595` | Plain service-request submission and correct project context |
| BE | `c47249f` | Branded contact/newsletter/referral support templates |
| FE | `566a1bd` | Preserve support category and actual referral details |
| BE | `c26d68c` | Read current client/contractor profile phone for sender details |
| BE | `bb7aeac` | Clear support follow-up copy |

## Verification and deployment

120 backend and 60 frontend tests passed, including permission denials, canonical service metadata, HTML injection, sender/destination controls, invalid links, opt-outs/deduplication and stale responses after logout. TypeScript, changed-file lint and the production frontend build passed. Desktop previews and the mobile message preview were rendered in headless Chrome and visually checked. Known-secret scans passed.

Both development stack updates completed, all 77 active function hashes/handlers match the release, and existing runtime configuration is preserved. Main stack remains 486 resources / 76 functions; chat remains six resources / one function; mail infrastructure is unchanged. CDN invalidation completed.

Live SES accepted the restored message and service-request emails to the authorized Gmail inbox and the contact notification to hello. Quote/message deduplication, opt-outs, anonymous-message denial, sender derivation, service-project ownership and role checks passed. In Chrome using the production build against live AWS, verified sign-in return to the exact offer/message, current saved content, service-request display, refresh, correct account reply route and outsider denial. The published `/mensaje/{id}` route displays the signed-out prompt without private data. The full deployed API regression passed accounts/profiles, uploads and ownership denials, projects/quotes/messages, simultaneous quote acceptance, stale terms, completion and reviews. All disposable SQL/Cognito/S3 fixtures were removed.

The user confirmed both restored new-message and service-request emails arrived in Gmail and look correct. Contact delivery was SES-accepted; its inbox appearance was not separately confirmed. Test messages refer to removed fixtures and their links intentionally no longer resolve to live test records.

Artifact: `repairs/notification-templates-20261116/backend.zip`; SHA-256 `ebea2d3e41f5d2cda59d9879fcbe06e066be14de4eaa790d16eecee51127200e`. Package comparison with the previous release finds only new notification-templates.js/service-request.js and changed notifications.js/resources.js. The offer template and dependencies are unchanged.

Frontend index SHA-256 `094533ae49694457335d653df2a2008592b06db559abd5ad2458e70699d4ac97`. All 187 assets matched before publishing the index, and both frontend hostnames serve this build. Old assets were retained; new source maps were not uploaded. CDN invalidation `IXS7VMQ59OJGD2O2EN9ZZ8CF7`.

Private evidence/recovery: `.deployments/notification-templates-20261116/`, including captured previous templates/index, candidate, tests/scans, previews, reviewed change sets, package manifests and acceptance receipts. Do not commit this private directory. Recovery uses captured previous REST/chat templates with the previous offer release artifact. Keep the new frontend message route when recovering the backend: emails already delivered reference it. The previous backend can still save the new plain request/metadata fields, but lacks the additional service validation and complete service email. Backend recovery therefore removes that added validation; review that tradeoff before applying it. Avoid restoring the old form's project-as-quote-ID submission. Recovery is documented, not executed.

No SQL migration, mail DNS changes or Git push. Durable notification retries, DMARC, marketing lifecycle and broader backlog items remain separate work.
