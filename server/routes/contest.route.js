import expres from "express";
import { get } from "http";
import { getAllContestsInfo } from "../controllers/contest.controller.js";

const router = expres.Router();

router.route("/allContestsInfo").get(getAllContestsInfo);

export default router;
