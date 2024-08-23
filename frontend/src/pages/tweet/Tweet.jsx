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
    const { tweets, user, action } = newData

    if (action === "commented") {
      const { reply } = newData
      tweets.splice(1, 0, reply)
      // logic to add the reply in the replies section
      setData({ tweets, user })
      return
    }
    setData({ tweets, user });
  };

  const fetchTweetData = async () => {
    const response = await get(`/tweet/${tweet_id}`);

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
      setData(null);
    };
  }, [tweet_id]);

  return (
    <Container className="h-100">
      <Row className="h-100">
        <Col className="p-0 d-flex flex-column">
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
              <div className={`tweet-replies d-flex flex-column m-2 ${data.tweets.length === 1 ? "flex-fill" : ""}`}>
                <h6 className="text-white">Replies</h6>
                {data.tweets.length > 1 ? data.tweets.map((tweet, index) => {
                  if (index)
                    return (
                      <div
                        className="border border-2 border-bottom-0 mb-2 rounded rounded-2"
                        key={`tweet-wrapper-${tweet._id
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
                }) : <div
                  className="border border-2 mb-2 rounded rounded-2 h-100 d-flex justify-content-center align-items-center"
                >
                  <h2 className="text-white">No replies !!!</h2>
                </div>}
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
