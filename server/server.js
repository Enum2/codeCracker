import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/DB.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.listen(PORT, async () => {
  console.log(`Server is listening on port ${PORT}`);
  await connectDB();
});
