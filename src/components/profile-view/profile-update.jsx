import React from "react";
import { Form, Button } from "react-bootstrap";

function UpdateUser({ user, handleChange, handleSubmit }) {
  return (
    <>
      <h4>Update Your Profile</h4>
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            name="Username"
            value={user.Username}
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
            value={user.Password || ""}
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
            value={user.Email}
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
            value={user.Birthday}
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

export default UpdateUser;
