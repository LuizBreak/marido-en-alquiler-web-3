# Domain inbox setup — November 16, 2026

Status: **Zoho domain/mail DNS verified and mailbox setup confirmed by the user. Application notification delivery is also deployed through AWS SES; the user confirmed both live Gmail test messages arrived.** See the [notification release](releases/2026-11-16-notifications.md).

## November 16 setup progress

November 17 update: [new-registration notices](releases/2026-11-17-registration-notifications.md) go to hello@marido-en-alquiler.com, explicitly selected by the user. New verified application client/contractor accounts queue a notice transactionally; an internal one-minute schedule submits/retries them. The live client and contractor notices were SES-accepted automatically, repeat sign-in did not resend and fixtures were removed. The user supplied a Zoho Inbox screenshot confirming receipt of both client and contractor registration test notices. Sender remains notifications@ and Reply-To is the registrant's verified email. Existing inboxes/DNS and other mail paths are unchanged.

Remaining active application emails are restored through the [notification-template release](releases/2026-11-16-notification-templates.md): saved messages, complete service requests, contact inquiries and labeled newsletter/referral support notices. Current release has 120 BE / 60 FE tests and live SES/browser/API acceptance with fixture cleanup. The user confirmed both restored new-message and service-request emails arrived in Gmail and look correct. Original welcome/reference templates remain inactive; no visitor autoresponder, automatic newsletter enrollment, third-party referral email or chat email was enabled. SES/Zoho/DNS settings are unchanged.

Offer email appearance was restored after the SES migration: original banner, saved project/contractor/contact/offer details, Spanish next steps and an authenticated review link. The user confirmed the new test email looks correct. See [the restoration release](releases/2026-11-16-offer-email.md) and [preview](previews/offer-email-2026-11-16.png). Delivery/DNS settings are unchanged; current backend code is `6796958` and frontend offer-link code is `5d732e7`.

- Zoho confirmed domain ownership. User screenshots confirmed a separate hello mailbox, and the existing administrator mailbox now has notifications@marido-en-alquiler.com marked as Mailbox address. luiz.estevo@ remains an alias of the notifications mailbox. The account list still displays Luiz Estevo; changing the mailbox address does not establish that its primary account login has changed. Two licensed users are in use; no additional license was purchased by the assistant.
- Published account-provided Canada MX records: priority 10 mx.zohocloud.ca, 20 mx2.zohocloud.ca, and 50 mx3.zohocloud.ca, with TTL 300. Added `v=spf1 include:zohocloud.ca ~all` to apex TXT while retaining the ownership value. Route 53 change `C05850993GYU233OVHJXS`; Google public DNS returned all three MX values and both TXT values.
- Private artifacts: `.deployments/mail-20261116/previous/before-routing.json`, `zoho-routing.json`, and `rollback-zoho-routing.json`. Review current records before applying rollback so later TXT changes are preserved. Website/certificate/name-server records were not altered.
- Published the exact user-supplied DKIM TXT key at zmail._domainkey.marido-en-alquiler.com, TTL 300, through Route 53 change `C023837131IYMOZH7FV8W`. Node crypto successfully parsed its 1024-bit RSA public key, and the concatenated public DNS TXT response exactly matched the supplied value. Value SHA-256: `a32d62b6845cdacd1dd210d04ef370ba40a7328e65a5c639636a73766f2b4f1b`. Private artifacts: `previous/before-dkim.json`, `zoho-dkim.json`, `rollback-zoho-dkim.json`, and `expected-dkim.txt` under `.deployments/mail-20261116/`. The rollback deletes only this selector's exact TXT record.
- Zoho's screen confirmed green MX/SPF/DKIM checks. The user confirmed mailbox testing worked. Its separate ZeptoMail records are unused and were not published; application email now uses SES. No DMARC record has been published.
- The user created a Zoho organization and supplied a confirmation screen showing a paid Mail Lite 5GB annual subscription, renewing November 15, 2027. The earlier free-plan preference is superseded by this observed subscription; no subscription changes were performed by the assistant.
- Zoho supplied the Canada data-center verification value `zoho-verification=zb74880215.zmverify.zohocloud.ca` for the domain apex.
- Initially created only the apex verification TXT record with TTL 300 through Route 53 change `C01718321MU3S86ZSB66V`. A Google public DNS lookup returned the exact value. Existing website, certificate and name-server records were preserved. MX/SPF/DKIM were subsequently added as recorded above.
- Change batch: `.deployments/mail-20261116/zoho-verification.json`. Reversal: delete only this exact TXT record set, provided it still contains only the verification value. Preserve any subsequently added SPF or other TXT values.
- TinyFish installation was reported by plugin discovery, but no TinyFish browser tools were exposed in this session. The user is completing Zoho account steps directly.

The user requested two separate inboxes/logins for `hello@marido-en-alquiler.com` and `notifications@marido-en-alquiler.com`, and then requested a free provider. Zoho Mail Free was recommended; availability depends on the signup data center. Do not sign up for a paid plan or substitute forwarding/aliases for the two requested users.

## Confirmed AWS state

- Profile default, account 907823072924. Route 53 hosts the registered domain, and public name-server delegation matches its hosted zone.
- Hosted zone Z0954158GRND949DL4HE. Existing records cover name servers, SOA, certificate validation, www and dev website targets. The initial inspection had no mail records; MX, SPF and DKIM are now published as recorded above.
- Private pre-change snapshot: .deployments/mail-20261116/previous/dns.json. Preserve website/certificate/name-server records.
- SES in us-east-1 is healthy, sending-enabled and already has production access. This domain is not yet an SES sending identity. SES setup is separate from providing interactive user inboxes; it has not been changed for this request.
- No WorkMail organization was found in us-east-1. AWS WorkMail no longer accepts new customers and ends support March 31, 2027, so it was not selected for a new mailbox deployment.

## Remaining mailbox improvements

1. Add a considered DMARC monitoring/reporting policy, then assess enforcement after reviewing legitimate senders. This is separate from the completed mailbox setup.
2. Keep user-managed passwords/recovery/MFA in Zoho and preserve the existing subscription. No further purchase or account-login change was performed by the assistant.
3. Keep DNS snapshots/rollback batches. Preserve unrelated TXT values and one SPF policy per DNS name. SES uses separate Easy DKIM selectors and bounce-app MAIL FROM records; do not replace the Zoho apex routing/SPF.

The separate application-mail repair is complete through SES, without Zoho SMTP credentials or ZeptoMail. New bids and non-chat messages notify their stored recipients; support requests target hello. See the release for rate limits, user opt-outs, delivery evidence and best-effort retry limitations.

References: [Zoho Free signup](https://mail.zoho.com/signup?plan=free&type=org), [plan limits](https://www.zoho.com/mail/zohomail-pricing.html), [domain verification](https://www.zoho.com/mail/help/adminconsole/domain-verification.html), [data-center-specific mail routing](https://www.zoho.com/mail/help/adminconsole/configure-email-delivery.html), [AWS WorkMail retirement](https://docs.aws.amazon.com/workmail/latest/adminguide/workmail-end-of-support.html).
