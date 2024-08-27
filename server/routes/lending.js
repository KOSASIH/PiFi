const express = require("express");
const router = express.Router();
const web3 = require("web3");
const LendingPool = require("../models/LendingPool");

router.post("/deposit", async (req, res) => {
  const { amount } = req.body;
  const lendingPool = new LendingPool();

  try {
    await lendingPool.deposit(amount);
    res.json({ message: "Deposit successful" });
  } catch (error) {
    res.status(500).json({ message: "Error depositing" });
  }
});

module.exports = router;
