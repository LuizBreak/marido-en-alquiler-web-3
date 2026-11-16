# Backend CRUD consistency — November 16, 2026

Status: deployed and verified. Both stack updates completed, all 77 active function hashes/handlers match, and live regression/cleanup passed.

The `/clientes` compatibility route now points directly to `src/controllers/clientsController.getClients`, exactly like the canonical `/clients` list. Both use the shared `resourceHandlers("clients")` implementation and pooled mysql2 queries. The historical Lambda/logical name getClientFromController is retained to avoid changing URLs or replacing resources. Authentication, administrator-only list access, response envelopes and limits are unchanged.

## Removed and consolidated

- Removed the forwarding clientSqlController, three unused Sequelize model files, the unused Express app/entry point, and nodemon configuration.
- Removed direct sequelize, express, @types/express and nodemon dependencies; npm removed 86 installed packages. Both lockfiles were updated. Whole-repository npm findings changed from 59 to 56; unrelated dependency findings remain. Sequelize was already excluded from the allowlisted Lambda artifact, so this is principally a consistency/maintenance cleanup.
- Removed the wrapper from the release builder and obsolete TypeScript include/path entries. Serverless packaging excludes the entire old Sequelize directory, including any ignored historical local configuration.
- Verification scripts now use `scripts/verification-database.cjs`, non-secret `scripts/development-target.json`, and the existing administrator secret `marido/dev/database`. The helper validates AWS account/region/development target, loads the password only into memory, rejects missing/malformed secrets, and redacts CLI/provider failures. Application Lambdas still use their separate DML-only secret; their IAM permissions are unchanged.
- Existing ignored configuration and private historical releases were preserved for recovery; no current application/verification code reads the Sequelize configuration. Historical documentation/examples and protective exclusion patterns may still mention it.

## Commits and validation

| Change | Backend commit |
| --- | --- |
| Verification credentials from Secrets Manager and target/error checks | cbb9e2f |
| Shared client handler, prototype removal and compatibility tests | b185c57 |
| Unused direct dependencies and matching lockfiles | 1cf5d6c |

104 backend tests and TypeScript passed. New tests cover expected-account verification, malformed secrets, secret-safe errors, both list paths' anonymous/invalid/non-admin/admin outcomes and oversized limits. Packaged secret/legacy-runtime checks passed. Comparing every packaged file with the previous notification release found exactly one removed wrapper and no added or changed runtime files/dependencies. No frontend application source changed; its prior 49-test/build acceptance remains applicable.

Deployed artifact: repairs/consistency-20261116/backend.zip, SHA-256 868e168913107151b4dabbf23d43846bc12dc8e784d12c5a0084924338b4ff28. REST remains 486 resources / 76 functions, chat remains six resources / one function, and the mail stack is unchanged. Both consistency-20261116 change sets completed. Reviewed templates change only artifact references and the compatibility handler, preserving roles/environment/configuration. No SQL migration, mail DNS change or frontend deployment occurred.

Live AWS acceptance verified both client-list URLs return 401 without identity and 403 to a normal verified client; administrator success/limits are covered by the shared-handler tests. Core remote regression passed provisioning/identity, own profiles, photos and unsafe-upload denials, projects/quotes/favorites/messages, simultaneous quote acceptance, completion/reviews and public projections. All disposable SQL/Cognito/S3 fixtures were removed through the new secret-backed verification configuration. Application mail/chat code is byte-for-byte unchanged; no new Gmail notification acceptance was necessary.

## Evidence and recovery

Private evidence: .deployments/consistency-20261116/ (captured previous REST/chat templates, candidate/artifact, changesets, settings, preflight.json and artifact-diff.json). Current handler source is serverless.yml plus clientsController.ts/resources.ts; deployments preserve the existing hardened CloudFormation templates rather than replaying old migration scripts.

Rollback uses the previous artifact and `rollback-rest-template.json`, paired with the captured previous chat template. The REST recovery template deliberately keeps the new direct handler: it exists in both artifacts and avoids configuring a removed wrapper before the old code is restored. Keep the authenticated chat handler, disabled anonymous handler, mail roles and restricted DB credentials. Recovery is prepared, not executed. Git reversals should restore removed source/dependencies in reverse order; do not restore the ignored credential file as an active test configuration.

Remaining R17 work includes other unused mysql2 examples/helpers, schema/migration consistency and broader infrastructure/configuration consolidation. Other product/security/operations backlog items remain open. No Git push.
