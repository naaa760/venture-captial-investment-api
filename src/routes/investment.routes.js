const express = require("express");
const router = express.Router();
const investmentController = require("../controllers/investment.controller");

router.get("/", investmentController.getAllInvestments);
router.get("/valid", investmentController.getValidInvestments);
router.get("/invalid", investmentController.getInvalidInvestments);

module.exports = router;
