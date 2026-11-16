# Current local FE / AWS development setup

The paired FE/BE release is deployed (November 16, 2026). From the FE repository run `npm.cmd run serve:aws` and open http://127.0.0.1:8080. The command selects the existing AWS API and API contract v2 explicitly, overriding older ignored environment values. Stop an existing process on port 8080 before starting another. Do not assume a server persists after the session closes.

All AWS resources/data were confirmed development by the user. Backend access/secret/TLS/provisioning and current verification commands are in [HANDOFF.md](HANDOFF.md) and [the release record](releases/2026-11-16-backend.md). The older setup notes below are historical where their deployment/authentication assumptions differ.

---
# Development restart guide

Reviewed November 15, 2026. Read [the P0 findings](review-report.md#p0-security-and-data-boundaries) before starting backend handlers or testing accounts/payment methods.

**Subsequent repairs:** this document records the original assessment. See [the repair log](repair-log.md) for the November 16 implementation, updated configuration, passing tests/lint and commit references. The forced-production configuration described below has been replaced; remaining findings are tracked in [the ticket ledger](asana-tickets.md).

## Current baseline

- FE: Vue 3, Vue Router 4, Vuex 4, JavaScript single-file components, Vue CLI 4/Webpack, Bootstrap/theme assets, Axios, Amplify/Cognito and AWS SDK v2.
- BE: mixed TypeScript/JavaScript, AWS Lambda/API Gateway through Serverless, mysql2 promise queries; a separate Express/Sequelize prototype also exists.
- Execution host observed during review: Node `v24.14.1`. This is a recorded test environment, not a declared supported project runtime. BE deployment configuration specifies `nodejs18.x`; align and pin local/CI/deployed runtimes as follow-up work.
- Both repositories had existing uncommitted source/lock/config changes. They were preserved. No functional application fixes, deployment or credential rotation were performed.

## Configuration reference

Keep actual values outside committed documentation. Frontend build variables are public application configuration, never a place to hide server secrets.

| Configuration | Consumer / meaning |
| --- | --- |
| `VUE_APP_ENV` | Custom FE API/environment selector; production only on exact `production` |
| `VUE_APP_BASE_URL` | FE production REST base including stage/prefix |
| `VUE_APP_DEV_BASE_URL` | FE development REST base including offline stage/prefix |
| `VUE_APP_API_MODE` | Legacy mode flag in store; does not guarantee all adapters support JSON-server versus Lambda responses |
| `VUE_APP_EMAIL_SVC_URL` | Separate email API root |
| `VUE_APP_EMAIL_INBOX` | Notification/contact mailbox configuration; inspect consumer for a requested change |
| `VUE_APP_WEB_SOCKET` | Separate native WebSocket server URL |
| `VUE_APP_SYS_LOG_LEVEL` | Enables FE activity logging when string equals `true`; currently can persist token-bearing session fields |
| Generated `src/aws-exports.js` | Amplify/Cognito configuration imported by `main.js`; exists locally during review and is Git-ignored |
| `VUE_APP_FACEBOOK_APP_ID`, Google/social settings | Legacy/partial social integrations; not evidence of an end-to-end supported login flow |
| `VUE_AWS_*` entries | Legacy configuration; current S3 helper hardcodes values. These lack Vue CLI's normal `VUE_APP_` exposure prefix, but renaming secrets to that prefix is not a remedy |
| BE `NODE_ENV` | Used by Express/Sequelize and ping; primary mysql2 helpers currently ignore it for DB selection |
| BE `src/sequelizer/config/config.json` | Actual DB configuration selected by active mysql2 helper, currently always `production` |
| BE `DB_USER`, `DB_NAME`, `DB_PASSWORD`, `DB_HOST`, `DB_DIALECT`, `PORT`, `APP_VERSION` | Names found in BE environment files; their presence does not mean all connection paths use them |

FE `.env` uses JavaScript-style block comments and blank lines that produce dotenv debug parsing warnings. Convert documentation comments to valid env-file syntax as part of configuration cleanup. Do not copy the current files into a new environment without sanitizing secrets and endpoint choices.

## Safe restart sequence

1. Record which existing working-tree changes are intentional. Preserve them before broad modernization.
2. Rotate exposed credentials and remove sensitive browser/SQL/logging paths (R01â€“R05). The BE `/ping` handler currently returns DB host, user **and password**; it must be sanitized before exposure.
3. Fix the forced-production database selection, create an isolated MySQL database, and reconcile SQL snapshots into migrations. Do not load repository data dumps into production or assume fixtures are sanitized.
4. Inventory/recover Cognito configuration, email service, WebSocket service, image storage and frontend hosting. Record resource owners and environment separation.
5. Select a supported runtime/package manager, restore dependencies reproducibly from the chosen lockfile, and record actual versions. No dependency installation/upgrades were performed by this review.
6. Configure FE with the isolated API, then exercise one complete client/contractor journey and repair the FE/BE contracts before expanding features.

## Commands

On this machine PowerShell blocks `npm.ps1`; use `npm.cmd` instead. This avoids changing machine execution policy.

### Frontend

Run from the FE root after restoring safe local configuration and generated Amplify config:

```powershell
npm.cmd ci
npm.cmd run serve
npm.cmd run build
npm.cmd run lint -- --no-fix
```

`serve` opens a browser. The plain `npm run lint` script may fix source files, so use `--no-fix` for a read-only review. Build embeds whichever values the custom environment selector chooses; verify API/environment configuration before publishing.

The original README's `json-server db.json` command is a legacy prototype option. JSON-server is not declared as a project dependency, and its response format differs from the Lambda envelope. Prefer one supported local API contract.

### Backend offline checks

From the BE root, these checks do not execute application handlers:

```powershell
node node_modules/typescript/bin/tsc --noEmit --incremental false
node node_modules/jest/bin/jest.js --listTests --runInBand
```

After local database isolation and compatible tooling are established:

```powershell
npm.cmd ci
npm.cmd run dev
```

`dev` invokes `sls offline -s dev`. The declared path prefix is `/dev/marido-backend` under the offline server's port. Do not start this against the current forced-production configuration. The separate `src/index.ts` Express server only supplies prototype root/client routes and is not what `npm run dev` starts.

No deployment command is recommended as a restart step. First identify the authoritative deployment configuration, cloud resources, environment approvals and rollback process. The old S3 sync example does not cover API/database/Cognito/email/WebSocket provisioning.

## Verification performed during this review

| Check | Result | Interpretation |
| --- | --- | --- |
| FE `npm.cmd run build -- --dest .audit-build` | Passed, two asset/entry-size warnings | Browser bundles compile using installed dependencies/local Amplify config; not a user-journey test |
| FE `npm.cmd run lint -- --no-fix` | Failed: `UNKNOWN: unknown error, read` from ESLint `readFileSync` | Filesystem/tool execution failure; no clean lint result |
| FE direct `node node_modules/eslint/bin/eslint.js src --ext .js,.vue --no-fix` | Same filesystem read failure | Narrowing to source did not resolve it; cause not established |
| BE `tsc --noEmit --incremental false` | Passed, exit 0 | Compilation check only; no DB imports/queries executed |
| BE Jest `--listTests --runInBand` | Exit 0, empty list | No discoverable tests; not a passing functional suite |
| Git status before/after | Existing modifications preserved | Review output is documentation plus FE README link; backend source untouched |

Build entrypoint was approximately **6.68 MiB uncompressed**. Vendor JS: **5910.88 KiB / 1173.71 KiB gzip**; app JS: **608.66 KiB / 173.04 KiB gzip**. Build output also reported 2â€“4 MiB image assets, outdated browser-data warnings and a sass-loader upgrade notice. Temporary review build output was removed after recording results.

No browser automation, production requests, database introspection/migrations, provider calls, real signup, email sending, payment processing, deployed-authorizer inspection or current dependency advisory lookup was performed. Dependency versions/support and cloud state must be verified separately when choosing upgrades or deploying.

## Acceptance checks to add as implementation proceeds

- Identity: signup confirmation/provisioning/retry, sign-in/out, reload/expiry, wrong-role navigation, and API ownership rejection.
- Core marketplace: create/edit/list a project; failed saves retain input; contractor offer returns a real quote ID; client notification follows persistence.
- Communication: two-account conversation isolation, ordered history, correct unread/read flags, reconnect without duplicate delivery.
- Data/contracts: zero/one/multiple rows, 404 item, generated IDs, invalid JSON/fields and migration of a fresh database.
- Delivery: static deep links, mobile layout/accessibility, safe public data, backup/restore and rollback.

These are proposed acceptance criteria, not claims that tests currently exist.
