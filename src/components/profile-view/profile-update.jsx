import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Alert,
  Spinner,
  Container,
  Col,
  Row,
} from "react-bootstrap";
import axios from "axios";
import PropTypes from "prop-types";

export const ProfileUpdate = ({ username, token, user, onProfileUpdate }) => {
  const intialFormData = {
    Username: username || "",
    Password: "",
    confirmPassword: "",
    Email: user.Email || "",
    Birthday: user.Birthday || "",
  };

  const [formData, setFormData] = useState(intialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState(null);

  useEffect(() => {
    setFormData({
      Username: username || "",
      Password: "",
      ConfirmPassword: "",
      Email: user.Email || "",
      Birthday: user.Birthday || "",
    });
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "password" || name === "ConfirmPassword") {
      if (value.length > 0 && value.length < 8) {
        setPasswordError("Password must be at least 8 characters long");
      } else {
        setPasswordError(null);
      }

      if (
        (name === "password" && value !== formData.confirmPassword) ||
        (name === "confirmPassword" && value !== formData.Password)
      ) {
        setPasswordError("Passwords do not match");
      } else {
        setPasswordError(null);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.Password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.Password.length > 0 && formData.Password.length < 8) {
      setPasswordError("Password must be at least 8 charaters long");
      return;
    }

    setLoading(true);
    setSuccess(false);
    try {
      const response = await axios.put(
        `https://myflixlist-7625107afe99.herokuapp.com/users/${user.Username}`,
        {
          Username: formData.Username,
          Password: formData.Password,
          Email: formData.Email,
          Birthday: formData.Birthday,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedUser = response.data;
      localStorage.setItem("user", JSON.stringify(updatedUser));
      onProfileUpdate(updatedUser);
      setSuccess(true);
      setMessage("Profile successfully updated");
    } catch (error) {
      setError(error.message);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && (
              <Alert variant="success">Profile updated successfully</Alert>
            )}
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.Username}
                onChange={handleInputChange}
                required
                placeholder="Enter a new username"
              />
            </Form.Group>
            <div className="spacer" style={{ margin: "20px" }}></div>
            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.Password}
                onChange={handleInputChange}
                required
                minLength="8"
                placeholder="Your password must be 8 or more characters"
              />
            </Form.Group>
            <div className="spacer" style={{ margin: "20px" }}></div>
            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Confirm Password:</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                minLength="8"
                placeholder="Confirm your password"
              />
            </Form.Group>
            {passwordError && <Alert variant="danger">{passwordError}</Alert>}
            <div className="spacer" style={{ margin: "20px" }}></div>
            <Form.Group controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.Email}
                onChange={handleInputChange}
                required
                placeholder="Enter your email address"
              />
            </Form.Group>
            <div className="spacer" style={{ margin: "20px" }}></div>
            <Form.Group controlId="formBirthday">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type="date"
                name="birthday"
                value={formData.Birthday}
                onChange={handleInputChange}
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
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

ProfileUpdate.propTypes = {
  username: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  user: PropTypes.shape({
    Username: PropTypes.string,
    Email: PropTypes.string,
    Birthday: PropTypes.string,
  }).isRequired,
  onProfileUpdate: PropTypes.func.isRequired,
};

export default ProfileUpdate;
