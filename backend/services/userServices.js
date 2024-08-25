// Filter tweets by the current user's ID and the IDs of users whome the user follows
export const filterTweets = (users, allTweets) => {
  const tweets = [];

  users.forEach((userId) => {
    allTweets.forEach((tweet) => {
      if (userId === tweet.tweeted_by._id.toString()) tweets.push(tweet);
    });
  });

  return tweets;
};
