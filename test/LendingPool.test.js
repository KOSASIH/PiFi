const { expect } = require('chai');
const { ethers } = require('hardhat');
const { deployContract, getContractAt } = require('@openzeppelin/hardhat-upgrades');

describe('LendingPool', function () {
  let lendingPool;
  let asset;
  let loan;
  let user;

  beforeEach(async function () {
    // Deploy LendingPool contract
    lendingPool = await deployContract('LendingPool');

    // Deploy Asset contract
    asset = await deployContract('Asset');

    // Deploy Loan contract
    loan = await deployContract('Loan');

    // Create a new user
    user = await ethers.getSigner();

    // Set up initial asset
    await asset.createAsset('PiFi Token', 'PFT', ethers.utils.parseEther('1000000'));

    // Set up initial loan
    await loan.createLoan(ethers.utils.parseEther('1000'), ethers.utils.parseEther('10'), user.address, lendingPool.address);
  });

  it('should allow users to deposit assets', async function () {
    // Deposit 100 PFT into the lending pool
    await lendingPool.deposit(asset.address, ethers.utils.parseEther('100'), user.address);

    // Verify that the user's balance has been updated
    expect(await lendingPool.getUserBalance(user.address, asset.address)).to.equal(ethers.utils.parseEther('100'));
  });

  it('should allow users to borrow assets', async function () {
    // Borrow 50 PFT from the lending pool
    await lendingPool.borrow(asset.address, ethers.utils.parseEther('50'), user.address);

    // Verify that the user's balance has been updated
    expect(await lendingPool.getUserBalance(user.address, asset.address)).to.equal(ethers.utils.parseEther('50'));
  });

  it('should allow users to repay loans', async function () {
    // Repay 20 PFT to the lending pool
    await lendingPool.repay(asset.address, ethers.utils.parseEther('20'), user.address);

    // Verify that the user's balance has been updated
    expect(await lendingPool.getUserBalance(user.address, asset.address)).to.equal(ethers.utils.parseEther('30'));
  });

  it('should allow users to withdraw assets', async function () {
    // Withdraw 30 PFT from the lending pool
    await lendingPool.withdraw(asset.address, ethers.utils.parseEther('30'), user.address);

    // Verify that the user's balance has been updated
    expect(await lendingPool.getUserBalance(user.address, asset.address)).to.equal(ethers.utils.parseEther('0'));
  });
});
