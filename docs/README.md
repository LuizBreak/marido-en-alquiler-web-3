# Project documentation

Reviewed: November 15, 2026. This documentation covers the current working copies of **both** repositories, including existing uncommitted changes.

| Document | Use it for |
| --- | --- |
| [Purpose and architecture](architecture.md) | Product scope, feature maturity, application structure, integrations, and change locations |
| [API and data reference](api-and-data.md) | Declared backend routes, response behavior, entity relationships, and FE/BE contract mismatches |
| [Discrepancies and improvements](review-report.md) | Prioritized findings, evidence, recommended fixes, and completion criteria |
| [Development restart guide](development.md) | Configuration, local commands, verification results, and a suggested order for resuming development |

## Repository scope

- **FE**: this repository, `Target - marido-en-alquiler-web-3`.
- **BE**: sibling directory `../marido-en-alquiler-backend`.
- Backend file references in these documents are relative to the BE root unless linked explicitly.
- The documentation lives in the FE repository so the combined review can be versioned together. Backend source was read without editing it.

## How to interpret this review

“Confirmed” means directly established from source or the recorded offline checks. It does not mean reproduced against the deployed website. “Needs verification” means cloud configuration, actual database contents, external services, or user journeys have not been tested.

This is a development restart assessment, not an exhaustive security audit. No credentials are reproduced here. No AWS resources, email recipients, payment providers, or databases were contacted as part of the review. Existing build directories are not evidence of a current successful build.

For a new change request, identify the actor, page or workflow, expected behavior, and acceptance criteria. Use the report IDs when requesting a repair, for example: “Fix R07 and make project creation show success only after the server confirms it.”
