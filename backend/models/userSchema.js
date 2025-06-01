const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  people: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model("User", userSchema);
