import { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      maxlength: 30,
    },
    first_name: {
      type: String,
      required: true,
      maxlength: 30,
    },
    last_name: {
      type: String,
      required: true,
      maxlength: 30,
    },
    password: {
      type: String,
      required: true,
      maxlength: 60,
    },
    email: {
      type: String,
      required: true,
      maxlength: 60,
    },
    dob: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
    },
    proile_img: {
      type: Date,
    },
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

export default User = mongoose.model("User", userSchema);
