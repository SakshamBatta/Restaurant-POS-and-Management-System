const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  tableName: {
    type: String,
  },
  orderTime: {
    type: Date,
    default: Date.now,
  },
  noOfItems: {
    type: Number,
    required: true,
  },
  orderType: {
    type: String,
    enum: ["Dine In", "Take Away", "Done"],
    required: true,
  },
  orderStatus: {
    type: String,
    enum: ["Ongoing", "Served", "Not Picked up"],
    default: "Ongoing",
  },
  items: {
    type: [itemSchema],
    required: true,
  },
  instructions: {
    type: String,
    default: "",
  },
  grandTotal: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  deliveryTime: {
    type: String,
  },
});

module.exports = mongoose.model("Order", orderSchema);
