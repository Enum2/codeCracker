import mongoose from "mongoose"; // Correct import

// Account Schema
const accountSchema = new mongoose.Schema({
  accountName: {
    type: String,
    required: true,
  },
  accountUsername:{
    type:String,
    required:true,
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
    default: "",
  },
  college: {
    type: String,
    default: "",
  },
  branch: {
    type: String,
    default: "",
  },
  yearofGraduation: {
    type: Number,
    default: "",
  },
  firstName:{
    type:String,
    default:"",
  },
  lastName:{
    type:String,
    default:"",
  },
  degree:{
    type:String,
    default:"",
  },
  bio: {
    type: String,
    default: "",
  },
  graduationYear:{
    type:Number,
    default:2027,
  },
  accounts: {
    type: [accountSchema],
    default: [],
  },
});

// Export the User model
const User = mongoose.model("User", userSchema);

export default User;
