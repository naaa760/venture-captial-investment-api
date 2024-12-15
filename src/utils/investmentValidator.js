const moment = require("moment");

function checkBudgetRule(investment, rule, allInvestments) {
  const investmentDate = moment(investment.date, "DD/MM/YYYY");

  const relevantInvestments = allInvestments.filter((inv) => {
    const invDate = moment(inv.date, "DD/MM/YYYY");

    if (invDate.isAfter(investmentDate)) return false;
    if (rule.sector && inv.sector !== rule.sector) return false;

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

  const totalAmount =
    relevantInvestments.reduce((sum, inv) => sum + inv.amount, 0) +
    investment.amount;
  return totalAmount <= rule.amount;
}

exports.validateInvestment = (investment, rules, allInvestments) => {
  return rules
    .filter((rule) => !checkBudgetRule(investment, rule, allInvestments))
    .map((rule) => rule.id);
};
