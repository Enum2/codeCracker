import express from "express";
import { getCodeChefProfile } from "../controllers/codechef.controller.js";

const router = express.Router();

router.route("/allData/:handle").get(getCodeChefProfile);

export default router;
