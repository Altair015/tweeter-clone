import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { AddIcon, FileUploadIcon } from "..";
import { useAxios, useData } from "../../hooks";

export default function NewTweetButton() {
  const { data, setData } = useData();
  const [show, setShow] = useState(false);
  const [imgPreview, setImagePreview] = useState(null);

  const { post } = useAxios();

  const handleShow = () => setShow(true);

  const handleClose = () => {
    setImagePreview(null);
    setShow(false);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(
      e.target["new-tweet-img"].files,
      e.target["new-tweet-content"].value
    );

    const newTweetContent = e.target["new-tweet-content"].value;

    const newTweetImg = e.target["new-tweet-img"].files;

    const formData = new FormData();

    formData.append("newTweetContent", newTweetContent);

    if (newTweetImg.length > 0) {
      formData.append("newTweetImage", newTweetImg[0]);
    }

    console.log(formData.get("newTweetImage"));

    try {
      // having issue with NETWORK_ERR if modal not closed
      const response = await post(`/tweet`, formData);
      console.log(response);
      const { _id: tweet_id } = response.tweet;
      if (tweet_id) {
        setImagePreview(null);
        // console.log({ ...data, tweets: [{}] });
        setData({ ...data, tweets: [{ ...response.tweet }, ...data.tweets] });
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        className="bg-primary p-2 rounded-1 d-flex align-items-center border border-0 shadow-sm"
        onClick={handleShow}
      >
        <div
          className="d-flex align-items-center justify-content-center d-sm-none d-flex text-white"
          style={{ width: "30px", height: "30px" }}
        >
          <AddIcon />
        </div>

        <p className="m-0 d-none d-sm-block text-white">Tweet</p>
      </button>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleOnSubmit}>
          <Modal.Header closeButton>
            <Modal.Title className="h5">New Tweet</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-2" controlId="new-tweet-content">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Write your tweet"
              />
            </Form.Group>
            <Form.Group
              controlId="new-tweet-img"
              className="px-2 mb-2 d-flex align-items-center"
            >
              <Form.Label
                className="bg-primary d-flex justify-content-center align-items-center rounded rounded-2 text-white m-0"
                style={{ width: "30px", height: "30px" }}
                role="button"
              >
                <FileUploadIcon />
              </Form.Label>
              <span className="ms-2 text-secondary">Upload Image</span>
              <Form.Control
                type="file"
                hidden
                onChange={(e) => {
                  if (e.currentTarget.files.length < 0) return;
                  const image = e.currentTarget.files[0];
                  const previewURL = URL.createObjectURL(image);
                  setImagePreview(previewURL);
                }}
              />
            </Form.Group>

            {imgPreview && (
              <div className="w-100 d-flex justify-content-center ">
                <img
                  src={imgPreview || "/images/posts-images/1.jpg"}
                  className="w-75 rounded rounded-2"
                />
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Tweet
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
