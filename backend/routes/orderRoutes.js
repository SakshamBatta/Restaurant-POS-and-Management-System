const {
  createOrder,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const router = require("express").Router();

router.post("/create", createOrder);
router.get("/all", getAllOrders);
router.post("/update/:orderId", updateOrderStatus);

module.exports = router;
