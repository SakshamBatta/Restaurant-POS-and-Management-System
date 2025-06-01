const {
  getUsersCount,
  getTotalRevenue,
  getRevenueStats,
  getOrderSummary,
} = require("../controllers/analyticsController");

const router = require("express").Router();

router.get("/get-users", getUsersCount);
router.get("/total-revenue", getTotalRevenue);
router.get("/revenue", getRevenueStats);
router.get("/summary", getOrderSummary);

module.exports = router;
