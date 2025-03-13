import express from "express";
import {
  getUserContestRankingInfo,
  getUserProfile,
  getSubmissionCalender,
  getBadges,
  getAllData,
} from "../controllers/leetcode.Controller.js";

const router = express.Router();
router.route("/allData/:id").get(getAllData);
router.route("/userProfile/:id").get(getUserProfile);
router.route("/userContestRankingInfo/:id").get(getUserContestRankingInfo);
router.route("/calender/:id").get(getSubmissionCalender);

export default router;
