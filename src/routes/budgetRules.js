const express = require("express");
const router = express.Router();
const { db } = require("../db/init");

// Get all budget rules
router.get("/", (req, res) => {
  db.all("SELECT * FROM budget_rules", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

module.exports = router;
