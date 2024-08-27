const { deployer, web3 } = require('@openzeppelin/truffle');
const { BN } = web3.utils;

const Identity = artifacts.require('Identity');
const Reputation = artifacts.require('Reputation');
const Asset = artifacts.require('Asset');
const Loan = artifacts.require('Loan');
const OrderBook = artifacts.require('OrderBook');
const Trade = artifacts.require('Trade');
const Portfolio = artifacts.require('Portfolio');

module.exports = async function(deployer) {
  // Deploy Identity contract
  const identityInstance = await deployer.deploy(Identity);
  console.log(`Identity contract deployed at ${identityInstance.address}`);

  // Deploy Reputation contract
  const reputationInstance = await deployer.deploy(Reputation);
  console.log(`Reputation contract deployed at ${reputationInstance.address}`);

  // Deploy Asset contract
  const assetInstance = await deployer.deploy(Asset);
  console.log(`Asset contract deployed at ${assetInstance.address}`);

  // Deploy Loan contract
  const loanInstance = await deployer.deploy(Loan);
  console.log(`Loan contract deployed at ${loanInstance.address}`);

  // Deploy OrderBook contract
  const orderBookInstance = await deployer.deploy(OrderBook);
  console.log(`OrderBook contract deployed at ${orderBookInstance.address}`);

  // Deploy Trade contract
  const tradeInstance = await deployer.deploy(Trade);
  console.log(`Trade contract deployed at ${tradeInstance.address}`);

  // Deploy Portfolio contract
  const portfolioInstance = await deployer.deploy(Portfolio);
  console.log(`Portfolio contract deployed at ${portfolioInstance.address}`);

  // Set up initial asset
  const initialAsset = await assetInstance.createAsset('PiFi Token', 'PFT', new BN(1000000));
  console.log(`Initial asset created with ID ${initialAsset.logs[0].args.assetID}`);

  // Set up initial loan
  const initialLoan = await loanInstance.createLoan(new BN(1000), new BN(10), identityInstance.address, reputationInstance.address);
  console.log(`Initial loan created with ID ${initialLoan.logs[0].args.loanID}`);

  // Set up initial order book
  const initialOrderBook = await orderBookInstance.createOrderBook(assetInstance.address, new BN(100));
  console.log(`Initial order book created with ID ${initialOrderBook.logs[0].args.orderBookID}`);

  // Set up initial trade
  const initialTrade = await tradeInstance.executeTrade(new BN(100), new BN(10), identityInstance.address, reputationInstance.address);
  console.log(`Initial trade executed with ID ${initialTrade.logs[0].args.tradeID}`);

  // Set up initial portfolio
  const initialPortfolio = await portfolioInstance.addPortfolioEntry(assetInstance.address, new BN(100));
  console.log(`Initial portfolio entry added with ID ${initialPortfolio.logs[0].args.portfolioID}`);
};
