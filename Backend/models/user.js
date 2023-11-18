import mongoose from "mongoose";

const schema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  userPassword: { type: String, required: true },
  userEmail: { type: String, unique: true, required: true },
  phone: { type: String, required: false},
  isAdmin: { type: Boolean, default: false, required: false},
  date: { type: Date, default: Date.now, required: true },
});

export const userModel = mongoose.model("users", schema);