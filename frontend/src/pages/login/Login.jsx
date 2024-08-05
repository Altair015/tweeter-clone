import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./style.css";

import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../hooks";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { auth, setAuth } = useAuth();
  const [disableSubmitButton, setdisableSubmitButton] = useState(false);
  const VITE_BACKEND_IDENTIFIER = import.meta.env.VITE_BACKEND_IDENTIFIER;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setdisableSubmitButton(true);

    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      await toast.promise(
        axios.post(`${VITE_BACKEND_IDENTIFIER}/auth/signin`, {
          username,
          password,
        }),
        {
          pending: "In process",
          success: {
            render({ data: success }) {
              // setting token in the authContext
              console.log(success.data);
              const { token, user_id } = success.data;
              setAuth({ ...auth, token, user_id });

              navigate("/home");
              return "Successfully logged in";
            },
          },
          error: {
            render({ data }) {
              setdisableSubmitButton(false);
              return data.response.data.message;
            },
          },
        }
      );
    } catch (error) {
      // toast.error(error.response.data.message);
      console.log(error);
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
              className="login-logo-section bg-primary d-flex align-items-center justify-content-center rounded-start-2 rounded-md-start-0 rounded-md-top-2"
            >
              Chitter
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
      <ToastContainer autoClose={2000} />
    </Container>
  );
};

export default Login;
