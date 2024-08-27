const { deployer, web3 } = require('@openzeppelin/truffle');

module.exports = async function(deployer) {
  await deployer.deploy(Identity);
  await deployer.deploy(Reputation);
  await deployer.deploy(Asset);
  await deployer.deploy(Loan);
  await deployer.deploy(OrderBook);
  await deployer.deploy(Trade);
  await deployer.deploy(Portfolio);
};
