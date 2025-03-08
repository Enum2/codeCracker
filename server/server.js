import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./utils/DB.js";
import leetCodeRouter from "./routes/leetCode.route.js";
import codeforcesRouter from "./routes/codeforces.route.js";
import codechefRouter from "./routes/codechef.route.js";
import gfgRouter from "./routes/gfg.route.js";
import profileRouter from "./routes/profile.route.js";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

const corsOption = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOption));
app.use(express.json());
 
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/v1/profile", profileRouter);
app.use("/api/v1/leetcode", leetCodeRouter);
app.use("/api/v1/codeforces", codeforcesRouter);
app.use("/api/v1/codechef", codechefRouter);
app.use("/api/v1/gfg", gfgRouter);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

startServer();
