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

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch("https://myflixlist-7625107afe99.herokuapp.com", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location.reload();
      } else {
        alert("Signup failed");
      }
    });
  };
  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>Signup here</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="signUpFormUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      size="sm"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      minLength="3"
                      placeholder="Enter a username"
                    />
                  </Form.Group>

                  <Form.Group controlId="signUpFormPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      size="sm"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength="8"
                      placeholder="Your password must be 8 or more characters"
                    />
                  </Form.Group>

                  <Form.Group controlId="signUpFormEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      size="sm"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Enter your email address"
                    />
                  </Form.Group>

                  <Form.Group controlId="signUpFormBirthday">
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                      type="date"
                      size="sm"
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                      required
                      placeholder="Enter your birthday"
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
