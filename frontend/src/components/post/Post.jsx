import React from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import {
  CommentsIcon,
  LikeIcon,
  PostImage,
  RetweetIcon,
} from "../../components";

export default function Post() {
  return (
    <Container className="posts bg-warning d-flex p-2 border-2 border-bottom ">
      <Row className="d-flex flex-fill">
        <Col className="d-flex justify-content-center">
          <div className="post-header-img pt-1 me-2">
            <img
              width="40px"
              height="40px"
              src="/images/profile-images/7.jpeg"
              className="rounded-circle"
            />
          </div>

          <div className="d-flex flex-column align-items-center">
            <div id="post-header" className="d-flex ">
              <div className="ms-2">
                <div id="post-user-info" className=" d-flex">
                  <p className="m-0 fw-medium">User Name</p>
                  <p className="m-0 fw-medium ms-1 text-secondary">
                    @User Name
                  </p>
                </div>
                <p className="mb-2">
                  World is revolving, stop being stationary to someone.World is
                  revolving, stop being stationary to someone.
                </p>
              </div>
            </div>

            <div className="border border-2 w-100 rounded-2 d-flex justify-content-center">
              <PostImage src="/images/posts-images/10.jpg" />
            </div>

            <div id="post-options" className="d-flex w-100 p-2">
              <div className="w-50 d-flex justify-content-between">
                <CommentsIcon />
                <RetweetIcon />
                <LikeIcon />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
