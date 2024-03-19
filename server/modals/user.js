import mongoose from "mongoose";

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
  },
  attendance: [
    {
      date: {
        type: Date,
      },
      status: {
        type: Boolean,
        default: false,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const User = mongoose.model("User", schema);
