import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/DB.js";
import leetCodeRouter from "./routes/leetCode.route.js";
import codeforcesRouter from "./routes/codeforces.route.js";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

app.get("/", (req, res) => {
  res.send("Server is running");
});
app.use("/api/v1/leetcode", leetCodeRouter);
app.use("/api/v1/codeforces", codeforcesRouter);

app.listen(PORT, async () => {
  console.log(`Server is listening on port ${PORT}`);
  await connectDB();
});
