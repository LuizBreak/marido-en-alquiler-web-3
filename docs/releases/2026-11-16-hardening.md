# Runtime, credentials and photo upload release — November 16, 2026

Status: **Deployed and verified** in AWS development. This release follows [the earlier backend repair](2026-11-16-backend.md) and supersedes its current-state/rollback instructions where credentials and runtime compatibility differ.

## Released behavior

- All 76 functions use Node 24 and the same verified artifact. Existing framework/plugin versions were preserved; targeted runtime library upgrades include MySQL 3.24.6 and AWS clients 3.1169.0. Compatible Express/Sequelize updates were also applied to legacy prototype dependencies.
- The app uses a DML-only database account and resource-scoped secret access. The exposed upload IAM key is inactive and the administrator password was rotated. See [the credential record](2026-11-16-credentials.md).
- Authenticated `POST /uploads` signs a two-minute S3 POST grant for an exact `users/<account-id>/<uuid>.jpg|png` key. Caller-supplied paths are ignored. S3 enforces JPEG/PNG metadata and the 8 MB maximum; changed image references must match their owner and pass object-size/type/header checks.
- Avatar saves update account and client/contractor profile in one transaction. Clients, contractors and projects save the server-generated key instead of the local filename. Existing unchanged legacy references still work.
- Browser uploads use the grant without browser AWS credentials or the deprecated AWS SDK v2. The image bucket's public-read behavior was retained: these are public profile/project photos, not private document storage. POST CORS is limited to the app/CDN and local development origins; public GET/HEAD remain supported.

The vendor bundle decreased from about 5.74 MiB to 2.20 MiB, and the raw initial entry point from about 6.64 MiB to 3.10 MiB. This is a build-size comparison, not a browser performance benchmark. Large images/bundle warnings remain.

## Source checkpoints and cloud targets

| Change | Commit |
| --- | --- |
| Runtime dependency upgrades | BE `059fe2d` |
| Owner-bound grants, image checks and avatar transaction | BE `bbd6f69` |
| Node 24/configuration, upload endpoint and credential rollout | BE `0f92330` |
| JPEG and avatar rollback regression checks | BE `88a064b` |
| Integration harness sequencing/readability correction | BE `7cfdc34` |
| Explicit compatible rollback verification | BE `701a3e9` |
| Browser grants, generated keys and SDK removal | FE `a519b5e` |

Commits are local; nothing was pushed. Backend stack `marido-backend-dev`, API `0011dt1689`, stage `dev`; website/bucket `www.marido-en-alquiler.com`; CloudFront `EI5JEIS37I445`. CLI profile `default`, region `us-east-1`, account `907823072924`.

Change sets `hardening-20261116` and `hardening-final-role-20261116` completed. The second template differs only by removal of the administrator-secret grant; CloudFormation also lists function/API permission dependencies. The stack has 486 resources of the 500-resource limit; consolidate before adding many more handlers/resources.

## Artifacts and verification

Ignored release directory: `.deployments/hardening-20261116T122519Z/`.

- `previous/template.json`, `previous/backend.zip`, `frontend-previous/index.html`, `previous-image-cors.json`: captured previous state.
- `candidate/`, `backend.zip`, `candidate-template.json`, `settings.json`, `artifact-manifest.json`: current application and non-secret deployment settings.
- `app-credential.json`, credential rotation receipts, effective-role probe result and deployed function/stack/public-index/CDN receipts: sanitized evidence.
- `rollback-candidate/`, `rollback-backend.zip`, `rollback-template.json`: compatible previous-application rollback. The raw old MySQL artifact cannot be reused after rotation.

Backend artifact: `s3://marido-backend-dev-serverlessdeploymentbucket-5sj6xbn6dupm/repairs/hardening-20261116T122519Z/backend.zip`.

SHA-256: `dc7c21af42310cce56d634eab41da57e19826e4588e1cf9f5ea9d243e16a3190`.

FE index SHA-256: `7b7e3cd447a77c3021e089c91078218a6ba164d1b2588410c89fb9315eef6834`.

CloudFront invalidation `IBQG3DK9KASOVNV19AI80HRI1J` completed. Both public hostnames returned the exact new index. All 187 uploaded asset checksums matched before index publication; no old assets were deleted and source maps were excluded.

Validation passed:

- 55 BE unit tests, TypeScript, 30 FE tests, changed-source lint and FE build.
- Known-secret scans of release artifacts. Backend production-dependency audit findings fell from 36 to 8; none of the reported vulnerable dependency paths is included in the allowlisted Lambda package. Findings remain in unused prototype/development dependencies; the complete repository is not vulnerability-free.
- Real Cognito SRP, both account/profile roles, retry-safe provisioning, long email, text saves, authorization failures, projects/quotes, favorites, messages/unread transitions, inquiry/audit writes and API preflights.
- Real S3 upload/display and both profile avatars plus project images. Unauthenticated grants, unsafe MIME, cross-account references, tampered keys, oversized object submissions and invalid image bytes were rejected as expected.
- All temporary SQL records, Cognito users and S3 objects were removed. The credential-permission probe function was removed. The compatible previous-application rollback also passed disposable core flows against the restricted database account.
- Final stack UPDATE_COMPLETE, 76 matching artifact hashes, Node 24 and application-principal configuration, real administrator-secret denial, old administrator password rejection and retired AWS key status verified.

The first image integration attempt had a harness placement error; it was fixed in `7cfdc34` before the successful live acceptance. No application rollback or existing-user diagnostic save occurred. API/S3/component acceptance does not replace full browser/user journey acceptance.

## Rollback and recovery

Use the prepared compatible rollback, which restores prior application behavior while retaining current supported libraries/runtime and restricted credentials. It intentionally does not revive exposed credentials. Its artifact and template are already in the backend deployment bucket.

```powershell
aws cloudformation create-change-set --stack-name marido-backend-dev --change-set-name rollback-hardening-20261116 --change-set-type UPDATE --template-url https://marido-backend-dev-serverlessdeploymentbucket-5sj6xbn6dupm.s3.us-east-1.amazonaws.com/repairs/hardening-20261116T122519Z/rollback-template.json --capabilities CAPABILITY_NAMED_IAM --region us-east-1 --profile default
aws cloudformation describe-change-set --stack-name marido-backend-dev --change-set-name rollback-hardening-20261116 --region us-east-1 --profile default
# After checking CREATE_COMPLETE and the concrete changes:
aws cloudformation execute-change-set --stack-name marido-backend-dev --change-set-name rollback-hardening-20261116 --region us-east-1 --profile default
# Check stack completion/API before switching the paired frontend:
aws cloudformation describe-stacks --stack-name marido-backend-dev --region us-east-1 --profile default --query 'Stacks[0].StackStatus'
aws s3 cp '.deployments/hardening-20261116T122519Z/frontend-previous/index.html' s3://www.marido-en-alquiler.com/index.html --content-type text/html --cache-control 'no-cache,max-age=0,must-revalidate' --profile default --only-show-errors
aws cloudfront create-invalidation --distribution-id EI5JEIS37I445 --paths '/*' --profile default
```

Check every command for success. Old assets remain available. Restoring the previous image CORS configuration, if needed, uses `aws s3api put-bucket-cors --bucket marido-image-bucket --cors-configuration file://.deployments/hardening-20261116T122519Z/previous-image-cors.json --profile default`. Do not restore older secret values or activate the retired key. The new database user/secret can remain unused after rollback. No application schema migration was performed; credential/grant changes are recorded separately. Stack rollback was prepared and its application tested, not actually executed.

## Remaining work

Complete browser registration/confirmation and the whole project/quote acceptance journey, atomic quote acceptance, actual email/WebSocket delivery, coordinated account deletion, pagination, orphan-image cleanup/replacement retention, recurring credential rotation, CI/monitoring/restore exercises, prototype/build-tool dependency cleanup and infrastructure consolidation. Payments still require a model/provider decision; raw payment/milestone writes remain disabled.

References: [AWS supported runtimes](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html), [S3 POST policy conditions](https://docs.aws.amazon.com/AmazonS3/latest/developerguide/sigv4-HTTPPOSTConstructPolicy.html), [RDS password changes](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ModifyInstance.Settings.html).
