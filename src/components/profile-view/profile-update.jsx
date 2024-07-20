import React, { useState, useEffect } from "react";
import {
  Container,
  Col,
  Row,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import PropTypes from "prop-types";

export const ProfileUpdate = ({ user, onProfileUpdate }) => {
  const [username, setUsername] = useState(user.Username || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState(user.Email || "");
  const [birthday, setBirthday] = useState(user.Birthday || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setUsername(user.Username || "");
    setEmail(user.Email || "");
    setBirthday(user.Birthday || "");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token not found");
      setLoading(false);
      return;
    }

    const data = {
      Username: username,
      Password: password,
      ConfirmPassword: confirmPassword,
      Email: email,
      Birthday: birthday,
    };

    try {
      const response = await fetch(
        `https://myflixlist-7625107afe99.herokuapp.com/users/${user.Username}`,
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const updatedUser = response.json();
        alert("Update successful");
        localStorage.setItem("user", JSON.stringify(updatedUser));
        onProfileUpdate(updatedUser);
        setUsername(updatedUser.Username);
        setPassword("");
        setConfirmPassword("");
        setEmail(updatedUser.Email);
        setBirthday(updatedUser.Birthday);
        setSuccess("Profile updated successfully");
      } else {
        setError("Updated failed");
      }
    } catch (error) {
      console.error("Error updating profile", error);
      setError("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter a new username"
              />
            </Form.Group>
            <div className="spacer" style={{ margin: "20px" }}></div>
            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="8"
                placeholder="Password must be 8 or more characters"
              />
            </Form.Group>
            <div className="spacer" style={{ margin: "20px" }}></div>
            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Confirm Password:</Form.Label>
              <Form.Control
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength="8"
                placeholder="Confirm your password"
              />
            </Form.Group>
            <div className="spacer" style={{ margin: "20px" }}></div>
            <Form.Group controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email address"
              />
            </Form.Group>
            <div className="spacer" style={{ margin: "20px" }}></div>
            <Form.Group controlId="formBirthday">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
              />
            </Form.Group>
            <div className="spacer" style={{ margin: "20px" }}></div>
            <Button
              variant="warning"
              type="submit"
              className="update-button"
              disabled={loading}
            >
              {loading ? <Spinner animation="border" size="sm" /> : "Submit"}
            </Button>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && (
              <Alert variant="success">Profile updated successfully</Alert>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

ProfileUpdate.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
  }).isRequired,
  onProfileUpdate: PropTypes.func.isRequired,
};

export default ProfileUpdate;
