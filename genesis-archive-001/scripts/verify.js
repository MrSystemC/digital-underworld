const hre = require("hardhat");
async function main() {
  const address = process.env.NFT_CONTRACT_ADDRESS;
  const metadataURI = process.env.METADATA_URI;
  const royaltyReceiver = process.env.ROYALTY_RECEIVER;
  const royaltyBps = Number(process.env.ROYALTY_BPS || "500");
  if (!address || !metadataURI || !royaltyReceiver) {
    throw new Error("Set NFT_CONTRACT_ADDRESS, METADATA_URI and ROYALTY_RECEIVER locally.");
  }
  await hre.run("verify:verify", {
    address,
    constructorArguments: [metadataURI, royaltyReceiver, royaltyBps]
  });
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
