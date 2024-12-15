const asyncHandler = require("express-async-handler");
const budgetRuleService = require("../services/budgetRule.service");

exports.getAllRules = asyncHandler(async (req, res) => {
  const rules = await budgetRuleService.getAllRules();
  res.json(rules);
});
