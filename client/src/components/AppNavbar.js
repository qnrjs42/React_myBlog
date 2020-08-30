import React, { Fragment } from "react";
import { Nav, Navbar, NavbarToggler, Container, Collapse } from "reactstrap";
import { Link } from "react-router-dom";
import LoginModal from "../components/auth/LoginModal";

const AppNavbar = () => {
  return (
    <Fragment>
      {/* sticky-top: 스크롤하더라도 상단에 고정 */}
      <Navbar color="dark" dark expand="lg" className="sticky-top">
        <Container>
          <Link to="/" className="text-white text-decoration-none">
            Side Project's Blog(Choi Boo Blog)
          </Link>
          <NavbarToggler />
          <Collapse isOpen={true} navbar>
            <Nav className="ml-auto d-flex justify=content-around" navbar>
              {false ? (
                <h1 className="text-white">authLink</h1>
              ) : (
                <LoginModal />
              )}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
};

export default AppNavbar;
