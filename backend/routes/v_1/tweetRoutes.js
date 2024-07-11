import { Router } from "express";
import {
  createTweet,
  getAllTweets,
  replyTweet,
  likeTweet,
  dislikeTweet,
  retweet,
} from "../../controllers/tweetController.js";
import { multerMiddleWare } from "../../middlewares/multerSetup.js";
import { ValidateJWTMiddleware } from "../../middlewares/protected.js";

const router = Router();

router.get("/tweet", ValidateJWTMiddleware, getAllTweets);

router.post("/tweet", ValidateJWTMiddleware, multerMiddleWare, createTweet);

router.post("/tweet/:tweet_id/reply", ValidateJWTMiddleware, replyTweet);

router.post("/tweet/:tweet_id/like", ValidateJWTMiddleware, likeTweet);

router.post("/tweet/:tweet_id/dislike", ValidateJWTMiddleware, dislikeTweet);

router.post("/tweet/:tweet_id/retweet", ValidateJWTMiddleware, retweet);

export default router;
