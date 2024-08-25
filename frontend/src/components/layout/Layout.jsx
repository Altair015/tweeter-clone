import { useEffect } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { useNavigate } from "react-router-dom";
import { Header, Logo, Main, Nav, UserInfo } from "../../components";
import { Login } from "../../pages";
import { useAuth } from "../../hooks";

export default function Layout() {
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // create a new token on every next session
    !auth.token && navigate("/login", { replace: true });
    return () => {
      // clear the token on session close
    };
  }, []);

  if (!auth.token) return <Login />;

  return (
    auth.token && (
      <Container id="layout" className="d-flex vh-100">
        <Row className="d-flex vw-100">
          <Col
            id="logo-nav-section"
            className="d-flex flex-column p-0 border border-2 border-top-0 border-bottom-0"
            style={{ minWidth: "60px" }}
            xs={1}
            sm={1}
            md={1}
            lg={3}
          >
            <section
              id="logo-section"
              className="d-flex justify-content-center"
            >
              <Logo />
            </section>
            <section
              id="nav-section"
              className="d-flex flex-column justify-content-between flex-fill"
            >
              <Nav />
              <UserInfo />
            </section>
          </Col>
          <Col
            id="header-main-footer-section"
            className="d-flex flex-column p-0 border-2 border-end vh-100"
          >
            <Header />
            <Main />
            {/* <Footer /> */}
          </Col>
        </Row>
      </Container>
    )
  );
}
