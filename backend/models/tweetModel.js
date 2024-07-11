import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
    },
    commented_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const tweetSchema = new mongoose.Schema(
  {
    // parent_tweet: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Tweet",
    //   default: null,
    // },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [commentSchema],
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet",
      },
    ],
    tweeted_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    retweeted_by: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);
const Tweet = mongoose.model("Tweet", tweetSchema);

export default Tweet;
