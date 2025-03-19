import express from "express";
import {
  fetchRatingWiseSolved,
  fetchRatingChanges,
  fetchHeatmapData,
  getAllData,
} from "../controllers/codeforces.controller.js";

const router = express.Router();

router.route("/allData/:handle").get(getAllData);
router.route("/solvedPerRating/:handle").get(fetchRatingWiseSolved);
router.route("/ratingChanges/:handle").get(fetchRatingChanges);
router.route("/heatMap/:handle").get(fetchHeatmapData);

export default router;
