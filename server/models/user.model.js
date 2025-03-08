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
  accounts: {
    type: [accountSchema], // Embedding account schema correctly
    default: [],
  },
});

// Export the User model
const User = mongoose.model("User", userSchema);

export default User;
