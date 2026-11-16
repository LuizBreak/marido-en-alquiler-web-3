# AWS deployment readiness

Assessed November 16, 2026. **The current backend batch is not ready for a direct replacement of the working AWS service.** No deployment, cloud configuration change or schema migration was performed by this assessment.

## Verified local facts

| Item | Finding |
| --- | --- |
| Current FE | Local development server uses `0011dt1689.execute-api.us-east-1.amazonaws.com/dev/marido-backend`; the user confirmed client-profile saving after the FE identity fix |
| BE candidate | Branch `main`, commit `b2b03cb`, tracked working tree clean |
| Deployment manifest | Service `marido-backend`, region `us-east-1`, runtime `nodejs18.x`, 76 declared handlers, no explicit stage or Lambda environment configuration |
| Cached deployment metadata | Service `marido-backend`, stage `dev`, 75 functions, no Lambda environment variable keys in the cached template. This is historical local metadata, not a live AWS inventory |
| AWS access | No CLI profile or AWS credential environment values found; `aws sts get-caller-identity` returned `NoCredentials`. The active AWS account/stack cannot yet be verified |
| Tests | Earlier isolated checks passed: 30 BE tests and TypeScript; 22 current FE tests. These do not establish live DB/schema compatibility |

`dev` is only a stage name. Treat the current endpoint and database as potentially live until the account, stack and database are positively identified.

## Blockers before replacing the existing backend

1. **Database runtime configuration:** Revised code requires environment-supplied `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` (and optional `DB_PORT`) and appropriate `NODE_ENV`. The manifest does not provision them. Existing live configuration is unknown. Production credentials must come from a reviewed secret/runtime configuration process; never restore embedded credentials to make deployment work.
2. **Schema compatibility:** SQL snapshots have not been compared to the real database. For example, account creation strips legacy token fields, while the accounts snapshot declares several of those columns `NOT NULL` without defaults. Profile/registration fields and case differences also need reconciliation. Passing mocked SQL tests does not validate actual inserts.
3. **FE/BE compatibility:** The new account creation result and explicit composite favorite deletion route require version coordination. The hosted FE version is unknown. The serialized `body` compatibility alias alone does not guarantee every old consumer works with new object/ID shapes.
4. **Runtime and packaging:** Node 18 is listed as deprecated by AWS. Select a currently supported runtime and verify it with the installed Serverless 4.12.0, TypeScript plugin 2.1.0, offline plugin 8.3.1 and dependency bundle. Inspect the actual deployment ZIP/template for required modules and absence of secrets before release.
5. **Security scope:** The local batch improves input handling but does not implement complete JWT/ownership enforcement or replace raw card/CVC handling. A broad release is not a security-completion milestone. Decide whether to defer/disable unsafe routes or address these before exposing them to real users.
6. **Rollback:** Current deployed code, environment/configuration and deployment artifacts have not been captured. No known-good version/alias or Serverless rollback deployment has been verified. Code rollback does not undo schema/data changes.

## Proposed release sequence

1. Connect the intended AWS account through the normal AWS CLI/SSO sign-in flow. Verify identity and region using read-only commands; do not paste secret keys into chat or reuse the exposed application credentials.
2. Inventory the live API, CloudFormation stack, Lambda versions/configuration, database network access and deployed FE. Compare it with the local manifest and historical artifacts. Read existing error logs rather than sending diagnostic writes to real records.
3. Capture a known-good deployment/rollback reference and verify database backup/restore arrangements before any schema changes. Store operational secrets outside the repository.
4. Prepare a reviewed deployment configuration with explicit target stage/account/region, supported runtime, secret-backed database settings and artifact exclusions. Keep each source fix in its own commit.
5. Provision a separate staging API **and an isolated staging database**, with appropriately sanitized data. A separate Lambda stage pointed at the live DB does not provide isolation.
6. Deploy the candidate to staging and run real FE/BE checks: registration, login/reload, profile update, project/quote lifecycle, favorites, messages/unread counts, errors/CORS and retained input after failure. Verify compatibility with the FE versions that will remain in use.
7. Produce the actual target/artifact/change summary, validation evidence and tested rollback commands for review. Apply only that reviewed release to the working environment, with a defined observation/rollback window. Limit the first release scope where practical.

No deployment command should be run against the current service merely because the local tests pass or the URL contains `/dev/`.

## Reference documentation

- [Serverless packaging](https://www.serverless.com/framework/docs/providers/aws/guide/packaging)
- [Serverless build configuration and Lambda environment declarations](https://www.serverless.com/framework/docs/providers/aws/guide/building)
- [Serverless rollback](https://www.serverless.com/framework/docs/providers/aws/cli-reference/rollback)
- [AWS Lambda runtime lifecycle](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html)
- [AWS Lambda function versions](https://docs.aws.amazon.com/lambda/latest/dg/configuration-versions.html)

Runtime dates, provider/tooling requirements and cloud state must be checked again when executing the release.
