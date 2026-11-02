# GENESIS ARCHIVE #001 — Release Runbook

This sequence includes irreversible actions. Do not proceed to Mainnet until every review gate is complete.

## 1. Pin artwork and metadata

1. Upload the original 1254 × 1254 PNG, not the SVG website preview, to an IPFS pinning provider.
2. Verify its SHA-256 against artwork/PROVENANCE.json.
3. Record the actual artwork CID.
4. Set ARTWORK_CID in a private local environment file and run npm run metadata:finalize.
5. Upload the finalized metadata/1.json as a separate IPFS object and record its actual CID.
6. Set METADATA_URI to ipfs:// followed by that metadata CID.
7. Verify both objects through independent IPFS gateways. IPFS content is public by default.

## 2. Wallet setup

Use a dedicated deployer wallet and a separately controlled royalty receiver. A hardware wallet or reviewed multisig is preferred. Never share a seed phrase or private key. Verify the final mint recipient address independently; do not use an exchange deposit address.

## 3. Local test gate

    npm install
    npm test
    npm run compile

Do not deploy if tests or compilation fail. The preparation environment did not complete dependency installation, so compilation and EVM tests remain outstanding.

## 4. Sepolia

Configure a Sepolia RPC endpoint, local signer, final metadata URI and royalty receiver. Run npm run deploy:sepolia. Save the contract address and deployment transaction. Verify chain ID 11155111, owner, name, symbol, metadata URI and royaltyInfo. Set the deployed address and intended recipient, then run npm run mint:sepolia. Verify minted(), ownerOf(1), tokenURI(1) and the impossibility of a second mint.

## 5. Mainnet release gate

Proceed only after successful Sepolia testing, independent Solidity review, legal review of sale terms, final IPFS verification and explicit owner approval of addresses and network costs. Run npm run deploy:mainnet, save the address and transaction, and run npm run verify:mainnet. Recheck all addresses before running npm run mint:mainnet.

## 6. Auction submission

Provide the AI disclosure, provenance and hash, actual IPFS CIDs, verified contract address, chain ID, token ID and mint transaction, seller authority, counsel-reviewed terms and independent appraisal. Do not represent a speculative asking price as a valuation or guarantee.
