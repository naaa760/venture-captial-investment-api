const moment = require("moment");

function checkBudgetRule(investment, rule, allInvestments) {
  const investmentDate = moment(investment.date, "DD/MM/YYYY");

  // Filter investments based on time period and sector
  const relevantInvestments = allInvestments.filter((inv) => {
    const invDate = moment(inv.date, "DD/MM/YYYY");

    // Skip future investments
    if (invDate.isAfter(investmentDate)) {
      return false;
    }

    // Check sector if rule has sector constraint
    if (rule.sector && inv.sector !== rule.sector) {
      return false;
    }

    // Check time period
    switch (rule.time_period) {
      case "Month":
        return invDate.isSame(investmentDate, "month");
      case "Quarter":
        return invDate.isSame(investmentDate, "quarter");
      case "Year":
        return invDate.isSame(investmentDate, "year");
      default:
        return true;
    }
  });

  // Calculate total investment amount
  const totalAmount =
    relevantInvestments.reduce((sum, inv) => sum + inv.amount, 0) +
    investment.amount;

  return totalAmount <= rule.amount;
}

function validateInvestment(investment, rules, allInvestments) {
  const violations = [];

  for (const rule of rules) {
    if (!checkBudgetRule(investment, rule, allInvestments)) {
      violations.push(rule.id);
    }
  }

  return violations;
}

module.exports = { validateInvestment };
