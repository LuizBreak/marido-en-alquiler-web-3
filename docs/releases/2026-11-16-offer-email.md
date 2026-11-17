# Branded offer email restoration — November 16, 2026

The SES migration unnecessarily replaced the original offer email with a generic notice. This release restores the existing Marido-en-alquiler banner and useful offer information, with clearer Spanish next steps inspired by the supplied HomeStars example. It does not change the marketplace or payment model.

## Result

- Quote emails contain the recipient's first name, project title, contractor name, company, phone, email, offered price and description. A plain-text alternative includes the same information. Missing profile values have readable fallbacks; the generic dollar symbol matches the current application and does not establish a currency policy.
- The server reads these details from the saved quote, project, contractor and verified recipient account. HTML values are escaped and bounded. The browser cannot supply email HTML or redirect the notification to another recipient. Existing opt-outs, rate limits and quote/message deduplication remain.
- The original banner is reused from the existing public S3 image. The old Approve/Reject buttons both linked to the Target Innovations homepage. They are replaced with **Revisar oferta**, targeting `/oferta/{quoteId}` on the application domain.
- A signed-out recipient sees a sign-in prompt without private offer details. Sign-in preserves the offer destination. The page reads the current saved quote and project, checks project ownership, and reuses the existing explicit confirmation and version-checked acceptance flow. Opening an email or its link does not accept an offer. Another account cannot review the offer through this page.
- Other message/contact notification templates remain unchanged. This does not add SMS, recommended contractors, one-click acceptance, or a rejection workflow.

Illustrative email with fictional contractor details: [preview](../previews/offer-email-2026-11-16.png).

## Commits and verification

| Repository | Commit | Change |
| --- | --- | --- |
| Backend | `6796958` | Branded HTML/plain-text offer template and database-backed content; template/SES regression tests |
| Frontend | `5d732e7` | Authenticated offer-review destination and sign-in return; ownership/session regression tests |

108 backend tests, TypeScript, 53 frontend tests, changed-file lint and production build passed. Template checks cover stored markup injection, invalid link IDs, missing values and SES HTML/text content. Frontend checks cover signed-out access, correct owner, another owner, stale responses after logout and unsafe sign-in destinations. The rendered preview was visually inspected in headless Chrome.

Both development stack updates completed; all 77 active Lambda hashes/handlers match the new artifact. Main stack remains 486 resources / 76 functions; chat remains six resources / one function; mail infrastructure is unchanged. Reviewed templates change only code artifact references and preserve roles, configuration and the authenticated handler. All 187 published frontend assets match their build hashes. Both frontend hostnames serve the new index.

Live notification acceptance passed: SES accepted the restored offer email, quote/message deduplication prevented a second submission, sender identity remained server-derived, opt-outs suppressed subsequent mail, anonymous sends were denied, and public support mail targeted hello. The user confirmed the new email arrived and its restored appearance is correct.

Using the production frontend build with live AWS and disposable accounts, Chrome verified the signed-out prompt, sign-in return to the exact offer, current saved offer display, refresh/session restoration and denial for the contractor account. No acceptance was triggered by opening the page. The remote API regression also passed provisioning, profiles, uploads and ownership denials, project/quote/message access, simultaneous acceptance, stale terms, completion and participant reviews. All SQL/Cognito/S3 fixtures from both checks were removed. The mailbox test's offer was removed after verification, so its email link intentionally no longer resolves to an existing offer.

## Deployment and recovery

Backend artifact: `repairs/email-template-20261116/backend.zip`, SHA-256 `11364acc3dbc84afaf047595e11506153f4d5277a1585087c73129145bf08cdf`.

Frontend index SHA-256: `69062026b5158bc3582f42acdde5188b43f33453edf195850e33e10812351d1a`. Old assets were retained; new source maps were not uploaded. CDN invalidation `I419I4RFMBLHVM1478KLTMA10E` completed.

Private evidence/recovery snapshots: `.deployments/email-template-20261116/`, including previous REST/chat templates and frontend index, candidate, change-set reviews, tests, secret scans, browser screenshots and deployment audits. These private files must not be committed; historical deployment/browser data may contain credentials.

Backend recovery uses the captured previous templates with the consistency release artifact (`868e168913107151b4dabbf23d43846bc12dc8e784d12c5a0084924338b4ff28`). Keep the new frontend offer route while recovering the backend: offer emails already delivered still contain those links. Republishing the previous frontend index would remove that route and break those delivered links. Restore the previous index only after considering that consequence; old assets remain available. Recovery is documented, not executed. No SQL migration, DNS change or Git push occurred.

SES acceptance is not proof of inbox delivery. The existing notification service remains best effort, without a durable retry outbox. Mail clients may block remote images. DMARC, delivery monitoring and the broader backlog remain separate work.
