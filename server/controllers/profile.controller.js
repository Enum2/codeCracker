import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || "ITISNICEKEY";

export const getProfileInfo = async (req, res) => {
  try {
    const { username } = req.params;

    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    const profileData = await User.findOne({ username }).select("-password");

    if (!profileData) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json(profileData);
  } catch (error) {
    console.error("Error fetching profile data:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

export const postNewUser = async (req, res) => {
  try {
    const { username, password, accounts, email } = req.body;
    if (!username || !password || !email)
      return res
        .status(400)
        .json({ error: "Username , password and email are required" });

    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ error: "Username already exists" });
    console.log("here1");
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      accounts: accounts || [],
      email,
    });

    await newUser.save();
    const user = await User.findOne({ username });

    const token = jwt.sign({ username, id: newUser._id }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res
      .status(201)
      .json({ message: "User created successfully", token, username });
  } catch (error) {
    console.error("Error creating new user:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res
        .status(400)
        .json({ error: "Username and password are required" });

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ username, id: user._id }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token ,user:username});
  } catch (error) {
    console.error("Error logging in:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
