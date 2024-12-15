const asyncHandler = require("express-async-handler");
const investmentService = require("../services/investment.service");

exports.getAllInvestments = asyncHandler(async (req, res) => {
  const { sort } = req.query;
  const investments = await investmentService.getAllInvestments(
    sort === "date",
  );
  res.json(investments);
});

exports.getValidInvestments = asyncHandler(async (req, res) => {
  const investments = await investmentService.getValidInvestments();
  res.json(investments);
});

exports.getInvalidInvestments = asyncHandler(async (req, res) => {
  const investments = await investmentService.getInvalidInvestments();
  res.json(investments);
});
