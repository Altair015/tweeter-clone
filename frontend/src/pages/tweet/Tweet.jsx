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

  const handleData = (newData) => {
    setData({ ...newData });
  };

  const fetchTweetData = async () => {
    const response = await get(`/tweet/${tweet_id}`);
    console.log(response);
    if (response.status === 200) {
      setData({
        user: { userId: user_id },
        tweets: [response.data, ...response.data.replies],
      });
    } else if (response.status === 404) {
      navigate("/resourcenotfound");
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

  // useEffect(() => {
  //   console.log("yaahooo", data);
  //   setData({ ...data, tweets: data?.tweets });
  // }, [data?.tweets]);

  return (
    <Container className="h-100">
      <Row className="h-100">
        <Col className="p-0 h-100">
          {data?.tweets ? (
            <>
              <Tweet
                key={`tweet-${data.tweets[0]._id}-${new Date().getTime()}`}
                tweet={data.tweets[0]}
                data={data}
                handleData={handleData}
                disableOnTweetClick={data.tweets[0]._id === tweet_id}
                disableDelete={data.tweets[0]._id === tweet_id}
              />
              <div className="tweet-replies d-flex flex-column m-2">
                <h6 className="text-white">Replies</h6>
                {data.tweets.map((tweet, index) => {
                  if (index)
                    return (
                      <div
                        className="border border-2 border-bottom-0 mb-2 rounded rounded-2"
                        key={`tweet-wrapper-${
                          tweet._id
                        }-${new Date().getTime()}`}
                      >
                        <Tweet
                          key={`tweet-${tweet._id}-${new Date().getTime()}`}
                          tweet={tweet}
                          data={data}
                          handleData={handleData}
                          disableOnTweetClick={tweet._id === tweet_id}
                          disableDelete={tweet._id === tweet_id}
                        />
                      </div>
                    );
                })}
              </div>
            </>
          ) : (
            <Loader />
          )}
        </Col>
      </Row>
    </Container>
  );
}
