import express from "express";
import { getRatingWiseSolved } from "../controllers/codeforces.controller.js";

const router = express.Router();

// router.get("/profile/:handle", getUserProfile);
router.get("/solved/:handle", getRatingWiseSolved);

export default router;

// https://codeforces.com/api/user.info?handles=DmitriyH;Fefer_Ivan&checkHistoricHandles=false
