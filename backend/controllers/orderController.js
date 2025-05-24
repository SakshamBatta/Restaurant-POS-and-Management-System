const Order = require("../models/orderSchema");
const TableSchema = require("../models/tableSchema");

exports.createOrder = async (req, res) => {
  try {
    const { items, orderType, instructions, grandTotal, user, deliveryTime } =
      req.body;

    const orderCount = await Order.countDocuments();
    const orderNumber = orderCount + 1;

    const orderStatus =
      orderType === "Dine In"
        ? "Ongoing"
        : orderType === "Take Away"
        ? "Not Picked up"
        : "Served";

    const availableTable = await TableSchema.findOne({ status: "Available" });
    if (!availableTable) {
      return res.status(400).json({ message: "No tables available" });
    }

    availableTable.status = "Reserved";
    await availableTable.save();

    const tableName =
      orderType === "Dine In" ? `Table ${availableTable.name}` : "";

    const noOfItems = items.reduce((sum, item) => sum + item.quantity, 0);

    const newOrder = new Order({
      orderNumber,
      tableName,
      noOfItems,
      orderType,
      orderStatus,
      items,
      instructions,
      grandTotal,
      user,
      deliveryTime,
    });

    await newOrder.save();

    return res.status(201).json({
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Create Order Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (err) {
    console.error("Get All Orders Error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.orderStatus = "Served";
    order.orderType = "Done";

    await order.save();

    const tableName = order.tableName.split(" ")[1];
    const table = await TableSchema.findOne({ name: tableName });
    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }
    table.status = "Available";
    await table.save();
    return res
      .status(200)
      .json({ message: "Order status updated successfully" });
  } catch (err) {
    console.error("Error updating order:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
