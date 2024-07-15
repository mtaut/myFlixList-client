import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";

export const ProfileUpdate = ({ user, onUpdatedUserInfo }) => {
  const [formData, setFormData] = useState({
    Username: user.username,
    Password: "",
    ConfirmPassword: "",
    Email: user.Email,
    Birthday: user.Birthday,
  });
  const [passwordError, setPasswordError] = useState(null);

  useEffect(() => {
    setFormData({
      Username: user.Username || "",
      Password: "",
      ConfirmPassword: "",
      Email: user.Email || "",
      Birthday: user.Birthday || "",
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    (setFormData) => (prevFormData) => ({
      ...prevFormData,
      [name]: value,
    });

    if (name === "Password" || name === "ConfirmPassword") {
      if (
        (name === "Password" && value !== formData.ConfirmPassword) ||
        (name === "ConfirmPassword" && value !== formData.Password)
      ) {
        setPasswordError("Passwords do not match");
      } else {
        setPasswordError(null);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordError) {
      alert("Please fix errors before submitting form");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `https://myflixlist-7625107afe99.herokuapp.com/users/${user.Username}`,
        {
          Username: formData.Username,
          Password: formData.Password,
          Email: formData.Email,
          Birthday: formData.Birthday,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onUpdatedUserInfo(response.data);
      alert("Profile updated successfully");
    } catch (error) {
      console.error("There was an error updating your profile", error);
      alert("There was an error updateding your profile");
    }
  };

  return (
    <>
      <h4>Update Your Profile</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            name="Username"
            value={formData.Username}
            onChange={handleChange}
            required
            placeholder="Enter a new username"
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            name="Password"
            value={formData.Password}
            onChange={handleChange}
            required
            minLength="8"
            placeholder="Your password must be 8 or more characters"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control
            type="password"
            name="ConfirmPassword"
            value={formData.ConfirmPassword}
            onChange={handleChange}
            required
            minLength="8"
            placeholder="Confirm your password"
          />
          {passwordError && <Alert variant="danger">{passwordError}</Alert>}
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email address:</Form.Label>
          <Form.Control
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            required
            placeholder="Enter your email address"
          />
        </Form.Group>
        <Form.Group controlId="formBirthday">
          <Form.Label>Birthday</Form.Label>
          <Form.Control
            type="date"
            name="Birthday"
            value={formData.Birthday}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default ProfileUpdate;
