import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";

const SignUp = () => {
  const [validated, setValidated] = useState(false);

  const handleOnSubmit = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    e.preventDefault();
    setValidated(true);

    const VITE_BACKEND_IDENTIFIER = import.meta.env.VITE_BACKEND_IDENTIFIER;

    const fullname = e.target.fullname.value;
    const email = e.target.email.value;
    const username = e.target.username.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password === confirmPassword) {
      const response = await axios.post(
        `${VITE_BACKEND_IDENTIFIER}/auth/signup`,
        { fullname, email, username, password }
      );
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center vh-100 vw-100"
    >
      <Row className="d-flex w-100 justify-content-center">
        <Col xs={12} md={9} lg={8} xl={6} className="signup-section">
          <Row className="d-flex">
            <Col
              xs={12}
              md={4}
              className="signup-logo-section bg-primary d-flex align-items-center justify-content-center rounded-start-2"
            >
              <h1>Logo</h1>
            </Col>
            <Col
              xs={12}
              md={8}
              className="signup-form-section bg-light p-4 rounded-end-2"
            >
              <Form noValidate validated={validated} onSubmit={handleOnSubmit}>
                <h2 className="mb-4">SignUp</h2>

                {/* <Form.Group
                  as={Col}
                  className="mb-3"
                  controlId="validationCustom01"
                >
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="First name"
                    defaultValue="Mark"
                    autoComplete="new-password"
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group> */}

                <Form.Control
                  id="fullname"
                  className="mb-3"
                  type="text"
                  placeholder="Full Name"
                  autoComplete="new-password"
                />
                <Form.Control
                  id="email"
                  className="mb-3"
                  type="email"
                  placeholder="Email"
                  autoComplete="off"
                />
                <Form.Control
                  id="username"
                  className="mb-3"
                  type="text"
                  placeholder="Username"
                  autoComplete="new-password"
                />
                <Form.Control
                  id="password"
                  className="mb-3"
                  type="password"
                  placeholder="Password"
                />
                <Form.Control
                  id="confirmPassword"
                  className="mb-3"
                  type="password"
                  placeholder="Confirm Password"
                />
                <Button variant="primary" type="submit">
                  Register
                </Button>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
