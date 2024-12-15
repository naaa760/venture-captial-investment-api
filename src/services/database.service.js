const sqlite3 = require("sqlite3").verbose();
const { dbPath } = require("../config/database");
const logger = require("../utils/logger");

class DatabaseService {
  constructor() {
    this.db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        logger.error("Database connection error:", err);
        throw err;
      }
      logger.info("Connected to SQLite database");
    });
  }

  query(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          logger.error("Database query error:", err);
          reject(err);
          return;
        }
        resolve(rows);
      });
    });
  }

  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err) {
        if (err) {
          logger.error("Database run error:", err);
          reject(err);
          return;
        }
        resolve({ id: this.lastID, changes: this.changes });
      });
    });
  }
}

module.exports = new DatabaseService();
