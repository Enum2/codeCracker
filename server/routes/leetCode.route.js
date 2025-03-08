import express from "express";
import {
  getUserContestRankingInfo,
  getUserProfile,
  getSubmissionCalender,
  getBadges,
} from "../controllers/leetcode.Controller.js";

const router = express.Router();
router.route("/allData/:id").get((req, res) => {
  res.send("allData route not yet implemented");
});
router.route("/userProfile/:id").get(getUserProfile);
router.route("/userContestRankingInfo/:id").get(getUserContestRankingInfo);
router.route("/calender/:id").get(getSubmissionCalender);
router.route("/badge/:id").get(getBadges);

export default router;
