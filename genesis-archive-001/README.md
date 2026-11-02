# GENESIS ARCHIVE #001 — The Human Continuity NFT

**One-of-one AI-assisted digital artwork · Release package v1.0 · 2 November 2026**

A symbolic digital artwork conceived as the visual frontispiece to a proposed Human Continuity Archive. The hourglass holds Earth as memory above and a regenerative future below; its emblems reference health, knowledge, clean energy, ecology, cooperation, justice and exploration.

## Release status

**Prepared for review. Not deployed, not minted, not audited, and not listed.** No IPFS CID, contract address, transaction hash, valuation or auction acceptance is claimed.

This source directory includes the ERC-721 contract, scripts, tests, metadata draft, provenance record, release documents and a static preview site. The 1254 × 1254 master PNG and collector dossier PDF are in the separate release archive supplied with the project. The SVG on the website is only a preview, not the master artwork.

## Contract design

- Ethereum ERC-721; token ID 1; one mint maximum in this contract.
- OpenZeppelin Contracts 5.4.0; Solidity 0.8.24.
- Fixed IPFS metadata URI set at deployment.
- EIP-2981 royalty signaling at 500 bps (5%); marketplace payment is not guaranteed.
- Owner-only mint, separated from deployment.
- Non-upgradeable contract; no public metadata setter.

## Local setup

Use Node.js 20–22:

    npm install
    npm test
    npm run compile

The preparation environment passed JavaScript syntax checks, JSON parsing and artwork SHA-256 consistency. npm dependency installation timed out in that isolated environment; Solidity compilation and EVM tests remain unverified. The contract has not received an independent audit.

## Release sequence

1. Review the source and legal disclosures.
2. Install dependencies and run the test suite locally.
3. Pin the master PNG to IPFS and record its real CID.
4. Set ARTWORK_CID locally and run npm run metadata:finalize.
5. Pin the finalized metadata/1.json separately and record its CID.
6. Deploy and test on Sepolia.
7. Obtain independent contract and legal review.
8. Deploy to Ethereum Mainnet only after explicit owner approval and wallet signature.
9. Verify the source and mint the single token to the confirmed recipient.
10. Submit the complete provenance package to an appropriate marketplace or auction house.

See docs/DEPLOYMENT_RUNBOOK_RU.md, docs/PROVENANCE_AND_RIGHTS.md and docs/SECURITY_AND_DUE_DILIGENCE.md.

## Collector disclosure

The NFT conveys ownership of the blockchain token only. It does not transfer copyright, commercial reproduction rights, shares, investment returns, governance rights, ownership in a fund or organization, or guaranteed future utility. The Human Continuity Archive is a concept-stage proposal, not an operating foundation or funded program. The artwork is AI-assisted; disclose this in auction submissions.

No valuation is assigned. An asking price is not an appraisal. Obtain independent specialist appraisal and auction-house acceptance before making price claims.

Never share seed phrases or private keys in chat, email or a repository. Keep local environment files out of Git. IPFS content is public by default.
