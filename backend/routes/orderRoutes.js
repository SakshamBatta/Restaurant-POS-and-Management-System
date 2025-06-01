const {
  createOrder,
  getAllOrders,
  updateOrderStatus,
  updateTakeAwayOrderStatus,
} = require("../controllers/orderController");

const router = require("express").Router();

router.post("/create", createOrder);
router.get("/all", getAllOrders);
router.post("/update/:orderId", updateOrderStatus);
router.post("/updateTakeAway/:orderId", updateTakeAwayOrderStatus);

module.exports = router;
