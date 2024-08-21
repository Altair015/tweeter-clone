import mongoose from "mongoose";
import User from "../models/userModel.js";
import Tweet from "../models/tweetModel.js";

export const getUserData = async (req, res) => {
  try {
    const { user_id } = req.params;

    const user = await User.findById(user_id).select("-password");

    const tweets = await Tweet.find({ tweeted_by: user_id }).populate(
      "tweeted_by",
      "-password"
    );

    res.status(200).json({ tweets, user });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

export const editUserProfile = async (req, res) => {
  try {
    const { user_id } = req.params;

    let update = {};

    if (req?.file?.filename) {
      // handles the profile_pic or profile_cover
      update[`${req.file.originalname}`] = req.file.filename;
    } else {
      // handles the other changes
      update = { ...req.body };
    }

    const user = await User.findOneAndUpdate(
      { _id: user_id },
      { $set: update },
      { new: true }
    ).select("-password");

    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

export const updateUserFollowing = async (req, res) => {
  console.log(req.body)
  try {
    // logged in user
    const { userId } = req.cookies.auth;
    // user to follow
    const { user_id } = req.params;

    // updated followers of
    const { type } = req.body;

    if (type === "follow") {
      await User.findOneAndUpdate(
        { _id: user_id },
        { $push: { followers: new mongoose.Types.ObjectId(`${userId}`) } }
      );

      await User.findOneAndUpdate(
        { _id: userId },
        { $push: { following: new mongoose.Types.ObjectId(`${user_id}`) } }
      );
    }

    if (type === "unfollow") {
      await User.findOneAndUpdate(
        { _id: user_id },
        { $pull: { followers: new mongoose.Types.ObjectId(`${userId}`) } }
      );

      await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { following: new mongoose.Types.ObjectId(`${user_id}`) } }
      );
    }

    res.status(200).send("updated successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};
