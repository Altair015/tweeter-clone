import mongoose, { Schema } from "mongoose";

const tweetSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: String,
    },
    replies: {
      type: String,
    },
    tweeted_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    retweeted_by: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);
const Tweet = mongoose.model("Tweet", tweetSchema);

export default Tweet;
