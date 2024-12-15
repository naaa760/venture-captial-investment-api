const path = require("path");

module.exports = {
  dbPath: path.join(__dirname, "../../cueball.db"),
  csvPath: {
    budget: path.join(__dirname, "../data/budget.csv"),
    investments: path.join(__dirname, "../data/investments.csv"),
  },
};
