import React from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

export function ProfileUpdate({ user, onUpdatedUserInfo }) {
  const [formData, setFormData] = useState({
    Username: user.username,
    Password: "",
    Email: user.Email,
    Birthday: user.Birthday,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios
      .put(
        `https://myflixlist-7625107afe99.herokuapp.com/users/${user.Username}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        onUpdatedUserInfo(response.data);
        alert("Profile updated successfully");
      })
      .catch((error) => {
        console.error("There was an error updating your profile", error);
      });
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
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </>
  );
}

export default ProfileUpdate;
