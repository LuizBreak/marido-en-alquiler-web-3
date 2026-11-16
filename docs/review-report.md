# FE/BE discrepancies, suggestions and improvements

Assessment date: November 15, 2026. Scope and verification limits: [documentation index](README.md). FE paths refer to this repository; BE paths refer to `../marido-en-alquiler-backend`.

## Overall assessment

The product has a substantial marketplace UI and CRUD foundation, but the checked-in code is not ready for a reliable public launch. The main work is securing identity/data boundaries and repairing workflows across FE and BE. A successful frontend compilation and backend type check do not establish correct API behavior.

Priority meanings: **P0** address before public use or handling real user/payment data; **P1** required for a dependable core journey; **P2** maintainability, performance and operational improvements. Findings are source-confirmed unless explicitly labeled as proposals or verification gaps. Severity reflects the implementation as written; deployed exposure and credential validity were not tested.

## P0: security and data boundaries

### R01 — Credentials committed in application source/configuration

**Evidence:** FE `src/services/s3.services.js` defines an AWS access key and secret, constructs `S3` with them and is re-exported by `src/services/index.js`. FE `.env` is tracked. BE `.env`, `.env.development`, `.env.production` and `src/sequelizer/config/config.json` are tracked; database helpers contain/select credentials.

**Impact:** Browser code and repository history cannot protect long-lived AWS secrets. The credential validity and AWS permissions are unknown; moving them into `VUE_APP_*` variables would still put them in browser code.

**Recommended work:** Revoke/rotate the exposed credentials, inspect relevant AWS access history, remove secret material from tracked code/configuration and coordinate history cleanup where appropriate. Use backend-authorized presigned uploads or scoped temporary credentials. Commit sanitized configuration examples only.

**Done when:** No long-lived AWS/database secret is shipped to the browser or tracked in current source; old credentials are invalidated and replacement permissions are scoped. Secret scanning covers both repositories.

### R02 — API authentication and resource ownership are not enforced in reviewed code

**Evidence:** BE `serverless.yml` has no authorizer declarations. CRUD controllers do not validate Cognito JWTs or account ownership. `accountsController.authenticate` performs an email/user-type SQL lookup. Chat operations trust caller-supplied account IDs. `getContractors`/account reads use `SELECT *`, including sensitive account/profile columns. Main FE Cognito login does not call `apiSvc.setHeader`.

**Impact:** If deployed as written, callers can read/change other users' records and private fields. Cognito login in the browser does not secure these API endpoints. CORS is not authorization. Actual gateway overrides need inspection.

**Recommended work:** Validate token issuer/audience/expiry and resolve account via verified subject; enforce role and record ownership per operation. Define public DTOs for professional search, private profile DTOs for owners, and admin-only access for listings/contact messages/logs. Retain explicit, validated public inquiry endpoints where required.

**Done when:** Unauthenticated private calls return 401; cross-account access returns 403/404; client, contractor and admin permissions are tested; public responses omit bank, credential and private contact fields as appropriate.

### R03 — Raw card and security-code persistence path

**Evidence:** FE `src/services/payMethod.service.js:add` sends `cardNumber` and `cvc`; `store/modules/payMethods/actions.js` posts these. BE `payMethodsController.addPayMethod` inserts the submitted object and echoes it in the response message. BE `src/sql/paymethods.sql` includes both columns and list handlers select all fields.

**Impact:** Financial secrets are collected and can be stored/returned by the application. Masking the last four digits in the UI does not remove full values from storage or responses. Whether real card data exists is unknown.

**Recommended work:** Disable the current collection flow before real use. Integrate provider-hosted/tokenized capture; store provider references and safe display metadata. Plan removal of existing sensitive data if any. Payment processing and payouts require a separate product decision.

**Done when:** FE/BE/DB/logs contain no card security codes or raw card-number persistence path, and payment flows use verified provider references.

### R04 — Local/offline backend can connect to production

**Evidence:** BE `src/db.js`, `src/database.ts` and `src/db.query.js` select configuration `["production"]` rather than `[env]`. `src/db.js` creates a pool and calls `getConnection` at module initialization. BE env files do not override this JSON selection.

**Impact:** Running offline handlers could access production; environment names provide false isolation. This is why no backend handler/server was executed in this review.

**Recommended work:** One validated database configuration module, explicit environment selection, local defaults that cannot reach production, separate credentials and permissions. Provision an isolated database and sanitized fixture data.

**Done when:** Local development demonstrably selects only the test database, and missing/mismatched configuration fails before accepting requests.

### R05 — Passwords, tokens and private payloads can reach storage/logging/responses

**Evidence:** FE `auth/actions.js:createDbAccountInfo` sends the signup password to SQL; BE `accountsController.addAccount` inserts and echoes the account object. `src/sql/accounts.sql` has a plain password column. BE `src/controllers/.ping.ts:handler` returns database host, username and password in its response and is routed by `serverless.yml`. FE bid/contact/sign-in components pass Cognito JWTs as the `sessionId` argument to `logIt`; `LogTrail.add` persists it when `VUE_APP_SYS_LOG_LEVEL` enables logging. Vuex debug logger also exposes state in development.

**Impact:** Duplicating Cognito passwords and recording bearer tokens unnecessarily expands exposure. The source demonstrates the path, not the presence of real production values.

**Recommended work:** Make Cognito the password authority; remove SQL password/token persistence and payload echoing. Use a non-secret correlation ID for logs, redact sensitive fields, and review existing data retention/access.

**Done when:** Signup stores no SQL password, API responses exclude secrets, and logging tests verify token/password redaction.

## P1: correct identity, contracts and workflows

### R06 — Session lifetime, restoration and navigation checks disagree

**Evidence:** FE `auth/actions.js:login` passes Cognito `accessToken.payload.exp` (epoch seconds); `auth` adds it to `Date.now()` as a duration in milliseconds. `tryLogin` trusts cached token/SQL ID/expiry and restores signed-in state after a record lookup without verified session refresh. `src/router.js` uses `requiredAuth` for contractors but checks `requiresAuth`; `/nuevoproyecto`, `/helper` and `/testpad` have no auth metadata. No role guard exists.

**Impact:** Local expiry differs from JWT expiry; UI state is not proof of authentication; restricted routes can be entered unexpectedly.

**Fix:** Use Amplify's session lifecycle, calculate absolute expiry consistently (`exp * 1000` if reading JWT claims), attach/refresh credentials through one API boundary, and centralize route roles/metadata. Avoid `statusText === "OK"` checks.

**Done when:** Valid reload, expired/revoked session, logout, client/contractor role navigation and direct deep links behave consistently. API authorization from R02 remains authoritative.

### R07 — Response helper changes data shape and discards results

**Evidence:** BE `src/models/responseDataSet.ts` stringifies `data[0]` inside another JSON envelope. Controllers alternate `ds`, `ds[0]`, `[ds[0]]` and `[]`. `getAccounts` passes rows and returns only the first row; empty mutations omit inner `body`. FE actions/mutations decode different shapes. See [response examples](api-and-data.md#actual-response-serialization).

**Impact:** Lists/items/empty results require fragile special cases, parsing can fail, and row counts based on `ds.length` count the two-element mysql2 tuple instead of records.

**Fix:** Normalize row extraction and one response/error contract; update FE adapters together. Return creation IDs and meaningful statuses without echoing submitted objects.

**Done when:** Contract checks cover zero/one/multiple rows, missing records, creates, updates, deletes and malformed requests across resource families.

### R08 — Missing promise propagation produces premature success and lost errors

**Evidence:** FE `Quote.add`, `PayMethod.add`, several Vuex CRUD actions and generic `projects/save` do not return their underlying work. Generic project `save` catches errors with an empty callback. `baseProjectBid.vue` submits, notifies, resets and displays success synchronously. `addProject.vue` begins upload without awaiting it. `BaseBooking.vue` reports/reset actions independently of persistence completion.

**Impact:** Users can see success after failed saves, lose form contents, or send notifications for nonexistent offers. Caller `try/catch` cannot reliably catch asynchronous failures.

**Fix:** Return/await promises at every boundary, propagate typed errors, disable duplicate submits, retain input on failure, and notify only after a confirmed saved record/ID. Move durable notification initiation to the server.

**Done when:** Simulated network/database/upload failures retain the form and show failure; success waits for persistence; a bid notification references the newly created quote.

### R09 — Signup and generated-ID handling are not reliable

**Evidence:** FE `auth/actions.js:signup` does not return/await the nested account/profile creation chain; it shares module-level `lastUserId`. BE `accountsController.addAccount` inserts via `pool.query`, then separately runs `SELECT LAST_INSERT_ID()`. That value is connection-specific and a pool does not guarantee the same connection for both queries. SQL snapshots require profile/account fields absent from the minimal registration payload.

**Impact:** Partial Cognito/SQL accounts, incorrect profile IDs and false registration completion are possible.

**Fix:** Read `insertId` directly from the insert result; transact account/profile writes on one connection; make provisioning idempotent using a unique verified Cognito subject; define compensation/retry for the external Cognito operation. Remove shared transient ID state.

**Done when:** Registration retry/concurrency tests create one identity and its correct profile, with deterministic recovery after partial failure.

### R10 — Primary keys, route parameters and SQL names disagree

**Evidence:** BE quote item handlers use `WHERE id = ?` against snapshot `quoteId`; message GET/PUT use `messagesId` while route declares `messageId`; log GET/PUT use `logtrailsId` while route declares `logtrailId`, and update targets `logtrails` rather than `log_trail`. FE `apiSvc.update/delete` always reads `entity.id`; project mutation `SET_PROJECT` does too. Favorites rely on sending literal `/undefined` to select a composite-key delete branch.

**Fix:** Define explicit per-resource IDs, align route/handler/schema names, and remove sentinel URL behavior. Use dedicated clients or documented identity mappings rather than generic assumptions.

**Done when:** Each item route reads/updates/deletes its intended row and invalid/missing IDs return a controlled error without mutating unrelated records.

### R11 — FE invokes undeclared routes/actions

**Evidence:** `quotes/clients/{clientId}` and `messages/clients/{clientId}` appear in FE store actions but not BE `serverless.yml`. Quote/message services dispatch missing `getByProjectId` actions. Legacy `user.service.js` calls `/o/token/` and missing API interceptor methods; the primary auth path is Cognito.

**Fix:** Implement only the required filtered queries with ownership checks; remove obsolete paths once call-site usage is established. Keep the route inventory as a contract reference.

**Done when:** Every retained service/store call resolves to an intentional action and backend route, with integration coverage for the paths used by the UI.

### R12 — SQL, TypeScript interfaces and payloads have drifted

**Evidence:** Review field names differ between BE interface and SQL/controller; payment interface uses `expiration` while FE/SQL use month/year; timestamps alternate `updateAt`/`updatedAt`; contact interface exports a contractor-like type. `src/sql/log_trail.sql` starts with a query concatenated to `CREATE TABLE`. Multiple schema snapshots differ. FE project creation uses contractor 0 despite the declared FK, and creates single-quoted service arrays.

**Fix:** Compare a schema-only export from the intended environment with source snapshots; establish ordered migrations and validated request/response DTOs. Use null for unassigned relationships and valid JSON or normalized service relations.

**Done when:** A blank isolated database can be migrated and seeded reproducibly; UI payloads satisfy the schema; no undocumented manual table changes are needed.

### R13 — FE state updates include concrete collection bugs

**Evidence:** `clients/mutations.js:SET_CLIENTS` resets `clients` but pushes into nonexistent `state.favorites`. Client/contractor updates index arrays by database ID. `favorites/actions.js:fetchMyFavorites` hardcodes client 58 and uses the wrong action argument shape for its intended caller payload. `projects/SET_PROJECT` replaces by `id` instead of `projectId`, with no missing-index handling.

**Fix:** Normalize entities by ID or use explicit `findIndex`/upsert; remove hardcoded identities; keep JSON decoding in the API adapter.

**Done when:** Lists refresh correctly after edits; updates work for sparse IDs and absent entries; favorites are scoped to the signed-in account.

### R14 — SQL input handling and Lambda error paths need consolidation

**Evidence:** BE `messagesController` interpolates `myself`, `contactId`, `fromId`, `toId` and `id` into SQL text. Many controllers parse JSON without schema checks and pass submitted objects to `INSERT/UPDATE ... SET ?`. Several catch blocks call `next(err)` as if running Express. `src/db.js` mixes a callback-style `getConnection` call with the mysql2 promise API.

**Impact:** SQL injection paths, caller control of unintended columns, uncontrolled parse failures and incompatible error behavior. TypeScript assertions do not validate inputs.

**Fix:** Parameterize every value, allowlist writable fields, validate request schemas, and use a Lambda-specific error wrapper. Consolidate promise-only pool handling. Derive ownership from identity, not the request body.

**Done when:** Malformed/injection payloads cannot alter query structure or protected fields; errors return predictable status/data; initialization works against the isolated database.

### R15 — Chat read state and connection lifecycle are inconsistent

**Evidence:** BE unread queries compare `wasRead = 'false'` while schema uses numeric tinyint and read updates set 1. Conversations use `LIMIT 100` without ordering/cursor. FE `socketio.service.js` uses native WebSocket, creates a new interval on setup without clearing it on disconnect, and reconnect handling includes wrong `this`/old-socket patterns. Server implementation is outside the reviewed BE.

**Fix:** Use boolean/numeric flags consistently, ordered cursor pagination, one socket lifecycle with cleared timers/listeners, reconnect backoff and authenticated registration. Define persistence/delivery/duplicate semantics across REST and WebSocket services.

**Done when:** Unread counts are correct; reconnect/unmount creates no duplicate timers/listeners/messages; older/newer messages have stable order; external socket authorization is verified.

### R16 — Image upload integrity and private ownership are undefined

**Evidence:** FE `s3.services.js` uses `file.name` directly as object key; project creation does not await upload. Profile/project flows share the upload service.

**Fix:** After R01, authorize uploads server-side, generate account-scoped unique keys, validate size/type, await completion and record only approved object references. Define overwrite/delete and orphan cleanup rules.

**Done when:** Same-named files from different users cannot overwrite each other, failed uploads do not report successful image updates, and unauthorized object writes/deletes fail.

## P2: maintainability, performance and delivery

### R17 — Multiple backend execution/configuration paths obscure the source of truth

**Evidence:** Lambda/mysql2, Express/Sequelize and additional DB helpers coexist. `src/index.ts` imports the app before loading dotenv; Sequelize configuration can be read before that setup. `template.yml` describes unrelated datetime/CodeDeploy functions with Node 10, while `serverless.yml` describes the marketplace using Node 18. Package metadata still describes a starter template.

**Proposal:** Choose one supported execution/deployment path, consolidate configuration, retire or clearly archive prototypes, and correct metadata. Add health/readiness checks with safe DB behavior. Actual runtime/provider upgrade compatibility needs separate verification.

### R18 — Dependency and verification baseline is weak

**Evidence:** FE mixes Vue 3 with `vue-template-compiler` 2.x, multiple older/alpha plugins, Vue CLI 4 and several overlapping libraries. BE declares Serverless 4 with older offline/TypeScript plugins. Both npm/yarn lockfiles exist in BE. No FE test script is declared; BE Jest discovers no tests and coverage thresholds are zero. Installed versions can differ from manifest ranges.

**Proposal:** Select package manager and supported runtime, inventory actual usage, remove obsolete integrations, then upgrade in small validated steps. Introduce CI for FE build/source lint, BE type check, contract checks and a few critical end-to-end journeys. Run a separate dependency advisory review; this assessment did not establish current CVEs or vendor support dates.

### R19 — Initial browser payload is large

**Evidence:** Production build succeeded with a 6.68 MiB entrypoint; vendor JS was 5910.88 KiB (1173.71 KiB gzip), app JS 608.66 KiB (173.04 KiB gzip). Images included several 2–4 MiB assets. Router imports almost all screens eagerly. AWS SDK v2, theme/vendor scripts, demo assets and duplicate date/UI libraries are present.

**Proposal:** Lazy-load routed screens, resize/compress images, remove unused theme/demo assets and dependencies, replace full browser AWS SDK usage through R01/R16, and establish mobile performance budgets. Measure before/after in a browser; compilation warnings do not measure user latency.

### R20 — Deployment, external services and operational ownership are incomplete

**Evidence:** FE README suggests direct S3 sync and obsolete JSON-server setup. History routing requires host fallback configuration. FE exposes separate email and WebSocket URLs, but BE does not declare those implementations. No complete infrastructure setup for Cognito, database, site hosting or these integrations was established. CORS configuration is broad/inconsistent. Production source maps are enabled in `vue.config.js` despite its comment about debug use.

**Proposal:** Document actual AWS/service inventory, environment promotion, backups/restore, DNS/TLS, fallback routing, alerts, redacted structured logs, rate limits, CI deployment and rollback. Decide whether email is best triggered durably by backend events/outbox. Verify public query pagination/indexes and connection limits under concurrent Lambdas; each pool allows 10 connections.

**Done when:** A new environment can be provisioned from documented configuration and a rollback/restore exercise is demonstrated. External service owners, repositories and authentication are recorded.

### R21 — Product completion and component cleanup need explicit scope

**Evidence:** Admin/payment pages are placeholders; guide pages show construction content. `/testpad` and `/helper` are registered. `src/main.js` registers `base-dialog` from `BaseBadge.vue`. `Quote`/`PayMethod` expose unimplemented methods and inconsistent validation (`biddescription`, `.trim` compared without invocation). Booking maps `comments` while the contact SQL snapshot uses `message` and requires other absent fields.

**Proposal:** Agree on a launch feature list and remove/hide unfinished entry points accordingly. Correct the component registration, complete or remove unused helper methods, make booking its own validated request type, and consolidate UI error/loading behavior. Review accessibility, Spanish copy, responsive layouts and user-owned data/privacy flows during browser acceptance testing.

## Suggested implementation order

1. **Contain exposure and isolate development:** R01–R05; establish sandbox database/config and inventory external services.
2. **Make identity and API behavior trustworthy:** R02, R06, R07, R09, R10, R12, R14; add focused contract/authorization checks.
3. **Complete one vertical journey:** client signup/profile → project → contractor offer → client notification/chat; fix R08, R11, R13, R15, R16 as encountered.
4. **Decide launch scope:** transaction versus lead-generation marketplace; define acceptance/review/booking rules; defer or properly implement payment/admin workflows.
5. **Prepare delivery:** R17–R21, CI, browser testing, performance and deployment/rollback.

## Decisions and evidence still needed

- Is launch intended to exchange leads, or also collect funds, hold/release payments and pay professionals?
- What are the authoritative project/quote states and who may transition them? Existing string fields are not a complete lifecycle specification.
- Which AWS environments/resources remain active, and which are safe to use? No deployed configuration was inspected.
- Where are the email and WebSocket server repositories, and how do they validate user identity?
- What does the current database schema actually contain, and are any real credentials/payment details retained?
- Which existing uncommitted fixes should be retained? This review documented the working tree rather than reverting or committing it.

These questions refine implementation scope; they did not block this source review. Verification results and reproducible commands are recorded in [the restart guide](development.md).
