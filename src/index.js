const express = require("express");
const cors = require("cors");
const { initDatabase } = require("./db/init");
const investmentsRouter = require("./routes/investments");
const budgetRulesRouter = require("./routes/budgetRules");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/investments", investmentsRouter);
app.use("/api/budget-rules", budgetRulesRouter);

// Initialize database and start server
initDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to initialize database:", error);
    process.exit(1);
  });
