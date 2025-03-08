import express from "express";
import { getGFGProfile } from "../controllers/gfg.controller.js";

const router = express.Router();

router.route("/profile/:handle").get(getGFGProfile);

export default router;
