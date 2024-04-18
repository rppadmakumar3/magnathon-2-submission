const express = require('express');
const mongoose = require('mongoose');
const Razorpay = require("razorpay");
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const crypto = require("crypto");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors()); // Enable CORS for all routes

// Custom CORS configuration for specific route
app.use('/api', cors({
  origin: 'http://localhost:3030', // Replace with your frontend's origin
  credentials: true,
}));

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/WasteManagement', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define MongoDB schema and model
const industrySchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const Industry = mongoose.model('Industry', industrySchema);

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Signup endpoint
app.post('/api/signup', async (req, res) => {
  try {
    console.log('Signup request received:', req.body);
    const { email, username, password } = req.body;

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if email or username already exists
    const existingEmailIndustry = await Industry.findOne({ email });
    if (existingEmailIndustry) {
      return res.status(409).json({ error: 'Email already exists. Please use a different email.' });
    }
    const existingUsernameIndustry = await Industry.findOne({ username });
    if (existingUsernameIndustry) {
      return res.status(409).json({ error: 'Username already exists. Please choose a different username.' });
    }

    // Create a new Industry document
    const newIndustry = new Industry({
      email,
      username,
      password: hashedPassword,
    });
    await newIndustry.save();

    console.log('Industry successfully registered:', newIndustry);
    return res.status(201).json({ message: 'Industry successfully registered.' });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// Razorpay order creation endpoint
app.post("/order", async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = req.body;
    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).send("Error");
    }

    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});

// Razorpay order validation endpoint
app.post("/order/validate", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");
  
  if (digest !== razorpay_signature) {
    return res.status(400).json({ msg: "Transaction is not legit!" });
  }

  res.json({
    msg: "success",
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
  });
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    console.log('Login request received:', req.body);
    const { email, password } = req.body;

    // Find the industry by email
    const industry = await Industry.findOne({ email });
    if (!industry) {
      return res.status(404).json({ error: 'Industry not found. Please check your email.' });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, industry.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Incorrect password. Please check your password.' });
    }

    console.log('Login successful.');
    return res.status(200).json({ message: 'Login successful.' });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal server error. Please try again later.' });
  }
});

// Generic error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error. Please try again later.' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
