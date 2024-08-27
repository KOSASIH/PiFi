const { expect } = require('chai');
const { ethers } = require('hardhat');
const { deployContract, getContractAt } = require('@openzeppelin/hardhat-upgrades');

describe('Portfolio', function () {
  let portfolio;
  let asset;
  let user;

  beforeEach(async function () {
    // Deploy Portfolio contract
    portfolio = await deployContract('Portfolio');

    // Deploy Asset contract
    asset = await deployContract('Asset');

    // Create a new user
    user = await ethers.getSigner();

    // Set up initial asset
    await asset.createAsset('PiFi Token', 'PFT', ethers.utils.parseEther('1000000'));
  });

  it('should allow users to add assets to their portfolio', async function () {
    // Add 100 PFT to the user's portfolio
    await portfolio.addAsset(asset.address, ethers.utils.parseEther('100'), user.address);

    // Verify that the asset has been added to the portfolio
    expect(await portfolio.getAssetBalance(user.address, asset.address)).to.equal(ethers.utils.parseEther('100'));
  });

  it('should allow users to remove assets from their portfolio', async function () {
    // Add 100 PFT to the user's portfolio
    await portfolio.addAsset(asset.address, ethers.utils.parseEther('100'), user.address);

    // Remove 50 PFT from the user's portfolio
    await portfolio.removeAsset(asset.address, ethers.utils.parseEther('50'), user.address);

    // Verify that the asset has been removed from the portfolio
    expect(await portfolio.getAssetBalance(user.address, asset.address)).to.equal(ethers.utils.parseEther('50'));
  });

  it('should allow users to view their portfolio', async function () {
    // Add 100 PFT to the user's portfolio
    await portfolio.addAsset(asset.address, ethers.utils.parseEther('100'), user.address);

    // Add 200 PFT to the user's portfolio
    await portfolio.addAsset(asset.address, ethers.utils.parseEther('200'), user.address);

    // View the user's portfolio
    const portfolioData = await portfolio.getPortfolio(user.address);

    // Verify that the portfolio data is correct
    expect(portfolioData.assets).to.deep.equal([asset.address]);
    expect(portfolioData.balances).to.deep.equal([ethers.utils.parseEther('300')]);
  });

  it('should allow users to transfer assets between portfolios', async function () {
    // Add 100 PFT to the user's portfolio
    await portfolio.addAsset(asset.address, ethers.utils.parseEther('100'), user.address);

    // Create a new user
    const user2 = await ethers.getSigner();

    // Transfer 50 PFT to the new user's portfolio
    await portfolio.transferAsset(asset.address, ethers.utils.parseEther('50'), user.address, user2.address);

    // Verify that the asset has been transferred
    expect(await portfolio.getAssetBalance(user.address, asset.address)).to.equal(ethers.utils.parseEther('50'));
    expect(await portfolio.getAssetBalance(user2.address, asset.address)).to.equal(ethers.utils.parseEther('50'));
  });
});
