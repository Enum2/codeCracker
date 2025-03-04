import { mongo } from "mongoose";

const account = new mongoose.Schema({
  accountName: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

const user = new mongoose.Schema({
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
    type: [account],
    default: [],
  },
});
