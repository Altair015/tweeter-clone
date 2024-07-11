import React, { useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { CommentsIcon, LikeIcon, PostImage, RetweetIcon } from "..";
import Button from "react-bootstrap/esm/Button";
import { useAuth, useAxios, useData } from "../../hooks";
import "./style.css";

export default function Tweet({
  profileImage,
  userName,
  content,
  postImage,
  likes = [],
  retweets = [],
  comments = [],
  createdAt,
  tweetId,
}) {
  const { user_id: userId } = useAuth().auth;
  const { data, setData } = useData();
  let profileImageUrl = null;
  let postImageUrl = null;
  const VITE_BACKEND_IMAGE_URI = import.meta.env.VITE_BACKEND_IMAGE_URI;

  const [show, setShow] = useState(false);

  // counters to track the user interaction with buttons(like and retweet)
  const [commentsCounter, setCommentsCounter] = useState(comments.length);
  const [likesCounter, setLikesCounter] = useState(likes.length);
  const [liked, setLiked] = useState(likes.includes(userId));
  const [retweetsCounter, setRetweetsCounter] = useState(retweets.length);
  const [retweeted, setRetweeted] = useState(checkIfInclued(retweets, userId));

  const { post } = useAxios();

  // user-profile image
  if (profileImage)
    profileImageUrl = `${VITE_BACKEND_IMAGE_URI}/${profileImage}`;

  // post image
  if (postImage) postImageUrl = `${VITE_BACKEND_IMAGE_URI}/${postImage}`;

  const handleShow = () => setShow(true);

  const handleClose = () => {
    // e.stopPropagation();
    setShow(false);
  };

  const handleOnSubmit = async (e) => {
    // to stop bubbling
    e.preventDefault();
    e.stopPropagation();

    const content = e.target["new-tweet-content"].value;

    if (content) {
      // user_id can be obtained from the cookie
      const response = await post(`/tweet/${tweetId}/reply`, { content });

      console.log(response);

      // hiding the modal when reply has been saved successully
      if (response.tweet._id) {
        const tweets = data.tweets.map((tweet) => {
          if (tweetId === tweet._id) {
            return response.tweet;
          }
          return tweet;
        });

        setData({ ...data, tweets });
        setCommentsCounter((pre) => pre + 1);
        setShow(false);
      }
    }
  };

  const handleOnComment = async (e) => {
    e.stopPropagation();
    setShow(true);
  };

  const handleLiked = async (e) => {
    e.stopPropagation();

    // post call to like
    if (!liked) {
      const response = await post(`/tweet/${tweetId}/like`);

      if (response.tweet._id) {
        const tweets = data.tweets.map((tweet) => {
          if (tweetId === tweet._id) {
            return response.tweet;
          }
          return tweet;
        });

        setData({ ...data, tweets });
        setLikesCounter((pre) => pre + 1);
        setLiked(true);
      }
    }

    // post call to dislike
    if (liked) {
      const response = await post(`/tweet/${tweetId}/dislike`);

      if (response.tweet._id) {
        const tweets = data.tweets.map((tweet) => {
          if (tweetId === tweet._id) {
            return response.tweet;
          }
          return tweet;
        });

        setData({ ...data, tweets });
        setLikesCounter((pre) => pre - 1);
        setLiked(false);
      }
    }
  };

  function checkIfInclued(array, userId) {
    return !!array.filter((item) => item._id === userId).length;
  }

  const handleRetweet = async (e) => {
    e.stopPropagation();

    // check each retweet object for the current user
    // const retweeted = retweets.filter((retweet) => retweet._id === userId);

    console.log("retweet", retweets, userId, checkIfInclued(retweets, userId));

    if (checkIfInclued(retweets, userId)) return;

    // //tweet/:tweet_id/retweet
    const response = await post(`/tweet/${tweetId}/retweet`);
    console.log(response);

    if (checkIfInclued(response.tweet.retweeted_by, userId)) {
      const tweets = data.tweets.map((tweet) => {
        if (tweetId === tweet._id) {
          return response.tweet;
        }
        return tweet;
      });

      setData({ ...data, tweets });
      setRetweetsCounter((pre) => pre + 1);
      setRetweeted(true);
    }
  };

  return (
    <Container
      className="tweet post d-flex flex-column px-2 border-2 border-bottom"
      role="button"
      onClick={() => {
        console.log(tweetId);
      }}
    >
      {retweeted && (
        <Row>
          <Col className="d-flex align-items-center ms-2">
            <div className="text-secondary p-1">
              <RetweetIcon size="xs" />
            </div>
            <p className="text-secondary m-0 fs-10">Retweeted by me</p>
          </Col>
        </Row>
      )}
      <Row className="d-flex flex-fill justify-content-center">
        <Col className="d-flex justify-content-center">
          <div className="post-header-img mt-2 me-2">
            <img
              width="40px"
              height="40px"
              src={profileImageUrl || "/images/profile-placeholder.webp"}
              className="rounded-circle"
            />
          </div>

          <div className="d-flex flex-column align-items-center w-100">
            <div id="post-header" className="d-flex align-self-start mb-2">
              <div className="ms-2">
                <div
                  id="post-user-info"
                  className=" d-flex align-items-baseline flex-wrap"
                >
                  <p className="m-0 fw-medium text-nowrap text-truncate">
                    {userName || "@User Name"}
                  </p>

                  <p className="m-0 text-nowrap ms-1 fs-9 text-truncate fw-medium text-white">
                    {`- ${createdAt}`}
                  </p>
                </div>
                <p className="m-0">{content || "No content...!!!"}</p>
              </div>
            </div>

            {postImage && (
              <div className="border border-2 w-100 rounded-2 d-flex justify-content-center">
                <PostImage
                  src={postImageUrl || "/images/posts-images/10.jpg"}
                />
              </div>
            )}

            <div id="post-options" className="d-flex w-100 p-2">
              <div className="w-50 d-flex justify-content-between">
                <div className="tweet-comments d-flex align-items-center m-0 ms-2">
                  <CommentsIcon
                    id="tweet-comment-icon"
                    className={`p-2`}
                    onClick={handleOnComment}
                  />
                  <p className="d-flex align-items-center m-0 ">
                    {commentsCounter}
                  </p>
                </div>
                <div className="tweet-retweets d-flex align-items-center m-0 ms-2">
                  <RetweetIcon
                    id="tweet-retweet-icon"
                    className="p-2"
                    onClick={handleRetweet}
                  />
                  <p className="d-flex align-items-center m-0 ">
                    {retweetsCounter}
                  </p>
                </div>
                <div className="tweet-likes d-flex align-items-center m-0 ms-2">
                  <LikeIcon
                    id="tweet-like-icon"
                    className={`p-2 ${liked && "liked"}`}
                    liked={liked}
                    onClick={handleLiked}
                  />
                  <p className="d-flex align-items-center m-0">
                    {likesCounter}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleOnSubmit}>
          <Modal.Header closeButton>
            <Modal.Title className="h5">Reply</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div id="post-header" className="d-flex align-self-start mb-2">
              <div className="">
                <div
                  id="post-user-info"
                  className=" d-flex align-items-baseline flex-wrap"
                >
                  <p className="m-0 fw-medium text-nowrap text-truncate">
                    {userName || "@User Name"}
                  </p>

                  <p className="m-0 text-nowrap ms-1 fs-9 text-truncate fw-medium">
                    {`- ${createdAt}`}
                  </p>
                </div>
                <div>
                  <div className="d-flex ms-2 ">
                    <div className="vr"></div>
                    <p
                      className="m-0 ms-2 h-100 overflow-auto text-secondary"
                      style={{ maxHeight: "116px", cursor: "default" }}
                    >
                      {content || "No content...!!!"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Form.Group className="mb-2" controlId="new-tweet-content">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Write your tweet"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              // onClick={handleClose}
              type="submit"
            >
              Tweet
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}
