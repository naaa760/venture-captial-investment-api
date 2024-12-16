const { validateInvestment } = require("../src/utils/investmentValidator");

// Mock moment.js for consistent date parsing
const moment = require("moment");
jest.mock("moment", () => {
  const actualMoment = jest.requireActual("moment");
  return (date, format) => actualMoment(date, format);
});

describe("validateInvestment", () => {
  it("should return an empty array if all rules are satisfied", () => {
    const investment = { amount: 500, date: "15/12/2024", sector: "Tech" };
    const rules = [
      { id: 1, amount: 1000, time_period: "Month", sector: "Tech" },
    ];
    const allInvestments = [
      { amount: 300, date: "10/12/2024", sector: "Tech" },
    ];

    const result = validateInvestment(investment, rules, allInvestments);
    expect(result).toEqual([]);
  });

  it("should return rule IDs that are violated", () => {
    const investment = { amount: 800, date: "15/12/2024", sector: "Tech" };
    const rules = [
      { id: 1, amount: 1000, time_period: "Month", sector: "Tech" },
      { id: 2, amount: 500, time_period: "Month", sector: "Tech" },
    ];
    const allInvestments = [
      { amount: 300, date: "10/12/2024", sector: "Tech" },
    ];

    const result = validateInvestment(investment, rules, allInvestments);
    expect(result).toEqual([1, 2]);
  });

  it("should handle rules with different time periods correctly", () => {
    const investment = { amount: 400, date: "15/12/2024", sector: "Tech" };
    const rules = [
      { id: 1, amount: 1000, time_period: "Month", sector: "Tech" },
      { id: 2, amount: 1500, time_period: "Year", sector: "Tech" },
    ];
    const allInvestments = [
      { amount: 300, date: "10/12/2024", sector: "Tech" },
      { amount: 500, date: "01/01/2024", sector: "Tech" },
    ];

    const result = validateInvestment(investment, rules, allInvestments);
    expect(result).toEqual([]);
  });

  it("should handle rules with no sector specified", () => {
    const investment = { amount: 600, date: "15/12/2024", sector: "Finance" };
    const rules = [{ id: 1, amount: 1000, time_period: "Month" }];
    const allInvestments = [
      { amount: 300, date: "10/12/2024", sector: "Tech" },
    ];

    const result = validateInvestment(investment, rules, allInvestments);
    expect(result).toEqual([]);
  });

  it("should return rule IDs for violated rules with no time period specified", () => {
    const investment = { amount: 1200, date: "15/12/2024", sector: "Tech" };
    const rules = [{ id: 1, amount: 1000 }];
    const allInvestments = [
      { amount: 300, date: "10/12/2024", sector: "Tech" },
    ];

    const result = validateInvestment(investment, rules, allInvestments);
    expect(result).toEqual([1]);
  });

  it("should ignore investments made after the current investment date", () => {
    const investment = { amount: 600, date: "15/12/2024", sector: "Tech" };
    const rules = [
      { id: 1, amount: 1000, time_period: "Month", sector: "Tech" },
    ];
    const allInvestments = [
      { amount: 300, date: "20/12/2024", sector: "Tech" },
    ];

    const result = validateInvestment(investment, rules, allInvestments);
    expect(result).toEqual([]);
  });

  it("should handle investments in different sectors correctly", () => {
    const investment = { amount: 600, date: "15/12/2024", sector: "Finance" };
    const rules = [
      { id: 1, amount: 1000, time_period: "Month", sector: "Tech" },
    ];
    const allInvestments = [
      { amount: 300, date: "10/12/2024", sector: "Tech" },
    ];

    const result = validateInvestment(investment, rules, allInvestments);
    expect(result).toEqual([]);
  });
});
