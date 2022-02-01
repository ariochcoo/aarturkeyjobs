import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../../App.css";
import FirebaseAuthService from "../../FirebaseAuthService";

export const Navigation = ({ existingUser }) => {
  function handleLogout() {
    FirebaseAuthService.logoutUser();
  }

  return (
    <div>
      <Navbar className="menu" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand href="/">AAR Japan Turkey</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink className=" p-2  text-light" to="/">
                Home
              </NavLink>
              <NavLink className=" p-2  text-light" to="/about">
                About
              </NavLink>
              {existingUser ? (
                <NavLink className=" p-2  text-light" to="/admin">
                  Admin Panel
                </NavLink>
              ) : null}
            </Nav>
            <Nav>
              {existingUser ? (
                <Nav>
                  <Navbar.Text className=" p-2  text-light">
                    {/* Signed in as: <a href="#login">Mark Otto</a> */}
                    {existingUser
                      ? `Signed in as: ${existingUser.email}`
                      : "Sign in"}
                  </Navbar.Text>
                  {/* <NavLink className=" p-2  text-light" to="/login">
                    Logout
                  </NavLink> */}
                  <Button size="sm" variant="primary" onClick={handleLogout}>
                    Logout
                  </Button>
                </Nav>
              ) : (
                <NavLink className=" p-2  text-light" to="/login">
                  Admin Login
                </NavLink>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
