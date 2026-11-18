# Frontend dependency security review — November 18, 2026

This review covers the frontend dependency repairs after the November 17 session/signup release. Backend runtime, database schema, DNS and business rules are unchanged. See the [release and acceptance record](../releases/2026-11-18-dependency-security.md) for deployment status and recovery.

## Findings and outcome

The preceding GitHub push reported 128 dependency alerts, including four critical alerts. An authenticated API snapshot subsequently contained 127 open advisory alerts: four critical, 59 high, 52 medium and 12 low. These snapshots differ from npm's counts: npm initially reported 204 vulnerable package entries, including 12 critical entries because vulnerable ancestors are counted too. Neither number represents confirmed exploitation or 128 separate application defects.

The repaired lockfile has **zero production dependency audit findings**. The complete installation has **14 high package entries**, all attributable to **one unpatched Picomatch advisory**. There are no remaining critical, moderate or low entries in that npm audit. This is a dependency snapshot, not a guarantee that the application has no vulnerabilities. GitHub recalculates its advisory alerts separately after a push.

| Initial critical package | Original → patched version | Exposure and action |
| --- | --- | --- |
| proxy-addr | 2.0.7 → 2.0.8 | Development tree; patched before the toolchain upgrade. [Advisory](https://github.com/advisories/GHSA-jqcg-44mw-7w3h). |
| websocket-driver | 0.7.4 → 0.7.5 | Development sockets; patched, then legacy tree reduced. [Advisory](https://github.com/advisories/GHSA-xv26-6w52-cph6). |
| shell-quote | 1.8.2 → 1.12.0 | Development commands; patched. [Advisory](https://github.com/advisories/GHSA-w7jw-789q-3m8p). |
| pbkdf2 | 3.1.2 → 3.1.7 | Legacy build dependency; patched, then old Webpack dependency tree removed. [Advisory](https://github.com/advisories/GHSA-v62p-rq8g-8h59). |

The four initial critical packages were absent from the baseline browser source maps. Their development-only location reduced exposure to website visitors; it did not justify leaving them vulnerable. Axios was present in the browser and was upgraded explicitly.

## Repairs

- Removed unused Amplify Vue UI/auth wrappers, chat/carousel wrappers, Gulp and other unused packages after checking imports and component usage. The application continues using its existing forms and chat UI.
- Updated Axios to 1.21.1, Vue and its compiler to 3.5.45, and Amplify to 6.22.2. A small authentication adapter preserves the existing application interface while using supported modular Amplify authentication. It maps tokens and errors, preserves confirmation/reset behavior and fails closed for unsupported authentication challenges. No AWS upload credentials are copied into the application store.
- Updated Vue CLI to 5.0.9 / Webpack 5, with compatible Babel, loaders and ESLint. Lint uses ESLint's current API. Existing component naming issues remain warnings rather than prompting unrelated component renames.
- Applied compatible lockfile patches without `npm audit fix --force`. Removed unused external jQuery, duplicate Vue/FilePond resources and eager Facebook SDK injection from the public HTML. FilePond's local imports remain active and a real photo upload passed.
- Kept `amazon-cognito-identity-js` explicitly as a development dependency because the backend's verification tools use the companion frontend installation. Application authentication uses Amplify 6.

The dependency inventory fell from npm's 2,334 total entries (1,137 production / 1,193 development / 45 optional) to 1,152 (209 production / 944 development / 26 optional). npm's categories can overlap; do not add the category counts to infer the total.

## Explicit compatibility overrides

These overrides are deliberate and covered by build or actual consumer checks. Re-evaluate them when upgrading their parent tools; they should not become unexplained permanent pins.

| Override | Reason and verification |
| --- | --- |
| webpack-dev-server 5.2.6 / webpack-dev-middleware 7.4.5 | Patched compatible CommonJS development server. Vue CLI can load it; local application startup passes, untrusted Host is rejected and an untrusted WebSocket Origin receives the server rejection/close. The newer server major changes module loading. |
| serialize-javascript 7.1.4 | Patched serializer; actual production minification succeeds. This release requires Node 20 or newer; the tested host is Node 24.14.1. |
| postcss 8.5.33 | Removes the old PostCSS 7 branch. Both synchronous and asynchronous legacy scoped-style compilation were tested through the actual consumer, in addition to the full application build. |
| cross-spawn versions below 6.0.6 → 6.0.6 | Repairs the old hook-runner branch while preserving current major-7 consumers. The installed Yorkie/Execa consumer actually spawned Node and captured its output. |
| uuid versions below 11.1.1 → 11.1.1 | Patched version with a CommonJS entry. SockJS's actual `require('uuid').v4` consumer generated a valid ID and its server initialized. No ESM-only major was forced. |

## Remaining advisory and maintenance

[GHSA-fc5q-39xc-vjpf / CVE-2026-112366](https://github.com/advisories/GHSA-fc5q-39xc-vjpf) affects Picomatch through 4.0.7. At review time the advisory lists no patched release; even the registry's latest 4.0.7 remains affected. Repeated extglob patterns can cause excessive regular-expression processing. The installed 2.3.2 fixes older advisories but cannot fix this newer one.

Here Picomatch appears only in development/build tooling. Browser visitors do not supply glob patterns to those tools, and it is absent from the emitted browser source maps. The local server binds to 127.0.0.1. This limits the identified exposure; it is not a general assertion that development tools are risk-free. Do not accept untrusted glob patterns or expose this development server publicly.

Keep R18 open: monitor this advisory and update when a compatible patch exists. No advisory was dismissed, audit exclusion added or fake fix forced. Fourteen affected parent package entries do not mean fourteen independent unpatched defects. A future tooling migration must check this dependency again rather than assume switching bundlers removes it.

[Vue CLI is in maintenance mode](https://cli.vuejs.org/guide/). ESLint 8 and several inherited packages are also deprecated. A planned migration to maintained tooling, removal of additional unused legacy UI assets, bundle splitting and mobile performance measurements remain useful follow-up work. Deprecation and an actual published vulnerability are separate findings.

## Evidence and limits

Private evidence is under `.deployments/dependency-security-20261117/`; it began November 17 and completed checks November 18. It includes initial/final npm audits, the authenticated GitHub snapshot, build manifests, source-map reachability, dev-server rejection checks and scoped fixture cleanup receipts. Keep that ignored folder private: browser state and temporary verification material may contain credentials. Public source maps are excluded from deployment.

94 frontend tests, changed-source lint and production builds pass. Real AWS browser checks passed for both roles, existing Amplify 4 cached sessions through Amplify 6, token refresh, expiry, failed refresh, cross-tab logout, profile text save, signed photo upload and immediate/reconnected/reloaded chat. Completed test fixtures were removed. The separate successful public contractor email-confirmation check for this SDK upgrade is still waiting for the user-held verification code; invalid-code rejection passed. The prior deployed SDK's signup acceptance remains documented in the November 17 release.

Reproducible local verification on Node 24.14.1 / npm 11.11.0:

```powershell
npm.cmd ci --legacy-peer-deps --ignore-scripts --no-audit --no-fund
node --test tests/*.test.cjs
node scripts/lint-changed.cjs 59bc5ec
$env:VUE_APP_ENV='production'
$env:VUE_APP_API_CONTRACT='v2'
npm.cmd run build -- --dest .deployments/dependency-security-20261117/clean-build
npm.cmd audit --legacy-peer-deps --omit=dev
npm.cmd audit --legacy-peer-deps
```

The complete audit exits nonzero while the upstream development advisory remains open. The production audit exits zero. `--ignore-scripts` avoids installing local hooks or running blanket dependency lifecycle scripts; the clean installation retained Vue Demi's Vue 3 mode without manual adjustment. These are frontend checks; no new backend test count or deployment is implied.
