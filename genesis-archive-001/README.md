# GENESIS ARCHIVE #001

**v1.1 · AI-assisted digital artwork · Ethereum ERC-721 (planned)**

Live presentation: https://genesis-archive-001.onrender.com

Artwork CID supplied by project owner:
`bafybeib6huv4ptfmmjmgwhmhvmujqflmxm4hzlamujnnii5lkujopa4zia`

The local master PNG is 1254 × 1254 px and 3,285,027 bytes. Its SHA-256 was recalculated and matches the provenance record: `087d6986e5e9e972e854ad6f2558ad26e2ad244a98a6e60e25a677fb9286b5bc`. CID syntax decodes as CIDv1 Base32 / dag-pb / sha2-256. Public gateway retrieval could not be independently confirmed from the preparation environment. The NFT metadata now points to this artwork CID; the finalized metadata JSON still needs a separate IPFS upload and its own CID.

## Release status

Prepared for review; not deployed, not minted, not audited, and not listed. No contract address, transaction hash, metadata CID, valuation or auction acceptance is claimed. The live website uses a vector preview, not the master PNG. The master PNG and collector PDF are in the separately supplied release archive.

## Technical design

- ERC-721, token ID 1, one mint maximum within this contract.
- OpenZeppelin Contracts 5.4.0; Solidity 0.8.24.
- Fixed IPFS metadata URI set at deployment.
- EIP-2981 royalty signaling at 5%; marketplace payment is not guaranteed.
- Owner-only mint, separate from deployment; non-upgradeable contract.

## Local setup

Use Node.js 20–22. Extract the release ZIP and place the original PNG at `artwork/GENESIS_ARCHIVE_001_MASTER.png` in this source checkout, then run:

    npm install
    npm test
    npm run compile

JavaScript syntax, JSON, PNG and artwork hash checks passed. npm dependency installation timed out in the preparation environment; Solidity compilation and EVM tests remain unverified. No independent audit has been performed.

## Release sequence

1. Verify public gateway retrieval of the supplied artwork CID.
2. Upload the finalized `metadata/1.json` separately to IPFS and record its CID.
3. Deploy and test on Sepolia.
4. Obtain independent contract and legal review.
5. Deploy to Ethereum Mainnet only after explicit owner approval and wallet signature.
6. Verify the contract and mint the single token to the confirmed recipient.
7. Submit the provenance package to a suitable marketplace or auction house.

Collector disclosure: the NFT conveys ownership of the blockchain token only. It does not transfer copyright, commercial reproduction rights, shares, investment returns, ownership in a fund or organization, governance rights, or guaranteed future utility. The Human Continuity Archive remains a concept-stage proposal. The artwork is AI-assisted and must be disclosed as such.

No valuation is assigned. An asking price is not an appraisal. Never share seed phrases or private keys. IPFS content is public by default.
