const mongoose = require("mongoose");

const chefSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  orders: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Chef", chefSchema);
