const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs"); // <-- thêm dòng này
require("dotenv").config();

const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const userRoutes = require("./routes/user");
const User = require("./models/User"); // <-- thêm dòng này

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/users", userRoutes);

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Connected to MongoDB");

    // 🟢 Tạo tài khoản Admin mặc định (chỉ chạy 1 lần)
    const adminEmail = "admin@gmail.com";
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("123456", 10);
      await User.create({
        name: "Super Admin",
        email: adminEmail,
        password: hashedPassword,
        role: "Admin", // hoặc "Admin" tùy bạn check trong middleware
        createdAt: new Date(),
      });
      console.log("✅ Admin created: admin@gmail.com / 123456");
    } else {
      console.log("⚙️ Admin already exists");
    }

    app.listen(process.env.PORT || 5000, () =>
      console.log("🚀 Server running on port 5000")
    );
  })
  .catch(err => console.error("❌ MongoDB Error:", err));
