const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Razorpay = require("razorpay");
const cors = require('cors');
const crypto = require("crypto");
require("dotenv").config();
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors()); // Set up CORS before other middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb://127.0.0.1:27017/WasteManagement', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const agencySchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Agency = mongoose.model('Agency', agencySchema);

app.post('/api/signup', async (req, res) => {
  try {
    console.log('Signup request received:', req.body);

    const { email, username, password } = req.body;

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the email already exists
    console.log('Checking existing email:', email);
    const existingEmailAgency = await Agency.findOne({ email });
    if (existingEmailAgency) {
      console.log('Email already exists:', email);
      return res.status(409).json({ error: 'Email already exists. Please use a different email.' });
    }

    // Check if the username already exists
    console.log('Checking existing username:', username);
    const existingUsernameAgency = await Agency.findOne({ username });
    if (existingUsernameAgency) {
      console.log('Username already exists:', username);
      return res.status(409).json({ error: 'Username already exists. Please choose a different username.' });
    }

    const newAgency = new Agency({
      email,
      username,
      password: hashedPassword,
    });

    await newAgency.save();

    console.log('Agency successfully registered:', newAgency);
    return res.status(201).json({ message: 'Agency successfully registered.' });
  } catch (error) {
    console.error('Signup error:', error);

    if (error.code === 11000) {
      console.log('Duplicate key error:', error);
      return res.status(409).json({ error: 'Duplicate key error. Please check your input.' });
    }

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

app.post('/api/login', async (req, res) => {
  try {
    console.log('Login request received:', req.body);

    const { email, password } = req.body;

    // Find the agency by email
    console.log('Finding agency by email:', email);
    const agency = await Agency.findOne({ email });

    if (!agency) {
      console.log('Agency not found:', email);
      return res.status(404).json({ error: 'Agency not found. Please check your email.' });
    }

    // Compare the provided password with the hashed password in the database
    console.log('Comparing passwords:', password, agency.password);
    const passwordMatch = await bcrypt.compare(password, agency.password);

    if (!passwordMatch) {
      console.log('Incorrect password:', password);
      return res.status(401).json({ error: 'Incorrect password. Please check your password.' });
    }

    // You can include additional logic here, such as creating and sending a JWT token for authentication

    console.log('Login successful.');
    return res.status(200).json({ message: 'Login successful.' });
  } catch (error) {
    console.error('Login error:', error);

    if (error.name === 'ValidationError') {
      console.log('Validation error:', error);
      return res.status(400).json({ error: 'Validation error. Please check your input.' });
    }

    return res.status(500).json({ error: 'Internal server error. Please try again later.' });
  }
});

// Generic error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error. Please try again later.' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
