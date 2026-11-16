# Domain inbox setup — November 16, 2026

Status: **Zoho domain ownership verified; two mailbox users configured in Zoho. Canada MX and SPF records published and verified in public DNS. Awaiting the copied mailbox DKIM public key and end-to-end mail checks.**

## November 16 setup progress

- Zoho confirmed domain ownership. User screenshots confirmed a separate hello mailbox, and the existing administrator mailbox now has notifications@marido-en-alquiler.com marked as Mailbox address. luiz.estevo@ remains an alias of the notifications mailbox. The account list still displays Luiz Estevo; changing the mailbox address does not establish that its primary account login has changed. Two licensed users are in use; no additional license was purchased by the assistant.
- Published account-provided Canada MX records: priority 10 mx.zohocloud.ca, 20 mx2.zohocloud.ca, and 50 mx3.zohocloud.ca, with TTL 300. Added `v=spf1 include:zohocloud.ca ~all` to apex TXT while retaining the ownership value. Route 53 change `C05850993GYU233OVHJXS`; Google public DNS returned all three MX values and both TXT values.
- Private artifacts: `.deployments/mail-20261116/previous/before-routing.json`, `zoho-routing.json`, and `rollback-zoho-routing.json`. Review current records before applying rollback so later TXT changes are preserved. Website/certificate/name-server records were not altered.
- Mailbox DKIM host is zmail._domainkey; the public key must be copied from Zoho before publication to avoid transcription errors. The DNS Mapping screen also displays separate ZeptoMail transactional records; those have not been published and application-generated mail remains a separate task.
- The user created a Zoho organization and supplied a confirmation screen showing a paid Mail Lite 5GB annual subscription, renewing November 15, 2027. The earlier free-plan preference is superseded by this observed subscription; no subscription changes were performed by the assistant.
- Zoho supplied the Canada data-center verification value `zoho-verification=zb74880215.zmverify.zohocloud.ca` for the domain apex.
- Created only the apex TXT record with TTL 300 through Route 53 change `C01718321MU3S86ZSB66V`. A Google public DNS lookup returned the exact value. Existing website, certificate and name-server records were preserved. Mail routing has not been configured.
- Change batch: `.deployments/mail-20261116/zoho-verification.json`. Reversal: delete only this exact TXT record set, provided it still contains only the verification value. Preserve any subsequently added SPF or other TXT values.
- TinyFish installation was reported by plugin discovery, but no TinyFish browser tools were exposed in this session. The user is completing Zoho account steps directly.

The user requested two separate inboxes/logins for `hello@marido-en-alquiler.com` and `notifications@marido-en-alquiler.com`, and then requested a free provider. Zoho Mail Free was recommended; availability depends on the signup data center. Do not sign up for a paid plan or substitute forwarding/aliases for the two requested users.

## Confirmed AWS state

- Profile default, account 907823072924. Route 53 hosts the registered domain, and public name-server delegation matches its hosted zone.
- Hosted zone Z0954158GRND949DL4HE. Existing records cover name servers, SOA, certificate validation, www and dev website targets. At inspection there were no MX, SPF, DKIM or DMARC records.
- Private pre-change snapshot: .deployments/mail-20261116/previous/dns.json. Preserve website/certificate/name-server records.
- SES in us-east-1 is healthy, sending-enabled and already has production access. This domain is not yet an SES sending identity. SES setup is separate from providing interactive user inboxes; it has not been changed for this request.
- No WorkMail organization was found in us-east-1. AWS WorkMail no longer accepts new customers and ends support March 31, 2027, so it was not selected for a new mailbox deployment.

## Required next steps

1. Obtain the exact copied DKIM TXT value for zmail._domainkey from Zoho and publish it in Route 53. Domain verification and mailbox creation are complete.
2. Continue using the user's existing organization and observed Mail Lite subscription; do not initiate any further purchase or subscription changes.
3. Have the user verify the published records in Zoho's DNS Mapping screen after DKIM is added.
4. Verify separate access to the hello and notifications inboxes. The user should manage passwords and any account/phone verification in Zoho's sign-in flow; never commit passwords, codes or browser sessions.
5. Obtain the actual account/data-center-specific MX, SPF and DKIM values from Zoho. Snapshot current DNS again, prepare a record-only delta and rollback, then publish the applicable mail records without altering web records. Preserve unrelated TXT values and keep one SPF policy per DNS name. Do not guess MX/DKIM values from another data center.
6. Verify mail routing and authentication, activate the mailboxes and test sending/receiving with user-authorized test destinations. Record actual outcomes; do not claim account creation or delivery without evidence.

Application-generated notification mail remains a separate open repair. Receiving mail at notifications@ does not by itself replace the app's unavailable conch-app.com notification service.

References: [Zoho Free signup](https://mail.zoho.com/signup?plan=free&type=org), [plan limits](https://www.zoho.com/mail/zohomail-pricing.html), [domain verification](https://www.zoho.com/mail/help/adminconsole/domain-verification.html), [data-center-specific mail routing](https://www.zoho.com/mail/help/adminconsole/configure-email-delivery.html), [AWS WorkMail retirement](https://docs.aws.amazon.com/workmail/latest/adminguide/workmail-end-of-support.html).
