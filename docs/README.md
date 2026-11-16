# Project documentation

Updated November 16, 2026. This documentation covers **both** repositories. The November 15 assessment is historical; the handoff and latest release describe deployed repairs and verified behavior.

| Document | Use it for |
| --- | --- |
| [Current handoff](HANDOFF.md) | Current deployed state, local commits, verification, secure recovery and next priorities |
| [Application email release](releases/2026-11-16-notifications.md) | SES delivery, confirmed Gmail receipt, Zoho boundaries and reversible deployment |
| [Authenticated live chat release](releases/2026-11-16-chat.md) | Verified live delivery, sender/participant checks, managed connection storage and deployment recovery |
| [Purpose and architecture](architecture.md) | Product scope, feature maturity, application structure, integrations, and change locations |
| [API and data reference](api-and-data.md) | Declared backend routes, response behavior, entity relationships, and FE/BE contract mismatches |
| [Discrepancies and improvements](review-report.md) | Prioritized findings, evidence, recommended fixes, and completion criteria |
| [Development restart guide](development.md) | Configuration, local commands, verification results, and a suggested order for resuming development |
| [Repair and commit log](repair-log.md) | Implemented changes, companion commits, validation, configuration changes and rollback |
| [Asana ticket ledger](asana-tickets.md) | Current status and remaining work for all 21 review findings; includes a CSV for later import |
| [AWS deployment readiness](deployment-readiness.md) | Current deployment blockers and proposed staging/rollback sequence |
| [November 16 frontend release](releases/2026-11-16-frontend.md) | Published frontend, validation, remaining limitations and rollback |

## Repository scope

- **FE**: this repository, `Target - marido-en-alquiler-web-3`.
- **BE**: sibling directory `../marido-en-alquiler-backend`.
- Backend file references in these documents are relative to the BE root unless linked explicitly.
- The combined review lives in the FE repository. Authorized source repairs and deployment documentation are committed separately in each repository.

## How to interpret this review

“Confirmed” means directly established from source or the recorded offline checks. It does not mean reproduced against the deployed website. “Needs verification” means cloud configuration, actual database contents, external services, or user journeys have not been tested.

The initial November 15 assessment used source and offline checks without contacting AWS, email recipients, payment providers or databases. Subsequent authorized repairs include the real cloud/browser acceptance documented in each release. No credentials are reproduced here, and the review is not an exhaustive security audit. Existing build directories alone are not evidence of a current successful build.

For a new change request, identify the actor, page or workflow, expected behavior, and acceptance criteria. Use the report IDs when requesting a repair, for example: “Fix R07 and make project creation show success only after the server confirms it.”

Current release: [authenticated live chat](releases/2026-11-16-chat.md). Earlier accepted releases: [project workflow](releases/2026-11-16-journey.md), [credentials, Node 24 and photo uploads](releases/2026-11-16-hardening.md) and [credential actions](releases/2026-11-16-credentials.md). Statements in the original assessment about no cloud contact or unmodified backend describe that initial review only. HANDOFF.md and the latest release are authoritative for current behavior.
