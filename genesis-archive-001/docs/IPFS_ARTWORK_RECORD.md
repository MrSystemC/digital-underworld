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

- CID version: CIDv1
- Codec: raw
- Hash: sha2-256
- File size: 1,740 bytes
- SHA-256: `36cc5843ee29e5ad8c449c75575af3c5ecc3432cbbb8a5da8ed112396864f0bf`

The CID matches the raw CID calculated from the final JSON bytes distributed as `GENESIS_ARCHIVE_001_metadata_1_FINAL.json`. The GitHub `metadata/1.json` is maintained to match this finalized JSON.

**Gateway status:** The project owner attempted to retrieve this CID from `gateway.pinata.cloud`; the gateway returned HTTP 404. Therefore, the CID is mathematically consistent with the file bytes, but the JSON is not currently confirmed retrievable from that Pinata gateway. The metadata object must be pinned/re-uploaded or its correct public gateway URL established before deployment.

The metadata image URI is:

`ipfs://bafybeib6huv4ptfmmjmgwhmhvmujqflmxm4hzlamujnnii5lkujopa4zia`

## Deployment gate

Do not deploy the NFT contract until the metadata CID can be fetched from a public gateway and the downloaded bytes have the expected SHA-256. Confirm both image and metadata URIs resolve consistently. IPFS content is public by default.
