const { ethers, network: hreNetwork } = require("hardhat");
async function main() {
  const address = process.env.NFT_CONTRACT_ADDRESS;
  const recipient = process.env.MINT_RECIPIENT;
  if (!address || !ethers.isAddress(address) || address === ethers.ZeroAddress) {
    throw new Error("Set NFT_CONTRACT_ADDRESS to the deployed contract address.");
  }
  if (!recipient || !ethers.isAddress(recipient) || recipient === ethers.ZeroAddress) {
    throw new Error("Set MINT_RECIPIENT to the final receiving wallet.");
  }
  const expected = hreNetwork.name === "sepolia" ? 11155111n : hreNetwork.name === "ethereum" ? 1n : null;
  const providerNetwork = await ethers.provider.getNetwork();
  if (expected && providerNetwork.chainId !== expected) {
    throw new Error("Wrong network: expected chainId " + expected + ", received " + providerNetwork.chainId + ".");
  }
  const nft = await ethers.getContractAt("GenesisArchive001", address);
  if (await nft.minted()) throw new Error("The only token has already been minted.");
  const owner = await nft.owner();
  const [signer] = await ethers.getSigners();
  if (!signer || signer.address.toLowerCase() !== owner.toLowerCase()) {
    throw new Error("Connected signer must be contract owner " + owner + ".");
  }
  const tx = await nft.mint(recipient);
  console.log("Mint transaction:", tx.hash);
  await tx.wait();
  console.log("Mint confirmed. Token ID:", (await nft.TOKEN_ID()).toString());
  console.log("Owner:", await nft.ownerOf(1));
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
