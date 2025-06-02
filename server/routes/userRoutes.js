import express from "express";
import {
  applyForJob,
  getUserData,
  getUserJobApplications,
  updateUserResume,
} from "../controllers/userController.js";
import upload from "../config/multer.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

//Get user data

router.get("/user", authMiddleware, getUserData);

//apply for a job
router.post("/apply", authMiddleware, applyForJob);

//get applied jobs data
router.get("/applications", authMiddleware, getUserJobApplications);

//update user profile(resume)
router.post(
  "/update-resume",
  authMiddleware,
  upload.single("resume"),
  updateUserResume
);

export default router;
