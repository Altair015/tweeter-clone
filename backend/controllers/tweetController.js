import mongoose from "mongoose";
import Tweet from "../models/tweetModel.js";

export const createTweet = async (req, res) => {
  try {
    const { newTweetContent: content } = req.body;
    const { userId } = req.cookies.auth;

    // Save the tweet to the database
    const newTweet = new Tweet({
      content,
      image: req.file ? req.file.filename : null,
      tweeted_by: userId,
    });

    const tweet = await newTweet.save();

    // just to populate tweeted_by, as it can not be used with save
    if (tweet._id) {
      const dbResponse = await Tweet.findById(tweet._id).populate({
        path: "tweeted_by",
        select: "username profile_pic",
      });

      res.status(200).json({
        message: "image uploaded successfully.",
        tweet: dbResponse,
      });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const getAllTweets = async (req, res) => {
  try {
    // Find all tweets, orderBy createAt, desc
    const tweets = await Tweet.find()
      .populate({
        path: "tweeted_by",
        select: "username profile_pic",
      })
      .populate({ path: "retweeted_by", select: "username fullname" })
      .sort({ createdAt: -1 })
      .exec();

    res.status(200).json(tweets);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

export const getUserRelatedTweets = async (req, res) => {
  try {
    const { userId } = req.cookies.auth;

    // get All tweets where parent_tweet is nul / root level
    const allTweets = await Tweet.find({ parent_tweet: null })
      .populate({
        path: "tweeted_by",
        select: "username profile_pic",
      })
      .sort({
        createdAt: -1,
      });

    // // for getting following array from the user
    // const user = await User.findById(userId);

    // //process all the tweets, filtering by current user and following
    // if (user._id) {
    //   // adding current user for creating the users array for filtering the tweets
    //   const users = user.following.concat(userId);

    //   // response
    //   const tweets = filterTweets(users, allTweets);

    //   res.status(200).json(tweets);
    // }

    res.status(200).json(allTweets);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

export const getTweet = async (req, res) => {
  try {
    const { tweet_id } = req.params;

    const tweet = await Tweet.findById(tweet_id)
      .populate({
        path: "tweeted_by",
        select: "username profile_pic",
      })
      .populate({
        path: "replies",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "tweeted_by",
          select: "username profile_pic",
        },
      });

    if (tweet) {
      res.status(200).json(tweet);
    }

    if (!tweet) {
      res.status(404).json({ message: "Bad request" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

export const replyTweet = async (req, res) => {
  const { tweet_id } = req.params;
  const { userId } = req.cookies.auth;
  const { content } = req.body;

  try {
    // create new Tweet, collect the _id,
    const newTweet = new Tweet({
      content,
      tweeted_by: userId,
      parent_tweet: tweet_id,
    });

    const response = await newTweet.save();

    const { _id: comment_tweet_id } = response;

    // use the _id to push to parentTweet replies
    const tweet = await Tweet.findOneAndUpdate(
      { _id: tweet_id },
      {
        $push: {
          comments: {
            content,
            commented_by: userId,
            tweet_id: comment_tweet_id,
          },
          replies: comment_tweet_id,
        },
      },
      {
        new: true,
      }
    ).populate({
      path: "tweeted_by",
      select: "username profile_pic",
    });

    const painObject = tweet.toJSON();

    res.status(200).json({
      message: "tweet successfully registered.",
      tweet: painObject,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

export const likeTweet = async (req, res) => {
  const { tweet_id } = req.params;
  const { userId } = req.cookies.auth;

  const tweet = await Tweet.findOneAndUpdate(
    { _id: tweet_id },
    {
      $push: { likes: userId },
    },
    { new: true }
  ).populate({
    path: "tweeted_by",
    select: "username profile_pic",
  });

  res.status(200).json({ tweet });
  try {
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

export const dislikeTweet = async (req, res) => {
  const { tweet_id } = req.params;
  const { userId } = req.cookies.auth;

  const tweet = await Tweet.findOneAndUpdate(
    { _id: tweet_id },
    {
      $pull: {
        likes: userId,
      },
    },
    { new: true }
  ).populate({
    path: "tweeted_by",
    select: "username profile_pic",
  });

  res.status(200).json({ tweet });
  try {
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

export const retweet = async (req, res) => {
  const { tweet_id } = req.params;
  const { userId } = req.cookies.auth;

  try {
    const tweet = await Tweet.findOneAndUpdate(
      { _id: tweet_id },
      {
        $push: {
          retweeted_by: userId,
        },
      },
      { new: true }
    )
      .populate({
        path: "tweeted_by",
        select: "username profile_pic",
      })
      .populate({
        path: "retweeted_by",
        select: "username fullname",
      });

    // const tweet = await Tweet.findOne({ _id }).populate("retweeted_by");

    res.status(200).json({ tweet });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

export const deleteTweet = async (req, res) => {
  const { tweet_id } = req.params;
  try {
    const resultant = await Tweet.aggregate([
      // 1. target the tweet
      {
        $match: {
          _id: new mongoose.Types.ObjectId(tweet_id),
        },
      },
      // 2. recursively look and create parent-child relationship
      {
        $graphLookup: {
          // source document for lookup
          from: "tweets",
          // recursion to perform upon, root node
          startWith: "$_id",
          // child node
          connectFromField: "_id",
          // foriegn_key
          connectToField: "parent_tweet",
          // output array
          as: "child",
        },
      },
      // 3. build the array of tweet's ids for deletion operation
      {
        $project: {
          allIds: {
            $concatArrays: [["$_id"], "$child._id"],
          },
        },
      },
    ]);

    const allTweetIds = resultant[0].allIds;

    // Step 4: Delete all tweets found in the aggregation
    // { acknowledged: true, deletedCount: 4 }
    const tweetIdsToBeDeleted = await Tweet.deleteMany({
      _id: { $in: allTweetIds },
    });

    if (tweetIdsToBeDeleted.acknowledged) {
      // Step 5: updating the parent by removing the comment related to the tweet which is deleted
      await Tweet.findOneAndUpdate(
        { replies: tweet_id },
        { $pull: { comments: { tweet_id } } }
      );

      res.status(204).send();
    } else {
      res
        .status(500)
        .send({ message: "Something wrong with the tweet deletion flow" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

// const temp = {
//   _id: { $oid: "66abccf65c97fed3f3cf54ab" },
//   content: "Hi",
//   image: null,
//   likes: [],
//   parent_tweet: null,
//   replies: [{ $oid: "66abccfe5c97fed3f3cf54b3" }],
//   tweeted_by: { $oid: "66824f55e99dd172db559519" },
//   retweeted_by: [],
//   comments: [
//     {
//       content: "Hello",
//       commented_by: { $oid: "66824f55e99dd172db559519" },
//       _id: { $oid: "66abccfe5c97fed3f3cf54b5" },
//       createdAt: { $date: { $numberLong: "1722535166433" } },
//       updatedAt: { $date: { $numberLong: "1722535166433" } },
//     },
//   ],
//   createdAt: { $date: { $numberLong: "1722535158185" } },
//   updatedAt: { $date: { $numberLong: "1722535166433" } },
//   __v: { $numberInt: "0" },
// };
