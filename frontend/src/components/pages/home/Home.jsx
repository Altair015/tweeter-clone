import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tweet } from "../../../components";
import { useAxios, useData } from "../../../hooks";

export default function Home() {
  const { data, setData } = useData();
  const { pathname: url } = useLocation();
  const navigate = useNavigate();
  const { get } = useAxios();

  const [filteredtweets, setFilteredTweets] = useState(null);

  const fetchAllTweets = async () => {
    const allTweets = await get(`/tweet`);
    console.log(allTweets);

    // getting all replies
    const allReplies = allTweets.reduce((acc, tweet, index) => {
      return acc.concat(tweet.replies);
    }, []);

    // removing the copies of ids
    const removedRepliesIdCopies = new Set(allReplies);

    // coverting back to an Array
    const repliesIds = Array.from(removedRepliesIdCopies);

    const tweetsWithoutComments = allTweets.filter(
      (tweet) => !repliesIds.includes(tweet._id)
    );

    setFilteredTweets(tweetsWithoutComments);

    setData({ ...data, tweets: [...allTweets] });
  };

  useEffect(() => {
    // in case if the user mistakenly hits "/",
    // there is no page for "/"
    if (url === "/") navigate("/home");

    // console.log(user_id);
    fetchAllTweets();
  }, []);

  return (
    <>
      {filteredtweets?.map((tweet, index) => {
        const { content } = tweet;

        // removing time and other data info [DDD MMM dd yyyy]
        const dateString = new Date(tweet.createdAt).toDateString();
        console.log(tweet);
        return (
          <Tweet
            key={`tweet-${tweet._id}`}
            content={content}
            postImage={tweet.image}
            createdAt={dateString}
            profileImageUrl={tweet.profile_img}
            userName={tweet.username}
            tweetId={tweet._id}
            comments={tweet.replies}
            likes={tweet.likes}
            retweets={tweet.retweeted_by}
          />
        );
      })}
    </>
  );
}
