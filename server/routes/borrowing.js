const express = require("express");
const router = express.Router();
const web3 = require("web3");
const Loan = require("../models/Loan");

router.post("/borrow", async (req, res) => {
  const { amount, interestRate, repaymentPeriod } = req.body;
  const loan = new Loan();

  try {
    await loan.borrow(amount, interestRate, repaymentPeriod);
    res.json({ message: "Borrowing successful" });
  } catch (error) {
    res.status(500).json({ message: "Error borrowing" });
  }
});

module.exports = router;
