import { useState } from "react";
import {
  Button,
  Form,
  Card,
  CardGroup,
  Container,
  Col,
  Row,
} from "react-bootstrap";

import {
  Button,
  Form,
  Card,
  CardGroup,
  Container,
  Col,
  Row,
} from "react-bootstrap";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault(); // This will prevent page from automatically reloading

    const url = `https://myflixlist-7625107afe99.herokuapp.com/login?Username=${encodeURIComponent(
      username
    )}&Password=${encodeURIComponent(password)}`;

    const data = {
      Username: username,
      Password: password,
    };

    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("Login failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error.message);
        alert(error.message);
      });
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>Login</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      size="sm"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      minLength="3"
                      placeholder="Enter your username"
                    />
                  </Form.Group>

                  <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      size="sm"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                    />
                  </Form.Group>
                  <div style={{ marginBottom: "5px" }}></div>
                  <Button variant="primary" type="submit" size="sm">
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
};
