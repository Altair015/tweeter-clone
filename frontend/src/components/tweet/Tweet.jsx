import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { CommentsIcon, DeleteIcon, LikeIcon, PostImage, RetweetIcon } from "..";
import { useAxios, useToastify } from "../../hooks";
import "./style.css";

export default function Tweet({
  disableOnTweetClick,
  data,
  tweet,
  handleData,
  disableDelete = false,
}) {
  let profileImageUrl = null;
  let postImageUrl = null;
  const VITE_BACKEND_IMAGE_URI = import.meta.env.VITE_BACKEND_IMAGE_URI;
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const {
    _id: tweetId,
    comments = [],
    likes = [],
    retweeted_by: retweets = [],
    tweeted_by,
    image: postImage,
    createdAt,
    content,
  } = tweet;
  const { profile_pic: profileImage } = tweet.tweeted_by;
  const { userId } = data?.user;

  const inputRef = useRef(null);

  // counters to track the user interaction with buttons(like and retweet)
  const [commentsCounter, setCommentsCounter] = useState(comments.length);
  const [likesCounter, setLikesCounter] = useState(likes.length);
  const [liked, setLiked] = useState(likes.includes(userId));
  const [retweetsCounter, setRetweetsCounter] = useState(retweets.length);
  const [retweeted, setRetweeted] = useState(checkIfInclued(retweets, userId));
  const [tweetedBy] = useState(tweeted_by);

  const { post, deleteRequest } = useAxios();
  const { setToastContent } = useToastify();

  // user-profile image
  if (profileImage)
    profileImageUrl = `${VITE_BACKEND_IMAGE_URI}/${profileImage}`;

  // post image
  if (postImage) postImageUrl = `${VITE_BACKEND_IMAGE_URI}/${postImage}`;

  const handleClose = (e) => {
    e?.stopPropagation();
    setShow(false);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const content = e.target["new-tweet-content"].value;

    if (!content) {
      setToastContent({
        content: "Empty reply submission",
        type: "Warning",
        duration: 2000,
      });
      return;
    }

    if (content) {
      // user_id can be obtained from the cookie
      const response = await post(`/tweet/${tweetId}/reply`, { content });

      // hiding the modal when reply has been saved successully
      if (response.status === 200) {
        const tweets = data.tweets.map((tweet) => {
          if (tweetId === tweet._id) {
            return response.data.tweet;
          }
          return tweet;
        });

        handleData({ ...data, tweets, action: "commented", reply: response.data.replyTweet });
        setCommentsCounter((pre) => pre + 1);
        setToastContent({
          content: "Replied successfully",
          type: "success",
          duration: 2000,
        });
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

      if (response.status === 200) {
        const tweets = data.tweets.map((tweet) => {
          if (tweetId === tweet._id) {
            return response.data.tweet;
          }
          return tweet;
        });

        handleData({ ...data, tweets, action: "liked" });
        setLikesCounter((pre) => pre + 1);
        setLiked(true);
        setToastContent({
          content: "Liked successfully",
          type: "success",
          duration: 2000,
        });
      }
    }

    // post call to dislike
    if (liked) {
      const response = await post(`/tweet/${tweetId}/dislike`);

      if (response.status === 200) {
        const tweets = data.tweets.map((tweet) => {
          if (tweetId === tweet._id) {
            return response.data.tweet;
          }
          return tweet;
        });

        handleData({ ...data, tweets, action: "unliked" });
        setLikesCounter((pre) => pre - 1);
        setLiked(false);
        setToastContent({
          content: "Unliked successfully",
          type: "success",
          duration: 2000,
        });
      }
    }
  };

  const handleRetweet = async (e) => {
    e.stopPropagation();

    // this checks if the user has retweeted before,
    // if true, not to allow the user to retweet again
    if (checkIfInclued(retweets, userId)) {
      return;
    }

    const response = await post(`/tweet/${tweetId}/retweet`);

    if (checkIfInclued(response.data.tweet.retweeted_by, userId)) {
      const tweets = data.tweets.map((tweet) => {
        if (tweetId === tweet._id) {
          return response.data.tweet;
        }
        return tweet;
      });

      setRetweeted(true);
      handleData({ ...data, tweets, action: "retweeted" });
      setRetweetsCounter((pre) => pre + 1);
      setToastContent({
        content: "Retweeted successfully",
        type: "success",
        duration: 2000,
      });
    }
  };

  const handleTweetDelete = async (e) => {
    e?.stopPropagation();

    const response = await deleteRequest(`/tweet/${tweetId}/delete`);

    //filter out the deleted tweet
    const tweets = data.tweets.filter((tweet) => tweet._id !== tweetId);

    // removing the comment from the parent tweet
    if (tweets[0]?.comments) {
      const updatedComments = tweets[0].comments.filter(
        (comment) => comment.tweet_id !== tweetId
      );

      tweets[0].comments = updatedComments;
    }

    if (response.status === 204) {
      handleData({ ...data, tweets, action: "delete" });
      setToastContent({
        content: "Tweet deleted successfully",
        type: "success",
        duration: 2000,
      });
    } else {
      console.log(response.status)
    };
  };

  const onUserNameClick = (e) => {
    e.stopPropagation();
    navigate(`/user/${tweet.tweeted_by._id}`);
  };

  function checkIfInclued(array, userId) {
    return !!array.filter((item) => {
      if (item._id) return item._id === userId;
      return item === userId;
    }).length;
  }

  // to manage input focus when modal opens
  useEffect(() => {
    if (show) inputRef.current.focus();
  }, [show]);

  return (
    <>
      <Container
        className={`${!disableOnTweetClick ? "tweet" : ""
          } d-flex flex-column border-2 border-bottom position-relative`}
        role={!disableOnTweetClick ? "button" : ""}
        onClick={() => {
          if (!disableOnTweetClick) navigate(`/tweet/${tweetId}`);
        }}
      >
        <Row>
          {retweeted && (
            <Col className="d-flex align-items-center pt-2">
              <div className="text-secondary px-1">
                <RetweetIcon size="xs" className="text-white" />
              </div>
              <p className="text-white m-0 fs-10">Retweeted by You</p>
            </Col>
          )}

          <Col className="w-100 d-flex justify-content-end pt-2">
            {!disableDelete && tweetedBy?._id === userId && (
              <DeleteIcon
                id="tweet-delete-icon"
                className="position-absolute p-2"
                onClick={handleTweetDelete}
              />
            )}
          </Col>
        </Row>

        <Row className="d-flex flex-fill justify-content-center pt-2">
          <Col className="d-flex justify-content-center ">
            <div className="post-header-img pe-2 mt-1">
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
                    <p
                      className="tweet-username m-0 fw-medium text-nowrap text-truncate text-white"
                      onClick={onUserNameClick}
                    >
                      {tweeted_by?.username}
                    </p>

                    <p className="m-0 text-nowrap ms-1 fs-9 text-truncate fw-medium text-white">
                      {`- ${new Date(createdAt).toDateString()}`}
                    </p>
                  </div>
                  <p className="m-0 text-white">
                    {content || "No content...!!!"}
                  </p>
                </div>
              </div>

              {postImage && (
                <div className="border border-2 w-100 rounded-2 d-flex justify-content-center">
                  <PostImage
                    src={postImageUrl || "/images/posts-images/10.jpg"}
                  />
                </div>
              )}

              <div id="post-options" className="d-flex w-100 py-2">
                <div className="w-50 d-flex justify-content-between">
                  <div className="tweet-comments d-flex align-items-center ">
                    <CommentsIcon
                      id="tweet-comment-icon"
                      className={`p-2 `}
                      onClick={handleOnComment}
                    />
                    <p className="d-flex align-items-center m-0 text-white">
                      {commentsCounter}
                    </p>
                  </div>
                  <div className="tweet-retweets d-flex align-items-center">
                    <RetweetIcon
                      id="tweet-retweet-icon"
                      className={`p-2 ${retweeted && "retweeted"} `}
                      onClick={handleRetweet}
                    />
                    <p className="d-flex align-items-center m-0 text-white">
                      {retweetsCounter}
                    </p>
                  </div>
                  <div className="tweet-likes d-flex align-items-center">
                    <LikeIcon
                      id="tweet-like-icon"
                      className={`p-2 ${liked && "liked"}`}
                      liked={liked}
                      onClick={handleLiked}
                    />
                    <p className="d-flex align-items-center m-0 text-white">
                      {likesCounter}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
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
                    {tweetedBy?.username || "@User Name"}
                  </p>

                  <p className="m-0 text-nowrap ms-1 fs-9 text-truncate fw-medium">
                    {`- ${new Date(createdAt).toDateString()}`}
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
                ref={inputRef}
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
    </>
  );
}
