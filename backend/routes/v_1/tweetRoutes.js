import { Router } from "express";
import {
  createTweet,
  getAllTweets,
  replyTweet,
  likeTweet,
  dislikeTweet,
  retweet,
  getTweet,
  getUserRelatedTweets,
  deleteTweet,
} from "../../controllers/tweetController.js";
import { multerMiddleWare } from "../../middlewares/multerSetup.js";
import { ValidateJWTMiddleware } from "../../middlewares/protected.js";

const router = Router();

router.get("/tweet/all", ValidateJWTMiddleware, getAllTweets);

router.get("/tweet", ValidateJWTMiddleware, getUserRelatedTweets);

router.get("/tweet/:tweet_id", ValidateJWTMiddleware, getTweet);

router.post("/tweet/new", ValidateJWTMiddleware, multerMiddleWare, createTweet);

router.post("/tweet/:tweet_id/reply", ValidateJWTMiddleware, replyTweet);

router.post("/tweet/:tweet_id/like", ValidateJWTMiddleware, likeTweet);

router.post("/tweet/:tweet_id/dislike", ValidateJWTMiddleware, dislikeTweet);

router.post("/tweet/:tweet_id/retweet", ValidateJWTMiddleware, retweet);

router.delete("/tweet/:tweet_id/delete", ValidateJWTMiddleware, deleteTweet);

export default router;
