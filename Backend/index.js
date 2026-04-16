require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors({
  origin: "*"
}));
app.use(express.json());

/* ================== MongoDB Connection ================== */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB connected"))
  .catch((err) => console.error(" MongoDB error:", err));

/* ================== Models ================== */

//  User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

//  Contact Schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
}, { timestamps: true });

const Contact = mongoose.model("Contact", contactSchema);

//  Order Schema
const orderSchema = new mongoose.Schema({
  userId: String,

  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
    }
  ],

  totalAmount: Number,
  status: { type: String, default: "Placed" },

}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

/* ================== Routes ================== */

// ================= AUTH =================

//  Signup
app.post("/api/auth/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashed,
    });

    res.status(201).json({ id: user._id, email: user.email });

  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: "Server error" });
  }
});

//  Login
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);

    if (!match)
      return res.status(400).json({ message: "Invalid credentials" });

    res.json({ id: user._id, email: user.email });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ================= CONTACT =================

//  Contact Form
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  console.log(" Incoming contact:", req.body);

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const contact = await Contact.create({
      name,
      email,
      message,
    });

    res.status(201).json({
      message: "Contact message saved",
      contact,
    });

  } catch (err) {
    console.error(" Contact Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ================= ORDERS =================

//  Buy Now
app.post("/api/orders", async (req, res) => {
  console.log(" Order request:", req.body);

  const { userId, items, totalAmount } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  try {
    const order = await Order.create({
      userId,
      items,
      totalAmount,
    });

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });

  } catch (err) {
    console.error(" Order Error:", err);
    res.status(500).json({ message: err.message });
  }
});

//  Get All Orders
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);

  } catch (err) {
    console.error(" Fetch Orders Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================== Server ================== */

const PORT = process.env.PORT || 5000;

const path = require("path");

app.use(express.static(path.join(__dirname, "dist")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => console.log(` Server running on port ${PORT}`));