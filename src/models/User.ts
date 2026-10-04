import mongoose, { Schema } from "mongoose";

interface User {
  handle: string;
  name: string;
  email: string;
  password: string;
}

// Rules for user model
const userSchema = new Schema({
  handle: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
});

// reused code for a user generic
const UserModel = mongoose.model<User>("User", userSchema);

export default UserModel;
