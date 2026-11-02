# Security and Due-Diligence Notes

- The contract is non-upgradeable and has no public metadata setter or public mint function.
- Minting is owner-only, token ID is fixed at 1, and a second mint reverts.
- Metadata URI and royalty configuration are fixed at deployment.
- EIP-2981 signals royalty information; it does not force every marketplace or private sale to pay royalties.
- OpenZeppelin Contracts 5.4.0 is a pinned dependency. Review the exact dependency source used for compilation.
- The source has not been compiled in this preparation environment and has not received an independent audit.
- Run the complete Hardhat test suite, inspect deployment bytecode and obtain an independent Solidity review before Mainnet.
- No wallet has been connected, no transaction has been signed, no IPFS content has been pinned, and no token has been minted.
- No independent appraisal, auction-house acceptance, legal opinion or copyright registration has been obtained.
- Never disclose seed phrases or private keys. Keep local environment files out of Git. Use hardware wallet or multisig custody where appropriate.
- IPFS content is public by default. Do not upload secrets or personal information.
