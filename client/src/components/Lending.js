import React, { useState } from "react";
import { Link } from "react-router-dom";
import Web3 from "web3";

const Lending = () => {
  const [amount, setAmount] = useState(0);

  const handleDeposit = async () => {
    const web3 = new Web3(window.ethereum);
    const lendingPool = new web3.eth.Contract(LendingPool.abi, LendingPool.address);

    await lendingPool.methods.deposit(amount).send({ from: window.ethereum.selectedAddress });
  };

  return (
    <div>
      <h1>Lending</h1>
      <form>
        <label>Amount:</label>
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
        <button onClick={handleDeposit}>Deposit</button>
      </form>
    </div>
  );
};
