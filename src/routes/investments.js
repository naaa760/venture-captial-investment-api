const express = require("express");
const router = express.Router();
const { db } = require("../db/init");
const { validateInvestment } = require("../utils/validateInvestment");

// Get all investments
router.get("/", (req, res) => {
  const { sort } = req.query;
  const query =
    "SELECT * FROM investments" + (sort === "date" ? " ORDER BY date" : "");

  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Get valid investments
router.get("/valid", (req, res) => {
  db.all("SELECT * FROM investments", [], (err, investments) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    db.all("SELECT * FROM budget_rules", [], (err, rules) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      const validInvestments = investments.filter(
        (investment) =>
          validateInvestment(investment, rules, investments).length === 0,
      );

      res.json(validInvestments);
    });
  });
});

// Get invalid investments
router.get("/invalid", (req, res) => {
  db.all("SELECT * FROM investments", [], (err, investments) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    db.all("SELECT * FROM budget_rules", [], (err, rules) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      const invalidInvestments = investments.filter(
        (investment) =>
          validateInvestment(investment, rules, investments).length > 0,
      );

      res.json(invalidInvestments);
    });
  });
});

module.exports = router;
