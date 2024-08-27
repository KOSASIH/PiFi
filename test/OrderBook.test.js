const { expect } = require('chai');
const { ethers } = require('hardhat');
const { deployContract, getContractAt } = require('@openzeppelin/hardhat-upgrades');

describe('OrderBook', function () {
  let orderBook;
  let asset;
  let user;

  beforeEach(async function () {
    // Deploy OrderBook contract
    orderBook = await deployContract('OrderBook');

    // Deploy Asset contract
    asset = await deployContract('Asset');

    // Create a new user
    user = await ethers.getSigner();

    // Set up initial asset
    await asset.createAsset('PiFi Token', 'PFT', ethers.utils.parseEther('1000000'));
  });

  it('should allow users to create buy orders', async function () {
    // Create a new buy order
    await orderBook.createBuyOrder(asset.address, ethers.utils.parseEther('100'), ethers.utils.parseEther('10'), user.address);

    // Verify that the order has been created
    expect(await orderBook.getBuyOrder(user.address, asset.address)).to.not.be.null;
  });

  it('should allow users to create sell orders', async function () {
    // Create a new sell order
    await orderBook.createSellOrder(asset.address, ethers.utils.parseEther('100'), ethers.utils.parseEther('10'), user.address);

    // Verify that the order has been created
    expect(await orderBook.getSellOrder(user.address, asset.address)).to.not.be.null;
  });

  it('should allow users to cancel orders', async function () {
    // Create a new buy order
    await orderBook.createBuyOrder(asset.address, ethers.utils.parseEther('100'), ethers.utils.parseEther('10'), user.address);

    // Cancel the order
    await orderBook.cancelOrder(user.address, asset.address);

    // Verify that the order has been cancelled
    expect(await orderBook.getBuyOrder(user.address, asset.address)).to.be.null;
  });

  it('should allow users to execute trades', async function () {
    // Create a new buy order
    await orderBook.createBuyOrder(asset.address, ethers.utils.parseEther('100'), ethers.utils.parseEther('10'), user.address);

    // Create a new sell order
    await orderBook.createSellOrder(asset.address, ethers.utils.parseEther('100'), ethers.utils.parseEther('10'), user.address);

    // Execute the trade
    await orderBook.executeTrade(user.address, asset.address);

    // Verify that the trade has been executed
    expect(await orderBook.getTrade(user.address, asset.address)).to.not.be.null;
  });
});
