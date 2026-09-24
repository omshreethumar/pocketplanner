import { useEffect, useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./index.css";

const API_URL = "http://localhost:5000/api/transactions";

const COLORS = [
  "#8b5cf6",
  "#06b6d4",
  "#ec4899",
  "#f59e0b",
  "#10b981",
  "#6366f1",
];

function App() {
  const [transactions, setTransactions] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("Food");
  const [loading, setLoading] = useState(false);
  const [savingsTarget, setSavingsTarget] = useState(50000);

  const fetchTransactions = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }

      const data = await response.json();

      setTransactions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch error:", error);
      setTransactions([]);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const addTransaction = async (e) => {
    e.preventDefault();

    if (!title.trim() || !amount) {
      alert("Please enter transaction name and amount.");
      return;
    }

    if (Number(amount) <= 0) {
      alert("Amount must be greater than 0.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          amount: Number(amount),
          type,
          category,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add transaction");
      }

      const newTransaction = await response.json();

      setTransactions((prev) => [
        newTransaction,
        ...prev,
      ]);

      setTitle("");
      setAmount("");
      setType("expense");
      setCategory("Food");
    } catch (error) {
      console.error(error);
      alert("Could not add transaction.");
    } finally {
      setLoading(false);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete");
      }

      setTransactions((prev) =>
        prev.filter(
          (transaction) =>
            transaction._id !== id
        )
      );
    } catch (error) {
      console.error(error);
      alert("Could not delete transaction.");
    }
  };

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce(
      (sum, t) =>
        sum + Number(t.amount || 0),
      0
    );

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce(
      (sum, t) =>
        sum + Number(t.amount || 0),
      0
    );

  const balance = income - expenses;

  const savingsRate =
    income > 0
      ? (balance / income) * 100
      : 0;

  const currentSavings = Math.max(
    balance,
    0
  );

  const savingsPercentage =
    savingsTarget > 0
      ? Math.min(
          (currentSavings /
            savingsTarget) *
            100,
          100
        )
      : 0;

  const remainingSavings = Math.max(
    savingsTarget - currentSavings,
    0
  );

  const safeToSpend = Math.max(
    Math.round(balance * 0.2),
    0
  );

  const foodExpenses = transactions
    .filter(
      (t) =>
        t.type === "expense" &&
        t.category === "Food"
    )
    .reduce(
      (sum, t) =>
        sum + Number(t.amount || 0),
      0
    );

  const expenseData = useMemo(() => {
    return transactions
      .filter((t) => t.type === "expense")
      .reduce((result, transaction) => {
        const name =
          transaction.category || "Other";

        const value = Number(
          transaction.amount || 0
        );

        const existing = result.find(
          (item) => item.name === name
        );

        if (existing) {
          existing.value += value;
        } else {
          result.push({
            name,
            value,
          });
        }

        return result;
      }, []);
  }, [transactions]);

  const generateAdvice = () => {
    if (transactions.length === 0) {
      return "Add your first transaction and I'll start learning your money pattern.";
    }

    if (balance < 0) {
      return "Your expenses are currently higher than your recorded income. Let's identify unnecessary spending and rebuild your safety buffer.";
    }

    if (savingsRate >= 30) {
      return `Excellent momentum. Around ${Math.round(
        savingsRate
      )}% of your recorded income remains after expenses.`;
    }

    if (savingsRate >= 15) {
      return `You're building a healthy saving habit. Your current saving rate is around ${Math.round(
        savingsRate
      )}%.`;
    }

    return `Your saving rate is around ${Math.max(
      Math.round(savingsRate),
      0
    )}%. A few small spending changes could accelerate your goal.`;
  };

  const formatMoney = (value) =>
    Number(value || 0).toLocaleString(
      "en-IN"
    );

  return (
    <div className="app">

      {/* =========================
          BACKGROUND WOW EFFECTS
      ========================= */}

      <div className="background-effects">

        <div className="mega-orb mega-orb-one"></div>
        <div className="mega-orb mega-orb-two"></div>
        <div className="mega-orb mega-orb-three"></div>

        <div className="scan-line"></div>

        <div className="floating-money money-1">
          ₹
        </div>

        <div className="floating-money money-2">
          ₹
        </div>

        <div className="floating-money money-3">
          ✦
        </div>

        <div className="floating-money money-4">
          ₹
        </div>

        <div className="floating-money money-5">
          $
        </div>

        <div className="floating-money money-6">
          ✦
        </div>

        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
        <div className="particle particle-6"></div>
        <div className="particle particle-7"></div>
        <div className="particle particle-8"></div>

        <div className="background-grid"></div>
      </div>

      {/* =========================
          NAVBAR
      ========================= */}

      <nav className="navbar glass">

        <div className="brand">

          <div className="brand-icon">
            <div className="brand-core">
              ₹
            </div>

            <span className="brand-orbit"></span>
          </div>

          <div>
            <h2>
              Pocket<span>Planner</span>
            </h2>

            <small>
              AGENTIC MONEY OS
            </small>
          </div>

        </div>

        <div className="nav-links">

          <a
            className="active"
            href="#dashboard"
          >
            Overview
          </a>

          <a href="#analytics">
            Analytics
          </a>

          <a href="#transactions">
            Activity
          </a>

          <a href="#goal">
            Goals
          </a>

        </div>

        <button
          className="sync-button"
          onClick={fetchTransactions}
        >
          <span className="sync-icon">
            ↻
          </span>

          Sync
        </button>

      </nav>

      {/* =========================
          MAIN
      ========================= */}

      <main
        className="main"
        id="dashboard"
      >

        {/* =========================
            HERO
        ========================= */}

        <section className="hero">

          <div className="hero-content">

            <div className="status-pill">
              <span className="status-dot"></span>

              AI FINANCIAL ENGINE

              <span className="status-live">
                LIVE
              </span>
            </div>

            <h1>
              Your money.
              <br />

              <span className="gradient-text">
                Your future.
              </span>
            </h1>

            <p>
              Pocket Planner transforms irregular
              income and everyday expenses into a
              smarter saving journey powered by AI.
            </p>

            <div className="hero-mini-stats">

              <div>
                <span>TRACKED</span>
                <strong>
                  {transactions.length}
                </strong>
              </div>

              <div>
                <span>SAVED</span>
                <strong>
                  {Math.max(
                    Math.round(
                      savingsRate
                    ),
                    0
                  )}
%
                </strong>
              </div>

              <div>
                <span>GOAL</span>
                <strong>
                  {Math.round(
                    savingsPercentage
                  )}
%
                </strong>
              </div>

            </div>

          </div>

          {/* =====================
              MONEY CORE
          ===================== */}

          <div className="money-universe">

            <div className="universe-glow"></div>

            <div className="universe-ring ring-a"></div>
            <div className="universe-ring ring-b"></div>
            <div className="universe-ring ring-c"></div>

            <div className="orbit-dot orbit-dot-a">
              ₹
            </div>

            <div className="orbit-dot orbit-dot-b">
              ✦
            </div>

            <div className="orbit-dot orbit-dot-c">
              ₹
            </div>

            <div className="money-core">

              <div className="core-shine"></div>

              <span>
                AVAILABLE
              </span>

              <strong>
                ₹{formatMoney(balance)}
              </strong>

              <small>
                {balance >= 0
                  ? "● Financial balance"
                  : "● Attention needed"}
              </small>

            </div>

          </div>

        </section>

        {/* =========================
            STATS
        ========================= */}

        <section className="stats-grid">

          <div className="stat-card glass">
            <div className="stat-icon income-icon">
              ↗
            </div>

            <div className="stat-label">
              TOTAL INCOME
            </div>

            <strong>
              ₹{formatMoney(income)}
            </strong>

            <span>
              Money coming in
            </span>

            <div className="stat-wave">
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
            </div>
          </div>

          <div className="stat-card glass">
            <div className="stat-icon expense-icon">
              ↘
            </div>

            <div className="stat-label">
              TOTAL EXPENSES
            </div>

            <strong>
              ₹{formatMoney(expenses)}
            </strong>

            <span>
              Money going out
            </span>

            <div className="stat-wave pink-wave">
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
            </div>
          </div>

          <div className="stat-card glass">
            <div className="stat-icon safe-icon">
              ✦
            </div>

            <div className="stat-label">
              SAFE TO SPEND
            </div>

            <strong>
              ₹{formatMoney(safeToSpend)}
            </strong>

            <span>
              AI spending buffer
            </span>

            <div className="stat-wave cyan-wave">
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
            </div>
          </div>

          <div className="stat-card glass">
            <div className="stat-icon saving-icon">
              ◈
            </div>

            <div className="stat-label">
              SAVING RATE
            </div>

            <strong>
              {Math.max(
                Math.round(savingsRate),
                0
              )}
              %
            </strong>

            <span>
              Income retained
            </span>

            <div className="stat-wave purple-wave">
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
            </div>
          </div>

        </section>

        {/* =========================
            AI SECTION
        ========================= */}

        <section className="feature-grid">

          <div className="ai-card glass">

            <div className="section-top">

              <div>
                <span className="eyebrow">
                  ✦ AGENTIC AI
                </span>

                <h2>
                  Your money has
                  <span> something to say.</span>
                </h2>
              </div>

              <div className="ai-orb-small">
                <div className="ai-orb-core">
                  ✦
                </div>

                <span></span>
                <span></span>
              </div>

            </div>

            <div className="ai-body">

              <div className="ai-avatar">

                <div className="ai-avatar-glow"></div>

                <div className="ai-face">
                  ◉
                </div>

                <div className="ai-signal">
                  THINKING
                  <i></i>
                  <i></i>
                  <i></i>
                </div>

              </div>

              <div className="ai-text">

                <h3>
                  Financial Intelligence
                </h3>

                <p>
                  {generateAdvice()}
                </p>

                <div className="ai-checks">

                  <span>
                    ✓ Spending analyzed
                  </span>

                  <span>
                    ✓ Saving pattern detected
                  </span>

                  <span>
                    ✓ Goal monitored
                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* SIGNAL CARD */}

          <div className="signal-card glass">

            <div className="section-top">

              <div>
                <span className="eyebrow">
                  MONEY RADAR
                </span>

                <h2>
                  Financial signals
                </h2>
              </div>

              <div className="radar-icon">
                ◉
              </div>

            </div>

            <div className="radar">

              <div className="radar-circle circle-1"></div>
              <div className="radar-circle circle-2"></div>
              <div className="radar-circle circle-3"></div>

              <div className="radar-line"></div>

              <div className="radar-center">
                ✦
              </div>

              <div className="radar-blip blip-one"></div>
              <div className="radar-blip blip-two"></div>

            </div>

            <div className="signal-status">

              <div
                className={
                  balance >= 0
                    ? "signal-good"
                    : "signal-warning"
                }
              >
                <span></span>

                {balance >= 0
                  ? "BALANCE STABLE"
                  : "ACTION NEEDED"}
              </div>

              <p>
                {balance >= 0
                  ? "Your current tracked cash flow is positive."
                  : "Your recorded expenses are above income."}
              </p>

            </div>

            {foodExpenses > 3000 ? (
              <div className="alert-chip warning">
                🍔 Food spending is above ₹3,000
              </div>
            ) : (
              <div className="alert-chip">
                ✦ No unusual spending detected
              </div>
            )}

          </div>

        </section>

        {/* =========================
            ANALYTICS
        ========================= */}

        <section
          className="analytics-grid"
          id="analytics"
        >

          <div className="chart-card glass">

            <div className="section-top">

              <div>
                <span className="eyebrow">
                  SPENDING INTELLIGENCE
                </span>

                <h2>
                  Where your money goes
                </h2>
              </div>

              <div className="category-count">
                {expenseData.length}
                <span>
                  categories
                </span>
              </div>

            </div>

            {expenseData.length === 0 ? (
              <div className="empty-state">
                <div>◌</div>
                <p>
                  Add an expense to unlock
                  your spending intelligence.
                </p>
              </div>
            ) : (
              <div className="chart-wrapper">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <PieChart>

                    <Pie
                      data={expenseData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={75}
                      outerRadius={120}
                      paddingAngle={5}
                      stroke="none"
                      animationBegin={100}
                      animationDuration={1200}
                    >
                      {expenseData.map(
                        (_, index) => (
                          <Cell
                            key={index}
                            fill={
                              COLORS[
                                index %
                                  COLORS.length
                              ]
                            }
                          />
                        )
                      )}
                    </Pie>

                    <Tooltip
                      contentStyle={{
                        background:
                          "#121220",
                        border:
                          "1px solid rgba(139,92,246,.3)",
                        borderRadius:
                          "12px",
                        color: "#fff",
                        fontSize: "11px",
                      }}
                      formatter={(value) =>
                        `₹${formatMoney(value)}`
                      }
                    />

                  </PieChart>
                </ResponsiveContainer>

                <div className="chart-center">

                  <span>
                    TOTAL SPENT
                  </span>

                  <strong>
                    ₹{formatMoney(expenses)}
                  </strong>

                  <small>
                    across all categories
                  </small>

                </div>

              </div>
            )}

            <div className="legend">

              {expenseData.map(
                (item, index) => (
                  <div key={item.name}>

                    <i
                      style={{
                        background:
                          COLORS[
                            index %
                              COLORS.length
                          ],
                      }}
                    ></i>

                    <span>
                      {item.name}
                    </span>

                    <strong>
                      ₹{formatMoney(
                        item.value
                      )}
                    </strong>

                  </div>
                )
              )}

            </div>

          </div>

          {/* =====================
              SAVINGS GOAL
          ===================== */}

          <div
            className="goal-card glass"
            id="goal"
          >

            <div className="section-top">

              <div>
                <span className="eyebrow">
                  SAVINGS MISSION
                </span>

                <h2>
                  Your next milestone
                </h2>
              </div>

              <div className="mission-star">
                ✦
              </div>

            </div>

            <div className="goal-ring">

              <div
                className="goal-circle"
                style={{
                  "--goal-progress": `${savingsPercentage * 3.6}deg`,
                }}
              >

                <div className="goal-circle-inner">

                  <strong>
                    {Math.round(
                      savingsPercentage
                    )}
                    %
                  </strong>

                  <span>
                    complete
                  </span>

                </div>

              </div>

              <div className="goal-orbit-dot"></div>

            </div>

            <div className="goal-values">

              <div>
                <span>CURRENT</span>

                <strong>
                  ₹{formatMoney(
                    currentSavings
                  )}
                </strong>
              </div>

              <div>
                <span>TARGET</span>

                <strong>
                  ₹{formatMoney(
                    savingsTarget
                  )}
                </strong>
              </div>

            </div>

            <div className="goal-input">

              <label>
                Savings target
              </label>

              <div>
                <span>₹</span>

                <input
                  type="number"
                  min="1"
                  value={savingsTarget}
                  onChange={(e) =>
                    setSavingsTarget(
                      Number(
                        e.target.value
                      )
                    )
                  }
                />
              </div>

            </div>

            <div className="goal-remaining">

              <span>
                ₹{formatMoney(
                  remainingSavings
                )} remaining
              </span>

              <span>
                {Math.round(
                  savingsPercentage
                )}
                % done
              </span>

            </div>

          </div>

        </section>

        {/* =========================
            ADD TRANSACTION
        ========================= */}

        <section className="add-card glass">

          <div className="add-copy">

            <div className="add-icon">
              +
            </div>

            <div>
              <span className="eyebrow">
                QUICK ACTION
              </span>

              <h2>
                Move your money
              </h2>

              <p>
                Add an income or expense to
                your financial timeline.
              </p>
            </div>

          </div>

          <form onSubmit={addTransaction}>

            <input
              type="text"
              placeholder="What was it?"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

            <div className="money-input">

              <span>₹</span>

              <input
                type="number"
                min="1"
                placeholder="Amount"
                value={amount}
                onChange={(e) =>
                  setAmount(
                    e.target.value
                  )
                }
              />

            </div>

            <select
              value={type}
              onChange={(e) =>
                setType(e.target.value)
              }
            >
              <option value="expense">
                Expense
              </option>

              <option value="income">
                Income
              </option>
            </select>

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            >
              <option value="Food">
                Food
              </option>

              <option value="Rent">
                Rent
              </option>

              <option value="Transport">
                Transport
              </option>

              <option value="Shopping">
                Shopping
              </option>

              <option value="Bills">
                Bills
              </option>

              <option value="Other">
                Other
              </option>
            </select>

            <button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : "Add transaction →"}
            </button>

          </form>

        </section>

        {/* =========================
            TRANSACTIONS
        ========================= */}

        <section
          className="transactions-card glass"
          id="transactions"
        >

          <div className="section-top">

            <div>
              <span className="eyebrow">
                MONEY TIMELINE
              </span>

              <h2>
                Recent activity
              </h2>
            </div>

            <div className="activity-count">
              {transactions.length}
            </div>

          </div>

          {transactions.length === 0 ? (
            <div className="empty-state">
              <div>◌</div>
              <p>
                Your money timeline is waiting.
              </p>
            </div>
          ) : (
            <div className="timeline">

              {transactions.map(
                (transaction, index) => (
                  <div
                    className="transaction"
                    key={transaction._id}
                    style={{
                      animationDelay: `${index * 70}ms`,
                    }}
                  >

                    <div
                      className={`transaction-icon ${
                        transaction.type
                      }`}
                    >
                      {transaction.type ===
                      "income"
                        ? "↗"
                        : "↘"}
                    </div>

                    <div className="transaction-info">

                      <strong>
                        {transaction.title}
                      </strong>

                      <span>
                        {transaction.category ||
                          "Other"}

                        {" • "}

                        {transaction.date
                          ? new Date(
                              transaction.date
                            ).toLocaleDateString(
                              "en-IN"
                            )
                          : "Today"}
                      </span>

                    </div>

                    <div
                      className={`transaction-amount ${
                        transaction.type
                      }`}
                    >
                      {transaction.type ===
                      "income"
                        ? "+"
                        : "-"}
                      ₹{formatMoney(
                        transaction.amount
                      )}
                    </div>

                    <button
                      className="delete-button"
                      onClick={() =>
                        deleteTransaction(
                          transaction._id
                        )
                      }
                    >
                      ×
                    </button>

                  </div>
                )
              )}

            </div>
          )}

        </section>

        {/* =========================
            FOOTER
        ========================= */}

        <footer>

          <div className="footer-brand">
            <span>₹</span>

            <strong>
              PocketPlanner
            </strong>
          </div>

          <p>
            Turning irregular income into stable
            saving with agentic AI.
          </p>

          <small>
            Built for smarter money decisions ✦
          </small>

        </footer>

      </main>
    </div>
  );
}

export default App;