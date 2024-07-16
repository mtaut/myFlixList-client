import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import axios from "axios";

export const DeleteProfile = ({ user, token, onProfileDeleted }) => {
  const handleDeleteProfile = async () => {
    if (window.confirm("Are you sure you want to deregister?")) {
      try {
        await axios.delete(
          `https://myflixlist-7625107afe99.herokuapp.com/users/${user.Username}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        localStorage.removeIten("token");
        localStorage.removeItem("user");
        onProfileDeleted();
        alert("Profile deregistered successfully");
      } catch (error) {
        console.error("There was an error deleting the profile", error);
        alert("Something went wrong");
      }
    }
  };

  return (
    <div>
      <Button variant="danger" onClick={handleDeleteProfile}>
        Delete Profile
      </Button>
    </div>
  );
};

DeleteProfile.propTypes = {
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  onProfileDeleted: PropTypes.func.isRequired,
};

export default DeleteProfile;
