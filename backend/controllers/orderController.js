const chefSchema = require("../models/chefSchema");
const Order = require("../models/orderSchema");
const TableSchema = require("../models/tableSchema");
const User = require("../models/userSchema");

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
        ? "Ongoing"
        : "Served";

    const people = orderType === "Dine In" && user.people;
    let table;
    if (people) {
      table = await TableSchema.findOne({
        status: "Available",
        chairs: { $eq: people },
      });
      if (!table) {
        return res.status(404).json({
          message:
            "No available table found for the specified number of people",
        });
      }
      table.status = "Reserved";
      await table.save();
    }

    const tableName = orderType === "Dine In" ? `Table ${table.name}` : "";

    const noOfItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const newUser = new User({
      name: user.name,
      number: user.number,
      address: user.address || "",
      people: user.people || 1,
    });

    await newUser.save();

    const newOrder = new Order({
      orderNumber,
      tableName,
      noOfItems,
      orderType,
      orderStatus,
      items,
      instructions,
      grandTotal,
      user: newUser._id,
      deliveryTime,
    });

    await newOrder.save();

    const leastOrderChef = await chefSchema.findOne({}).sort({ orders: 1 });
    leastOrderChef.orders += 1;
    await leastOrderChef.save();

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

    if (order.orderType === "Take Away" && order.orderStatus !== "Served") {
      order.orderStatus = "Not Picked up";
      await order.save();
      return res
        .status(200)
        .json({ message: "Order status updated successfully" });
    }
    if (order.orderType !== "Take Away") {
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
    }
    return res
      .status(400)
      .json({ message: "Order already served or invalid status" });
  } catch (err) {
    console.error("Error updating order:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.updateTakeAwayOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    if (order.orderType !== "Take Away") {
      return res
        .status(400)
        .json({ message: "Order is not a Take Away order" });
    }

    order.orderStatus = orderStatus;
    order.orderType = "Done";
    await order.save();
    return res
      .status(200)
      .json({ message: "Order status updated successfully" });
  } catch (error) {
    console.log("Error updating take away order status:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
