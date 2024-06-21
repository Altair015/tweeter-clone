import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Login = () => {
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center vh-100 vw-100"
    >
      <Row className="d-flex w-100 justify-content-center">
        <Col xs={12} md={9} lg={8} xl={6} className="login-section shadow-sm">
          <Row className="d-flex">
            <Col
              xs={12}
              md={4}
              className="login-logo-section bg-primary d-flex align-items-center justify-content-center rounded-start-2"
            >
              Logo
            </Col>
            <Col
              xs={12}
              md={8}
              className="login-form-section bg-light p-4 rounded-end-2"
            >
              <Form>
                <h2 className="mb-4">Login</h2>
                <Form.Control
                  className="mb-3"
                  type="text"
                  placeholder="Username"
                />
                <Form.Control
                  className="mb-3"
                  type="password"
                  placeholder="Password"
                />
                <Button variant="primary" type="submit">
                  Login
                </Button>
                <p className="mt-3">
                  Do not have an account? <a href="/signup">Sign up</a>
                </p>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
