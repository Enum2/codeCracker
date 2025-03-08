import express from "express";
import {
  getRatingWiseSolved,
  getRatingChanges,
  getHeatmapData,
} from "../controllers/codeforces.controller.js";

const router = express.Router();

router.route("/solvedPerRating/:handle").get(getRatingWiseSolved);
router.route("/ratingChanges/:handle").get(getRatingChanges);
router.route("/heatMap/:handle").get(getHeatmapData);

export default router;
