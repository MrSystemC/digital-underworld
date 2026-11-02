# GENESIS ARCHIVE #001 — Release Runbook

This sequence includes irreversible actions. Do not proceed to Mainnet until every review gate is complete.

## 1. IPFS artwork and metadata

1. Extract the supplied release ZIP. The original master PNG is in the ZIP; the GitHub source branch contains the contract and documentation.
2. Place the master file at artwork/GENESIS_ARCHIVE_001_MASTER.png in the source checkout.
3. Verify its SHA-256: 087d6986e5e9e972e854ad6f2558ad26e2ad244a98a6e60e25a677fb9286b5bc.
4. The project owner supplied this artwork CID: bafybeib6huv4ptfmmjmgwhmhvmujqflmxm4hzlamujnnii5lkujopa4zia.
5. Retrieve the CID through at least two independent public IPFS gateways. If it does not resolve or the returned file is not the verified master, re-upload the original PNG with an IPFS pinning provider and use the new CID.
6. Set ARTWORK_CID in a private local environment file and run npm run metadata:finalize. This verifies the local master hash and updates metadata/1.json.
7. Upload the finalized metadata/1.json as a separate IPFS object and record its own CID.
8. Set METADATA_URI to ipfs:// followed by that metadata CID. Verify both image and metadata URIs independently. IPFS content is public by default.

## 2. Wallet setup

Use a dedicated deployer wallet and a separately controlled royalty receiver. A hardware wallet or reviewed multisig is preferred. Never share a seed phrase or private key. Verify the final mint recipient address independently; do not use an exchange deposit address.

## 3. Local test gate

    npm install
    npm test
    npm run compile

Do not deploy if tests or compilation fail. Dependency installation timed out in the preparation environment, so Solidity compilation and EVM tests remain unverified. The contract has not received an independent audit.

## 4. Sepolia

Configure a Sepolia RPC endpoint, local signer, final metadata URI and royalty receiver. Run npm run deploy:sepolia. Save the contract address and deployment transaction. Verify chain ID 11155111, owner, name, symbol, metadata URI and royaltyInfo. Set the deployed address and intended recipient, then run npm run mint:sepolia. Verify minted(), ownerOf(1), tokenURI(1) and the impossibility of a second mint.

## 5. Mainnet release gate

Proceed only after successful Sepolia testing, independent Solidity review, legal review of sale terms, final IPFS verification and explicit owner approval of addresses and network costs. Run npm run deploy:mainnet, save the address and transaction, and run npm run verify:mainnet. Recheck all addresses before running npm run mint:mainnet.

## 6. Auction submission

Provide the AI disclosure, provenance and hash, actual IPFS CIDs, verified contract address, chain ID, token ID and mint transaction, seller authority, counsel-reviewed terms and independent appraisal. Do not represent a speculative asking price as a valuation or guarantee.
