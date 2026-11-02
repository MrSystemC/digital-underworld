# Validation Report — GENESIS ARCHIVE #001 v1.2

**Date:** 3 November 2026

## Checks completed

| Check | Result | Notes |
|---|---|---|
| Master artwork exists | PASS | PNG, 1254 × 1254 px, RGB; 3,285,027 bytes |
| Artwork SHA-256 | PASS | `087d6986e5e9e972e854ad6f2558ad26e2ad244a98a6e60e25a677fb9286b5bc`; matches provenance |
| Supplied artwork CID syntax | PASS | CIDv1 Base32; decodes to dag-pb / sha2-256 multihash |
| Public gateway retrieval for supplied artwork CID | NOT VERIFIED | Must still be checked independently |
| Metadata JSON | PASS | Valid JSON; image URI finalized to supplied artwork CID |
| JavaScript syntax | PASS | node --check on scripts and tests |
| Metadata finalizer | PASS | Local hash verification and URI finalization performed |
| Collector dossier | PASS | PDF generated and rendered, 4 pages |
| Website preview | PASS | Static HTML and SVG preview deployed on Render |
| Node.js / npm toolchain | PASS | Owner-provided Ubuntu ARM64 screenshot: Node.js 22.23.4, npm 10.9.9 |
| npm dependency installation | PASS | Owner-provided screenshot: 263 packages added |
| Solidity compilation | PASS | Owner-provided screenshot: 19 Solidity files compiled successfully; EVM target Paris |
| Hardhat EVM tests | PASS | Owner-provided screenshot: 11 passing in 4 seconds |
| npm dependency audit | WARNING | npm reported 25 vulnerabilities: 10 low, 8 moderate, 7 high; detailed audit review is still required |

## Not completed

| Check | State | Reason |
|---|---|---|
| GitHub Actions compile/test workflow | BLOCKED BEFORE RUNNER | GitHub marked jobs failed with no runner assigned and no steps executed; local owner-provided build/test evidence is separate |
| Public gateway retrieval for image and metadata CID | NOT VERIFIED | Verify both URIs in independent gateways before deployment |
| Separate IPFS metadata pinning | OWNER CID RECEIVED; CONTENT MATCH NOT VERIFIED | The owner supplied a metadata CID; confirm that it resolves to the exact final JSON currently in this repository |
| Dependency security review | PENDING | Review `npm audit` findings; do not run `npm audit fix --force` blindly |
| Independent Solidity security audit | NOT DONE | Must be commissioned before Mainnet |
| Sepolia deployment and mint | NOT DONE | Requires disposable owner-controlled test wallet, RPC and test ETH |
| Ethereum Mainnet deployment and mint | NOT DONE | Requires final review, owner signature and Mainnet ETH |
| Marketplace indexing / auction acceptance | NOT DONE | Requires a deployed token and platform review |
| Independent valuation | NOT DONE | Requires qualified appraiser or auction specialist |
| Legal review | NOT DONE | Requires jurisdiction-specific counsel |

The project has now passed local compilation and 11 contract tests in the owner's Ubuntu ARM64 environment. This is not an independent audit and does not establish that the supplied IPFS CIDs resolve to the intended bytes. No contract is deployed or minted; no valuation or auction approval is claimed.
