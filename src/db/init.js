const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const { parse } = require("csv-parse");
const path = require("path");

const db = new sqlite3.Database("cueball.db");

function initDatabase() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Create budget rules table
      db.run(`
        CREATE TABLE IF NOT EXISTS budget_rules (
          id INTEGER PRIMARY KEY,
          amount REAL NOT NULL,
          time_period TEXT,
          sector TEXT
        )
      `);

      // Create investments table
      db.run(`
        CREATE TABLE IF NOT EXISTS investments (
          id INTEGER PRIMARY KEY,
          date TEXT NOT NULL,
          amount REAL NOT NULL,
          sector TEXT NOT NULL
        )
      `);

      // Load budget rules from CSV
      fs.createReadStream(path.join(__dirname, "../data/budget.csv"))
        .pipe(parse({ columns: true }))
        .on("data", (row) => {
          db.run(
            "INSERT INTO budget_rules (id, amount, time_period, sector) VALUES (?, ?, ?, ?)",
            [row.ID, row.Amount, row["Time Period"], row.Sector],
          );
        });

      // Load investments from CSV
      fs.createReadStream(path.join(__dirname, "../data/investments.csv"))
        .pipe(parse({ columns: true }))
        .on("data", (row) => {
          db.run(
            "INSERT INTO investments (id, date, amount, sector) VALUES (?, ?, ?, ?)",
            [row.ID, row.Date, row.Amount, row.Sector],
          );
        })
        .on("end", () => {
          resolve();
        })
        .on("error", (error) => {
          reject(error);
        });
    });
  });
}

module.exports = { db, initDatabase };
