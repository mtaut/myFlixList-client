import React from "react";
import { Form } from "react-router-dom";

function UpdateUser({ handleSubmit, handleUpdate }) {
  return (
    <>
      <h4>Update</h4>
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            defaultValue={user.Username}
            onChange={(e) => handleUpdate(e)}
            required
            placeholder="Enter a username"
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            defaultValue=""
            onChange={(e) => handleUpdate(e)}
            required
            minLength="8"
            placeholder="Your password must be 8 pr more characters"
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email address:</Form.Label>
          <Form.Control
            type="email"
            defaultValue={user.Email}
            onChange={(e) => handleUpdate(e.target.value)}
            required
            placeholder="Enter your email address"
          />
        </Form.Group>
        <Form.Group controlId="formBirthday">
          <Form.Label>Birthday</Form.Label>
          <Form.Control
            type="date"
            defaultValue={user.Birthday}
            onChange={(e) => handleUpdate(e.target.value)}
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
