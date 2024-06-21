import React from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { Footer, Header, Logo, Main, Nav } from "../../components";

export default function Layout({ children }) {
  return (
    <Container
      fluid
      id="layout"
      className="d-flex vh-100"
      style={{ backgroundColor: "blue" }}
    >
      <Row className="d-flex vw-100">
        <Col
          id="logo-nav-section"
          className="d-flex flex-column p-0"
          style={{ backgroundColor: "turquoise" }}
          xs={1}
          sm={2}
        >
          <section
            id="logo-section"
            className="d-flex justify-content-center "
            style={{ backgroundColor: "yellow" }}
          >
            <Logo />
          </section>
          <section
            id="nav-section"
            className="d-flex flex-column justify-content-between flex-fill "
            style={{ backgroundColor: "violet" }}
          >
            <Nav />
            <div>UserProfileNavLink</div>
          </section>
        </Col>
        <Col
          id="header-main-footer-section"
          className=""
          style={{ backgroundColor: "red" }}
        >
          <Header />
          <Main children={children} />
          <Footer />
        </Col>
      </Row>
    </Container>
  );
}
