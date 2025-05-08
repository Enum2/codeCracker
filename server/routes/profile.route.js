import express from "express";
import {
  getProfileInfo,
  postNewUser,
  loginUser,
  updateuser,
} from "../controllers/profile.controller.js";

const router = express.Router();

router.get("/:username", getProfileInfo);
router.post("/signup", postNewUser);
router.post("/login", loginUser);
router.post("/update",updateuser)

export default router;
