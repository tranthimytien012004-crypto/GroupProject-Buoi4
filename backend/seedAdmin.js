// backend/seedAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User'); // đúng đường dẫn model User

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/yourDB';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected for seeding admin'))
  .catch(err => console.log(err));

async function createAdmin() {
  try {
    const existingAdmin = await User.findOne({ email: 'admin@gmail.com' });
    if (existingAdmin) {
      console.log('Admin đã tồn tại, không tạo lại.');
      process.exit();
    }

    const hashedPassword = await bcrypt.hash('123456', 10);

    const admin = new User({
      name: 'Admin',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin'
    });

    await admin.save();
    console.log('Admin mặc định đã được tạo!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

createAdmin();
