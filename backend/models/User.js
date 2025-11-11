const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin", "Admin"], default: "user" },
  avatar: { type: String, default: "" },
  phone: { type: String, default: "" },
  address: { type: String, default: "" },

  // 🟢 Đổi lại cho khớp với auth.js
  resetPasswordToken: { type: String },
  resetPasswordExpire: { type: Date },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
