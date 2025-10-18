require('dotenv').config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

console.log("MONGO_URI =", process.env.MONGO_URI);

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)



app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
