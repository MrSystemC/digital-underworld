const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
function isIpfsCid(value) {
  return /^Qm[1-9A-HJ-NP-Za-km-z]{44}$/.test(value) || /^b[a-z2-7]{20,}$/.test(value);
}
const cid = process.env.ARTWORK_CID;
if (!cid || !isIpfsCid(cid)) throw new Error("Set ARTWORK_CID to a real CID from your IPFS provider.");
const root = path.join(__dirname, "..");
const artworkPath = path.join(root, "artwork", "GENESIS_ARCHIVE_001_MASTER.png");
const provenancePath = path.join(root, "artwork", "PROVENANCE.json");
const metadataPath = path.join(root, "metadata", "1.json");
for (const file of [artworkPath, provenancePath, metadataPath]) {
  if (!fs.existsSync(file)) throw new Error("Required file is missing: " + file);
}
const hash = crypto.createHash("sha256").update(fs.readFileSync(artworkPath)).digest("hex");
const provenance = JSON.parse(fs.readFileSync(provenancePath, "utf8"));
const metadata = JSON.parse(fs.readFileSync(metadataPath, "utf8"));
if (hash !== provenance.sha256) throw new Error("Artwork hash does not match provenance.");
if (metadata.properties?.artwork_sha256 !== hash) throw new Error("Metadata hash does not match artwork.");
metadata.image = "ipfs://" + cid;
fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2) + "\n");
console.log("Artwork hash verified:", hash);
console.log("Metadata image URI set to ipfs://" + cid);
