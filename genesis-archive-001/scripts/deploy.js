const { ethers, network: hreNetwork } = require("hardhat");
function expectedChainId() {
  if (hreNetwork.name === "sepolia") return 11155111n;
  if (hreNetwork.name === "ethereum") return 1n;
  return null;
}
async function main() {
  const metadataURI = process.env.METADATA_URI;
  const royaltyReceiver = process.env.ROYALTY_RECEIVER;
  const royaltyBps = Number(process.env.ROYALTY_BPS || "500");
  if (!metadataURI || !metadataURI.startsWith("ipfs://") || metadataURI === "ipfs://" || metadataURI.includes("REPLACE")) {
    throw new Error("METADATA_URI must be the final ipfs:// URI of metadata/1.json.");
  }
  if (!royaltyReceiver || !ethers.isAddress(royaltyReceiver) || royaltyReceiver === ethers.ZeroAddress) {
    throw new Error("Set ROYALTY_RECEIVER to a valid non-zero wallet or multisig address.");
  }
  if (!Number.isInteger(royaltyBps) || royaltyBps < 0 || royaltyBps > 1000) {
    throw new Error("ROYALTY_BPS must be an integer from 0 to 1000.");
  }
  const expected = expectedChainId();
  const providerNetwork = await ethers.provider.getNetwork();
  if (expected && providerNetwork.chainId !== expected) {
    throw new Error("Wrong network: expected chainId " + expected + ", received " + providerNetwork.chainId + ".");
  }
  const [deployer] = await ethers.getSigners();
  if (!deployer) throw new Error("No deployer signer is configured locally.");
  console.log("Deploying from:", deployer.address);
  const Factory = await ethers.getContractFactory("GenesisArchive001");
  const nft = await Factory.deploy(metadataURI, royaltyReceiver, royaltyBps);
  await nft.waitForDeployment();
  console.log("Contract address:", await nft.getAddress());
  console.log("Deployment tx:", nft.deploymentTransaction().hash);
  console.log("Deployment does not mint. Mint only after independent verification.");
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
