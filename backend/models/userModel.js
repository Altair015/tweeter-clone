import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      maxlength: 30,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      maxlength: 30,
    },
    password: {
      type: String,
      required: true,
      maxlength: 60,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      maxlength: 60,
    },
    dob: {
      type: Date,
      default: null,
    },
    location: {
      type: String,
      default: null,
    },
    proile_img: {
      type: String,
      default: null,
    },
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
export default User;
