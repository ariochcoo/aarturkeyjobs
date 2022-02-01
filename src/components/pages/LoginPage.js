import React, { useState } from "react";
import FirebaseAuthService from "../../FirebaseAuthService";
import { Form, Card, Button, Container, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LoginPage = function ({ existingUser }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await FirebaseAuthService.loginUser(userName, password);
      setUserName("");
      setPassword("");
      routeChange();
    } catch (error) {
      alert(error.message);
    }
  }

  let navigate = useNavigate();
  let formPage = "/admin";

  const routeChange = () => {
    navigate(formPage);
  };

  return (
    <div>
      <Container>
        <Row>
          <Col sm={4}></Col>
          <Col sm={4}>
            <Card>
              <Card.Header>
                <h4>Login </h4>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput3"
                  >
                    <Form.Label>Username </Form.Label>
                    <Form.Control
                      type="email"
                      name="userName"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput4"
                  >
                    <Form.Label>Password </Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>

                  <Button variant="success" type="submit">
                    Login
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={4}></Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;
