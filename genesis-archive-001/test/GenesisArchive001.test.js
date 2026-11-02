const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GenesisArchive001", function () {
  const metadataURI = "ipfs://bafybeigdyrzt5sfp7udm7hu76uh6m4b7qv6x4u2s3m6n5x4y3z2a7bcde";
  const royaltyBps = 500;
  let royaltyReceiver, collector, other, nft;

  beforeEach(async function () {
    [, royaltyReceiver, collector, other] = await ethers.getSigners();
    const Factory = await ethers.getContractFactory("GenesisArchive001");
    nft = await Factory.deploy(metadataURI, royaltyReceiver.address, royaltyBps);
    await nft.waitForDeployment();
  });

  it("has the intended identity and fixed supply", async function () {
    expect(await nft.name()).to.equal("Genesis Archive #001");
    expect(await nft.symbol()).to.equal("GENESIS001");
    expect(await nft.TOKEN_ID()).to.equal(1n);
    expect(await nft.minted()).to.equal(false);
  });

  it("allows exactly one owner mint", async function () {
    await expect(nft.mint(collector.address))
      .to.emit(nft, "Transfer").withArgs(ethers.ZeroAddress, collector.address, 1n);
    expect(await nft.ownerOf(1)).to.equal(collector.address);
    expect(await nft.minted()).to.equal(true);
    await expect(nft.mint(other.address)).to.be.revertedWithCustomError(nft, "AlreadyMinted");
  });

  it("restricts minting to the owner", async function () {
    await expect(nft.connect(other).mint(other.address))
      .to.be.revertedWithCustomError(nft, "OwnableUnauthorizedAccount").withArgs(other.address);
  });

  it("rejects a zero recipient", async function () {
    await expect(nft.mint(ethers.ZeroAddress)).to.be.revertedWithCustomError(nft, "InvalidRecipient");
  });

  it("rejects an empty IPFS path", async function () {
    const Factory = await ethers.getContractFactory("GenesisArchive001");
    await expect(Factory.deploy("ipfs://", royaltyReceiver.address, royaltyBps))
      .to.be.revertedWithCustomError(Factory, "InvalidMetadataURI");
  });

  it("rejects non-IPFS metadata URIs", async function () {
    const Factory = await ethers.getContractFactory("GenesisArchive001");
    await expect(Factory.deploy("https://example.com/1.json", royaltyReceiver.address, royaltyBps))
      .to.be.revertedWithCustomError(Factory, "InvalidMetadataURI");
  });

  it("rejects a zero royalty receiver", async function () {
    const Factory = await ethers.getContractFactory("GenesisArchive001");
    await expect(Factory.deploy(metadataURI, ethers.ZeroAddress, royaltyBps))
      .to.be.revertedWithCustomError(Factory, "InvalidRoyaltyReceiver");
  });

  it("caps royalties at ten percent", async function () {
    const Factory = await ethers.getContractFactory("GenesisArchive001");
    await expect(Factory.deploy(metadataURI, royaltyReceiver.address, 1001))
      .to.be.revertedWithCustomError(Factory, "RoyaltyTooHigh").withArgs(1001, 1000);
  });

  it("keeps metadata URI fixed after mint and transfer", async function () {
    await expect(nft.tokenURI(1)).to.be.revertedWithCustomError(nft, "ERC721NonexistentToken").withArgs(1n);
    await nft.mint(collector.address);
    expect(await nft.tokenURI(1)).to.equal(metadataURI);
    await nft.connect(collector).transferFrom(collector.address, other.address, 1);
    expect(await nft.ownerOf(1)).to.equal(other.address);
    expect(await nft.tokenURI(1)).to.equal(metadataURI);
  });

  it("signals a five-percent EIP-2981 royalty", async function () {
    const salePrice = ethers.parseEther("10");
    const [receiver, amount] = await nft.royaltyInfo(1, salePrice);
    expect(receiver).to.equal(royaltyReceiver.address);
    expect(amount).to.equal(ethers.parseEther("0.5"));
    expect(await nft.supportsInterface("0x2a55205a")).to.equal(true);
  });

  it("supports ERC-721", async function () {
    expect(await nft.supportsInterface("0x80ac58cd")).to.equal(true);
  });
});
