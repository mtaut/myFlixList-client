import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Row, Col, Card } from "react-bootstrap";

export const DeleteProfile = ({ onDelete, isDeleting: propIsDeleting }) => {
  const [message, setMessage] = useState("");
  const [isDeleting, setIsDeleting] = useState(propIsDeleting);
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const storedToken = localStorage.getItem("token") || "";

  const handleDelete = async () => {
    if (!storedToken) {
      console.log("Token not found");
      return;
    }
    setIsDeleting(true);
    try {
      await onDelete(storedUser.Username, storedToken);
      alert("Profile successfully deleted");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting profile", error);
      setMessage("Error deleting profile");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Row>
      <Col>
        <Card className="profile-delete">
          <h6>{message}</h6>
          <Button
            type="button"
            class="btn btn-danger"
            variant="danger"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete Profile"}
          </Button>
        </Card>
      </Col>
    </Row>
  );
};

DeleteProfile.propTypes = {
  onDelete: PropTypes.func.isRequired,
  isDeleting: PropTypes.bool,
};

export default DeleteProfile;
