# Validation Report — GENESIS ARCHIVE #001 v1.3

**Date:** 3 November 2026

## Checks completed

| Check | Result | Notes |
|---|---|---|
| Master artwork exists | PASS | PNG, 1254 × 1254 px, RGB; 3,285,027 bytes |
| Artwork SHA-256 | PASS | `087d6986e5e9e972e854ad6f2558ad26e2ad244a98a6e60e25a677fb9286b5bc`; matches provenance |
| Supplied artwork CID syntax | PASS | CIDv1 Base32; decodes to dag-pb / sha2-256 multihash |
| Artwork retrieval through ipfs.io | BLOCKED | Owner received HTTP 429; try independent gateways |
| Final metadata JSON | PASS | Valid JSON; 1,740 bytes; image URI points to supplied artwork CID |
| Final metadata JSON SHA-256 | PASS | `36cc5843ee29e5ad8c449c75575af3c5ecc3432cbbb8a5da8ed112396864f0bf` |
| Previously supplied metadata CID | MISMATCH | Embedded digest `33f2bb2bdc087ed3a4f52bb6ed60ef7e0300a6a664da7f93e74a23998d1f8631` differs from final JSON SHA-256; do not use for deployment |
| JavaScript syntax | PASS | node --check on scripts and tests |
| Metadata finalizer | PASS | Local hash verification and URI finalization performed |
| Collector dossier | PASS | PDF generated and rendered, 4 pages |
| Website preview | PASS | Static HTML and SVG preview deployed on Render |
| Node.js / npm toolchain | PASS | Owner-provided Ubuntu ARM64 screenshot: Node.js 22.23.4, npm 10.9.9 |
| npm dependency installation | PASS | Owner-provided screenshot: 263 packages added |
| Solidity compilation | PASS | Owner-provided screenshot: 19 Solidity files compiled successfully; EVM target Paris |
| Hardhat EVM tests | PASS | Owner-provided screenshot: 11 passing in 4 seconds |
| npm audit --omit=dev | PASS | Owner screenshot reports 0 vulnerabilities in production dependencies |

## Not completed

| Check | State | Reason |
|---|---|---|
| Full npm audit review | PENDING | Inspect dev dependency findings; do not run npm audit fix --force |
| Artwork retrieval through an independent gateway | PENDING | ipfs.io returned HTTP 429 |
| Metadata repinning | REQUIRED | Upload the final JSON file and obtain a CID matching its bytes |
| GitHub Actions compile/test workflow | BLOCKED BEFORE RUNNER | GitHub marked jobs failed with no runner assigned and no steps executed |
| Independent Solidity security audit | NOT DONE | Must be commissioned before Mainnet |
| Sepolia deployment and mint | NOT DONE | Requires disposable owner-controlled test wallet, RPC and test ETH |
| Ethereum Mainnet deployment and mint | NOT DONE | Requires final review, owner signature and Mainnet ETH |
| Marketplace indexing / auction acceptance | NOT DONE | Requires a deployed token and platform review |
| Independent valuation | NOT DONE | Requires qualified appraiser or auction specialist |
| Legal review | NOT DONE | Requires jurisdiction-specific counsel |

The project has passed local compilation and 11 contract tests in the owner's Ubuntu ARM64 environment. The artwork gateway request was rate-limited. The previously supplied metadata CID does not match the exact bytes of the final metadata JSON and must be replaced before deployment. No contract is deployed or minted; no valuation or auction approval is claimed.
