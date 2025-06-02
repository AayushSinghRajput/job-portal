import jwt from "jsonwebtoken";
import Company from "../models/Company.js";
import User from "../models/User.js";

export const protectCompany = async (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res.json({
      success: false,
      message: "Not authorized , Login Again",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.company = await Company.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.json({
      success: false,
      message: "error.message",
    });
  }
};

export const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT:", decoded);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    req.user = user;
    console.log("Authenticated User:", req.user);
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};
