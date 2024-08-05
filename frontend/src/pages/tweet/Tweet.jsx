import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth, useAxios } from "../../hooks";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { Loader, Tweet } from "../../components";

export default function TweetPage() {
  const { user_id } = useAuth().auth;
  const { tweet_id } = useParams();
  const navigate = useNavigate();
  const { get } = useAxios();

  const [data, setData] = useState(null);
  const [tweet, settweet] = useState(null);

  const handleData = (newData) => {
    setData({ ...newData });
  };

  const fetchTweetData = async () => {
    const response = await get(`/tweet/${tweet_id}`);
    console.log(response);
    if (response.status === 200) {
      setData({
        user: { userId: user_id },
        tweets: [...response.data.replies],
        tweet: response.data,
      });

      // settweet(response.data.filter());
    } else if (response.status === 404) {
      navigate("/resource");
    } else {
      navigate("/home");
    }
  };

  useEffect(() => {
    fetchTweetData();
    return () => {
      console.log("tweetPage unmounted");
      setData(null);
    };
  }, [tweet_id]);

  useEffect(() => {
    console.log(data);
  }, [data?.tweets]);

  return (
    <Container className="h-100">
      <Row className="h-100">
        <Col className="p-0 bg-danger h-100">
          {data?.tweet ? (
            <>
              <Tweet
                key={`tweet-${data.tweet._id}`}
                disableOnTweetClick
                tweet={data.tweet}
                data={data}
                handleData={handleData}
              />
              {data.tweets.map((tweet) => {
                console.log(tweet);
                return (
                  <Tweet
                    key={`tweet-replies-${tweet._id}`}
                    tweet={tweet}
                    data={data}
                    handleData={handleData}
                    // onCommentSubmit=
                  />
                );
              })}
            </>
          ) : (
            <Loader />
          )}
        </Col>
      </Row>
    </Container>
  );
}
