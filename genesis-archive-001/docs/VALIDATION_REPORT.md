# Validation Report — GENESIS ARCHIVE #001 v1.3

**Date:** 3 November 2026

## Checks completed

| Check | Result | Notes |
|---|---|---|
| Master artwork exists | PASS | PNG, 1254 × 1254 px, RGB; 3,285,027 bytes |
| Artwork SHA-256 | PASS | `087d6986e5e9e972e854ad6f2558ad26e2ad244a98a6e60e25a677fb9286b5bc`; matches provenance |
| Supplied artwork CID syntax | PASS | CIDv1 Base32; dag-pb / sha2-256 |
| Artwork public retrieval | PASS (owner-provided evidence) | Downloaded from Pinata gateway; owner reports SHA-256 exactly matches local master |
| Final metadata JSON | PASS | Valid JSON, 1,740 bytes |
| Metadata SHA-256 | PASS | `36cc5843ee29e5ad8c449c75575af3c5ecc3432cbbb8a5da8ed112396864f0bf` |
| Supplied metadata CID | PASS (calculated CID match) | CIDv1/raw CID matches the SHA-256 of the finalized JSON bytes |
| Metadata public retrieval | NOT VERIFIED | Need a gateway download to confirm serving/pinning |
| JavaScript syntax | PASS | node --check on scripts and tests |
| Node.js / npm toolchain | PASS | Owner-provided Ubuntu ARM64 screenshot: Node.js 22.23.4, npm 10.9.9 |
| npm dependency installation | PASS | Owner-provided screenshot: 263 packages added |
| Solidity compilation | PASS | Owner-provided screenshot: 19 Solidity files compiled successfully; EVM target Paris |
| Hardhat EVM tests | PASS | Owner-provided screenshot: 11 passing in 4 seconds |
| npm production dependency audit | PASS | Owner screenshot: `npm audit --omit=dev` found 0 vulnerabilities |

## Not completed

| Check | State | Reason |
|---|---|---|
| Full npm dependency audit | PENDING | Initial npm install reported 25 issues (10 low, 8 moderate, 7 high); inspect full audit details and remediate safely |
| GitHub Actions compile/test workflow | BLOCKED BEFORE RUNNER | GitHub marked jobs failed with no runner assigned and no steps executed; local owner-provided build/test evidence is separate |
| Metadata gateway retrieval | NOT VERIFIED | Download metadata CID through a public gateway and compare SHA-256 |
| Independent Solidity security audit | NOT DONE | Must be commissioned before Mainnet |
| Sepolia deployment and mint | NOT DONE | Requires disposable owner-controlled test wallet, RPC and test ETH |
| Ethereum Mainnet deployment and mint | NOT DONE | Requires final review, owner signature and Mainnet ETH |
| Marketplace indexing / auction acceptance | NOT DONE | Requires a deployed token and platform review |
| Independent valuation | NOT DONE | Requires qualified appraiser or auction specialist |
| Legal review | NOT DONE | Requires jurisdiction-specific counsel |

The project has passed local compilation and 11 contract tests in the owner's Ubuntu ARM64 environment. The artwork was downloaded from Pinata and its SHA-256 reportedly matched the master. The supplied metadata CID matches the locally calculated raw CID for the finalized JSON bytes, but gateway retrieval is still pending. These checks are not an independent security audit. No contract is deployed or minted; no valuation or auction approval is claimed.
