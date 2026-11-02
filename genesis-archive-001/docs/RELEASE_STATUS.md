# Release Status — GENESIS ARCHIVE #001

**Prepared:** 3 November 2026  
**Version:** 1.3  
**State:** source package and local tests prepared; artwork CID supplied; metadata CID must be repinned; not deployed; not minted; not listed.

| Work item | State |
|---|---|
| Original AI-assisted artwork generated | Complete |
| Artwork SHA-256 recorded and checked against local master | Complete |
| Artwork CID supplied by project owner | Received; CIDv1 Base32 syntax validated |
| Public gateway retrieval of artwork CID | Blocked by HTTP 429 from ipfs.io; try independent gateways |
| NFT metadata JSON | Final canonical file prepared; 1,740 bytes |
| Metadata JSON SHA-256 | `36cc5843ee29e5ad8c449c75575af3c5ecc3432cbbb8a5da8ed112396864f0bf` |
| Previously supplied metadata CID | Does NOT match current JSON bytes; do not use for deployment |
| New metadata CID | Pending re-upload of final JSON |
| ERC-721 / EIP-2981 contract source | Compiles locally; owner reports 19 Solidity files compiled |
| Hardhat EVM tests | Owner reports 11 passing |
| npm audit --omit=dev | Owner reports 0 production dependency vulnerabilities |
| Full npm audit | Not yet reviewed |
| Deployment and mint scripts | Prepared; not executed |
| Sepolia test deployment | Pending |
| Independent contract review | Pending |
| Ethereum Mainnet deployment | Pending |
| Ethereum Mainnet mint | Pending |
| Marketplace listing | Pending |
| Independent valuation / auction acceptance | Pending |
| Legal review of rights and sale terms | Pending |
| Public presentation website | Live: https://genesis-archive-001.onrender.com |
| GitHub review | Draft PR #1 open; not merged |

## Artwork record

Owner-supplied CID: `bafybeib6huv4ptfmmjmgwhmhvmujqflmxm4hzlamujnnii5lkujopa4zia`

Local master PNG: 1254 × 1254 px, 3,285,027 bytes. SHA-256:
`087d6986e5e9e972e854ad6f2558ad26e2ad244a98a6e60e25a677fb9286b5bc`

The local file hash matches the provenance record. CID syntax was decoded as CIDv1 / dag-pb / sha2-256. The owner's attempt to retrieve it through ipfs.io received HTTP 429; this is gateway rate limiting, not proof that the CID is invalid. Public retrieval through another gateway is still required.

## Metadata record

Previously supplied CID:
`bafkreibt6k5sxxaip3j2j5jlw3wwb336amaknjte3j7zhz2keomy2h4gge`

The CID embeds raw SHA-256 digest:
`33f2bb2bdc087ed3a4f52bb6ed60ef7e0300a6a664da7f93e74a23998d1f8631`

Current final metadata JSON SHA-256:
`36cc5843ee29e5ad8c449c75575af3c5ecc3432cbbb8a5da8ed112396864f0bf`

These digests differ. The previously supplied metadata CID therefore does not identify the current final JSON bytes. A new CID must be obtained by uploading the final file linked in the project conversation. The raw-codec CID calculated from the final file is `bafkreibwzrmeh3rj4wwyyre4ovlvv46f5tbuglf3xcs5vdwrci4wqzhqx4`; a provider using a different UnixFS codec may return a different CID, so verify the retrieved bytes by SHA-256.

No contract address, transaction hash, valuation, independent audit or auction acceptance is represented as existing.
