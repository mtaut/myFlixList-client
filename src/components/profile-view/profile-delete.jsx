import React, { useState } from "react";
import { Button } from "react-bootstrap";

export const DeleteProfile = (username) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    username.onDelete(setIsDeleting);
  };

  return (
    <div>
      <Button variant="danger" disabled={isDeleting} onClick={handleDelete}>
        {isDeleting ? "Deleting..." : "Delete Profile"}
      </Button>
    </div>
  );
};

export default DeleteProfile;
