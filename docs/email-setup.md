# Domain inbox setup — November 16, 2026

Status: **Zoho ownership TXT published and verified through public DNS. Awaiting the user clicking Verify TXT Record in Zoho, then mailbox creation and account-specific mail routing records.**

## November 16 setup progress

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

1. Have the user click Verify TXT Record on the current Zoho domain-verification screen. Signup and DNS publication are complete; Zoho-side verification is not yet confirmed.
2. Continue using the user's existing organization and observed Mail Lite subscription; do not initiate any further purchase or subscription changes.
3. Confirm domain ownership is accepted in Zoho before continuing with mailbox setup.
4. Create two users, hello and notifications, with separate logins/inboxes. The user should manage passwords and any account/phone verification in Zoho's sign-in flow; never commit passwords, codes or browser sessions.
5. Obtain the actual account/data-center-specific MX, SPF and DKIM values from Zoho. Snapshot current DNS again, prepare a record-only delta and rollback, then publish the applicable mail records without altering web records. Preserve unrelated TXT values and keep one SPF policy per DNS name. Do not guess MX/DKIM values from another data center.
6. Verify mail routing and authentication, activate the mailboxes and test sending/receiving with user-authorized test destinations. Record actual outcomes; do not claim account creation or delivery without evidence.

Application-generated notification mail remains a separate open repair. Receiving mail at notifications@ does not by itself replace the app's unavailable conch-app.com notification service.

References: [Zoho Free signup](https://mail.zoho.com/signup?plan=free&type=org), [plan limits](https://www.zoho.com/mail/zohomail-pricing.html), [domain verification](https://www.zoho.com/mail/help/adminconsole/domain-verification.html), [data-center-specific mail routing](https://www.zoho.com/mail/help/adminconsole/configure-email-delivery.html), [AWS WorkMail retirement](https://docs.aws.amazon.com/workmail/latest/adminguide/workmail-end-of-support.html).
