import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./style.css";

import { useAuth, useAxios, useToastify } from "../../hooks";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { auth, setAuth } = useAuth();
  const { post } = useAxios();
  const { setToastContent } = useToastify();
  const [disableSubmitButton, setdisableSubmitButton] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;

    if (password && !username) {
      setToastContent({
        content: "username can not be empty",
        type: "error",
        duration: 5000,
      });
      return;
    } else if (username && !password) {
      setToastContent({
        content: "password can not be empty",
        type: "error",
        duration: 5000,
      });
      return;
    } else if (!username || !password) {
      setToastContent({
        content: "username and password can not be empty",
        type: "error",
        duration: 5000,
      });
      return;
    }

    try {
      setdisableSubmitButton(true);

      const response = await post(`/auth/signin`, {
        username,
        password,
      });
      console.log(response);

      if (response?.status === 200) {
        const { token, user_id } = response.data;
        setAuth({ ...auth, token, user_id });

        navigate("/home");

        setToastContent({
          content: "Login Success",
          type: "success",
          duration: 2000,
        });
        setdisableSubmitButton(false);
      }
    } catch (error) {
      console.log(error);
      setToastContent({
        content: error.message,
        type: "error",
        duration: 5000,
      });
      setdisableSubmitButton(false);
    }
  };

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
              className="login-logo-section bg-primary d-flex align-items-center justify-content-center rounded-start-2 rounded-md-start-0 rounded-md-top-2 fw-medium"
              style={{ minHeight: "50px" }}
            >
              <h1>Chitter</h1>
            </Col>
            <Col
              xs={12}
              md={8}
              className="login-form-section bg-light p-4 rounded-end-2 rounded-md-end-0 rounded-md-bottom-2"
            >
              <Form onSubmit={handleSubmit}>
                <h2 className="mb-4">Login</h2>
                <Form.Control
                  id="username"
                  className="mb-3"
                  type="text"
                  placeholder="Username"
                />
                <Form.Control
                  id="password"
                  className="mb-3"
                  type="password"
                  placeholder="Password"
                />
                <Button
                  variant="primary"
                  type="submit"
                  disabled={disableSubmitButton}
                >
                  Login
                </Button>
                <p className="mt-3">
                  Do not have an account? <a href="/register">Sign up</a>
                </p>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
      {/* <ToastContainer autoClose={2000} /> */}
    </Container>
  );
};

export default Login;
