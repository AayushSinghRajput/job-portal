import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Signup
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(201).json({
      success: true,
      token,
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required." });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      success: true,
      token,
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
});

export default router;
