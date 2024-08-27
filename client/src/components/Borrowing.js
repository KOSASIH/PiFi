import React, { useState } from "react";
import { Link } from "react-router-dom";
import Web3 from "web3";

const Borrowing = () => {
  const [amount, setAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [repaymentPeriod, setRepaymentPeriod] = useState(0);

  const handleBorrow = async () => {
    const web3 = new Web3(window.ethereum);
    const loan = new web3.eth.Contract(Loan.abi, Loan.address);

    await loan.methods.borrow(amount, interestRate, repaymentPeriod).send({ from: window.ethereum.selectedAddress });
  };

  return (
    <div>
      <h1>Borrowing</h1>
      <form>
        <label>Amount:</label>
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
        <label>Interest Rate:</label>
        <input type="number" value={interestRate} onChange={e => setInterestRate(e.target.value)} />
        <label>Repayment Period:</label>
        <input type="number" value={repaymentPeriod} onChange={e => setRepaymentPeriod(e.target.value)} />
        <button onClick={handleBorrow}>Borrow</button>
      </form>
    </div>
  );
};
