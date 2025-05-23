const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  balance: {
    EUR: { type: Number, default: 100 },
    INR: { type: Number, default: 100 },
  },
});

module.exports = mongoose.model("User", userSchema);
