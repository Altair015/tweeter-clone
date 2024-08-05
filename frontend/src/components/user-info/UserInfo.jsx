import React from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import "./style.css";

export default function UserInfo(props) {
  return (
    <Container {...props} className="sticky-bottom" role="button">
      <Row className="user-info d-flex align-items-center m-0 rounded p-2 mb-2">
        <img
          src="/images/profile-placeholder.svg"
          className="p-0 rounded-circle w-100 h-100"
          style={{
            maxWidth: "40px",
            maxHeight: "40px",
            aspectRatio: 1,
          }}
        />
        <Col md={9} className="text-truncate d-none d-lg-block p-0 ps-2">
          <p className="m-0 text-truncate fw-medium">Mandeep Singh</p>
          <p className="m-0 small text-truncate fw-normal">mand23sngh01</p>
        </Col>
      </Row>
    </Container>
  );
}
