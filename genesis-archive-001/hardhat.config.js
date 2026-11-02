require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
const accounts = process.env.DEPLOYER_KEY ? [process.env.DEPLOYER_KEY] : [];
const networks = {};
if (process.env.SEPOLIA_RPC_URL) networks.sepolia = { url: process.env.SEPOLIA_RPC_URL, chainId: 11155111, accounts };
if (process.env.ETHEREUM_RPC_URL) networks.ethereum = { url: process.env.ETHEREUM_RPC_URL, chainId: 1, accounts };
module.exports = {
  solidity: { version: "0.8.24", settings: { optimizer: { enabled: true, runs: 200 } } },
  networks,
  etherscan: { apiKey: process.env.ETHERSCAN_API_KEY || "" }
};