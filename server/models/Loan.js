const web3 = require("web3");

class Loan {
  constructor() {
    this.contract = new web3.eth.Contract(Loan.abi, Loan.address);
  }

  async borrow(amount, interestRate, repaymentPeriod) {
    await this.contract.methods.borrow(amount, interestRate, repaymentPeriod).send({ from: web3.eth.accounts[0] });
  }

  async repay() {
    await this.contract.methods.repay().send({ from: web3.eth.accounts[0] });
  }
}

module.exports = Loan;
