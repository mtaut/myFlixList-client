import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Form, Spinner } from "react-bootstrap";
import axios from "axios";

export const ProfileUpdate = ({ user, token, onProfileUpdate, loading }) => {
  const [username, setUsername] = useState(user.Username || "");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email || "");
  const [birthday, setBirthday] = useState(
    user.Birthday ? user.Birthday.split("T")[0] : ""
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password && password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    const updateData = {
      Username: username,
      Email: email,
      Birthday: birthday,
    };

    if (password) {
      updateData.Password = password;
    }

    axios
      .put(
        `https://myflixlist-7625107afe99.herokuapp.com/users/${user.Username}`,
        updateData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        onProfileUpdate(response.data);
        alert("Profile updated successfully");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        alert("An error occured while updating your profile");
      });
  };

  return (
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
          minLength="8"
          placeholder="Password must be 8 or more characters"
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
      <Button variant="primary" type="submit" className="update-button">
        {loading ? <Spinner animation="border" size="sm" /> : "Submit"}
      </Button>
    </Form>
  );
};

ProfileUpdate.propTypes = {
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  onProfileUpdate: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default ProfileUpdate;
