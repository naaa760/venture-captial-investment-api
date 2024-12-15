const express = require("express");
const router = express.Router();
const budgetRuleController = require("../controllers/budgetRule.controller");

router.get("/", budgetRuleController.getAllRules);

module.exports = router;
