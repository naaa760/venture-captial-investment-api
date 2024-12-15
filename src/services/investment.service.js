const db = require("./database.service");
const { validateInvestment } = require("../utils/investmentValidator");

class InvestmentService {
  async getAllInvestments(sortByDate = false) {
    const query =
      "SELECT * FROM investments" + (sortByDate ? " ORDER BY date" : "");
    return await db.query(query);
  }

  async getValidInvestments() {
    const investments = await this.getAllInvestments();
    const rules = await db.query("SELECT * FROM budget_rules");
    return investments.filter(
      (investment) =>
        validateInvestment(investment, rules, investments).length === 0,
    );
  }

  async getInvalidInvestments() {
    const investments = await this.getAllInvestments();
    const rules = await db.query("SELECT * FROM budget_rules");
    return investments.filter(
      (investment) =>
        validateInvestment(investment, rules, investments).length > 0,
    );
  }
}

module.exports = new InvestmentService();
