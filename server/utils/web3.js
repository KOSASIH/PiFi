const Web3 = require("web3");

const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/YOUR_PROJECT_ID"));

module.exports = web3;
