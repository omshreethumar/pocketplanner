# 💰 Pocket Planner

### Turning Irregular Income into Stable Saving with Agentic AI 🤖

Pocket Planner is an AI-powered personal finance web application that helps users manage their income, track expenses, understand spending patterns, and build better saving habits.

---

## 🎯 Problem

People with irregular income often struggle to:

- Track where their money is going
- Control unnecessary expenses
- Know how much they can safely spend
- Set realistic saving goals
- Maintain consistent saving habits

Traditional expense trackers mainly record transactions. Pocket Planner goes a step further by turning financial data into useful insights and saving guidance.

---

## 💡 Solution

Pocket Planner provides a simple and interactive dashboard where users can:

- 💰 Track income and expenses
- 📊 Analyze spending patterns
- 🏷️ Categorize transactions
- 🎯 Set savings goals
- 📈 Monitor savings progress
- 🤖 Get AI-powered financial guidance
- ⚡ Identify important spending signals

---

## ✨ Features

### 💳 Transaction Management
Users can add and delete income and expense transactions with:

- Transaction title
- Amount
- Type
- Category

### 💰 Smart Balance
Automatically calculates:

- Total income
- Total expenses
- Available balance

### 📊 Expense Analytics
Visualizes spending using interactive charts and category-based analysis.

### 🎯 Savings Goal
Users can set a savings target and track:

- Current savings
- Target amount
- Remaining amount
- Progress percentage

### 🤖 AI Financial Guidance
Provides financial insights and recommendations based on the user's spending activity.

### ⚡ Financial Signals
Helps users notice important spending patterns and saving opportunities.

### 🎨 Modern Dashboard
The application includes:

- Modern dark UI
- Glassmorphism design
- Smooth animations
- Hover effects
- Interactive cards
- Responsive layout

---

## 🧠 Agentic AI

Pocket Planner is designed to evolve from a simple expense tracker into an intelligent financial assistant.

### Workflow

```text
User Financial Data
        ↓
Transaction Analysis
        ↓
Spending Pattern Detection
        ↓
Financial Insight
        ↓
             ┌─────────────────┐
             │      User       │
             └────────┬────────┘
                      ↓
             ┌─────────────────┐
             │ React Frontend  │
             │  Pocket Planner │
             └────────┬────────┘
                      ↓
                REST API
                      ↓
             ┌─────────────────┐
             │ Express Backend │
             │     Node.js     │
             └────────┬────────┘
                      ↓
             ┌─────────────────┐
             │     MongoDB     │
             └─────────────────┘
pocket-planner/
│
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── server/
│   ├── server.cjs
│   ├── models/
│   │   └── Transaction.cjs
│   └── routes/
│       └── transactions.cjs
│
├── public/
│
├── package.json
├── package-lock.json
├── vite.config.js
├── .gitignore
└── README.md
AI Recommendation

git clone YOUR_GITHUB_REPOSITORY_URL
cd pocket-planner
npm install
MONGODB_URI=your_mongodb_connection_string
PORT=5000
Start Backend

Open Terminal 1:

node server/server.cjs

Expected output:

Server running on http://localhost:5000
MongoDB connected successfully
Start Frontend

Open Terminal 2:

npx vite

Then open the URL shown by Vite.

🔌 API Endpoints
Get Transactions
GET /api/transactions
Add Transaction
POST /api/transactions

Example:

{
  "title": "Food",
  "amount": 850,
  "type": "expense",
  "category": "Food"
}
Delete Transaction
DELETE /api/transactions/:id
cd pocket-planner
        ↓
Saving Actionnpm install
