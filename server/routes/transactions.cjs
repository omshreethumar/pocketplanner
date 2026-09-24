const express = require("express");
const Transaction = require("../models/Transaction.cjs");

const router = express.Router();

// Get all transactions
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch transactions",
      error: error.message
    });
  }
});

// Add transaction
router.post("/", async (req, res) => {
  try {
    const transaction = new Transaction(req.body);

    const savedTransaction = await transaction.save();

    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(400).json({
      message: "Failed to add transaction",
      error: error.message
    });
  }
});

// Delete transaction
router.delete("/:id", async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);

    res.json({
      message: "Transaction deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete transaction",
      error: error.message
    });
  }
});

// Temporary test route
router.get("/test-add", async (req, res) => {
  try {
    const transaction = await Transaction.create({
      title: "Food",
      amount: 850,
      type: "expense",
      category: "Food"
    });

    res.json(transaction);
  } catch (error) {
    res.status(500).json({
      message: "Failed to add test transaction",
      error: error.message
    });
  }
});

module.exports = router;