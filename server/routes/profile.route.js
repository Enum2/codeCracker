import express from "express";
import {
  getProfileInfo,
  postNewUser,
  loginUser,
} from "../controllers/profile.controller.js";

const router = express.Router();

router.get("/:username", getProfileInfo);
router.post("/signin", postNewUser);
router.post("/login", loginUser);

export default router;
