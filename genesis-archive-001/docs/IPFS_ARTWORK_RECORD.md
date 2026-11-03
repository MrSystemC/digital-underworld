# IPFS Artwork and Metadata Record

## Original artwork

Owner-supplied CID:

`bafybeib6huv4ptfmmjmgwhmhvmujqflmxm4hzlamujnnii5lkujopa4zia`

- CID version: CIDv1
- Text encoding: Base32 (lowercase)
- Multicodec: dag-pb
- Multihash: sha2-256
- Master file: `artwork/GENESIS_ARCHIVE_001_MASTER.png`
- File size: 3,285,027 bytes
- Dimensions: 1254 × 1254 px, PNG, RGB
- SHA-256: `087d6986e5e9e972e854ad6f2558ad26e2ad244a98a6e60e25a677fb9286b5bc`

The project owner downloaded the artwork from Pinata's public gateway on Android/Ubuntu. The reported download was approximately 3.13 MiB. The subsequent `sha256sum` output exactly matched the local master and provenance hash above. This is owner-provided gateway retrieval evidence.

## Final metadata JSON

Owner-supplied CID:

`bafkreibwzrmeh3rj4wwyyre4ovlvv46f5tbuglf3xcs5vdwrci4wqzhqx4`

The CID is CIDv1 Base32 with the raw codec and sha2-256 multihash. It exactly matches the raw CID calculated from the final 1,740-byte metadata JSON distributed as `GENESIS_ARCHIVE_001_metadata_1_FINAL.json` (SHA-256 `36cc5843ee29e5ad8c449c75575af3c5ecc3432cbbb8a5da8ed112396864f0bf`). The GitHub `metadata/1.json` is maintained to match that finalized JSON. The owner has supplied the CID, but a separate download of the metadata from a public gateway has not yet been shown; gateway availability remains to be checked.

The metadata image URI is:

`ipfs://bafybeib6huv4ptfmmjmgwhmhvmujqflmxm4hzlamujnnii5lkujopa4zia`

## Deployment gate

Before deploying the contract, verify the metadata CID through a gateway and compare the downloaded file's SHA-256 with the final JSON hash above. Confirm both image and metadata URIs resolve consistently. IPFS content is public by default.
