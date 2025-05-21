const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  chairs: {
    type: Number,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Reserved", "Available"],
    default: "Available",
  },
});

module.exports = mongoose.model("Table", tableSchema);
