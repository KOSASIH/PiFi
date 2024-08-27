const web3 = require("web3");

class LendingPool {
  constructor() {
    this.contract = new web3.eth.Contract(LendingPool.abi, LendingPool.address);
  }

  async deposit(amount) {
    await this.contract.methods.deposit(amount).send({ from: web3.eth.accounts[0] });
  }

  async getBalance(address) {
    return await this.contract.methods.getBalance(address).call();
  }
}

module.exports = LendingPool;
