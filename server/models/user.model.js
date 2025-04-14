import { count } from "console";
import mongoose from "mongoose"; // Correct import

// Account Schema
const accountSchema = new mongoose.Schema({
  accountName: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

// User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  country: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  yearofGraduation: {
    type: Number,
    required: true,
  },
  bio: {
    type: String,
    default: "",
  },
  accounts: {
    type: [accountSchema],
    default: [],
  },
});

// Export the User model
const User = mongoose.model("User", userSchema);

export default User;
