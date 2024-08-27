const { expect } = require('chai');
const { ethers } = require('hardhat');
const { deployContract, getContractAt } = require('@openzeppelin/hardhat-upgrades');

describe('Loan', function () {
  let loan;
  let asset;
  let user;
  let lendingPool;

  beforeEach(async function () {
    // Deploy Loan contract
    loan = await deployContract('Loan');

    // Deploy Asset contract
    asset = await deployContract('Asset');

    // Deploy LendingPool contract
    lendingPool = await deployContract('LendingPool');

    // Create a new user
    user = await ethers.getSigner();

    // Set up initial asset
    await asset.createAsset('PiFi Token', 'PFT', ethers.utils.parseEther('1000000'));

    // Set up initial lending pool
    await lendingPool.initialize(asset.address);
  });

  it('should allow users to create loans', async function () {
    // Create a new loan
    await loan.createLoan(ethers.utils.parseEther('1000'), ethers.utils.parseEther('10'), user.address, lendingPool.address);

    // Verify that the loan has been created
    expect(await loan.getLoan(user.address, lendingPool.address)).to.not.be.null;
  });

  it('should allow users to update loan terms', async function () {
    // Create a new loan
    await loan.createLoan(ethers.utils.parseEther('1000'), ethers.utils.parseEther('10'), user.address, lendingPool.address);

    // Update the loan terms
    await loan.updateLoanTerms(ethers.utils.parseEther('1200'), ethers.utils.parseEther('12'), user.address, lendingPool.address);

    // Verify that the loan terms have been updated
    expect(await loan.getLoan(user.address, lendingPool.address)).to.deep.equal({
      principal: ethers.utils.parseEther('1200'),
      interestRate: ethers.utils.parseEther('12'),
    });
  });

  it('should allow users to repay loans', async function () {
    // Create a new loan
    await loan.createLoan(ethers.utils.parseEther('1000'), ethers.utils.parseEther('10'), user.address, lendingPool.address);

    // Repay 200 PFT to the loan
    await loan.repay(ethers.utils.parseEther('200'), user.address, lendingPool.address);

    // Verify that the loan balance has been updated
    expect(await loan.getLoanBalance(user.address, lendingPool.address)).to.equal(ethers.utils.parseEther('800'));
  });

  it('should allow users to withdraw collateral', async function () {
    // Create a new loan
    await loan.createLoan(ethers.utils.parseEther('1000'), ethers.utils.parseEther('10'), user.address, lendingPool.address);

    // Withdraw 50 PFT as collateral
    await loan.withdrawCollateral(ethers.utils.parseEther('50'), user.address, lendingPool.address);

    // Verify that the collateral has been withdrawn
    expect(await loan.getCollateralBalance(user.address, lendingPool.address)).to.equal(ethers.utils.parseEther('50'));
  });

  it('should allow users to liquidate loans', async function () {
    // Create a new loan
    await loan.createLoan(ethers.utils.parseEther('1000'), ethers.utils.parseEther('10'), user.address, lendingPool.address);

    // Liquidate the loan
    await loan.liquidate(user.address, lendingPool.address);

    // Verify that the loan has been liquidated
    expect(await loan.getLoan(user.address, lendingPool.address)).to.be.null;
  });
});
