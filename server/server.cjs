const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const transactionRoutes = require("./routes/transactions.cjs");

const app = express();

app.use(cors());
app.use(express.json());

// Transaction API
app.use("/api/transactions", transactionRoutes);

const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error.message);
  });

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Pocket Planner Backend is running 🚀"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});