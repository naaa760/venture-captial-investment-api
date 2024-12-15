const db = require("./database.service");

class BudgetRuleService {
  async getAllRules() {
    return await db.query("SELECT * FROM budget_rules");
  }
}

module.exports = new BudgetRuleService();
